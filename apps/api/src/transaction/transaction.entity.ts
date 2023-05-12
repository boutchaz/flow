import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export type TransactionAction = 'debit' | 'credit';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  date: Date;

  @Column({
    type: 'enum',
    enum: ['debit', 'credit'],
  })
  action: TransactionAction;
  // stock company share holder
  @Column()
  company: string;

  @Column('decimal')
  unitPrice: number;

  @Column('int')
  quantity: number;
  // total price of transaction
  @Column('decimal')
  total: number;

  @Column('decimal')
  portfolio: number;
}
