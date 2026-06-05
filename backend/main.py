from fastapi import FastAPI, HTTPException, Depends, Header, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from contextlib import asynccontextmanager
import os
import httpx
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from database import init_db, create_user, get_user_by_email, get_user_by_id
from auth import hash_password, verify_password, generate_token, verify_token

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite database on startup
    init_db()
    yield

app = FastAPI(
    title="Agri Sense AI Backend",
    description="FastAPI Backend for user authentication, crop recommendation, and chatbot.",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS so Vite frontend (typically localhost:5173) can access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For local testing; narrow this down in production if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Key for Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# Crop profile definitions for local matching
CROP_PROFILES = [
    {
        "crop": "🌾 Rice",
        "temp_min": 20.0, "temp_max": 38.0,
        "humidity_min": 60.0, "humidity_max": 100.0,
        "rainfall_min": 120.0, "rainfall_max": 300.0,
        "ph_min": 5.0, "ph_max": 7.0,
        "yield": "High",
        "profitability": "Excellent",
        "details": "Rice requires high rainfall (>120mm), warm temperatures, and high humidity. Perfect for clayey or loamy soils that retain water well."
    },
    {
        "crop": "🌾 Wheat",
        "temp_min": 10.0, "temp_max": 25.0,
        "humidity_min": 40.0, "humidity_max": 75.0,
        "rainfall_min": 40.0, "rainfall_max": 100.0,
        "ph_min": 6.0, "ph_max": 7.5,
        "yield": "Medium-High",
        "profitability": "Good",
        "details": "Wheat thrives in cool growing seasons with dry weather during ripening. It requires well-drained loamy soils and moderate rainfall."
    },
    {
        "crop": "🌽 Maize",
        "temp_min": 18.0, "temp_max": 32.0,
        "humidity_min": 50.0, "humidity_max": 80.0,
        "rainfall_min": 50.0, "rainfall_max": 120.0,
        "ph_min": 5.5, "ph_max": 7.5,
        "yield": "High",
        "profitability": "Good",
        "details": "Maize grows best in warm climates with moderate rainfall. It requires fertile, well-drained loams and is highly responsive to nitrogen-rich fertilizers."
    },
    {
        "crop": "🌱 Cotton",
        "temp_min": 20.0, "temp_max": 35.0,
        "humidity_min": 40.0, "humidity_max": 75.0,
        "rainfall_min": 50.0, "rainfall_max": 120.0,
        "ph_min": 5.5, "ph_max": 8.0,
        "yield": "Medium",
        "profitability": "Very High",
        "details": "Cotton requires plenty of sunshine, high temperatures, and moderate rainfall. It is best suited for deep, moisture-retaining black clayey soils (regur soil)."
    },
    {
        "crop": "🥜 Groundnut",
        "temp_min": 20.0, "temp_max": 32.0,
        "humidity_min": 50.0, "humidity_max": 75.0,
        "rainfall_min": 40.0, "rainfall_max": 90.0,
        "ph_min": 6.0, "ph_max": 7.0,
        "yield": "Medium-High",
        "profitability": "Good",
        "details": "Groundnuts require warm climates, moderate rainfall, and well-drained sandy loam soils to allow the pods to develop underground. Excellent for nitrogen fixation."
    },
    {
        "crop": "🌻 Sunflower",
        "temp_min": 15.0, "temp_max": 30.0,
        "humidity_min": 40.0, "humidity_max": 80.0,
        "rainfall_min": 30.0, "rainfall_max": 80.0,
        "ph_min": 6.0, "ph_max": 7.5,
        "yield": "High",
        "profitability": "Good",
        "details": "Sunflowers are highly adaptable and relatively drought-resistant. They thrive in deep loam soils with good drainage and ample sunshine."
    }
]

# Pydantic Schemas
class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ChatRequest(BaseModel):
    message: str

class CropRecommendationRequest(BaseModel):
    temperature: float
    humidity: float
    rainfall: float
    ph: float

# Dependency: Get Current Authenticated User
async def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authentication header"
        )
    token = authorization.split(" ")[1]
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid token"
        )
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    # Return user details without password hash
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "created_at": user["created_at"]
    }

# --- AUTH ENDPOINTS ---

@app.post("/api/auth/signup")
async def signup(req: SignupRequest):
    # Check if user already exists
    existing_user = get_user_by_email(req.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists"
        )
    
    hashed = hash_password(req.password)
    user = create_user(req.name, req.email, hashed)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to register user. Please try again."
        )
    
    # Generate token
    token = generate_token(user["id"])
    return {
        "message": "User registered successfully",
        "token": token,
        "user": user
    }

@app.post("/api/auth/login")
async def login(req: LoginRequest):
    user = get_user_by_email(req.email)
    if not user or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    token = generate_token(user["id"])
    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        }
    }

@app.get("/api/auth/me")
async def read_current_user(user: dict = Depends(get_current_user)):
    return user

# --- AI & RECOMMENDATION ENDPOINTS ---

