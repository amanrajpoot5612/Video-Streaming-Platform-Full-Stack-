import React from 'react'
import videos from '../../context/DemoData'
import VideoCard from '../VideoCard'
import Render from '../Render/Render'

const Sports = () => {
  return (
    <div className='w-full h-full textured-bg'>
      <div className='header w-full h-12 bg-navbar flex items-center justify-center'>
        <h1 className='text-2xl'>Sports</h1>
      </div>
      <Render/>
    </div>
  )
}

export default Sports