import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock-tracker.entity';
import { CrudService } from 'src/core';
import { IStockWithMonth } from '@nesty/contracts';

@Injectable()
export class StockService extends CrudService<Stock> {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    private readonly commandBus: CommandBus,
  ) {
    super(stockRepository);
  }
  async line(): Promise<any> {
    const sql = `
    SELECT
        company,
        strftime('%Y-%m', datetime(timestamp / 1000, 'unixepoch')) AS month,
        AVG((highestPriceOfTheDay + lowestPriceOfTheDay) / 2) AS averagePrice
    FROM
        Stock
    GROUP BY
        company, month
    ORDER BY
        month ASC;
`;

    const result = await this.stockRepository.query(sql);
    const stockData = [...new Set(result.map((item) => item.company))].map(
      (company) => ({
        name: company,
        type: 'line',
        smooth: true,
        data: result
          .filter((item: IStockWithMonth) => item.company === company)
          .map((item) => item.averagePrice),
      }),
    );

    return { stockData };
  }
  async dailyStocks(): Promise<any> {
    const sql = `
    SELECT 
    company, 
    strftime('%Y-%m-%d', datetime(timestamp / 1000, 'unixepoch')) AS day,
    highestPriceOfTheDay,
    lowestPriceOfTheDay,
    id
FROM 
    Stock
GROUP BY 
    company, day	
ORDER BY 
    day ASC;
`;

    const result = await this.stockRepository.query(sql);

    return { result };
  }
}
