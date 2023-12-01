import React from 'react'
import './LeftSidebar.css'
import { NavLink } from 'react-router-dom';
import Globe from '../../assets/Globe.svg'


const LeftSidebar = () => {
  
 
  return (
    <div className='left-sidebar'  onClick={() => document.body.classList.remove('sidebar-open')} >
    <nav className='side-nav' >

      <NavLink to='/' className='side-nav-links' activeclassname='active'> 
        <p>Home</p>
      </NavLink>
      
     
     

      <div className='side-nav-div'>
        <div><p>PUBLIC</p></div>

          <NavLink to='/Questions' className='side-nav-links' activeclassname='active' >
          <img src={Globe} alt="Globe" />
          <p style={{paddingLeft: "10px"}}>Questions</p>
        </NavLink>
        

          <NavLink to='/Tags' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
          <p>Tags</p>
        </NavLink>
        

          <NavLink to='/Users' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
          <p>Users</p>
        </NavLink>
        
        <NavLink to='/VideoLaunchpad' className='side-nav-links' activeclassname='active' style={{paddingRight:"30px"}}>
          <p>Video Launchpad</p>
        </NavLink>

        <NavLink to='/VideoPlayer' className='side-nav-links' activeclassname='active' >
          <p>Video Player</p>
        </NavLink>

        
      


      </div>


    </nav>
    </div>
  )
}

export default LeftSidebar