import { Controller, Get } from '@nestjs/common';
import { Public } from '@nesty/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from './../core/crud';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';

@ApiTags('Transaction')
@Public()
@Controller()
export class TransactionController extends CrudController<Transaction> {
  constructor(private readonly TransactionService: TransactionService) {
    super(TransactionService);
  }
}
