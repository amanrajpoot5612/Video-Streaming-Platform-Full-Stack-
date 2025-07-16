import { useState } from "react";
import { FileVideo, Image as ImageIcon, UploadCloud } from "lucide-react";

const VideoUploadLeft = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleVideoDrop = (e) => {
    e.preventDefault();
    setVideoFile(e.dataTransfer.files[0]);
  };

  const handleThumbnailDrop = (e) => {
    e.preventDefault();
    setThumbnailFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="w-full h-full flex flex-col gap-4 rounded-xl border border-muted p-4">
      {!videoFile || !thumbnailFile ? (
        <div className="flex flex-col gap-4 h-full">
          {/* Dropzone for Video */}
          <div
            onDrop={handleVideoDrop}
            onDragOver={handleDragOver}
            className="flex-1 border-2 border-dashed border-gray-500 rounded-xl flex items-center justify-center flex-col p-4"
          >
            <FileVideo className="w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Drop video file here</p>
          </div>

          {/* Dropzone for Thumbnail */}
          <div
            onDrop={handleThumbnailDrop}
            onDragOver={handleDragOver}
            className="flex-1 border-2 border-dashed border-gray-500 rounded-xl flex items-center justify-center flex-col p-4"
          >
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Drop thumbnail image here</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Video Preview */}
          <div className="border rounded-xl overflow-hidden">
            <video
              src={URL.createObjectURL(videoFile)}
              controls
              className="w-full rounded-xl"
            />
          </div>

          {/* Thumbnail Preview */}
          <div className="border rounded-xl overflow-hidden">
            <img
              src={URL.createObjectURL(thumbnailFile)}
              alt="Thumbnail Preview"
              className="w-full rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploadLeft;
