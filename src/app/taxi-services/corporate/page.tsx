"use client";
import { useState, useEffect, useRef } from "react";

/* ─── Design Tokens ──────────────────────────────────────────────────── */
const C = {
  gDeep:  "#0F3D06",
  gDark:  "#1A5C0A",
  gMid:   "#2E8010",
  gLeaf:  "#6BBD28",
  gLight: "#96D94A",
  gPale:  "#C8F060",
};
const F  = "'Playfair Display', Georgia, serif";
const FB = "'DM Sans', 'Segoe UI', sans-serif";

/* ─── Types ──────────────────────────────────────────────────────────── */
interface Service { icon: string; title: string; desc: string; points: string[]; highlight?: boolean; }
interface Benefit  { icon: string; title: string; desc: string; }
interface Stat     { value: string; label: string; }
interface Faq      { q: string; a: string; }
interface Testimonial { name: string; role: string; avatar: string; text: string; }

type RoadItem =
  | { type: 'tree'; w: number; size: number; h: number; opacity: number; label?: never }
  | { type: 'sign'; w: number; label: string; size?: never; h?: never; opacity?: never }
  | { type: 'empty'; w: number; size?: never; h?: never; opacity?: never; label?: never };

/* ─── Data ───────────────────────────────────────────────────────────── */
const SERVICES: Service[] = [
  {
    icon: "✈️", title: "Airport Transfers",
    desc: "Flight-tracked pickups and drops for executives, clients and teams. Zero wait time guaranteed.",
    points: ["Flight tracking included", "Name board pickup", "CBI / CBE airports"],
  },
  {
    icon: "🏭", title: "Employee Commute",
    desc: "Daily roster-based cab service for IT parks, factories and offices across Coimbatore.",
    points: ["Shift-wise scheduling", "Female-safe night cabs", "Route optimisation"],
    highlight: true,
  },
  {
    icon: "🤝", title: "Client & Guest Moves",
    desc: "Chauffeur-driven executive cars for VIP clients, guest house drops and inter-city business travel.",
    points: ["Uniformed chauffeurs", "Innova Crysta fleet", "On-call & pre-scheduled"],
  },
  {
    icon: "🗺️", title: "Outstation Business Travel",
    desc: "Multi-city trips to Chennai, Bangalore, Cochin, Hyderabad and beyond — billed to your account.",
    points: ["Tolls & driver bata included", "Fixed outstation fares"],
  },
  {
    icon: "🎪", title: "Event & Conference Shuttles",
    desc: "Tempo travellers and mini-buses for corporate events, offsites, team outings and conferences.",
    points: ["9–14 seater travellers", "Single-day event billing"],
  },
  {
    icon: "📅", title: "Monthly Retainer Plans",
    desc: "Pre-paid monthly packages with dedicated vehicles — best rates for high-usage businesses.",
    points: ["Up to 18% cheaper", "Priority fleet allocation"],
  },
];

const BENEFITS: Benefit[] = [
  { icon: "🧾", title: "GST Invoice",       desc: "Monthly consolidated GST invoice with trip-level breakdowns for easy reimbursement." },
  { icon: "📊", title: "Trip Reports",      desc: "Detailed Excel reports — employee wise, vehicle wise, department wise, per your format." },
  { icon: "💳", title: "Credit Terms",      desc: "15–30 day credit terms for established accounts. NEFT / RTGS / UPI / cheque accepted." },
  { icon: "👤", title: "Account Manager",   desc: "Single point of contact for all bookings, disputes and billing queries — no call centres." },
];

const STATS: Stat[] = [
  { value: "50+",    label: "Corporate Clients" },
  { value: "12,000+",label: "Trips Completed" },
  { value: "4.9★",   label: "Average Rating" },
  { value: "24/7",   label: "Support Availability" },
];

const FAQS: Faq[] = [
  { q: "How do we set up a corporate account?",           a: "Call or WhatsApp us with your company name, GST number, estimated monthly trips and vehicle preference. We'll send a tailored agreement within 24 hours — onboarding takes less than a day." },
  { q: "Is GST invoice available for all trips?",         a: "Yes. We issue a consolidated GST invoice at the start of each month covering all trips in the previous billing cycle, with full trip-level details attached as a report." },
  { q: "Can we book on behalf of employees?",             a: "Absolutely. You can book via our WhatsApp, phone or email. Employees can also self-book using a corporate code — all trips are billed to the company account." },
  { q: "What vehicles are available for corporate use?",  a: "We offer AC sedans (Swift Dzire, Etios), SUVs (Innova Crysta, Ertiga), and Tempo Travellers (9–14 seater). Premium vehicles can be assigned to specific executives on request." },
  { q: "Do you offer female-safe cabs for night shifts?", a: "Yes. All our night shift cabs for female employees have verified female guardians on board, GPS tracking with a live share link, and a mandatory drop confirmation call to the office." },
  { q: "What is the minimum commitment?",                 a: "There is no minimum — we serve companies from 5 trips/month to 500+. Monthly retainer packages are available for high-volume clients at preferential rates." },
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Rajesh Kumar",    role: "Admin Head · KGISL Technologies",    avatar: "👨", text: "Switched to them for our daily 40-employee shuttle and billing has been completely hands-off. GST invoices arrive by the 2nd of every month without us asking." },
  { name: "Meenakshi Iyer",  role: "Operations Manager · CBE Exports",   avatar: "👩", text: "Our overseas clients are always impressed with the airport pickup. Uniformed driver with a name board — makes us look professional before they reach the office." },
  { name: "Arun Prabhu",     role: "Director · Prabhu Textile Mills",    avatar: "👨", text: "We use them for all inter-city business trips — Chennai, Bangalore, Cochin. Fixed fares, no arguments at drop-off. Exactly what corporate travel needs." },
];

/* ─── Hooks ──────────────────────────────────────────────────────────── */
function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.08) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, threshold]);
  return v;
}

