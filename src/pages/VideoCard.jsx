import React from 'react'
import sign from '../assets/sign.jpg'
import { Link } from 'react-router-dom'


const VideoCard = ({video}) => {
  return (
    <div className="card rounded-lg overflow-hidden shadow-md bg-neutral-900 cursor-pointer hover:scale-[1.02] transition-transform duration-200">
      <div className="relative w-full aspect-video bg-gray-700">
        <Link to={`/video-player`}>
          <img src={video.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
        </Link>
      </div>
      <div className="p-3 flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
          <img src={video.channelAvatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col text-white">
          <h3 className="text-sm font-semibold">{video.title}</h3>
          <p className="text-xs text-gray-400">{video.channelName}</p>
          <p className="text-xs text-gray-400">{video.views} • {video.uploaded}</p>
        </div>
      </div>
    </div>

  )
}

export default VideoCard