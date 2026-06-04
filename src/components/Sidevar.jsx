import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#14532D",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>🌾 AGRI SENSE AI</h2>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Link to="/" style={linkStyle}>🏠 Dashboard</Link>

        <Link to="/crop" style={linkStyle}>🌱 Crop AI</Link>

        <Link to="/weather" style={linkStyle}>☁️ Weather</Link>

        <Link to="/chatbot" style={linkStyle}>🤖 ChatBot</Link>

        <Link to="/disease" style={linkStyle}>🦠 Disease Detection</Link>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

export default Sidebar;