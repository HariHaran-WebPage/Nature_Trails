"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
interface Route {
  id: string; from: string; to: string; code: string;
  duration: string; sedan: string; suv: string; tempo?: string;
  badge: string; popular?: boolean;
}
interface Vehicle { icon: string; name: string; sub: string; pax: string; bags: string; best: string; price: string; highlight?: boolean; }
interface Feature  { icon: string; title: string; desc: string; }
interface Faq      { q: string; a: string; }
interface Testimonial { name: string; route: string; avatar: string; text: string; }

type RoadItem =
  | { type: 'tree'; w: number; size: number; h: number; opacity: number; label?: never }
  | { type: 'sign'; w: number; label: string; size?: never; h?: never; opacity?: never }
  | { type: 'empty'; w: number; size?: never; h?: never; opacity?: never; label?: never };

/* ─── Data ───────────────────────────────────────────────────────────── */
const ROUTES: Route[] = [
  { id:"cbe", from:"Coimbatore City", to:"CBE Airport",       code:"CJB", duration:"25 min",  sedan:"₹499",   suv:"₹699",   badge:"Most Booked", popular:true },
  { id:"blr", from:"Coimbatore",      to:"Bangalore Airport", code:"BLR", duration:"3.5 hrs", sedan:"₹2,999", suv:"₹3,799", badge:"3.5 hrs" },
  { id:"maa", from:"Coimbatore",      to:"Chennai Airport",   code:"MAA", duration:"5.5 hrs", sedan:"₹4,299", suv:"₹5,499", badge:"5.5 hrs" },
  { id:"cok", from:"Coimbatore",      to:"Cochin Airport",    code:"COK", duration:"4 hrs",   sedan:"₹3,499", suv:"₹4,399", badge:"4 hrs" },
  { id:"ixm", from:"Coimbatore",      to:"Madurai Airport",   code:"IXM", duration:"2.5 hrs", sedan:"₹1,999", suv:"₹2,699", badge:"Group Pick" },
  { id:"trz", from:"Coimbatore",      to:"Trichy Airport",    code:"TRZ", duration:"2 hrs",   sedan:"₹1,799", suv:"₹2,499", tempo:"₹3,299", badge:"Tempo Avail" },
];

const VEHICLES: Vehicle[] = [
  { icon:"🚗", name:"Sedan",           sub:"Swift Dzire · Etios · Amaze",     pax:"1–4 passengers", bags:"2 large + 4 cabin", best:"Solo / Couple",       price:"From ₹499" },
  { icon:"🚙", name:"SUV / Innova",    sub:"Innova Crysta · Ertiga · Bolero", pax:"1–6 passengers", bags:"4 large bags",       best:"Families & Groups",   price:"From ₹699",  highlight:true },
  { icon:"🚐", name:"Tempo Traveller", sub:"Force Traveller · 9–14 Seater",   pax:"7–14 passengers",bags:"Bulk luggage OK",    best:"Large Groups / Corp", price:"From ₹1,299" },
];

const FEATURES: Feature[] = [
  { icon:"📍", title:"Live GPS Tracking",    desc:"Share a live trip link. Know exactly where your cab is at all times — no calls needed." },
  { icon:"✈️",  title:"Flight Monitoring",    desc:"We track your flight in real time. Driver adjusts automatically for early or delayed arrivals." },
  { icon:"🕐", title:"60-min Free Wait",     desc:"Post-landing wait of 60 minutes included free. Baggage queues, customs — we've got you covered." },
  { icon:"🧾", title:"Fixed Fares Always",   desc:"Midnight flight? Festival? Monsoon? The fare you see is the fare you pay. Zero surge." },
  { icon:"🛡️", title:"Verified Drivers",     desc:"Background-checked, commercially licensed, and defensive-driving trained. Every single driver." },
  { icon:"💳", title:"All Payments Accepted",desc:"UPI, card, or cash. GST invoice for corporate bookings on request." },
];

const FAQS: Faq[] = [
  { q:"How early should I book?",            a:"At least 2 hours before pickup. For pre-dawn or late-night rides, booking a day ahead ensures priority assignment and a fresh driver." },
  { q:"What if my flight is delayed?",       a:"We track your flight live. Your driver is notified automatically — no calls from you needed. 60-min free wait post-landing is included." },
  { q:"Are fares fixed or metered?",         a:"Fully fixed. Tolls, state taxes, and night surcharges are baked into the displayed price. What you see is exactly what you pay." },
  { q:"Can I book a round trip?",            a:"Yes, and round trips get a 10% discount on the return leg. Mention both legs when booking via call or WhatsApp." },
  { q:"Are child seats available?",          a:"Yes — on request, free of charge. Mention the number and ages of children when booking so we assign the right seat." },
  { q:"What payment methods are accepted?",  a:"UPI (GPay, PhonePe, Paytm), debit/credit card, and cash. Corporate GST invoices issued on request." },
];

