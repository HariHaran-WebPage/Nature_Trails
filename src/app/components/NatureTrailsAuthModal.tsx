"use client";
import { useState } from "react";

/* ─── Design tokens ─── */
const C = {
  gd:  "#133A02",
  gm:  "#1E5405",
  gl:  "#4A9612",
  gll: "#7DC43A",
  bdr: "#D8E8CC",
  gr:  "#1A2015",
  grl: "#5A6652",
  bg:  "#F5FAF0",
  white: "#FFFFFF",
};

const F = "'DM Sans', 'Segoe UI', sans-serif";
const FD = "'Playfair Display', Georgia, serif";

const AUTH_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:wght@500;600;700&display=swap');

  /* ── Hide scrollbar everywhere ── */
  .nt__auth__card { scrollbar-width: none; -ms-overflow-style: none; }
  .nt__auth__card::-webkit-scrollbar { display: none; }
  .nt__auth__body { scrollbar-width: none; -ms-overflow-style: none; }
  .nt__auth__body::-webkit-scrollbar { display: none; }

  .nt__auth__overlay {
    position: fixed; inset: 0;
    background: rgba(5, 18, 2, 0.72);
    backdrop-filter: blur(12px) saturate(1.4);
    display: flex; align-items: center; justify-content: center;
    padding: 16px; z-index: 999999;
    animation: nt__fadeIn .22s ease;
  }
  @keyframes nt__fadeIn { from { opacity: 0 } to { opacity: 1 } }

  .nt__auth__card {
    background: ${C.white};
    border-radius: 28px;
    width: 100%; max-width: 448px;
    overflow-y: auto; max-height: 92vh;
    box-shadow:
      0 2px 4px rgba(0,0,0,.04),
      0 8px 24px rgba(0,0,0,.10),
      0 32px 80px rgba(10,40,5,.28),
      0 0 0 1px rgba(255,255,255,.12);
    animation: nt__slideUp .3s cubic-bezier(.22,1,.36,1);
    position: relative;
  }
  @keyframes nt__slideUp {
    from { opacity: 0; transform: translateY(32px) scale(.96) }
    to   { opacity: 1; transform: none }
  }

  /* ── Header ── */
  .nt__auth__hdr {
    background: linear-gradient(150deg, ${C.gd} 0%, ${C.gm} 55%, #2C6B0A 100%);
    padding: 28px 28px 24px;
    position: relative; overflow: hidden;
  }
  .nt__auth__hdr__orb1 {
    position: absolute; right: -48px; top: -48px;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(122,210,50,.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .nt__auth__hdr__orb2 {
    position: absolute; left: -32px; bottom: -60px;
    width: 160px; height: 160px; border-radius: 50%;
    background: radial-gradient(circle, rgba(78,180,20,.14) 0%, transparent 70%);
    pointer-events: none;
  }
  .nt__auth__hdr__grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }

  .nt__auth__hdr__top {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px; position: relative; z-index: 1;
  }
  .nt__auth__hdr__logo { display: flex; align-items: center; gap: 10px; }
  .nt__auth__hdr__dot {
    width: 34px; height: 34px; border-radius: 10px;
    background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.22);
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(8px);
  }
  .nt__auth__hdr__brand { }
  .nt__auth__hdr__name {
    font-family: ${FD}; font-weight: 600; font-size: 16px;
    color: #fff; line-height: 1.1; letter-spacing: .01em;
  }
  .nt__auth__hdr__sub {
    font-family: ${F}; font-size: 9px; color: rgba(255,255,255,.45);
    letter-spacing: .16em; text-transform: uppercase; margin-top: 2px;
  }

  .nt__auth__closebtn {
    position: relative; z-index: 2;
    background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.18);
    border-radius: 10px; width: 32px; height: 32px;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background .15s, transform .15s;
    font-family: ${F};
  }
  .nt__auth__closebtn:hover { background: rgba(255,255,255,.24); transform: scale(1.08); }

  .nt__auth__hdr__content { position: relative; z-index: 1; }
  .nt__auth__hdr__pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.18);
    border-radius: 100px; padding: 4px 10px 4px 6px;
    margin-bottom: 10px;
  }
  .nt__auth__hdr__pill__dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: ${C.gll}; box-shadow: 0 0 6px ${C.gll};
  }
  .nt__auth__hdr__pill__text {
    font-family: ${F}; font-size: 10px; font-weight: 500;
    color: rgba(255,255,255,.7); letter-spacing: .06em;
  }
  .nt__auth__hdr__title {
    font-family: ${FD}; font-size: 26px; font-weight: 600;
    color: #fff; line-height: 1.25; margin-bottom: 6px;
  }
  .nt__auth__hdr__desc {
    font-family: ${F}; font-size: 13px; font-weight: 400;
    color: rgba(255,255,255,.6); line-height: 1.55;
  }

  /* ── Body ── */
  .nt__auth__body { padding: 22px 28px 28px; }

  /* Social */
  .nt__auth__social { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
  .nt__auth__social__btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 11px 14px;
    border: 1.5px solid ${C.bdr}; border-radius: 14px;
    background: ${C.bg}; cursor: pointer;
    font-family: ${F}; font-size: 13px; font-weight: 600; color: ${C.gr};
    transition: all .16s; white-space: nowrap;
  }
  .nt__auth__social__btn:hover {
    border-color: ${C.gl}; background: #fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74,150,18,.12);
  }

  /* Divider */
  .nt__auth__divider { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .nt__auth__divider__line { flex: 1; height: 1px; background: ${C.bdr}; }
  .nt__auth__divider__text {
    font-family: ${F}; font-size: 11px; font-weight: 500;
    color: ${C.grl}; white-space: nowrap; letter-spacing: .04em;
  }

  /* Benefits */
  .nt__auth__benefits {
    background: linear-gradient(135deg, #EEF8E6 0%, #F5FAF0 100%);
    border: 1.5px solid ${C.bdr}; border-radius: 16px;
    padding: 14px 16px; margin-bottom: 20px;
  }
  .nt__auth__benefits__title {
    font-family: ${F}; font-size: 10px; font-weight: 700;
    color: ${C.gm}; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .nt__auth__benefit { display: flex; align-items: center; gap: 10px; margin-bottom: 7px; }
  .nt__auth__benefit:last-child { margin-bottom: 0; }
  .nt__auth__benefit__icon {
    width: 20px; height: 20px; border-radius: 6px;
    background: linear-gradient(135deg, ${C.gm}, ${C.gl});
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(30,84,5,.25);
  }
  .nt__auth__benefit__text { font-family: ${F}; font-size: 12.5px; color: ${C.gr}; font-weight: 400; line-height: 1.4; }

  /* Fields */
  .nt__auth__field { margin-bottom: 14px; }
  .nt__auth__field__label {
    display: block; font-family: ${F}; font-size: 11px; font-weight: 600;
    color: ${C.gr}; margin-bottom: 6px; letter-spacing: .06em; text-transform: uppercase;
  }
  .nt__auth__field__wrap { position: relative; }
  .nt__auth__field__input {
    width: 100%; padding: 12px 14px;
    border: 1.5px solid ${C.bdr}; border-radius: 14px;
    font-family: ${F}; font-size: 13.5px; color: ${C.gr};
    background: ${C.bg}; outline: none;
    transition: all .17s; box-sizing: border-box;
  }
  .nt__auth__field__input::placeholder { color: #A8B8A0; }
  .nt__auth__field__input:focus {
    border-color: ${C.gl}; background: #fff;
    box-shadow: 0 0 0 4px rgba(74,150,18,.10);
  }
  .nt__auth__field__icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); pointer-events: none; }
  .nt__auth__field__input--icon { padding-left: 40px; }
  .nt__auth__field__eye {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: ${C.grl}; padding: 4px; display: flex; align-items: center;
    border-radius: 6px; transition: color .14s, background .14s;
  }
  .nt__auth__field__eye:hover { color: ${C.gm}; background: rgba(74,150,18,.08); }
  .nt__auth__field__input--eye { padding-right: 40px; }
  .nt__auth__field__row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }

  /* Forgot */
  .nt__auth__forgot { text-align: right; margin-top: -8px; margin-bottom: 18px; }
  .nt__auth__forgot a {
    font-family: ${F}; font-size: 12px; font-weight: 600;
    color: ${C.gl}; text-decoration: none; transition: color .14s;
  }
  .nt__auth__forgot a:hover { color: ${C.gm}; text-decoration: underline; }

  /* Submit */
  .nt__auth__submit {
    width: 100%; padding: 14px;
    border: none; border-radius: 14px;
    background: linear-gradient(135deg, ${C.gd} 0%, ${C.gm} 50%, ${C.gl} 100%);
    color: #fff; font-family: ${F}; font-size: 14px; font-weight: 700;
    cursor: pointer; letter-spacing: .04em;
    box-shadow: 0 6px 24px rgba(19,58,2,.36), 0 1px 3px rgba(0,0,0,.2);
    transition: all .18s; display: flex; align-items: center; justify-content: center;
    gap: 8px; margin-bottom: 18px; position: relative; overflow: hidden;
  }
  .nt__auth__submit::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,.08), transparent);
    pointer-events: none;
  }
  .nt__auth__submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(19,58,2,.44), 0 2px 8px rgba(0,0,0,.18);
  }
  .nt__auth__submit:active { transform: translateY(0); }
  .nt__auth__submit:disabled { opacity: .62; cursor: not-allowed; transform: none; }

  .nt__auth__spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,.3);
    border-top-color: #fff; border-radius: 50%;
    animation: nt__spin .7s linear infinite; flex-shrink: 0;
  }
  @keyframes nt__spin { to { transform: rotate(360deg) } }

  /* Switch */
  .nt__auth__switch {
    text-align: center; font-family: ${F}; font-size: 13px; color: ${C.grl};
  }
  .nt__auth__switch button {
    background: none; border: none; color: ${C.gl};
    font-family: ${F}; font-size: 13px; font-weight: 700;
    cursor: pointer; padding: 0; transition: color .14s;
  }
  .nt__auth__switch button:hover { color: ${C.gm}; text-decoration: underline; }

  /* Terms */
  .nt__auth__terms {
    font-family: ${F}; font-size: 11.5px; color: ${C.grl};
    text-align: center; margin-top: 14px; line-height: 1.65;
  }
  .nt__auth__terms a { color: ${C.gl}; font-weight: 600; text-decoration: none; }
  .nt__auth__terms a:hover { text-decoration: underline; }

  /* Responsive */
  @media (max-width: 480px) {
    .nt__auth__hdr { padding: 22px 20px 20px; }
    .nt__auth__hdr__title { font-size: 22px; }
    .nt__auth__body { padding: 18px 20px 24px; }
    .nt__auth__field__row { grid-template-columns: 1fr; gap: 0; }
    .nt__auth__social__btn { font-size: 12px; padding: 10px; }
  }
  @media (max-width: 360px) {
    .nt__auth__social { grid-template-columns: 1fr; }
  }
