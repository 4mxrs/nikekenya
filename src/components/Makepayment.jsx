import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MakePayment = () => {
  const navigate = useNavigate();
  const img_url = "https://misatihyrax.alwaysdata.net/static/images/";
  const { product, cart } = useLocation().state || {};

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/signup");
  }, [navigate]);

  const totalAmount = cart
    ? cart.reduce((sum, item) => sum + item.product_cost * item.qty, 0)
    : product?.product_cost;

  const submit = async (e) => {
    e.preventDefault();
    if (!phone) { setError("Enter phone number"); return; }
    setLoading(true);
    setError("");
    setMessage("Processing payment...");
    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", totalAmount);
      const response = await axios.post("https://misatihyrax.alwaysdata.net/api/mpesa_payment", data);
      setMessage(response.data.message || "Payment request sent to phone ✔");
      setPhone("");
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!product && !cart) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#111', color: '#fff', fontFamily: "'Bebas Neue', sans-serif", gap: 20 }}>
        <h2 style={{ fontSize: '2rem', letterSpacing: '0.1em' }}>NO PRODUCT SELECTED</h2>
        <button onClick={() => navigate('/')} style={{ padding: '12px 32px', background: '#fa5400', border: 'none', borderRadius: 3, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.12em', cursor: 'pointer' }}>
          ← BACK TO SHOP
        </button>
      </div>
    );
  }

  const displayName = cart
    ? `CART — ${cart.length} ITEM${cart.length > 1 ? "S" : ""}`
    : product?.product_name;

  const displayDesc = cart
    ? cart.map((i) => i.product_name).join(" · ")
    : product?.product_description;

  return (
    <div className="nk-pay-root">
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

        .nk-pay-root {
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          background: var(--white);
          display: flex;
          flex-direction: column;
        }

        /* NAVBAR */
        .nk-pay-nav {
          background: var(--black);
          border-bottom: 3px solid var(--orange);
          height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem;
          position: sticky; top: 0; z-index: 100;
        }
        .nk-pay-brand {
          display: flex; align-items: center; gap: 12px; text-decoration: none;
        }
        .nk-pay-brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem; letter-spacing: 0.1em; color: #fff;
        }
        .nk-pay-back {
          background: none; border: 1.5px solid rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.7); border-radius: 3px;
          padding: 7px 16px; font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem; letter-spacing: 0.1em; cursor: pointer;
          transition: all 0.2s; text-decoration: none;
          display: flex; align-items: center; gap: 6px;
        }
        .nk-pay-back:hover { border-color: var(--orange); color: var(--orange); }

        /* ORANGE BAND */
        .nk-pay-band {
          background: var(--orange); text-align: center;
          padding: 9px; font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem; letter-spacing: 0.3em; color: #fff;
        }

        /* MAIN LAYOUT */
        .nk-pay-main {
          flex: 1;
          display: flex;
          min-height: calc(100vh - 101px);
        }

        /* LEFT — product */
        .nk-pay-left {
          flex: 1;
          background: var(--black);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 3rem;
          position: relative;
          overflow: hidden;
        }
        .nk-pay-left-stripes {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(-55deg, transparent, transparent 50px, rgba(250,84,0,0.04) 50px, rgba(250,84,0,0.04) 100px);
        }
        .nk-pay-product-card {
          position: relative; z-index: 1;
          max-width: 380px; width: 100%;
        }
        .nk-pay-product-label {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.3em;
          color: var(--orange); text-transform: uppercase; margin-bottom: 1rem;
        }
        .nk-pay-product-img-wrap {
          width: 100%; border-radius: 3px;
          overflow: hidden; background: #1a1a1a; margin-bottom: 1.5rem;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .nk-pay-product-img-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s;
          display: block;
        }
        .nk-pay-product-img-wrap:hover img { transform: scale(1.04); }

        /* Cart thumbnails on left */
        .nk-pay-cart-thumbs {
          display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 1.5rem;
        }
        .nk-pay-cart-thumb {
          width: 90px; height: 90px; object-fit: cover;
          border-radius: 3px;
          border: 1px solid rgba(250,84,0,0.3);
        }

        .nk-pay-product-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          color: #fff; letter-spacing: 0.04em;
          line-height: 0.95; margin-bottom: 10px;
        }
        .nk-pay-product-desc {
          color: rgba(255,255,255,0.45);
          font-size: 0.85rem; line-height: 1.6; margin-bottom: 1.25rem;
        }
        .nk-pay-price-tag {
          display: inline-flex; align-items: baseline; gap: 6px;
          background: rgba(250,84,0,0.12);
          border: 1px solid rgba(250,84,0,0.3);
          border-radius: 3px; padding: 10px 18px;
        }
        .nk-pay-price-label {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em;
          color: var(--orange); text-transform: uppercase;
        }
        .nk-pay-price-amount {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem; color: #fff; letter-spacing: 0.04em;
        }
        .nk-pay-guarantee {
          display: flex; align-items: center; gap: 8px;
          margin-top: 1.25rem; padding: 10px 14px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 3px; font-size: 0.78rem;
          color: rgba(255,255,255,0.5);
        }

        /* RIGHT — form */
        .nk-pay-right {
          width: 480px; min-width: 420px;
          background: var(--gray);
          display: flex; align-items: center; justify-content: center;
          padding: 3rem 2.5rem;
        }
        .nk-pay-form-card { width: 100%; max-width: 400px; }

        .nk-pay-form-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem; letter-spacing: 0.06em;
          color: var(--black); line-height: 1; margin-bottom: 4px;
        }
        .nk-pay-form-subtitle {
          color: var(--mid); font-size: 0.85rem;
          font-weight: 500; margin-bottom: 1.75rem; letter-spacing: 0.03em;
        }

        /* MPESA BADGE */
        .nk-mpesa-badge {
          display: flex; align-items: center; gap: 10px;
          background: #fff; border: 1.5px solid var(--border);
          border-radius: 4px; padding: 12px 16px; margin-bottom: 1.5rem;
        }
        .nk-mpesa-dot {
          width: 12px; height: 12px; border-radius: 50%;
          background: var(--green); flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
        }
        .nk-mpesa-text { font-size: 0.82rem; font-weight: 600; color: var(--black); }
        .nk-mpesa-sub { font-size: 0.72rem; color: var(--mid); }

        /* ORDER SUMMARY */
        .nk-pay-summary {
          background: #fff; border: 1.5px solid var(--border);
          border-radius: 4px; padding: 14px 16px; margin-bottom: 1.5rem;
        }
        .nk-pay-summary-title {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--mid); margin-bottom: 10px;
        }
        .nk-pay-summary-row {
          display: flex; justify-content: space-between;
          font-size: 0.85rem; color: var(--black); margin-bottom: 6px;
        }
        .nk-pay-summary-row.total {
          border-top: 1px solid var(--border);
          padding-top: 10px; margin-top: 6px;
          font-weight: 900; font-size: 1rem;
        }
        .nk-pay-summary-row.total span:last-child { color: var(--orange); }

        /* FORM FIELDS */
        .nk-pay-field { margin-bottom: 1.2rem; }
        .nk-pay-label {
          display: block; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--black); margin-bottom: 6px;
        }
        .nk-pay-input-wrap { position: relative; }
        .nk-pay-input-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%); font-size: 15px;
          pointer-events: none;
        }
        .nk-pay-input {
          width: 100%; padding: 13px 14px 13px 42px;
          background: #fff; border: 1.5px solid var(--border);
          border-radius: 3px; font-family: 'Barlow', sans-serif;
          font-size: 0.95rem; color: var(--black);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .nk-pay-input:focus {
          border-color: var(--black);
          box-shadow: 0 0 0 3px rgba(17,17,17,0.08);
        }
        .nk-pay-input::placeholder { color: #bbb; }
        .nk-pay-hint {
          font-size: 0.72rem; color: var(--mid);
          margin-top: 5px; font-weight: 500;
        }

        /* SUBMIT */
        .nk-pay-btn {
          width: 100%; padding: 15px;
          background: var(--black); border: none; border-radius: 3px;
          color: #fff; font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem; letter-spacing: 0.15em;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin-bottom: 10px;
        }
        .nk-pay-btn:hover:not(:disabled) { background: var(--orange); transform: translateY(-1px); }
        .nk-pay-btn:disabled { background: #ccc; cursor: not-allowed; }

        .nk-pay-btn-back {
          width: 100%; padding: 13px;
          background: transparent; border: 1.5px solid #d0d0d0;
          border-radius: 3px; color: var(--mid);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem; letter-spacing: 0.1em;
          cursor: pointer; transition: all 0.2s;
        }
        .nk-pay-btn-back:hover { border-color: var(--black); color: var(--black); }

        /* MESSAGES */
        .nk-pay-msg {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 14px; border-radius: 4px;
          font-size: 0.83rem; font-weight: 600; margin-bottom: 12px;
          letter-spacing: 0.02em;
        }
        .nk-pay-msg.success {
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.25);
          color: #166534;
        }
        .nk-pay-msg.err {
          background: #fff0f0;
          border: 1px solid rgba(212,63,0,0.25);
          color: var(--orange-dark);
        }

        .nk-pay-security {
          display: flex; align-items: center; justify-content: center;
          gap: 6px; margin-top: 12px;
          font-size: 0.72rem; color: var(--mid); font-weight: 500;
        }

        /* LOADING SPINNER */
        @keyframes spin { to { transform: rotate(360deg); } }
        .nk-spinner {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; animation: spin 0.7s linear infinite;
        }

        /* FOOTER */
        .nk-pay-footer {
          background: var(--black); color: rgba(255,255,255,0.4);
          text-align: center; padding: 1.25rem;
          border-top: 3px solid var(--orange);
          font-size: 0.78rem;
        }
        .nk-pay-footer strong { color: rgba(255,255,255,0.65); }

        @media (max-width: 768px) {
          .nk-pay-left { display: none; }
          .nk-pay-right { width: 100%; min-width: unset; }
          .nk-pay-nav { padding: 0 1rem; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="nk-pay-nav">
        <div className="nk-pay-brand">
          <span className="nk-pay-brand-name">Nike Kenya</span>
        </div>
        <button className="nk-pay-back" onClick={() => navigate(-1)}>← BACK</button>
      </nav>

      {/* ORANGE BAND */}
      <div className="nk-pay-band">SECURE CHECKOUT &nbsp;•&nbsp; LIPA NA M-PESA &nbsp;•&nbsp; FAST. SAFE. EASY.</div>

      {/* MAIN */}
      <div className="nk-pay-main">

        {/* LEFT — product/cart display */}
        <div className="nk-pay-left">
          <div className="nk-pay-left-stripes" />
          <div className="nk-pay-product-card">
            <p className="nk-pay-product-label">YOU'RE BUYING</p>

            {cart ? (
              <div className="nk-pay-cart-thumbs">
                {cart.map((item, idx) => (
                  <img
                    key={idx}
                    src={img_url + item.product_photo}
                    alt={item.product_name}
                    className="nk-pay-cart-thumb"
                    onError={e => e.target.src = "https://via.placeholder.com/90"}
                  />
                ))}
              </div>
            ) : (
              <div className="nk-pay-product-img-wrap" style={{ aspectRatio: '1 / 1' }}>
                <img
                  src={img_url + (product?.product_photo || '')}
                  alt={product?.product_name}
                  onError={e => e.target.src = "https://via.placeholder.com/300"}
                />
              </div>
            )}

            <h2 className="nk-pay-product-name">{displayName}</h2>
            <p className="nk-pay-product-desc">{displayDesc}</p>

            <div className="nk-pay-price-tag">
              <span className="nk-pay-price-label">TOTAL</span>
              <span className="nk-pay-price-amount">KES {Number(totalAmount).toLocaleString()}</span>
            </div>

            <div className="nk-pay-guarantee">
              <span>✅</span>
              100% Secure. Quality guaranteed or full refund.
            </div>
          </div>
        </div>

        {/* RIGHT — payment form */}
        <div className="nk-pay-right">
          <div className="nk-pay-form-card">

            <h2 className="nk-pay-form-title">LIPA NA M-PESA</h2>
            <p className="nk-pay-form-subtitle">Complete your purchase securely via M-Pesa.</p>

            {/* M-Pesa active badge */}
            <div className="nk-mpesa-badge">
              <span className="nk-mpesa-dot" />
              <div>
                <p className="nk-mpesa-text">M-Pesa STK Push</p>
                <p className="nk-mpesa-sub">A prompt will be sent directly to your phone</p>
              </div>
            </div>

            {/* Order summary */}
            <div className="nk-pay-summary">
              <p className="nk-pay-summary-title">ORDER SUMMARY</p>
              {cart ? (
                cart.map((item, idx) => (
                  <div className="nk-pay-summary-row" key={idx}>
                    <span>{item.product_name} ×{item.qty}</span>
                    <span>KES {Number(item.product_cost * item.qty).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <div className="nk-pay-summary-row">
                  <span>{product?.product_name}</span>
                  <span>KES {Number(totalAmount).toLocaleString()}</span>
                </div>
              )}
              <div className="nk-pay-summary-row">
                <span>Delivery</span>
                <span style={{ color: '#22c55e', fontWeight: 700 }}>Calculated at checkout</span>
              </div>
              <div className="nk-pay-summary-row total">
                <span>TOTAL</span>
                <span>KES {Number(totalAmount).toLocaleString()}</span>
              </div>
            </div>

            {message && (
              <div className="nk-pay-msg success">
                <span>✅</span>
                <span>{message}</span>
              </div>
            )}
            {error && (
              <div className="nk-pay-msg err">
                <span>✕</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={submit}>
              <div className="nk-pay-field">
                <label className="nk-pay-label">M-Pesa Phone Number</label>
                <div className="nk-pay-input-wrap">
                  <span className="nk-pay-input-icon">📱</span>
                  <input
                    type="tel"
                    className="nk-pay-input"
                    placeholder="2547XXXXXXXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                </div>
                <p className="nk-pay-hint">Format: 2547XXXXXXXX (include country code, no +)</p>
              </div>

              <button type="submit" className="nk-pay-btn" disabled={loading}>
                {loading ? (
                  <><span className="nk-spinner" /> PROCESSING...</>
                ) : (
                  <>PAY KES {Number(totalAmount).toLocaleString()} →</>
                )}
              </button>

              <button type="button" className="nk-pay-btn-back" onClick={() => navigate(-1)}>
                ← GO BACK
              </button>
            </form>

            <p className="nk-pay-security">🔒 256-bit SSL encrypted &nbsp;•&nbsp; Powered by Safaricom M-Pesa</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="nk-pay-footer">
        <strong>©2026 Amos</strong>. All Rights Reserved. &nbsp;•&nbsp; Secured by Safaricom M-Pesa
      </footer>
    </div>
  );
};

export default MakePayment;