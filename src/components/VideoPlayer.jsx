import React, { useState, useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

export const VideoPlayer = ({ 
  src, 
  title, 
  onProgress, 
  onComplete,
  initialProgress = 0 
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      // Set initial progress if provided
      if (initialProgress > 0) {
        video.currentTime = (initialProgress / 100) * video.duration;
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const progress = (video.currentTime / video.duration) * 100;
      onProgress?.(progress);
      
      // Check if video is near completion (95%)
      if (progress >= 95 && !video.ended) {
        onComplete?.();
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onComplete?.();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onProgress, onComplete, initialProgress]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const time = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    video.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const handlePlaybackRateChange = (rate) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-player">
      <div className="position-relative video-container">
        <video
          ref={videoRef}
          src={src}
          className="w-100"
          style={{ aspectRatio: '16/9' }}
          onClick={togglePlay}
        />
        
        {/* Play/Pause Overlay */}
        <Button 
          className="btn-play-overlay"
          onClick={togglePlay}
        >
          <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
        </Button>

        {/* Controls */}
        <div className="video-controls">
          {/* Progress Bar */}
          <div className="mb-3">
            <Form.Range
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="progress-bar-custom"
            />
          </div>

          <div className="d-flex justify-content-between align-items-center text-white">
            <div className="d-flex align-items-center">
              {/* Play/Pause Button */}
              <Button variant="link" className="text-white p-1 me-3" onClick={togglePlay}>
                <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
              </Button>

              {/* Volume */}
              <div className="d-flex align-items-center me-3">
                <Button variant="link" className="text-white p-1 me-2" onClick={toggleMute}>
                  <i className={`bi ${isMuted || volume === 0 ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'}`}></i>
                </Button>
                <Form.Range
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume * 100}
                  onChange={handleVolumeChange}
                  style={{ width: '80px' }}
                />
              </div>

              {/* Time */}
              <small>{formatTime(currentTime)} / {formatTime(duration)}</small>
            </div>

            <div className="d-flex align-items-center">
              {/* Playback Speed */}
              <Form.Select
                size="sm"
                value={playbackRate}
                onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                className="bg-transparent text-white border-secondary"
                style={{ width: '80px' }}
              >
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </Form.Select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-dark text-white">
        <h5 className="mb-0">{title}</h5>
      </div>
    </div>
  );
};