function useCountUp(target: number, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(start);
    }, 16);
    return () => clearInterval(t);
  }, [trigger, target, duration]);
  return count;
}

/* ─── Small Components ───────────────────────────────────────────────── */
function Eyebrow({ text }: { text: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ height: 2, width: 22, borderRadius: 2, background: `linear-gradient(to right,${C.gDeep},${C.gLeaf})` }} />
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.gLeaf, display: "inline-block", animation: "pulse 2.2s infinite" }} />
      <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: C.gLeaf, letterSpacing: ".20em", textTransform: "uppercase" as const }}>{text}</span>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.gLeaf, display: "inline-block", animation: "pulse 2.2s .5s infinite" }} />
      <div style={{ height: 2, width: 22, borderRadius: 2, background: `linear-gradient(to left,${C.gDeep},${C.gLeaf})` }} />
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(125,200,50,0.18),transparent)" }} />;
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= n ? C.gLeaf : "rgba(107,189,40,0.20)"} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${C.gLeaf}40`, background: `${C.gLeaf}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="8" height="8" fill="none" stroke={C.gLeaf} strokeWidth="3" strokeLinecap="round"><polyline points="7 1 3 6 1 4" /></svg>
      </div>
      <span style={{ fontFamily: FB, fontSize: 12.5, color: "rgba(185,228,130,0.70)" }}>{text}</span>
    </div>
  );
}

/* ─── Stat Counter Card ──────────────────────────────────────────────── */
function StatCard({ stat, trigger }: { stat: Stat; trigger: boolean }) {
  const numMatch = stat.value.match(/[\d,]+/);
  const numVal   = numMatch ? parseInt(numMatch[0].replace(/,/g, "")) : 0;
  const suffix   = stat.value.replace(/[\d,]+/, "");
  const count    = useCountUp(numVal, 1600, trigger);

  const display = numVal > 0
    ? (numVal >= 1000 ? count.toLocaleString() : count) + suffix
    : stat.value;

  return (
    <div style={{ padding: "28px 16px", textAlign: "center" }}>
      <div style={{ fontFamily: F, fontStyle: "italic", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: C.gLeaf, lineHeight: 1 }}>{display}</div>
      <div style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: "rgba(175,225,120,0.55)", marginTop: 8, letterSpacing: ".08em", textTransform: "uppercase" as const }}>{stat.label}</div>
    </div>
  );
}

