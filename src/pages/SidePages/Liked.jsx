import React from 'react'
import LikedVideoCard from '../../component/LikedVideoCard'
import videos from '../../context/DemoData'
import RenderLiked from '../Render/RenderLiked'

const Liked = () => {
  return (
    <div className="Liked w-full h-full flex flex-col items-center justify-start gap-4">
    
    <div className="header h-full w-full bg-navbar flex items-center justify-center">
                <h1 className='text-2xl'>Liked</h1>
            </div>
    <RenderLiked/>
    </div>
  )
}

export default Liked