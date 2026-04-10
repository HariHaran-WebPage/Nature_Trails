"use client";
import { useState, useEffect, useRef, ReactNode } from "react";

/* ─── Design Tokens ──────────────────────────────────────────────────── */
const C = {
  gDeep: "#0F3D06", gDark: "#1A5C0A", gMid: "#2E8010",
  gLeaf: "#6BBD28", gLight: "#96D94A",
};
const F  = "'Playfair Display', Georgia, serif";
const FB = "'DM Sans', 'Segoe UI', sans-serif";

/* ─── Hero Image ─────────────────────────────────────────────────────── */
const HERO_IMG = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85&fit=crop";

/* ─── Hill Station Data ──────────────────────────────────────────────── */
const DESTINATIONS = [
  {
    id:"kodaikanal",
    name:"Kodaikanal",
    state:"Tamil Nadu",
    badge:"Most Popular",
    tagline:"Princess of Hills",
    altitude:"2,133m",
    temp:"8–20°C",
    distance:"120 km from MDU",
    rating:"4.9",
    reviews:"2,840",
    heroImg:"https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=900&q=85&fit=crop",
    highlights:["Kodai Lake","Pillar Rocks","Silver Cascade","Bryant Park"],
    startingPrice:"₹4,499",
    duration:"2N/3D onwards",
    tag:"Hill Station",
    href:"/destinations/kodaikanal",
  },
  {
    id:"munnar",
    name:"Munnar",
    state:"Kerala",
    badge:"Editor's Pick",
    tagline:"Kashmir of South India",
    altitude:"1,600m",
    temp:"10–20°C",
    distance:"130 km from COK",
    rating:"4.9",
    reviews:"3,210",
    heroImg:"https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&q=85&fit=crop",
    highlights:["Tea Gardens","Eravikulam NP","Top Station","Attukal Falls"],
    startingPrice:"₹4,999",
    duration:"2N/3D onwards",
    tag:"Hill Station",
    href:"/destinations/munnar",
  },
  {
    id:"ooty",
    name:"Ooty",
    state:"Tamil Nadu",
    badge:"Family Favourite",
    tagline:"Queen of Hill Stations",
    altitude:"2,240m",
    temp:"5–25°C",
    distance:"86 km from CBE",
    rating:"4.8",
    reviews:"4,150",
    heroImg:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85&fit=crop",
    highlights:["Botanical Garden","Doddabetta Peak","Toy Train","Pykara Lake"],
    startingPrice:"₹3,999",
    duration:"2N/3D onwards",
    tag:"Hill Station",
    href:"/destinations/ooty",
  },
];

const PACKAGES = [
  {
    id:"weekend",
    name:"Weekend Hill Escape",
    duration:"2 Nights / 3 Days",
    destinations:["Kodaikanal","Ooty","Yercaud"],
    price:"₹3,499",
    unit:"per person",
    badge:"",
    color: C.gLeaf,
    ideal:"Couples & Friends",
    features:[
      "Choose any 1 hill station",
      "Sightseeing with transfers",
      "2 nights comfortable stay",
      "Breakfast included",
      "Expert local guide",
    ],
  },
  {
    id:"classic",
    name:"South India Hills Trail",
    duration:"5 Nights / 6 Days",
    destinations:["Munnar","Ooty","Kodaikanal"],
    price:"₹12,999",
    unit:"per person",
    badge:"Most Popular",
    color:"#C8F060",
    ideal:"Families & Honeymooners",
    features:[
      "3 iconic hill stations",
      "Munnar tea garden walk",
      "Ooty toy train experience",
      "Kodai Lake boating",
      "All meals & transfers",
      "Dedicated trip manager",
    ],
  },
  {
    id:"premium",
    name:"Western Ghats Grand Tour",
    duration:"7 Nights / 8 Days",
    destinations:["Coorg","Wayanad","Munnar","Ooty"],
    price:"₹22,999",
    unit:"per person",
    badge:"Premium",
    color:"#F59E0B",
    ideal:"Luxury Travellers",
    features:[
      "4 premium hill destinations",
      "Luxury estate / resort stays",
      "Private vehicle throughout",
      "Wildlife safari — Coorg & Wayanad",
      "Cooking class & plantation walk",
      "Spa, candlelight dinner & more",
    ],
  },
];

