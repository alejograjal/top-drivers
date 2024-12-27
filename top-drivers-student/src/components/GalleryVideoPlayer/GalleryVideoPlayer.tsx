import React, { useState } from "react";

interface Video {
  id: string;
  url: string;
}

interface GalleryVideoPlayerProps {
  videos: Video[];
}

const GalleryVideoPlayer: React.FC<GalleryVideoPlayerProps> = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="video-container">
            <div>
                <video
                    controls
                    src={selectedVideo.url}
                    style={{ width: "100%", borderRadius: "8px" }}
                />
            </div>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {videos.map((video) => (
                <div
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    style={{
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        overflow: "hidden",
                        width: "150px",
                        textAlign: "center",
                    }}
                />
            ))}
        </div>
    </div>
  );
};

export default GalleryVideoPlayer;