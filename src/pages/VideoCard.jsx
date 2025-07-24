import React from 'react'
import sign from '../assets/sign.jpg'
import { Link } from 'react-router-dom'


const VideoCard = ({video}) => {
  // in video card: ${video._id}`);

  const formattedDate = new Date(video?.createdAt).toLocaleString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});


  function truncateWords(text, wordLimit) {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "…Read more";
    }
  
  return (
    <div className="card rounded-lg overflow-hidden shadow-md bg-neutral-900 cursor-pointer hover:scale-[1.02] transition-transform duration-200">
      <div className="relative w-full aspect-video bg-gray-700">
        <Link to={`/watch/${video._id}`}>
          <img src={video.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
        </Link>
      </div>
      <div className="p-3 flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
          <img src={video.owner.avatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col text-white">
          <h3 className="text-sm font-semibold">{video.title}</h3>
          {/* <img src={video.owner.avatar} width={50} height={50} className='rounded-4xl' alt="" /> */}
          <p className="text-xs text-gray-400">{video.owner.fullName}</p>
          <p className="text-xs text-gray-400">Views: {video.views} • {formattedDate}</p>
        </div>
        
      </div>
      <div className='p-2'>
          <p className="text-gray-400 text-xs mt-1">Description: {truncateWords(video.description, 30)}</p>
        </div>
    </div>

  )
}

export default VideoCard