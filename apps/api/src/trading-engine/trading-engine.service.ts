import { Injectable } from '@nestjs/common';
import { StockService } from '../stock-tracker/stock-tracker.service';

@Injectable()
export class TradingEngineService {
  constructor(private readonly stockService: StockService) {}
  async trade(): Promise<any> {;
    return this.stockService.dailyStocks()
  }
}
