import React, { useEffect, useState } from 'react'
// import videos from '../../context/DemoData'
// import VideoCard from '../VideoCard'
import axiosInstance from '../../api/axios'
import LikedVideoCard from '../../component/LikedVideoCard'
const RenderHistory = () => {

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
            <div className='w-full h-full textured-bg Liked flex flex-col items-center justify-start gap-4'>
                {videos.map((video, idx) => (
                    <LikedVideoCard key={idx} video={video} />
                ))}
            </div>
        </>
    )
}

export default RenderHistory