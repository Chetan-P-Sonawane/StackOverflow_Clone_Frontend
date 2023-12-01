import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import JoinLaunch from "./JoinLaunch"
import "./VideoLaunch.css";

const Teams = () => {
  
  return (
    
    <div className="home-container-1">
            <LeftSidebar />
       <div className="home-container-2" style={{ marginTop: "30px" }}>
            <JoinLaunch />
          
      </div>
    </div>

   
  )
}

export default Teams