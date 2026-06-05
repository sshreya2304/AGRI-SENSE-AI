import { useState } from "react";
import { authService } from "../services/api";
import "./Auth.css";

function Signup({ onSignupSuccess, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await authService.signup(name, email, password);
      onSignupSuccess(data.user);
    } catch (err) {
      setError(err.message || "Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create Account 🌱</h1>
        <p className="auth-subtitle">Join Agri Sense AI to get started</p>

        {error && <div className="auth-error">{error}</div>}

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />

        <input
          type="password"
          placeholder="Password (min. 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Create Account"}
        </button>

        <p className="auth-footer">
          Already have an account?
          <span onClick={onSwitchToLogin}>Log In</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;