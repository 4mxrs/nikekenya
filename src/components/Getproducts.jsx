import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// ── CHAT ANSWERS ──
const chatAnswers = [
  { keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'hii', 'hallo'], answer: "Hey! 👟 Welcome to Nike Kenya! I'm your personal sneaker assistant. What can I help you find today?" },
  { keywords: ['how are you', 'how r you', 'how are u'], answer: "Feeling fresh — just like a new pair of Air Max! 😄 Ready to help you find your perfect pair. What are you looking for?" },
  { keywords: ['air max', 'airmax', 'air max 90', 'air max 270'], answer: "🔥 Air Max is one of our most popular lines! Classic cushioning, iconic design. Check our listings above for current stock and sizes!" },
  { keywords: ['air force', 'af1', 'air force 1', 'force one'], answer: "👟 Air Force 1 — the legend! We stock AF1 in white, black, and colourway editions. Search 'Air Force' above to see what's available!" },
  { keywords: ['jordan', 'air jordan', 'aj1', 'aj4', 'jordan 1'], answer: "🏀 Air Jordan — the icon that started it all! We carry select Jordan colourways. Search 'Jordan' above or check our featured drops!" },
  { keywords: ['running', 'run', 'running shoes', 'pegasus', 'zoom'], answer: "🏃 For running, we recommend the Nike Pegasus or Zoom series. Lightweight, responsive, built for speed. Search 'running' above!" },
  { keywords: ['basketball', 'lebron', 'kobe', 'kyrie', 'hoop'], answer: "🏀 We stock performance basketball shoes including LeBron, KD, and Kyrie series. Search 'basketball' above!" },
  { keywords: ['kids', 'children', 'boys', 'girls', 'junior', 'child'], answer: "👦👧 We have Nike kids shoes in a wide range of sizes! Durable, comfortable, and super stylish. Search 'kids' above!" },
  { keywords: ['size', 'sizes', 'what size', 'sizing', 'fit'], answer: "📏 We stock sizes EU 36 to EU 47. If you're unsure of your size, Nike generally runs true to size. Contact us on 📞 0115134019 for sizing help!" },
  { keywords: ['price', 'cost', 'how much', 'expensive', 'cheap', 'affordable', 'bei'], answer: "💰 Prices are shown on each product card. We offer genuine Nike at competitive Kenya prices. Search the shoe you want to see its price!" },
  { keywords: ['discount', 'offer', 'sale', 'deal', 'promo'], answer: "🔥 Check our listings for current deals and promotions! We regularly drop exclusive offers for members." },
  { keywords: ['authentic', 'genuine', 'original', 'fake', 'replica', 'real'], answer: "✅ Every pair we sell is 100% authentic Nike. No replicas, no fakes — only the real deal. Your trust is everything to us!" },
  { keywords: ['payment', 'pay', 'mpesa', 'm-pesa', 'cash', 'card', 'lipa'], answer: "💳 We accept M-Pesa, cash, and card. Click 'Buy Now' on any product to go to checkout. Fast and secure!" },
  { keywords: ['delivery', 'shipping', 'deliver', 'send', 'courier'], answer: "🚚 We deliver nationwide across Kenya! Nairobi: same-day or next-day. Upcountry: 2-3 business days. Call 📞 0115134019 for delivery details!" },
  { keywords: ['return', 'refund', 'exchange', 'wrong size', 'damaged'], answer: "🔄 Easy returns! Wrong size or damaged pair? Contact us within 7 days on 📞 0115134019 and we'll sort it out fast!" },
  { keywords: ['warranty', 'guarantee'], answer: "✅ All shoes come with a quality guarantee. We only sell authentic Nike products — every pair is verified." },
  { keywords: ['contact', 'call', 'phone', 'number', 'whatsapp'], answer: "📞 Call or WhatsApp us on 0115134019. Available Monday–Saturday 8am–6pm. Email: amosmisati79@gmail.com" },
  { keywords: ['location', 'address', 'where', 'shop', 'find you', 'directions'], answer: "📍 We are located in Kisumu, Kenya. Check the Location page for Google Maps directions!" },
  { keywords: ['open', 'working hours', 'hours', 'when open', 'close', 'sunday'], answer: "🕗 Open Mon–Sat: 8:00am – 6:00pm. Sunday: 10:00am – 4:00pm." },
  { keywords: ['sign up', 'signup', 'register', 'create account'], answer: "📝 Click 'Sign Up' in the nav bar to create your account. Members get early access to drops and exclusive deals!" },
  { keywords: ['sign in', 'signin', 'login', 'log in'], answer: "🔐 Click 'Sign In' in the nav bar to access your account. Members only benefits await!" },
  { keywords: ['thank', 'thanks', 'asante', 'sawa', 'okay', 'ok', 'great', 'perfect', 'awesome'], answer: "😊 You're welcome! Just Do It — and let us know if you need anything else! 👟" },
  { keywords: ['bye', 'goodbye', 'later', 'kwaheri'], answer: "👋 Goodbye! Thanks for visiting Nike Kenya. Come back for the freshest drops!" },
  { keywords: ['just do it', 'slogan', 'motto'], answer: "⚡ JUST DO IT. — Three words that changed sport forever. That's the Nike spirit we bring to every pair!" },
  { keywords: ['new', 'latest', 'new arrival', 'fresh', 'drop'], answer: "🔥 New drops are always coming in! Check our product listings above for the latest arrivals. Don't sleep on the fresh stock!" },
  { keywords: ['help', 'assist', 'support'], answer: "🙋 I'm here to help! Ask me about shoes, sizes, payment, delivery, or anything Nike-related!" },
  { keywords: ['about', 'who are you', 'nike kenya', 'company'], answer: "👟 Nike Kenya — your official source for authentic Nike footwear in Kenya. We bring the world's greatest sports brand right to your door!" },
];

