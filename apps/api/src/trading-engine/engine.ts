interface Stock {
  company: string;
  currentPrice: number;
  day: string;
  highestPriceOfTheDay: number;
  lowestPriceOfTheDay: number;
  id: string;
}
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
class Portfolio {
  private balance: number;
  private transactions: any[];
  private randomize: boolean;
  constructor(initialBalance: number, randomize = true) {
    this.balance = initialBalance;
    this.randomize = randomize;
    this.transactions = [];
  }

  private getLastTransactionPrice(name: string): number | null {
    const transactions = this.transactions.filter(
      (transaction) => transaction.name === name,
    );
    if (transactions.length === 0) {
      return null;
    }
    const lastTransaction = transactions[transactions.length - 1];
    return lastTransaction.unitPrice;
  }
  buyOrSellStocks(stock: Stock, currentDay: string) {
    // normally we should use an appropriete algorithm
    const quantityToTrade = this.randomize ? getRandomInt(1, 10) : 1;
    if (
      this.transactions.filter(
        (transaction) => transaction.name === stock.company,
      ).length === 0
    ) {
      this.buyStock(
        stock.company,
        stock.lowestPriceOfTheDay,
        quantityToTrade,
        currentDay,
      );
    } else if (currentDay === stock.day) {
      const lastTransactionPrice = this.getLastTransactionPrice(stock.company);
      if (
        lastTransactionPrice !== null &&
        stock.lowestPriceOfTheDay < lastTransactionPrice
      ) {
        this.buyStock(
          stock.company,
          stock.lowestPriceOfTheDay,
          quantityToTrade,
          currentDay,
        );
      } else if (
        this.hasStock(stock.company) &&
        lastTransactionPrice !== null &&
        stock.highestPriceOfTheDay > lastTransactionPrice
      ) {
        this.sellStock(
          stock.company,
          stock.highestPriceOfTheDay,
          quantityToTrade,
          currentDay,
        );
      }
    }
  }

  private hasStock(name: string): boolean {
    return this.transactions.some(
      (transaction) =>
        transaction.name === name && transaction.action === 'buy',
    );
  }

  buyStock(name: string, price: number, quantity: number, day: string) {
    const total = price * quantity;
    if (this.balance >= total) {
      this.balance -= total;
      this.transactions.push({
        date: day,
        action: 'buy',
        name,
        unitPrice: price,
        quantity,
        total,
        portfolio: this.balance,
      });
    }
  }

  sellStock(name: string, price: number, quantity: number, day: string) {
    const total = price * quantity;
    const ownedShares = this.getQuantityOwned(name);
    if (ownedShares >= quantity) {
      this.balance += total;
      this.transactions.push({
        date: day,
        action: 'sell',
        name,
        unitPrice: price,
        quantity,
        total,
        portfolio: this.balance,
      });
    }
  }
  private getQuantityOwned(name: string): number {
    let quantityOwned = 0;
    this.transactions.forEach((transaction) => {
      if (transaction.name === name) {
        transaction.action === 'buy'
          ? (quantityOwned += transaction.quantity)
          : (quantityOwned -= transaction.quantity);
      }
    });
    return quantityOwned;
  }
  getStockBalance() {
    let totalStockAmazon = 0;
    let totalStockGoogle = 0;
    this.transactions
      .filter((transaction) => transaction.name === 'amazon')
      .forEach((transaction) => {
        if (transaction.action === 'buy') {
          totalStockAmazon += transaction.quantity;
        } else {
          totalStockAmazon -= transaction.quantity;
        }
      });
    this.transactions
      .filter((transaction) => transaction.name === 'google')
      .forEach((transaction) => {
        if (transaction.action === 'buy') {
          totalStockGoogle += transaction.quantity;
        } else {
          totalStockGoogle -= transaction.quantity;
        }
      });
    return { amazon: totalStockAmazon, google: totalStockGoogle };
  }
  getBalance() {
    return this.balance;
  }
  getTransactions() {
    return this.transactions;
  }
}
export default Portfolio;