`;

interface NatureTrailsAuthModalProps {
  mode: "login" | "register";
  onClose: () => void;
  onSwitch: (mode: "login" | "register") => void;
}

export default function NatureTrailsAuthModal({ mode, onClose, onSwitch }: NatureTrailsAuthModalProps) {
  const [showPass,  setShowPass]  = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <>
      <style>{AUTH_CSS}</style>
      <div className="nt__auth__overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="nt__auth__card">

          {/* ── Header ── */}
          <div className="nt__auth__hdr">
            <div className="nt__auth__hdr__orb1" />
            <div className="nt__auth__hdr__orb2" />
            <div className="nt__auth__hdr__grid" />

            <div className="nt__auth__hdr__top">
              <div className="nt__auth__hdr__logo">
                <div className="nt__auth__hdr__dot">
                  {/* Leaf icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                  </svg>
                </div>
                <div className="nt__auth__hdr__brand">
                  <div className="nt__auth__hdr__name">Nature Trails</div>
                  <div className="nt__auth__hdr__sub">Travel & Tourism</div>
                </div>
              </div>
              <button onClick={onClose} className="nt__auth__closebtn" aria-label="Close">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="nt__auth__hdr__content">
              <div className="nt__auth__hdr__pill">
                <div className="nt__auth__hdr__pill__dot" />
                <span className="nt__auth__hdr__pill__text">
                  {mode === "login" ? "Secure Login" : "Free to Join"}
                </span>
              </div>
              <div className="nt__auth__hdr__title">
                {mode === "login" ? "Welcome back 👋" : "Join the journey 🌿"}
              </div>
              <div className="nt__auth__hdr__desc">
                {mode === "login"
                  ? "Sign in to access your bookings & exclusive deals"
                  : "Create a free account and unlock special member prices"}
              </div>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="nt__auth__body">

            {/* Social */}
            <div className="nt__auth__social">
              <button className="nt__auth__social__btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="nt__auth__social__btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="nt__auth__divider">
              <div className="nt__auth__divider__line"/>
              <span className="nt__auth__divider__text">or continue with email</span>
              <div className="nt__auth__divider__line"/>
            </div>

            {/* Benefits (register only) */}
            {mode === "register" && (
              <div className="nt__auth__benefits">
                <div className="nt__auth__benefits__title">✦ Member Benefits</div>
                {[
                  "Exclusive member-only discounts up to 30%",
                  "Easy booking management & trip history",
                  "Priority customer support & instant quotes",
                ].map(b => (
                  <div key={b} className="nt__auth__benefit">
                    <div className="nt__auth__benefit__icon">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className="nt__auth__benefit__text">{b}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Name row (register only) */}
            {mode === "register" && (
              <div className="nt__auth__field__row">
                <div className="nt__auth__field">
                  <label className="nt__auth__field__label">First Name</label>
                  <input type="text" className="nt__auth__field__input" placeholder="John" />
                </div>
                <div className="nt__auth__field">
                  <label className="nt__auth__field__label">Last Name</label>
                  <input type="text" className="nt__auth__field__input" placeholder="Doe" />
                </div>
              </div>
            )}

            {/* Phone (register only) */}
            {mode === "register" && (
              <div className="nt__auth__field">
                <label className="nt__auth__field__label">Phone Number</label>
                <div className="nt__auth__field__wrap">
                  <span className="nt__auth__field__icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.grl} strokeWidth="2" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <input type="tel" className="nt__auth__field__input nt__auth__field__input--icon" placeholder="+91 98765 43210" />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="nt__auth__field">
              <label className="nt__auth__field__label">Email Address</label>
              <div className="nt__auth__field__wrap">
                <span className="nt__auth__field__icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.grl} strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input type="email" className="nt__auth__field__input nt__auth__field__input--icon" placeholder="you@email.com" />
              </div>
            </div>

            {/* Password */}
            <div className="nt__auth__field">
              <label className="nt__auth__field__label">Password</label>
              <div className="nt__auth__field__wrap">
                <span className="nt__auth__field__icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.grl} strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  className="nt__auth__field__input nt__auth__field__input--icon nt__auth__field__input--eye"
                  placeholder="••••••••"
                />
                <button className="nt__auth__field__eye" onClick={() => setShowPass(p => !p)} aria-label="Toggle password">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    {showPass
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirm Password (register only) */}
            {mode === "register" && (
              <div className="nt__auth__field">
                <label className="nt__auth__field__label">Confirm Password</label>
                <div className="nt__auth__field__wrap">
                  <span className="nt__auth__field__icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.grl} strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    type={showPass2 ? "text" : "password"}
                    className="nt__auth__field__input nt__auth__field__input--icon nt__auth__field__input--eye"
                    placeholder="••••••••"
                  />
                  <button className="nt__auth__field__eye" onClick={() => setShowPass2(p => !p)} aria-label="Toggle confirm password">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      {showPass2
                        ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                      }
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Forgot */}
            {mode === "login" && (
              <div className="nt__auth__forgot">
                <a href="#">Forgot password?</a>
              </div>
            )}

            {/* Submit */}
            <button className="nt__auth__submit" onClick={handleSubmit} disabled={loading}>
              {loading
                ? <><div className="nt__auth__spinner"/> Please wait…</>
                : mode === "login"
                  ? <>Sign In <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                  : <>Create Account <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
              }
            </button>

            {/* Switch */}
            <div className="nt__auth__switch">
              {mode === "login"
                ? <>Don&apos;t have an account? <button onClick={() => onSwitch("register")}>Register Free</button></>
                : <>Already have an account? <button onClick={() => onSwitch("login")}>Sign In</button></>
              }
            </div>

            {/* Terms */}
            {mode === "register" && (
              <div className="nt__auth__terms">
                By registering you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}