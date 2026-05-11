import React, { useState } from "react";
import { Link } from "react-router-dom";

const Location = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="loc-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800&display=swap');

        :root {
          --black: #111111;
          --white: #ffffff;
          --gray: #f5f5f5;
          --mid: #767676;
          --orange: #fa5400;
          --orange-dark: #d43f00;
          --border: #e5e5e5;
          --green: #22c55e;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .loc-root {
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          background: var(--white);
          display: flex;
          flex-direction: column;
        }

        /* ── NAVBAR ── */
        .loc-nav {
          background: var(--black);
          border-bottom: 3px solid var(--orange);
          height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem;
          position: sticky; top: 0; z-index: 100;
        }
        .loc-brand {
          display: flex; align-items: center; gap: 12px; text-decoration: none;
        }
        .loc-brand-tick {
          width: 44px; height: auto;
          filter: invert(1) brightness(2);
        }
        .loc-brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem; letter-spacing: 0.1em; color: #fff;
        }
        .loc-nav-links { display: flex; align-items: center; gap: 4px; }
        .loc-nav-link {
          color: rgba(255,255,255,0.6); text-decoration: none;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 6px 12px; border-radius: 2px;
          transition: color 0.2s, background 0.2s;
        }
        .loc-nav-link:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .loc-nav-link.active { color: var(--orange); }

        .loc-hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .loc-hamburger span {
          display: block; width: 22px; height: 2px;
          background: rgba(255,255,255,0.7); border-radius: 2px;
          transition: background 0.2s;
        }
        .loc-hamburger:hover span { background: var(--orange); }
        .loc-mobile-menu {
          background: #1a1a1a; border-bottom: 2px solid var(--orange);
          display: flex; flex-direction: column; padding: 12px 1.5rem;
        }
        .loc-mobile-menu .loc-nav-link {
          padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        /* ── BAND ── */
        .loc-band {
          background: var(--orange); text-align: center;
          padding: 9px; font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem; letter-spacing: 0.3em; color: #fff;
        }

        /* ── HERO ── */
        .loc-hero {
          background: var(--black);
          position: relative; overflow: hidden;
          padding: 4rem 2rem;
          display: flex; align-items: center; justify-content: center;
          text-align: center;
        }
        .loc-hero-stripes {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(-55deg, transparent, transparent 50px, rgba(250,84,0,0.04) 50px, rgba(250,84,0,0.04) 100px);
        }
        .loc-hero-content { position: relative; z-index: 1; max-width: 600px; }
        .loc-pin {
          display: inline-block; font-size: 2.5rem; margin-bottom: 0.75rem;
          animation: pin-bounce 2s ease-in-out infinite;
        }
        @keyframes pin-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .loc-hero-eyebrow {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.35em;
          color: var(--orange); text-transform: uppercase; margin-bottom: 0.75rem;
        }
        .loc-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.8rem, 7vw, 5rem);
          color: #fff; letter-spacing: 0.04em;
          line-height: 0.9; margin-bottom: 1rem;
        }
        .loc-hero-title span { color: var(--orange); }
        .loc-hero-sub {
          color: rgba(255,255,255,0.4);
          font-size: 0.9rem; font-weight: 500; line-height: 1.7;
        }

        /* ── BODY ── */
        .loc-body {
          flex: 1; background: var(--gray); padding: 3rem 2rem;
        }
        .loc-grid {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 340px 1fr;
          gap: 1.75rem; align-items: start;
        }

        /* ── INFO CARD ── */
        .loc-info-card {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 4px; overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
        }
        .loc-info-header {
          background: var(--black);
          padding: 1rem 1.5rem;
          display: flex; align-items: center; gap: 10px;
        }
        .loc-info-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--orange);
          box-shadow: 0 0 0 3px rgba(250,84,0,0.2);
        }
        .loc-info-header-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem; letter-spacing: 0.12em; color: #fff;
        }
        .loc-info-body { padding: 1.5rem; }
        .loc-info-row {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px 0; border-bottom: 1px solid var(--border);
        }
        .loc-info-row:last-of-type { border-bottom: none; }
        .loc-info-icon {
          width: 38px; height: 38px; border-radius: 3px;
          background: var(--gray); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; flex-shrink: 0;
        }
        .loc-info-label {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--mid); margin-bottom: 3px;
        }
        .loc-info-value {
          font-size: 0.88rem; font-weight: 600;
          color: var(--black); line-height: 1.6;
        }
        .loc-info-value a {
          color: var(--black); text-decoration: none; transition: color 0.2s;
        }
        .loc-info-value a:hover { color: var(--orange); }

        .loc-directions-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 14px;
          background: var(--black); border: none; border-radius: 3px;
          color: #fff; font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem; letter-spacing: 0.15em;
          cursor: pointer; text-decoration: none;
          margin-top: 1.25rem;
          transition: background 0.2s, transform 0.15s;
        }
        .loc-directions-btn:hover {
          background: var(--orange); color: #fff; transform: translateY(-1px);
        }

        /* ── MAP ── */
        .loc-map-card {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 4px; overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
        }
        .loc-map-header {
          background: var(--black);
          padding: 1rem 1.5rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        .loc-map-header-left { display: flex; align-items: center; gap: 10px; }
        .loc-map-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--green);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.25); }
          50% { box-shadow: 0 0 0 7px rgba(34,197,94,0.08); }
        }
        .loc-map-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem; letter-spacing: 0.12em; color: #fff;
        }
        .loc-map-tag {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em;
          color: var(--green); text-transform: uppercase;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          padding: 3px 10px; border-radius: 20px;
        }
        .loc-map-card iframe {
          width: 100%; min-height: 430px; display: block; border: none;
        }

        /* ── LANDMARKS ── */
        .loc-landmarks {
          max-width: 1100px; margin: 1.75rem auto 0;
        }
        .loc-landmarks-label {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.3em;
          color: var(--orange); text-transform: uppercase; margin-bottom: 1rem;
        }
        .loc-landmarks-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
        }
        .loc-lm-card {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 3px; padding: 1.25rem 1rem;
          text-align: center;
          border-bottom: 3px solid var(--border);
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .loc-lm-card:hover {
          border-bottom-color: var(--orange);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .loc-lm-card.here {
          border-color: var(--orange); border-bottom-color: var(--orange);
          background: rgba(250,84,0,0.03);
        }
        .loc-lm-icon { font-size: 1.75rem; margin-bottom: 8px; }
        .loc-lm-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem; letter-spacing: 0.06em;
          color: var(--black); margin-bottom: 6px;
        }
        .loc-lm-dist {
          display: inline-block;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 3px 10px; border-radius: 20px;
        }
        .loc-lm-dist.here-badge {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3); color: #166534;
        }
        .loc-lm-dist.away-badge {
          background: var(--gray); border: 1px solid var(--border); color: var(--mid);
        }

        /* ── FOOTER ── */
        .loc-footer {
          background: var(--black); color: rgba(255,255,255,0.4);
          text-align: center; padding: 1.25rem;
          border-top: 3px solid var(--orange);
          font-size: 0.78rem;
        }
        .loc-footer strong { color: rgba(255,255,255,0.65); }

        @media (max-width: 900px) {
          .loc-grid { grid-template-columns: 1fr; }
          .loc-landmarks-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .loc-nav-links { display: none; }
          .loc-hamburger { display: flex; }
          .loc-nav { padding: 0 1.25rem; }
          .loc-body { padding: 2rem 1rem; }
        }
        @media (max-width: 480px) {
          .loc-landmarks-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="loc-nav">
        <Link to="/" className="loc-brand">
          {/* <img src="/mnt/user-data/uploads/nike_tick.jpeg" alt="Nike" className="loc-brand-tick" /> */}
          <span className="loc-brand-name">NIKE KENYA</span>
        </Link>
        <div className="loc-nav-links">
          <Link to="/" className="loc-nav-link">Home</Link>
          <Link to="/addproduct" className="loc-nav-link">Add Product</Link>
          <Link to="/signup" className="loc-nav-link">Sign Up</Link>
          <Link to="/signin" className="loc-nav-link">Sign In</Link>
          <Link to="/aboutus" className="loc-nav-link">About Us</Link>
          <Link to="/location" className="loc-nav-link active">Location</Link>
        </div>
        <button className="loc-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="loc-mobile-menu">
          <Link to="/" className="loc-nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/addproduct" className="loc-nav-link" onClick={() => setMenuOpen(false)}>Add Product</Link>
          <Link to="/signup" className="loc-nav-link" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          <Link to="/signin" className="loc-nav-link" onClick={() => setMenuOpen(false)}>Sign In</Link>
          <Link to="/aboutus" className="loc-nav-link" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/location" className="loc-nav-link active" onClick={() => setMenuOpen(false)}>Location</Link>
        </div>
      )}

      {/* BAND */}
      <div className="loc-band">VISIT US IN KISUMU &nbsp;•&nbsp; MON–SAT 8AM–6PM &nbsp;•&nbsp; NIKE KENYA</div>

      {/* HERO */}
      <div className="loc-hero">
        <div className="loc-hero-stripes" />
        <div className="loc-hero-content">
          <div className="loc-pin">📍</div>
          <p className="loc-hero-eyebrow">Our Physical Store</p>
          <h1 className="loc-hero-title">FIND US IN<br /><span>KISUMU</span></h1>
          <p className="loc-hero-sub">
            Visit Nike Kenya at Mega City Mall, Oginga Odinga Street —<br />
            your official Nike destination in Kisumu City.
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="loc-body">
        <div className="loc-grid">

          {/* INFO CARD */}
          <div className="loc-info-card">
            <div className="loc-info-header">
              <span className="loc-info-dot" />
              <span className="loc-info-header-title">STORE INFORMATION</span>
            </div>
            <div className="loc-info-body">

              <div className="loc-info-row">
                <div className="loc-info-icon">🏠</div>
                <div>
                  <p className="loc-info-label">Address</p>
                  <p className="loc-info-value">
                    Nike Kenya<br />
                    Mega City Mall, Oginga Odinga St<br />
                    Kisumu City, Kenya
                  </p>
                </div>
              </div>

              <div className="loc-info-row">
                <div className="loc-info-icon">🕐</div>
                <div>
                  <p className="loc-info-label">Working Hours</p>
                  <p className="loc-info-value">Mon – Sat: 8:00 AM – 6:00 PM</p>
                  <p className="loc-info-value">Sunday: 10:00 AM – 3:00 PM</p>
                </div>
              </div>

              <div className="loc-info-row">
                <div className="loc-info-icon">📞</div>
                <div>
                  <p className="loc-info-label">Phone</p>
                  <p className="loc-info-value">
                    <a href="tel:+254115134119">+254 115 134 119</a>
                  </p>
                </div>
              </div>

              <div className="loc-info-row">
                <div className="loc-info-icon">✉️</div>
                <div>
                  <p className="loc-info-label">Email</p>
                  <p className="loc-info-value">
                    <a href="mailto:amosmisati79@gmail.com">amosmisati79@gmail.com</a>
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Mega+City+Mall+Kisumu+Kenya"
                target="_blank"
                rel="noopener noreferrer"
                className="loc-directions-btn"
              >
                🗺️ GET DIRECTIONS →
              </a>
            </div>
          </div>

          {/* MAP */}
          <div className="loc-map-card">
            <div className="loc-map-header">
              <div className="loc-map-header-left">
                <span className="loc-map-dot" />
                <span className="loc-map-title">LIVE MAP — KISUMU CITY</span>
              </div>
              <span className="loc-map-tag">● OPEN NOW</span>
            </div>
            <iframe
              title="Nike Kenya — Mega City Mall, Kisumu"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6!2d34.7576!3d-0.0917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa454bd5c4ff1%3A0x4b7e4f3d2c8b1a5e!2sMega%20City%20Mall%2C%20Kisumu!5e0!3m2!1sen!2ske!4v1716301416744!5m2!1sen!2ske"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* LANDMARKS */}
        <div className="loc-landmarks">
          <p className="loc-landmarks-label">🧭 Nearby Landmarks</p>
          <div className="loc-landmarks-grid">
            {[
              { icon: "🛒", name: "Mega City Mall", desc: "WE ARE HERE", here: true },
              { icon: "🌊", name: "Lake Victoria", desc: "5 MIN DRIVE", here: false },
              { icon: "🚌", name: "Kisumu Bus Park", desc: "3 MIN WALK", here: false },
              { icon: "✈️", name: "Kisumu Airport", desc: "10 MIN DRIVE", here: false },
            ].map((lm, i) => (
              <div className={`loc-lm-card ${lm.here ? 'here' : ''}`} key={i}>
                <div className="loc-lm-icon">{lm.icon}</div>
                <p className="loc-lm-name">{lm.name}</p>
                <span className={`loc-lm-dist ${lm.here ? 'here-badge' : 'away-badge'}`}>{lm.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="loc-footer">
        <strong>©2026 Nike Kenya</strong>. All Rights Reserved.
        &nbsp;•&nbsp; Developed by <strong>Amos Misati</strong>
      </footer>
    </div>
  );
};

export default Location;