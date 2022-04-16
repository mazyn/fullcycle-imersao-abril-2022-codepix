import { PixKeyKind } from './pix-key.model';

export enum TransactionStatus {
  Pending = 'Pending',
  Completed = 'completed',
  Error = 'error',
}

export enum TransactionOperation {
  Debit = 'debit',
  Credit = 'credit',
}

export interface TransactionModel {
  id: string;
  amount: number;
  description: string;
  bank_account_id: string;
  bank_account_from_id: string;
  pix_key_key: string;
  pix_key_kind: PixKeyKind;
  status: TransactionStatus;
  operation: TransactionOperation;
  created_at: string;
}
