import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings } from 'lucide-react';

const VideoPlayer = ({video}) => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isBuffering, setIsBuffering] = useState(false);

  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleWaiting = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const rect = volumeRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const skipTime = (seconds) => {
    videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      videoRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const changePlaybackRate = (rate) => {
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const volumePercentage = volume * 100;

  useEffect(() => {
    if(video){
      setVideoData(video);
      console.log(`video: ${video}`);
    console.log(`video _id: ${video?._id}`);
    }
    
  }, [video])

  const formatDate = (timestamp) => {
  if (!timestamp) return "Unknown date";

  return new Date(timestamp).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


  if(!videoData){
    return <div>Can't access now</div>
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-2xl">
      {/* Video Element */}
      <div 
        className="relative aspect-video bg-black cursor-pointer"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={togglePlayPause}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={videoData?.videoFile}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* Loading Spinner */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Play/Pause Overlay */}
        {!isPlaying && !isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
          </div>
        )}

        {/* Controls Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Progress Bar */}
          <div className="px-4 py-2">
            <div
              ref={progressRef}
              className="w-full h-2 bg-white bg-opacity-30 rounded-full cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-red-500 rounded-full relative transition-all duration-150 group-hover:bg-red-400"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlayPause}
                className="text-white hover:text-red-400 transition-colors duration-200"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              {/* Skip Backward */}
              <button
                onClick={() => skipTime(-10)}
                className="text-white hover:text-red-400 transition-colors duration-200"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              {/* Skip Forward */}
              <button
                onClick={() => skipTime(10)}
                className="text-white hover:text-red-400 transition-colors duration-200"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              {/* Volume Control */}
              <div className="flex items-center space-x-2 group">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-red-400 transition-colors duration-200"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div
                  ref={volumeRef}
                  className="w-20 h-2 bg-white bg-opacity-30 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={handleVolumeChange}
                >
                  <div 
                    className="h-full bg-white rounded-full relative"
                    style={{ width: `${volumePercentage}%` }}
                  >
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Time Display */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Settings */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-red-400 transition-colors duration-200"
                >
                  <Settings className="w-5 h-5" />
                </button>
                
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-90 rounded-lg p-2 min-w-[120px]">
                    <div className="text-white text-sm mb-2">Playback Speed</div>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => changePlaybackRate(rate)}
                        className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-white hover:bg-opacity-20 transition-colors duration-200 ${
                          playbackRate === rate ? 'text-red-400' : 'text-white'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-red-400 transition-colors duration-200"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Video Title and Description */}
      <div className="p-4 textured-bg bg-sidebar text-white rounded-b-lg font-serif">
        <h3 className="text-lg font-semibold mb-1">{videoData.title}</h3>
        <p className="text-sm text-gray-400">{videoData.description}</p>
        <div className="text-xs text-gray-500 mt-2">
          <span>{videoData.owner?.fullName}</span> • <span><strong>Views: </strong>{videoData.views}</span> • <span>{formatDate(videoData.createdAt)}</span>
          </div>
          </div>
      {/* End of Video Title and Description */}
    </div>
  );
};

export default VideoPlayer;