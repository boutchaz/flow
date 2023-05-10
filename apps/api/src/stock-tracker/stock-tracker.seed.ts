import { DataSource } from 'typeorm';
import { IStock } from '@nesty/contracts';
import { Stock } from './../stock-tracker/stock-tracker.entity';
import * as googleStocks from './data/GOOG-stock-price.json';
import * as amazonStocks from './data/AMZN-stock-price.json';

export const createStocks = async (
  dataSource: DataSource,
): Promise<IStock[]> => {
  const stocks: IStock[] = [];
  // because both lists are the same length, we can use either one
  for (let i = 0; i < googleStocks.length; i++) {
    const googleStock = googleStocks[i];
    const amazonStock = amazonStocks[i];
    stocks.push(getStock(googleStock, 'google'));
    stocks.push(getStock(amazonStock, 'amazon'));
  }
  return await dataSource.manager.save(stocks);
};

const getStock = (
  {
    timestamp,
    highestPriceOfTheDay,
    lowestPriceOfTheDay,
    ...rest
  }: Pick<IStock, 'timestamp' | 'highestPriceOfTheDay' | 'lowestPriceOfTheDay'>,
  company: string,
) => {
  const stock: IStock = new Stock();
  stock.timestamp = timestamp;
  stock.highestPriceOfTheDay = highestPriceOfTheDay;
  stock.lowestPriceOfTheDay = lowestPriceOfTheDay;
  stock.company = company;
  return stock;
};
