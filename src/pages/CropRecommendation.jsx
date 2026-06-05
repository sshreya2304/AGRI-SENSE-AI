import { useState } from "react";
import { aiService } from "../services/api";

function CropRecommendation({ onBack }) {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!temperature || !humidity || !rainfall || !ph) {
      setError("Please fill out all input fields");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const recommendation = await aiService.predictCrop(
        temperature,
        humidity,
        rainfall,
        ph
      );
      setResult(recommendation);
    } catch (err) {
      setError(err.message || "Failed to fetch prediction from backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-container" style={{ maxWidth: "650px", margin: "0 auto" }}>
      <button onClick={onBack} className="btn-secondary" style={{ marginBottom: "20px" }}>
        ← Back to Dashboard
      </button>

      <div className="glass-card">
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          🌱 Crop Recommendation AI
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "24px" }}>
          Enter your soil and climate data to predict the most profitable crop to cultivate.
        </p>

        {error && <div className="error-toast" style={{ marginBottom: "20px" }}>{error}</div>}

        <form onSubmit={handlePredict} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label className="input-label">Temperature (°C)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 28.5"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="custom-input"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="input-label">Humidity (%)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 75.0"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
                className="custom-input"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label className="input-label">Rainfall (mm)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 150.0"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
                className="custom-input"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="input-label">Soil pH</label>
              <input
                type="number"
                step="0.01"
                placeholder="e.g. 6.5"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
                className="custom-input"
                required
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: "10px" }}>
            {loading ? "Analyzing parameters..." : "Predict Optimal Crop"}
          </button>
        </form>

        {loading && (
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <div className="spinner"></div>
            <p style={{ color: "#94a3b8", marginTop: "12px" }}>Running recommendation model...</p>
          </div>
        )}

        {result && (
          <div className="result-card" style={{ marginTop: "30px", animation: "slideUp 0.4s ease-out" }}>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", textTransform: "uppercase", tracking: "1px", color: "#22c55e", fontWeight: "600" }}>
                Recommended Crop
              </span>
              <h1 style={{ fontSize: "32px", margin: "5px 0 0 0" }}>{result.crop}</h1>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div className="metric-box">
                <span className="metric-label">Expected Yield</span>
                <span className="metric-value" style={{ color: result.yield === "High" ? "#4ade80" : "#fbbf24" }}>
                  {result.yield}
                </span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Profitability</span>
                <span className="metric-value" style={{ color: result.profitability === "Excellent" || result.profitability === "Very High" ? "#4ade80" : "#fbbf24" }}>
                  {result.profitability}
                </span>
              </div>
            </div>

            <div className="details-box">
              <strong style={{ display: "block", marginBottom: "6px", color: "#f8fafc" }}>Recommendation Analysis:</strong>
              <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
                {result.details}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropRecommendation;