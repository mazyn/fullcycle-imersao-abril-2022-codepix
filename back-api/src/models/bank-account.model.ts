import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity({
  name: 'bank_account',
})
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  account_number: string;

  @Column()
  owner_name: string;

  @Column()
  balance: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  generateId() {
    if (this.id) return;

    this.id = v4();
  }

  @BeforeInsert()
  initBalance() {
    if (this.balance) return;

    this.balance = 0;
  }
}
