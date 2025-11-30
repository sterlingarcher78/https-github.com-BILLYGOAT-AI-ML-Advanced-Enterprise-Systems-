import { AgentCard } from "@/components/AgentCard";
import { StatsCard } from "@/components/StatsCard";
import { ActivityLog } from "@/components/ActivityLog";
import { Button } from "@/components/ui/button";
import { Bot, TrendingUp, Zap, Clock, Plus } from "lucide-react";

const Index = () => {
  const agents = [
    { name: "Agent Alpha", status: "active" as const, tasksCompleted: 1247, avgResponseTime: "1.2s", lastActive: "Just now" },
    { name: "Agent Beta", status: "active" as const, tasksCompleted: 892, avgResponseTime: "0.8s", lastActive: "2 min ago" },
    { name: "Agent Gamma", status: "idle" as const, tasksCompleted: 654, avgResponseTime: "1.5s", lastActive: "15 min ago" },
    { name: "Agent Delta", status: "error" as const, tasksCompleted: 421, avgResponseTime: "2.1s", lastActive: "12 min ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20 border border-primary/50 glow-box">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold glow">AI Agent Control Center</h1>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              New Agent
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Agents"
            value="12"
            change="+2 from last hour"
            icon={Bot}
            trend="up"
          />
          <StatsCard
            title="Total Tasks"
            value="3,214"
            change="+18% this week"
            icon={TrendingUp}
            trend="up"
          />
          <StatsCard
            title="Avg Response"
            value="1.4s"
            change="-0.3s improved"
            icon={Zap}
            trend="up"
          />
          <StatsCard
            title="Uptime"
            value="99.8%"
            change="Last 30 days"
            icon={Clock}
            trend="neutral"
          />
        </div>

        {/* Agents and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold glow">Active Agents</h2>
              <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agents.map((agent) => (
                <AgentCard key={agent.name} {...agent} />
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-1">
            <ActivityLog />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
