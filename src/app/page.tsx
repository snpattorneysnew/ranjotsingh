"use client";
import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blogs";

// ── tiny helpers ──────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Services", "Blog", "Contact"];
const SERVICES = [
  { icon: "📊", title: "GST Consultancy", desc: "End-to-end GST registration, advisory & compliance management for businesses of all sizes." },
  { icon: "💼", title: "Income Tax Consultancy", desc: "Strategic tax planning and consultancy to minimise liabilities and maximise savings." },
  { icon: "📋", title: "ITR Filing", desc: "Accurate and timely Income Tax Return filing for individuals, firms, and corporates." },
  { icon: "🔄", title: "GST Return Filing", desc: "Seamless monthly, quarterly, and annual GST return filing with zero-error guarantee." },
  { icon: "📈", title: "Business Advisory", desc: "Financial strategy, structuring, and growth advisory for startups and established enterprises." },
  { icon: "✅", title: "Financial Compliance", desc: "ROC filings, statutory audits, and regulatory compliance to keep your business protected." },
];
const STATS = [
  { value: "25+", label: "Years of Combined Experience" },
  { value: "7+", label: "Empanelled CAs / Advocates / Professors" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "5000+", label: "Last 5000+ clients served" },
];

/** Local SEO phrases — in DOM & marquee, styled invisible (same as section background) */
const OTHER_SERVICES_SEO = [
  { cat: "Primary", text: "CA in Dehri" },
  { cat: "Primary", text: "best CA in Dehri" },
  { cat: "Primary", text: "chartered accountant in Dehri" },
  { cat: "Primary", text: "tax consultant in Dehri" },
  { cat: "Primary", text: "CA near me Dehri" },
  { cat: "Primary", text: "income tax return filing Dehri" },
  { cat: "Primary", text: "GST registration Dehri" },
  { cat: "Primary", text: "GST filing CA Dehri" },
  { cat: "Long-tail", text: "best CA in Dehri for GST registration" },
  { cat: "Long-tail", text: "ITR filing CA in Dehri Bihar" },
  { cat: "Long-tail", text: "affordable CA in Dehri Rohtas" },
  { cat: "Long-tail", text: "GST return filing service in Dehri" },
  { cat: "Long-tail", text: "tax saving consultant in Dehri" },
  { cat: "Hindi / Hinglish", text: "Dehri me CA kaha milega" },
  { cat: "Hindi / Hinglish", text: "income tax return kaise bhare Dehri" },
  { cat: "Hindi / Hinglish", text: "GST registration kaise kare Dehri" },
  { cat: "Hindi / Hinglish", text: "Dehri me tax consultant" },
  { cat: "Hindi / Hinglish", text: "CA fees Dehri Bihar" },
  { cat: "Hindi / Hinglish", text: "best CA Dehri me" },
  { cat: "Nearby", text: "CA in Sasaram" },
  { cat: "Nearby", text: "CA in Aurangabad" },
  { cat: "Nearby", text: "CA in Bikramganj" },
  { cat: "Nearby", text: "vakil near me Dehri" },
  { cat: "Nearby", text: "tax vakil Dehri" },
  { cat: "Nearby", text: "income tax vakil Dehri" },
  { cat: "Nearby", text: "GST vakil Dehri" },
  { cat: "Nearby", text: "business vakil Dehri" },
  { cat: "Nearby", text: "vakil for tax filing" },
  { cat: "Munim / Accountant", text: "munim near me" },
  { cat: "Munim / Accountant", text: "munim Dehri Bihar" },
  { cat: "Munim / Accountant", text: "account wala Dehri" },
  { cat: "Munim / Accountant", text: "dukaan ka hisaab rakhne wala" },
  { cat: "Munim / Accountant", text: "bahi khata expert" },
  { cat: "Munim / Accountant", text: "accountant for shop in Dehri" },
  { cat: "Tax wala", text: "tax wala near me" },
  { cat: "Tax wala", text: "income tax wala Dehri" },
  { cat: "Tax wala", text: "return file karne wala" },
  { cat: "Tax wala", text: "GST wala Dehri" },
  { cat: "Tax wala", text: "chartered accountant in Dehri" },
];
const _seoMid = Math.ceil(OTHER_SERVICES_SEO.length / 2);
const OTHER_SERVICES_SEO_ROW1 = OTHER_SERVICES_SEO.slice(0, _seoMid);
const OTHER_SERVICES_SEO_ROW2 = OTHER_SERVICES_SEO.slice(_seoMid);

/** Visible service names in “Our other services” marquee */
const MARQUEE_OTHER_SERVICES = [
  "GST Filing",
  "ITR Filing",
  "Tax Filing",
  "Tax Planning",
  "Audit",
  "Tax Audit",
  "Bookkeeping",
  "Accounting",
  "Company Registration",
  "GST Registration",
  "ROC Filing",
  "TDS Filing",
  "Payroll",
  "Compliance",
  "Business Registration",
  "Financial Advisory",
  "Loan Consultancy",
  "Project Report",
  "Business Valuation",
  "Startup Registration",
];
const _marqueeMid = Math.ceil(MARQUEE_OTHER_SERVICES.length / 2);
const MARQUEE_OTHER_ROW1 = MARQUEE_OTHER_SERVICES.slice(0, _marqueeMid);
const MARQUEE_OTHER_ROW2 = MARQUEE_OTHER_SERVICES.slice(_marqueeMid);

