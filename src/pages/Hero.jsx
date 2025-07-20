import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
// import videos from '../context/DemoData'
import axiosInstance from '../api/axios'
// import Spline from '@splinetool/react-spline';




const Hero = () => {

    const [videos, setVideos] = useState([]);

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
        <div>
            {/* <div className="landing w-full h-screen bg-green-800 opacity-35">
                <Spline scene="https://prod.spline.design/U7xdJi2ZulD8a3NM/scene.splinecode" />
            </div> */}
            <div className=" content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-4">
                {videos.map((video, idx) => (
                    <VideoCard key={idx} video={video} />
                ))}
            </div>
        </div>
    )
}

export default Hero