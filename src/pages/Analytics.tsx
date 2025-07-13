import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { VideoStats } from "@/components/VideoStats";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Eye, DollarSign } from "lucide-react";

const Analytics = () => {
  const topVideos = [
    { title: "Product Demo 2024", views: "25.3K", ctr: "4.2%", spent: "$1,240" },
    { title: "Brand Story Campaign", views: "18.7K", ctr: "3.8%", spent: "$980" },
    { title: "Holiday Special", views: "32.1K", ctr: "5.1%", spent: "$1,560" },
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
                <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">Track your video ad performance</p>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-card border-border">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold text-foreground">76.1K</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-card border-border">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. CTR</p>
                    <p className="text-2xl font-bold text-foreground">4.4%</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-card border-border">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold text-foreground">$3,780</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-card border-border">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">ROAS</p>
                    <p className="text-2xl font-bold text-foreground">3.2x</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Performance Chart */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Performance Overview</h3>
              <VideoStats />
            </div>

            {/* Top Performing Videos */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Videos</h3>
              <div className="space-y-3">
                {topVideos.map((video, index) => (
                  <Card key={index} className="p-4 bg-card border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{video.title}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-muted-foreground">{video.views} views</span>
                          <Badge variant="secondary">{video.ctr} CTR</Badge>
                          <span className="text-sm text-muted-foreground">{video.spent} spent</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;