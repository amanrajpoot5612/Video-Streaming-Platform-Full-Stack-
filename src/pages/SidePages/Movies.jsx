import React from 'react'
import videos from '../../context/DemoData'
import VideoCard from '../VideoCard'

const Movies = () => {
  return (
    <div className='w-full h-full textured-bg'>
      <div className='header w-full h-12 bg-navbar flex items-center justify-center'>
        <h1 className='text-2xl'>Movies</h1>
      </div>
      <div className=" content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-4">
                {videos.map((video, idx) => (
                    <VideoCard key={idx} video={video} />
                ))}
            </div>
    </div>
  )
}

export default Movies