import React, {useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useSelector, useDispatch} from 'react-redux'
import decode from "jwt-decode"

import logo from "../assets/logo.png"
import search from "../assets/search-solid.svg"
import Avatar from "./Avatar/Avatar"
import { Squash as Hamburger } from 'hamburger-react'
import "./Navbar.css"
import { setCurrentUser } from '../actions/currentUser'


const Navbar = () => {
   var User = useSelector((state) => (state.currentUserReducer));
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = () => {
      dispatch({ type: "LOGOUT"});
      navigate("/")
      dispatch(setCurrentUser(null))
   }
   
   useEffect(() => {
      const token = User?.token
        if(token){
         const decodedToken = decode(token)
         if(decodedToken.exp * 1000 < new Date().getTime()){
            handleLogout()
         }
        }
     dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
   }, [ dispatch]);

 

  return ( 
       <div>
       
       <nav className ="main-nav">
       <button  className="slide-in-icon" onClick={() => document.body.classList.toggle('sidebar-open')} >
          <Hamburger direction="right" size={20} />
        </button>
       <div className ="navbar">
       
        
                 <Link to="/" className="nav-item nav-logo">
                   <img src={logo} alt={logo} />
                </Link>
         <div className="top-nav-1">
                <Link to="/" className="nav-item nav-btn">About</Link>
                <Link to="/" className="nav-item nav-btn">Products</Link>
                <Link to="/" className="nav-item nav-btn">For Teams</Link>
         </div> 
                <form>
                   <input type="text" placeholder="Search..." />
                   <img src={search} alt="search" width="18" className="search-icon" />
                </form>
        
           <div className="top-nav-2" >
             { User === null ? 
               <Link to="/Auth" className="nav-item nav-links">Log in</Link> :

               <>
                <Avatar 

                   backgroundColor='#009dff'
                  px="10px" 
                  py="5px" 
                  color="White" 
                  borderRadius="50%" center
                  > <Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:"none" }}> {User.result.name.charAt(0).toUpperCase()} </Link>
               
               </Avatar> 
               <button className="nav-item nav-links" onClick={handleLogout}>Log out</button>
         
               </>
             } 
             </div>
            
             </div>
           

       </nav>
       </div>
  )
}

export default Navbar