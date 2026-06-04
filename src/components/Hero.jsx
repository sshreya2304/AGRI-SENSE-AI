function Hero() {
  return (
    <div
      style={{
        height: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          marginBottom: "20px",
        }}
      >
        Smart Farming Powered By AI
      </h1>

      <p
        style={{
          fontSize: "1.3rem",
          marginBottom: "30px",
        }}
      >
        Crop Prediction • Weather Forecast • Disease Detection • AI ChatBot
      </p>

      <button
        style={{
          padding: "15px 30px",
          background: "#22C55E",
          border: "none",
          color: "white",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default Hero;