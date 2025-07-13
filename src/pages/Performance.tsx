import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { VideoStats } from "@/components/VideoStats";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Clock } from "lucide-react";

const Performance = () => {
  const performanceData = [
    {
      metric: "Click-Through Rate",
      value: "4.2%",
      change: "+0.8%",
      trend: "up",
      description: "vs last month"
    },
    {
      metric: "Cost Per View",
      value: "$0.12",
      change: "-$0.03",
      trend: "down",
      description: "vs last month"
    },
    {
      metric: "View Rate",
      value: "68%",
      change: "+5%",
      trend: "up",
      description: "vs last month"
    },
    {
      metric: "Avg Watch Time",
      value: "1:45",
      change: "+15s",
      trend: "up",
      description: "vs last month"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">Performance Insights</h1>
                <p className="text-sm text-muted-foreground">Deep dive into your video ad performance</p>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {performanceData.map((item, index) => (
                <Card key={index} className="p-4 bg-card border-border">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{item.metric}</p>
                      {item.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-2xl font-bold text-foreground">{item.value}</p>
                    <div className="flex items-center gap-1">
                      <Badge variant={item.trend === "up" ? "default" : "secondary"} className="text-xs">
                        {item.change}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Performance Chart */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Performance Trends</h3>
              <VideoStats />
            </div>

            {/* Optimization Recommendations */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Optimization Recommendations</h3>
              <div className="space-y-3">
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Improve Targeting</h4>
                      <p className="text-sm text-muted-foreground">Your "Brand Story Campaign" has a low CTR. Consider refining audience targeting to reach more engaged users.</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Optimize Video Length</h4>
                      <p className="text-sm text-muted-foreground">Videos under 30 seconds are showing 23% higher completion rates. Consider creating shorter versions of your top performing content.</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Scale Successful Campaigns</h4>
                      <p className="text-sm text-muted-foreground">Your "Summer Sale 2024" campaign is performing 40% above average. Consider increasing the budget to maximize reach.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Performance;