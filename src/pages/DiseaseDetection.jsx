function DiseaseDetection() {
  return (
    <div
      style={{
        padding: "30px",
        color: "white",
      }}
    >
      <h1>🦠 Disease Detection</h1>

      <input type="file" />

      <div
        style={{
          marginTop: "20px",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        Upload crop image to detect disease.
      </div>
    </div>
  );
}

export default DiseaseDetection;