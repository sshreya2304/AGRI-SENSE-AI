const API_BASE_URL = "http://127.0.0.1:8000/api";

// Helper to get headers with Auth token if available
const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const authService = {
  async signup(name, email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || "Registration failed");
    }
    
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || "Login failed");
    }
    
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  async getCurrentUser() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      localStorage.removeItem("token");
      return null;
    }
    return await response.json();
  },

  logout() {
    localStorage.removeItem("token");
  }
};

export const aiService = {
  async askChatbot(message) {
    const response = await fetch(`${API_BASE_URL}/chatbot`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || "Chatbot failed to respond");
    }
    return data; // returns { reply: "..." }
  },

  async predictCrop(temperature, humidity, rainfall, ph) {
    const response = await fetch(`${API_BASE_URL}/crop-recommendation`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        temperature: parseFloat(temperature),
        humidity: parseFloat(humidity),
        rainfall: parseFloat(rainfall),
        ph: parseFloat(ph)
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || "Crop recommendation failed");
    }
    return data; // returns { crop: "...", yield: "...", profitability: "...", details: "..." }
  },

  async getWeather() {
    const response = await fetch(`${API_BASE_URL}/weather`, {
      method: "GET",
      headers: getHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || "Failed to fetch weather data");
    }
    return data; // returns { temperature: "...", humidity: "...", ... }
  }
};

