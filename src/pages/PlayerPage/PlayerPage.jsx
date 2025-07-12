import React from 'react'
import Navbar from '../../component/Navbar'
import VideoPlayer from '../../component/VideoPlayer'

const PlayerPage = () => {
  return (
    <div className='w-full h-full textured-bg bg-home text-white'>
        <nav>
            <Navbar></Navbar>
        </nav>

        <main>
            <VideoPlayer></VideoPlayer>
            <aside>
                
            </aside>
        </main>
    </div>
  )
}

export default PlayerPage