import React, { useState } from 'react';
import { Play, Clock, Eye, MoreVertical, Calendar } from 'lucide-react';

const VideoCard = ({ 
  video = {
    id: 1,
    title: "Building a Modern React Application with Vite and Tailwind CSS",
    description: "Learn how to create a fast, modern React app using Vite as the build tool and Tailwind CSS for styling. This comprehensive tutorial covers everything from setup to deployment.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    duration: "15:30",
    views: "1.2M",
    uploadTime: "2 days ago",
    owner: {
      name: "TechMaster Pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      verified: true
    }
  }
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden max-w-md mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Thumbnail Section */}
      <div className="relative overflow-hidden rounded-t-2xl">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse" />
        )}
        
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-48 object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Video Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{video.duration}</span>
        </div>
        
        {/* Play Button Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-white bg-opacity-90 p-3 rounded-full transform transition-transform duration-300 hover:scale-110">
            <Play className="w-6 h-6 text-red-600 fill-current" />
          </div>
        </div>
        
        {/* More Options Button */}
        <button className={`absolute top-3 right-3 p-2 bg-black bg-opacity-50 rounded-full transition-all duration-300 hover:bg-opacity-70 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          <MoreVertical className="w-4 h-4 text-white" />
        </button>
      </div>
      
      {/* Card Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {video.title}
        </h3>
        
        {/* Owner Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <img
              src={video.owner.avatar}
              alt={video.owner.name}
              className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 transition-all duration-300 group-hover:ring-blue-400"
            />
            {video.owner.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {video.owner.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Channel Owner
            </p>
          </div>
        </div>
        
        {/* Video Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{video.views} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{video.uploadTime}</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar - Optional */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div 
              className="bg-red-600 h-1 rounded-full transition-all duration-500"
              style={{ width: isHovered ? '25%' : '0%' }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} style={{
        background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)',
        padding: '1px',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude'
      }} />
    </div>
  );
};

export default VideoCard;