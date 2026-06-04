import { useState } from "react";

function ChatBot() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [language, setLanguage] = useState("English");

  const handleAsk = () => {
    if (!message.trim()) return;

    // Simulated AI response (later we will connect real AI API)
    let response = "";

    if (language === "English") {
      response =
        "Use proper irrigation, good quality seeds, and monitor soil regularly.";
    } else if (language === "Hindi") {
      response =
        "अच्छी सिंचाई करें, उच्च गुणवत्ता वाले बीजों का उपयोग करें और मिट्टी की नियमित जांच करें।";
    } else if (language === "Gujarati") {
      response =
        "સારો સિંચાઈ કરો, ઉચ્ચ ગુણવત્તાના બીજ વાપરો અને માટીની નિયમિત તપાસ કરો.";
    } else if (language === "Marathi") {
      response =
        "चांगले सिंचन करा, दर्जेदार बियाणे वापरा आणि मातीची नियमित तपासणी करा.";
    } else if (language === "Tamil") {
      response =
        "சரியான பாசனம் செய்யவும், நல்ல விதைகளை பயன்படுத்தவும், மண்ணை முறையாக கண்காணிக்கவும்.";
    } else if (language === "Telugu") {
      response =
        "మంచి నీటి పారుదల చేయండి, నాణ్యమైన విత్తనాలు వాడండి మరియు మట్టిని పర్యవేక్షించండి.";
    } else if (language === "Kannada") {
      response =
        "ಸರಿಯಾದ ನೀರಾವರಿ ಮಾಡಿ, ಉತ್ತಮ ಬೀಜಗಳನ್ನು ಬಳಸಿ ಮತ್ತು ಮಣ್ಣನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.";
    } else if (language === "Malayalam") {
      response =
        "ശരിയായ ജലസേചനം നടത്തുക, നല്ല വിത്തുകൾ ഉപയോഗിക്കുക, മണ്ണ് നിരന്തരം പരിശോധിക്കുക.";
    } else if (language === "Punjabi") {
      response =
        "ਚੰਗੀ ਸਿੰਚਾਈ ਕਰੋ, ਉੱਚ ਗੁਣਵੱਤਾ ਵਾਲੇ ਬੀਜ ਵਰਤੋ ਅਤੇ ਮਿੱਟੀ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ।";
    } else if (language === "Bengali") {
      response =
        "সঠিক সেচ করুন, ভালো মানের বীজ ব্যবহার করুন এবং মাটির নিয়মিত পর্যবেক্ষণ করুন।";
    }

    setReply(response);
  };

  return (
    <div
      style={{
        padding: "30px",
        color: "white",
        background: "#0f172a",
        minHeight: "100vh",
      }}
    >
      <h1>🤖 AGRI AI ChatBot</h1>

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "8px",
        }}
      >
        <option>English</option>
        <option>Hindi</option>
        <option>Gujarati</option>
        <option>Marathi</option>
        <option>Tamil</option>
        <option>Telugu</option>
        <option>Kannada</option>
        <option>Malayalam</option>
        <option>Punjabi</option>
        <option>Bengali</option>
      </select>

      {/* Input Box */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask farming questions..."
        style={{
          width: "100%",
          height: "150px",
          padding: "15px",
          marginTop: "20px",
          borderRadius: "8px",
        }}
      />

      {/* Button */}
      <button
        onClick={handleAsk}
        style={{
          marginTop: "15px",
          padding: "12px 20px",
          background: "#22C55E",
          border: "none",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Ask AI 🌾
      </button>

      {/* Response */}
      {reply && (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            background: "#1e293b",
            borderRadius: "10px",
          }}
        >
          <h3>AI Response:</h3>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}

export default ChatBot;