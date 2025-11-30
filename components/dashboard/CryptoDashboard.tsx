import { useState, useEffect } from "react";
import { StatCard } from "./StatCard";
import { ChartCard } from "./ChartCard";
import { GaugeCard } from "./GaugeCard";
import { cryptoDataGenerator, type CryptoData } from "@/lib/crypto-data";

const colors = ['blue', 'purple', 'green', 'cyan', 'orange', 'pink'];
const chartTypes = ['line', 'area', 'bar'] as const;

export function CryptoDashboard() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  
  useEffect(() => {
    // Initial data load
    setCryptoData(cryptoDataGenerator.generateCryptoData());
    
    // Update data every 1 second
    const interval = setInterval(() => {
      setCryptoData(cryptoDataGenerator.generateCryptoData());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(4)}`;
  };
  
  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    }
    if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    }
    return `$${(volume / 1e3).toFixed(2)}K`;
  };
  
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    }
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    }
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  };
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Crypto Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">Real-time cryptocurrency market data and analytics</p>
        </div>
        
        {/* Small stat cards - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cryptoData.slice(0, 6).map((crypto, index) => (
            <StatCard
              key={`stat-${crypto.id}`}
              title={crypto.symbol}
              value={formatPrice(crypto.price)}
              changePercent={crypto.changePercent24h}
              size="sm"
            />
          ))}
        </div>
        
        {/* Small series stat cards - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cryptoData.slice(6, 12).map((crypto, index) => {
            const chartData = crypto.sparkline.map((value, i) => ({ value }));
            return (
              <ChartCard
                key={`series-${crypto.id}`}
                title={crypto.symbol}
                value={formatPrice(crypto.price)}
                changePercent={crypto.changePercent24h}
                data={chartData}
                chartType="line"
                color={colors[index % colors.length]}
                size="sm"
              />
            );
          })}
        </div>
        
        {/* Wide series stat cards - Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cryptoData.slice(0, 6).map((crypto, index) => {
            const chartData = crypto.sparkline.map((value, i) => ({ value }));
            return (
              <ChartCard
                key={`wide-line-${crypto.id}`}
                title={crypto.name}
                value={formatPrice(crypto.price)}
                changePercent={crypto.changePercent24h}
                change={crypto.change24h}
                data={chartData}
                chartType="line"
                color={colors[index % colors.length]}
                size="md"
                className="col-span-1 md:col-span-1"
              />
            );
          })}
        </div>
        
        {/* Wide bar charts - Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cryptoData.slice(6, 12).map((crypto, index) => {
            const chartData = crypto.sparkline.map((value, i) => ({ value }));
            return (
              <ChartCard
                key={`wide-bar-${crypto.id}`}
                title={crypto.name}
                value={formatVolume(crypto.volume24h)}
                changePercent={crypto.changePercent24h}
                data={chartData}
                chartType="bar"
                color={colors[index % colors.length]}
                size="md"
                className="col-span-1 md:col-span-1"
              />
            );
          })}
        </div>
        
        {/* Tall gauge cards - Row 5 & 6 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cryptoData.map((crypto, index) => (
            <GaugeCard
              key={`gauge-${crypto.id}`}
              title={crypto.name}
              value={formatPrice(crypto.price)}
              progress={Math.abs(crypto.changePercent24h) * 2}
              changePercent={crypto.changePercent24h}
              color={colors[index % colors.length]}
              size="md"
              type="circular"
              className="col-span-1 row-span-2"
            />
          ))}
        </div>
        
        {/* Large area charts - Row 7 & 8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {cryptoData.map((crypto, index) => {
            const chartData = crypto.sparkline.map((value, i) => ({ value }));
            return (
              <ChartCard
                key={`large-area-${crypto.id}`}
                title={crypto.name}
                value={formatPrice(crypto.price)}
                changePercent={crypto.changePercent24h}
                data={chartData}
                chartType="area"
                color={colors[index % colors.length]}
                size="lg"
                className="col-span-1 row-span-2"
              />
            );
          })}
        </div>
        
        {/* Wide gauge and bar cards - Row 9 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cryptoData.slice(0, 3).map((crypto, index) => (
            <GaugeCard
              key={`wide-gauge-${crypto.id}`}
              title={crypto.name}
              value={formatMarketCap(crypto.marketCap)}
              progress={Math.abs(crypto.changePercent24h) * 3}
              changePercent={crypto.changePercent24h}
              color={colors[index % colors.length]}
              size="md"
              type="linear"
              className="col-span-1 md:col-span-1"
            />
          ))}
          {cryptoData.slice(3, 6).map((crypto, index) => (
            <GaugeCard
              key={`wide-bar-gauge-${crypto.id}`}
              title={crypto.name}
              value={formatMarketCap(crypto.marketCap)}
              progress={Math.abs(crypto.changePercent24h) * 3}
              changePercent={crypto.changePercent24h}
              color={colors[(index + 3) % colors.length]}
              size="md"
              type="linear"
              className="col-span-1 md:col-span-1"
            />
          ))}
        </div>
      </div>
    </div>
  );
}