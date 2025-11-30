export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap: number;
  sparkline: number[];
}

export interface MarketData {
  timestamp: string;
  value: number;
}

const cryptoNames = [
  'Bitcoin', 'Ethereum', 'Cardano', 'Polkadot', 'Chainlink', 'Litecoin',
  'Stellar', 'Dogecoin', 'Polygon', 'Solana', 'Avalanche', 'Cosmos'
];

const cryptoSymbols = [
  'BTC', 'ETH', 'ADA', 'DOT', 'LINK', 'LTC',
  'XLM', 'DOGE', 'MATIC', 'SOL', 'AVAX', 'ATOM'
];

const basePrice = [
  45000, 3200, 1.2, 25, 18, 150,
  0.35, 0.08, 1.1, 95, 85, 12
];

class FakePercent {
  private value: number = Math.random() * 100;
  
  next(): [number, number] {
    const change = (Math.random() - 0.5) * 10;
    this.value = Math.max(0, Math.min(100, this.value + change));
    const percent = this.value;
    return [this.value * 1000, percent];
  }
}

class FakeCategoricalSeries {
  public value: number = Math.random() * 10000;
  private data: MarketData[] = [];
  
  constructor() {
    // Initialize with some historical data
    for (let i = 15; i >= 0; i--) {
      this.data.push({
        timestamp: new Date(Date.now() - i * 60000).toISOString(),
        value: this.value + (Math.random() - 0.5) * 1000
      });
    }
  }
  
  next(): [string, number, number] {
    const change = (Math.random() - 0.5) * 1000;
    this.value = Math.max(0, this.value + change);
    const changePercent = (change / this.value) * 100;
    
    // Add new data point
    this.data.push({
      timestamp: new Date().toISOString(),
      value: this.value
    });
    
    // Keep only last 30 points
    if (this.data.length > 30) {
      this.data.shift();
    }
    
    return [new Date().toISOString(), this.value, changePercent];
  }
  
  getData(): MarketData[] {
    return this.data;
  }
}

export class CryptoDataGenerator {
  private generators: Map<string, FakeCategoricalSeries> = new Map();
  private percentGenerators: Map<string, FakePercent> = new Map();
  
  constructor() {
    cryptoSymbols.forEach((symbol, index) => {
      const generator = new FakeCategoricalSeries();
      generator.value = basePrice[index] + (Math.random() - 0.5) * basePrice[index] * 0.1;
      this.generators.set(symbol, generator);
      this.percentGenerators.set(symbol, new FakePercent());
    });
  }
  
  generateCryptoData(): CryptoData[] {
    return cryptoSymbols.map((symbol, index) => {
      const generator = this.generators.get(symbol)!;
      const percentGenerator = this.percentGenerators.get(symbol)!;
      
      const [_, price, changePercent] = generator.next();
      const [__, progressValue] = percentGenerator.next();
      
      const change24h = (price * changePercent) / 100;
      const volume24h = Math.random() * 1000000000;
      const marketCap = price * (Math.random() * 100000000);
      
      // Generate sparkline data
      const sparkline = generator.getData().slice(-7).map(d => d.value);
      
      return {
        id: symbol.toLowerCase(),
        name: cryptoNames[index],
        symbol,
        price,
        change24h,
        changePercent24h: changePercent,
        volume24h,
        marketCap,
        sparkline
      };
    });
  }
  
  generateSingleCrypto(symbol: string): CryptoData | null {
    const index = cryptoSymbols.indexOf(symbol);
    if (index === -1) return null;
    
    const generator = this.generators.get(symbol)!;
    const percentGenerator = this.percentGenerators.get(symbol)!;
    
    const [_, price, changePercent] = generator.next();
    const [__, progressValue] = percentGenerator.next();
    
    const change24h = (price * changePercent) / 100;
    const volume24h = Math.random() * 1000000000;
    const marketCap = price * (Math.random() * 100000000);
    const sparkline = generator.getData().slice(-7).map(d => d.value);
    
    return {
      id: symbol.toLowerCase(),
      name: cryptoNames[index],
      symbol,
      price,
      change24h,
      changePercent24h: changePercent,
      volume24h,
      marketCap,
      sparkline
    };
  }
}

export const cryptoDataGenerator = new CryptoDataGenerator();
