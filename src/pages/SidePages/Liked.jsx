import React from 'react'
import LikedVideoCard from '../../component/LikedVideoCard'
import videos from '../../context/DemoData'

const Liked = () => {
  return (
    <div className="Liked w-full h-full flex flex-col items-center justify-start gap-4">
    
    <div className="header h-full w-full bg-navbar flex items-center justify-center">
                <h1 className='text-2xl'>Liked</h1>
            </div>
    <div className='w-full h-full textured-bg Liked flex flex-col items-center justify-start gap-4'>
      {videos.map((video , index) => {
        return (
          <LikedVideoCard video={video} key={index}/>
        )
      })}
    </div>
    </div>
  )
}

export default Liked