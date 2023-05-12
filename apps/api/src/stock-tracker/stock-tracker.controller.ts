import { Controller, Get } from '@nestjs/common';
import { Public } from '@nesty/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from './../core/crud';
import { Stock } from './stock-tracker.entity';
import { StockService } from './stock-tracker.service';

@ApiTags('Stock')
@Public()
@Controller()
export class StockController extends CrudController<Stock> {
  constructor(private readonly stockService: StockService) {
    super(stockService);
  }
  @Get('/line')
  async line(): Promise<any> {
    return this.stockService.line();
  }
}
