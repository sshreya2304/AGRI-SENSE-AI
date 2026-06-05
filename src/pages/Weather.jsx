import { useState, useEffect } from "react";
import { aiService } from "../services/api";

function Weather({ onBack }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await aiService.getWeather();
        setWeather(data);
      } catch (err) {
        setError(err.message || "Failed to load weather forecast");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="card-container" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <button onClick={onBack} className="btn-secondary" style={{ marginBottom: "20px" }}>
        ← Back to Dashboard
      </button>

      <div className="glass-card" style={{ padding: "30px", position: "relative", overflow: "hidden" }}>
        <h2 style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
          ☁️ Weather Forecast
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "24px" }}>
          Real-time agricultural weather forecast for your region.
        </p>

        {loading && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div className="spinner"></div>
            <p style={{ color: "#94a3b8", marginTop: "12px" }}>Fetching latest forecast...</p>
          </div>
        )}

        {error && (
          <div className="error-toast" style={{ marginBottom: "20px" }}>
            {error}
          </div>
        )}

        {weather && !loading && (
          <div style={{ animation: "fadeIn 0.5s ease-out" }}>
            {/* Main Weather Display */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(15, 23, 42, 0.4)",
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                marginBottom: "24px"
              }}
            >
              <div>
                <span style={{ fontSize: "14px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>
                  Current Conditions
                </span>
                <h1 style={{ fontSize: "48px", margin: "5px 0", fontWeight: "800", color: "#f8fafc" }}>
                  {weather.temperature}
                </h1>
                <p style={{ margin: 0, color: "#4ade80", fontWeight: "600", fontSize: "16px" }}>
                  {weather.condition}
                </p>
              </div>
              <div style={{ fontSize: "64px", filter: "drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))" }}>
                ☀️
              </div>
            </div>

            {/* Weather Metrics Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div className="metric-box" style={{ padding: "16px" }}>
                <span style={{ fontSize: "20px", display: "block", marginBottom: "6px" }}>💧</span>
                <span className="metric-label" style={{ fontSize: "11px" }}>Humidity</span>
                <span className="metric-value" style={{ fontSize: "18px", marginTop: "4px" }}>{weather.humidity}</span>
              </div>
              <div className="metric-box" style={{ padding: "16px" }}>
                <span style={{ fontSize: "20px", display: "block", marginBottom: "6px" }}>🌧️</span>
                <span className="metric-label" style={{ fontSize: "11px" }}>Rain Chance</span>
                <span className="metric-value" style={{ fontSize: "18px", marginTop: "4px" }}>{weather.rainfall_chance}</span>
              </div>
              <div className="metric-box" style={{ padding: "16px" }}>
                <span style={{ fontSize: "20px", display: "block", marginBottom: "6px" }}>💨</span>
                <span className="metric-label" style={{ fontSize: "11px" }}>Wind Speed</span>
                <span className="metric-value" style={{ fontSize: "18px", marginTop: "4px" }}>{weather.wind_speed}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;