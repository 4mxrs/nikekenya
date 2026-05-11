import React, { useState } from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    { icon: "👟", title: "100% AUTHENTIC", desc: "Every Nike product we sell is genuine — sourced directly and verified for authenticity." },
    { icon: "🚚", title: "FAST DELIVERY", desc: "Get your Nike gear delivered swiftly across Kenya so you never miss a beat." },
    { icon: "🛡️", title: "TRUSTED SUPPORT", desc: "Our expert team is always ready to help you find the perfect Nike fit for your sport." },
  ];

  const stats = [
    { value: "500+", label: "Nike Products" },
    { value: "12K+", label: "Happy Athletes" },
    { value: "5+", label: "Years in Kenya" },
    { value: "100%", label: "Authentic Nike" },
  ];

  return (
    <div className="ab-root">
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

        .ab-root {
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          background: var(--white);
          display: flex;
          flex-direction: column;
        }

        /* ── NAVBAR ── */
        .ab-nav {
          background: var(--black);
          border-bottom: 3px solid var(--orange);
          height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem;
          position: sticky; top: 0; z-index: 100;
        }
        .ab-brand {
          display: flex; align-items: center; gap: 12px; text-decoration: none;
        }
        .ab-brand-logo {
          width: 40px; height: 40px; border-radius: 4px;
          object-fit: cover; border: 1px solid rgba(255,255,255,0.15);
        }
        .ab-brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem; letter-spacing: 0.1em; color: #fff;
        }
        .ab-nav-links { display: flex; align-items: center; gap: 4px; }
        .ab-nav-link {
          color: rgba(255,255,255,0.6); text-decoration: none;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 6px 12px; border-radius: 2px;
          transition: color 0.2s, background 0.2s;
        }
        .ab-nav-link:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .ab-nav-link.active { color: var(--orange); }

        .ab-hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .ab-hamburger span {
          display: block; width: 22px; height: 2px;
          background: rgba(255,255,255,0.7); border-radius: 2px;
        }
        .ab-hamburger:hover span { background: var(--orange); }
        .ab-mobile-menu {
          background: #1a1a1a; border-bottom: 2px solid var(--orange);
          display: flex; flex-direction: column; padding: 12px 1.5rem;
        }
        .ab-mobile-menu .ab-nav-link {
          padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        /* ── BAND ── */
        .ab-band {
          background: var(--orange); text-align: center;
          padding: 9px; font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem; letter-spacing: 0.3em; color: #fff;
        }

        /* ── HERO ── */
        .ab-hero {
          background: var(--black);
          position: relative; overflow: hidden;
          padding: 5rem 2rem;
          display: flex; align-items: center; justify-content: center;
          text-align: center;
        }
        .ab-hero-stripes {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(-55deg, transparent, transparent 50px, rgba(250,84,0,0.04) 50px, rgba(250,84,0,0.04) 100px);
        }
        .ab-hero-content { position: relative; z-index: 1; max-width: 700px; }
        .ab-hero-eyebrow {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.35em;
          color: var(--orange); text-transform: uppercase; margin-bottom: 1rem;
        }
        .ab-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 8vw, 6rem);
          color: #fff; letter-spacing: 0.04em;
          line-height: 0.88; margin-bottom: 1.25rem;
        }
        .ab-hero-title span { color: var(--orange); }
        .ab-hero-sub {
          color: rgba(255,255,255,0.45);
          font-size: 1rem; font-weight: 500;
          line-height: 1.7; max-width: 520px; margin: 0 auto 2rem;
        }
        .ab-hero-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px;
          background: var(--orange); border: none; border-radius: 3px;
          color: #fff; font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem; letter-spacing: 0.15em;
          text-decoration: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .ab-hero-cta:hover { background: var(--orange-dark); transform: translateY(-2px); color: #fff; }

        /* ── STATS BAR ── */
        .ab-stats {
          background: var(--orange);
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .ab-stat {
          padding: 1.5rem 1rem; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.2);
        }
        .ab-stat:last-child { border-right: none; }
        .ab-stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem; color: #fff; letter-spacing: 0.04em;
          line-height: 1;
        }
        .ab-stat-label {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: rgba(255,255,255,0.75);
          margin-top: 4px;
        }

        /* ── MISSION ── */
        .ab-mission {
          display: grid; grid-template-columns: 1fr 1fr;
          min-height: 420px;
        }
        .ab-mission-img {
          background: #1a1a1a; position: relative; overflow: hidden;
        }
        .ab-mission-img img {
          width: 100%; height: 100%; object-fit: cover;
          opacity: 0.85;
          transition: transform 0.6s;
        }
        .ab-mission-img:hover img { transform: scale(1.04); }
        .ab-mission-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, transparent 60%, var(--white));
        }
        .ab-mission-text {
          background: var(--white);
          display: flex; flex-direction: column; justify-content: center;
          padding: 3.5rem 3rem;
        }
        .ab-section-eyebrow {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.35em;
          color: var(--orange); text-transform: uppercase; margin-bottom: 0.75rem;
        }
        .ab-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          color: var(--black); letter-spacing: 0.04em;
          line-height: 0.9; margin-bottom: 1.25rem;
        }
        .ab-section-title span { color: var(--orange); }
        .ab-section-body {
          color: var(--mid); font-size: 0.95rem;
          line-height: 1.75; margin-bottom: 1.5rem;
        }
        .ab-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 3px; font-size: 0.78rem;
          font-weight: 600; color: #166534;
        }

        /* ── WHY CHOOSE US ── */
        .ab-why {
          background: var(--gray);
          padding: 5rem 2rem;
          text-align: center;
        }
        .ab-why-inner { max-width: 1000px; margin: 0 auto; }
        .ab-why-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          color: var(--black); letter-spacing: 0.04em; margin-bottom: 0.5rem;
        }
        .ab-why-title span { color: var(--orange); }
        .ab-why-sub {
          color: var(--mid); font-size: 0.9rem; margin-bottom: 3rem;
          font-weight: 500;
        }
        .ab-services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;
        }
        .ab-service-card {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 3px;
          padding: 2rem 1.5rem;
          text-align: left;
          border-bottom: 3px solid var(--border);
          transition: border-bottom-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .ab-service-card:hover {
          border-bottom-color: var(--orange);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }
        .ab-service-icon {
          font-size: 1.75rem; margin-bottom: 1rem;
          display: block;
        }
        .ab-service-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem; letter-spacing: 0.08em;
          color: var(--black); margin-bottom: 0.5rem;
        }
        .ab-service-desc {
          color: var(--mid); font-size: 0.88rem; line-height: 1.6;
        }

        /* ── CTA ── */
        .ab-cta {
          background: var(--white);
          padding: 5rem 2rem; text-align: center;
        }
        .ab-cta-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: var(--black); letter-spacing: 0.04em;
          line-height: 0.9; margin-bottom: 1rem;
        }
        .ab-cta-title span { color: var(--orange); }
        .ab-cta-sub {
          color: var(--mid); font-size: 0.95rem;
          margin-bottom: 2rem; font-weight: 500;
        }
        .ab-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 40px;
          background: var(--black); border: none; border-radius: 3px;
          color: #fff; font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem; letter-spacing: 0.15em;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .ab-cta-btn:hover { background: var(--orange); color: #fff; transform: translateY(-2px); }

        /* ── FOOTER ── */
        .ab-footer {
          background: var(--black); color: rgba(255,255,255,0.4);
          text-align: center; padding: 1.25rem;
          border-top: 3px solid var(--orange);
          font-size: 0.78rem;
        }
        .ab-footer strong { color: rgba(255,255,255,0.65); }

        @media (max-width: 900px) {
          .ab-mission { grid-template-columns: 1fr; }
          .ab-mission-img { min-height: 280px; }
          .ab-mission-img-overlay { background: linear-gradient(to bottom, transparent 60%, var(--white)); }
          .ab-services-grid { grid-template-columns: 1fr; }
          .ab-stats { grid-template-columns: repeat(2, 1fr); }
          .ab-stat { border-bottom: 1px solid rgba(255,255,255,0.2); }
        }
        @media (max-width: 768px) {
          .ab-nav-links { display: none; }
          .ab-hamburger { display: flex; }
          .ab-nav { padding: 0 1.25rem; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="ab-nav">
        <Link to="/" className="ab-brand">
          {/* <img src="/mnt/user-data/uploads/nike_tick.jpeg" alt="Nike Kenya" className="ab-brand-logo" style={{ filter: 'invert(1) brightness(2)', background: 'transparent', border: 'none' }} /> */}
          <span className="ab-brand-name">NIKE KENYA</span>
        </Link>
        <div className="ab-nav-links">
          <Link to="/" className="ab-nav-link">Home</Link>
          <Link to="/addproduct" className="ab-nav-link">Add Product</Link>
          <Link to="/signup" className="ab-nav-link">Sign Up</Link>
          <Link to="/signin" className="ab-nav-link">Sign In</Link>
          <Link to="/aboutus" className="ab-nav-link active">About Us</Link>
          <Link to="/location" className="ab-nav-link">Location</Link>
        </div>
        <button className="ab-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="ab-mobile-menu">
          <Link to="/" className="ab-nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/addproduct" className="ab-nav-link" onClick={() => setMenuOpen(false)}>Add Product</Link>
          <Link to="/signup" className="ab-nav-link" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          <Link to="/signin" className="ab-nav-link" onClick={() => setMenuOpen(false)}>Sign In</Link>
          <Link to="/aboutus" className="ab-nav-link active" onClick={() => setMenuOpen(false)}>About Us</Link>
        </div>
      )}

      {/* BAND */}
      <div className="ab-band">JUST DO IT &nbsp;•&nbsp; AUTHENTIC NIKE &nbsp;•&nbsp; NIKE KENYA</div>

      {/* HERO */}
      <div className="ab-hero">
        <div className="ab-hero-stripes" />
        <div className="ab-hero-content">
          <p className="ab-hero-eyebrow">About Nike Kenya</p>
          <h1 className="ab-hero-title">BUILT FOR<br /><span>THE GAME.</span></h1>
          <p className="ab-hero-sub">
            Kenya's home for authentic Nike footwear, apparel and accessories.
            We keep athletes moving — one genuine Nike product at a time.
          </p>
          <Link to="/" className="ab-hero-cta">EXPLORE PRODUCTS →</Link>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="ab-stats">
        {stats.map((s, i) => (
          <div className="ab-stat" key={i}>
            <div className="ab-stat-value">{s.value}</div>
            <div className="ab-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* MISSION */}
      <div className="ab-mission">
        <div className="ab-mission-img">
          {/* <img src="/mnt/user-data/uploads/nike_tick.jpeg" alt="Our Mission" style={{ filter: 'invert(1) brightness(2)' }} /> */}
          <div className="ab-mission-img-overlay" />
        </div>
        <div className="ab-mission-text">
          <p className="ab-section-eyebrow">Who We Are</p>
          <h2 className="ab-section-title">OUR<br /><span>MISSION</span></h2>
          <p className="ab-section-body">
            Nike Kenya is committed to delivering authentic, performance-driven
            footwear and apparel to every Kenyan athlete. Our goal is to inspire
            and equip you — whether you're on the track, court, or street.
            We stock only genuine Nike products, because your performance deserves nothing less.
          </p>
          <div className="ab-badge">
            ✅ &nbsp;100% Authentic Nike — Quality Guaranteed
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="ab-why">
        <div className="ab-why-inner">
          <p className="ab-section-eyebrow" style={{ textAlign: 'center' }}>Why Nike Kenya</p>
          <h2 className="ab-why-title">WHY <span>CHOOSE</span> US?</h2>
          <p className="ab-why-sub">Three reasons thousands of Kenyan athletes trust us every day.</p>
          <div className="ab-services-grid">
            {services.map((s, i) => (
              <div className="ab-service-card" key={i}>
                <span className="ab-service-icon">{s.icon}</span>
                <h4 className="ab-service-title">{s.title}</h4>
                <p className="ab-service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ab-cta">
        <h2 className="ab-cta-title">READY TO SHOP<br /><span>NIKE?</span></h2>
        <p className="ab-cta-sub">Browse hundreds of authentic Nike products available in Kenya right now.</p>
        <Link to="/" className="ab-cta-btn">SHOP NOW →</Link>
      </div>

      {/* FOOTER */}
      <footer className="ab-footer">
        <strong>©2026 Nike Kenya</strong>. All Rights Reserved.
        &nbsp;•&nbsp; Developed by <strong>Amos Misati</strong>
      </footer>
    </div>
  );
};

export default AboutUs;
