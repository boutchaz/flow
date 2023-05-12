import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { Public } from '@nesty/common';
import { ApiTags } from '@nestjs/swagger';
import { TradingEngineService } from './trading-engine.service';
import Portfolio from './engine';

class UserDto {
  user: string;
}

@ApiTags('engine')
@Public()
@Controller()
export class TradingEngineController {
  constructor(private readonly tradingEngineService: TradingEngineService) {}
  @Post('/auto-trade')
  async trade(@Body() userDto: UserDto): Promise<any> {
    if (userDto.user !== 'erwan') {
      throw new BadRequestException('Invalid user');
    }
    const { result } = await this.tradingEngineService.trade();
    const portfolio = new Portfolio(100000);

    // Let's assume that the current prices for Google and Amazon stocks are 1500 and 3000 respectively
    // Randomly generate predicted lowest and highest prices of the day
    const start = Date.now();
    const stocks: any[] = result;
    const $promises = stocks
      .map((stock) => stock.day)
      .map(async (day, index) => {
        const action = await portfolio.buyOrSellStocks(stocks[index], day);
        return action;
      });
    await Promise.all($promises);
    const end = Date.now();
    const elapsed = end - start;

    return {
      execution: elapsed,
      transactions: portfolio.getTransactions(),
      stockBalence: portfolio.getStockBalance(),
    };
  }
}
