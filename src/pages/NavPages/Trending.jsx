import React from "react";
import videoData from "../../context/TrendingData";
import { Link } from "react-router-dom";

const Trending = () => {
    return (
        <div className="w-full px-6 py-6">
            <h2 className="text-white text-3xl font-bold mb-6">Trending Now</h2>

            {/* Masonry Columns */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {videoData.map((video) => (
                    <div
                        key={video.id}
                        className="mb-4 break-inside-avoid bg-neutral-900 rounded-xl overflow-hidden shadow-lg hover:scale-[1.01] transition-transform"
                    >
                        <Link to={`/video-player-demo`}>
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full rounded-t-xl object-cover"
                            />

                        </Link>

                        <div className="p-3">
                            <p className="text-white font-semibold text-sm">{video.title}</p>
                            <p className="text-gray-400 text-xs mt-1">{video.description}</p>
                            <div className="text-xs text-gray-500 mt-1">
                                {video.channelName} <br />
                                {video.views} • {video.uploaded}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trending;