// Types for the marquee data
type SeoItem = {
  cat: string;
  text: string;
};

type MarqueeItems = string[] | SeoItem[];

interface MarqueeSeoRowProps {
  items: MarqueeItems;
  reverse?: boolean;
  variant?: "services" | "seo";
}

/** variant: "services" = visible cards; "seo" = invisible (background-matched) keyword rows */
function MarqueeSeoRow({ items, reverse = false, variant = "services" }: MarqueeSeoRowProps) {
  const doubled = [...items, ...items];
  const isSeo = variant === "seo";
  return (
    <div className="marquee-mask">
      <div className={`marquee-track${reverse ? " marquee-rev" : ""}`}>
        {doubled.map((item, i) =>
          isSeo ? (
            <article className="seo-card seo-card-seo-ghost" key={`${(item as SeoItem).cat}-${(item as SeoItem).text}-${i}`}>
              <div className="seo-card-cat">{(item as SeoItem).cat}</div>
              <p className="seo-card-text">{(item as SeoItem).text}</p>
            </article>
          ) : (
            <article className="seo-card seo-card-marquee" key={`${item as string}-${i}`}>
              <p className="seo-card-text">{item as string}</p>
            </article>
          )
        )}
      </div>
    </div>
  );
}

// ── reusable Modal ─────────────────────────────────────────────────────────────
interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

