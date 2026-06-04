import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🌾 AGRI SENSE AI
      </div>

      <ul>
        <li>Home</li>
        <li>Weather</li>
        <li>Crop AI</li>
        <li>ChatBot</li>
        <li>Community</li>
      </ul>

      import { Link } from "react-router-dom";

<Link to="/login">
  <button className="login-btn">
    Login
  </button>
</Link>
    </nav>
  );
}

export default Navbar;