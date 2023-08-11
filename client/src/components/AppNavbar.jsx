import React from "react";
import { useState } from "react";
import './Nav.css'
import {useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/authReducer";
const AppNavbar = () => {
  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state=>state.auth.user);
    console.log('user-->',user);
    
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    function handleLogout(){
      dispatch(logout());
    }
  
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <span>Shopping</span>
        </div>
          <div className="dropdown">
          {user !== null ?
            <div className="name-log">
              <h1>{user.name}</h1>
              <button onClick={handleLogout}>Logout</button>
            </div>:null
          }
          </div>
        
      </nav>
    );
}

export default AppNavbar