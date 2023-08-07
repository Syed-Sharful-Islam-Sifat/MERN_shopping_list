import React from "react";
import { useState } from "react";
import './Nav.css'
const AppNavbar = () => {
  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <span>Shopping</span>
        </div>
          <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              Dropdown
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <a href="#">Option 1</a>
              </div>
            )}
          </div>
        
      </nav>
    );
}

export default AppNavbar