import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SigninPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const [banners] = useState([
    "WELCOME BACK, CHAMPION.",
    "YOUR NEXT PAIR IS WAITING.",
    "SIGN IN. STEP UP.",
    "EXCLUSIVE DROPS AWAIT YOU."
  ]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const interval1 = setInterval(() => setShowBanner(false), 2800);
    const interval2 = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
      setShowBanner(true);
    }, 4000);
    return () => { clearInterval(interval1); clearInterval(interval2); };
  }, [banners.length]);

  useEffect(() => {
    let timer;
    if (lockoutTime > 0) {
      timer = setTimeout(() => setLockoutTime((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [lockoutTime]);

  useEffect(() => {
    const remembered = JSON.parse(localStorage.getItem("rememberedSignin"));
    if (remembered?.email) {
      setEmail(remembered.email);
      setRemember(true);
    }
  }, []);

  const validatePassword = (pwd) => {
    if (!pwd) return "";
    if (pwd.length < 8) return "Password must be at least 8 characters long.";
    if (!/(?=.*[a-z])/.test(pwd)) return "Password must contain at least one lowercase letter.";
    if (!/(?=.*[A-Z])/.test(pwd)) return "Password must contain at least one uppercase letter.";
    if (!/(?=.*\d)/.test(pwd)) return "Password must contain at least one number.";
    if (!/(?=.*[!@#$%^&*()_+\-=[\]{};:'"\\|,.<>/?])/.test(pwd)) return "Password must contain at least one special character.";
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    if (lockoutTime > 0) { setError(`Too many failed attempts. Try again in ${lockoutTime}s.`); return; }
    const pwdErr = validatePassword(password);
    if (pwdErr) { setPasswordError(pwdErr); return; }
    setError("");
    setLoading(true);
    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);
      const response = await axios.post("https://cyberspecter.alwaysdata.net/api/signin", data);
      setLoading(false);
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if (remember) {
          localStorage.setItem("rememberedSignin", JSON.stringify({ email }));
        } else {
          localStorage.removeItem("rememberedSignin");
        }
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setLoading(false);
      setPassword("");
      setFailedAttempts((prev) => {
        const next = prev + 1;
        if (next >= 5) { setLockoutTime(30); return 0; }
        return next;
      });
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="nike-root">

      {/* NAVBAR */}
      <nav className="nike-navbar">
        <div className="nike-navbar-inner">
          <div className="nike-brand-group">
            <Link to="/" className="nike-brand-text">NIKE KENYA</Link>
          </div>
          <div className="nike-nav-links">
            <Link to="/" className="nike-nav-link">Home</Link>
            <Link to="/addproduct" className="nike-nav-link">Add Product</Link>
            <Link to="/signup" className="nike-nav-link">Sign Up</Link>
            <Link to="/signin" className="nike-nav-link active">Sign In</Link>
            <Link to="/aboutus" className="nike-nav-link">About Us</Link>
            <Link to="/location" className="nike-nav-link">Location</Link>
          </div>
        </div>
      </nav>

      {/* ORANGE BAND */}
      <div className="nike-hero-band">
        <span className="nike-just-do-it">JUST DO IT.</span>
      </div>

      {/* ANIMATED BANNER */}
      <div className="nike-banner">
        {/* Decorative diagonal stripes */}
        <div className="nike-banner-stripes" />
        <div className="nike-banner-content">
          <p className="nike-banner-eyebrow">NIKE KENYA COLLECTION</p>
          <h2 className={`nike-banner-headline ${showBanner ? "banner-in" : "banner-out"}`}>
            {banners[currentBanner]}
          </h2>
          <div className="nike-banner-dots">
            {banners.map((_, i) => (
              <span key={i} className={`nike-dot ${i === currentBanner ? "active" : ""}`} />
            ))}
          </div>
        </div>
        <svg className="nike-banner-swoosh" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 160 Q200 -60 490 80 Q310 110 80 150 Z" fill="rgba(255,255,255,0.08)"/>
        </svg>
      </div>

      {/* MAIN */}
      <div className="nike-main">

        {/* LEFT PANEL */}
        <div className="nike-left-panel">
          <div className="nike-panel-text">
            <p className="nike-panel-tagline">MEMBER BENEFITS</p>
            <h2 className="nike-panel-headline">SIGN IN.<br/>STEP UP.</h2>
            <div className="nike-perks">
              <div className="nike-perk">
                <span className="nike-perk-icon">✓</span>
                <span>Exclusive member-only drops</span>
              </div>
              <div className="nike-perk">
                <span className="nike-perk-icon">✓</span>
                <span>Free returns on every order</span>
              </div>
              <div className="nike-perk">
                <span className="nike-perk-icon">✓</span>
                <span>Track your orders live</span>
              </div>
              <div className="nike-perk">
                <span className="nike-perk-icon">✓</span>
                <span>Early access to new styles</span>
              </div>
            </div>
          </div>
          {/* Decorative large number */}
          <div className="nike-panel-deco">01</div>
          <svg className="nike-bg-swoosh" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 160 Q180 -60 390 80 Q260 100 80 140 Z" fill="rgba(255,255,255,0.06)"/>
          </svg>
        </div>

        {/* FORM PANEL */}
        <div className="nike-form-panel">
          <div className="nike-form-card">
            <div className="nike-form-header">
              <img src="/mnt/user-data/uploads/nike_tick.jpeg" alt="Nike" className="nike-tick-sm" />
              <h3 className="nike-form-title">SIGN IN</h3>
              <p className="nike-form-subtitle">Welcome back, athlete.</p>
            </div>

            {error && <p className="nike-msg nike-msg-error">✕ {error}</p>}
            {passwordError && <p className="nike-msg nike-msg-error">✕ {passwordError}</p>}
            {lockoutTime > 0 && (
              <p className="nike-msg nike-msg-lockout">🔒 Locked out. Try again in {lockoutTime}s</p>
            )}

            <form onSubmit={submit} className="nike-form">
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
                <label className="nike-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="nike-input"
                  placeholder="Your password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(validatePassword(e.target.value));
                  }}
                />
              </div>

              <div className="nike-options-row">
                <div className="nike-check-group">
                  <input type="checkbox" id="showPwd" checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)} className="nike-checkbox"/>
                  <label htmlFor="showPwd" className="nike-check-label">Show Password</label>
                </div>
                <div className="nike-check-group">
                  <input type="checkbox" id="rememberMe" checked={remember}
                    onChange={(e) => setRemember(e.target.checked)} className="nike-checkbox"/>
                  <label htmlFor="rememberMe" className="nike-check-label">Remember Me</label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || lockoutTime > 0 || !!passwordError}
                className="nike-btn"
              >
                {lockoutTime > 0 ? `LOCKED (${lockoutTime}s)` : loading ? "SIGNING IN..." : "SIGN IN →"}
              </button>

              {/* Divider */}
              <div className="nike-divider">
                <span className="nike-divider-line" />
                <span className="nike-divider-text">NEW HERE?</span>
                <span className="nike-divider-line" />
              </div>

              <Link to="/signup" className="nike-btn-outline">
                CREATE AN ACCOUNT →
              </Link>

              <p className="nike-footer-note">
                Don't have an account?{" "}
                <Link to="/signup" className="nike-link">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="nike-footer">
        
        
        <p className="nike-footer-copy">©2026 Nike kenya. All Rights Reserved.</p>
        <p className="nike-footer-sub">Follow us for exclusive drops and deals.</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&display=swap');

        :root {
          --nike-black: #111111;
          --nike-white: #ffffff;
          --nike-gray: #f5f5f5;
          --nike-mid: #767676;
          --nike-accent: #fa5400;
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
        .nike-brand-group { display: flex; align-items: center; gap: 12px; }
        .nike-tick-logo {
          width: 52px;
          height: auto;
          filter: invert(1) brightness(2); /* makes black tick white on dark navbar */
          object-fit: contain;
        }
        .nike-brand-text {
          color: white;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 0.12em;
          text-decoration: none;
        }
        .nike-nav-links { display: flex; gap: 2rem; align-items: center; }
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
        .nike-nav-link:hover, .nike-nav-link.active {
          color: var(--nike-white);
          border-bottom: 2px solid var(--nike-accent);
        }

        /* ORANGE BAND */
        .nike-hero-band {
          background: var(--nike-accent);
          text-align: center;
          padding: 10px 0;
        }
        .nike-just-do-it {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.3em;
          color: white;
        }

        /* ANIMATED BANNER */
        .nike-banner {
          background: var(--nike-black);
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .nike-banner-stripes {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 40px,
            rgba(250, 84, 0, 0.04) 40px,
            rgba(250, 84, 0, 0.04) 80px
          );
        }
        .nike-banner-content {
          position: relative;
          z-index: 1;
          text-align: center;
        }
        .nike-banner-eyebrow {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          color: var(--nike-accent);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .nike-banner-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          color: var(--nike-white);
          letter-spacing: 0.08em;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .banner-in  { opacity: 1; transform: translateY(0); }
        .banner-out { opacity: 0; transform: translateY(-12px); }
        .nike-banner-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 1.25rem;
        }
        .nike-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transition: background 0.3s, transform 0.3s;
        }
        .nike-dot.active {
          background: var(--nike-accent);
          transform: scale(1.4);
        }
        .nike-banner-swoosh {
          position: absolute;
          right: -40px; bottom: -30px;
          width: 420px; opacity: 1;
        }

        /* MAIN LAYOUT */
        .nike-main {
          flex: 1;
          display: flex;
          min-height: 75vh;
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
        .nike-panel-text { position: relative; z-index: 1; }
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
          font-size: clamp(3rem, 5vw, 5rem);
          color: var(--nike-white);
          line-height: 0.95;
          letter-spacing: 0.03em;
          margin-bottom: 2rem;
        }
        .nike-perks { display: flex; flex-direction: column; gap: 0.85rem; }
        .nike-perk {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.65);
          font-size: 0.9rem;
          font-weight: 500;
        }
        .nike-perk-icon {
          color: var(--nike-accent);
          font-size: 0.85rem;
          font-weight: 700;
          width: 20px;
          text-align: center;
        }
        .nike-panel-deco {
          position: absolute;
          right: 2rem;
          bottom: 1.5rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9rem;
          color: rgba(255,255,255,0.04);
          line-height: 1;
          letter-spacing: -0.05em;
          pointer-events: none;
        }
        .nike-bg-swoosh {
          position: absolute;
          right: -60px; bottom: -20px;
          width: 500px; opacity: 1;
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
        .nike-form-card { width: 100%; max-width: 400px; }
        .nike-form-header { margin-bottom: 2rem; }
        .nike-tick-sm {
          width: 56px;
          height: auto;
          object-fit: contain;
          margin-bottom: 1rem;
          display: block;
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
        .nike-msg-error   { background: #fff0f0; color: var(--nike-red); border-left: 3px solid var(--nike-red); }
        .nike-msg-lockout { background: #fff8e1; color: #7a5800; border-left: 3px solid var(--nike-accent); }

        /* FORM */
        .nike-form { display: flex; flex-direction: column; }
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

        .nike-options-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          margin-top: -0.2rem;
          flex-wrap: wrap;
          gap: 8px;
        }
        .nike-check-group { display: flex; align-items: center; gap: 8px; }
        .nike-checkbox { accent-color: var(--nike-black); width: 15px; height: 15px; cursor: pointer; }
        .nike-check-label { font-size: 0.82rem; color: var(--nike-mid); cursor: pointer; font-weight: 500; }

        /* BUTTONS */
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
          text-decoration: none;
          display: block;
          text-align: center;
        }
        .nike-btn:hover:not(:disabled) {
          background: var(--nike-accent);
          transform: translateY(-1px);
        }
        .nike-btn:disabled { background: #ccc; cursor: not-allowed; }

        .nike-btn-outline {
          width: 100%;
          padding: 13px;
          background: transparent;
          color: var(--nike-black);
          border: 2px solid var(--nike-black);
          border-radius: 4px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
          text-decoration: none;
          display: block;
          text-align: center;
          margin-bottom: 1.25rem;
        }
        .nike-btn-outline:hover {
          background: var(--nike-accent);
          border-color: var(--nike-accent);
          color: white;
          transform: translateY(-1px);
        }

        /* DIVIDER */
        .nike-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.25rem;
        }
        .nike-divider-line {
          flex: 1;
          height: 1px;
          background: #ddd;
        }
        .nike-divider-text {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--nike-mid);
        }

        .nike-footer-note {
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
        .nike-footer-tick {
          width: 52px;
          height: auto;
          filter: invert(1) brightness(2);
          object-fit: contain;
          margin-bottom: 0.75rem;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
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

export default SigninPage;