function Modal({ title, children, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// ── appointment form (shared: modal + contact section) ───────────────────────────
function AppointmentFormBody() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => 
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };
  if (sent) {
    return (
      <div className="form-success">
        <div className="success-icon">✓</div>
        <p>Thank you! We'll confirm your appointment shortly.</p>
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="appt-form">
      <div className="form-row">
        <input required name="name" placeholder="Full Name *" value={form.name} onChange={handle} />
        <input required name="phone" placeholder="Phone Number *" value={form.phone} onChange={handle} />
      </div>
      <input name="email" placeholder="Email Address" value={form.email} onChange={handle} />
      <select name="service" value={form.service} onChange={handle}>
        <option value="">Select Service</option>
        {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
      </select>
      <textarea name="message" placeholder="Brief description of your requirement..." rows={3} value={form.message} onChange={handle} />
      <button type="submit" className="btn-gold w-full">Confirm Appointment</button>
    </form>
  );
}

interface AppointmentFormProps {
  onClose: () => void;
}

function AppointmentForm({ onClose }: AppointmentFormProps) {
  return (
    <Modal title="Book an Appointment" onClose={onClose}>
      <AppointmentFormBody />
    </Modal>
  );
}

// ── privacy & terms content ────────────────────────────────────────────────────
function PrivacyContent() {
  return (
    <div className="legal-content">
      <p><strong>Effective Date:</strong> August 21, 2024</p>
      <h4>Information We Collect</h4>
      <p>We collect personal information (name, phone, email) only when you voluntarily submit it through our appointment form. Financial data shared for advisory purposes is kept strictly confidential.</p>
      <h4>How We Use Your Information</h4>
      <p>Your information is used solely to respond to enquiries, schedule appointments, and deliver the professional services you request. We do not sell, rent, or share your data with third parties.</p>
      <h4>Data Security</h4>
      <p>All client data is handled under professional CA ethics and applicable data protection laws. We implement appropriate technical safeguards to protect your information.</p>
      <h4>Cookies</h4>
      <p>Our website may use essential cookies for functionality. No tracking or advertising cookies are deployed without consent.</p>
      <h4>Contact for Privacy Queries</h4>
      <p>Email: ranjot@rsallp.com | Phone: 7004480307</p>
    </div>
  );
}
function TermsContent() {
  return (
    <div className="legal-content">
      <p><strong>Effective Date:</strong> August 21, 2024</p>
      <h4>Professional Services</h4>
      <p>Ranjot Singh & Associates LLP provides Chartered Accountancy services. All advice is professional opinion based on information provided by the client. Final decisions rest with the client.</p>
      <h4>Client Responsibilities</h4>
      <p>Clients must provide accurate, complete, and timely information. Any errors arising from incorrect information provided by the client remain the client's responsibility.</p>
      <h4>Confidentiality</h4>
      <p>All client information is treated as strictly confidential per ICAI professional standards and applicable law.</p>
      <h4>Fees & Engagement</h4>
      <p>Fee structures are agreed upon prior to engagement commencement. All engagements are governed by a formal letter of engagement.</p>
      <h4>Limitation of Liability</h4>
      <p>Our liability is limited to the fees paid for the specific service. We are not liable for consequential losses arising from third-party actions or regulatory changes.</p>
      <h4>Governing Law</h4>
      <p>These terms are governed by the laws of India. Disputes are subject to the jurisdiction of courts in Bihar and India.</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function Page() {
  const [modal, setModal] = useState<null | 'appt' | 'privacy' | 'terms'>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── global styles ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy: #0a1628;
          --navy-mid: #112240;
          --navy-light: #1d3461;
          --gold: #c9a84c;
          --gold-light: #e4c97e;
          --gold-pale: #f7f0dc;
          --cream: #faf8f3;
          --white: #ffffff;
          --text-dark: #1a1a2e;
          --text-muted: #6b7280;
          --radius: 12px;
          --shadow: 0 20px 60px rgba(10,22,40,0.12);
          --transition: cubic-bezier(0.4,0,0.2,1);
        }

        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text-dark); overflow-x: hidden; }

        h1,h2,h3,h4,h5 { font-family: 'Cormorant Garamond', serif; }

        /* ── navbar ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 5%; height: 72px; display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s var(--transition);
        }
        .navbar.scrolled {
          background: rgba(10,22,40,0.96); backdrop-filter: blur(12px);
          box-shadow: 0 4px 30px rgba(0,0,0,0.3);
          height: 64px;
        }
        .navbar-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .navbar-logo img { height: 42px; width: auto; }
        .navbar-brand { color: var(--gold-light); }
        .navbar-brand .firm-name { font-family: 'Cormorant Garamond', serif; font-size: 1.28rem; font-weight: 600; line-height: 1.2; }
        .navbar-brand .firm-sub { font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase; color: rgba(228,201,126,0.6); }
        @media (min-width: 769px) {
          .navbar { height: 92px; padding: 0 5%; }
          .navbar.scrolled { height: 78px; }
          .navbar-logo img { height: 50px; }
          .navbar-brand .firm-name { font-size: 1.9rem; line-height: 1.12; }
          .navbar-brand .firm-sub { font-size: 0.95rem; letter-spacing: 2.2px; }
          .nav-links a:not(.btn-nav) { font-size: 1.25rem; }
        }
        .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
        .nav-links a { color: rgba(255,255,255,0.85); letter-spacing: 0.5px; text-decoration: none; transition: color 0.2s; cursor: pointer; }
        .nav-links a.btn-nav { font-size: 0.875rem; }
        .nav-links a:hover { color: var(--gold-light); }
        .btn-nav { background: var(--gold); color: var(--navy) !important; padding: 8px 20px; border-radius: 6px; font-weight: 600 !important; transition: background 0.2s !important; }
        .btn-nav:hover { background: var(--gold-light) !important; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: var(--gold-light); transition: all 0.3s; border-radius: 2px; }
        .mobile-menu { display: none; position: fixed; top: 72px; left: 0; right: 0; background: var(--navy); padding: 20px 5% 32px; z-index: 99; flex-direction: column; gap: 4px; }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { color: rgba(255,255,255,0.85); padding: 12px 0; font-size: 1.125rem; border-bottom: 1px solid rgba(255,255,255,0.06); text-decoration: none; cursor: pointer; }
        .mobile-menu a:last-of-type { font-size: 1rem; }

        @media(max-width:768px){
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }

        /* ── hero ── */
        .hero {
          min-height: 100vh; display: flex; align-items: center;
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 50%, #0f1e3d 100%);
          position: relative; overflow: hidden; padding: 120px 5% 80px;
        }
        @media (min-width: 769px) {
          .hero { padding-top: 140px; }
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,168,76,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-grid {
          max-width: 1280px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(201,168,76,0.12); border: 1px solid rgba(201,168,76,0.3);
          color: var(--gold-light); padding: 6px 16px; border-radius: 100px;
          font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px;
          animation: fadeUp 0.8s var(--transition) both;
        }
        .hero-title {
          font-size: clamp(2.8rem, 5vw, 4.2rem); color: var(--white); line-height: 1.12;
          margin-bottom: 20px; animation: fadeUp 0.8s 0.15s var(--transition) both;
        }
        .hero-title em { color: var(--gold-light); font-style: italic; }
        .hero-tagline {
          font-family: 'DM Sans', sans-serif; font-size: 1.05rem; color: rgba(255,255,255,0.65);
          line-height: 1.7; margin-bottom: 36px; animation: fadeUp 0.8s 0.3s var(--transition) both;
        }
        .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-start; animation: fadeUp 0.8s 0.45s var(--transition) both; }
        .hero-cta-stack { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
        .hero-info { margin-top: 48px; display: flex; gap: 32px; flex-wrap: wrap; animation: fadeUp 0.8s 0.6s var(--transition) both; }
        .hero-info-item { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.5); font-size: 0.8rem; }
        .hero-info-item span { color: var(--gold-light); }

        .hero-visual { position: relative; animation: fadeLeft 1s 0.3s var(--transition) both; }
        .hero-img-wrap {
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.2);
          aspect-ratio: 4/3;
        }
        .hero-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .hero-card {
          position: absolute; bottom: -20px; left: -20px;
          background: var(--gold); color: var(--navy); padding: 16px 24px; border-radius: 12px;
          box-shadow: var(--shadow);
        }
        .hero-card .num { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; }
        .hero-card .lbl { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; }
        .ca-badge {
          position: absolute; top: -16px; right: -16px;
          background: var(--navy-mid); border: 1px solid rgba(201,168,76,0.3);
          padding: 12px; border-radius: 12px;
        }
        .ca-badge img { height: 48px; width: auto; }

        @media(max-width:900px){
          .hero-grid { grid-template-columns: 1fr; gap: 48px; }
          .hero-visual { max-width: 480px; margin: 0 auto; }
        }

        /* ── stats ── */
        .stats-bar {
          background: var(--navy); padding: 48px 5%;
        }
        .stats-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;
        }
        .stat-item { text-align: center; }
        .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; color: var(--gold-light); font-weight: 700; }
        .stat-label { font-size: 0.78rem; color: rgba(255,255,255,0.55); text-transform: none; letter-spacing: 0.02em; margin-top: 8px; line-height: 1.35; max-width: 220px; margin-left: auto; margin-right: auto; }

        @media(max-width:640px){ .stats-inner { grid-template-columns: repeat(2,1fr); } }

        /* ── section commons ── */
        .section { padding: 100px 5%; }
        .section-alt { background: var(--white); }
        .section-dark { background: var(--navy); }
        .container { max-width: 1280px; margin: 0 auto; }
        .section-label {
          font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase;
          color: var(--gold); font-weight: 600; margin-bottom: 12px;
        }
        .section-title { font-size: clamp(2rem, 4vw, 3rem); line-height: 1.2; margin-bottom: 16px; }
        .section-subtitle { color: var(--text-muted); line-height: 1.7; max-width: 560px; }
        .divider { width: 48px; height: 2px; background: var(--gold); margin: 20px 0; }

        /* ── about ── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .about-img { border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); aspect-ratio: 4/3; }
        .about-img img { width:100%; height:100%; object-fit:cover; }
        .about-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        .tag { background: var(--navy); color: var(--gold-light); padding: 6px 14px; border-radius: 6px; font-size: 0.75rem; letter-spacing: 0.5px; }
        @media(max-width:900px){ .about-grid { grid-template-columns:1fr; } }

        /* ── services ── */
        .services-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 48px; }
        .service-card {
          background: var(--cream); border-radius: var(--radius); padding: 32px 28px;
          border: 1px solid rgba(201,168,76,0.15); transition: all 0.3s var(--transition);
          cursor: default;
        }
        .service-card:hover { transform: translateY(-6px); box-shadow: var(--shadow); border-color: var(--gold); }
        .service-icon { font-size: 2rem; margin-bottom: 16px; }
        .service-title { font-family: 'Cormorant Garamond',serif; font-size: 1.3rem; font-weight: 600; margin-bottom: 10px; }
        .service-desc { font-size: 0.875rem; color: var(--text-muted); line-height: 1.65; }
        @media(max-width:900px){ .services-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:580px){ .services-grid { grid-template-columns: 1fr; } }

        /* ── other services (SEO marquee) ── */
        .other-services-section {
          padding: 88px 0 96px;
          background: linear-gradient(180deg, var(--cream) 0%, var(--white) 45%, var(--cream) 100%);
          overflow: hidden;
        }
        .other-services-section .os-header { padding: 0 5%; max-width: 1280px; margin: 0 auto 36px; }
        .marquee-stack { display: flex; flex-direction: column; gap: 18px; }
        .marquee-mask {
          overflow: hidden;
          width: 100%;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 16px;
          animation: marqueeLeft 70s linear infinite;
        }
        .marquee-track.marquee-rev {
          animation: marqueeRight 75s linear infinite;
        }
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; justify-content: center; flex-wrap: wrap; width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 5%; }
          .marquee-mask { -webkit-mask-image: none; mask-image: none; overflow: visible; }
        }
        .seo-card {
          flex: 0 0 auto;
          width: min(280px, 78vw);
          padding: 18px 20px;
          background: var(--white);
          border: 1px solid rgba(201,168,76,0.22);
          border-radius: var(--radius);
          box-shadow: 0 6px 24px rgba(10,22,40,0.06);
        }
        .seo-card-cat {
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 1.4px;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .seo-card-text {
          font-size: 0.9rem;
          font-weight: 500;
          line-height: 1.45;
          color: var(--text-dark);
        }
        .seo-card-marquee {
          width: min(200px, 72vw);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .seo-card-marquee .seo-card-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-weight: 600;
          margin: 0;
        }
        /* SEO keyword rows: in DOM for crawlers, visually same as section background */
        .other-services-section .seo-card-seo-ghost {
          background: transparent;
          border-color: transparent;
          box-shadow: none;
        }
        .other-services-section .seo-card-seo-ghost .seo-card-cat,
        .other-services-section .seo-card-seo-ghost .seo-card-text {
          color: transparent;
        }

        /* ── blog ── */
        .blog-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 48px; }
        .blog-card {
          background: var(--white); border-radius: var(--radius); overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06); transition: transform 0.3s var(--transition);
          border: 1px solid rgba(0,0,0,0.06);
        }
        .blog-card:hover { transform: translateY(-4px); }
        .blog-card:focus-visible { outline: 2px solid var(--gold); outline-offset: 4px; }
        .blog-img { height: 180px; background: linear-gradient(135deg, var(--navy-mid), var(--navy-light)); display:flex; align-items:center; justify-content:center; font-size:3rem; }
        .blog-body { padding: 24px; }
        .blog-tag { font-size: 0.65rem; text-transform:uppercase; letter-spacing:2px; color:var(--gold); font-weight:600; }
        .blog-title { font-family:'Cormorant Garamond',serif; font-size:1.2rem; margin:8px 0 12px; line-height:1.4; }
        .blog-date { font-size:0.78rem; color:var(--text-muted); }
        @media(max-width:900px){ .blog-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:580px){ .blog-grid { grid-template-columns: 1fr; } }

        /* ── contact ── */
        .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px; margin-top: 48px; align-items:start; }
        .contact-info-list { list-style:none; display:flex; flex-direction:column; gap:20px; margin-top:32px; }
        .contact-info-list li { display:flex; align-items:flex-start; gap:14px; }
        .ci-icon { font-size:1.2rem; margin-top:2px; flex-shrink:0; }
        .ci-label { font-size:0.7rem; text-transform:uppercase; letter-spacing:1.5px; color:var(--gold); font-weight:600; }
        .ci-val { font-size:0.9rem; color:rgba(255,255,255,0.8); margin-top:2px; line-height:1.5; }
        .ci-val a { color:var(--gold-light); text-decoration:none; }
        .map-wrap { border-radius: var(--radius); overflow:hidden; height:260px; margin-top:32px; border:1px solid rgba(201,168,76,0.2); }
        .map-wrap iframe { width:100%; height:100%; border:0; filter:grayscale(30%) contrast(1.1); }
        .timing-box { background:rgba(201,168,76,0.1); border:1px solid rgba(201,168,76,0.25); border-radius:10px; padding:16px 20px; margin-top:24px; }
        .timing-box .t-head { font-size:0.7rem; text-transform:uppercase; letter-spacing:2px; color:var(--gold); font-weight:600; margin-bottom:8px; }
        .timing-box p { font-size:0.85rem; color:rgba(255,255,255,0.7); line-height:1.6; }

        .contact-form-wrap { background:var(--white); border-radius:var(--radius); padding:40px; box-shadow:var(--shadow); }
        .contact-form-wrap h3 { font-size:1.6rem; margin-bottom:24px; }

        @media(max-width:900px){ .contact-grid { grid-template-columns:1fr; } }

        /* ── buttons ── */
        .btn-gold {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background:var(--gold); color:var(--navy); padding:13px 28px;
          border-radius:8px; font-weight:600; font-size:0.9rem; border:none; cursor:pointer;
          transition:all 0.25s var(--transition); text-decoration:none; letter-spacing:0.2px;
          font-family:'DM Sans',sans-serif;
        }
        .btn-gold:hover { background:var(--gold-light); transform:translateY(-2px); box-shadow:0 8px 24px rgba(201,168,76,0.35); }
        .btn-outline {
          display:inline-flex; align-items:center; gap:8px;
          background:transparent; color:var(--gold-light); padding:12px 28px;
          border-radius:8px; font-weight:500; font-size:0.9rem; border:1px solid rgba(201,168,76,0.4);
          cursor:pointer; transition:all 0.25s var(--transition); text-decoration:none;
          font-family:'DM Sans',sans-serif;
        }
        .btn-outline:hover { background:rgba(201,168,76,0.1); border-color:var(--gold-light); }
        .whatsapp-icon-inline { width: 1.25em; height: 1.25em; flex-shrink: 0; }
        .w-full { width:100%; }

        /* ── forms ── */
        .appt-form { display:flex; flex-direction:column; gap:14px; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .appt-form input, .appt-form select, .appt-form textarea {
          width:100%; padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:8px;
          font-family:'DM Sans',sans-serif; font-size:0.875rem; background:var(--cream);
          transition:border-color 0.2s; outline:none; color:var(--text-dark);
        }
        .appt-form input:focus,.appt-form select:focus,.appt-form textarea:focus { border-color:var(--gold); }
        .appt-form textarea { resize:vertical; }
        .form-success { text-align:center; padding:32px 0; }
        .success-icon { width:64px; height:64px; background:var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; font-size:1.5rem; color:var(--navy); font-weight:700; }
        .form-success p { color:var(--text-muted); }
        @media(max-width:500px){ .form-row { grid-template-columns:1fr; } }

        /* ── modal ── */
        .modal-backdrop {
          position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:200;
          display:flex; align-items:center; justify-content:center; padding:20px;
          backdrop-filter:blur(4px); animation:fadeIn 0.2s ease;
        }
        .modal-box {
          background:var(--white); border-radius:16px; width:100%; max-width:560px;
          max-height:90vh; overflow-y:auto; box-shadow:0 40px 80px rgba(0,0,0,0.3);
          animation:slideUp 0.3s var(--transition);
        }
        .modal-header { display:flex; justify-content:space-between; align-items:center; padding:24px 28px; border-bottom:1px solid #f0f0f0; }
        .modal-header h3 { font-size:1.5rem; }
        .modal-close { background:none; border:none; font-size:1.1rem; cursor:pointer; color:var(--text-muted); width:32px; height:32px; border-radius:50%; display:flex;align-items:center;justify-content:center; transition:background 0.2s; }
        .modal-close:hover { background:#f3f4f6; }
        .modal-body { padding:28px; }

        /* ── legal content ── */
        .legal-content h4 { font-family:'DM Sans',sans-serif; font-size:0.95rem; font-weight:600; margin:20px 0 6px; color:var(--navy); }
        .legal-content p { font-size:0.875rem; color:var(--text-muted); line-height:1.7; margin-bottom:8px; }

        /* ── footer ── */
        .footer { background:var(--navy); border-top:1px solid rgba(201,168,76,0.15); padding:56px 5% 32px; }
        .footer-grid { max-width:1280px; margin:0 auto; display:grid; grid-template-columns:2fr 1fr 1fr; gap:48px; }
        .footer-brand .firm-name { font-family:'Cormorant Garamond',serif; font-size:1.4rem; color:var(--gold-light); }
        .footer-brand p { font-size:0.83rem; color:rgba(255,255,255,0.45); line-height:1.7; margin:12px 0 0; max-width:280px; }
        .footer-col h5 { font-family:'DM Sans',sans-serif; font-size:0.7rem; text-transform:uppercase; letter-spacing:2px; color:rgba(255,255,255,0.4); margin-bottom:16px; }
        .footer-col ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
        .footer-col ul li { font-size:0.85rem; color:rgba(255,255,255,0.6); cursor:pointer; transition:color 0.2s; }
        .footer-col ul li:hover { color:var(--gold-light); }
        .footer-bottom { max-width:1280px; margin:32px auto 0; padding-top:24px; border-top:1px solid rgba(255,255,255,0.06); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
        .footer-bottom p { font-size:0.78rem; color:rgba(255,255,255,0.3); }
        .footer-legal { display:flex; gap:20px; }
        .footer-legal span { font-size:0.78rem; color:rgba(255,255,255,0.4); cursor:pointer; transition:color 0.2s; }
        .footer-legal span:hover { color:var(--gold-light); }
        @media(max-width:768px){ .footer-grid { grid-template-columns:1fr 1fr; } }
        @media(max-width:480px){ .footer-grid { grid-template-columns:1fr; } }

        /* ── whatsapp FAB ── */
        .whatsapp-fab {
          position:fixed; bottom:32px; right:32px; z-index:150;
          width:56px; height:56px; border-radius:50%; background:#25d366;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 8px 32px rgba(37,211,102,0.45); cursor:pointer;
          transition:transform 0.2s, box-shadow 0.2s; text-decoration:none;
          animation:pulse 2.5s infinite;
        }
        .whatsapp-fab:hover { transform:scale(1.1); box-shadow:0 12px 40px rgba(37,211,102,0.6); }
        .whatsapp-fab svg { width:30px; height:30px; }

        /* ── book appt sticky ── */
        .book-sticky {
          position:fixed; bottom:100px; right:32px; z-index:149;
          background:var(--gold); color:var(--navy); padding:10px 18px;
          border-radius:100px; font-size:0.8rem; font-weight:600;
          box-shadow:0 4px 20px rgba(201,168,76,0.4); cursor:pointer; border:none;
          font-family:'DM Sans',sans-serif; transition:all 0.2s;
          display:flex; align-items:center; gap:6px;
        }
        .book-sticky:hover { background:var(--gold-light); transform:translateY(-2px); }

        /* ── keyframes ── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{box-shadow:0 8px 32px rgba(37,211,102,0.45)} 50%{box-shadow:0 8px 40px rgba(37,211,102,0.7)} }
      `}</style>

      {/* ── NAVBAR ──────────────────────────────────────────────────────────── */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <a className="navbar-logo" href="#home" onClick={() => scrollTo("home")}>
          <img src="/ca_india_logo.png" alt="CA India Logo" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div className="navbar-brand">
            <div className="firm-name">Ranjot Singh & Associates LLP</div>
            <div className="firm-sub">Chartered Accountants</div>
          </div>
        </a>
        <ul className="nav-links">
          {["home","about","services","blog","contact"].map((s,i) => (
            <li key={s}><a onClick={() => scrollTo(s)}>{NAV_LINKS[i]}</a></li>
          ))}
          <li><a className="btn-nav" onClick={() => setModal("appt")}>Book Appointment </a></li>
        </ul>
        <div className="hamburger" onClick={() => setMobileOpen(o => !o)}>
          <span /><span /><span />
        </div>
      </nav>
      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        {["home","about","services","blog","contact"].map((s,i) => (
          <a key={s} onClick={() => scrollTo(s)}>{NAV_LINKS[i]}</a>
        ))}
        <a onClick={() => { setMobileOpen(false); setModal("appt"); }} style={{ color:"var(--gold-light)" }}>📅 Book Appointment</a>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="hero" id="home">
        <div className="hero-grid">
          <div>
            <div className="hero-badge">🏆 Registered CA Firm · LLPIN ACJ-0520</div>
            <h1 className="hero-title">
              Your Trusted<br />Partner in <em>Financial</em><br />Excellence
            </h1>
            <p className="hero-tagline">
              Expert GST & Income Tax consultancy, compliance management, and business advisory delivered with precision and integrity by Ranjot Singh & Associates LLP.
            </p>
            <div className="hero-ctas">
              <div className="hero-cta-stack">
                <button className="btn-gold" onClick={() => setModal("appt")}>📅 Book a Service Consultation</button>
                <a
                  className="btn-outline"
                  href="https://wa.me/917004480307"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="whatsapp-icon-inline" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.93 1.395 5.594L0 24l6.561-1.377A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.113-1.43l-.366-.217-3.894.818.827-3.8-.239-.39A9.818 9.818 0 0 1 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
                  </svg>
                  Talk to us directly
                </a>
              </div>
              <button className="btn-outline" onClick={() => scrollTo("services")}>Explore Services →</button>
            </div>
            <div className="hero-info">
              <div className="hero-info-item"><span>📞</span> 7004480307</div>
              <div className="hero-info-item"><span>📧</span> ranjot@rsallp.com</div>
              <div className="hero-info-item"><span>⏰</span> Mon–Sat 10:30–19:30</div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-img-wrap">
              <img src="/Ranjot_Singh_and_Associates_office_image.webp" alt="Office" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450'%3E%3Crect fill='%23112240'/%3E%3Ctext x='50%25' y='50%25' fill='%23c9a84c' text-anchor='middle' dy='.3em' font-size='48'%3E🏢%3C/text%3E%3C/svg%3E"; }} />
            </div>
            <div className="hero-card">
              <div className="lbl">Best CA in Dehri-on-Sone</div>
            </div>
            <div className="ca-badge">
              <img src="/ca_india_logo.png" alt="ICAI" onError={(e) => { (e.target as HTMLImageElement).style.display="none"; }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <div className="stats-bar">
        <div className="stats-inner">
          {STATS.map(s => (
            <div className="stat-item" key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ───────────────────────────────────────────────────────────── */}
      <section className="section section-alt" id="about">
        <div className="container">
          <div className="about-grid">
            <div>
              <div className="about-img">
                <img src="/office_sitting_area.webp" alt="Our Office" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450'%3E%3Crect fill='%230a1628'/%3E%3Ctext x='50%25' y='50%25' fill='%23c9a84c' text-anchor='middle' dy='.3em' font-size='64'%3E🏢%3C/text%3E%3C/svg%3E"; }} />
              </div>
            </div>
            <div>
              <p className="section-label">About the Firm</p>
              <h2 className="section-title">Built on Trust,<br />Driven by Expertise</h2>
              <div className="divider" />
              <p style={{ color:"var(--text-muted)", lineHeight:1.75, marginBottom:16 }}>
                Ranjot Singh & Associates LLP is a professionally managed Chartered Accountancy firm registered with the Ministry of Corporate Affairs (LLPIN: ACJ-0520), located at Above Aman Medical, Mohan Bigha, Dehri, Rohtas, Bihar.
              </p>
              <p style={{ color:"var(--text-muted)", lineHeight:1.75, marginBottom:24 }}>
                Founded with a commitment to delivering precise, ethical, and client-focused financial services, we cater to individuals, SMEs, and growing businesses across Dehri-on-Sone and beyond. Our team combines deep regulatory knowledge with a forward-thinking advisory approach, ensuring our clients are always compliant, protected, and positioned for growth.
              </p>
              <div className="about-tags">
                {["ICAI Compliant","GST Specialist","Tax Advisory","Business Structuring","Ethical Practice"].map(t => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
              <div style={{ marginTop:32 }}>
                <button className="btn-gold" onClick={() => setModal("appt")}>Book a Service Consultation →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────────── */}
      <section className="section" id="services">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Comprehensive CA Services</h2>
          <div className="divider" />
          <p className="section-subtitle">From GST registration to business advisory, we handle every facet of your financial compliance and growth strategy.</p>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div className="service-card" key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <div className="service-title">{s.title}</div>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:48 }}>
            <button className="btn-gold" onClick={() => setModal("appt")}>Book a Service Consultation</button>
          </div>
        </div>
      </section>

      {/* ── OUR OTHER SERVICES (SEO MARQUEE) ───────────────────────────────── */}
      <section className="other-services-section" id="other-services" aria-labelledby="other-services-heading">
        <div className="os-header">
          <p className="section-label">Beyond core CA services</p>
          <h2 className="section-title" id="other-services-heading">Our other services</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Filing, registrations, bookkeeping, compliance, advisory, and specialised support — scroll the bands below for the full range.
          </p>
        </div>
        <div className="marquee-stack">
          <MarqueeSeoRow items={MARQUEE_OTHER_ROW1} variant="services" />
          <MarqueeSeoRow items={MARQUEE_OTHER_ROW2} variant="services" reverse />
        </div>
        <div className="marquee-stack marquee-stack-seo-ghost" aria-hidden="true">
          <MarqueeSeoRow items={OTHER_SERVICES_SEO_ROW1} variant="seo" />
          <MarqueeSeoRow items={OTHER_SERVICES_SEO_ROW2} variant="seo" reverse />
        </div>
      </section>

      {/* ── BLOG ────────────────────────────────────────────────────────────── */}
      <section className="section section-alt" id="blog">
        <div className="container">
          <p className="section-label">Insights & Updates</p>
          <h2 className="section-title">Articles & Tax Insights</h2>
          <div className="divider" />
          <div className="blog-grid">
            {BLOG_POSTS.map(b => (
              <Link href={`/blog/${b.slug}`} key={b.slug} className="blog-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="blog-img">📰</div>
                <div className="blog-body">
                  <div className="blog-tag">{b.tag}</div>
                  <div className="blog-title">{b.title}</div>
                  <div className="blog-date">{b.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section className="section section-dark" id="contact">
        <div className="container">
          <p className="section-label" style={{ color:"var(--gold)" }}>Get in Touch</p>
          <h2 className="section-title" style={{ color:"var(--white)" }}>We'd Love to Hear<br />From You</h2>
          <div className="divider" />
          <div className="contact-grid">
            <div>
              <ul className="contact-info-list">
                {[
                  { icon:"📍", label:"Office Address", val:<>Above Aman Medical, Mohan Bigha,<br />Dehri, Rohtas, Bihar</> },
                  { icon:"📞", label:"Phone", val:<a href="tel:7004480307">+91 7004480307</a> },
                  { icon:"✉️", label:"Email", val:<a href="mailto:ranjot@rsallp.com">ranjot@rsallp.com</a> },
                  { icon:"🏢", label:"LLPIN", val:"ACJ-0520 · Active Status" },
                ].map(({ icon, label, val }) => (
                  <li key={label}>
                    <span className="ci-icon">{icon}</span>
                    <div>
                      <div className="ci-label">{label}</div>
                      <div className="ci-val">{val}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="timing-box">
                <div className="t-head">Office Hours</div>
                <p>Monday – Saturday: 10:30 AM – 7:30 PM</p>
                <p>Sunday: Closed</p>
              </div>
              <div className="map-wrap">
                <iframe
                  src="https://maps.google.com/maps?q=Above+Aman+Medical+Mohan+Bigha+Dehri+Rohtas+Bihar&output=embed"
                  title="Office Location"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="contact-form-wrap">
              <h3>Book an Appointment</h3>
              <AppointmentFormBody />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="firm-name">Ranjot Singh & Associates LLP</div>
            <p>Chartered Accountants providing trusted GST, Income Tax, and financial advisory services in Dehri-on-Sone and across India.</p>
          </div>
          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              {["home","about","services","blog","contact"].map((s,i) => (
                <li key={s} onClick={() => scrollTo(s)}>{NAV_LINKS[i]}</li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li onClick={() => setModal("privacy")}>Privacy Policy</li>
              <li onClick={() => setModal("terms")}>Terms & Conditions</li>
              <li onClick={() => setModal("appt")}>Book Appointment</li>
            </ul>
            <div style={{ marginTop:20 }}>
              <img src="/ca_india_logo.png" alt="ICAI" style={{ height:40, opacity:0.7 }} onError={(e) => (e.target as HTMLImageElement).style.display="none"} />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Ranjot Singh & Associates LLP · LLPIN ACJ-0520 · All rights reserved.</p>
          <div className="footer-legal">
            <span onClick={() => setModal("privacy")}>Privacy Policy</span>
            <span onClick={() => setModal("terms")}>Terms & Conditions</span>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS ────────────────────────────────────────────────── */}
      <a href="https://wa.me/917004480307?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20CA%20services." target="_blank" rel="noopener noreferrer" className="whatsapp-fab" title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.93 1.395 5.594L0 24l6.561-1.377A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.113-1.43l-.366-.217-3.894.818.827-3.8-.239-.39A9.818 9.818 0 0 1 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
        </svg>
      </a>
      <button className="book-sticky" onClick={() => setModal("appt")}>Talk to us directly →</button>

      {/* ── MODALS ──────────────────────────────────────────────────────────── */}
      {modal === "appt" && <AppointmentForm onClose={() => setModal(null)} />}
      {modal === "privacy" && <Modal title="Privacy Policy" onClose={() => setModal(null)}><PrivacyContent /></Modal>}
      {modal === "terms"   && <Modal title="Terms & Conditions" onClose={() => setModal(null)}><TermsContent /></Modal>}
    </>
  );
}
