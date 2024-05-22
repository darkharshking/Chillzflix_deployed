import React from "react";
import "../App.css";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import image from "../assests/profile.jpg";

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Call logout method from AuthProvider
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/">
            <h1 className="logo">CHILLZFLIX</h1>
          </Link>
        </div>
        <div className="menu-container">
          <Link to="/movies/popular" style={{ textDecoration: "none" }}>
            <span>Popular</span>
          </Link>
          <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
            <span>Top Rated</span>
          </Link>
          <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
            <span>Upcoming</span>
          </Link>
        </div>
        <div className="profile-container">
          <img className="profile-picture" src={image} alt="Profile" />
          <div className="profile-text-container">
            <div className="dropdown">
              <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </span>
              {/* <span className="profile-text">PROFILE</span>
              <div className="dropdown-content"></div> */}
            </div>
            <i className="fas fa-caret-down"></i>
          </div>
          {/* <div className="toggle">
            <i className="fas fa-moon toggle-icon"></i>
            <i className="fas fa-sun toggle-icon"></i>
            <div className="toggle-ball"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
