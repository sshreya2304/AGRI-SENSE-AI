import hashlib
import hmac
import base64
import time
import secrets
import os

# Secret key for signing session tokens
SECRET_KEY = os.getenv("SECRET_KEY", "agri_sense_ai_super_secret_key_987654321").encode("utf-8")

def hash_password(password: str) -> str:
    """Hash password using PBKDF2-SHA256 with a random salt."""
    salt = secrets.token_hex(16)
    hash_bytes = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        100000
    )
    return f"pbkdf2_sha256$100000${salt}${hash_bytes.hex()}"

def verify_password(password: str, hashed_password: str) -> bool:
    """Verify password against the PBKDF2-SHA256 hash."""
    try:
        parts = hashed_password.split("$")
        if len(parts) != 4 or parts[0] != "pbkdf2_sha256":
            return False
        iterations = int(parts[1])
        salt = parts[2]
        stored_hash = parts[3]
        
        test_hash = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            salt.encode("utf-8"),
            iterations
        )
        return secrets.compare_digest(test_hash.hex(), stored_hash)
    except Exception:
        return False

def generate_token(user_id: int) -> str:
    """Generate a signed URL-safe token that expires in 7 days."""
    expires_at = int(time.time()) + (7 * 24 * 3600)
    payload = f"{user_id}:{expires_at}"
    signature = hmac.new(SECRET_KEY, payload.encode("utf-8"), hashlib.sha256).hexdigest()
    token_str = f"{payload}:{signature}"
    return base64.urlsafe_b64encode(token_str.encode("utf-8")).decode("utf-8").rstrip("=")

def verify_token(token: str) -> int | None:
    """Verify the signature and expiration of the token, returning the user_id if valid."""
    try:
        # Pad base64 if needed
        padding = len(token) % 4
        if padding:
            token += "=" * (4 - padding)
        
        decoded = base64.urlsafe_b64decode(token.encode("utf-8")).decode("utf-8")
        parts = decoded.split(":")
        if len(parts) != 3:
            return None
        
        user_id_str, expires_at_str, signature = parts
        expires_at = int(expires_at_str)
        
        # Check expiration
        if time.time() > expires_at:
            return None
        
        # Reverify signature
        payload = f"{user_id_str}:{expires_at_str}"
        expected_sig = hmac.new(SECRET_KEY, payload.encode("utf-8"), hashlib.sha256).hexdigest()
        
        if hmac.compare_digest(signature, expected_sig):
            return int(user_id_str)
    except Exception:
        return None
    return None