const FILTERS = ["All", "Tamil Nadu", "Kerala", "Karnataka"];

const BEST_TIME = [
  { month:"Oct – Feb", label:"Peak Season",  note:"Cool & clear — best visibility, all attractions open",      active:true  },
  { month:"Mar – May", label:"Summer",        note:"Warm days, fewer crowds, great for trekking",              active:true  },
  { month:"Jun – Sep", label:"Monsoon",       note:"Lush green landscapes, heavy rain — plan with caution",    active:false },
  { month:"Dec – Jan", label:"Winter",        note:"Cold & misty — romantic for couples, cosy stays",          active:true  },
];

const WHY_US = [
  { icon:"🗺️", title:"Local Expertise",     desc:"Our guides are born-and-raised hill station locals with 10+ years of experience crafting perfect itineraries." },
  { icon:"💰", title:"Best Price Promise",   desc:"We match or beat any quoted price. No hidden costs, no surprise add-ons — just transparent, fair pricing." },
  { icon:"🚗", title:"Door-to-Door Service", desc:"Pickup from your city, drop back home. Comfortable, air-conditioned vehicles for every segment of the trip." },
  { icon:"📞", title:"24/7 Support",         desc:"Your dedicated trip manager is just a call away throughout the trip — day, night, emergency or just a question." },
  { icon:"🏨", title:"Handpicked Stays",     desc:"Only verified, guest-reviewed accommodations — from cosy homestays to premium tea estate bungalows." },
  { icon:"🎯", title:"Fully Customisable",   desc:"Every package is a starting point. Change hotels, add days, swap destinations — we build your perfect trip." },
];

