import { useState, useEffect } from "react";
import { loginUser, registerUser } from "../utils/api";
import "./Auth.css";

function Login({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add("auth-mode");
    return () => document.body.classList.remove("auth-mode");
  }, []);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await loginUser(username.trim(), password);
        onAuth(res.token, res.user);
      } else {
        await registerUser(username.trim(), password, email || undefined);
        setMode("login");
        setErr("Registration successful. Please login.");
      }
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <form className="auth-card" onSubmit={submit}>
          <div className="auth-title">
            {mode === "login" ? "Welcome back" : "Create account"}
          </div>

          <div className="auth-sub">
            {mode === "login" ? "Sign in to continue" : "Join and start chatting instantly"}
          </div>

          {err && <p className="error">{err}</p>}

          {mode === "register" && (
            <input
              className="auth-input"
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          <input
            className="auth-input"
            type="text"
            placeholder="Your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn primary" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>

          <div className="auth-switch">
            {mode === "login" ? "Need an account? " : "Already have an account? "}
            <span
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setErr("");
              }}
            >
              {mode === "login" ? "Register" : "Login"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;