const quickQuestions = [
  "Air Max available?",
  "What sizes do you have?",
  "How do I pay?",
  "Do you deliver?",
  "Are shoes genuine?",
  "Return policy?",
];

const searchTags = [
  { label: 'Air Max',     query: 'air max'   },
  { label: 'Air Force 1', query: 'air force' },
  { label: 'Jordan',      query: 'jordan'    },
  { label: 'Running',     query: 'running'   },
  { label: 'Basketball',  query: 'basketball'},
  { label: 'Kids',        query: 'kids'      },
  { label: 'Slides',      query: 'slides'    },
  { label: 'New Arrivals',query: 'new'       },
];

const INITIAL_CHAT = [
  { role: 'assistant', text: "Hey! 👟 Welcome to Nike Kenya! I'm your personal sneaker assistant. Ask me about shoes, sizes, delivery, payment, or anything else. JUST DO IT! ⚡" }
];

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [footerComment, setFooterComment] = useState("");
  const [footerSent, setFooterSent] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [bannerVisible, setBannerVisible] = useState(true);

  const chatBottomRef = useRef(null);
  const navigate = useNavigate();
  const IMG_URL = "https://misatihyrax.alwaysdata.net/static/images/";

  const banners = [
    { top: "NEW SEASON DROP", main: "JUST DO IT.", sub: "Authentic Nike. Kenya's best price." },
    { top: "MEMBERS EXCLUSIVE", main: "FRESH KICKS AWAIT.", sub: "Sign up for early access to drops." },
    { top: "NATIONWIDE DELIVERY", main: "WE BRING NIKE TO YOU.", sub: "Same-day Nairobi. 2-3 days upcountry." },
    { top: "100% AUTHENTIC", main: "REAL NIKE. ALWAYS.", sub: "Every pair verified. Zero fakes." },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const t1 = setInterval(() => setBannerVisible(false), 3200);
    const t2 = setInterval(() => { setBannerIdx(p => (p + 1) % banners.length); setBannerVisible(true); }, 4000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [banners.length]);

  const requireAuth = (callback) => {
    const user = localStorage.getItem("user");
    if (!user) { navigate("/signup"); return false; }
    if (callback) callback();
    return true;
  };

  const handleNav = (path, state = {}) => {
    const user = localStorage.getItem("user");
    const publicPaths = ['/', '/signup', '/signin', '/aboutus', '/location'];
    if (!user && !publicPaths.includes(path)) { navigate("/signup"); return; }
    navigate(path, state);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading("Loading products...");
      setError("");
      try {
        const { data } = await axios.get("https://misatihyrax.alwaysdata.net/api/get_product_details");
        setProducts(data);
      } catch (err) {
        setError("Failed to load products: " + err.message);
      } finally {
        setLoading("");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => { chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages, chatLoading]);

  const filteredProducts = products.filter(p => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return p.product_name?.toLowerCase().includes(q) || p.product_description?.toLowerCase().includes(q);
  });

  const highlight = (text) => {
    if (!search || !text) return text;
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return String(text).split(regex).map((part, i) => regex.test(part) ? <mark key={i}>{part}</mark> : part);
  };

  const addToCart = (product) => {
    if (!requireAuth()) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...product, qty: 1 }];
    });
    showToast(`👟 "${product.product_name}" added to cart!`);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const cartTotal = cart.reduce((sum, i) => sum + i.product_cost * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const getReply = (text) => {
    const lower = text.toLowerCase();
    const match = chatAnswers.find(item => item.keywords.some(kw => lower.includes(kw)));
    return match?.answer ?? "Hmm, I'm not sure about that 🤔 Call us on 📞 0115134019 or WhatsApp — we'll sort you out!";
  };

  const dispatchChat = (userText) => {
    if (!requireAuth()) return;
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatLoading(true);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'assistant', text: getReply(userText) }]);
      setChatLoading(false);
    }, 800);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim() || chatLoading) return;
    dispatchChat(chatInput);
    setChatInput('');
  };

  const handleTagClick = (query) => {
    if (!requireAuth()) return;
    setSearch(query);
    setTimeout(() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleFooterSubmit = () => {
    if (!footerEmail || !footerComment) return;
    setFooterSent(true);
    setTimeout(() => { setFooterSent(false); setFooterEmail(''); setFooterComment(''); }, 3500);
  };

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800;900&display=swap');

        :root {
          --black: #111111;
          --white: #ffffff;
          --gray: #f5f5f5;
          --mid: #767676;
          --orange: #fa5400;
          --orange-dark: #d43f00;
          --border: #e5e5e5;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* TOAST */
        .nk-toast {
          position: fixed; top: 24px; right: 24px; z-index: 9999;
          background: var(--black); color: #fff;
          padding: 14px 20px; border-radius: 6px;
          font-size: 0.88rem; font-weight: 700;
          border-left: 4px solid var(--orange);
          box-shadow: 0 8px 30px rgba(0,0,0,0.35);
          animation: slideInR 0.35s ease;
          letter-spacing: 0.02em;
        }
        @keyframes slideInR { from{transform:translateX(80px);opacity:0} to{transform:translateX(0);opacity:1} }

        /* NAVBAR */
        .nk-nav {
          background: var(--black);
          position: sticky; top: 0; z-index: 800;
          border-bottom: 3px solid var(--orange);
          padding: 0 2.5rem; height: 68px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nk-nav-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .nk-tick { width: 50px; height: auto; filter: invert(1) brightness(2); }
        .nk-brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.55rem; letter-spacing: 0.1em; color: #fff;
        }
        .nk-nav-links { display: flex; align-items: center; gap: 1.8rem; }
        .nk-nav-link {
          color: rgba(255,255,255,0.72); text-decoration: none;
          font-size: 0.76rem; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; border-bottom: 2px solid transparent;
          padding-bottom: 2px; transition: all 0.2s;
        }
        .nk-nav-link:hover, .nk-nav-link.active { color: #fff; border-bottom-color: var(--orange); }
        .nk-cart-btn {
          display: flex; align-items: center; gap: 8px;
          background: var(--orange); border: none; border-radius: 4px;
          color: #fff; padding: 8px 18px; font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem; letter-spacing: 0.12em; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .nk-cart-btn:hover { background: var(--orange-dark); transform: translateY(-1px); }
        .nk-cart-badge {
          background: #fff; color: var(--orange);
          border-radius: 50%; width: 22px; height: 22px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem; font-weight: 900;
        }

        /* ORANGE BAND */
        .nk-band {
          background: var(--orange);
          text-align: center; padding: 9px 0; overflow: hidden;
        }
        .nk-band-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem; letter-spacing: 0.35em; color: #fff;
        }

        /* HERO BANNER */
        .nk-hero {
          background: var(--black); min-height: 280px;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden; text-align: center;
        }
        .nk-hero-stripes {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(-55deg,transparent,transparent 50px,rgba(250,84,0,0.04) 50px,rgba(250,84,0,0.04) 100px);
        }
        .nk-hero-content { position: relative; z-index: 1; }
        .nk-hero-eyebrow {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.35em;
          color: var(--orange); text-transform: uppercase; margin-bottom: 0.75rem;
        }
        .nk-hero-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          color: #fff; line-height: 0.9; letter-spacing: 0.04em;
          transition: opacity 0.4s, transform 0.4s;
        }
        .nk-hero-headline.out { opacity: 0; transform: translateY(-16px); }
        .nk-hero-headline.in  { opacity: 1; transform: translateY(0); }
        .nk-hero-sub {
          color: rgba(255,255,255,0.5); font-size: 0.92rem;
          font-weight: 500; margin-top: 0.75rem; letter-spacing: 0.02em;
        }
        .nk-hero-dots { display: flex; gap: 8px; justify-content: center; margin-top: 1.25rem; }
        .nk-hero-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.25); transition: all 0.3s;
        }
        .nk-hero-dot.on { background: var(--orange); transform: scale(1.5); }
        .nk-hero-bg-swoosh {
          position: absolute; right: -60px; bottom: -30px; width: 500px;
          opacity: 1; pointer-events: none;
        }

        /* TRUST BAR */
        .nk-trust {
          display: flex; justify-content: center; flex-wrap: wrap; gap: 24px;
          padding: 16px 24px; background: var(--gray);
          border-bottom: 1px solid var(--border);
        }
        .nk-trust-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.8rem; font-weight: 700; color: var(--black);
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .nk-trust-icon { font-size: 1.1rem; }

        /* SEARCH */
        .nk-search-section {
          background: #fff; padding: 28px 24px;
          border-bottom: 1px solid var(--border);
        }
        .nk-search-wrap {
          max-width: 660px; margin: 0 auto;
          display: flex; align-items: center;
          background: var(--gray); border-radius: 4px;
          border: 2px solid var(--border); overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .nk-search-wrap:focus-within { border-color: var(--black); box-shadow: 0 0 0 3px rgba(17,17,17,0.08); }
        .nk-search-icon { padding: 0 14px; font-size: 1.1rem; flex-shrink: 0; color: var(--mid); }
        .nk-search-input {
          flex: 1; border: none; outline: none; background: transparent;
          padding: 13px 4px; font-size: 0.95rem; font-family: 'Barlow', sans-serif;
          font-weight: 500; color: var(--black);
        }
        .nk-search-input::placeholder { color: #bbb; }
        .nk-search-clear { background: none; border: none; color: #bbb; font-size: 1rem; cursor: pointer; padding: 0 10px; }
        .nk-search-clear:hover { color: var(--orange); }
        .nk-search-btn {
          background: var(--black); border: none; color: #fff;
          font-family: 'Bebas Neue', sans-serif; font-size: 0.95rem;
          letter-spacing: 0.12em; padding: 13px 26px; cursor: pointer;
          transition: background 0.2s;
        }
        .nk-search-btn:hover { background: var(--orange); }
        .nk-search-meta { text-align: center; margin-top: 10px; font-size: 0.82rem; color: var(--mid); font-weight: 500; }
        .nk-search-meta b { color: var(--black); }
        .nk-tag-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .nk-tag {
          background: #fff; border: 1.5px solid var(--border); border-radius: 2px;
          padding: 6px 14px; font-size: 0.75rem; font-weight: 700; color: var(--black);
          letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;
          transition: all 0.15s;
        }
        .nk-tag:hover { background: var(--black); color: #fff; border-color: var(--black); }

        /* PRODUCTS */
        .nk-products { padding: 48px 32px 64px; background: #fff; }
        .nk-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          color: var(--black); letter-spacing: 0.04em; margin-bottom: 4px;
        }
        .nk-section-sub { color: var(--mid); font-size: 0.88rem; font-weight: 500; margin-bottom: 32px; }
        .nk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        .nk-card {
          background: var(--gray); border-radius: 2px; overflow: hidden;
          display: flex; flex-direction: column;
          transition: transform 0.3s, box-shadow 0.3s;
          animation: fadeUp 0.6s both;
        }
        .nk-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(17,17,17,0.14); }
        @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        .nk-card-img-wrap { position: relative; height: 220px; overflow: hidden; background: #e8e8e8; }
        .nk-card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .nk-card:hover .nk-card-img-wrap img { transform: scale(1.06); }
        .nk-card-overlay {
          position: absolute; inset: 0; background: rgba(17,17,17,0.6);
          display: flex; justify-content: center; align-items: center; gap: 10px;
          opacity: 0; transition: opacity 0.3s;
        }
        .nk-card:hover .nk-card-overlay { opacity: 1; }
        .nk-overlay-btn {
          padding: 9px 16px; border-radius: 2px;
          font-family: 'Bebas Neue', sans-serif; font-size: 0.85rem;
          letter-spacing: 0.1em; cursor: pointer; border: none;
          transition: transform 0.15s;
        }
        .nk-overlay-btn:hover { transform: scale(1.05); }
        .nk-badge {
          position: absolute; top: 12px; left: 12px;
          background: var(--black); color: #fff;
          padding: 4px 10px; border-radius: 2px;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; z-index: 2;
        }
        .nk-card-body { padding: 16px 18px 20px; display: flex; flex-direction: column; flex: 1; }
        .nk-prod-name {
          font-weight: 800; font-size: 0.95rem;
          color: var(--black); margin-bottom: 4px; line-height: 1.3;
        }
        .nk-prod-desc { font-size: 0.8rem; color: var(--mid); margin-bottom: 12px; line-height: 1.5; flex: 1; }
        .nk-price { font-size: 1.25rem; font-weight: 900; color: var(--orange); margin-bottom: 14px; }
        .nk-card-actions { display: flex; gap: 8px; }
        .nk-btn-buy {
          flex: 1; padding: 11px; border: none; border-radius: 2px;
          background: var(--black); color: #fff;
          font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem;
          letter-spacing: 0.1em; cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .nk-btn-buy:hover { background: var(--orange); transform: translateY(-1px); }
        .nk-btn-cart {
          padding: 11px 14px; border-radius: 2px;
          border: 2px solid var(--black); background: transparent;
          color: var(--black); font-size: 1rem; cursor: pointer;
          transition: all 0.2s;
        }
        .nk-btn-cart:hover { background: var(--black); color: #fff; }

        /* NO RESULTS */
        .nk-no-results { text-align: center; padding: 64px 20px; }
        .nk-no-results-icon { font-size: 60px; margin-bottom: 16px; }
        .nk-no-results h4 { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; color: var(--black); letter-spacing: 0.04em; margin-bottom: 8px; }
        .nk-no-results p { color: var(--mid); font-size: 0.88rem; }
        .nk-no-results-btn {
          margin-top: 20px; padding: 12px 28px;
          background: var(--black); border: none; border-radius: 2px;
          color: #fff; font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem; letter-spacing: 0.12em; cursor: pointer;
          transition: background 0.2s;
        }
        .nk-no-results-btn:hover { background: var(--orange); }

        /* CART DRAWER */
        .nk-cart-drawer {
          position: fixed; top: 0; height: 100vh; width: 400px;
          background: #fff; z-index: 9000;
          transition: right 0.4s cubic-bezier(0.4,0,0.2,1);
          display: flex; flex-direction: column;
          box-shadow: -8px 0 40px rgba(0,0,0,0.2);
        }
        .nk-cart-head {
          background: var(--black); padding: 18px 20px;
          display: flex; justify-content: space-between; align-items: center;
          border-bottom: 3px solid var(--orange);
        }
        .nk-cart-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; color: #fff; letter-spacing: 0.1em; }
        .nk-cart-close { background: none; border: none; color: #fff; font-size: 22px; cursor: pointer; }
        .nk-cart-item {
          display: flex; gap: 12px; margin-bottom: 14px;
          padding: 12px; background: var(--gray); border-radius: 2px;
        }
        .nk-cart-item img { width: 70px; height: 70px; object-fit: cover; border-radius: 2px; }
        .nk-cart-item-name { font-weight: 800; font-size: 0.88rem; color: var(--black); }
        .nk-cart-item-price { color: var(--orange); font-weight: 700; font-size: 0.88rem; margin: 2px 0 8px; }
        .nk-qty-btn {
          width: 28px; height: 28px; border-radius: 2px;
          border: 1.5px solid var(--border); background: #fff;
          font-weight: 700; cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
        }
        .nk-qty-btn:hover { border-color: var(--black); background: var(--black); color: #fff; }
        .nk-checkout-btn {
          width: 100%; padding: 14px; background: var(--black); border: none;
          color: #fff; font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem; letter-spacing: 0.15em; cursor: pointer;
          border-radius: 2px; transition: background 0.2s; margin-bottom: 8px;
        }
        .nk-checkout-btn:hover { background: var(--orange); }
        .nk-clear-btn {
          width: 100%; padding: 10px; background: none;
          border: 1.5px solid var(--border); border-radius: 2px;
          color: var(--mid); font-weight: 600; cursor: pointer;
          font-size: 0.88rem; transition: all 0.2s;
        }
        .nk-clear-btn:hover { border-color: var(--black); color: var(--black); }

        /* CHATBOX */
        .nk-chat-toggle {
          position: fixed; bottom: 28px; left: 28px; z-index: 7000;
          width: 58px; height: 58px; border-radius: 50%;
          background: var(--black); border: 3px solid var(--orange);
          color: #fff; font-size: 24px; cursor: pointer;
          box-shadow: 0 8px 24px rgba(17,17,17,0.35);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s, background 0.2s;
        }
        .nk-chat-toggle:hover { background: var(--orange); transform: scale(1.08); }
        .nk-chatbox {
          position: fixed; bottom: 100px; left: 28px; z-index: 7001;
          width: 340px; height: 500px; border-radius: 4px;
          background: #fff; overflow: hidden;
          display: flex; flex-direction: column;
          box-shadow: 0 16px 60px rgba(17,17,17,0.25);
          animation: chatUp 0.3s ease;
          border: 1px solid var(--border);
        }
        @keyframes chatUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .nk-chat-head {
          background: var(--black); padding: 14px 16px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 3px solid var(--orange);
        }
        .nk-chat-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: var(--orange); display: flex; align-items: center;
          justify-content: center; font-size: 18px; flex-shrink: 0;
        }
        .nk-chat-agent-name { font-family: 'Bebas Neue', sans-serif; font-size: 1rem; color: #fff; letter-spacing: 0.08em; }
        .nk-chat-status { font-size: 0.7rem; color: rgba(255,255,255,0.6); margin-top: 1px; }
        .nk-chat-status-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #22c55e; margin-right: 4px; }
        .nk-chat-clear {
          margin-left: auto; background: rgba(255,255,255,0.1); border: none;
          color: rgba(255,255,255,0.7); font-size: 0.7rem; cursor: pointer;
          border-radius: 3px; padding: 4px 8px; font-weight: 700; letter-spacing: 0.06em;
          transition: background 0.2s;
        }
        .nk-chat-clear:hover { background: rgba(255,255,255,0.2); }
        .nk-chat-messages {
          flex: 1; overflow-y: auto; padding: 14px; background: var(--gray);
          display: flex; flex-direction: column; gap: 10px;
        }
        .nk-chat-messages::-webkit-scrollbar { width: 4px; }
        .nk-chat-messages::-webkit-scrollbar-track { background: transparent; }
        .nk-chat-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }
        .nk-bubble-bot {
          background: #fff; border: 1px solid var(--border);
          border-radius: 0 12px 12px 12px; padding: 10px 13px;
          max-width: 80%; font-size: 0.82rem; color: var(--black);
          line-height: 1.55; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          animation: chatUp 0.2s ease;
        }
        .nk-bubble-user {
          background: var(--black); border-radius: 12px 0 12px 12px;
          padding: 10px 13px; max-width: 80%;
          font-size: 0.82rem; color: #fff; line-height: 1.55;
          animation: chatUp 0.2s ease;
        }
        .nk-bubble-row { display: flex; gap: 8px; align-items: flex-end; }
        .nk-bubble-row.user { justify-content: flex-end; }
        .nk-bubble-row.bot { justify-content: flex-start; }
        .nk-bot-icon {
          width: 28px; height: 28px; border-radius: 50%;
          background: var(--orange); display: flex; align-items: center;
          justify-content: center; font-size: 13px; flex-shrink: 0;
        }
        .nk-typing {
          display: flex; gap: 5px; align-items: center; padding: 10px 13px;
          background: #fff; border: 1px solid var(--border);
          border-radius: 0 12px 12px 12px; width: fit-content;
        }
        .nk-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--orange); display: inline-block;
          animation: bounce 1s infinite;
        }
        .nk-dot:nth-child(2) { animation-delay: 0.2s; }
        .nk-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%,100%{transform:translateY(0);opacity:0.5} 50%{transform:translateY(-5px);opacity:1} }
        .nk-chips {
          padding: 8px 10px; background: #fff;
          border-top: 1px solid var(--border);
          display: flex; gap: 6px; overflow-x: auto;
          scrollbar-width: none;
        }
        .nk-chips::-webkit-scrollbar { display: none; }
        .nk-chip {
          flex-shrink: 0; background: var(--gray);
          border: 1.5px solid var(--border); border-radius: 20px;
          padding: 5px 12px; font-size: 0.75rem; font-weight: 700;
          color: var(--black); cursor: pointer; letter-spacing: 0.03em;
          transition: all 0.15s; white-space: nowrap;
        }
        .nk-chip:hover { background: var(--black); color: #fff; border-color: var(--black); }
        .nk-chat-input-row {
          padding: 10px 12px; border-top: 1px solid var(--border);
          display: flex; gap: 8px; align-items: center; background: #fff;
        }
        .nk-chat-input {
          flex: 1; border: 1.5px solid var(--border); border-radius: 20px;
          padding: 8px 14px; font-size: 0.82rem; outline: none;
          font-family: 'Barlow', sans-serif; color: var(--black);
          transition: border-color 0.2s;
        }
        .nk-chat-input:focus { border-color: var(--black); }
        .nk-chat-send {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--black); border: none;
          color: #fff; font-size: 15px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .nk-chat-send:hover:not(:disabled) { background: var(--orange); }
        .nk-chat-send:disabled { background: #ccc; cursor: not-allowed; }

        /* MARQUEE */
        .nk-marquee {
          background: var(--black); padding: 18px 0; overflow: hidden;
          border-top: 3px solid var(--orange); border-bottom: 3px solid var(--orange);
          position: relative;
        }
        .nk-marquee-track {
          display: flex; animation: marquee 40s linear infinite; width: max-content;
        }
        .nk-marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .nk-marquee-item {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 8px 28px; white-space: nowrap;
          font-family: 'Bebas Neue', sans-serif; font-size: 1.05rem;
          letter-spacing: 0.08em; color: rgba(255,255,255,0.65);
          border-right: 1px solid rgba(255,255,255,0.1);
          transition: color 0.2s;
        }
        .nk-marquee-item:hover { color: var(--orange); }

        /* FLOAT CART */
        .nk-float-cart {
          position: fixed; bottom: 28px; right: 28px; z-index: 7000;
          background: var(--black); border: 2px solid var(--orange);
          border-radius: 4px; color: #fff; padding: 12px 20px;
          font-family: 'Bebas Neue', sans-serif; font-size: 0.95rem;
          letter-spacing: 0.12em; cursor: pointer;
          display: flex; align-items: center; gap: 10px;
          box-shadow: 0 8px 28px rgba(17,17,17,0.3);
          animation: slideInR 0.4s ease; transition: background 0.2s;
        }
        .nk-float-cart:hover { background: var(--orange); }

        /* FOOTER */
        .nk-footer {
          background: var(--black); color: rgba(255,255,255,0.6);
          border-top: 3px solid var(--orange); position: relative; overflow: hidden;
        }
        .nk-footer-top {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 28px; padding: 48px 60px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .nk-footer-brand {
          font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem;
          color: #fff; letter-spacing: 0.1em; margin-bottom: 8px;
        }
        .nk-footer-desc { font-size: 0.82rem; color: rgba(255,255,255,0.45); line-height: 1.65; margin-bottom: 16px; }
        .nk-footer-col-title {
          font-size: 0.68rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.2em; color: var(--orange); margin-bottom: 14px;
        }
        .nk-footer-link {
          display: block; color: rgba(255,255,255,0.5); text-decoration: none;
          font-size: 0.83rem; padding: 3px 0; transition: color 0.2s;
        }
        .nk-footer-link:hover { color: #fff; }
        .nk-footer-contact { display: flex; flex-direction: column; gap: 8px; }
        .nk-footer-contact-item { display: flex; align-items: flex-start; gap: 10px; }
        .nk-footer-ci-icon {
          width: 30px; height: 30px; flex-shrink: 0;
          background: rgba(250,84,0,0.1); border-radius: 4px;
          border: 1px solid rgba(250,84,0,0.2);
          display: flex; align-items: center; justify-content: center; font-size: 13px;
        }
        .nk-footer-ci-label { font-size: 0.68rem; font-weight: 700; color: rgba(255,255,255,0.35); display: block; }
        .nk-footer-ci-val { font-size: 0.82rem; color: rgba(255,255,255,0.65); }
        .nk-footer-input {
          width: 100%; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 3px;
          padding: 8px 12px; color: #e0e0e0; font-size: 0.82rem;
          outline: none; font-family: 'Barlow', sans-serif;
          transition: border-color 0.2s; resize: none; margin-bottom: 8px;
          box-sizing: border-box;
        }
        .nk-footer-input::placeholder { color: rgba(255,255,255,0.25); }
        .nk-footer-input:focus { border-color: var(--orange); }
        .nk-footer-submit {
          width: 100%; padding: 9px;
          background: var(--orange); border: none; border-radius: 3px;
          color: #fff; font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem; letter-spacing: 0.1em; cursor: pointer;
          transition: background 0.2s;
        }
        .nk-footer-submit:hover { background: var(--orange-dark); }
        .nk-footer-sent { text-align: center; color: #22c55e; font-size: 0.85rem; font-weight: 700; padding: 12px; background: rgba(34,197,94,0.08); border-radius: 4px; border: 1px solid rgba(34,197,94,0.2); }
        .nk-footer-bottom {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px; padding: 14px 60px;
          font-size: 0.78rem; color: rgba(255,255,255,0.3);
        }
        .nk-footer-bottom a { color: rgba(255,255,255,0.3); text-decoration: none; }
        .nk-footer-bottom a:hover { color: #fff; }
        mark { background: rgba(250,84,0,0.15); color: var(--orange-dark); border-radius: 2px; padding: 0 2px; font-weight: 700; }

        @media (max-width: 768px) {
          .nk-nav { padding: 0 1rem; }
          .nk-nav-links { display: none; }
          .nk-footer-top { grid-template-columns: 1fr; padding: 32px 24px; }
          .nk-footer-bottom { padding: 14px 24px; flex-direction: column; text-align: center; }
          .nk-chatbox { width: calc(100vw - 40px); left: 20px; }
        }
      `}</style>

      {/* TOAST */}
      {toast && <div className="nk-toast">{toast}</div>}

      {/* CART DRAWER */}
      <div className="nk-cart-drawer" style={{ right: cartOpen ? 0 : '-420px' }}>
        <div className="nk-cart-head">
          <span className="nk-cart-title">YOUR BAG ({cartCount})</span>
          <button className="nk-cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: 60, color: 'var(--mid)' }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>👟</div>
              <p style={{ fontFamily: "'Bebas Neue'", fontSize: '1.2rem', letterSpacing: '0.08em' }}>YOUR BAG IS EMPTY</p>
              <p style={{ fontSize: '0.82rem', marginTop: 6 }}>Add some kicks to get started!</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="nk-cart-item">
              <img src={IMG_URL + item.product_photo} alt={item.product_name} />
              <div style={{ flex: 1 }}>
                <p className="nk-cart-item-name">{item.product_name}</p>
                <p className="nk-cart-item-price">Ksh {item.product_cost?.toLocaleString()}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button className="nk-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{item.qty}</span>
                  <button className="nk-qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <p style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--black)' }}>Ksh {(item.product_cost * item.qty).toLocaleString()}</p>
                <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#bbb', cursor: 'pointer', fontSize: 16 }}>🗑</button>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: '14px 18px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.05rem', marginBottom: 14 }}>
              <span style={{ fontFamily: "'Bebas Neue'", letterSpacing: '0.08em' }}>TOTAL</span>
              <span style={{ color: 'var(--orange)' }}>Ksh {cartTotal.toLocaleString()}</span>
            </div>
            <button className="nk-checkout-btn" onClick={() => { setCartOpen(false); handleNav('/makepayment', { state: { cart } }); }}>
              CHECKOUT →
            </button>
            <button className="nk-clear-btn" onClick={() => setCart([])}>Clear Bag</button>
          </div>
        )}
      </div>
      {cartOpen && <div onClick={() => setCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 8999 }} />}

      {/* NAVBAR */}
      <nav className="nk-nav">
        <Link to="/" className="nk-nav-brand">
          {/* <img src="/mnt/user-data/uploads/nike_tick.jpeg" alt="Nike" className="nk-tick" /> */}
          <span className="nk-brand-name">NIKE KENYA</span>
        </Link>
        <div className="nk-nav-links">
          <Link to="/" className="nk-nav-link active">Home</Link>
          <Link to="/addproduct" className="nk-nav-link">Add Product</Link>
          <Link to="/signup" className="nk-nav-link">Sign Up</Link>
          <Link to="/signin" className="nk-nav-link">Sign In</Link>
          <Link to="/aboutus" className="nk-nav-link">About Us</Link>
          <Link to="/location" className="nk-nav-link">Location</Link>
          <button className="nk-cart-btn" onClick={() => { if (requireAuth()) setCartOpen(true); }}>
            👟 BAG
            {cartCount > 0 && <span className="nk-cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* ORANGE BAND */}
      <div className="nk-band">
        <span className="nk-band-text">JUST DO IT. &nbsp;•&nbsp; AUTHENTIC NIKE KENYA &nbsp;•&nbsp; FAST DELIVERY &nbsp;•&nbsp; JUST DO IT.</span>
      </div>

      {/* HERO BANNER */}
      <div className="nk-hero">
        <div className="nk-hero-stripes" />
        <div className="nk-hero-content">
          <p className="nk-hero-eyebrow">{banners[bannerIdx].top}</p>
          <h1 className={`nk-hero-headline ${bannerVisible ? 'in' : 'out'}`}>{banners[bannerIdx].main}</h1>
          <p className="nk-hero-sub">{banners[bannerIdx].sub}</p>
          <div className="nk-hero-dots">
            {banners.map((_, i) => <span key={i} className={`nk-hero-dot ${i === bannerIdx ? 'on' : ''}`} />)}
          </div>
        </div>
        <svg className="nk-hero-bg-swoosh" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 160 Q200 -60 490 80 Q310 110 80 150 Z" fill="rgba(250,84,0,0.06)"/>
        </svg>
      </div>

      {/* TRUST BAR */}
      <div className="nk-trust">
        {[['🔒','SECURE PAYMENTS'],['✅','100% AUTHENTIC'],['🚚','NATIONWIDE DELIVERY'],['🔄','EASY RETURNS'],['👟','GENUINE NIKE']].map(([icon, label]) => (
          <div key={label} className="nk-trust-item"><span className="nk-trust-icon">{icon}</span>{label}</div>
        ))}
      </div>

      {/* SEARCH */}
      <div className="nk-search-section">
        <div className="nk-search-wrap">
          <span className="nk-search-icon">🔍</span>
          <input
            type="text" className="nk-search-input"
            placeholder="Search shoes, styles, colourways…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => requireAuth()}
            onKeyDown={e => e.key === 'Escape' && setSearch('')}
          />
          {search && <button className="nk-search-clear" onClick={() => setSearch('')}>✕</button>}
          <button className="nk-search-btn">SEARCH</button>
        </div>
        <p className="nk-search-meta">
          {search
            ? <><b>{filteredProducts.length}</b> result{filteredProducts.length !== 1 ? 's' : ''} for "<b>{search}</b>"</>
            : <><b>{products.length}</b> products available</>}
        </p>
        {!search && (
          <div className="nk-tag-row">
            {searchTags.map(({ label, query }) => (
              <button key={label} className="nk-tag" onClick={() => handleTagClick(query)}>{label}</button>
            ))}
          </div>
        )}
      </div>

      {/* PRODUCTS */}
      <div id="products-section" className="nk-products">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 className="nk-section-title">
            {search ? `RESULTS FOR "${search.toUpperCase()}"` : '🔥 FRESH DROPS — SHOP NOW'}
          </h2>
          <p className="nk-section-sub">
            {search
              ? `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`
              : 'Authentic Nike footwear at Kenya\'s best prices.'}
          </p>
        </div>

        {loading && <p style={{ textAlign: 'center', color: 'var(--mid)', fontWeight: 700, letterSpacing: '0.08em' }}>{loading}</p>}
        {error && <p style={{ textAlign: 'center', color: 'var(--orange-dark)', fontWeight: 700 }}>{error}</p>}

        {!loading && search && filteredProducts.length === 0 && (
          <div className="nk-no-results">
            <div className="nk-no-results-icon">👟</div>
            <h4>NO RESULTS FOR "{search.toUpperCase()}"</h4>
            <p>Try another keyword — e.g. "Air Max", "Jordan", "running"</p>
            <button className="nk-no-results-btn" onClick={() => setSearch('')}>← BROWSE ALL</button>
          </div>
        )}

        <div className="nk-grid">
          {filteredProducts.map((product, index) => (
            <div className="nk-card" key={product.id || index} style={{ animationDelay: `${index * 0.07}s` }}>
              <div className="nk-card-img-wrap">
                <span className="nk-badge">IN STOCK</span>
                <img src={IMG_URL + product.product_photo} alt={product.product_name} />
                <div className="nk-card-overlay">
                  <button className="nk-overlay-btn" style={{ background: '#fff', color: 'var(--black)' }} onClick={() => addToCart(product)}>👟 Add to Bag</button>
                  <button className="nk-overlay-btn" style={{ background: 'var(--orange)', color: '#fff' }} onClick={() => handleNav('/makepayment', { state: { product } })}>Buy Now</button>
                </div>
              </div>
              <div className="nk-card-body">
                <p className="nk-prod-name">{highlight(product.product_name)}</p>
                <p className="nk-prod-desc">{highlight(product.product_description)}</p>
                <p className="nk-price">Ksh {Number(product.product_cost).toLocaleString()}</p>
                <div className="nk-card-actions">
                  <button className="nk-btn-buy" onClick={() => handleNav('/makepayment', { state: { product } })}>BUY NOW</button>
                  <button className="nk-btn-cart" onClick={() => addToCart(product)} title="Add to Bag">👟</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOAT CART */}
      {cartCount > 0 && (
        <button className="nk-float-cart" onClick={() => { if (requireAuth()) setCartOpen(true); }}>
          👟 BAG
          <span className="nk-cart-badge" style={{ background: 'var(--orange)', color: '#fff' }}>{cartCount}</span>
        </button>
      )}

      {/* CHAT TOGGLE */}
      <button className="nk-chat-toggle" onClick={() => setChatOpen(o => !o)} title="Chat with us">
        {chatOpen ? '✕' : '💬'}
      </button>

      {/* CHATBOX */}
      {chatOpen && (
        <div className="nk-chatbox">
          <div className="nk-chat-head">
            <div className="nk-chat-avatar">👟</div>
            <div>
              <p className="nk-chat-agent-name">NIKE KENYA ASSISTANT</p>
              <p className="nk-chat-status"><span className="nk-chat-status-dot" />Online — replies instantly</p>
            </div>
            <button className="nk-chat-clear" onClick={() => setChatMessages(INITIAL_CHAT)}>CLEAR</button>
          </div>

          <div className="nk-chat-messages">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`nk-bubble-row ${msg.role === 'user' ? 'user' : 'bot'}`}>
                {msg.role === 'assistant' && <div className="nk-bot-icon">👟</div>}
                <div className={msg.role === 'user' ? 'nk-bubble-user' : 'nk-bubble-bot'}>{msg.text}</div>
              </div>
            ))}
            {chatLoading && (
              <div className="nk-bubble-row bot">
                <div className="nk-bot-icon">👟</div>
                <div className="nk-typing">
                  <span className="nk-dot" /><span className="nk-dot" /><span className="nk-dot" />
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          <div className="nk-chips">
            {quickQuestions.map((q, i) => (
              <button key={i} className="nk-chip" onClick={() => dispatchChat(q)}>{q}</button>
            ))}
          </div>

          <div className="nk-chat-input-row">
            <input
              className="nk-chat-input" type="text" value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendChatMessage()}
              placeholder="Ask about shoes, sizes, delivery…"
            />
            <button className="nk-chat-send" onClick={sendChatMessage} disabled={chatLoading}>➤</button>
          </div>
        </div>
      )}

      {/* MARQUEE */}
      <div className="nk-marquee">
        <div className="nk-marquee-track">
          {[...['Nike Air Max','Nike Air Force 1','Nike Jordan','Nike Pegasus','Nike Zoom','Nike Dunk','Nike Blazer','Nike React','Nike Free Run','Nike Metcon','Nike ZoomX','Nike Vaporfly'], ...['Nike Air Max','Nike Air Force 1','Nike Jordan','Nike Pegasus','Nike Zoom','Nike Dunk','Nike Blazer','Nike React','Nike Free Run','Nike Metcon','Nike ZoomX','Nike Vaporfly']].map((b, i) => (
            <span key={i} className="nk-marquee-item">
              <img src="/mnt/user-data/uploads/nike_tick.jpeg" alt="" style={{ width: 22, height: 'auto', filter: 'invert(1) brightness(2) opacity(0.5)' }} />
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="nk-footer">
        <div className="nk-footer-top">
          <div>
            <img src="/mnt/user-data/uploads/nike_tick.jpeg" alt="Nike" style={{ width: 52, height: 'auto', filter: 'invert(1) brightness(2)', marginBottom: 12 }} />
            <div className="nk-footer-brand">NIKE KENYA</div>
            <p className="nk-footer-desc">Kenya's most trusted source for authentic Nike footwear. Every pair verified. Every customer served. Just Do It.</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><img src="/images/facebook1.jpeg" alt="Facebook" width="36" height="36" style={{ borderRadius: 4 }} /></a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer"><img src="/images/whatsup1.jpeg" alt="WhatsApp" width="36" height="36" style={{ borderRadius: 4 }} /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><img src="/images/instagram1.jpeg" alt="Instagram" width="36" height="36" style={{ borderRadius: 4 }} /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><img src="/images/linked in1.jpeg" alt="LinkedIn" width="36" height="36" style={{ borderRadius: 4 }} /></a>
            </div>
          </div>
          <div>
            <div className="nk-footer-col-title">Quick Links</div>
            {[['Home','/'],['Add Product','/addproduct'],['Sign Up','/signup'],['Sign In','/signin'],['About Us','/aboutus'],['Location','/location']].map(([l, p]) => (
              <Link key={l} to={p} className="nk-footer-link">{l}</Link>
            ))}
          </div>
          <div>
            <div className="nk-footer-col-title">Contact</div>
            <div className="nk-footer-contact">
              {[['📞','Phone / WhatsApp','0115 134 019'],['📧','Email','amosmisati79@gmail.com'],['📍','Location','Kisumu, Kenya']].map(([icon,label,val]) => (
                <div key={label} className="nk-footer-contact-item">
                  <div className="nk-footer-ci-icon">{icon}</div>
                  <div><span className="nk-footer-ci-label">{label}</span><span className="nk-footer-ci-val">{val}</span></div>
                </div>
              ))}
            </div>
            <div className="nk-footer-col-title" style={{ marginTop: 16 }}>Hours</div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 2 }}>
              <div>Mon – Sat: <span style={{ color: '#22c55e' }}>8:00am – 6:00pm</span></div>
              <div>Sunday: <span style={{ color: '#22c55e' }}>10:00am – 4:00pm</span></div>
            </div>
          </div>
          <div>
            <div className="nk-footer-col-title">Get In Touch</div>
            {footerSent ? (
              <div className="nk-footer-sent">✅ Message sent! We'll reply shortly.</div>
            ) : (
              <>
                <input type="email" className="nk-footer-input" placeholder="Your email" value={footerEmail} onChange={e => setFooterEmail(e.target.value)} />
                <textarea className="nk-footer-input" rows="3" placeholder="Your message…" value={footerComment} onChange={e => setFooterComment(e.target.value)} />
                <button className="nk-footer-submit" onClick={handleFooterSubmit}>SEND MESSAGE ✉️</button>
              </>
            )}
          </div>
        </div>
        <div className="nk-footer-bottom">
          <span>© 2026 <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Nike Kenya</strong>. All rights reserved. Developed by <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Misati Amos</strong>.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Sitemap</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default GetProducts;
