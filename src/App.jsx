import { useState, useEffect } from "react";
import { authService } from "./services/api";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CropRecommendation from "./pages/CropRecommendation";
import ChatBot from "./pages/ChatBot";
import Weather from "./pages/Weather";
import DiseaseDetection from "./pages/DiseaseDetection";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import Community from "./pages/Community";

function App() {
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  // Check if user has an active session token on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setActivePage("dashboard");
        }
      } catch (err) {
        console.error("Auth verification failed", err);
      } finally {
        setAuthChecking(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setActivePage("login");
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setActivePage("dashboard");
  };

  // 1. Loading State
  if (authChecking) {
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#0b0f19" }}>
        <div style={{ textAlign: "center" }}>
          <div className="spinner"></div>
          <p style={{ color: "#94a3b8", marginTop: "16px", fontSize: "15px" }}>Loading Agri Sense AI...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State
  if (!user) {
    if (activePage === "signup") {
      return (
        <Signup
          onSignupSuccess={handleLoginSuccess}
          onSwitchToLogin={() => setActivePage("login")}
        />
      );
    }
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={() => setActivePage("signup")}
      />
    );
  }

  // 3. Dashboard tiles data
  const cards = [
    {
      icon: "🌱",
      title: "Crop Recommendation",
      description: "Get smart crop suggestion matching your parameters.",
      page: "crop",
    },
    {
      icon: "☁️",
      title: "Weather Forecast",
      description: "Evaluate live climate patterns & wind conditions.",
      page: "weather",
    },
    {
      icon: "🤖",
      title: "AI Chatbot",
      description: "Consult our farming intelligence in natural language.",
      page: "chatbot",
    },
    {
      icon: "🦠",
      title: "Disease Detection",
      description: "Identify leaf pathogens and get immediate remedies.",
      page: "disease",
    },
    {
      icon: "🏛️",
      title: "Govt Schemes",
      description: "Access farmer subsidies, crop insurance & benefits.",
      page: "schemes",
    },
    {
      icon: "👨‍🌾",
      title: "Farmer Community",
      description: "Connect with rural crop growers & share advice.",
      page: "community",
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0b0f19", color: "#f8fafc" }}>
      {/* Sidebar navigation */}
      <aside
        style={{
          width: "280px",
          background: "linear-gradient(180deg, #0f3d23 0%, #082414 100%)",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          padding: "30px 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
            <span style={{ fontSize: "28px" }}>🌾</span>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#f8fafc", letterSpacing: "0.5px", margin: 0 }}>
              AGRI SENSE AI
            </h2>
          </div>

          {/* Nav Links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              onClick={() => setActivePage("dashboard")}
              style={getSidebarLinkStyle(activePage === "dashboard")}
            >
              🏠 Dashboard
            </div>
            <div
              onClick={() => setActivePage("crop")}
              style={getSidebarLinkStyle(activePage === "crop")}
            >
              🌱 Crop AI
            </div>
            <div
              onClick={() => setActivePage("weather")}
              style={getSidebarLinkStyle(activePage === "weather")}
            >
              ☁️ Weather
            </div>
            <div
              onClick={() => setActivePage("chatbot")}
              style={getSidebarLinkStyle(activePage === "chatbot")}
            >
              🤖 AI ChatBot
            </div>
            <div
              onClick={() => setActivePage("disease")}
              style={getSidebarLinkStyle(activePage === "disease")}
            >
              🦠 Disease AI
            </div>
            <div
              onClick={() => setActivePage("schemes")}
              style={getSidebarLinkStyle(activePage === "schemes")}
            >
              🏛️ Govt Schemes
            </div>
            <div
              onClick={() => setActivePage("community")}
              style={getSidebarLinkStyle(activePage === "community")}
            >
              👨‍🌾 Community
            </div>
          </nav>
        </div>

        {/* User profile logout section */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>👨‍🌾</span>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontWeight: "600", fontSize: "14px", color: "white", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {user.name}
              </div>
              <div style={{ fontSize: "11px", color: "#a7f3d0" }}>Active Farmer</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-secondary" style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Navbar */}
        <header
          style={{
            height: "75px",
            background: "rgba(15, 23, 42, 0.45)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 40px",
            zIndex: 10
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#e2e8f0" }}>
            {activePage === "dashboard" ? "System Overview" : activePage === "crop" ? "Crop Recommendation Tool" : activePage === "weather" ? "Weather Forecast" : activePage === "chatbot" ? "AI Farmer Companion" : activePage === "disease" ? "Crop Pathology Diagnosis" : activePage === "schemes" ? "Government Subsidies" : "Farmer Forums"}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(34, 197, 94, 0.1)", padding: "6px 14px", borderRadius: "20px", border: "1px solid rgba(34, 197, 94, 0.15)", fontSize: "13px", fontWeight: "600", color: "#4ade80" }}>
            <span>●</span> Server Connected
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
          {/* 1. Dashboard View */}
          {activePage === "dashboard" && (
            <div style={{ animation: "slideUp 0.5s ease-out" }}>
              <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "6px", color: "white" }}>
                Welcome, {user.name} 🌾
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "35px" }}>
                Welcome to your agricultural workspace. Select an AI service tile below to manage crops.
              </p>

              {/* Grid of tiles */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                }}
              >
                {cards.map((card) => (
                  <div
                    key={card.title}
                    onClick={() => setActivePage(card.page)}
                    style={{
                      background: "rgba(30, 41, 59, 0.4)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      padding: "30px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.3)";
                      e.currentTarget.style.background = "rgba(30, 41, 59, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.background = "rgba(30, 41, 59, 0.4)";
                    }}
                  >
                    <div style={{ fontSize: "40px", marginBottom: "16px" }}>{card.icon}</div>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "white" }}>
                      {card.title}
                    </h3>
                    <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.5" }}>
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Crop Recommendation View */}
          {activePage === "crop" && (
            <CropRecommendation onBack={() => setActivePage("dashboard")} />
          )}

          {/* 3. Weather View */}
          {activePage === "weather" && (
            <Weather onBack={() => setActivePage("dashboard")} />
          )}

          {/* 4. Chatbot View */}
          {activePage === "chatbot" && (
            <ChatBot onBack={() => setActivePage("dashboard")} />
          )}

          {/* 5. Disease Detection View */}
          {activePage === "disease" && (
            <DiseaseDetection onBack={() => setActivePage("dashboard")} />
          )}

          {/* 6. Schemes View */}
          {activePage === "schemes" && (
            <GovernmentSchemes onBack={() => setActivePage("dashboard")} />
          )}

          {/* 7. Community View */}
          {activePage === "community" && (
            <Community onBack={() => setActivePage("dashboard")} />
          )}
        </main>
      </div>
    </div>
  );
}

// Helper styling function for Sidebar Links
const getSidebarLinkStyle = (isActive) => ({
  padding: "14px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "600",
  transition: "all 0.2s",
  background: isActive ? "rgba(255, 255, 255, 0.12)" : "transparent",
  color: isActive ? "#ffffff" : "#c7d2fe",
  borderLeft: isActive ? "4px solid #4ade80" : "4px solid transparent",
  paddingLeft: isActive ? "14px" : "18px"
});

export default App;