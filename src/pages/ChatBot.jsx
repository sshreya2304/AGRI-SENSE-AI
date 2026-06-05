import { useState, useRef, useEffect } from "react";
import { aiService } from "../services/api";

function ChatBot({ onBack }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! 👨‍🌾 I am your Agri Sense AI assistant. Ask me anything about crop cultivation, soil health, irrigation, pest control, or weather preparation! How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chatEndRef = useRef(null);

  // Auto scroll to bottom of chat when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    const messageToSend = inputText.trim();
    if (!messageToSend) return;

    // Add user message to thread
    const userMsg = {
      sender: "user",
      text: messageToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setLoading(true);
    setError("");

    try {
      const data = await aiService.askChatbot(messageToSend);
      
      const aiMsg = {
        sender: "ai",
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setError(err.message || "Failed to communicate with AI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-container" style={{ maxWidth: "800px", margin: "0 auto", height: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}>
      <button onClick={onBack} className="btn-secondary" style={{ alignSelf: "flex-start", marginBottom: "15px" }}>
        ← Back to Dashboard
      </button>

      <div className="glass-card" style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px", overflow: "hidden", minHeight: "450px" }}>
        {/* Header */}
        <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "15px", marginBottom: "15px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ fontSize: "28px" }}>🤖</div>
          <div>
            <h3 style={{ margin: 0, color: "white" }}>AGRI AI Assistant</h3>
            <span style={{ fontSize: "12px", color: "#22c55e", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "8px", height: "8px", background: "#22c55e", borderRadius: "50%" }}></span>
              Online & Ready
            </span>
          </div>
        </div>

        {/* Messages Thread */}
        <div className="chat-thread" style={{ flex: 1, overflowY: "auto", paddingRight: "8px", display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "75%",
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === "user" ? "flex-end" : "flex-start"
              }}
            >
              <div
                style={{
                  background: msg.sender === "user" ? "linear-gradient(135deg, #22c55e 0%, #15803d 100%)" : "rgba(30, 41, 59, 0.9)",
                  border: msg.sender === "user" ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                  color: "white",
                  padding: "12px 18px",
                  borderRadius: msg.sender === "user" ? "18px 18px 2px 18px" : "18px 18px 18px 2px",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                  whiteSpace: "pre-line"
                }}
              >
                {msg.text}
              </div>
              <span style={{ fontSize: "10px", color: "#64748b", marginTop: "4px" }}>{msg.time}</span>
            </div>
          ))}

          {loading && (
            <div style={{ alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{
                  background: "rgba(30, 41, 59, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "12px 20px",
                  borderRadius: "18px 18px 18px 2px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <span className="dot-blink" style={{ animationDelay: "0s" }}></span>
                <span className="dot-blink" style={{ animationDelay: "0.2s" }}></span>
                <span className="dot-blink" style={{ animationDelay: "0.4s" }}></span>
              </div>
            </div>
          )}

          {error && (
            <div className="error-toast" style={{ alignSelf: "center", maxWidth: "90%" }}>
              {error}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} style={{ display: "flex", gap: "10px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "15px" }}>
          <input
            type="text"
            placeholder="Type your agricultural question here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            style={{
              flex: 1,
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              padding: "14px 18px",
              color: "white",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
          />
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="btn-primary"
            style={{
              padding: "0 24px",
              marginTop: 0,
              borderRadius: "12px",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            Send 🌾
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBot;