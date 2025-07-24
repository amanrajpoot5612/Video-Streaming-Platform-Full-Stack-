import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Navbar'
import VideoPlayer from '../../component/VideoPlayer'
import axiosInstance from '../../api/axios'
import { useParams } from 'react-router-dom'

const PlayerPage = () => {

  const [video, setVideo] = useState(null)
  const { id }  = useParams();

  useEffect(() => {
    const fetchVideo = async() => {
      try {
        const res = await axiosInstance(`/videos/watch/${id}`)


        // L being hit:", `/videos/watch/${id}`);
        // se data:", res.data);
        // ("📦 Response data data:", res.data?.data);
        // se data data _id:", res.data?.data?._id);
        // se data data videoFile:", res.data?.data?.videoFile);

        
        setVideo(res.data?.data)
      } catch (err) {
                console.error("Failed to fetch video", err);
      }
    }
    fetchVideo();
  }, [])

  return (
    <div className='w-full h-full textured-bg bg-home text-white'>
        <nav>
            <Navbar></Navbar>
        </nav>

        <main className='w-full min-w-full'>
              <VideoPlayer video = {video}></VideoPlayer>
            {/* <aside>
                
            </aside> */}
        </main>
    </div>
  )
}

export default PlayerPage