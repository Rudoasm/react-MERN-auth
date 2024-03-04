import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/User/userSlice";

export default function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("isSignedIn") === "true"
  );

  useEffect(() => {
    // This function is called whenever the localStorage changes
    const handleStorageChange = () => {
      setIsSignedIn(localStorage.getItem("isSignedIn") === "true");
    };

    // Add the event listener
    window.addEventListener("storage", handleStorageChange);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // The empty array means this effect runs once when the component mounts, and not on updates

  const handleSignOut = async () => {
    try {
      await fetch("/API/auth/signout");
      dispatch(signOut());
      setIsSignedIn(false); // Set isSignedIn state to false
      navigate("/SignIn", { replace: true }); // Then navigate to SignIn page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nav">
      <nav className="navbar">
        <img
          src="../public/images/Travel_App__1_-removebg-preview.png"
          alt="logo"
          className="logo"
        ></img>
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
                <li className="btn-s">Sign Up</li>
              </Link>
              <Link to="/SignIn">
                <li className="btn-s">Sign In</li>
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
              <li onClick={handleSignOut} className="btn-s">
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
