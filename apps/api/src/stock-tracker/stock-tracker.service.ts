import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nesty/config';
import { Stock } from './stock-tracker.entity';
import { CrudService } from 'src/core';

@Injectable()
export class StockService extends CrudService<Stock> {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    private readonly _configService: ConfigService,
  ) {
    super(stockRepository);
  }
}
