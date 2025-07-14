import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VideoPreview } from "@/components/VideoPreview";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Youtube, Plus, Save, Upload } from "lucide-react";
import mqtt from "mqtt";

const Create = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [extractedVideoId, setExtractedVideoId] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setUploadedVideo(file);
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideoUrl(videoUrl);
      if (!videoTitle) {
        setVideoTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
      toast({
        title: "Video Uploaded",
        description: "Local video has been successfully uploaded for editing.",
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid video file.",
        variant: "destructive",
      });
    }
  };

  const sendMqttMessage = async (videoUrl: string) => {
    try {
      const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt', {
        username: 'xxx',
        password: 'xxx',
      });

      client.on('connect', () => {
        const payload = {
          "api-key": "xxxx",
          "command": "ads1",
          "url": videoUrl
        };

        client.publish('TEST/MKS-UNM-01', JSON.stringify(payload), (err) => {
          if (err) {
            toast({
              title: "MQTT Error",
              description: "Failed to send video data to MQTT broker.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Data Sent",
              description: "Video data successfully sent to MQTT broker.",
            });
          }
          client.end();
        });
      });

      client.on('error', (error) => {
        toast({
          title: "MQTT Connection Error",
          description: "Failed to connect to MQTT broker.",
          variant: "destructive",
        });
        client.end();
      });
    } catch (error) {
      toast({
        title: "MQTT Error",
        description: "An error occurred while sending data to MQTT broker.",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    if ((extractedVideoId || uploadedVideo) && videoTitle) {
      // Determine video URL
      let videoUrl = "";
      if (extractedVideoId) {
        videoUrl = `https://www.youtube.com/watch?v=${extractedVideoId}`;
      } else if (uploadedVideoUrl) {
        // For local files, use the Firebase URL format as example
        videoUrl = "https://firebasestorage.googleapis.com/v0/b/psd-display.appspot.com/o/1.mp4?alt=media&token=809ed76e-bfa7-4ea3-a047-dc7ab1f85115";
      }

      // Send MQTT message
      sendMqttMessage(videoUrl);

      toast({
        title: "Video Saved",
        description: "Your video ad has been saved to your campaign.",
      });
      
      // Reset form
      setYoutubeUrl("");
      setVideoTitle("");
      setExtractedVideoId("");
      setUploadedVideo(null);
      setUploadedVideoUrl("");
    }
  };

  const resetForm = () => {
    setYoutubeUrl("");
    setVideoTitle("");
    setExtractedVideoId("");
    setUploadedVideo(null);
    setUploadedVideoUrl("");
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
              {/* Video Import Options */}
              <Card className="p-6 bg-card border-border">
                <Tabs defaultValue="youtube" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="youtube" className="flex items-center gap-2">
                      <Youtube className="w-4 h-4" />
                      YouTube
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="youtube" className="space-y-4">
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
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="video-file">Upload Video File</Label>
                        <Input
                          id="video-file"
                          type="file"
                          accept="video/*"
                          onChange={handleFileUpload}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Supports MP4, WebM, AVI, MOV and other video formats
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="local-video-title">Video Title</Label>
                        <Input
                          id="local-video-title"
                          placeholder="Enter video title for your ad"
                          value={videoTitle}
                          onChange={(e) => setVideoTitle(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      {uploadedVideo && (
                        <div className="p-3 bg-muted rounded-md">
                          <p className="text-sm font-medium text-foreground">
                            {uploadedVideo.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadedVideo.size / (1024 * 1024)).toFixed(1)} MB
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>

              {/* Video Preview */}
              {(extractedVideoId || uploadedVideoUrl) && (
                <div className="space-y-4">
                  {extractedVideoId ? (
                    <VideoPreview 
                      videoId={extractedVideoId}
                      title={videoTitle}
                    />
                  ) : (
                    <Card className="p-4 bg-card border-border">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">{videoTitle || "Uploaded Video"}</h3>
                        <video
                          src={uploadedVideoUrl}
                          controls
                          className="w-full h-64 bg-black rounded-md"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </Card>
                  )}
                  
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