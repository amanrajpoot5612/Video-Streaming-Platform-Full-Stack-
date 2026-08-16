import { useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, Settings, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

const VideoPlayer = ({ video }) => {
  const playerRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return undefined;

    const onTimeUpdate = () => setCurrentTime(element.currentTime);
    const onMetadata = () => setDuration(Number.isFinite(element.duration) ? element.duration : 0);
    const onWaiting = () => setIsBuffering(true);
    const onCanPlay = () => setIsBuffering(false);

    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("loadedmetadata", onMetadata);
    element.addEventListener("waiting", onWaiting);
    element.addEventListener("canplay", onCanPlay);

    return () => {
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("loadedmetadata", onMetadata);
      element.removeEventListener("waiting", onWaiting);
      element.removeEventListener("canplay", onCanPlay);
    };
  }, [video?.videoFile]);

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlayback = (event) => {
    event?.stopPropagation();
    const element = videoRef.current;
    if (!element) return;

    if (element.paused) {
      element.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      element.pause();
      setIsPlaying(false);
    }
  };

  const seek = (event) => {
    event.stopPropagation();
    const element = videoRef.current;
    const track = progressRef.current;
    if (!element || !track || !duration) return;
    const { left, width } = track.getBoundingClientRect();
    const nextTime = Math.max(0, Math.min(duration, ((event.clientX - left) / width) * duration));
    element.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const skip = (seconds, event) => {
    event.stopPropagation();
    const element = videoRef.current;
    if (!element) return;
    const nextTime = Math.max(0, Math.min(duration, element.currentTime + seconds));
    element.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const changeVolume = (event) => {
    event.stopPropagation();
    const element = videoRef.current;
    const track = volumeRef.current;
    if (!element || !track) return;
    const { left, width } = track.getBoundingClientRect();
    const nextVolume = Math.max(0, Math.min(1, (event.clientX - left) / width));
    element.volume = nextVolume;
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  };

  const toggleMute = (event) => {
    event.stopPropagation();
    const element = videoRef.current;
    if (!element) return;
    const nextMuted = !isMuted;
    element.volume = nextMuted ? 0 : volume || 1;
    setIsMuted(nextMuted);
  };

  const setSpeed = (rate) => {
    if (videoRef.current) videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const toggleFullscreen = async (event) => {
    event.stopPropagation();
    if (!playerRef.current) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await playerRef.current.requestFullscreen();
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="player-shell" ref={playerRef}>
      <div
        className="player-stage"
        onClick={togglePlayback}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onMouseMove={() => setShowControls(true)}
      >
        <video ref={videoRef} src={video?.videoFile} onEnded={() => setIsPlaying(false)} />

        {!isPlaying && !isBuffering && (
          <div className="player-scrim">
            <button type="button" className="player-scrim__button" aria-label="Play video" onClick={togglePlayback}>
              <Play size={27} fill="currentColor" />
            </button>
          </div>
        )}

        {isBuffering && (
          <div className="player-scrim" aria-label="Buffering video">
            <span className="bugsy-skeleton" style={{ minHeight: 48, width: 48, borderRadius: "999px" }} />
          </div>
        )}

        <div className="player-controls" style={{ opacity: showControls ? 1 : 0 }} onClick={(event) => event.stopPropagation()}>
          <div ref={progressRef} className="player-progress" onClick={seek} role="slider" aria-label="Video progress" aria-valuemin="0" aria-valuemax={duration} aria-valuenow={currentTime}>
            <span style={{ width: `${progress}%` }} />
            <i style={{ left: `${progress}%` }} />
          </div>
          <div className="player-control-row">
            <div className="player-control-group">
              <button type="button" className="bugsy-icon-btn" onClick={togglePlayback} aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              </button>
              <button type="button" className="bugsy-icon-btn" onClick={(event) => skip(-10, event)} aria-label="Rewind 10 seconds"><SkipBack size={18} /></button>
              <button type="button" className="bugsy-icon-btn" onClick={(event) => skip(10, event)} aria-label="Forward 10 seconds"><SkipForward size={18} /></button>
              <button type="button" className="bugsy-icon-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>{isMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}</button>
              <div ref={volumeRef} className="player-volume" onClick={changeVolume} aria-label="Volume"><span style={{ width: `${(isMuted ? 0 : volume) * 100}%` }} /></div>
              <span className="player-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div className="player-control-group">
              <div style={{ position: "relative" }}>
                <button type="button" className="bugsy-icon-btn" onClick={(event) => { event.stopPropagation(); setShowSettings((open) => !open); }} aria-label="Playback settings"><Settings size={18} /></button>
                {showSettings && (
                  <div className="player-settings">
                    <p className="player-settings__title">Playback speed</p>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button className={playbackRate === rate ? "is-selected" : ""} type="button" onClick={() => setSpeed(rate)} key={rate}>
                        <span>{rate}x</span>{playbackRate === rate && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button type="button" className="bugsy-icon-btn" onClick={toggleFullscreen} aria-label="Fullscreen"><Maximize size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
