import React from 'react'
import VideoPlayer from "./VideoPlayer"
import video from "../../assets/video.mp4"
import './VideoPlayer.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'

const playerdemo = () => {
  return (
    <div className='home-container-1'>
    <LeftSidebar />
    <div className='home-container-2' style={{paddingTop:"80px"}} >
      <VideoPlayer src={video} />
        
    </div>
    </div>
  )
}

export default playerdemo