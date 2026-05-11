import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (pwd) => {
    if (pwd.length < 8) return "Password must be at least 8 characters long.";
    if (!/(?=.*[a-z])/.test(pwd)) return "Password must contain at least one lowercase letter.";
    if (!/(?=.*[A-Z])/.test(pwd)) return "Password must contain at least one uppercase letter.";
    if (!/(?=.*\d)/.test(pwd)) return "Password must contain at least one number.";
    if (!/(?=.*[!@#$%^&*()_+\-=[\]{};:'"\\|,.<>/?])/.test(pwd)) return "Password must contain at least one special character.";
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setPasswordError("");

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("phone", phone);
      data.append("password", password);

      const pwdValidationMsg = validatePassword(password);
      if (pwdValidationMsg) {
        setPasswordError(pwdValidationMsg);
        return;
      }

      const response = await axios.post(
        "https://cyberspecter.alwaysdata.net/api/signup",
        data
      );

      setSuccess(response.data.message);
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");

      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nike-root">

      {/* NAVBAR */}
      <nav className="nike-navbar">
        <div className="nike-navbar-inner">
          <div className="nike-brand-group">
            {/* Nike Swoosh SVG */}
            {/* <svg className="nike-swoosh-logo" viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 22 Q40 -5 75 8 Q50 14 20 20 Z" fill="white"/>
            </svg> */}
            <Link to="/" className="nike-brand-text">NIKEKENYA</Link>
          </div>

          <div className="nike-nav-links">
             <Link to="/" className="nike-nav-link">Home</Link>
            <Link to="/addproduct" className="nike-nav-link">Add Product</Link> 
            <Link to="/signup" className="nike-nav-link active">Sign Up</Link>
            <Link to="/signin" className="nike-nav-link">Sign In</Link>
             <Link to="/aboutus" className="nike-nav-link">About Us</Link>
            <Link to="/location" className="nike-nav-link">Location</Link> 
          </div>
        </div>
      </nav>

      {/* HERO BAND */}
      <div className="nike-hero-band">
        <span className="nike-just-do-it">JUST DO IT.</span>
      </div>

      {/* MAIN CONTENT */}
      <div className="nike-main">

        {/* LEFT PANEL — decorative */}
        <div className="nike-left-panel">
          <div className="nike-panel-text">
            <p className="nike-panel-tagline">JOIN THE MOVEMENT</p>
            <h2 className="nike-panel-headline">YOUR NEXT<br/>PAIR AWAITS.</h2>
            <p className="nike-panel-sub">Exclusive drops. Members-only deals.<br/>Free returns. Always.</p>
          </div>
          <svg className="nike-bg-swoosh" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 160 Q180 -60 390 80 Q260 100 80 140 Z" fill="rgba(255,255,255,0.06)"/>
          </svg>
        </div>

        {/* RIGHT PANEL — form */}
        <div className="nike-form-panel">
          <div className="nike-form-card">
            <div className="nike-form-header">
              <svg className="nike-swoosh-sm" viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 22 Q40 -5 75 8 Q50 14 20 20 Z" fill="black"/>
              </svg>
              <h3 className="nike-form-title">CREATE ACCOUNT</h3>
              <p className="nike-form-subtitle">Become a Nike Member</p>
            </div>

            {loading && <p className="nike-msg nike-msg-loading">⚡ Creating your account...</p>}
            {error && <p className="nike-msg nike-msg-error">✕ {error}</p>}
            {success && <p className="nike-msg nike-msg-success">✓ {success}</p>}
            {passwordError && <p className="nike-msg nike-msg-error">✕ {passwordError}</p>}

            <form onSubmit={submit} className="nike-form">
              <div className="nike-field-group">
                <label className="nike-label">Username</label>
                <input
                  type="text"
                  className="nike-input"
                  placeholder="e.g. sneakerhead23"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="nike-field-group">
                <label className="nike-label">Email Address</label>
                <input
                  type="email"
                  className="nike-input"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="nike-field-group">
                <label className="nike-label">Phone Number</label>
                <input
                  type="tel"
                  className="nike-input"
                  placeholder="+254 7XX XXX XXX"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="nike-field-group">
                <label className="nike-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="nike-input"
                  placeholder="Min 8 chars, upper, lower, number, symbol"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(validatePassword(e.target.value));
                  }}
                />
              </div>

              <div className="nike-check-group">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="nike-checkbox"
                />
                <label htmlFor="showPassword" className="nike-check-label">Show Password</label>
              </div>

              <button
                type="submit"
                disabled={loading || !!passwordError}
                className="nike-btn"
              >
                {loading ? "CREATING..." : "JOIN NOW →"}
              </button>

              <p className="nike-signin-link">
                Already a member?{" "}
                <Link to="/signin" className="nike-link">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="nike-footer">
        <svg className="nike-footer-swoosh" viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 22 Q40 -5 75 8 Q50 14 20 20 Z" fill="white"/>
        </svg>
        <p className="nike-footer-copy">©2026 NikeKenya. All Rights Reserved.</p>
        <p className="nike-footer-sub">Follow us for exclusive drops and deals.</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&display=swap');

        :root {
          --nike-black: #111111;
          --nike-white: #ffffff;
          --nike-gray: #f5f5f5;
          --nike-mid: #767676;
          --nike-accent: #fa5400; /* Nike orange */
          --nike-red: #d43f00;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nike-root {
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--nike-white);
          color: var(--nike-black);
        }

        /* NAVBAR */
        .nike-navbar {
          background: var(--nike-black);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 3px solid var(--nike-accent);
        }
        .nike-navbar-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nike-brand-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nike-swoosh-logo {
          width: 56px;
          height: 20px;
        }
        .nike-brand-text {
          color: white;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 0.12em;
          text-decoration: none;
        }
        .nike-nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nike-nav-link {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.2s;
          padding-bottom: 2px;
          border-bottom: 2px solid transparent;
        }
        .nike-nav-link:hover,
        .nike-nav-link.active {
          color: var(--nike-white);
          border-bottom: 2px solid var(--nike-accent);
        }

        /* HERO BAND */
        .nike-hero-band {
          background: var(--nike-accent);
          text-align: center;
          padding: 10px 0;
          overflow: hidden;
        }
        .nike-just-do-it {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.3em;
          color: white;
        }

        /* MAIN LAYOUT */
        .nike-main {
          flex: 1;
          display: flex;
          min-height: 80vh;
        }

        /* LEFT PANEL */
        .nike-left-panel {
          background: var(--nike-black);
          flex: 1;
          display: flex;
          align-items: center;
          padding: 5rem 4rem;
          position: relative;
          overflow: hidden;
        }
        .nike-panel-text {
          position: relative;
          z-index: 1;
        }
        .nike-panel-tagline {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: var(--nike-accent);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .nike-panel-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 5vw, 5.5rem);
          color: var(--nike-white);
          line-height: 0.95;
          letter-spacing: 0.03em;
          margin-bottom: 1.5rem;
        }
        .nike-panel-sub {
          color: rgba(255,255,255,0.5);
          font-size: 0.95rem;
          line-height: 1.7;
          font-weight: 400;
        }
        .nike-bg-swoosh {
          position: absolute;
          right: -60px;
          bottom: -20px;
          width: 500px;
          opacity: 1;
        }

        /* FORM PANEL */
        .nike-form-panel {
          width: 480px;
          min-width: 400px;
          background: var(--nike-gray);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
        }
        .nike-form-card {
          width: 100%;
          max-width: 400px;
        }
        .nike-form-header {
          margin-bottom: 2rem;
        }
        .nike-swoosh-sm {
          width: 48px;
          height: 18px;
          margin-bottom: 1rem;
        }
        .nike-form-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.06em;
          color: var(--nike-black);
          line-height: 1;
        }
        .nike-form-subtitle {
          color: var(--nike-mid);
          font-size: 0.85rem;
          font-weight: 500;
          margin-top: 4px;
          letter-spacing: 0.04em;
        }

        /* MESSAGES */
        .nike-msg {
          font-size: 0.82rem;
          font-weight: 600;
          padding: 10px 14px;
          border-radius: 4px;
          margin-bottom: 1rem;
          letter-spacing: 0.02em;
        }
        .nike-msg-loading { background: #fff8e1; color: #7a5800; border-left: 3px solid var(--nike-accent); }
        .nike-msg-error   { background: #fff0f0; color: var(--nike-red); border-left: 3px solid var(--nike-red); }
        .nike-msg-success { background: #f0fff4; color: #1a7a3a; border-left: 3px solid #27ae60; }

        /* FORM ELEMENTS */
        .nike-form { display: flex; flex-direction: column; gap: 0; }
        .nike-field-group { margin-bottom: 1.1rem; }
        .nike-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--nike-black);
          margin-bottom: 6px;
        }
        .nike-input {
          width: 100%;
          padding: 12px 14px;
          background: var(--nike-white);
          border: 1.5px solid #ddd;
          border-radius: 4px;
          font-family: 'Barlow', sans-serif;
          font-size: 0.92rem;
          color: var(--nike-black);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .nike-input:focus {
          border-color: var(--nike-black);
          box-shadow: 0 0 0 3px rgba(17,17,17,0.08);
        }
        .nike-input::placeholder { color: #bbb; }

        .nike-check-group {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.5rem;
          margin-top: -0.4rem;
        }
        .nike-checkbox { accent-color: var(--nike-black); width: 15px; height: 15px; cursor: pointer; }
        .nike-check-label { font-size: 0.82rem; color: var(--nike-mid); cursor: pointer; font-weight: 500; }

        /* BUTTON */
        .nike-btn {
          width: 100%;
          padding: 14px;
          background: var(--nike-black);
          color: var(--nike-white);
          border: none;
          border-radius: 4px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          margin-bottom: 1.25rem;
        }
        .nike-btn:hover:not(:disabled) {
          background: var(--nike-accent);
          transform: translateY(-1px);
        }
        .nike-btn:disabled { background: #ccc; cursor: not-allowed; }

        .nike-signin-link {
          text-align: center;
          font-size: 0.85rem;
          color: var(--nike-mid);
        }
        .nike-link {
          color: var(--nike-black);
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .nike-link:hover { color: var(--nike-accent); }

        /* FOOTER */
        .nike-footer {
          background: var(--nike-black);
          color: rgba(255,255,255,0.6);
          text-align: center;
          padding: 2rem 1rem;
          border-top: 3px solid var(--nike-accent);
        }
        .nike-footer-swoosh { width: 48px; height: 18px; margin-bottom: 0.75rem; }
        .nike-footer-copy { font-size: 0.85rem; font-weight: 600; color: white; margin-bottom: 4px; }
        .nike-footer-sub { font-size: 0.78rem; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nike-left-panel { display: none; }
          .nike-form-panel { width: 100%; min-width: unset; }
          .nike-nav-links { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Signup;