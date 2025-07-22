import React from "react";

const LikedVideoCard = ({ video }) => {
    console.log(`video data in Likedvideocard : ${video.views}`);
    
    const title = video.title || "Sample Video Title";
    const description = video.description || "This is a sample video description.";
    const thumbnail = video.thumbnail || "https://via.placeholder.com/150";
    const channel = video.channelName || "Sample Channel";
    const avatar = video.channelAvatar || "https://via.placeholder.com/50";
    const views = video.views;
    const uploaded = video.formattedDate || "1 day ago";

    const formattedDate = new Date(video?.createdAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    function truncateWords(text, wordLimit) {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "…Read more";
    }

    return (
        <div className="flex w-full max-w-3xl h-32 bg-white bg-navbar rounded-xl shadow-md overflow-hidden border dark:border-gray-700">

            {/* Thumbnail */}
            <div className="w-1/2 h-full">
                <img
                    src={thumbnail}
                    alt="Video Thumbnail"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Info */}
            <div className="w-1/2 p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-semibold line-clamp-2 text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                        <p>Channel: <span className="font-medium">{video.owner.fullName}</span></p>
                        <p>Views: {views}</p>
                        <p>• {formattedDate}</p>
                    </div>
                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-400 line-clamp-2">
                        <strong>Description:</strong> {truncateWords(description, 10)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LikedVideoCard;
