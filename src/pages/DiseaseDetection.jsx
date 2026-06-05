import { useState } from "react";

function DiseaseDetection({ onBack }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!image) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setResult({
        disease: "Tomato Early Blight 🍂",
        confidence: "94.2%",
        treatment: "Prune infected lower leaves, avoid overhead watering to prevent spore spread, and apply an organic copper-based fungicide if symptoms persist.",
        preventative: "Rotate tomato crops yearly. Ensure adequate spacing between plants for airflow and mulch the soil to prevent soil-borne fungi from splashing onto leaves."
      });
    }, 2000);
  };

  return (
    <div className="card-container" style={{ maxWidth: "650px", margin: "0 auto" }}>
      <button onClick={onBack} className="btn-secondary" style={{ marginBottom: "20px" }}>
        ← Back to Dashboard
      </button>

      <div className="glass-card">
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          🦠 Crop Disease Detection
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "24px" }}>
          Upload a clear photo of the infected crop leaf to identify the disease and get recommended treatments.
        </p>

        {/* Upload Box */}
        <div
          style={{
            border: "2px dashed rgba(255, 255, 255, 0.15)",
            borderRadius: "16px",
            padding: "30px",
            textAlign: "center",
            background: "rgba(15, 23, 42, 0.4)",
            cursor: "pointer",
            transition: "border-color 0.3s",
            position: "relative",
            marginBottom: "20px"
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
              setImage(file);
              setImagePreview(URL.createObjectURL(file));
              setResult(null);
            }
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer"
            }}
          />

          {!imagePreview ? (
            <div>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📸</div>
              <p style={{ margin: "0 0 8px 0", color: "#f8fafc", fontWeight: "600" }}>
                Drag & drop leaf image or click to browse
              </p>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Supports JPG, PNG up to 10MB</span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={imagePreview}
                alt="Upload Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "220px",
                  borderRadius: "12px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.3)"
                }}
              />
              <span style={{ fontSize: "12px", color: "#94a3b8", marginTop: "10px" }}>
                {image.name}
              </span>
            </div>
          )}
        </div>

        {image && !loading && !result && (
          <button onClick={handleAnalyze} className="btn-primary" style={{ width: "100%" }}>
            Analyze Crop Health
          </button>
        )}

        {loading && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div className="spinner"></div>
            <p style={{ color: "#94a3b8", marginTop: "12px" }}>Scanning leaf patterns for pathogens...</p>
          </div>
        )}

        {result && (
          <div className="result-card" style={{ marginTop: "24px", animation: "slideUp 0.4s ease" }}>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#ef4444", fontWeight: "600" }}>
                Diagnosis Result
              </span>
              <h2 style={{ fontSize: "24px", margin: "5px 0" }}>{result.disease}</h2>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                Confidence Score: <strong style={{ color: "#4ade80" }}>{result.confidence}</strong>
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="details-box" style={{ background: "rgba(239, 68, 68, 0.05)", borderLeft: "4px solid #ef4444" }}>
                <strong style={{ display: "block", marginBottom: "4px", color: "#fca5a5" }}>Immediate Treatment:</strong>
                <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>
                  {result.treatment}
                </p>
              </div>

              <div className="details-box" style={{ background: "rgba(34, 197, 94, 0.05)", borderLeft: "4px solid #22c55e" }}>
                <strong style={{ display: "block", marginBottom: "4px", color: "#86efac" }}>Preventative Measures:</strong>
                <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>
                  {result.preventative}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiseaseDetection;