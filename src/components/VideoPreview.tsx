import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VideoPreviewProps {
  videoId?: string;
  videoUrl?: string; // Add this prop for backend video URLs
  title?: string;
  thumbnail?: string;
}

export function VideoPreview({ 
  videoId, 
  videoUrl, 
  title = "Sample Video",
  thumbnail 
}: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const youtubeEmbedUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=1&rel=0`
    : null;

  const youtubeThumbnail = thumbnail || (videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null);

  return (
    <Card className="bg-[hsl(var(--video-bg))] border-border overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground truncate">{title}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="h-8 w-8 p-0"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="relative aspect-video bg-black rounded-lg overflow-hidden group">
          {videoUrl ? (
            // Render backend video
            <video
              src={videoUrl}
              controls
              muted={isMuted}
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          ) : youtubeEmbedUrl ? (
            // Render YouTube video
            !isPlaying ? (
              <div 
                className="relative w-full h-full cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <img 
                  src={youtubeThumbnail || ""}
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                src={youtubeEmbedUrl}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )
          ) : (
            <p className="text-center text-muted-foreground">No video available</p>
          )}
        </div>
      </div>
    </Card>
  );
}