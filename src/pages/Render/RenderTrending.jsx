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


    return (
        <>
            {videos.map((video) => (
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
                        <p className="text-gray-400 text-xs mt-1">{truncateWords(video.description, 30)}</p>
                        <div className="text-xs text-gray-500 mt-1">
                            {video.owner.fullName} <br />
                            {video.views} •
                            {/* {video.uploaded} */}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default RenderTrending