/* ─── Animated Section Wrapper ───────────────────────────────────────── */
function AnimSection({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const vis = useInView(ref, 0.08);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .60s ${delay}s ease, transform .60s ${delay}s cubic-bezier(.22,1,.36,1)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Animated Road Scene ────────────────────────────────────────────── */
function RoadScene() {
  const roadItems: RoadItem[] = [
    { type: 'tree', w: 120, size: 14, h: 42, opacity: 0.50 },
    { type: 'sign', w: 200, label: "CORPORATE HQ" },
    { type: 'tree', w: 140, size: 10, h: 32, opacity: 0.40 },
    { type: 'empty', w: 180 },
    { type: 'tree', w: 120, size: 18, h: 55, opacity: 0.45 },
    { type: 'sign', w: 220, label: "AIRPORT 12 km" },
    { type: 'tree', w: 100, size: 12, h: 38, opacity: 0.50 },
    { type: 'empty', w: 180 },
    { type: 'tree', w: 120, size: 14, h: 42, opacity: 0.50 },
    { type: 'sign', w: 200, label: "IT PARK 5 km" },
    { type: 'tree', w: 140, size: 10, h: 32, opacity: 0.40 },
    { type: 'empty', w: 160 },
    { type: 'tree', w: 120, size: 18, h: 55, opacity: 0.45 },
    { type: 'sign', w: 220, label: "AIRPORT 12 km" },
    { type: 'tree', w: 100, size: 12, h: 38, opacity: 0.50 },
    { type: 'empty', w: 180 },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: 160, overflow: "hidden", marginTop: 8 }}>
      {/* Road */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 70, background: "linear-gradient(180deg,#1c1c1c 0%,#111 100%)", borderTop: "2px solid rgba(107,189,40,0.14)" }} />
      {/* Dash lines */}
      <div style={{ position: "absolute", bottom: 33, left: 0, right: 0, height: 3.5, overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 0, animation: "roadDash 2.5s linear infinite", width: "200%" }}>
          {Array.from({ length: 26 }).map((_, i) => (
            <div key={i} style={{ width: i % 2 === 0 ? 70 : 50, height: 3.5, background: i % 2 === 0 ? "rgba(235,185,35,0.55)" : "transparent", flexShrink: 0 }} />
          ))}
        </div>
      </div>
      {/* Trees + signs */}
      <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, height: 90, overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 0, animation: "treesMove 35s linear infinite", width: "200%", height: "100%", alignItems: "flex-end" }}>
          {roadItems.map((item, i) => (
            <div key={i} style={{ width: item.w, flexShrink: 0, display: "flex", justifyContent: "center", alignItems: "flex-end", paddingBottom: 2 }}>
              {item.type === "tree" && (
                <div>
                  <div style={{ width: 0, height: 0, borderLeft: `${item.size}px solid transparent`, borderRight: `${item.size}px solid transparent`, borderBottom: `${item.h}px solid rgba(36,110,14,${item.opacity})` }} />
                  <div style={{ width: Math.max(5, item.size * 0.35), height: item.h * 0.38, background: `rgba(20,65,8,${item.opacity * 0.95})`, margin: "0 auto" }} />
                </div>
              )}
              {item.type === "sign" && (
                <div style={{ marginBottom: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ padding: "4px 10px", borderRadius: 4, background: "rgba(30,80,10,0.85)", border: "1px solid rgba(107,189,40,0.35)" }}>
                    <span style={{ fontFamily: FB, fontSize: 9, fontWeight: 700, color: C.gLeaf }}>{item.label}</span>
                  </div>
                  <div style={{ width: 1.5, height: 18, background: "rgba(107,189,40,0.30)" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Car SVG inline */}
      <div style={{ position: "absolute", bottom: 58, animation: "taxiDrive 12s linear infinite", willChange: "transform" }}>
        <div style={{ position: "absolute", bottom: -12, left: 30, right: 25, height: 16, background: "radial-gradient(ellipse,rgba(0,0,0,0.32) 0%,transparent 70%)", filter: "blur(4px)", borderRadius: "50%" }} />
        <svg width="280" height="112" viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFE045"/><stop offset="25%" stopColor="#F5C800"/><stop offset="65%" stopColor="#D4A800"/><stop offset="100%" stopColor="#A07800"/></linearGradient>
            <linearGradient id="cr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a3a3a"/><stop offset="55%" stopColor="#1a1a1a"/><stop offset="100%" stopColor="#0e0e0e"/></linearGradient>
            <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#b8e8ff" stopOpacity="0.55"/><stop offset="40%" stopColor="#d8f4ff" stopOpacity="0.32"/><stop offset="100%" stopColor="#88ccee" stopOpacity="0.18"/></linearGradient>
            <linearGradient id="cwr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="white" stopOpacity="0.35"/><stop offset="45%" stopColor="white" stopOpacity="0.08"/><stop offset="100%" stopColor="white" stopOpacity="0"/></linearGradient>
            <radialGradient id="ct" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#404040"/><stop offset="55%" stopColor="#222"/><stop offset="100%" stopColor="#111"/></radialGradient>
            <radialGradient id="ch" cx="38%" cy="32%" r="62%"><stop offset="0%" stopColor="#e8e8d8"/><stop offset="45%" stopColor="#b8b890"/><stop offset="100%" stopColor="#888860"/></radialGradient>
            <linearGradient id="cc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f8f8e8"/><stop offset="40%" stopColor="#d0d0a8"/><stop offset="100%" stopColor="#909060"/></linearGradient>
            <radialGradient id="chl" cx="58%" cy="38%" r="68%"><stop offset="0%" stopColor="#fffde0"/><stop offset="48%" stopColor="#ffe898" stopOpacity="0.90"/><stop offset="100%" stopColor="#e8c840" stopOpacity="0.55"/></radialGradient>
            <radialGradient id="ctl" cx="38%" cy="38%" r="68%"><stop offset="0%" stopColor="#ff6060"/><stop offset="55%" stopColor="#cc2020" stopOpacity="0.90"/><stop offset="100%" stopColor="#880000" stopOpacity="0.65"/></radialGradient>
            <linearGradient id="cu" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a1200"/><stop offset="100%" stopColor="#0a0800"/></linearGradient>
            <linearGradient id="cbp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c09400"/><stop offset="100%" stopColor="#806000"/></linearGradient>
            <linearGradient id="cts" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#FFD700"/><stop offset="50%" stopColor="#FFE94A"/><stop offset="100%" stopColor="#FFD700"/></linearGradient>
            <linearGradient id="cbl" x1="0" y1="0.5" x2="1" y2="0.5"><stop offset="0%" stopColor="#ffe898" stopOpacity="0.14"/><stop offset="100%" stopColor="#ffe898" stopOpacity="0"/></linearGradient>
            <radialGradient id="cgs" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(0,0,0,0.32)"/><stop offset="100%" stopColor="rgba(0,0,0,0)"/></radialGradient>
            <linearGradient id="csg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.92"/><stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.88"/></linearGradient>
          </defs>
          <path d="M290 55 L320 44 L320 68 Z" fill="url(#cbl)"/>
          <ellipse cx="160" cy="127" rx="140" ry="7" fill="url(#cgs)"/>
          <path d="M48 90 Q48 100 56 100 L268 100 Q276 100 276 90 L276 84 L48 84 Z" fill="url(#cu)"/>
          <rect x="52" y="82" width="218" height="10" rx="2.5" fill="#806000"/>
          <rect x="54" y="82" width="214" height="2" rx="1" fill="url(#cc)" opacity="0.80"/>
          <path d="M46 82 L46 50 Q46 44 52 44 L70 44 L70 36 Q70 34 72 34 L95 34 L106 18 Q109 12 116 12 L214 12 Q221 12 224 18 L235 34 L252 34 Q254 34 254 36 L254 44 L272 44 Q278 44 278 50 L278 82 Z" fill="url(#cb)"/>
          <rect x="52" y="68" width="220" height="13" fill="url(#csg)"/>
          {[0,2,4,6,8,10,12,14,16,18,20].map(i=><rect key={i} x={52+i*10} y="68" width="10" height="6" fill="rgba(255,215,0,0.65)"/>)}
          <path d="M108 34 L106 18 Q109 12 116 12 L214 12 Q221 12 224 18 L222 34 Z" fill="url(#cr)"/>
          <path d="M106 34 L112 18 L115 18 L108 34 Z" fill="rgba(20,14,0,0.92)"/>
          <path d="M216 34 L221 18 L218 18 L213 34 Z" fill="rgba(20,14,0,0.92)"/>
          <rect x="164" y="12" width="6" height="22" fill="rgba(10,8,0,0.94)"/>
          <path d="M108 34 L116 18 L162 18 L162 34 Z" fill="url(#cg)" stroke="rgba(160,120,0,0.40)" strokeWidth="1"/>
          <path d="M110 32 L117 18 L133 18 L122 32 Z" fill="url(#cwr)"/>
          <path d="M170 34 L170 18 L216 18 L214 34 Z" fill="url(#cg)" stroke="rgba(160,120,0,0.40)" strokeWidth="1"/>
          <path d="M110 34 Q112 44 115 44 L160 44 L160 34 Z" fill="url(#cg)" stroke="rgba(160,120,0,0.32)" strokeWidth="0.9"/>
          <path d="M172 34 L172 44 L214 44 Q216 44 218 34 Z" fill="url(#cg)" stroke="rgba(160,120,0,0.32)" strokeWidth="0.9"/>
          <rect x="143" y="60" width="18" height="4.5" rx="2.25" fill="#e0c060" opacity="0.88"/>
          <rect x="195" y="60" width="18" height="4.5" rx="2.25" fill="#e0c060" opacity="0.88"/>
          <line x1="165" y1="44" x2="169" y2="82" stroke="rgba(0,0,0,0.55)" strokeWidth="1.4"/>
          <path d="M270 74 Q282 74 288 80 Q292 84 292 90 L292 96 L270 96 Z" fill="url(#cbp)"/>
          <path d="M54 74 Q42 74 36 80 Q32 84 32 90 L32 96 L54 96 Z" fill="url(#cbp)"/>
          <ellipse cx="44" cy="96" rx="5.5" ry="3.2" fill="#1a1a1a" stroke="rgba(160,160,160,0.50)" strokeWidth="1"/>
          <path d="M274 48 Q290 48 296 54 Q300 58 300 64 L300 72 Q300 74 298 75 L274 75 Z" fill="#201400"/>
          <ellipse cx="285" cy="56" rx="7" ry="7" fill="url(#chl)" stroke="rgba(220,200,80,0.40)" strokeWidth="1"/>
          <ellipse cx="285" cy="56" rx="5" ry="5" fill="#fffde0" opacity="0.95"/>
          <ellipse cx="285" cy="56" rx="2.5" ry="2.5" fill="white"/>
          <path d="M50 48 Q34 48 28 54 Q24 58 24 64 L24 74 Q24 75 26 75 L50 75 Z" fill="#201400"/>
          <path d="M50 50 Q36 50 30 54 Q27 57 27 62 L27 72 L50 72 Z" fill="url(#ctl)" opacity="0.92"/>
          <path d="M272 43 L284 40 L287 46 L272 49 Z" fill="#c09400"/>
          <circle cx="206" cy="1" r="1.5" fill="#FFD700"/>
          <line x1="206" y1="12" x2="206" y2="1" stroke="#2a2a2a" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M232 82 Q232 106 244 106 Q268 106 274 92 Q276 86 274 82 Z" fill="#806000"/>
          <path d="M52 82 Q50 82 50 88 Q54 108 78 108 Q92 108 92 82 Z" fill="#806000"/>
          <g style={{ transformOrigin: "254px 106px", animation: "wheelRotate 0.55s linear infinite" }}>
            <circle cx="254" cy="106" r="26" fill="url(#ct)"/>
            <circle cx="254" cy="106" r="17" fill="url(#ch)"/>
            <g stroke="#b0a060" strokeWidth="4.5" strokeLinecap="round">
              <line x1="254" y1="106" x2="254" y2="89.5"/>
              <line x1="254" y1="106" x2="269.6" y2="97.5"/>
              <line x1="254" y1="106" x2="263.7" y2="116.8"/>
              <line x1="254" y1="106" x2="244.3" y2="116.8"/>
              <line x1="254" y1="106" x2="238.4" y2="97.5"/>
            </g>
            <circle cx="254" cy="106" r="7" fill="#d8c870"/>
            <circle cx="254" cy="106" r="2.5" fill="#FFD700"/>
          </g>
          <g style={{ transformOrigin: "72px 106px", animation: "wheelRotate 0.55s linear infinite" }}>
            <circle cx="72" cy="106" r="26" fill="url(#ct)"/>
            <circle cx="72" cy="106" r="17" fill="url(#ch)"/>
            <g stroke="#b0a060" strokeWidth="4.5" strokeLinecap="round">
              <line x1="72" y1="106" x2="72" y2="89.5"/>
              <line x1="72" y1="106" x2="87.6" y2="97.5"/>
              <line x1="72" y1="106" x2="81.7" y2="116.8"/>
              <line x1="72" y1="106" x2="62.3" y2="116.8"/>
              <line x1="72" y1="106" x2="56.4" y2="97.5"/>
            </g>
            <circle cx="72" cy="106" r="7" fill="#d8c870"/>
            <circle cx="72" cy="106" r="2.5" fill="#FFD700"/>
          </g>
          <rect x="130" y="4" width="60" height="14" rx="4.5" fill="#1a1200" stroke="rgba(255,215,0,0.55)" strokeWidth="1.2"/>
          <rect x="131" y="5" width="58" height="12" rx="3.2" fill="url(#cts)" opacity="0.96"/>
          <text x="160" y="13.5" textAnchor="middle" fontFamily="DM Sans, Arial, sans-serif" fontSize="7.5" fontWeight="800" fill="#1a1200" letterSpacing="1.8">TAXI</text>
        </svg>
      </div>
      {/* Destination marker */}
      <div style={{ position: "absolute", right: 60, bottom: 70, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ padding: "5px 14px", borderRadius: 7, background: "rgba(107,189,40,0.13)", border: "1px solid rgba(107,189,40,0.30)" }}>
          <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 800, color: C.gLeaf, letterSpacing: ".10em" }}>🏢 CORPORATE</span>
        </div>
        <div style={{ width: 2, height: 22, background: "rgba(107,189,40,0.28)", marginTop: 2 }} />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 70, background: "linear-gradient(to bottom,transparent,#040E02)", pointerEvents: "none", zIndex: 8 }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════════════════════ */
export default function CorporateTaxiPage() {
  const width    = useWidth();
  const isXS     = width < 480;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesk   = width >= 1024;

  const px   = isXS ? "16px" : isMobile ? "20px" : isTablet ? "32px" : "56px";
  const maxW = 1280;

  const [openFaq,  setOpenFaq]  = useState<number | null>(null);
  const [hovered,  setHovered]  = useState<string | null>(null);
  const [mounted,  setMounted]  = useState(false);

  const heroRef  = useRef<HTMLDivElement>(null);
  const heroVis  = useInView(heroRef, 0.01);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsVis = useInView(statsRef, 0.20);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const cols3 = isXS ? "1fr" : isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)";
  const cols4 = isXS ? "1fr" : isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "repeat(4,1fr)";

  return (
    <div style={{ fontFamily: FB, background: "#040E02", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        button{-webkit-tap-highlight-color:transparent;}
        button:active{transform:scale(0.97)!important;}

        @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.55)} }
        @keyframes shimmer   { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes scrollBob { 0%,100%{transform:translateY(0);opacity:1} 60%{transform:translateY(14px);opacity:0} 61%{transform:translateY(0);opacity:0} 80%{opacity:1} }
        @keyframes floatCar  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes rotateSlow{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 20px rgba(107,189,40,0.20)} 50%{box-shadow:0 0 40px rgba(107,189,40,0.45)} }

        @keyframes taxiDrive {
          0%   { transform: translateX(-340px); }
          100% { transform: translateX(calc(100vw + 40px)); }
        }
        @keyframes roadDash {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes treesMove {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes wheelRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes borderGlow {
          0%,100% { border-color: rgba(107,189,40,0.25); }
          50%     { border-color: rgba(107,189,40,0.60); }
        }
        @keyframes slideRight {
          from { transform: translateX(-100%); opacity:0; }
          to   { transform: translateX(0); opacity:1; }
        }
        @keyframes countBounce {
          0%  { transform: scale(1); }
          40% { transform: scale(1.14); }
          70% { transform: scale(0.96); }
          100%{ transform: scale(1); }
        }

        .shimmer-text {
          background: linear-gradient(125deg,${C.gLeaf} 0%,${C.gPale} 38%,${C.gLight} 65%,${C.gMid} 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .card-hover { transition: all .32s cubic-bezier(.22,1,.36,1); }
        .card-hover:hover { transform: translateY(-8px)!important; box-shadow: 0 28px 70px rgba(0,0,0,0.55)!important; }
        .service-card { transition: all .28s cubic-bezier(.22,1,.36,1); }
        .service-card:hover { transform: translateY(-8px)!important; border-color: rgba(107,189,40,0.40)!important; box-shadow: 0 24px 64px rgba(0,0,0,0.50)!important; }
        .benefit-card { transition: all .26s; }
        .benefit-card:hover { transform: translateY(-4px); border-color: rgba(107,189,40,0.38)!important; }
        .faq-row   { cursor: pointer; transition: background .18s; }
        .faq-row:hover { background: rgba(107,189,40,0.06)!important; }
        .cta-primary { transition: all .26s; text-decoration: none; display: inline-flex; align-items: center; gap: 9px; }
        .cta-primary:hover { transform: translateY(-3px); box-shadow: 0 18px 48px ${C.gLeaf}65!important; }
        .cta-ghost { transition: all .26s; text-decoration: none; display: inline-flex; align-items: center; gap: 9px; }
        .cta-ghost:hover { background: rgba(107,189,40,0.18)!important; transform: translateY(-3px); }
        .strip-item { transition: all .22s; }
        .strip-item:hover { transform: translateY(-2px); }
        .stat-card-anim { animation: countBounce .55s ease both; }
        .badge-glow { animation: glowPulse 3s ease-in-out infinite; }
        .hero-img-zoom {
          transform: ${mounted ? "scale(1)" : "scale(1.07)"};
          transition: transform 2.2s cubic-bezier(.22,1,.36,1);
        }
      `}</style>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>

        {/* BG */}
        <div className="hero-img-zoom" style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85&fit=crop)`,
          backgroundSize: "cover", backgroundPosition: "center 40%",
        }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(3,10,1,0.65)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(180deg,rgba(4,12,2,0.96) 0%,rgba(4,10,2,0.05) 42%,rgba(4,12,2,0.95) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", background: `radial-gradient(ellipse 70% 50% at 50% 85%,rgba(46,128,16,0.18) 0%,transparent 65%)` }} />

        {/* Animated green orbs */}
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 300, height: 300, borderRadius: "50%", background: "rgba(107,189,40,0.04)", filter: "blur(60px)", zIndex: 3, animation: "rotateSlow 20s linear infinite" }} />
        <div style={{ position: "absolute", top: "40%", right: "5%", width: 220, height: 220, borderRadius: "50%", background: "rgba(107,189,40,0.05)", filter: "blur(50px)", zIndex: 3, animation: "rotateSlow 15s linear infinite reverse" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: maxW, margin: "0 auto", width: "100%", padding: `0 ${px}`, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "90px", paddingBottom: "40px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: FB, fontSize: 11, fontWeight: 600, color: "rgba(150,210,90,0.50)", letterSpacing: ".04em", marginBottom: 22, animation: heroVis ? "slideDown .55s ease both" : "none" }}>
            <span style={{ cursor: "pointer" }}>Home</span>
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3.5 1.5l4 4-4 4" /></svg>
            <span style={{ cursor: "pointer" }}>Taxi Services</span>
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3.5 1.5l4 4-4 4" /></svg>
            <span style={{ color: C.gLeaf }}>Corporate Taxi</span>
          </div>

          {/* Live badge */}
          <div className="badge-glow" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 100, background: "rgba(107,189,40,0.12)", border: "1.5px solid rgba(107,189,40,0.28)", backdropFilter: "blur(12px)", marginBottom: 22, animation: heroVis ? "fadeUp .55s .05s ease both" : "none", width: "fit-content" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.gLeaf, display: "inline-block", animation: "pulse 2s infinite", boxShadow: `0 0 8px ${C.gLeaf}` }} />
            <span style={{ fontFamily: FB, fontSize: isXS ? 10 : 11, fontWeight: 700, color: C.gLeaf, letterSpacing: ".18em", textTransform: "uppercase" as const }}>Corporate Accounts · GST Invoice · 24/7</span>
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily: F, fontStyle: "italic", fontWeight: 800, fontSize: isXS ? "36px" : isMobile ? "50px" : isTablet ? "66px" : "88px", lineHeight: .96, letterSpacing: "-.038em", color: "#fff", textShadow: "0 4px 40px rgba(0,0,0,0.55)", animation: heroVis ? "fadeUp .62s .10s ease both" : "none", margin: "0 0 6px" }}>
            <span className="shimmer-text">Corporate</span>
          </h1>
          <h2 style={{ fontFamily: F, fontStyle: "italic", fontWeight: 700, fontSize: isXS ? "18px" : isMobile ? "22px" : "30px", color: "rgba(200,240,150,0.68)", margin: "0 0 22px", letterSpacing: "-.02em", animation: heroVis ? "fadeUp .62s .14s ease both" : "none" }}>
            Taxi Service from Coimbatore
          </h2>
          <p style={{ fontFamily: FB, fontSize: isXS ? 13 : 14, fontWeight: 500, color: "rgba(185,228,130,0.60)", maxWidth: 560, lineHeight: 1.84, margin: "0 0 32px", animation: heroVis ? "fadeUp .62s .18s ease both" : "none" }}>
            Dedicated cab solutions for businesses — airport transfers, employee commute, client pickups &amp; multi-city executive travel. Fixed monthly billing, GST invoices &amp; dedicated account manager.
          </p>

          {/* Stats pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36, animation: heroVis ? "fadeUp .62s .22s ease both" : "none" }}>
            {[
              { icon: "🏢", txt: "50+ Corporate Clients" },
              { icon: "⭐", txt: "4.9 Rating" },
              { icon: "🧾", txt: "GST Invoice" },
              { icon: "📊", txt: "Monthly Reports" },
            ].map(s => (
              <div key={s.txt} className="strip-item" style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 100, background: "rgba(107,189,40,0.10)", border: "1.5px solid rgba(107,189,40,0.22)", backdropFilter: "blur(8px)" }}>
                <span style={{ fontSize: 13 }}>{s.icon}</span>
                <span style={{ fontFamily: FB, fontSize: 11.5, fontWeight: 700, color: "rgba(200,240,150,0.80)" }}>{s.txt}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: heroVis ? "fadeUp .62s .26s ease both" : "none" }}>
            <a href="#services" className="cta-primary"
              style={{ fontFamily: FB, fontSize: isXS ? 13 : 14, fontWeight: 700, padding: isXS ? "13px 22px" : "15px 30px", borderRadius: 14, background: `linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color: C.gDeep, letterSpacing: ".04em", boxShadow: `0 10px 32px ${C.gLeaf}55` }}>
              View Corporate Plans
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5" /></svg>
            </a>
            <a href="#contact" className="cta-ghost"
              style={{ fontFamily: FB, fontSize: isXS ? 13 : 14, fontWeight: 700, padding: isXS ? "12px 20px" : "14px 26px", borderRadius: 14, border: "2px solid rgba(107,189,40,0.35)", background: "rgba(107,189,40,0.09)", color: "rgba(150,217,74,0.95)", letterSpacing: ".04em", backdropFilter: "blur(10px)" }}>
              Get a Quote
            </a>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
          <RoadScene />
        </div>


        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 600, color: "rgba(140,200,90,0.45)", letterSpacing: ".14em", textTransform: "uppercase" as const }}>Scroll</span>
          <div style={{ width: 22, height: 36, borderRadius: 11, border: "1.5px solid rgba(125,200,50,0.30)", display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.gLeaf, animation: "scrollBob 1.8s ease-in-out infinite" }} />
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, zIndex: 8, background: "linear-gradient(to bottom,transparent,#040E02)", pointerEvents: "none" }} />
      </div>

  
      <div style={{ background: "rgba(6,18,3,0.95)", borderTop: "1px solid rgba(125,200,50,0.10)", borderBottom: "1px solid rgba(125,200,50,0.10)" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: `28px ${px}`, display: "flex", flexWrap: "wrap", gap: 22, justifyContent: "center" }}>
          {[
            { icon: "🚗", txt: "Sedan · SUV · Tempo" },
            { icon: "🧾", txt: "GST Invoicing" },
            { icon: "📍", txt: "Live GPS Tracking" },
            { icon: "👤", txt: "Dedicated Account Manager" },
            { icon: "📞", txt: "24/7 Priority Support" },
            { icon: "📊", txt: "Monthly Trip Reports" },
          ].map((item, i) => (
            <div key={item.txt} className="strip-item" style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0, animation: `fadeIn .5s ${i * 0.08}s ease both` }}>
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              <span style={{ fontFamily: FB, fontSize: 12, fontWeight: 700, color: "rgba(190,230,140,0.65)" }}>{item.txt}</span>
            </div>
          ))}
        </div>
      </div>

      <div id="services" style={{ padding: `72px ${px}`, maxWidth: maxW, margin: "0 auto" }}>
        <AnimSection>
          <Eyebrow text="Corporate Services" />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 42 }}>
            <div>
              <h2 style={{ fontFamily: F, fontStyle: "italic", fontSize: isXS ? "26px" : isMobile ? "32px" : "42px", fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-.03em" }}>
                Services &amp; <span className="shimmer-text">Solutions</span>
              </h2>
              <p style={{ fontFamily: FB, fontSize: 13, color: "rgba(175,225,120,0.55)", lineHeight: 1.70 }}>
                Flexible cab solutions built around your business schedule and workforce needs.
              </p>
            </div>
          </div>
        </AnimSection>

        <div style={{ display: "grid", gridTemplateColumns: cols3, gap: 22 }}>
          {SERVICES.map((s, i) => (
            <AnimSection key={s.title} delay={i * 0.07}>
              <div className="service-card"
                style={{ borderRadius: 22, overflow: "hidden", background: "rgba(6,18,3,0.92)", border: `1.5px solid ${s.highlight ? "rgba(107,189,40,0.38)" : "rgba(125,200,50,0.13)"}`, boxShadow: s.highlight ? "0 8px 40px rgba(0,0,0,0.45)" : "0 6px 32px rgba(0,0,0,0.35)", position: "relative", height: "100%" }}
                onMouseEnter={() => setHovered(s.title)}
                onMouseLeave={() => setHovered(null)}>

                {s.highlight && (
                  <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", padding: "4px 14px", borderRadius: 100, background: `linear-gradient(135deg,${C.gLeaf},${C.gMid})`, fontFamily: FB, fontSize: 10, fontWeight: 800, color: C.gDeep, letterSpacing: ".10em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>
                    Most Availed
                  </div>
                )}

                <div style={{ padding: "22px 22px 16px", borderBottom: "1px solid rgba(125,200,50,0.10)" }}>
                  <div style={{ fontSize: 32, marginBottom: 14, transition: "transform .3s", transform: hovered === s.title ? "scale(1.15) rotate(-5deg)" : "scale(1) rotate(0deg)" }}>{s.icon}</div>
                  <div style={{ fontFamily: F, fontStyle: "italic", fontSize: isXS ? 16 : 19, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-.02em" }}>{s.title}</div>
                  <p style={{ fontFamily: FB, fontSize: 12.5, color: "rgba(175,220,115,0.55)", lineHeight: 1.72, margin: 0 }}>{s.desc}</p>
                </div>

                <div style={{ padding: "14px 22px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {s.points.map(p => <CheckItem key={p} text={p} />)}
                </div>

                <div style={{ padding: "0 22px 18px" }}>
                  <a href="#contact"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px", borderRadius: 11, background: hovered === s.title ? `linear-gradient(135deg,${C.gLeaf},${C.gMid})` : "rgba(107,189,40,0.10)", color: hovered === s.title ? C.gDeep : C.gLeaf, border: hovered === s.title ? "none" : "1.5px solid rgba(107,189,40,0.24)", fontFamily: FB, fontSize: 13, fontWeight: 700, letterSpacing: ".04em", transition: "all .26s", textDecoration: "none" }}>
                    Learn More
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M2 6h8M6 2l4 4-4 4" /></svg>
                  </a>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>

      <Divider />


      <div style={{ padding: `72px ${px}`, maxWidth: maxW, margin: "0 auto" }}>
        <AnimSection>
          <Eyebrow text="Billing & Accounts" />
          <h2 style={{ fontFamily: F, fontStyle: "italic", fontSize: isXS ? "26px" : isMobile ? "32px" : "42px", fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-.03em" }}>
            Hassle-Free <span className="shimmer-text">Corporate Billing</span>
          </h2>
          <p style={{ fontFamily: FB, fontSize: 14, color: "rgba(175,225,120,0.58)", maxWidth: 500, lineHeight: 1.80, marginBottom: 44 }}>
            Everything your accounts team needs — zero manual follow-up.
          </p>
        </AnimSection>

        <div style={{ display: "grid", gridTemplateColumns: cols4, gap: 18 }}>
          {BENEFITS.map((b, i) => (
            <AnimSection key={b.title} delay={i * 0.08}>
              <div className="benefit-card"
                style={{ borderRadius: 18, padding: "22px 20px", background: "rgba(6,18,3,0.90)", border: "1px solid rgba(125,200,50,0.14)", height: "100%" }}>
                <div style={{ fontSize: 28, marginBottom: 12, animation: "floatCar 3s ease-in-out infinite", animationDelay: `${i * 0.4}s` }}>{b.icon}</div>
                <div style={{ fontFamily: F, fontStyle: "italic", fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{b.title}</div>
                <p style={{ fontFamily: FB, fontSize: 12, color: "rgba(175,220,115,0.56)", lineHeight: 1.70, margin: 0 }}>{b.desc}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>

      <Divider />

      <div ref={statsRef} style={{ padding: `64px ${px}`, maxWidth: maxW, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: cols4, gap: 0, borderRadius: 22, overflow: "hidden", border: "1px solid rgba(125,200,50,0.14)", background: "rgba(6,18,3,0.80)" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ borderRight: i < STATS.length - 1 ? "1px solid rgba(125,200,50,0.10)" : "none" }}>
              {statsVis && <StatCard stat={s} trigger={statsVis} />}
              {!statsVis && (
                <div style={{ padding: "28px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: F, fontStyle: "italic", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: C.gLeaf, lineHeight: 1 }}>—</div>
                  <div style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: "rgba(175,225,120,0.55)", marginTop: 8, letterSpacing: ".08em", textTransform: "uppercase" as const }}>{s.label}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />


      <div style={{ padding: `72px ${px}`, maxWidth: maxW, margin: "0 auto" }}>
        <AnimSection>
          <Eyebrow text="Client Reviews" />
          <h2 style={{ fontFamily: F, fontStyle: "italic", fontSize: isXS ? "26px" : isMobile ? "32px" : "42px", fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-.03em" }}>
            What Businesses <span className="shimmer-text">Say About Us</span>
          </h2>
          <p style={{ fontFamily: FB, fontSize: 14, color: "rgba(175,225,120,0.58)", maxWidth: 500, lineHeight: 1.80, marginBottom: 44 }}>
            4.9 stars across 2,800+ reviews. Real companies. Real feedback.
          </p>
        </AnimSection>
        <div style={{ display: "grid", gridTemplateColumns: isDesk ? "repeat(3,1fr)" : isTablet ? "1fr 1fr" : "1fr", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <AnimSection key={t.name} delay={i * 0.09}>
              <div className="card-hover"
                style={{ borderRadius: 20, padding: "26px 24px", background: "rgba(6,18,3,0.90)", border: "1.5px solid rgba(125,200,50,0.13)", boxShadow: "0 4px 28px rgba(0,0,0,0.30)", height: "100%" }}>
                <div style={{ fontFamily: F, fontSize: 48, color: "rgba(107,189,40,0.18)", lineHeight: .8, marginBottom: 12, fontStyle: "italic" }}>&ldquo;</div>
                <p style={{ fontFamily: FB, fontSize: 13.5, color: "rgba(190,232,140,0.72)", lineHeight: 1.82, marginBottom: 20, fontStyle: "italic" }}>{t.text}</p>
                <div style={{ height: 1, background: "rgba(125,200,50,0.10)", marginBottom: 16 }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(107,189,40,0.14)", border: "1.5px solid rgba(107,189,40,0.28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontFamily: FB, fontSize: 13, fontWeight: 700, color: "rgba(200,238,150,0.88)" }}>{t.name}</div>
                      <div style={{ fontFamily: FB, fontSize: 11, color: "rgba(145,200,90,0.48)" }}>{t.role}</div>
                    </div>
                  </div>
                  <Stars n={5} />
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>

      <Divider />


      <div style={{ padding: `72px ${px}`, maxWidth: maxW, margin: "0 auto" }}>
        <AnimSection>
          <Eyebrow text="FAQ" />
          <h2 style={{ fontFamily: F, fontStyle: "italic", fontSize: isXS ? "26px" : isMobile ? "32px" : "42px", fontWeight: 800, color: "#fff", marginBottom: 36, letterSpacing: "-.03em" }}>
            Corporate Taxi <span className="shimmer-text">Questions</span>
          </h2>
        </AnimSection>
        <AnimSection delay={0.1}>
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(125,200,50,0.12)" }}>
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q}>
                  {i > 0 && <div style={{ height: 1, background: "rgba(125,200,50,0.10)" }} />}
                  <div className="faq-row" onClick={() => setOpenFaq(open ? null : i)}
                    style={{ padding: isXS ? "16px" : "20px 24px", background: open ? "rgba(10,28,5,0.95)" : "rgba(6,18,3,0.88)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                    <span style={{ fontFamily: F, fontStyle: "italic", fontSize: isXS ? 15 : 17, fontWeight: 700, color: "#fff", flex: 1, lineHeight: 1.4 }}>{faq.q}</span>
                    <div style={{ width: 26, height: 26, borderRadius: 8, border: `1.5px solid ${open ? C.gLeaf + "60" : "rgba(125,200,50,0.22)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: open ? C.gLeaf : "rgba(125,200,50,0.50)", transition: "all .22s", transform: open ? "rotate(45deg)" : "none", background: open ? "rgba(107,189,40,0.14)" : "transparent" }}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="7" y1="2" x2="7" y2="12" />
                        <line x1="2" y1="7" x2="12" y2="7" />
                      </svg>
                    </div>
                  </div>
                  {open && (
                    <div style={{ padding: isXS ? "0 16px 18px" : "0 24px 20px", background: "rgba(8,22,4,0.92)" }}>
                      <p style={{ fontFamily: FB, fontSize: 13.5, color: "rgba(185,228,130,0.68)", lineHeight: 1.80, margin: 0 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </AnimSection>
      </div>

      <Divider />

      <div id="contact" style={{ position: "relative", overflow: "hidden", padding: `80px ${px} 96px` }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85&fit=crop)`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.13) saturate(1.6)", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#040E02 0%,transparent 30%,transparent 70%,#040E02 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 65% 55% at 50% 50%,rgba(46,128,16,0.16) 0%,transparent 65%)`, zIndex: 2 }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <AnimSection>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <Eyebrow text="Open a Corporate Account" />
            </div>

            <div style={{ fontSize: 36, marginBottom: 14, display: "inline-block", animation: "floatCar 3s ease-in-out infinite" }}>🏢</div>

            <h2 style={{ fontFamily: F, fontStyle: "italic", fontSize: isXS ? "28px" : isMobile ? "36px" : "52px", fontWeight: 800, color: "#fff", letterSpacing: "-.034em", lineHeight: 1.04, marginBottom: 16, textShadow: "0 4px 32px rgba(0,0,0,0.55)" }}>
              Ready to <span className="shimmer-text">Partner With Us?</span>
            </h2>
            <p style={{ fontFamily: FB, fontSize: isXS ? 13 : 14.5, color: "rgba(180,225,130,0.62)", lineHeight: 1.80, marginBottom: 36 }}>
              Share your company name, monthly trip estimate and preferred vehicle type — we&apos;ll send a customised quote within 2 hours.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
              <a href="tel:+919876543210" className="cta-primary"
                style={{ fontFamily: FB, fontSize: isXS ? 13 : 14, fontWeight: 700, padding: isXS ? "13px 22px" : "16px 34px", borderRadius: 14, background: `linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color: C.gDeep, letterSpacing: ".04em", boxShadow: `0 10px 32px ${C.gLeaf}55` }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call for Corporate Plans
              </a>
              <a href="https://wa.me/919876543210?text=Hi! I am interested in a corporate taxi account." target="_blank" rel="noreferrer" className="cta-ghost"
                style={{ fontFamily: FB, fontSize: isXS ? 13 : 14, fontWeight: 700, padding: isXS ? "12px 20px" : "15px 28px", borderRadius: 14, border: "2px solid rgba(37,211,102,0.45)", background: "rgba(37,211,102,0.10)", color: "rgba(37,211,102,0.95)", letterSpacing: ".04em", backdropFilter: "blur(10px)" }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z" />
                </svg>
                WhatsApp for Quote
              </a>
            </div>

            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: isXS ? 14 : 24 }}>
              {["✅ No advance payment", "🧾 GST invoicing", "📊 Monthly reports", "👤 Dedicated manager"].map(t => (
                <span key={t} style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: "rgba(170,220,110,0.55)" }}>{t}</span>
              ))}
            </div>
          </AnimSection>
        </div>
      </div>
    </div>
  );
}