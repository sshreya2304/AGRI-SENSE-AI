function Weather() {
  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>☁️ Weather Forecast</h1>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <h2>Vadodara</h2>

        <p>🌡️ Temperature: 31°C</p>
        <p>💧 Humidity: 72%</p>
        <p>🌧️ Rain Chance: 20%</p>
        <p>💨 Wind Speed: 12 km/h</p>
      </div>
    </div>
  );
}

export default Weather;