@app.post("/api/chatbot")
async def chatbot(req: ChatRequest, user: dict = Depends(get_current_user)):
    user_message = req.message.strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    if not GEMINI_API_KEY:
        # Fallback offline mode responses
        reply = (
            "⚠️ [Running in offline mode - GEMINI_API_KEY not set in backend/.env]\n\n"
            "For optimal farming results:\n"
            "1. Test your soil regularly to evaluate NPK nutrient levels.\n"
            "2. Rotate crops between seasons (e.g. follow wheat with legumes like groundnuts to fix soil nitrogen).\n"
            "3. Optimize irrigation based on rainfall forecasts to conserve water and prevent root rot."
        )
        return {"reply": reply}

    # Calling Gemini API
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    
    prompt = (
        "You are AGRI SENSE AI, a professional agricultural AI assistant. You help farmers answer their questions about crop cultivation, irrigation, pest control, fertilizing, harvesting, and modern farming techniques in their requested language. Keep your answers concise, practical, and helpful to a farmer. "
        f"Question: {user_message}"
    )
    
    payload = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }]
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(url, headers=headers, json=payload)
            if resp.status_code != 200:
                raise HTTPException(status_code=resp.status_code, detail=f"Gemini API Error: {resp.text}")
            
            data = resp.json()
            reply = data["candidates"][0]["content"]["parts"][0]["text"]
            return {"reply": reply}
    except Exception as e:
        # Fallback response on request failure
        return {
            "reply": f"⚠️ Gemini API failed to respond. Local advice: Please check your internet connection or API keys. Details: {str(e)}"
        }

@app.post("/api/crop-recommendation")
async def crop_recommendation(req: CropRecommendationRequest, user: dict = Depends(get_current_user)):
    temp = req.temperature
    hum = req.humidity
    rain = req.rainfall
    ph = req.ph

    if not GEMINI_API_KEY:
        # Local rule-based recommendation
        recommended = get_local_recommendation(temp, hum, rain, ph)
        return recommended

    # Calling Gemini API for tailored suggestion
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}

    prompt = (
        "You are a professional agricultural machine learning model. Given these exact parameters:\n"
        f"- Temperature = {temp}°C\n"
        f"- Humidity = {hum}%\n"
        f"- Rainfall = {rain}mm\n"
        f"- Soil pH = {ph}\n\n"
        "Recommend the single best crop to grow from the list [Rice, Wheat, Maize, Cotton, Groundnut, Sunflower].\n"
        "Return your response as a valid JSON object matching this structure (DO NOT wrap in ```json markdown formatting, just return raw JSON):\n"
        "{\n"
        '  "crop": "Crop Name with Emoji",\n'
        '  "yield": "High/Medium/Low",\n'
        '  "profitability": "Excellent/Good/Fair",\n'
        '  "details": "A detailed 1-2 sentence explanation of why this crop is recommended under these parameters."\n'
        "}"
    )

    payload = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }]
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(url, headers=headers, json=payload)
            if resp.status_code == 200:
                data = resp.json()
                text_response = data["candidates"][0]["content"]["parts"][0]["text"].strip()
                
                # Strip markdown code blocks if the LLM included them
                if text_response.startswith("```"):
                    text_response = text_response.split("```")[1]
                    if text_response.startswith("json"):
                        text_response = text_response[4:]
                
                parsed_json = json.loads(text_response.strip())
                return parsed_json
            else:
                # Fallback to local on API failure
                return get_local_recommendation(temp, hum, rain, ph)
    except Exception:
        # Fallback to local on parse or connection exception
        return get_local_recommendation(temp, hum, rain, ph)

def get_local_recommendation(temp: float, humidity: float, rainfall: float, ph: float) -> dict:
    """Evaluate inputs using a mathematical penalty score against defined crop profiles."""
    best_profile = None
    min_penalty = float("inf")
    
    for profile in CROP_PROFILES:
        penalty = 0.0
        
        # Temperature penalty (normalized scale)
        if temp < profile["temp_min"]:
            penalty += (profile["temp_min"] - temp) / 10.0
        elif temp > profile["temp_max"]:
            penalty += (temp - profile["temp_max"]) / 10.0
            
        # Humidity penalty
        if humidity < profile["humidity_min"]:
            penalty += (profile["humidity_min"] - humidity) / 20.0
        elif humidity > profile["humidity_max"]:
            penalty += (humidity - profile["humidity_max"]) / 20.0
            
        # Rainfall penalty
        if rainfall < profile["rainfall_min"]:
            penalty += (profile["rainfall_min"] - rainfall) / 50.0
        elif rainfall > profile["rainfall_max"]:
            penalty += (rainfall - profile["rainfall_max"]) / 50.0
            
        # pH penalty
        if ph < profile["ph_min"]:
            penalty += (profile["ph_min"] - ph) / 1.0
        elif ph > profile["ph_max"]:
            penalty += (ph - profile["ph_max"]) / 1.0
            
        if penalty < min_penalty:
            min_penalty = penalty
            best_profile = profile
            
    return {
        "crop": best_profile["crop"],
        "yield": best_profile["yield"],
        "profitability": best_profile["profitability"],
        "details": f"Local rule matching recommendation based on parameters. {best_profile['details']}"
    }

# --- WEATHER ENDPOINT ---

@app.get("/api/weather")
async def get_weather(user: dict = Depends(get_current_user)):
    # Simple simulated weather endpoint
    return {
        "temperature": "31°C",
        "humidity": "72%",
        "rainfall_chance": "20%",
        "wind_speed": "12 km/h",
        "condition": "Mostly Sunny ☀️"
    }
