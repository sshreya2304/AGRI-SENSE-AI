function Dashboard() {
  return (
    <div
      style={{
        color: "white",
        padding: "30px",
      }}
    >
      <h1>🌾 AGRI SENSE AI Dashboard</h1>

      <h2>Welcome Farmer 👨‍🌾</h2>

      <p>Smart Farming Powered By AI</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>🌱 Crop Recommendation</div>
        <div style={cardStyle}>☁️ Weather Forecast</div>
        <div style={cardStyle}>🤖 AI ChatBot</div>
        <div style={cardStyle}>🦠 Disease Detection</div>
        <div style={cardStyle}>🏛️ Govt Schemes</div>
        <div style={cardStyle}>👨‍🌾 Farmer Community</div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "12px",
};

export default Dashboard;