const FAQS = [
  { q:"Which hill station is best for a first visit?",      a:"Kodaikanal and Ooty are perfect for first-timers — excellent connectivity, well-developed tourism infrastructure, and a great mix of nature, sightseeing, and activities suitable for all ages." },
  { q:"Can I combine multiple hill stations in one trip?",   a:"Absolutely! Our South India Hills Trail and Western Ghats Grand Tour combine 3–4 hill stations with smooth road transfers. Kodaikanal–Ooty–Munnar is our most popular combo." },
  { q:"Are these packages suitable for families with kids?", a:"Yes! Ooty toy train, Kodai Lake boating, Bryant Park, Munnar tea garden walks and Wayanad&apos;s Edakkal Caves are all family favourites that children love." },
  { q:"What is the best hill station for honeymooners?",     a:"Munnar tops the honeymoon list for its misty tea estates and luxury cottages. Coorg is a close second with coffee plantation stays and romantic waterfalls. Kodaikanal is ideal for a budget honeymoon." },
  { q:"How far in advance should I book?",                   a:"We recommend booking at least 2–3 weeks in advance for regular travel, and 4–6 weeks during peak season (October–January) and school holidays when resorts fill up fast." },
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

type BadgeKey = "Most Popular" | "Editor's Pick" | "Family Favourite" | "Trending" | "Nature Lover" | "Hidden Gem";

const BADGE_COLORS: Record<BadgeKey, { bg: string; color: string }> = {
  "Most Popular":   { bg:"rgba(107,189,40,0.18)",  color:C.gLeaf },
  "Editor's Pick":  { bg:"rgba(99,153,238,0.18)",  color:"#82b4f5" },
  "Family Favourite":{ bg:"rgba(245,158,11,0.18)", color:"#F59E0B" },
  "Trending":       { bg:"rgba(236,72,153,0.18)",  color:"#f472b6" },
  "Nature Lover":   { bg:"rgba(34,211,238,0.18)",  color:"#67e8f9" },
  "Hidden Gem":     { bg:"rgba(167,139,250,0.18)", color:"#c4b5fd" },
};

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

/* ─── Star Rating ─────────────────────────────────────────────────────── */
function Stars({ rating }: StarsProps) {
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:3 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= Math.round(numericRating) ? C.gLeaf : "rgba(107,189,40,0.22)"} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

/* ─── Breadcrumb Component (moved outside to avoid render-time creation) ── */
function Breadcrumb() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:FB, fontSize:11, fontWeight:600, color:"rgba(150,210,90,0.55)", letterSpacing:".04em" }}>
      <span style={{ cursor:"pointer" }}>Home</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      <span style={{ cursor:"pointer" }}>Tour Packages</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      <span style={{ color:C.gLeaf }}>Hill Stations</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function HillStationsPage() {
  const width    = useW();
  const isXS     = width < 480;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesk   = width >= 1024;

  const px   = isXS?"16px":isMobile?"20px":isTablet?"32px":"56px";
  const maxW = 1280;

  const [filter,   setFilter]   = useState<string>("All");
  const [openFaq,  setOpenFaq]  = useState<number | null>(null);
  const [mounted,  setMounted]  = useState(false);
  const [hovered,  setHovered]  = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroVis = useInView(heroRef, 0.01);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const filtered = filter === "All" ? DESTINATIONS : DESTINATIONS.filter(d => d.state === filter);

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
        @keyframes countUp   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

        .dest-card  { transition:all .30s cubic-bezier(.22,1,.36,1); }
        .dest-card:hover  { transform:translateY(-8px)!important; box-shadow:0 24px 72px rgba(0,0,0,0.55)!important; }
        .pkg-card   { transition:all .28s cubic-bezier(.22,1,.36,1); }
        .pkg-card:hover   { transform:translateY(-6px)!important; }
        .why-card   { transition:all .26s; }
        .why-card:hover   { transform:translateY(-4px); border-color:rgba(107,189,40,0.40)!important; background:rgba(12,32,6,0.98)!important; }
        .filter-btn { transition:all .22s; cursor:pointer; }
        .filter-btn:hover { background:rgba(107,189,40,0.12)!important; }
        .faq-row    { transition:all .22s; cursor:pointer; }
        .faq-row:hover    { background:rgba(107,189,40,0.06)!important; }
        .cta-btn    { transition:all .26s; }
        .cta-btn:hover    { transform:translateY(-3px); }
        .dest-img   { transition:transform .50s cubic-bezier(.22,1,.36,1); }
        .dest-card:hover .dest-img { transform:scale(1.07); }
      `}</style>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position:"relative", minHeight:isXS?"85vh":"100vh", overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:`url(${HERO_IMG})`, backgroundSize:"cover", backgroundPosition:"center 35%", transform:mounted?"scale(1)":"scale(1.07)", transition:"transform 2s cubic-bezier(.22,1,.36,1)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:1, background:"rgba(3,10,1,0.55)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:2, background:"linear-gradient(180deg,rgba(4,12,2,0.88) 0%,rgba(4,10,2,0.05) 44%,rgba(4,12,2,0.82) 100%)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none", background:`radial-gradient(ellipse 72% 55% at 50% 85%, rgba(46,128,16,0.22) 0%,transparent 65%)` }}/>
        <div style={{ position:"absolute", inset:0, zIndex:4, pointerEvents:"none", opacity:.025, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"200px" }}/>

        <div style={{ position:"relative", zIndex:10, maxWidth:maxW, margin:"0 auto", width:"100%", padding:`0 ${px}`, flex:1, display:"flex", flexDirection:"column", justifyContent:"center", paddingTop:isMobile?"90px":"80px", paddingBottom:isMobile?"64px":"80px" }}>

          <div style={{ marginBottom:20, animation:heroVis?"slideDown .55s ease both":"none" }}>
            <Breadcrumb/>
          </div>

          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:20, animation:heroVis?"fadeUp .55s .05s ease both":"none" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 16px", borderRadius:100, background:"rgba(107,189,40,0.12)", border:"1.5px solid rgba(107,189,40,0.28)", backdropFilter:"blur(12px)" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:C.gLeaf, display:"inline-block", animation:"pulse 2s infinite", boxShadow:`0 0 8px ${C.gLeaf}` }}/>
              <span style={{ fontFamily:FB, fontSize:isXS?10:11, fontWeight:700, color:C.gLeaf, letterSpacing:".18em", textTransform:"uppercase" }}>South India · 6 Destinations</span>
            </div>
          </div>

          <h1 style={{ fontFamily:F, fontStyle:"italic", fontWeight:800, fontSize:isXS?"34px":isMobile?"48px":isTablet?"64px":"82px", lineHeight:.97, letterSpacing:"-.038em", color:"#fff", margin:"0 0 8px", textShadow:"0 4px 40px rgba(0,0,0,0.55)", animation:heroVis?"fadeUp .62s .10s ease both":"none" }}>
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 38%,${C.gLight} 65%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Hill Station</span>
          </h1>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontWeight:700, fontSize:isXS?"17px":isMobile?"21px":"28px", color:"rgba(200,240,150,0.68)", margin:"0 0 20px", letterSpacing:"-.02em", animation:heroVis?"fadeUp .62s .14s ease both":"none" }}>
            Tour Packages
          </h2>

          <p style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:500, color:"rgba(185,228,130,0.60)", maxWidth:520, lineHeight:1.84, margin:"0 0 36px", animation:heroVis?"fadeUp .62s .18s ease both":"none" }}>
            Escape to the cool embrace of South India&apos;s most beloved hill stations — from Kodaikanal&apos;s misty lakes to Munnar&apos;s emerald tea carpets, Ooty&apos;s toy trains and Coorg&apos;s coffee-scented valleys. 6 destinations, handpicked itineraries, unbeatable prices.
          </p>

          {/* Stats bar */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:36, animation:heroVis?"fadeUp .62s .22s ease both":"none" }}>
            {[
              { icon:"🏔️", text:"6 Hill Stations"   },
              { icon:"✈️", text:"10,000+ Happy Trips" },
              { icon:"⭐", text:"4.8 Avg Rating"      },
              { icon:"💰", text:"From ₹2,999"         },
            ].map(c => (
              <div key={c.text} style={{ display:"flex", alignItems:"center", gap:7, padding:"8px 14px", borderRadius:100, background:"rgba(107,189,40,0.10)", border:"1.5px solid rgba(107,189,40,0.22)", backdropFilter:"blur(8px)" }}>
                <span style={{ fontSize:13 }}>{c.icon}</span>
                <span style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"rgba(200,240,150,0.80)", letterSpacing:".04em" }}>{c.text}</span>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap", animation:heroVis?"fadeUp .62s .26s ease both":"none" }}>
            <a href="#destinations" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"13px 22px":"15px 30px", borderRadius:14, border:"none", background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color:C.gDeep, cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, boxShadow:`0 10px 32px ${C.gLeaf}55`, transition:"all .26s" }}
              onMouseEnter={e=>{const el=e.currentTarget;el.style.transform="translateY(-3px)";el.style.boxShadow=`0 18px 48px ${C.gLeaf}65`;}}
              onMouseLeave={e=>{const el=e.currentTarget;el.style.transform="none";el.style.boxShadow=`0 10px 32px ${C.gLeaf}55`;}}
            >
              Explore Destinations
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#packages" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"12px 20px":"14px 26px", borderRadius:14, border:"2px solid rgba(107,189,40,0.35)", background:"rgba(107,189,40,0.09)", color:"rgba(150,217,74,0.95)", cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, backdropFilter:"blur(10px)", transition:"all .26s" }}
              onMouseEnter={e=>{const el=e.currentTarget;el.style.background="rgba(107,189,40,0.18)";el.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{const el=e.currentTarget;el.style.background="rgba(107,189,40,0.09)";el.style.transform="none";}}
            >
              View Packages
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

      {/* ══ 2. DESTINATIONS GRID ══════════════════════════════════════════ */}
      <div id="destinations" style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="All Destinations"/>
          <div style={{ display:"flex", flexDirection:isMobile?"column":"row", alignItems:isMobile?"flex-start":"flex-end", justifyContent:"space-between", gap:20, marginBottom:40 }}>
            <div>
              <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
                Pick Your{" "}
                <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Hill Station</span>
              </h2>
              <p style={{ fontFamily:FB, fontSize:13, color:"rgba(175,225,120,0.55)", lineHeight:1.70 }}>
                {filtered.length} destination{filtered.length !== 1 ? "s" : ""} · Click any card to explore packages
              </p>
            </div>

            {/* Filter pills */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {FILTERS.map(f => (
                <button key={f} className="filter-btn" onClick={() => setFilter(f)}
                  style={{ padding:"8px 16px", borderRadius:100, border:`1.5px solid ${filter===f?C.gLeaf+"70":"rgba(125,200,50,0.18)"}`, background:filter===f?"rgba(107,189,40,0.16)":"rgba(6,18,3,0.70)", fontFamily:FB, fontSize:12, fontWeight:700, color:filter===f?C.gLeaf:"rgba(165,215,100,0.55)", letterSpacing:".05em" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:22 }}>
            {filtered.map((dest, i) => {
              const bc = BADGE_COLORS[dest.badge as BadgeKey] || { bg:"rgba(107,189,40,0.18)", color:C.gLeaf };
              return (
                <a key={dest.id} href={dest.href} className="dest-card"
                  style={{ borderRadius:22, overflow:"hidden", background:"rgba(6,18,3,0.90)", border:"1.5px solid rgba(125,200,50,0.13)", boxShadow:"0 6px 32px rgba(0,0,0,0.35)", textDecoration:"none", display:"block", opacity:0, animation:`fadeUp .55s ${i*0.08}s ease both`, position:"relative" }}
                  onMouseEnter={() => setHovered(dest.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Image */}
                  <div style={{ height:isXS?200:220, overflow:"hidden", position:"relative" }}>
                    <div className="dest-img" style={{ width:"100%", height:"100%", backgroundImage:`url(${dest.heroImg})`, backgroundSize:"cover", backgroundPosition:"center" }}/>
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(4,12,2,0.80) 0%,transparent 50%)" }}/>
                    {/* Badge */}
                    <div style={{ position:"absolute", top:14, left:14, padding:"5px 12px", borderRadius:100, background:bc.bg, border:`1px solid ${bc.color}40`, backdropFilter:"blur(8px)" }}>
                      <span style={{ fontFamily:FB, fontSize:10, fontWeight:800, color:bc.color, letterSpacing:".10em", textTransform:"uppercase" }}>{dest.badge}</span>
                    </div>
                    {/* State */}
                    <div style={{ position:"absolute", top:14, right:14, padding:"5px 12px", borderRadius:100, background:"rgba(4,12,2,0.75)", border:"1px solid rgba(125,200,50,0.20)", backdropFilter:"blur(8px)" }}>
                      <span style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:"rgba(165,215,100,0.75)", letterSpacing:".08em" }}>{dest.state}</span>
                    </div>
                    {/* Bottom title overlay */}
                    <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 18px" }}>
                      <div style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:"rgba(165,215,100,0.60)", letterSpacing:".12em", textTransform:"uppercase", marginBottom:3 }}>{dest.tagline}</div>
                      <div style={{ fontFamily:F, fontStyle:"italic", fontSize:24, fontWeight:800, color:"#fff", letterSpacing:"-.02em", textShadow:"0 2px 12px rgba(0,0,0,0.6)" }}>{dest.name}</div>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding:"18px 20px 22px" }}>
                    {/* Stats row */}
                    <div style={{ display:"flex", gap:14, marginBottom:16, flexWrap:"wrap" }}>
                      {[
                        { label:"Altitude", val:dest.altitude },
                        { label:"Temp",     val:dest.temp     },
                        { label:"From",     val:dest.distance },
                      ].map(s => (
                        <div key={s.label}>
                          <div style={{ fontFamily:FB, fontSize:9.5, fontWeight:700, color:"rgba(155,210,90,0.45)", letterSpacing:".10em", textTransform:"uppercase", marginBottom:2 }}>{s.label}</div>
                          <div style={{ fontFamily:FB, fontSize:12, fontWeight:700, color:"rgba(195,235,145,0.80)" }}>{s.val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div style={{ height:1, background:"rgba(125,200,50,0.10)", marginBottom:14 }}/>

                    {/* Highlights */}
                    <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:16 }}>
                      {dest.highlights.map(h => (
                        <span key={h} style={{ fontFamily:FB, fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:100, background:"rgba(107,189,40,0.09)", border:"1px solid rgba(107,189,40,0.20)", color:"rgba(165,215,100,0.70)" }}>{h}</span>
                      ))}
                    </div>

                    {/* Rating + Price row */}
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                        <Stars rating={dest.rating}/>
                        <span style={{ fontFamily:FB, fontSize:12, fontWeight:700, color:C.gLeaf }}>{dest.rating}</span>
                        <span style={{ fontFamily:FB, fontSize:11, color:"rgba(155,210,90,0.40)" }}>({dest.reviews})</span>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontFamily:FB, fontSize:9.5, fontWeight:600, color:"rgba(155,210,90,0.45)", letterSpacing:".08em", textTransform:"uppercase" }}>Starting</div>
                        <div style={{ fontFamily:F, fontStyle:"italic", fontSize:20, fontWeight:800, color:C.gLeaf, letterSpacing:"-.02em" }}>{dest.startingPrice}</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div style={{ marginTop:16, display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"11px", borderRadius:12, background:hovered===dest.id?`linear-gradient(135deg,${C.gLeaf},${C.gMid})`:"rgba(107,189,40,0.10)", color:hovered===dest.id?C.gDeep:C.gLeaf, border:hovered===dest.id?"none":"1.5px solid rgba(107,189,40,0.24)", fontFamily:FB, fontSize:13, fontWeight:700, letterSpacing:".04em", transition:"all .26s" }}>
                      Explore {dest.name}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 3. PACKAGES ══════════════════════════════════════════════════ */}
      <div id="packages" style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Curated Packages"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            Multi-Destination{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Packages</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>
            Combine multiple hill stations in one seamless trip. All prices per person — group discounts available.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:20 }}>
            {PACKAGES.map((pkg) => {
              const isPopular = pkg.badge === "Most Popular";
              const isPremium = pkg.badge === "Premium";
              return (
                <div key={pkg.id} className="pkg-card" style={{ borderRadius:22, overflow:"hidden", background:isPopular?"linear-gradient(160deg,rgba(12,36,6,0.98),rgba(8,24,4,0.98))":"rgba(6,18,3,0.90)", border:`2px solid ${isPopular?C.gLeaf+"50":isPremium?"rgba(245,158,11,0.30)":"rgba(125,200,50,0.14)"}`, boxShadow:isPopular?`0 16px 60px rgba(107,189,40,0.18)`:"0 6px 32px rgba(0,0,0,0.30)", position:"relative" }}>
                  {pkg.badge && (
                    <div style={{ position:"absolute", top:18, right:18, padding:"5px 12px", borderRadius:100, background:isPopular?C.gLeaf:isPremium?"#F59E0B":"rgba(125,200,50,0.18)", color:isPopular?C.gDeep:isPremium?"#040E02":"rgba(125,200,50,0.90)", fontFamily:FB, fontSize:10, fontWeight:800, letterSpacing:".10em", textTransform:"uppercase" }}>
                      {pkg.badge}
                    </div>
                  )}
                  <div style={{ padding:"28px 26px 24px" }}>
                    <div style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:"rgba(155,210,90,0.45)", letterSpacing:".12em", textTransform:"uppercase", marginBottom:6 }}>Ideal for {pkg.ideal}</div>
                    <div style={{ fontFamily:F, fontStyle:"italic", fontSize:21, fontWeight:800, color:"#fff", marginBottom:4, letterSpacing:"-.02em" }}>{pkg.name}</div>
                    <div style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"rgba(165,215,100,0.55)", letterSpacing:".08em", textTransform:"uppercase", marginBottom:12 }}>{pkg.duration}</div>

                    {/* Destination pills */}
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
                      {pkg.destinations.map(d => (
                        <span key={d} style={{ fontFamily:FB, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:100, background:"rgba(107,189,40,0.10)", border:"1px solid rgba(107,189,40,0.22)", color:"rgba(165,215,100,0.70)" }}>📍 {d}</span>
                      ))}
                    </div>

                    <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:4 }}>
                      <span style={{ fontFamily:F, fontStyle:"italic", fontSize:36, fontWeight:800, color:pkg.color, letterSpacing:"-.03em" }}>{pkg.price}</span>
                    </div>
                    <div style={{ fontFamily:FB, fontSize:11, fontWeight:600, color:"rgba(155,210,90,0.50)", marginBottom:22 }}>{pkg.unit}</div>
                    <div style={{ height:1, background:"linear-gradient(to right,transparent,rgba(125,200,50,0.18),transparent)", marginBottom:20 }}/>
                    <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                      {pkg.features.map(f => (
                        <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                          <div style={{ width:18, height:18, borderRadius:"50%", background:`${C.gLeaf}20`, border:`1.5px solid ${C.gLeaf}40`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={C.gLeaf} strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                          <span style={{ fontFamily:FB, fontSize:12.5, fontWeight:500, color:"rgba(190,230,140,0.75)", lineHeight:1.55 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <a href="#enquiry" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"13px", borderRadius:13, background:isPopular?`linear-gradient(135deg,${C.gLeaf},${C.gMid})`:"rgba(107,189,40,0.12)", color:isPopular?C.gDeep:C.gLeaf, fontFamily:FB, fontSize:13, fontWeight:700, cursor:"pointer", letterSpacing:".04em", textDecoration:"none", boxShadow:isPopular?`0 8px 26px ${C.gLeaf}45`:"none", transition:"all .24s", border:isPopular?"none":`1.5px solid rgba(107,189,40,0.28)` }}
                      onMouseEnter={e=>{const el=e.currentTarget;el.style.transform="translateY(-2px)";el.style.boxShadow=isPopular?`0 14px 40px ${C.gLeaf}55`:`0 8px 24px ${C.gLeaf}20`;}}
                      onMouseLeave={e=>{const el=e.currentTarget;el.style.transform="none";el.style.boxShadow=isPopular?`0 8px 26px ${C.gLeaf}45`:"none";}}
                    >
                      Book This Package
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 4. WHY US ════════════════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Why Choose Us"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            The{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Difference</span>
            {" "}We Make
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:40 }}>
            Over 10,000 trips crafted since 2015 — here&apos;s what makes our hill station experiences unforgettable.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isMobile?"1fr 1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:isXS?14:18 }}>
            {WHY_US.map((w,i) => (
              <div key={w.title} className="why-card" style={{ borderRadius:20, padding:isXS?"18px":"22px 24px", background:"rgba(6,18,3,0.88)", border:"1px solid rgba(125,200,50,0.13)", boxShadow:"0 4px 24px rgba(0,0,0,0.30)", opacity:0, animation:`fadeUp .55s ${i*0.07}s ease both` }}>
                <div style={{ fontSize:28, marginBottom:14 }}>{w.icon}</div>
                <div style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?15:17, fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.02em" }}>{w.title}</div>
                <div style={{ fontFamily:FB, fontSize:12.5, color:"rgba(175,220,115,0.58)", lineHeight:1.76 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 5. BEST TIME ══════════════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Best Time to Visit"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:36, letterSpacing:"-.03em" }}>
            When to Plan Your{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Hill Trip</span>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr 1fr":isDesk?"repeat(4,1fr)":"1fr 1fr", gap:16 }}>
            {BEST_TIME.map(b => (
              <div key={b.month} style={{ borderRadius:18, padding:"22px 20px", background:b.active?"rgba(10,28,5,0.96)":"rgba(6,15,3,0.70)", border:`2px solid ${b.active?C.gLeaf+"45":"rgba(125,200,50,0.10)"}`, boxShadow:b.active?`0 8px 30px rgba(107,189,40,0.14)`:"none", transition:"all .26s" }}>
                <div style={{ fontFamily:F, fontStyle:"italic", fontSize:18, fontWeight:800, color:b.active?"#fff":"rgba(180,220,130,0.45)", marginBottom:4 }}>{b.month}</div>
                <div style={{ display:"inline-block", padding:"3px 10px", borderRadius:100, background:b.active?"rgba(107,189,40,0.18)":"rgba(125,200,50,0.07)", marginBottom:10 }}>
                  <span style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:b.active?C.gLeaf:"rgba(125,200,50,0.40)", letterSpacing:".10em", textTransform:"uppercase" }}>{b.label}</span>
                </div>
                <div style={{ fontFamily:FB, fontSize:12.5, color:b.active?"rgba(190,230,140,0.72)":"rgba(150,200,100,0.35)", lineHeight:1.65 }}>{b.note}</div>
                {b.active && (
                  <div style={{ marginTop:14, fontFamily:FB, fontSize:11, fontWeight:700, color:C.gLeaf, display:"flex", alignItems:"center", gap:5 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Recommended
                  </div>
                )}
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
            Common{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Questions</span>
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:0, borderRadius:20, overflow:"hidden", border:"1px solid rgba(125,200,50,0.12)" }}>
            {FAQS.map((faq,i) => {
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
        <div style={{ position:"absolute", inset:0, backgroundImage:`url(${HERO_IMG})`, backgroundSize:"cover", backgroundPosition:"center 50%", filter:"brightness(0.14) saturate(1.6)", zIndex:0 }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#040E02 0%,rgba(4,14,2,0.0) 30%,rgba(4,14,2,0.0) 70%,#040E02 100%)", zIndex:1 }}/>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 70% 60% at 50% 50%,rgba(46,128,16,0.16) 0%,transparent 65%)`, zIndex:2 }}/>

        <Section style={{ position:"relative", zIndex:10, maxWidth:700, margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
            <Eyebrow text="Book Now"/>
          </div>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"28px":isMobile?"36px":"52px", fontWeight:800, color:"#fff", letterSpacing:"-.034em", lineHeight:1.04, marginBottom:16, textShadow:"0 4px 32px rgba(0,0,0,0.55)" }}>
            Ready to Escape to the{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 45%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Hills?</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:isXS?13:14.5, color:"rgba(180,225,130,0.62)", lineHeight:1.80, marginBottom:36 }}>
            Tell us your dream hill station and we&apos;ll craft a personalised itinerary — free, with no advance payment required. Our experts call back within 2 hours.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:28 }}>
            <a href="tel:+919876543210" className="cta-btn" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"13px 22px":"16px 34px", borderRadius:14, border:"none", background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color:C.gDeep, cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:10, boxShadow:`0 10px 32px ${C.gLeaf}55` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call Us Free
            </a>
            <a href="https://wa.me/919876543210?text=Hi! I want to plan a hill station trip." target="_blank" rel="noreferrer" className="cta-btn" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"12px 20px":"15px 28px", borderRadius:14, border:"2px solid rgba(37,211,102,0.45)", background:"rgba(37,211,102,0.10)", color:"rgba(37,211,102,0.95)", cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, backdropFilter:"blur(10px)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z"/></svg>
              WhatsApp Us
            </a>
          </div>

          <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:isXS?14:24 }}>
            {["✅ Free enquiry","🔒 No advance needed","⚡ 2-hr reply"].map(t => (
              <span key={t} style={{ fontFamily:FB, fontSize:12, fontWeight:600, color:"rgba(170,220,110,0.55)" }}>{t}</span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}