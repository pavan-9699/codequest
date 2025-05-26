import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import icon from "../../assets/icon.png";
import Aboutauth from "./Aboutauth";
import { signup, login } from "../../action/auth";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Added for better error handling
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  setError(""); // Clear previous errors

  if (!email || !password) {
    setError("Please enter both email and password");
    return;
  }
  if (isSignup && !name) {
    setError("Please enter a display name");
    return;
  }

  const action = isSignup
    ? signup({ name, email, password }, navigate)
    : login({ email, password }, navigate);

  dispatch(action)
    .then(() => {
      localStorage.setItem("userEmail", email); // ✅ Save email locally
      if (!isSignup) {
        navigate("/"); // Redirect after login
      }
    })
    .catch((error) => {
      setError(error.message || (isSignup ? "Signup failed" : "Login failed"));
    });
};


  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <section className="auth-section">
      {isSignup && <Aboutauth />}
      <div className="auth-container-2">
        <img src={icon} alt="icon" className="login-logo" />
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  Forgot Password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
          <div
            style={{ display: "flex", gap: "5px", alignItems: "center" }}
          >
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
            </p>
            <div
              onClick={handleSwitch}
              style={{ cursor: "pointer", color: "#007ac6" }}
            >
              {isSignup ? "Login" : "Register"}
            </div>
          </div>
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;