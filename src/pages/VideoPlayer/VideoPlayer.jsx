import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import bicon from '../../assets/1xicon_2.svg';
import ficon from '../../assets/2xicon_2.svg';



function VideoPlayer({ src }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [playing, setPlaying] = useState(false);
  let intervalId;
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setPlaying(false);
      if (rewindIntervalId) {
        clearInterval(rewindIntervalId);
        rewindIntervalId = null;
      }
    } else {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play();
      setPlaying(true);
    }
    setIsPlaying(!isPlaying);
    setShowTutorial(false);
  };
  const handleVideoClick = () => {
    handlePlayPause();
  };
  const handleDoubleClick = (event) => {
    event.preventDefault();
    const rect = videoRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const forwardPoint = rect.width * 0.7;
    const rewindPoint = rect.width * 0.3;
    if (x > forwardPoint) {
      videoRef.current.currentTime += 10;
    } else if (x < rewindPoint) {
      videoRef.current.currentTime -= 5;
    }
  };
  const handleMouseDown = (event) => {
    const rect = videoRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const midPoint = rect.width / 2;
    if (x > midPoint) {
      setPlaybackRate(2.0);
      videoRef.current.playbackRate = 2.0;
    } else {
      intervalId = setInterval(() => {
        videoRef.current.playbackRate = 0.0;
        videoRef.current.currentTime -= 1;
      }, 1000);
    }
  };
  const handleMouseUp = () => {
    setPlaybackRate(1.0);
    videoRef.current.playbackRate = 1.0;
    clearInterval(intervalId);
  };
  let rewindIntervalId = null;
  const handleTouchStart = (event) => {
    const rect = videoRef.current.getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left;
    const midPoint = rect.width / 2;
    if (x > midPoint) {
      videoRef.current.playbackRate = 2.0;
    } else {
      rewindIntervalId = setInterval(() => {
        videoRef.current.playbackRate = 0.0;
        videoRef.current.currentTime -= 1;
      }, 1000);
    }
  };
  useEffect(() => {
    const videoNode = videoRef.current;
    videoNode.addEventListener('touchend', handleTouchEndOrCancel);
    videoNode.addEventListener('touchcancel', handleTouchEndOrCancel);
    return () => {
      if (videoNode) {
        videoNode.removeEventListener('touchend', handleTouchEndOrCancel);
        videoNode.removeEventListener('touchcancel', handleTouchEndOrCancel);
      }
    };
  }, []);
  const handleTouchEndOrCancel = () => {
    videoRef.current.playbackRate = 1.0;
    if (rewindIntervalId) {
      clearInterval(rewindIntervalId);
      rewindIntervalId = null;
    }
  };
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const handleProgressChange = (event) => {
    const value = event.target.value;
    const time = (value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = time;
    setProgress(value);
  };
  const handleVolumeChange = (event) => {
    const value = event.target.value;
    videoRef.current.volume = value;
    setVolume(value);
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandMinimize = () => {
    setIsExpanded(!isExpanded);
    // If the device is a mobile device, try to enter fullscreen-like mode
    if (isMobileDevice()) {
      const viewportMetaTag = document.querySelector('meta[name=viewport]');
      viewportMetaTag.content = isExpanded ? 'width=device-width, initial-scale=1.0' : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
      // Attempt to enter landscape mode when expanded
      if (isExpanded) {
        enterLandscapeMode();
      }
    }
  };
  const enterLandscapeMode = () => {
    if (typeof window !== 'undefined' && window.screen && window.screen.orientation && window.screen.orientation.lock) {
        window.screen.orientation.lock('landscape');
      }
    };
  
  
    const isMobileDevice = () => {
      return /Mobi|Android/i.test(navigator.userAgent);
    };
    return (
      <div
        className={`video-container ${playing ? 'playing' : ''}`}
        style={{ width: isExpanded ? '100%' : '500px', height: isExpanded ? '100%' : '250px' }}
      >
        <video
          className="video-player"
          ref={videoRef}
          onClick={handleVideoClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEndOrCancel}
          onDoubleClick={handleDoubleClick}
          onContextMenu={(event) => event.preventDefault()}
          src={src}
        />
        <div className="controls">
          <button onClick={() => videoRef.current.currentTime -= 5}>
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button onClick={handlePlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button onClick={() => videoRef.current.currentTime += 10}>
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
        <div className="bottom-controls" style={{}}>
          <button
            onClick={handlePlayPause}
            style={{ width: isExpanded ? '10px' : '10px', height: isExpanded ? '10px' : '10px' }}
          >
            <FontAwesomeIcon
              style={{ height:'15px' }}
              icon={isPlaying ? faPause : faPlay}
            />
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            style={{ height: '4px', width: isExpanded ? '310px' : '310px', cursor: 'pointer' }}
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            style={{ height: '4px', width: isExpanded ? '40px' : '40px', cursor: 'pointer' }}
          />
          <button
            onClick={handleExpandMinimize}
            style={{ height: isExpanded ? '10px' : '10px', width: isExpanded ? '10px' : '10px' }}
          >
            <FontAwesomeIcon
              icon={isExpanded ? faCompress : faExpand}
              style={{ height:'15px' }}
            />
          </button>
        </div>
        {showTutorial && (
          <div className="tutorial">
            <div className="tutorial-text">
              <img className="hand-icon" src={bicon} alt="Hand Icon" />
              Hold to Rewind
            </div>
            <div className="tutorial-text">
              <img className="hand-icon" src={ficon} alt="Hand Icon" />
              Hold to Forward
            </div>
          </div>
        )}
        {playbackRate !== 1 && <p className="playback-rate">{playbackRate}x</p>}
      </div>
    );
  }
  export default VideoPlayer;