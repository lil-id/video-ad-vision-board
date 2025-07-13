import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VideoPreview } from "@/components/VideoPreview";
import { useToast } from "@/hooks/use-toast";
import { Youtube, Plus, Save } from "lucide-react";

const Create = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [extractedVideoId, setExtractedVideoId] = useState("");
  const { toast } = useToast();

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleUrlSubmit = () => {
    const videoId = extractVideoId(youtubeUrl);
    if (videoId) {
      setExtractedVideoId(videoId);
      if (!videoTitle) {
        setVideoTitle("Imported YouTube Video");
      }
      toast({
        title: "Video Imported",
        description: "YouTube video has been successfully imported for editing.",
      });
    } else {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    if (extractedVideoId && videoTitle) {
      toast({
        title: "Video Saved",
        description: "Your video ad has been saved to your campaign.",
      });
      // Reset form
      setYoutubeUrl("");
      setVideoTitle("");
      setExtractedVideoId("");
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
                <h1 className="text-2xl font-bold text-foreground">Create Video Ad</h1>
                <p className="text-sm text-muted-foreground">Import and customize your YouTube videos</p>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* YouTube Import Form */}
              <Card className="p-6 bg-card border-border">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Youtube className="w-5 h-5 text-red-500" />
                    <h2 className="text-lg font-semibold text-foreground">Import from YouTube</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="youtube-url">YouTube URL</Label>
                      <Input
                        id="youtube-url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="video-title">Video Title</Label>
                      <Input
                        id="video-title"
                        placeholder="Enter video title for your ad"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <Button 
                      onClick={handleUrlSubmit}
                      className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
                      disabled={!youtubeUrl}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Import Video
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Video Preview */}
              {extractedVideoId && (
                <div className="space-y-4">
                  <VideoPreview 
                    videoId={extractedVideoId}
                    title={videoTitle}
                  />
                  
                  <Button 
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save to Campaign
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Create;