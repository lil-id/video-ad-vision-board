import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Play, Pause, Edit, Trash2, Plus } from "lucide-react";

const Campaigns = () => {
  const campaigns = [
    { 
      name: "Summer Sale 2024", 
      status: "Active", 
      budget: "$5,000", 
      spent: "$3,780", 
      videos: 3,
      startDate: "2024-06-01",
      endDate: "2024-08-31"
    },
    { 
      name: "Brand Awareness Q3", 
      status: "Paused", 
      budget: "$8,000", 
      spent: "$2,150", 
      videos: 5,
      startDate: "2024-07-01",
      endDate: "2024-09-30"
    },
    { 
      name: "Holiday Campaign", 
      status: "Scheduled", 
      budget: "$12,000", 
      spent: "$0", 
      videos: 2,
      startDate: "2024-11-15",
      endDate: "2024-12-31"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Paused": return "secondary";
      case "Scheduled": return "outline";
      default: return "secondary";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">Campaign Manager</h1>
                <p className="text-sm text-muted-foreground">Organize and manage your video ad campaigns</p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </header>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {campaigns.map((campaign, index) => (
                <Card key={index} className="p-6 bg-card border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-foreground">{campaign.name}</h3>
                        <Badge variant={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Budget</p>
                          <p className="font-medium text-foreground">{campaign.budget}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Spent</p>
                          <p className="font-medium text-foreground">{campaign.spent}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Videos</p>
                          <p className="font-medium text-foreground">{campaign.videos}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Duration</p>
                          <p className="font-medium text-foreground">
                            {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {campaign.status === "Active" ? (
                          <Button variant="outline" size="sm">
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Start
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Campaigns;