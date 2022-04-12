import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BankAccount } from '../../models/bank-account.model';
import { PixKey } from '../../models/pix-key.model';
import {
  Transaction,
  TransactionOperation,
  TransactionStatus,
} from '../../models/transaction.model';
import { TransactionDto } from '../../dto/transaction.dto';

@Controller('bank-accounts/:bankAccountId/transactions')
export class TransactionController implements OnModuleInit, OnModuleDestroy {
  private kafkaProducer: Producer;

  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepo: Repository<BankAccount>,
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    @InjectRepository(PixKey)
    private pixKeyRepo: Repository<PixKey>,
    @Inject('TRANSACTION_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaProducer = await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaProducer.disconnect();
  }

  @Get()
  index(
    @Param(
      'bankAccountId',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    bankAccountId: string,
  ) {
    return this.transactionRepo.find({
      where: {
        bank_account_id: bankAccountId,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  @Post()
  async store(
    @Param(
      'bankAccountId',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    bankAccountId: string,
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    body: TransactionDto,
  ) {
    await this.bankAccountRepo.findOneOrFail(bankAccountId);

    let transaction = this.transactionRepo.create({
      ...body,
      amount: body.amount * -1,
      bank_account_id: bankAccountId,
      operation: TransactionOperation.debit,
    })[0];
    transaction = await this.transactionRepo.save(transaction);

    const sendData = {
      id: transaction.external_id,
      accountId: bankAccountId,
      amount: body.amount,
      pixkeyto: body.pix_key_key,
      pixKeyKindTo: body.pix_key_kind,
      description: body.description,
    };

    await this.kafkaProducer.send({
      topic: 'transactions',
      messages: [{ key: 'transactions', value: JSON.stringify(sendData) }],
    });

    return transaction;
  }

  @MessagePattern(`bank${process.env.BANK_CODE}`)
  async doTransaction(@Payload() message) {
    if (message.value.status === 'pending') {
      await this.receivedTransaction(message.value);
    }

    if (message.value.status === 'confirmed') {
      await this.confirmedTransaction(message.value);
    }
  }

  async receivedTransaction(data) {
    const pixKey = await this.pixKeyRepo.findOneOrFail({
      where: {
        key: data.pixKeyTo,
        kind: data.pixKeyKindTo,
      },
    });

    const transaction = this.transactionRepo.create({
      external_id: data.id,
      amount: data.amount,
      description: data.description,
      bank_account_id: pixKey.bank_account_id,
      bank_account_from_id: data.accountId,
      operation: TransactionOperation.credit,
      status: TransactionStatus.completed,
    });

    await this.transactionRepo.save(transaction);

    const sendData = {
      ...data,
      status: 'confirmed',
    };

    await this.kafkaProducer.send({
      topic: 'transaction_confirmation',
      messages: [
        { key: 'transaction_confirmation', value: JSON.stringify(sendData) },
      ],
    });
  }

  async confirmedTransaction(data) {
    const transaction = await this.transactionRepo.findOneOrFail({
      where: {
        external_id: data.id,
      },
    });

    await this.transactionRepo.update(
      { external_id: data.id },
      {
        status: TransactionStatus.completed,
      },
    );

    const sendData = {
      id: data.id,
      accountId: transaction.bank_account_id,
      amount: Math.abs(transaction.amount),
      pixkeyto: transaction.pix_key_key,
      pixKeyKindTo: transaction.pix_key_kind,
      description: transaction.description,
      status: TransactionStatus.completed,
    };

    await this.kafkaProducer.send({
      topic: 'transaction_confirmation',
      messages: [
        { key: 'transaction_confirmation', value: JSON.stringify(sendData) },
      ],
    });
  }
}
