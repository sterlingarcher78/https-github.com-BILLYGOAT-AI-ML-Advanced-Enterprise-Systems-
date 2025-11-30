import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface GaugeCardProps {
  title: string;
  value: string;
  progress: number; // 0-100
  changePercent?: number;
  color?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  type?: "circular" | "linear";
}

export function GaugeCard({
  title,
  value,
  progress,
  changePercent,
  color = "blue",
  className,
  size = "md",
  type = "circular"
}: GaugeCardProps) {
  const isPositive = (changePercent ?? 0) >= 0;
  const normalizedProgress = Math.max(0, Math.min(100, progress));
  
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };
  
  const circleSize = size === "lg" ? 120 : size === "md" ? 100 : 80;
  const strokeWidth = size === "lg" ? 8 : size === "md" ? 6 : 4;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;
  
  const colorClass = `crypto-${color}`;
  
  if (type === "linear") {
    return (
      <Card className={cn(
        "bg-gradient-card border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow-primary",
        sizeClasses[size],
        className
      )}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
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
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">{normalizedProgress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className={`h-2 rounded-full bg-${colorClass} transition-all duration-500`}
                style={{ width: `${normalizedProgress}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className={cn(
      "bg-gradient-card border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow-primary",
      sizeClasses[size],
      "flex flex-col items-center justify-center text-center",
      className
    )}>
      <div className="relative mb-4">
        <svg
          width={circleSize}
          height={circleSize}
          className="transform -rotate-90"
        >
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="hsl(var(--border))"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke={`hsl(var(--${colorClass}))`}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl font-bold text-foreground">
              {normalizedProgress.toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-lg font-bold text-foreground">{value}</p>
        {changePercent !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium justify-center",
            isPositive ? "text-crypto-green" : "text-crypto-red"
          )}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(changePercent).toFixed(2)}%
          </div>
        )}
      </div>
    </Card>
  );
}