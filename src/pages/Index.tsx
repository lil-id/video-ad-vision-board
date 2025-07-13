import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { VideoPreview } from "@/components/VideoPreview";
import { VideoStats } from "@/components/VideoStats";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Upload, Edit, Trash2, MoreVertical } from "lucide-react";

const Index = () => {
  const recentVideos = [
    { id: "dQw4w9WgXqQ", title: "Product Demo 2024", status: "Published", views: "12.5K" },
    { id: "jNQXAC9IVRw", title: "Brand Story Campaign", status: "Draft", views: "8.2K" },
    { id: "ScMzIvxBSi4", title: "Holiday Special", status: "Scheduled", views: "15.1K" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">Video Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage and optimize your video ads</p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90">
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </Button>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Preview - Takes up 2 columns on large screens */}
              <div className="lg:col-span-2">
                <VideoPreview 
                  videoId="dQw4w9WgXqQ"
                  title="Product Demo 2024 - Never Gonna Give You Up"
                />
              </div>

              {/* Recent Videos List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Recent Videos</h3>
                {recentVideos.map((video) => (
                  <Card key={video.id} className="p-4 bg-card border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1 truncate">{video.title}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant={video.status === 'Published' ? 'default' : 
                                   video.status === 'Scheduled' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {video.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{video.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 p-1">
                            <Play className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 p-1">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 p-1">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 p-1">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Performance Overview</h3>
              <VideoStats />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
