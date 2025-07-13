import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Smartphone, Monitor } from "lucide-react";

const Audience = () => {
  const audienceData = {
    demographics: [
      { group: "18-24", percentage: 22, count: "16.8K" },
      { group: "25-34", percentage: 35, count: "26.7K" },
      { group: "35-44", percentage: 28, count: "21.3K" },
      { group: "45-54", percentage: 12, count: "9.1K" },
      { group: "55+", percentage: 3, count: "2.3K" },
    ],
    locations: [
      { country: "United States", percentage: 45, count: "34.2K" },
      { country: "Canada", percentage: 18, count: "13.7K" },
      { country: "United Kingdom", percentage: 15, count: "11.4K" },
      { country: "Australia", percentage: 12, count: "9.1K" },
      { country: "Germany", percentage: 10, count: "7.6K" },
    ],
    devices: [
      { type: "Mobile", percentage: 68, count: "51.7K", icon: Smartphone },
      { type: "Desktop", percentage: 25, count: "19.0K", icon: Monitor },
      { type: "Tablet", percentage: 7, count: "5.3K", icon: Monitor },
    ]
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
                <h1 className="text-2xl font-bold text-foreground">Audience Insights</h1>
                <p className="text-sm text-muted-foreground">Understand who's watching your video ads</p>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-card border-border">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Audience</p>
                    <p className="text-2xl font-bold text-foreground">76.2K</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-card border-border">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Top Location</p>
                    <p className="text-2xl font-bold text-foreground">US</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-card border-border">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Primary Device</p>
                    <p className="text-2xl font-bold text-foreground">Mobile</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Age Demographics */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Age Demographics</h3>
                <div className="space-y-3">
                  {audienceData.demographics.map((demo, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground w-12">{demo.group}</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-primary-glow"
                            style={{ width: `${demo.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{demo.percentage}%</Badge>
                        <span className="text-sm text-muted-foreground">{demo.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Geographic Distribution */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Locations</h3>
                <div className="space-y-3">
                  {audienceData.locations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground flex-1">{location.country}</span>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-primary-glow"
                            style={{ width: `${location.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{location.percentage}%</Badge>
                        <span className="text-sm text-muted-foreground">{location.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Device Breakdown */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Device Usage</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {audienceData.devices.map((device, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <device.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground">{device.type}</h4>
                    <p className="text-2xl font-bold text-foreground">{device.percentage}%</p>
                    <p className="text-sm text-muted-foreground">{device.count} users</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Audience;