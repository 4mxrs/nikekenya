import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product_name, setProduct_name] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_cost, setProduct_cost] = useState("");
  const [product_photo, setProduct_photo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/signup");
    }
  }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   setUser(null);
  //   navigate("/signin");
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB");
      setProduct_photo(null);
      setPreviewUrl(null);
      return;
    }
    setProduct_photo(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const data = new FormData();
      data.append("product_name", product_name);
      data.append("product_description", product_description);
      data.append("product_cost", product_cost);
      data.append("product_photo", product_photo);
      const response = await axios.post(
        "https://misatihyrax.alwaysdata.net/api/add_product",
        data
      );
      setSuccess(response.data.message || "Product added successfully!");
      setProduct_name("");
      setProduct_description("");
      setProduct_cost("");
      setProduct_photo(null);
      setPreviewUrl(null);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ap-root">
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

        .ap-root {
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          background: var(--white);
          display: flex;
          flex-direction: column;
        }

        /* ── NAVBAR ── */
        .ap-nav {
          background: var(--black);
          border-bottom: 3px solid var(--orange);
          height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem;
          position: sticky; top: 0; z-index: 100;
        }
        .ap-brand {
          display: flex; align-items: center; gap: 12px; text-decoration: none;
        }
        .ap-brand-logo {
          width: 40px; height: 40px; border-radius: 4px;
          object-fit: cover; border: 1px solid rgba(255,255,255,0.15);
        }
        .ap-brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem; letter-spacing: 0.1em; color: #fff;
        }
        .ap-nav-links {
          display: flex; align-items: center; gap: 4px;
        }
        .ap-nav-link {
          color: rgba(255,255,255,0.6); text-decoration: none;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 6px 12px; border-radius: 2px;
          transition: color 0.2s, background 0.2s;
        }
        .ap-nav-link:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .ap-nav-link.active { color: var(--orange); }

        /* mobile hamburger */
        .ap-hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .ap-hamburger span {
          display: block; width: 22px; height: 2px;
          background: rgba(255,255,255,0.7); border-radius: 2px;
          transition: background 0.2s;
        }
        .ap-hamburger:hover span { background: var(--orange); }
        .ap-mobile-menu {
          background: #1a1a1a; border-bottom: 2px solid var(--orange);
          display: flex; flex-direction: column; padding: 12px 1.5rem;
        }
        .ap-mobile-menu .ap-nav-link { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }

        /* ── BAND ── */
        .ap-band {
          background: var(--orange); text-align: center;
          padding: 9px; font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem; letter-spacing: 0.3em; color: #fff;
        }

        /* ── HERO ── */
        .ap-hero {
          background: var(--black);
          position: relative; overflow: hidden;
          padding: 3.5rem 2rem;
          text-align: center;
        }
        .ap-hero-stripes {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(-55deg, transparent, transparent 50px, rgba(250,84,0,0.04) 50px, rgba(250,84,0,0.04) 100px);
        }
        .ap-hero-content { position: relative; z-index: 1; }
        .ap-hero-eyebrow {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.35em;
          color: var(--orange); text-transform: uppercase; margin-bottom: 0.75rem;
        }
        .ap-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          color: #fff; letter-spacing: 0.04em;
          line-height: 0.92; margin-bottom: 1rem;
        }
        .ap-hero-title span { color: var(--orange); }
        .ap-hero-sub {
          color: rgba(255,255,255,0.4);
          font-size: 0.9rem; font-weight: 500;
          letter-spacing: 0.05em; max-width: 480px; margin: 0 auto;
        }

        /* ── MAIN BODY ── */
        .ap-body {
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          background: var(--gray);
          padding: 3rem 1.5rem;
        }

        /* ── FORM CARD ── */
        .ap-card {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 4px;
          width: 100%; max-width: 520px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
        }
        .ap-card-header {
          background: var(--black);
          padding: 1.25rem 1.75rem;
          display: flex; align-items: center; gap: 12px;
        }
        .ap-card-header-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--orange);
          box-shadow: 0 0 0 3px rgba(250,84,0,0.2);
        }
        .ap-card-header-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem; letter-spacing: 0.1em; color: #fff;
        }
        .ap-card-body { padding: 1.75rem; }

        /* ── ALERTS ── */
        .ap-alert {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 14px; border-radius: 3px;
          font-size: 0.83rem; font-weight: 600;
          margin-bottom: 1.25rem; letter-spacing: 0.02em;
        }
        .ap-alert.success {
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.25); color: #166534;
        }
        .ap-alert.error {
          background: #fff0f0;
          border: 1px solid rgba(212,63,0,0.25); color: var(--orange-dark);
        }
        .ap-alert.info {
          background: rgba(250,84,0,0.06);
          border: 1px solid rgba(250,84,0,0.2); color: var(--orange-dark);
        }

        /* ── FIELDS ── */
        .ap-field { margin-bottom: 1.15rem; }
        .ap-label {
          display: block; font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--black); margin-bottom: 6px;
        }
        .ap-input, .ap-textarea {
          width: 100%; padding: 13px 14px;
          background: var(--gray); border: 1.5px solid var(--border);
          border-radius: 3px; font-family: 'Barlow', sans-serif;
          font-size: 0.95rem; color: var(--black);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ap-input:focus, .ap-textarea:focus {
          border-color: var(--black);
          box-shadow: 0 0 0 3px rgba(17,17,17,0.08);
          background: #fff;
        }
        .ap-input::placeholder, .ap-textarea::placeholder { color: #bbb; }
        .ap-textarea { resize: vertical; min-height: 90px; }

        /* file upload */
        .ap-file-label {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 14px;
          background: var(--gray); border: 1.5px dashed var(--border);
          border-radius: 3px; cursor: pointer;
          font-size: 0.88rem; color: var(--mid); font-weight: 500;
          transition: border-color 0.2s, color 0.2s;
        }
        .ap-file-label:hover { border-color: var(--black); color: var(--black); }
        .ap-file-label.has-file { border-color: var(--green); color: #166534; border-style: solid; }
        .ap-file-input { display: none; }

        /* preview */
        .ap-preview-wrap {
          margin-top: 12px; border-radius: 3px; overflow: hidden;
          border: 1px solid var(--border); position: relative;
        }
        .ap-preview-wrap img { width: 100%; max-height: 200px; object-fit: cover; display: block; }
        .ap-preview-badge {
          position: absolute; top: 8px; left: 8px;
          background: var(--black); color: var(--orange);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.7rem; letter-spacing: 0.15em;
          padding: 3px 8px; border-radius: 2px;
        }

        /* divider */
        .ap-divider {
          height: 1px; background: var(--border); margin: 1.5rem 0;
        }

        /* buttons */
        .ap-btn {
          width: 100%; padding: 15px;
          border: none; border-radius: 3px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.15rem; letter-spacing: 0.15em;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin-bottom: 10px;
        }
        .ap-btn-primary { background: var(--black); color: #fff; }
        .ap-btn-primary:hover:not(:disabled) { background: var(--orange); transform: translateY(-1px); }
        .ap-btn-primary:disabled { background: #ccc; cursor: not-allowed; }
        .ap-btn-secondary {
          background: transparent; color: var(--mid);
          border: 1.5px solid var(--border);
        }
        .ap-btn-secondary:hover { border-color: var(--black); color: var(--black); }

        @keyframes spin { to { transform: rotate(360deg); } }
        .ap-spinner {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; animation: spin 0.7s linear infinite;
        }

        /* ── FOOTER ── */
        .ap-footer {
          background: var(--black); color: rgba(255,255,255,0.4);
          text-align: center; padding: 1.25rem;
          border-top: 3px solid var(--orange);
          font-size: 0.78rem;
        }
        .ap-footer strong { color: rgba(255,255,255,0.65); }

        @media (max-width: 768px) {
          .ap-nav-links { display: none; }
          .ap-hamburger { display: flex; }
          .ap-nav { padding: 0 1.25rem; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="ap-nav">
        <Link to="/" className="ap-brand">
          {/* <img src="/images2/logo 1.jpeg" alt="NIKE" className="ap-brand-logo" /> */}
          <span className="ap-brand-name">NIKE KENYA</span>
        </Link>
        <div className="ap-nav-links">
          <Link to="/" className="ap-nav-link">Home</Link>
          <Link to="/addproduct" className="ap-nav-link active">Add Product</Link>
          <Link to="/signup" className="ap-nav-link">Sign Up</Link>
          <Link to="/signin" className="ap-nav-link">Sign In</Link>
          <Link to="/aboutus" className="ap-nav-link">About Us</Link>
          <Link to="/location" className="ap-nav-link">Location</Link>
        </div>
        <button className="ap-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="ap-mobile-menu">
          <Link to="/" className="ap-nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/addproduct" className="ap-nav-link active" onClick={() => setMenuOpen(false)}>Add Product</Link>
          <Link to="/signup" className="ap-nav-link" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          <Link to="/signin" className="ap-nav-link" onClick={() => setMenuOpen(false)}>Sign In</Link>
          <Link to="/aboutus" className="ap-nav-link" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/location" className="ap-nav-link" onClick={() => setMenuOpen(false)}>Location</Link>
        </div>
      )}

      {/* ORANGE BAND */}
      <div className="ap-band">LIST YOUR PRODUCT &nbsp;•&nbsp; REACH MORE BUYERS &nbsp;•&nbsp; FITSPARE MOTORS</div>

      {/* HERO */}
      <div className="ap-hero">
        <div className="ap-hero-stripes" />
        <div className="ap-hero-content">
          <p className="ap-hero-eyebrow">Seller Dashboard</p>
          <h1 className="ap-hero-title">ADD A <span>NEW</span><br />PRODUCT</h1>
          <p className="ap-hero-sub">List your auto part or accessory and connect with buyers instantly.</p>
        </div>
      </div>

      {/* BODY */}
      <div className="ap-body">
        <div className="ap-card">
          <div className="ap-card-header">
            <span className="ap-card-header-dot" />
            <span className="ap-card-header-title">PRODUCT DETAILS</span>
          </div>

          <div className="ap-card-body">

            {loading && (
              <div className="ap-alert info">
                <span>⏳</span><span>Adding product, please wait...</span>
              </div>
            )}
            {error && (
              <div className="ap-alert error">
                <span>✕</span><span>{error}</span>
              </div>
            )}
            {success && (
              <div className="ap-alert success">
                <span>✅</span><span>{success}</span>
              </div>
            )}

            <form onSubmit={submit}>
              <div className="ap-field">
                <label className="ap-label">Product Name</label>
                <input
                  type="text"
                  className="ap-input"
                  placeholder="e.g. Airmax..."
                  required
                  value={product_name}
                  onChange={e => setProduct_name(e.target.value)}
                />
              </div>

              <div className="ap-field">
                <label className="ap-label">Description</label>
                <textarea
                  className="ap-textarea"
                  placeholder="Describe the product — condition, compatibility, specs..."
                  required
                  value={product_description}
                  onChange={e => setProduct_description(e.target.value)}
                />
              </div>

              <div className="ap-field">
                <label className="ap-label">Price (KSh)</label>
                <input
                  type="number"
                  className="ap-input"
                  placeholder="e.g. 3500"
                  required
                  value={product_cost}
                  onChange={e => setProduct_cost(e.target.value)}
                />
              </div>

              <div className="ap-field">
                <label className="ap-label">Product Photo</label>
                <label className={`ap-file-label ${product_photo ? 'has-file' : ''}`}>
                  <span>{product_photo ? '✅' : '📷'}</span>
                  <span>{product_photo ? product_photo.name : 'Click to upload image (max 2MB)'}</span>
                  <input
                    type="file"
                    className="ap-file-input"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {previewUrl && (
                <div className="ap-preview-wrap">
                  <img src={previewUrl} alt="Preview" />
                  <span className="ap-preview-badge">PREVIEW</span>
                </div>
              )}

              <div className="ap-divider" />

              <button
                type="submit"
                className="ap-btn ap-btn-primary"
                disabled={loading || !product_photo}
              >
                {loading
                  ? <><span className="ap-spinner" /> UPLOADING...</>
                  : <>ADD PRODUCT →</>}
              </button>

              <button
                type="button"
                className="ap-btn ap-btn-secondary"
                onClick={() => navigate("/")}
              >
                ← GO BACK
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="ap-footer">
        <strong>©2026 Nike Kenya. </strong>. All Rights Reserved.
        &nbsp;•&nbsp; Developed by <strong>Amos Misati</strong>
      </footer>
    </div>
  );
};

export default AddProduct;