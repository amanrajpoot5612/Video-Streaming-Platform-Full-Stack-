import React from 'react'
import videos from '../../context/DemoData'
import VideoCard from '../VideoCard'
import RenderTrending from '../Render/RenderTrending'


const Music = () => {
  return (
    <div className='w-full h-full textured-bg'>
      <div className='header w-full h-12 bg-navbar flex items-center justify-center'>
        <h1 className='text-2xl'>Music</h1>
      </div>
      <div className=" content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-4">
                <RenderTrending/>
            </div>
    </div>
  )
}

export default Music  