const TESTIMONIALS: Testimonial[] = [
  { name:"Karthik Rajan",   route:"CBE City → Airport",   avatar:"👨",   text:"Driver arrived 10 minutes early for my 4 AM flight. Calm, professional, no radio. I landed completely stress-free." },
  { name:"Meena Suresh",    route:"BLR Airport → CBE",    avatar:"👩",   text:"Flight delayed by 2 hours — driver still waited, zero extra charge. That kind of reliability is genuinely rare." },
  { name:"The Nair Family", route:"CBE → Cochin Airport", avatar:"👨‍👩‍👧", text:"Tempo for 9 of us with full luggage. Spacious, clean, perfectly on time. The whole family was comfortable throughout." },
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
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref, threshold]);
  return v;
}

/* ─── Small UI Components ────────────────────────────────────────────── */
function Eyebrow({ text }: { text: string }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:14 }}>
      <div style={{ height:2, width:22, borderRadius:2, background:`linear-gradient(to right,${C.gDeep},${C.gLeaf})` }}/>
      <span style={{ width:5, height:5, borderRadius:"50%", background:C.gLeaf, display:"inline-block", animation:"pulse 2.2s infinite" }}/>
      <span style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:C.gLeaf, letterSpacing:".20em", textTransform:"uppercase" as const }}>{text}</span>
      <span style={{ width:5, height:5, borderRadius:"50%", background:C.gLeaf, display:"inline-block", animation:"pulse 2.2s .5s infinite" }}/>
      <div style={{ height:2, width:22, borderRadius:2, background:`linear-gradient(to left,${C.gDeep},${C.gLeaf})` }}/>
    </div>
  );
}

