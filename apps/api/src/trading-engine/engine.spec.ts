import Portfolio from './engine'; // Adjust the import path as needed

describe('Portfolio', () => {
  let portfolio: Portfolio;

  beforeEach(() => {
    portfolio = new Portfolio(1000, false);
  });

  it('should buy stock if there are no transactions', async () => {
    const stock = {
      company: 'google',
      currentPrice: 100,
      day: '2023-05-12',
      highestPriceOfTheDay: 120,
      lowestPriceOfTheDay: 80,
      id: '1',
    };
    portfolio.buyOrSellStocks(stock, '2023-05-12');
    expect(portfolio.getTransactions()).toHaveLength(1);
    expect(portfolio.getTransactions()[0].action).toEqual('buy');
  });

  it('should not buy stock if balance is not enough', async () => {
    const stock = {
      company: 'google',
      currentPrice: 2000,
      day: '2023-05-12',
      highestPriceOfTheDay: 2100,
      lowestPriceOfTheDay: 1900,
      id: '1',
    };
    portfolio.buyOrSellStocks(stock, '2023-05-12');
    expect(portfolio.getTransactions()).toHaveLength(0);
  });

  it('should sell stock if price is higher than the last transaction', async () => {
    const buyStock = {
      company: 'google',
      currentPrice: 100,
      day: '2023-05-12',
      highestPriceOfTheDay: 120,
      lowestPriceOfTheDay: 80,
      id: '1',
    };
    portfolio.buyOrSellStocks(buyStock, '2023-05-12');

    const sellStock = {
      ...buyStock,
      currentPrice: 200,
      highestPriceOfTheDay: 220,
      lowestPriceOfTheDay: 180,
    };
    portfolio.buyOrSellStocks(sellStock, '2023-05-12');
    expect(portfolio.getTransactions()).toHaveLength(2);
    expect(portfolio.getTransactions()[1].action).toEqual('sell');
  });
  it('should not sell stock if owned stocks are less than quantityToTrade', async () => {
    const buyStock = (override?: {
      day: string;
      lowestPriceOfTheDay: number;
    }) => ({
      company: 'google',
      currentPrice: 100,
      day: '2023-05-12',
      highestPriceOfTheDay: 120,
      lowestPriceOfTheDay: 80,
      id: '1',
      ...override,
    });
    portfolio.buyOrSellStocks(buyStock(), '2023-05-12');
    portfolio.buyOrSellStocks(
      buyStock({ day: '2023-06-12', lowestPriceOfTheDay: 79 }),
      '2023-06-12',
    );
    portfolio.buyOrSellStocks(
      buyStock({ day: '2023-07-12', lowestPriceOfTheDay: 78 }),
      '2023-07-12',
    );
    portfolio.buyOrSellStocks(
      buyStock({ day: '2023-08-12', lowestPriceOfTheDay: 77 }),
      '2023-08-12',
    );
    portfolio.buyOrSellStocks(
      buyStock({ day: '2023-09-12', lowestPriceOfTheDay: 76 }),
      '2023-09-12',
    );
    expect(portfolio.getTransactions()).toHaveLength(5);
    portfolio.sellStock('google', 120, 10, '2023-09-12');
    expect(portfolio.getTransactions()).toHaveLength(5);
    // expect(portfolio.getTransactions()[1].action).toEqual('sell');
  });
  it('should sell stock if owned stocks are greater than quantityToTrade', async () => {
    const buyStock = (override?: {
      day: string;
      lowestPriceOfTheDay: number;
    }) => ({
      company: 'google',
      currentPrice: 100,
      day: '2023-05-12',
      highestPriceOfTheDay: 120,
      lowestPriceOfTheDay: 80,
      id: '1',
      ...override,
    });
    portfolio.buyOrSellStocks(buyStock(), '2023-05-12');
    portfolio.buyOrSellStocks(
      buyStock({ day: '2023-06-12', lowestPriceOfTheDay: 79 }),
      '2023-06-12',
    );
    portfolio.buyOrSellStocks(
      buyStock({ day: '2023-07-12', lowestPriceOfTheDay: 78 }),
      '2023-07-12',
    );
    portfolio.buyOrSellStocks(
      buyStock({ day: '2023-08-12', lowestPriceOfTheDay: 77 }),
      '2023-08-12',
    );
    portfolio.buyOrSellStocks(
      buyStock({ day: '2023-09-12', lowestPriceOfTheDay: 76 }),
      '2023-09-12',
    );
    expect(portfolio.getTransactions()).toHaveLength(5);
    portfolio.sellStock('google', 120, 4, '2023-09-12');
    const trans = portfolio.getTransactions();
    expect(portfolio.getTransactions()).toHaveLength(6);
    expect(trans[trans.length - 1].action).toEqual('sell');
  });
  it('sells stock correctly', async () => {
    const buyStock = {
      company: 'google',
      currentPrice: 100,
      day: '2023-05-11',
      highestPriceOfTheDay: 105,
      lowestPriceOfTheDay: 95,
      id: '2',
    };
    portfolio.buyOrSellStocks(buyStock, '2023-05-11');

    const sellStock = {
      company: 'google',
      currentPrice: 120,
      day: '2023-05-12',
      highestPriceOfTheDay: 125,
      lowestPriceOfTheDay: 115,
      id: '2',
    };
    portfolio.buyOrSellStocks(sellStock, '2023-05-12');
    expect(portfolio.getBalance()).toBeGreaterThan(1000);
  });
  it('calculates stock balance correctly', async () => {
    const stock = {
      company: 'amazon',
      currentPrice: 50,
      day: '2023-05-12',
      highestPriceOfTheDay: 55,
      lowestPriceOfTheDay: 45,
      id: '1',
    };
    portfolio.buyOrSellStocks(stock, '2023-05-12');
    const stockBalance = portfolio.getStockBalance();
    expect(stockBalance.amazon).toEqual(1);
    expect(stockBalance.google).toEqual(0);
  });
});
