import React from 'react'
import videos from '../../context/DemoData'
import VideoCard from '../VideoCard'
import Render from '../Render/Render'

const News = () => {
  return (
    <div className='w-full h-full textured-bg'>
      <div className='header w-full h-12 bg-navbar flex items-center justify-center'>
        <h1 className='text-2xl'>News</h1>
      </div>
      <Render></Render>
    </div>
  )
}

export default News