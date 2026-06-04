import { useState } from "react";

function CropRecommendation() {

  const [crop, setCrop] = useState("");

  const predictCrop = () => {
    setCrop("Cotton 🌱");
  };

  return (
    <div
      style={{
        padding:"40px",
        minHeight:"100vh",
        background:"#0f172a",
        color:"white"
      }}
    >
      <h1>Crop Recommendation AI</h1>

      <input
        placeholder="Temperature"
        style={{display:"block",margin:"10px",padding:"10px"}}
      />

      <input
        placeholder="Humidity"
        style={{display:"block",margin:"10px",padding:"10px"}}
      />

      <input
        placeholder="Rainfall"
        style={{display:"block",margin:"10px",padding:"10px"}}
      />

      <button
        onClick={predictCrop}
        style={{
          padding:"12px",
          background:"#22C55E",
          border:"none"
        }}
      >
        Predict
      </button>

      <h2>{crop}</h2>
    </div>
  );
}

export default CropRecommendation;