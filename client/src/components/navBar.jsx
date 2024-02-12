import { Link } from "react-router-dom";
import "./navBar.css";
export default function navBar() {
  return (
    <div className="nav">
      <nav className="navbar">
        <img src="../public/images/logo.jpg" alt="logo" className="logo"></img>
        <ul className="nav-link">
          <Link to="/Home">
            <li>Home</li>
          </Link>
          <Link to="/AboutUs">
            <li>About Us</li>
          </Link>
          <Link to="/Support">
            {" "}
            <li>Support</li>
          </Link>
          <Link to="/SignUp">
            <li>Sign Up</li>
          </Link>
          <Link to="/SignIn">
            {" "}
            <li>Sign In</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
