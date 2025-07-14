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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.mp4')) {
      setUploadedVideo(file);
      const formData = new FormData();
      formData.append("video", file);
  
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          setUploadedVideoUrl(`${import.meta.env.VITE_API_URL}/videos/${data.filePath.split('/').pop()}`);
          if (!videoTitle) {
            setVideoTitle(file.name.replace(/\.[^/.]+$/, ""));
          }
          toast({
            title: "Video Uploaded",
            description: "Video has been successfully uploaded and saved.",
          });
        } else {
          toast({
            title: "Upload Failed",
            description: "Failed to upload the video. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while uploading the video.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid .mp4 video file.",
        variant: "destructive",
      });
    }
  };

  const sendMqttMessage = async (videoUrl: string) => {
    try {
      const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt', {
        username: 'psd',
        password: 'psd',
      });

      client.on('connect', () => {
        const payload = {
          "api-key": "236r126r361236123467124365",
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
        console.log("Using uploaded video URL:", uploadedVideoUrl);
        // For local files, use the Firebase URL format as example
        videoUrl = uploadedVideoUrl;
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
                          Only Supports MP4 video format
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