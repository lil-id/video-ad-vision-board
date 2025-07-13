import { Eye, ThumbsUp, MessageCircle, Share, TrendingUp, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";

export function VideoStats() {
  const stats = [
    { label: "Views", value: "125.4K", icon: Eye, trend: "+12%" },
    { label: "Likes", value: "3.2K", icon: ThumbsUp, trend: "+8%" },
    { label: "Comments", value: "284", icon: MessageCircle, trend: "+15%" },
    { label: "Shares", value: "156", icon: Share, trend: "+22%" },
    { label: "CTR", value: "4.8%", icon: TrendingUp, trend: "+0.3%" },
    { label: "Revenue", value: "$1,247", icon: DollarSign, trend: "+18%" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-green-400 font-medium">{stat.trend}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}