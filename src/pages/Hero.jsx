import React from 'react'
import VideoCard from './VideoCard'
import videos from '../context/DemoData'
// import Spline from '@splinetool/react-spline';




const Hero = () => {

    

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