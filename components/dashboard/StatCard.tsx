import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  changePercent?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function StatCard({
  title,
  value,
  change,
  changePercent,
  className,
  size = "md"
}: StatCardProps) {
  const isPositive = (changePercent ?? 0) >= 0;
  
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };
  
  return (
    <Card className={cn(
      "bg-gradient-card border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow-primary",
      sizeClasses[size],
      className
    )}>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-foreground">{value}</p>
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
        {change !== undefined && (
          <p className={cn(
            "text-sm",
            isPositive ? "text-crypto-green" : "text-crypto-red"
          )}>
            {isPositive ? "+" : ""}{change.toFixed(2)}
          </p>
        )}
      </div>
    </Card>
  );
}