"use client";
import { useState, useEffect, useRef, ReactNode } from "react";

/* ─── Design Tokens ──────────────────────────────────────────────────── */
const C = {
  gDeep: "#0F3D06", gDark: "#1A5C0A", gMid: "#2E8010",
  gLeaf: "#6BBD28", gLight: "#96D94A",
  rose: "#F43F6E", roseDim: "rgba(244,63,110,0.18)",
  gold: "#F0C040", goldDim: "rgba(240,192,64,0.18)",
};
const F  = "'Playfair Display', Georgia, serif";
const FB = "'DM Sans', 'Segoe UI', sans-serif";

const HERO_IMG = "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1800&q=85&fit=crop";

/* ─── Data ──────────────────────────────────────────────────────────── */
const STATS = [
  { icon:"💑", val:"800+",   label:"Couples Served"   },
  { icon:"⭐", val:"4.9",    label:"Avg Rating"        },
  { icon:"💰", val:"₹7,999", label:"Starting Price"    },
  { icon:"🥂", val:"100%",   label:"Personalised"      },
];

const PACKAGES = [
  {
    id: "munnar-honeymoon",
    badge: "Most Romantic",
    badgeBg: C.roseDim,
    badgeTxt: "#f9a8c0",
    name: "Munnar Mist & Magic",
    tagline: "Misty Tea Estates · Luxury Cottages · Serenity",
    duration: "3 Nights / 4 Days",
    destinations: ["Munnar"],
    price: "₹10,999",
    unit: "per couple",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&q=85&fit=crop",
    vibe: "Nature & Seclusion",
    vibeIcon: "🌿",
    highlights: ["Private cottage with valley view 🏡", "Sunrise tea garden walk 🌅", "Couple spa & massage 💆", "Candlelight dinner in estate 🕯️", "Top Station sunset 🌄"],
    included: [
      "3 nights luxury estate cottage",
      "All meals — breakfast, lunch & dinner",
      "Private AC vehicle throughout",
      "Couple spa session (60 min)",
      "Candlelight dinner setup",
      "Flower-decorated room on arrival",
      "Personalised itinerary",
    ],
    rating: "4.9", reviews: "1,240",
    tag: "Hill Station",
  },
  {
    id: "kerala-backwaters",
    badge: "Editor's Pick",
    badgeBg: C.goldDim,
    badgeTxt: C.gold,
    name: "Kerala Backwater Romance",
    tagline: "Alleppey Houseboat · Sunset Cruises · Bliss",
    duration: "5 Nights / 6 Days",
    destinations: ["Munnar", "Alleppey", "Kovalam"],
    price: "₹18,999",
    unit: "per couple",
    img: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=900&q=85&fit=crop",
    vibe: "Luxury & Water",
    vibeIcon: "🛥️",
    highlights: ["Private houseboat overnight 🛥️", "Kovalam beach sunset 🌊", "Ayurvedic couple massage 🌺", "Candlelit backwater cruise 🌙", "Seafood dinner on beach 🦐"],
    included: [
      "5 nights — hill resort + houseboat + beach resort",
      "All meals included",
      "Private Innova Crysta",
      "Ayurvedic spa session",
      "Private sunset boat cruise",
      "Rose petals & welcome gifts",
      "Photography session (1 hr)",
    ],
    rating: "5.0", reviews: "980",
    tag: "Backwaters & Beach",
  },
  {
    id: "coorg-honeymoon",
    badge: "Hidden Gem",
    badgeBg: "rgba(167,139,250,0.18)",
    badgeTxt: "#c4b5fd",
    name: "Coorg Coffee & Cascade",
    tagline: "Coffee Estates · Waterfalls · Privacy",
    duration: "3 Nights / 4 Days",
    destinations: ["Coorg"],
    price: "₹9,499",
    unit: "per couple",
    img: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=900&q=85&fit=crop",
    vibe: "Rustic & Romantic",
    vibeIcon: "☕",
    highlights: ["Private coffee estate villa 🏡", "Abbey Falls picnic 🌊", "Morning coffee plantation walk ☕", "Couple bonfire night 🔥", "Rainforest trek 🌲"],
    included: [
      "3 nights private estate villa",
      "Breakfast & dinner",
      "All transfers",
      "Coffee tasting experience",
      "Private waterfall picnic setup",
      "Bonfire & stargazing night",
    ],
    rating: "4.8", reviews: "760",
    tag: "Hill Station",
  },
  {
    id: "goa-honeymoon",
    badge: "Beach Escape",
    badgeBg: "rgba(34,211,238,0.16)",
    badgeTxt: "#67e8f9",
    name: "Goa Sunset Honeymoon",
    tagline: "Private Beach · Luxury Resort · Nightlife",
    duration: "4 Nights / 5 Days",
    destinations: ["North Goa", "South Goa"],
    price: "₹13,499",
    unit: "per couple",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=85&fit=crop",
    vibe: "Beach & Nightlife",
    vibeIcon: "🏖️",
    highlights: ["Private beach resort stay 🏨", "Sunset catamaran cruise ⛵", "Couples water sports 🤿", "Casino night 🎰", "Portuguese old town walk 🏛️"],
    included: [
      "4 nights beachside resort — sea-view room",
      "Breakfast included",
      "Airport/station transfers",
      "Sunset cruise tickets",
      "Water sports package",
      "Candlelight beach dinner",
    ],
    rating: "4.8", reviews: "1,540",
    tag: "Beach Holiday",
  },
  {
    id: "rajasthan-honeymoon",
    badge: "Royal Romance",
    badgeBg: "rgba(245,158,11,0.18)",
    badgeTxt: "#F59E0B",
    name: "Rajasthan Royal Honeymoon",
    tagline: "Palace Hotels · Desert Nights · Royalty",
    duration: "6 Nights / 7 Days",
    destinations: ["Jaipur", "Jodhpur", "Udaipur"],
    price: "₹22,999",
    unit: "per couple",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=85&fit=crop",
    vibe: "Heritage & Luxury",
    vibeIcon: "🏰",
    highlights: ["Heritage palace hotel stays 🏰", "Lake Pichola boat dinner ⛵", "Desert camel safari & bonfire 🐪", "Mehrangarh Fort sunset walk 🌅", "Traditional couple photoshoot 📸"],
    included: [
      "6 nights heritage/palace hotels",
      "All meals throughout",
      "Luxury private coach",
      "Desert safari + bonfire night",
      "Boat dinner on Lake Pichola",
      "Couple photoshoot (2 hrs)",
      "Personalised honeymoon moments",
    ],
    rating: "4.9", reviews: "890",
    tag: "Heritage & Culture",
  },
  {
    id: "andaman-honeymoon",
    badge: "Island Dream",
    badgeBg: "rgba(16,185,129,0.16)",
    badgeTxt: "#6ee7b7",
    name: "Andaman Island Romance",
    tagline: "Crystal Waters · Private Beaches · Snorkelling",
    duration: "5 Nights / 6 Days",
    destinations: ["Port Blair", "Havelock", "Neil Island"],
    price: "₹24,999",
    unit: "per couple",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85&fit=crop",
    vibe: "Tropical & Exotic",
    vibeIcon: "🏝️",
    highlights: ["Radhanagar Beach — Asia's best 🏖️", "Private snorkelling at Neil Island 🐠", "Glass-bottom boat ride 🚤", "Elephanta Beach water sports 🤿", "Sunset at Cellular Jail 🌅"],
    included: [
      "5 nights beach/sea-view resorts",
      "Daily breakfast & dinner",
      "Ferry tickets — all islands",
      "Snorkelling experience",
      "Glass-bottom boat ride",
      "Candlelight beach dinner",
      "Flower decoration & welcome kit",
    ],
    rating: "5.0", reviews: "640",
    tag: "Island & Beach",
  },
];

