import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import videoData from '../../context/TrendingData'
import axiosInstance from '../../api/axios';

const RenderTrending = () => {

    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await axiosInstance.get('/videos/get-all')

                if (res?.data) {
                    const shuffled = [...res.data].sort(() => Math.random() - 0.5)
                    setVideos(shuffled)
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        }
        fetchTrending();
    }, [])

    function truncateWords(text, wordLimit) {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "…Read more";
    }

    // const [Date, setDate] = useState(second)

    const formatDate = (timestamp) => {
        if (!timestamp) return "Unknown date";

        return new Date(timestamp).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };



    return (
        <>
            {videos.map((video, idx) => (
                <div
                    key={video._id}
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
                        <p className="text-gray-400 text-xs mt-1"><strong>Description:</strong> {truncateWords(video.description, 30)}</p>
                        <div className="text-xs text-gray-500 mt-1">
                            {video.owner.fullName} <br />
                            Views: {video.views} •
                            {formatDate(video.createdAt)}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default RenderTrending