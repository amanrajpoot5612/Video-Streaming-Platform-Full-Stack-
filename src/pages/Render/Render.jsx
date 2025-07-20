import React, { useEffect, useState } from 'react'
// import videos from '../../context/DemoData'
import VideoCard from '../VideoCard'
import axiosInstance from '../../api/axios'
const Render = () => {

    const [videos, setVideos] = useState([])

    useEffect(() => {
        const getVideo = async () => {
            try {
                const res = await axiosInstance.get('/videos/get-all');

                if (res?.data) {
                    const shuffled = [...res.data].sort(() => Math.random() - 0.5)
                    setVideos(shuffled); // ✅ your array of video objects
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };
        getVideo();
    }, []);

    return (
        <>
            <div className=" content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-4">
                {videos.map((video, idx) => (
                    <VideoCard key={idx} video={video} />
                ))}
            </div>
        </>
    )
}

export default Render