const TAGS = ["All", "Hill Station", "Backwaters & Beach", "Beach Holiday", "Heritage & Culture", "Island & Beach"];

const PROMISES = [
  { icon:"🌹", title:"Romance Guarantee",       desc:"Every stay is pre-decorated with flowers, petals, and soft lighting. We confirm every detail before you arrive — no surprises except the good kind." },
  { icon:"🔒", title:"Privacy First",           desc:"Secluded resorts, private cottages, quiet timings. We choose accommodations where couples actually get space to themselves." },
  { icon:"📸", title:"Complimentary Moments",   desc:"A curated list of the best photography spots at every destination, shared in advance. Some packages include a 1–2 hour photo session." },
  { icon:"🍽️", title:"Candlelight Dinners",     desc:"Every honeymoon package includes at least one special candlelight dinner setup — beach, rooftop, estate, or by a waterfall." },
  { icon:"💆", title:"Couple Spa Sessions",     desc:"Stress-free starts. At least one couple spa or Ayurvedic session is included in or available for every package at a preferential rate." },
  { icon:"🎁", title:"Surprise Touches",        desc:"From welcome mocktails to anniversary notes, we add little unexpected moments throughout the trip — because the details are what you remember." },
];

const TESTIMONIALS = [
  { name:"Karthik & Divya",  city:"Coimbatore", rating:5, trip:"Munnar Mist & Magic",       avatar:"💑", text:"We&apos;d never felt so cut off from the world — in the best way. The cottage had mist rolling in at 6am, breakfast on a private deck, and absolute silence. Our Munnar trip was everything." },
  { name:"Arjun & Preethi",  city:"Chennai",    rating:5, trip:"Kerala Backwater Romance",  avatar:"🥂", text:"The houseboat night was otherworldly. Woke up to a still backwater at sunrise, no WiFi, just us. The team had organised everything flawlessly — we didn&apos;t have to think about a single thing." },
  { name:"Vikram & Nandita", city:"Bangalore",  rating:5, trip:"Andaman Island Romance",    avatar:"🌺", text:"Andaman exceeded every expectation. Radhanagar Beach at sunset, snorkelling in crystal water, and a private candlelit dinner on the sand. Worth every rupee and more." },
];

