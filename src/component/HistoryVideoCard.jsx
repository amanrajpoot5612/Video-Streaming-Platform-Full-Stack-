import React from "react";
import { optimizeCloudinaryUrl } from "../utils/Cloudinary";

const HistoryVideoCard = ({ video }) => {
    const title = video.title || "Sample Video Title";
    const description = video.description || "This is a sample video description.";
    const thumbnail = video.thumbnail || "https://via.placeholder.com/150";
    const channel = video.channelName || "Sample Channel";
    const avatar = video.channelAvatar || "https://via.placeholder.com/50";
    const views = video.views || "1M views";
    const uploaded = video.uploaded || "1 day ago";

    const optimizedThumb = optimizeCloudinaryUrl(video.thumbnail, 286, 146);
    return (
        <div className="flex w-full max-w-3xl h-32 bg-white bg-navbar rounded-xl shadow-md overflow-hidden border dark:border-gray-700">
            
            {/* Thumbnail */}
            <div className="w-1/2 h-full">
                <img
                    src={optimizedThumb}
                    alt="Video Thumbnail"
                    className="object-cover w-full h-full"
                    loading="lazy" 

                />
            </div>

            {/* Info */}
            <div className="w-1/2 p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-semibold line-clamp-2 text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-400 line-clamp-2">
                        {description}
                    </p>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                    <p>Channel: <span className="font-medium">{channel}</span></p>
                    <p>{views} • {uploaded}</p>
                </div>
            </div>
        </div>
    );
};

export default HistoryVideoCard;
