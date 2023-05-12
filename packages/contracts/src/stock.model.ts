export interface IStock {
  id?: string;
  timestamp?: number;
  highestPriceOfTheDay?: number;
  lowestPriceOfTheDay?: number;
}
export interface IStockWithMonth extends IStock {
  month?: string;
  averagePrice?: number;
}