const FAQS = [
  { q:"Can we customise the honeymoon package completely?",          a:"Absolutely. Every package is a starting point. You can change hotels, add days, include a couple spa, or add a photography session. Share your wish list and we&apos;ll price it out for free." },
  { q:"Do you handle room decoration on arrival?",                    a:"Yes — rose petals, candles, and a welcome note are standard for all honeymoon packages. Some packages include a full decoration upgrade; others offer it as an affordable add-on." },
  { q:"Is it safe to travel for a honeymoon in monsoon season?",     a:"It depends on the destination. Kerala&apos;s backwaters are beautiful even in monsoon. Hill stations get lush but roads can be tricky. We advise on the best timing and help you plan around it." },
  { q:"Do you offer international honeymoon packages?",              a:"Currently our core packages cover South India and top domestic destinations. We&apos;re launching Bali, Maldives, and Sri Lanka packages soon — sign up for early access." },
  { q:"Can we book if we have a specific wedding anniversary date?",  a:"Yes — just mention the date and we&apos;ll arrange a special cake, decoration, or dinner moment on that day at no extra cost. It&apos;s the kind of detail we love to get right." },
  { q:"What is the cancellation policy?",                            a:"Free rescheduling up to 14 days before travel. Cancellations within 14 days attract a partial fee depending on hotel policies. We&apos;ll always work with you to find the best solution." },
];

/* ─── Types ─────────────────────────────────────────────────────────── */
interface SectionProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

interface EyebrowProps {
  text: string;
}

interface StarsProps {
  rating: number | string;
}

/* ─── Hooks ─────────────────────────────────────────────────────────── */
function useW() {
  const [w, setW] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function useInView(ref: React.RefObject<HTMLElement | null>, threshold: number = 0.08) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref, threshold]);
  return v;
}

function Section({ children, style = {} }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref);
  return (
    <div ref={ref} style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(36px)", transition:"all .60s cubic-bezier(.22,1,.36,1)", ...style }}>
      {children}
    </div>
  );
}

function Eyebrow({ text }: EyebrowProps) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:14 }}>
      <div style={{ height:2, width:22, borderRadius:2, background:`linear-gradient(to right,${C.gDeep},${C.gLeaf})` }}/>
      <span style={{ width:5, height:5, borderRadius:"50%", background:C.gLeaf, display:"inline-block", animation:"pulse 2.2s infinite" }}/>
      <span style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:C.gLeaf, letterSpacing:".20em", textTransform:"uppercase" }}>{text}</span>
      <span style={{ width:5, height:5, borderRadius:"50%", background:C.gLeaf, display:"inline-block", animation:"pulse 2.2s .5s infinite" }}/>
      <div style={{ height:2, width:22, borderRadius:2, background:`linear-gradient(to left,${C.gDeep},${C.gLeaf})` }}/>
    </div>
  );
}

function Divider() {
  return <div style={{ height:1, background:"linear-gradient(to right,transparent,rgba(125,200,50,0.18),transparent)" }}/>;
}

function Stars({ rating }: StarsProps) {
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:3 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i<=Math.round(numericRating)?C.gLeaf:"rgba(107,189,40,0.22)"} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

