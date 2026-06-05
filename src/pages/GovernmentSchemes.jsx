function GovernmentSchemes({ onBack }) {
  const schemes = [
    {
      title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      type: "Income Support",
      benefit: "₹6,000 per year in three equal installments",
      eligibility: "All landholding farmer families across the country.",
      description: "A central government scheme providing direct cash assistance to small and marginal farmers to help secure agricultural inputs."
    },
    {
      title: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
      type: "Crop Insurance",
      benefit: "Low premiums (1.5% to 2% max) for complete crop damage coverage",
      eligibility: "All farmers growing notified crops in notified areas.",
      description: "Protects crops against natural calamities, pests, and diseases. Ensures quick settlement of claims straight into farmers' bank accounts."
    },
    {
      title: "Subsidized Solar Pump Scheme (KUSUM)",
      type: "Solar Subsidy",
      benefit: "Up to 60% subsidy on installing solar water pumps",
      eligibility: "Individual farmers, groups, cooperatives, and water user associations.",
      description: "Promotes clean energy for irrigation. Farmers can replace existing diesel pumps with solar pumps and sell surplus power to the grid."
    },
    {
      title: "Soil Health Card Scheme",
      type: "Soil Diagnostics",
      benefit: "Free detailed soil testing and personalized fertilizer guidance",
      eligibility: "Every operational landholder family in rural areas.",
      description: "Provides information on nutrient status (NPK, micro-nutrients) of the soil and recommendations on dosage of fertilizers needed."
    }
  ];

  return (
    <div className="card-container" style={{ maxWidth: "850px", margin: "0 auto" }}>
      <button onClick={onBack} className="btn-secondary" style={{ marginBottom: "20px" }}>
        ← Back to Dashboard
      </button>

      <div className="glass-card" style={{ padding: "30px" }}>
        <h2 style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
          🏛️ Government Agriculture Schemes
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "24px" }}>
          Explore benefit programs, financial aids, and subsidies available to support your farming operations.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {schemes.map((scheme, index) => (
            <div
              key={index}
              style={{
                background: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "16px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                transition: "transform 0.2s, border-color 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                <h3 style={{ margin: 0, fontSize: "18px", color: "white" }}>{scheme.title}</h3>
                <span
                  style={{
                    background: "rgba(34, 197, 94, 0.1)",
                    color: "#4ade80",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}
                >
                  {scheme.type}
                </span>
              </div>

              <p style={{ margin: 0, color: "#cbd5e1", fontSize: "14px", lineHeight: "1.5" }}>
                {scheme.description}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  background: "rgba(15, 23, 42, 0.3)",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  fontSize: "13px"
                }}
              >
                <div>
                  <strong style={{ color: "#94a3b8" }}>Benefits:</strong>
                  <div style={{ color: "#f8fafc", marginTop: "2px" }}>{scheme.benefit}</div>
                </div>
                <div>
                  <strong style={{ color: "#94a3b8" }}>Eligibility:</strong>
                  <div style={{ color: "#f8fafc", marginTop: "2px" }}>{scheme.eligibility}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GovernmentSchemes;
