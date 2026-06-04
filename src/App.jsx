import { useState } from "react";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [crop, setCrop] = useState("");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const predictCrop = () => {
    const crops = [
      "🌾 Wheat",
      "🌽 Maize",
      "🌱 Cotton",
      "🍚 Rice",
      "🥜 Groundnut",
      "🌻 Sunflower",
    ];

    const randomCrop =
      crops[Math.floor(Math.random() * crops.length)];

    setCrop(randomCrop);
  };

  const askAI = () => {
    if (message.trim() === "") return;

    setReply(
      "For better crop yield, use quality seeds, maintain proper irrigation, monitor soil health regularly, and follow weather forecasts before sowing."
    );
  };

  const cards = [
    {
      icon: "🌱",
      title: "Crop Recommendation",
      description: "Get AI-based crop suggestions",
      page: "crop",
    },
    {
      icon: "☁️",
      title: "Weather Forecast",
      description: "Real-time weather updates",
      page: "weather",
    },
    {
      icon: "🤖",
      title: "AI Chatbot",
      description: "Talk in your native language",
      page: "chatbot",
    },
    {
      icon: "🦠",
      title: "Disease Detection",
      description: "Detect crop diseases instantly",
      page: "disease",
    },
    {
      icon: "🏛️",
      title: "Govt Schemes",
      description: "Farmer benefits and subsidies",
      page: "schemes",
    },
    {
      icon: "👨‍🌾",
      title: "Farmer Community",
      description: "Connect with farmers",
      page: "community",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "260px",
          background: "#14532D",
          padding: "25px",
        }}
      >
        <h2>🌾 AGRI SENSE AI</h2>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ cursor: "pointer" }} onClick={() => setActivePage("dashboard")}>
            🏠 Dashboard
          </div>

          <div style={{ cursor: "pointer" }} onClick={() => setActivePage("crop")}>
            🌱 Crop AI
          </div>

          <div style={{ cursor: "pointer" }} onClick={() => setActivePage("weather")}>
            ☁️ Weather
          </div>

          <div style={{ cursor: "pointer" }} onClick={() => setActivePage("chatbot")}>
            🤖 AI ChatBot
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: "70px",
            background: "#1e293b",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 30px",
          }}
        >
          <h2>🌾 AGRI SENSE AI</h2>
          <div>👨‍🌾 Farmer</div>
        </div>

        <div style={{ padding: "30px" }}>
          {/* Dashboard */}
          {activePage === "dashboard" && (
            <>
              <h1>Welcome Farmer 👨‍🌾</h1>

              <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
                Smart Farming Powered By Artificial Intelligence
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                  gap: "20px",
                }}
              >
                {cards.map((card) => (
                  <div
                    key={card.title}
                    onClick={() => setActivePage(card.page)}
                    style={{
                      background: "#1e293b",
                      padding: "25px",
                      borderRadius: "15px",
                      cursor: "pointer",
                    }}
                  >
                    <h1>{card.icon}</h1>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Crop AI */}
          {activePage === "crop" && (
            <div
              style={{
                background: "#1e293b",
                padding: "30px",
                borderRadius: "15px",
                maxWidth: "600px",
              }}
            >
              <button
                onClick={() => setActivePage("dashboard")}
                style={buttonStyle}
              >
                ← Back
              </button>

              <h2>🌱 Crop Recommendation AI</h2>

              <input placeholder="Temperature" style={inputStyle} />
              <input placeholder="Humidity" style={inputStyle} />
              <input placeholder="Rainfall" style={inputStyle} />
              <input placeholder="Soil pH" style={inputStyle} />

              <button
                onClick={predictCrop}
                style={{
                  ...buttonStyle,
                  background: "#22C55E",
                  width: "100%",
                  marginTop: "15px",
                }}
              >
                Predict Crop
              </button>

              {crop && (
                <div style={{ marginTop: "20px" }}>
                  <h2>{crop}</h2>
                  <p>Expected Yield: High</p>
                  <p>Profitability: Good</p>
                </div>
              )}
            </div>
          )}

          {/* Weather */}
          {activePage === "weather" && (
            <div
              style={{
                background: "#1e293b",
                padding: "30px",
                borderRadius: "15px",
                maxWidth: "600px",
              }}
            >
              <button
                onClick={() => setActivePage("dashboard")}
                style={buttonStyle}
              >
                ← Back
              </button>

              <h2>☁️ Weather Forecast</h2>

              <p>🌡️ Temperature: 31°C</p>
              <p>💧 Humidity: 72%</p>
              <p>🌧️ Rainfall Chance: 20%</p>
              <p>💨 Wind Speed: 12 km/h</p>
            </div>
          )}

          {/* Chatbot */}
          {activePage === "chatbot" && (
            <div
              style={{
                background: "#1e293b",
                padding: "30px",
                borderRadius: "15px",
                maxWidth: "700px",
              }}
            >
              <button
                onClick={() => setActivePage("dashboard")}
                style={buttonStyle}
              >
                ← Back
              </button>

              <h2>🤖 AGRI AI Assistant</h2>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask in English, Hindi, Gujarati..."
                style={{
                  width: "100%",
                  height: "120px",
                  marginTop: "20px",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              />

              <button
                onClick={askAI}
                style={{
                  ...buttonStyle,
                  background: "#22C55E",
                  marginTop: "15px",
                }}
              >
                Ask AI
              </button>

              {reply && (
                <div
                  style={{
                    marginTop: "20px",
                    background: "#334155",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <strong>AI Response:</strong>
                  <p>{reply}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  borderRadius: "8px",
  border: "none",
};

const buttonStyle = {
  background: "#334155",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default App;