/* ─── Breadcrumb Component ── */
function Breadcrumb() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:FB, fontSize:11, fontWeight:600, color:"rgba(150,210,90,0.55)", letterSpacing:".04em" }}>
      <span style={{ cursor:"pointer" }}>Home</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      <span style={{ cursor:"pointer" }}>Tour Packages</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      <span style={{ color:C.gLeaf }}>Honeymoon Packages</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function HoneymoonPackagesPage() {
  const width    = useW();
  const isXS     = width < 480;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesk   = width >= 1024;

  const px   = isXS?"16px":isMobile?"20px":isTablet?"32px":"56px";
  const maxW = 1280;

  const [activeTag, setActiveTag] = useState<string>("All");
  const [openFaq,   setOpenFaq]   = useState<number | null>(null);
  const [mounted,   setMounted]   = useState(false);
  const [hovered,   setHovered]   = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroVis = useInView(heroRef, 0.01);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const filtered = activeTag === "All" ? PACKAGES : PACKAGES.filter(p => p.tag === activeTag);

  return (
    <div style={{ fontFamily:FB, background:"#040E02", minHeight:"100vh", color:"#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:#040E02; }
        button { -webkit-tap-highlight-color:transparent; cursor:pointer; }
        button:active { transform:scale(0.97)!important; }

        @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.55)} }
        @keyframes shimmer   { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes scrollBob { 0%,100%{transform:translateY(0);opacity:1} 60%{transform:translateY(14px);opacity:0} 61%{transform:translateY(0);opacity:0} 80%{opacity:1} }
        @keyframes roseFloat { 0%,100%{transform:translateY(0) rotate(-5deg);opacity:0.5} 50%{transform:translateY(-18px) rotate(5deg);opacity:0.9} }
        @keyframes heartBeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.20)} 28%{transform:scale(1)} 42%{transform:scale(1.12)} 70%{transform:scale(1)} }

        .pkg-card  { transition:all .32s cubic-bezier(.22,1,.36,1); }
        .pkg-card:hover  { transform:translateY(-10px)!important; box-shadow:0 28px 80px rgba(0,0,0,0.58)!important; }
        .pkg-card:hover .pkg-img { transform:scale(1.07)!important; }
        .pkg-img   { transition:transform .50s cubic-bezier(.22,1,.36,1); }
        .promise-card { transition:all .26s; }
        .promise-card:hover { transform:translateY(-4px); border-color:rgba(107,189,40,0.40)!important; background:rgba(12,32,6,0.98)!important; }
        .filter-btn { transition:all .22s; cursor:pointer; }
        .filter-btn:hover { background:rgba(107,189,40,0.12)!important; }
        .faq-row   { transition:all .22s; cursor:pointer; }
        .faq-row:hover   { background:rgba(107,189,40,0.06)!important; }
        .cta-btn   { transition:all .26s; }
        .cta-btn:hover   { transform:translateY(-3px); }
        .testi-card { transition:all .26s; }
        .testi-card:hover { transform:translateY(-4px); border-color:rgba(107,189,40,0.35)!important; }
      `}</style>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position:"relative", minHeight:isXS?"88vh":"100vh", overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {/* BG image */}
        <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:`url(${HERO_IMG})`, backgroundSize:"cover", backgroundPosition:"center 35%", transform:mounted?"scale(1)":"scale(1.07)", transition:"transform 2.2s cubic-bezier(.22,1,.36,1)" }}/>
        {/* Dark veil */}
        <div style={{ position:"absolute", inset:0, zIndex:1, background:"rgba(3,10,1,0.52)" }}/>
        {/* Gradient */}
        <div style={{ position:"absolute", inset:0, zIndex:2, background:"linear-gradient(180deg,rgba(4,12,2,0.92) 0%,rgba(4,10,2,0.05) 42%,rgba(4,12,2,0.88) 100%)" }}/>
        {/* Green radial glow */}
        <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none", background:`radial-gradient(ellipse 72% 55% at 50% 88%, rgba(46,128,16,0.20) 0%,transparent 65%)` }}/>
        {/* Rose glow accent */}
        <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none", background:`radial-gradient(ellipse 55% 40% at 80% 20%, rgba(244,63,110,0.07) 0%,transparent 65%)` }}/>
        {/* Noise */}
        <div style={{ position:"absolute", inset:0, zIndex:4, pointerEvents:"none", opacity:.025, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"200px" }}/>

        {/* Floating rose petals (decorative) */}
        {[
          { top:"18%", left:"8%",  size:14, delay:"0s",   dur:"5.5s" },
          { top:"32%", left:"92%", size:10, delay:"1.2s",  dur:"6.2s" },
          { top:"62%", left:"5%",  size:12, delay:"2.4s",  dur:"4.8s" },
          { top:"75%", left:"90%", size:9,  delay:"0.7s",  dur:"7.0s" },
        ].map((p, i) => (
          <div key={i} style={{ position:"absolute", top:p.top, left:p.left, zIndex:5, pointerEvents:"none", fontSize:p.size, animation:`roseFloat ${p.dur} ${p.delay} ease-in-out infinite` }}>🌸</div>
        ))}

        <div style={{ position:"relative", zIndex:10, maxWidth:maxW, margin:"0 auto", width:"100%", padding:`0 ${px}`, flex:1, display:"flex", flexDirection:"column", justifyContent:"center", paddingTop:isMobile?"90px":"80px", paddingBottom:isMobile?"64px":"80px" }}>

          <div style={{ marginBottom:20, animation:heroVis?"slideDown .55s ease both":"none" }}>
            <Breadcrumb/>
          </div>

          {/* Pill */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:20, animation:heroVis?"fadeUp .55s .05s ease both":"none" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 16px", borderRadius:100, background:"rgba(107,189,40,0.11)", border:"1.5px solid rgba(107,189,40,0.28)", backdropFilter:"blur(12px)" }}>
              <span style={{ fontSize:13, animation:"heartBeat 2.4s infinite" }}>💑</span>
              <span style={{ fontFamily:FB, fontSize:isXS?10:11, fontWeight:700, color:C.gLeaf, letterSpacing:".18em", textTransform:"uppercase" }}>Crafted for Couples · 6 Destinations</span>
            </div>
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily:F, fontStyle:"italic", fontWeight:800, fontSize:isXS?"34px":isMobile?"48px":isTablet?"64px":"82px", lineHeight:.97, letterSpacing:"-.038em", color:"#fff", margin:"0 0 8px", textShadow:"0 4px 40px rgba(0,0,0,0.55)", animation:heroVis?"fadeUp .62s .10s ease both":"none" }}>
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 38%,${C.gLight} 65%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Honeymoon</span>
          </h1>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontWeight:700, fontSize:isXS?"17px":isMobile?"21px":"28px", color:"rgba(200,240,150,0.68)", margin:"0 0 20px", letterSpacing:"-.02em", animation:heroVis?"fadeUp .62s .14s ease both":"none" }}>
            Tour Packages
          </h2>

          <p style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:500, color:"rgba(185,228,130,0.60)", maxWidth:570, lineHeight:1.84, margin:"0 0 36px", animation:heroVis?"fadeUp .62s .18s ease both":"none" }}>
            Your first chapter together deserves more than a booking — it deserves a story. From Munnar&apos;s misty tea estates and Kerala&apos;s glittering backwaters to Rajasthan&apos;s palace hotels and Andaman&apos;s crystal shores, we craft honeymoons that feel tailor-made because they are.
          </p>

          {/* Stats bar */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:36, animation:heroVis?"fadeUp .62s .22s ease both":"none" }}>
            {STATS.map(s => (
              <div key={s.label} style={{ display:"flex", alignItems:"center", gap:7, padding:"8px 14px", borderRadius:100, background:"rgba(107,189,40,0.10)", border:"1.5px solid rgba(107,189,40,0.22)", backdropFilter:"blur(8px)" }}>
                <span style={{ fontSize:13 }}>{s.icon}</span>
                <span style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"rgba(200,240,150,0.80)", letterSpacing:".04em" }}>{s.val} {s.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", animation:heroVis?"fadeUp .62s .26s ease both":"none" }}>
            <a href="#packages" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"13px 22px":"15px 30px", borderRadius:14, border:"none", background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color:C.gDeep, cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, boxShadow:`0 10px 32px ${C.gLeaf}55`, transition:"all .26s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 18px 48px ${C.gLeaf}65`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 10px 32px ${C.gLeaf}55`;}}
            >
              Explore Packages
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#enquiry" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"12px 20px":"14px 26px", borderRadius:14, border:"2px solid rgba(107,189,40,0.35)", background:"rgba(107,189,40,0.09)", color:"rgba(150,217,74,0.95)", cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, backdropFilter:"blur(10px)", transition:"all .26s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(107,189,40,0.18)";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(107,189,40,0.09)";e.currentTarget.style.transform="none";}}
            >
              Plan My Honeymoon
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
          <span style={{ fontFamily:FB, fontSize:10, fontWeight:600, color:"rgba(140,200,90,0.45)", letterSpacing:".14em", textTransform:"uppercase" }}>Scroll</span>
          <div style={{ width:22, height:36, borderRadius:11, border:"1.5px solid rgba(125,200,50,0.30)", display:"flex", justifyContent:"center", paddingTop:6 }}>
            <div style={{ width:4, height:4, borderRadius:"50%", background:C.gLeaf, animation:"scrollBob 1.8s ease-in-out infinite" }}/>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:130, zIndex:8, background:"linear-gradient(to bottom,transparent,#040E02)", pointerEvents:"none" }}/>
      </div>

      {/* ══ 2. ROMANCE STRIP ══════════════════════════════════════════════ */}
      <div style={{ background:"rgba(6,18,3,0.95)", borderTop:"1px solid rgba(125,200,50,0.10)", borderBottom:"1px solid rgba(125,200,50,0.10)" }}>
        <div style={{ maxWidth:maxW, margin:"0 auto", padding:`32px ${px}` }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:isXS?16:28, justifyContent:"center" }}>
            {[
              { icon:"🌹", label:"Room Decoration"       },
              { icon:"🕯️", label:"Candlelight Dinner"     },
              { icon:"💆", label:"Couple Spa"             },
              { icon:"📸", label:"Photography Spots"      },
              { icon:"🥂", label:"Welcome Mocktails"      },
              { icon:"🛥️", label:"Private Experiences"    },
            ].map(i => (
              <div key={i.label} style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:16 }}>{i.icon}</span>
                <span style={{ fontFamily:FB, fontSize:12, fontWeight:700, color:"rgba(190,230,140,0.65)", letterSpacing:".04em" }}>{i.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 3. PACKAGES GRID ══════════════════════════════════════════════ */}
      <div id="packages" style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Honeymoon Packages"/>
          <div style={{ display:"flex", flexDirection:isMobile?"column":"row", alignItems:isMobile?"flex-start":"flex-end", justifyContent:"space-between", gap:20, marginBottom:40 }}>
            <div>
              <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
                Your Perfect{" "}
                <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Honeymoon Awaits</span>
              </h2>
              <p style={{ fontFamily:FB, fontSize:13, color:"rgba(175,225,120,0.55)", lineHeight:1.70 }}>
                {filtered.length} package{filtered.length!==1?"s":""} · All prices per couple · Fully customisable
              </p>
            </div>
            {/* Filter pills */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {TAGS.map(t => (
                <button key={t} className="filter-btn" onClick={() => setActiveTag(t)}
                  style={{ padding:"8px 16px", borderRadius:100, border:`1.5px solid ${activeTag===t?C.gLeaf+"70":"rgba(125,200,50,0.18)"}`, background:activeTag===t?"rgba(107,189,40,0.16)":"rgba(6,18,3,0.70)", fontFamily:FB, fontSize:12, fontWeight:700, color:activeTag===t?C.gLeaf:"rgba(165,215,100,0.55)", letterSpacing:".05em" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:24 }}>
            {filtered.map((pkg, i) => (
              <div key={pkg.id} className="pkg-card"
                style={{ borderRadius:22, overflow:"hidden", background:"rgba(6,18,3,0.92)", border:"1.5px solid rgba(125,200,50,0.13)", boxShadow:"0 6px 32px rgba(0,0,0,0.35)", opacity:0, animation:`fadeUp .55s ${i*0.08}s ease both`, position:"relative" }}
                onMouseEnter={() => setHovered(pkg.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Image */}
                <div style={{ height:isXS?200:230, overflow:"hidden", position:"relative" }}>
                  <div className="pkg-img" style={{ width:"100%", height:"100%", backgroundImage:`url(${pkg.img})`, backgroundSize:"cover", backgroundPosition:"center" }}/>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(4,12,2,0.84) 0%,transparent 52%)" }}/>
                  {/* Badge */}
                  <div style={{ position:"absolute", top:14, left:14, padding:"5px 12px", borderRadius:100, background:pkg.badgeBg, border:`1px solid ${pkg.badgeTxt}40`, backdropFilter:"blur(8px)" }}>
                    <span style={{ fontFamily:FB, fontSize:10, fontWeight:800, color:pkg.badgeTxt, letterSpacing:".10em", textTransform:"uppercase" }}>{pkg.badge}</span>
                  </div>
                  {/* Vibe tag */}
                  <div style={{ position:"absolute", top:14, right:14, padding:"5px 12px", borderRadius:100, background:"rgba(4,12,2,0.75)", border:"1px solid rgba(125,200,50,0.20)", backdropFilter:"blur(8px)" }}>
                    <span style={{ fontFamily:FB, fontSize:11, fontWeight:700, color:"rgba(165,215,100,0.75)" }}>{pkg.vibeIcon} {pkg.vibe}</span>
                  </div>
                  {/* Bottom overlay */}
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 18px" }}>
                    <div style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:"rgba(165,215,100,0.60)", letterSpacing:".12em", textTransform:"uppercase", marginBottom:3 }}>{pkg.tagline}</div>
                    <div style={{ fontFamily:F, fontStyle:"italic", fontSize:22, fontWeight:800, color:"#fff", letterSpacing:"-.02em", textShadow:"0 2px 12px rgba(0,0,0,0.6)" }}>{pkg.name}</div>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding:"18px 20px 22px" }}>
                  {/* Duration + destinations */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:8 }}>
                    <div style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"rgba(165,215,100,0.60)", letterSpacing:".08em", textTransform:"uppercase" }}>{pkg.duration}</div>
                  </div>

                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                    {pkg.destinations.map(d => (
                      <span key={d} style={{ fontFamily:FB, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:100, background:"rgba(107,189,40,0.10)", border:"1px solid rgba(107,189,40,0.22)", color:"rgba(165,215,100,0.70)" }}>📍 {d}</span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:14 }}>
                    {pkg.highlights.slice(0,4).map(h => (
                      <div key={h} style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:5, height:5, borderRadius:"50%", background:`${C.gLeaf}70`, flexShrink:0 }}/>
                        <span style={{ fontFamily:FB, fontSize:12, fontWeight:500, color:"rgba(185,228,130,0.65)" }}>{h}</span>
                      </div>
                    ))}
                    {pkg.highlights.length>4 && <span style={{ fontFamily:FB, fontSize:11, color:"rgba(140,190,80,0.45)", paddingLeft:13 }}>+{pkg.highlights.length-4} more</span>}
                  </div>

                  <div style={{ height:1, background:"rgba(125,200,50,0.10)", marginBottom:14 }}/>

                  {/* Inclusions (top 3) */}
                  <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
                    {pkg.included.slice(0,3).map(inc => (
                      <div key={inc} style={{ display:"flex", alignItems:"center", gap:9 }}>
                        <div style={{ width:16, height:16, borderRadius:"50%", background:`${C.gLeaf}18`, border:`1.5px solid ${C.gLeaf}35`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={C.gLeaf} strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span style={{ fontFamily:FB, fontSize:12, fontWeight:500, color:"rgba(185,228,130,0.68)" }}>{inc}</span>
                      </div>
                    ))}
                    <div style={{ fontFamily:FB, fontSize:11, fontWeight:600, color:"rgba(140,190,80,0.48)", paddingLeft:25 }}>+ {pkg.included.length-3} more inclusions</div>
                  </div>

                  {/* Rating + Price */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <Stars rating={pkg.rating}/>
                      <span style={{ fontFamily:FB, fontSize:12, fontWeight:700, color:C.gLeaf }}>{pkg.rating}</span>
                      <span style={{ fontFamily:FB, fontSize:11, color:"rgba(155,210,90,0.40)" }}>({pkg.reviews})</span>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontFamily:FB, fontSize:9.5, fontWeight:600, color:"rgba(155,210,90,0.45)", letterSpacing:".08em", textTransform:"uppercase" }}>Starting</div>
                      <div style={{ fontFamily:F, fontStyle:"italic", fontSize:22, fontWeight:800, color:C.gLeaf, letterSpacing:"-.02em" }}>{pkg.price}</div>
                      <div style={{ fontFamily:FB, fontSize:9.5, color:"rgba(140,190,80,0.45)" }}>{pkg.unit}</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <a href="#enquiry" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px", borderRadius:12, background:hovered===pkg.id?`linear-gradient(135deg,${C.gLeaf},${C.gMid})`:"rgba(107,189,40,0.10)", color:hovered===pkg.id?C.gDeep:C.gLeaf, border:hovered===pkg.id?"none":"1.5px solid rgba(107,189,40,0.24)", fontFamily:FB, fontSize:13, fontWeight:700, letterSpacing:".04em", transition:"all .26s", textDecoration:"none" }}>
                    Book This Package
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 4. OUR ROMANCE PROMISES ══════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Our Promises"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            Every Detail{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Taken Care Of</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>
            A honeymoon isn&apos;t a holiday — it&apos;s the opening of your life together. We treat it that way.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isMobile?"1fr 1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:isXS?14:18 }}>
            {PROMISES.map((p, i) => (
              <div key={p.title} className="promise-card" style={{ borderRadius:20, padding:isXS?"18px":"22px 24px", background:"rgba(6,18,3,0.88)", border:"1px solid rgba(125,200,50,0.13)", boxShadow:"0 4px 24px rgba(0,0,0,0.30)", opacity:0, animation:`fadeUp .55s ${i*0.07}s ease both` }}>
                <div style={{ fontSize:28, marginBottom:14 }}>{p.icon}</div>
                <div style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?15:17, fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.02em" }}>{p.title}</div>
                <div style={{ fontFamily:FB, fontSize:12.5, color:"rgba(175,220,115,0.58)", lineHeight:1.76 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 5. TESTIMONIALS ══════════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Couples Who Loved It"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            Memories That{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Last Forever</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>
            Real couples. Real trips. Real love stories.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isDesk?"repeat(3,1fr)":"1fr 1fr", gap:20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="testi-card" style={{ borderRadius:20, padding:"26px 24px", background:"rgba(6,18,3,0.90)", border:"1.5px solid rgba(125,200,50,0.13)", boxShadow:"0 4px 28px rgba(0,0,0,0.30)", opacity:0, animation:`fadeUp .55s ${i*0.09}s ease both` }}>
                <div style={{ fontFamily:F, fontSize:48, color:`${C.gLeaf}22`, lineHeight:.8, marginBottom:12, fontStyle:"italic" }}>&quot;</div>
                <p style={{ fontFamily:FB, fontSize:13.5, color:"rgba(190,232,140,0.72)", lineHeight:1.82, marginBottom:20, fontStyle:"italic" }}>{t.text}</p>
                <div style={{ height:1, background:"rgba(125,200,50,0.10)", marginBottom:16 }}/>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:42, height:42, borderRadius:"50%", background:"rgba(107,189,40,0.14)", border:"1.5px solid rgba(107,189,40,0.28)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontFamily:FB, fontSize:13, fontWeight:700, color:"rgba(200,238,150,0.88)" }}>{t.name}</div>
                      <div style={{ fontFamily:FB, fontSize:11, color:"rgba(145,200,90,0.48)" }}>{t.city} · {t.trip}</div>
                    </div>
                  </div>
                  <Stars rating={t.rating}/>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 6. FAQ ════════════════════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="FAQ"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:36, letterSpacing:"-.03em" }}>
            Honeymoon{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Questions</span>
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:0, borderRadius:20, overflow:"hidden", border:"1px solid rgba(125,200,50,0.12)" }}>
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q}>
                  {i > 0 && <div style={{ height:1, background:"rgba(125,200,50,0.10)" }}/>}
                  <div className="faq-row" onClick={() => setOpenFaq(open ? null : i)} style={{ padding:isXS?"16px":"20px 24px", background:open?"rgba(10,28,5,0.95)":"rgba(6,18,3,0.88)", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16 }}>
                    <span style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?15:17, fontWeight:700, color:"#fff", flex:1, lineHeight:1.4 }}>{faq.q}</span>
                    <div style={{ width:26, height:26, borderRadius:8, border:`1.5px solid ${open?C.gLeaf+"60":"rgba(125,200,50,0.22)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:open?C.gLeaf:"rgba(125,200,50,0.50)", transition:"all .22s", transform:open?"rotate(45deg)":"none", background:open?"rgba(107,189,40,0.14)":"transparent" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </div>
                  </div>
                  {open && (
                    <div style={{ padding:isXS?"0 16px 18px":"0 24px 20px", background:"rgba(8,22,4,0.92)" }}>
                      <p style={{ fontFamily:FB, fontSize:13.5, color:"rgba(185,228,130,0.68)", lineHeight:1.80, margin:0 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 7. BOTTOM CTA ════════════════════════════════════════════════ */}
      <div id="enquiry" style={{ position:"relative", overflow:"hidden", padding:`80px ${px} 96px` }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`url(${HERO_IMG})`, backgroundSize:"cover", backgroundPosition:"center 50%", filter:"brightness(0.13) saturate(1.7)", zIndex:0 }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#040E02 0%,rgba(4,14,2,0.0) 28%,rgba(4,14,2,0.0) 72%,#040E02 100%)", zIndex:1 }}/>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 70% 60% at 50% 50%,rgba(46,128,16,0.15) 0%,transparent 65%)`, zIndex:2 }}/>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 50% 50% at 50% 50%,rgba(244,63,110,0.06) 0%,transparent 65%)`, zIndex:2 }}/>

        <Section style={{ position:"relative", zIndex:10, maxWidth:700, margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
            <Eyebrow text="Start Planning"/>
          </div>
          {/* Heart */}
          <div style={{ fontSize:36, marginBottom:14, animation:"heartBeat 2.4s 1s infinite" }}>💑</div>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"28px":isMobile?"36px":"52px", fontWeight:800, color:"#fff", letterSpacing:"-.034em", lineHeight:1.04, marginBottom:16, textShadow:"0 4px 32px rgba(0,0,0,0.55)" }}>
            Begin Your Story{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 45%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Together</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:isXS?13:14.5, color:"rgba(180,225,130,0.62)", lineHeight:1.80, marginBottom:36 }}>
            Share your dream destination, travel dates, and budget — and we&apos;ll send a personalised honeymoon itinerary within 2 hours. No commitment, no advance payment.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:28 }}>
            <a href="tel:+919876543210" className="cta-btn" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"13px 22px":"16px 34px", borderRadius:14, border:"none", background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color:C.gDeep, cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:10, boxShadow:`0 10px 32px ${C.gLeaf}55` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call Us Free
            </a>
            <a href="https://wa.me/919876543210?text=Hi! I want to plan my honeymoon trip." target="_blank" rel="noreferrer" className="cta-btn" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"12px 20px":"15px 28px", borderRadius:14, border:"2px solid rgba(37,211,102,0.45)", background:"rgba(37,211,102,0.10)", color:"rgba(37,211,102,0.95)", cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, backdropFilter:"blur(10px)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z"/></svg>
              WhatsApp Us
            </a>
          </div>

          <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:isXS?14:24 }}>
            {["✅ Free itinerary","🔒 No advance needed","⚡ 2-hr callback","🌹 Honeymoon specialists"].map(t => (
              <span key={t} style={{ fontFamily:FB, fontSize:12, fontWeight:600, color:"rgba(170,220,110,0.55)" }}>{t}</span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}