import "./Auth.css";

function Signup() {
  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Create Account 🌱</h1>

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>
          Register
        </button>

      </div>
    </div>
  );
}

export default Signup;