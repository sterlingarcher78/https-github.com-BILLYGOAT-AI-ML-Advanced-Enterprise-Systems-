import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface ChartCardProps {
  title: string;
  value: string;
  change?: number;
  changePercent?: number;
  data: any[];
  chartType?: "line" | "area" | "bar";
  color?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const colorMap = {
  blue: "crypto-blue",
  purple: "crypto-purple",
  green: "crypto-green",
  red: "crypto-red",
  cyan: "crypto-cyan",
  orange: "crypto-orange",
  pink: "crypto-pink"
};

export function ChartCard({
  title,
  value,
  change,
  changePercent,
  data,
  chartType = "line",
  color = "blue",
  className,
  size = "md"
}: ChartCardProps) {
  const isPositive = (changePercent ?? 0) >= 0;
  const chartColor = `hsl(var(--crypto-${color}))`;
  
  const sizeClasses = {
    sm: "p-4 h-32",
    md: "p-6 h-48",
    lg: "p-8 h-64"
  };
  
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 5, left: 5, bottom: 5 }
    };
    
    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={2}
              fill={`url(#gradient-${color})`}
            />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart {...commonProps}>
            <Bar dataKey="value" fill={chartColor} radius={[2, 2, 0, 0]} />
          </BarChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        );
    }
  };
  
  return (
    <Card className={cn(
      "bg-gradient-card border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow-primary",
      sizeClasses[size],
      className
    )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-xl font-bold text-foreground">{value}</p>
          </div>
          {changePercent !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositive ? "text-crypto-green" : "text-crypto-red"
            )}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {Math.abs(changePercent).toFixed(2)}%
            </div>
          )}
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}