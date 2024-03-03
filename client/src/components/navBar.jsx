import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

export default function NavBar() {
  const location = useLocation();
  const isSignedIn = localStorage.getItem("isSignedIn") === "false";

  const handleSignOut = async () => {
    try {
      const response = await fetch("/API/controllers/authController/signout");
      if (response.ok) {
        console.log("Signout successful!");
        localStorage.setItem("isSignedIn", "true");
        window.location.reload(); // This will refresh the page and update the navbar
      } else {
        console.log("Signout failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="nav">
      <nav className="navbar">
        <img src="../public/images/logo.jpg" alt="logo" className="logo"></img>
        <ul className="nav-link">
          {!isSignedIn ? (
            <>
              <Link to="/AboutUs">
                <li>About Us</li>
              </Link>
              <Link to="/Support">
                <li>Support</li>
              </Link>
              <Link to="/SignUp">
                <li>Sign Up</li>
              </Link>
              <Link to="/SignIn">
                <li>Sign In</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Home">
                <li>Home</li>
              </Link>
              <Link to="/AboutUs">
                <li>About Us</li>
              </Link>
              <Link to="/Support">
                <li>Support</li>
              </Link>
              <Link to="/Map">
                <li>Explore</li>
              </Link>
              <li onClick={handleSignOut} className="signout">
                Sign Out
              </li>
            </>
          )}
        </ul>
        {location.pathname === "/Map" && (
          <input type="text" placeholder="Explore..." className="mapsearch" />
        )}
      </nav>
    </div>
  );
}