function Divider() {
  return <div style={{ height:1, background:"linear-gradient(to right,transparent,rgba(125,200,50,0.18),transparent)" }}/>;
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div style={{ display:"flex", gap:3 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= n ? C.gLeaf : "rgba(107,189,40,0.20)"} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
      <div style={{ width:16, height:16, borderRadius:"50%", border:`1.5px solid ${C.gLeaf}40`, background:`${C.gLeaf}15`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <svg width="8" height="8" fill="none" stroke={C.gLeaf} strokeWidth="3" strokeLinecap="round"><polyline points="7 1 3 6 1 4"/></svg>
      </div>
      <span style={{ fontFamily:FB, fontSize:12.5, color:"rgba(185,228,130,0.70)" }}>{text}</span>
    </div>
  );
}

/* ─── Animated Taxi Scene ────────────────────────────────────────────── */
function TaxiScene() {
  const roadItems: RoadItem[] = [
    { type:"tree",  w:120, size:14, h:42, opacity:0.50 },
    { type:"tree",  w:140, size:10, h:32, opacity:0.40 },
    { type:"empty", w:160 },
    { type:"tree",  w:120, size:18, h:55, opacity:0.45 },
    { type:"tree",  w:100, size:12, h:38, opacity:0.50 },
    { type:"empty", w:180 },
    { type:"tree",  w:120, size:14, h:42, opacity:0.50 },
    { type:"tree",  w:140, size:10, h:32, opacity:0.40 },
    { type:"empty", w:160 },
    { type:"tree",  w:120, size:18, h:55, opacity:0.45 },
    { type:"tree",  w:100, size:12, h:38, opacity:0.50 },
    { type:"empty", w:180 },
  ];

  return (
    <div style={{ position:"relative", width:"100%", height:200, overflow:"hidden", marginTop:10 }}>
      {/* Road base */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:80,
        background:"linear-gradient(180deg,#1c1c1c 0%,#111 100%)",
        borderTop:"2px solid rgba(107,189,40,0.14)" }}/>

      {/* Centre yellow dashes — slower */}
      <div style={{ position:"absolute", bottom:38, left:0, right:0, height:3.5, overflow:"hidden" }}>
        <div style={{ display:"flex", gap:0, animation:"roadDash 2.5s linear infinite", width:"200%" }}>
          {Array.from({ length:26 }).map((_, i) => (
            <div key={i} style={{ width: i%2===0 ? 70 : 50, height:3.5,
              background: i%2===0 ? "rgba(235,185,35,0.55)" : "transparent", flexShrink:0 }}/>
          ))}
        </div>
      </div>

      {/* Road edge lines */}
      <div style={{ position:"absolute", bottom:78, left:0, right:0, height:1.5, background:"rgba(255,255,255,0.10)" }}/>
      <div style={{ position:"absolute", bottom:2, left:0, right:0, height:1.5, background:"rgba(255,255,255,0.07)" }}/>

      {/* Highway distance marker signs — slower trees */}
      <div style={{ position:"absolute", bottom:78, left:0, right:0, height:100, overflow:"hidden" }}>
        <div style={{ display:"flex", gap:0, animation:"treesMove 35s linear infinite", width:"200%", height:"100%", alignItems:"flex-end" }}>
          {roadItems.map((item, i) => (
            <div key={i} style={{ width:item.w, flexShrink:0, display:"flex", justifyContent:"center", alignItems:"flex-end", paddingBottom:2 }}>
              {item.type === "tree" && (
                <div>
                  <div style={{ width:0, height:0,
                    borderLeft:`${item.size}px solid transparent`,
                    borderRight:`${item.size}px solid transparent`,
                    borderBottom:`${item.h}px solid rgba(36,110,14,${item.opacity})` }}/>
                  <div style={{ width: Math.max(5, item.size*0.35), height: item.h*0.38,
                    background:`rgba(20,65,8,${item.opacity * 0.95})`, margin:"0 auto" }}/>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── MOVING YELLOW CAR (already slowed to 12s) ── */}
      <div style={{
        position:"absolute",
        bottom:70,
        animation:"taxiDrive 12s linear infinite",
        willChange:"transform"
      }}>
        {/* Ground shadow */}
        <div style={{ position:"absolute", bottom:-12, left:35, right:30, height:18,
          background:"radial-gradient(ellipse,rgba(0,0,0,0.32) 0%,transparent 70%)",
          filter:"blur(5px)", borderRadius:"50%" }}/>
        {/* Exhaust puffs (unchanged) */}
        <div style={{ position:"absolute", left:-20, bottom:14, display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ width:12, height:12, borderRadius:"50%", background:"rgba(200,180,60,0.14)", animation:"puff 1.0s ease-out infinite" }}/>
          <div style={{ width:9, height:9, borderRadius:"50%", background:"rgba(200,180,60,0.10)", animation:"puff 1.0s .22s ease-out infinite" }}/>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"rgba(200,180,60,0.07)", animation:"puff 1.0s .44s ease-out infinite" }}/>
        </div>
        {/* Next.js Image component for optimized loading */}
        <Image
          src="/taxi.svg"
          alt="Outstation taxi"
          width={400}
          height={162}
          style={{ display:"block" }}
          priority
        />
      </div>

      {/* Destination marker */}
      <div style={{ position:"absolute", right:72, bottom:78, display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ padding:"5px 16px", borderRadius:7, background:"rgba(255,215,0,0.13)", border:"1px solid rgba(255,215,0,0.30)" }}>
          <span style={{ fontFamily:FB, fontSize:11, fontWeight:800, color:"#FFD700", letterSpacing:".10em" }}>🏔 OUTSTATION</span>
        </div>
        <div style={{ width:2, height:24, background:"rgba(255,215,0,0.28)", marginTop:2 }}/>
      </div>

      {/* Fade-out gradient */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:90,
        background:"linear-gradient(to bottom,transparent,#040E02)",
        pointerEvents:"none", zIndex:8 }}/>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════════════════════ */
export default function AirportTaxiPage() {
  const width    = useWidth();
  const isXS     = width < 480;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesk   = width >= 1024;

  const px   = isXS ? "16px" : isMobile ? "20px" : isTablet ? "32px" : "56px";
  const maxW = 1280;

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroVis = useInView(heroRef, 0.01);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const cols3 = isXS ? "1fr" : isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)";
  const cols2 = isXS ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr";

  return (
    <div style={{ fontFamily:FB, background:"#040E02", minHeight:"100vh", color:"#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        button{-webkit-tap-highlight-color:transparent;}
        button:active{transform:scale(0.97)!important;}

        @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.55)} }
        @keyframes shimmer   { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes scrollBob { 0%,100%{transform:translateY(0);opacity:1} 60%{transform:translateY(14px);opacity:0} 61%{transform:translateY(0);opacity:0} 80%{opacity:1} }
        @keyframes floatPlane{ 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-10px) rotate(-3deg)} }

        /* Car drive across */
        @keyframes taxiDrive {
          0%   { transform: translateX(-340px); }
          100% { transform: translateX(calc(100vw + 40px)); }
        }
        /* Road dashes scroll */
        @keyframes roadDash {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        /* Trees scroll */
        @keyframes treesMove {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        /* Exhaust smoke */
        @keyframes puff {
          0%   { opacity:0.75; transform:scale(1) translateX(0); }
          100% { opacity:0;    transform:scale(3) translateX(-22px); }
        }
        /* Wheel spin — driven by CSS on SVG <g> elements */
        @keyframes wheelRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
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
        .why-card  { transition: all .26s; }
        .why-card:hover { transform: translateY(-4px); border-color: rgba(107,189,40,0.38)!important; }
        .faq-row   { cursor: pointer; transition: background .18s; }
        .faq-row:hover { background: rgba(107,189,40,0.06)!important; }
        .route-card { transition: all .28s cubic-bezier(.22,1,.36,1); }
        .route-card:hover { transform: translateY(-8px)!important; border-color: rgba(107,189,40,0.40)!important; box-shadow: 0 24px 64px rgba(0,0,0,0.50)!important; }
        .cta-primary { transition: all .26s; text-decoration: none; display: inline-flex; align-items: center; gap: 9px; }
        .cta-primary:hover { transform: translateY(-3px); box-shadow: 0 18px 48px ${C.gLeaf}65!important; }
        .cta-ghost { transition: all .26s; text-decoration: none; display: inline-flex; align-items: center; gap: 9px; }
        .cta-ghost:hover { background: rgba(107,189,40,0.18)!important; transform: translateY(-3px); }
      `}</style>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position:"relative", minHeight:"100vh", overflow:"hidden", display:"flex", flexDirection:"column" }}>

        {/* BG photo */}
        <div style={{
          position:"absolute", inset:0, zIndex:0,
          backgroundImage:`url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1800&q=85&fit=crop)`,
          backgroundSize:"cover", backgroundPosition:"center 40%",
          transform: mounted ? "scale(1)" : "scale(1.07)",
          transition:"transform 2.2s cubic-bezier(.22,1,.36,1)"
        }}/>
        <div style={{ position:"absolute", inset:0, zIndex:1, background:"rgba(3,10,1,0.60)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:2, background:"linear-gradient(180deg,rgba(4,12,2,0.95) 0%,rgba(4,10,2,0.05) 42%,rgba(4,12,2,0.92) 100%)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none",
          background:`radial-gradient(ellipse 70% 50% at 50% 85%,rgba(46,128,16,0.18) 0%,transparent 65%)` }}/>

        <div style={{ position:"relative", zIndex:10, maxWidth:maxW, margin:"0 auto", width:"100%",
          padding:`0 ${px}`, flex:1, display:"flex", flexDirection:"column", justifyContent:"center",
          paddingTop:"90px", paddingBottom:"40px" }}>

          {/* Breadcrumb */}
          <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:FB, fontSize:11, fontWeight:600,
            color:"rgba(150,210,90,0.50)", letterSpacing:".04em", marginBottom:22,
            animation: heroVis ? "slideDown .55s ease both" : "none" }}>
            <span style={{ cursor:"pointer" }}>Home</span>
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3.5 1.5l4 4-4 4"/></svg>
            <span style={{ cursor:"pointer" }}>Taxi Services</span>
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3.5 1.5l4 4-4 4"/></svg>
            <span style={{ color:C.gLeaf }}>Airport Taxi</span>
          </div>

          {/* Live badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"7px 16px", borderRadius:100,
            background:"rgba(107,189,40,0.12)", border:"1.5px solid rgba(107,189,40,0.28)", backdropFilter:"blur(12px)",
            marginBottom:22, animation: heroVis ? "fadeUp .55s .05s ease both" : "none", width:"fit-content" }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:C.gLeaf, display:"inline-block",
              animation:"pulse 2s infinite", boxShadow:`0 0 8px ${C.gLeaf}` }}/>
            <span style={{ fontFamily:FB, fontSize: isXS ? 10 : 11, fontWeight:700, color:C.gLeaf,
              letterSpacing:".18em", textTransform:"uppercase" as const }}>Available 24 / 7 · All Major Airports</span>
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily:F, fontStyle:"italic", fontWeight:800,
            fontSize: isXS ? "36px" : isMobile ? "50px" : isTablet ? "66px" : "88px",
            lineHeight:.96, letterSpacing:"-.038em", color:"#fff",
            textShadow:"0 4px 40px rgba(0,0,0,0.55)",
            animation: heroVis ? "fadeUp .62s .10s ease both" : "none", margin:"0 0 6px" }}>
            <span className="shimmer-text">Airport</span>
          </h1>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontWeight:700,
            fontSize: isXS ? "18px" : isMobile ? "22px" : "30px",
            color:"rgba(200,240,150,0.68)", margin:"0 0 22px", letterSpacing:"-.02em",
            animation: heroVis ? "fadeUp .62s .14s ease both" : "none" }}>
            Pickup &amp; Drop Taxi Service
          </h2>
          <p style={{ fontFamily:FB, fontSize: isXS ? 13 : 14, fontWeight:500,
            color:"rgba(185,228,130,0.60)", maxWidth:560, lineHeight:1.84, margin:"0 0 32px",
            animation: heroVis ? "fadeUp .62s .18s ease both" : "none" }}>
            Reliable, punctual airport transfers — for every flight at any hour.
            AC sedans, SUVs &amp; tempo travellers. Fixed fares, zero surge, free 60-minute wait.
            We track your flight so you don&apos;t have to.
          </p>

          {/* Stats */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:36,
            animation: heroVis ? "fadeUp .62s .22s ease both" : "none" }}>
            {[
              { icon:"✈️", txt:"50+ Routes" },
              { icon:"⭐", txt:"4.9 Rating" },
              { icon:"🕐", txt:"60-min Free Wait" },
              { icon:"💰", txt:"From ₹499" },
            ].map(s => (
              <div key={s.txt} style={{ display:"flex", alignItems:"center", gap:7, padding:"8px 14px",
                borderRadius:100, background:"rgba(107,189,40,0.10)", border:"1.5px solid rgba(107,189,40,0.22)",
                backdropFilter:"blur(8px)" }}>
                <span style={{ fontSize:13 }}>{s.icon}</span>
                <span style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"rgba(200,240,150,0.80)" }}>{s.txt}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", animation: heroVis ? "fadeUp .62s .26s ease both" : "none" }}>
            <a href="#routes" className="cta-primary"
              style={{ fontFamily:FB, fontSize: isXS ? 13 : 14, fontWeight:700,
                padding: isXS ? "13px 22px" : "15px 30px", borderRadius:14,
                background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`,
                color:C.gDeep, letterSpacing:".04em", boxShadow:`0 10px 32px ${C.gLeaf}55` }}>
              View Routes &amp; Fares
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
            </a>
            <a href="#book" className="cta-ghost"
              style={{ fontFamily:FB, fontSize: isXS ? 13 : 14, fontWeight:700,
                padding: isXS ? "12px 20px" : "14px 26px", borderRadius:14,
                border:"2px solid rgba(107,189,40,0.35)", background:"rgba(107,189,40,0.09)",
                color:"rgba(150,217,74,0.95)", letterSpacing:".04em", backdropFilter:"blur(10px)" }}>
              Book on WhatsApp
            </a>
          </div>
        </div>

        {/* ── REALISTIC CAR SCENE ── */}
        <div style={{ position:"relative", zIndex:10, width:"100%" }}>
          <TaxiScene />
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
          zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
          <span style={{ fontFamily:FB, fontSize:10, fontWeight:600, color:"rgba(140,200,90,0.45)",
            letterSpacing:".14em", textTransform:"uppercase" as const }}>Scroll</span>
          <div style={{ width:22, height:36, borderRadius:11, border:"1.5px solid rgba(125,200,50,0.30)",
            display:"flex", justifyContent:"center", paddingTop:6 }}>
            <div style={{ width:4, height:4, borderRadius:"50%", background:C.gLeaf, animation:"scrollBob 1.8s ease-in-out infinite" }}/>
          </div>
        </div>

        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:80, zIndex:8,
          background:"linear-gradient(to bottom,transparent,#040E02)", pointerEvents:"none" }}/>
      </div>

      {/* ══════════════════════════════════════════
          FEATURE STRIP
      ══════════════════════════════════════════ */}
      <div style={{ background:"rgba(6,18,3,0.95)", borderTop:"1px solid rgba(125,200,50,0.10)",
        borderBottom:"1px solid rgba(125,200,50,0.10)" }}>
        <div style={{ maxWidth:maxW, margin:"0 auto", padding:`28px ${px}`,
          display:"flex", flexWrap:"wrap", gap:24, justifyContent:"center" }}>
          {[
            { icon:"🚗", txt:"AC Sedan / SUV / Tempo" },
            { icon:"📍", txt:"Live GPS Tracking" },
            { icon:"🧾", txt:"Transparent Billing" },
            { icon:"🕐", txt:"60-min Free Wait" },
            { icon:"📞", txt:"24/7 Support" },
            { icon:"🛡️", txt:"Verified Drivers" },
          ].map(i => (
            <div key={i.txt} style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:15 }}>{i.icon}</span>
              <span style={{ fontFamily:FB, fontSize:12, fontWeight:700, color:"rgba(190,230,140,0.65)" }}>{i.txt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ROUTES
      ══════════════════════════════════════════ */}
      <div id="routes" style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Eyebrow text="Popular Routes"/>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-end", justifyContent:"space-between", gap:20, marginBottom:42 }}>
          <div>
            <h2 style={{ fontFamily:F, fontStyle:"italic",
              fontSize: isXS ? "26px" : isMobile ? "32px" : "42px",
              fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
              Routes &amp; <span className="shimmer-text">Fixed Fares</span>
            </h2>
            <p style={{ fontFamily:FB, fontSize:13, color:"rgba(175,225,120,0.55)", lineHeight:1.70 }}>
              No surge. No meter. Pay exactly what&apos;s shown — midnight, monsoon, or festival.
            </p>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:cols3, gap:22 }}>
          {ROUTES.map((r, i) => (
            <div key={r.id} className="card-hover route-card"
              style={{ borderRadius:22, overflow:"hidden", background:"rgba(6,18,3,0.92)",
                border:`1.5px solid ${r.popular ? "rgba(107,189,40,0.38)" : "rgba(125,200,50,0.13)"}`,
                boxShadow: r.popular ? "0 8px 40px rgba(0,0,0,0.45)" : "0 6px 32px rgba(0,0,0,0.35)",
                opacity:0, animation:`fadeUp .55s ${i*0.08}s ease both` }}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}>

              <div style={{ padding:"18px 20px 14px", borderBottom:"1px solid rgba(125,200,50,0.10)" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                  <span style={{ fontSize:26 }}>✈️</span>
                  <span style={{ fontFamily:FB, fontSize:10, fontWeight:700, padding:"4px 11px",
                    borderRadius:100,
                    background: r.popular ? "rgba(107,189,40,0.16)" : "rgba(107,189,40,0.08)",
                    border:`1px solid rgba(107,189,40,${r.popular ? 0.35 : 0.20})`,
                    color: r.popular ? C.gLeaf : "rgba(165,215,100,0.65)",
                    letterSpacing:".10em", textTransform:"uppercase" as const }}>{r.badge}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <span style={{ fontFamily:FB, fontSize:12, fontWeight:700, color:"rgba(165,215,100,0.60)" }}>{r.from}</span>
                  <svg width="22" height="10" fill="none">
                    <path d="M1 5h18M14 1l4 4-4 4" stroke={C.gLeaf} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontFamily:FB, fontSize:12, fontWeight:700, color:"rgba(165,215,100,0.60)" }}>{r.to}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontFamily:F, fontStyle:"italic", fontSize: isXS ? 16 : 18, fontWeight:800, color:"#fff" }}>{r.code}</span>
                  <span style={{ fontFamily:FB, fontSize:11, color:"rgba(145,200,90,0.45)",
                    borderLeft:"1px solid rgba(125,200,50,0.18)", paddingLeft:10 }}>🕐 {r.duration}</span>
                </div>
              </div>

              <div style={{ padding:"14px 20px 8px", display:"flex", flexDirection:"column", gap:8 }}>
                {[
                  { label:"🚗 Sedan (1–4 pax)",    price:r.sedan },
                  { label:"🚙 SUV / Innova (1–6)", price:r.suv },
                  ...(r.tempo ? [{ label:"🚐 Tempo (7–14 pax)", price:r.tempo }] : []),
                ].map(f => (
                  <div key={f.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                    padding:"8px 12px", borderRadius:10, background:"rgba(107,189,40,0.07)",
                    border:"1px solid rgba(107,189,40,0.12)" }}>
                    <span style={{ fontFamily:FB, fontSize:11.5, fontWeight:600, color:"rgba(175,220,115,0.70)" }}>{f.label}</span>
                    <span style={{ fontFamily:F, fontStyle:"italic", fontSize:20, fontWeight:800, color:C.gLeaf }}>{f.price}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding:"10px 20px 18px" }}>
                <a href="#book"
                  style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"11px",
                    borderRadius:11,
                    background: hovered === r.id ? `linear-gradient(135deg,${C.gLeaf},${C.gMid})` : "rgba(107,189,40,0.10)",
                    color: hovered === r.id ? C.gDeep : C.gLeaf,
                    border: hovered === r.id ? "none" : "1.5px solid rgba(107,189,40,0.24)",
                    fontFamily:FB, fontSize:13, fontWeight:700, letterSpacing:".04em",
                    transition:"all .26s", textDecoration:"none" }}>
                  Book This Route
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                    <path d="M2 6h8M6 2l4 4-4 4"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider/>

      {/* ══════════════════════════════════════════
          FLEET
      ══════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Eyebrow text="Our Fleet"/>
        <h2 style={{ fontFamily:F, fontStyle:"italic",
          fontSize: isXS ? "26px" : isMobile ? "32px" : "42px",
          fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
          Choose Your <span className="shimmer-text">Vehicle</span>
        </h2>
        <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>
          AC, GPS-fitted, commercially licensed. Sanitised before every trip.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:cols3, gap:22 }}>
          {VEHICLES.map((v, i) => (
            <div key={v.name} className="why-card"
              style={{ borderRadius:20, padding:"24px", background:"rgba(6,18,3,0.88)",
                border: v.highlight ? "2px solid rgba(107,189,40,0.35)" : "1px solid rgba(125,200,50,0.13)",
                boxShadow:"0 4px 24px rgba(0,0,0,0.30)", position:"relative",
                opacity:0, animation:`fadeUp .55s ${i*0.10}s ease both` }}>
              {v.highlight && (
                <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)",
                  padding:"4px 14px", borderRadius:100,
                  background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`,
                  fontFamily:FB, fontSize:10, fontWeight:800, color:C.gDeep,
                  letterSpacing:".10em", textTransform:"uppercase" as const, whiteSpace:"nowrap" }}>
                  Most Booked
                </div>
              )}
              <div style={{ fontSize:40, marginBottom:14 }}>{v.icon}</div>
              <div style={{ fontFamily:F, fontStyle:"italic", fontSize: isXS ? 16 : 19,
                fontWeight:800, color:"#fff", marginBottom:4 }}>{v.name}</div>
              <div style={{ fontFamily:FB, fontSize:11, fontWeight:700, color:"rgba(165,215,100,0.50)",
                letterSpacing:".10em", textTransform:"uppercase" as const, marginBottom:16 }}>{v.sub}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:18 }}>
                <CheckItem text={v.pax}/>
                <CheckItem text={v.bags}/>
                <CheckItem text={v.best}/>
              </div>
              <div style={{ fontFamily:F, fontStyle:"italic", fontSize:22, fontWeight:800, color:C.gLeaf }}>{v.price}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider/>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Eyebrow text="Why Choose Us"/>
        <h2 style={{ fontFamily:F, fontStyle:"italic",
          fontSize: isXS ? "26px" : isMobile ? "32px" : "42px",
          fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
          Zero Stress <span className="shimmer-text">Airport Transfers</span>
        </h2>
        <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>
          We&apos;ve run 10,000+ airport drops. Here&apos;s what makes every ride different.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:cols3, gap:18 }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="why-card"
              style={{ borderRadius:20, padding:"22px 24px", background:"rgba(6,18,3,0.88)",
                border:"1px solid rgba(125,200,50,0.13)", boxShadow:"0 4px 24px rgba(0,0,0,0.28)",
                opacity:0, animation:`fadeUp .55s ${i*0.07}s ease both` }}>
              <div style={{ fontSize:28, marginBottom:14 }}>{f.icon}</div>
              <div style={{ fontFamily:F, fontStyle:"italic", fontSize: isXS ? 15 : 17,
                fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.02em" }}>{f.title}</div>
              <div style={{ fontFamily:FB, fontSize:12.5, color:"rgba(175,220,115,0.58)", lineHeight:1.76 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider/>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Eyebrow text="Traveller Reviews"/>
        <h2 style={{ fontFamily:F, fontStyle:"italic",
          fontSize: isXS ? "26px" : isMobile ? "32px" : "42px",
          fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
          They Made Their <span className="shimmer-text">Flight</span>
        </h2>
        <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>
          4.9 stars across 3,200+ reviews. Real travellers, real rides.
        </p>
        <div style={{ display:"grid", gridTemplateColumns: isDesk ? "repeat(3,1fr)" : cols2, gap:20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="card-hover"
              style={{ borderRadius:20, padding:"26px 24px", background:"rgba(6,18,3,0.90)",
                border:"1.5px solid rgba(125,200,50,0.13)", boxShadow:"0 4px 28px rgba(0,0,0,0.30)",
                opacity:0, animation:`fadeUp .55s ${i*0.09}s ease both` }}>
              <div style={{ fontFamily:F, fontSize:48, color:"rgba(107,189,40,0.18)",
                lineHeight:.8, marginBottom:12, fontStyle:"italic" }}>&ldquo;</div>
              <p style={{ fontFamily:FB, fontSize:13.5, color:"rgba(190,232,140,0.72)",
                lineHeight:1.82, marginBottom:20, fontStyle:"italic" }}>{t.text}</p>
              <div style={{ height:1, background:"rgba(125,200,50,0.10)", marginBottom:16 }}/>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%",
                    background:"rgba(107,189,40,0.14)", border:"1.5px solid rgba(107,189,40,0.28)",
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontFamily:FB, fontSize:13, fontWeight:700, color:"rgba(200,238,150,0.88)" }}>{t.name}</div>
                    <div style={{ fontFamily:FB, fontSize:11, color:"rgba(145,200,90,0.48)" }}>{t.route}</div>
                  </div>
                </div>
                <Stars n={5}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider/>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Eyebrow text="FAQ"/>
        <h2 style={{ fontFamily:F, fontStyle:"italic",
          fontSize: isXS ? "26px" : isMobile ? "32px" : "42px",
          fontWeight:800, color:"#fff", marginBottom:36, letterSpacing:"-.03em" }}>
          Airport Taxi <span className="shimmer-text">Questions</span>
        </h2>
        <div style={{ borderRadius:20, overflow:"hidden", border:"1px solid rgba(125,200,50,0.12)" }}>
          {FAQS.map((faq, i) => {
            const open = openFaq === i;
            return (
              <div key={faq.q}>
                {i > 0 && <div style={{ height:1, background:"rgba(125,200,50,0.10)" }}/>}
                <div className="faq-row" onClick={() => setOpenFaq(open ? null : i)}
                  style={{ padding: isXS ? "16px" : "20px 24px",
                    background: open ? "rgba(10,28,5,0.95)" : "rgba(6,18,3,0.88)",
                    display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16 }}>
                  <span style={{ fontFamily:F, fontStyle:"italic", fontSize: isXS ? 15 : 17,
                    fontWeight:700, color:"#fff", flex:1, lineHeight:1.4 }}>{faq.q}</span>
                  <div style={{ width:26, height:26, borderRadius:8,
                    border:`1.5px solid ${open ? C.gLeaf+"60" : "rgba(125,200,50,0.22)"}`,
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                    color: open ? C.gLeaf : "rgba(125,200,50,0.50)",
                    transition:"all .22s", transform: open ? "rotate(45deg)" : "none",
                    background: open ? "rgba(107,189,40,0.14)" : "transparent" }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="7" y1="2" x2="7" y2="12"/>
                      <line x1="2" y1="7" x2="12" y2="7"/>
                    </svg>
                  </div>
                </div>
                {open && (
                  <div style={{ padding: isXS ? "0 16px 18px" : "0 24px 20px", background:"rgba(8,22,4,0.92)" }}>
                    <p style={{ fontFamily:FB, fontSize:13.5, color:"rgba(185,228,130,0.68)", lineHeight:1.80, margin:0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Divider/>

      {/* ══════════════════════════════════════════
          BOTTOM CTA / BOOK
      ══════════════════════════════════════════ */}
      <div id="book" style={{ position:"relative", overflow:"hidden", padding:`80px ${px} 96px` }}>
        <div style={{ position:"absolute", inset:0,
          backgroundImage:`url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1800&q=85&fit=crop)`,
          backgroundSize:"cover", backgroundPosition:"center",
          filter:"brightness(0.13) saturate(1.6)", zIndex:0 }}/>
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(180deg,#040E02 0%,transparent 30%,transparent 70%,#040E02 100%)", zIndex:1 }}/>
        <div style={{ position:"absolute", inset:0,
          background:`radial-gradient(ellipse 65% 55% at 50% 50%,rgba(46,128,16,0.16) 0%,transparent 65%)`, zIndex:2 }}/>

        <div style={{ position:"relative", zIndex:10, maxWidth:680, margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
            <Eyebrow text="Book Your Airport Taxi"/>
          </div>

          <div style={{ fontSize:36, marginBottom:14, display:"inline-block", animation:"floatPlane 3s ease-in-out infinite" }}>✈️</div>

          <h2 style={{ fontFamily:F, fontStyle:"italic",
            fontSize: isXS ? "28px" : isMobile ? "36px" : "52px",
            fontWeight:800, color:"#fff", letterSpacing:"-.034em", lineHeight:1.04,
            marginBottom:16, textShadow:"0 4px 32px rgba(0,0,0,0.55)" }}>
            Never Miss a <span className="shimmer-text">Flight Again</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize: isXS ? 13 : 14.5, color:"rgba(180,225,130,0.62)", lineHeight:1.80, marginBottom:36 }}>
            Share your flight number, pickup location, and vehicle preference — we confirm in 15 minutes. No advance payment required.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:28 }}>
            <a href="tel:+919876543210" className="cta-primary"
              style={{ fontFamily:FB, fontSize: isXS ? 13 : 14, fontWeight:700,
                padding: isXS ? "13px 22px" : "16px 34px", borderRadius:14,
                background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`,
                color:C.gDeep, letterSpacing:".04em", boxShadow:`0 10px 32px ${C.gLeaf}55` }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call to Book
            </a>
            <a href="https://wa.me/919876543210?text=Hi! I need an airport taxi booking."
              target="_blank" rel="noreferrer" className="cta-ghost"
              style={{ fontFamily:FB, fontSize: isXS ? 13 : 14, fontWeight:700,
                padding: isXS ? "12px 20px" : "15px 28px", borderRadius:14,
                border:"2px solid rgba(37,211,102,0.45)", background:"rgba(37,211,102,0.10)",
                color:"rgba(37,211,102,0.95)", letterSpacing:".04em", backdropFilter:"blur(10px)" }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap: isXS ? 14 : 24 }}>
            {["✅ 15-min confirmation","🔒 No advance payment","✈️ Flight tracking","🕐 60-min free wait"].map(t => (
              <span key={t} style={{ fontFamily:FB, fontSize:12, fontWeight:600, color:"rgba(170,220,110,0.55)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}