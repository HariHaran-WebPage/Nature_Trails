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
const HERO_IMG = "https://images.unsplash.com/photo-1588598198321-9735fd9f1338?w=1800&q=85&fit=crop";

/* ─── Destinations ───────────────────────────────────────────────────── */
const DESTINATIONS = [
  {
    id:"sigiriya",
    name:"Sigiriya",
    region:"Cultural Triangle",
    badge:"Must Visit",
    tagline:"Eighth Wonder of the World",
    type:"Heritage",
    heroImg:"https://images.unsplash.com/photo-1588598198321-9735fd9f1338?w=900&q=85&fit=crop",
    highlights:["Lion Rock Fortress","Frescoes","Water Gardens","Pidurangala"],
    desc:"Climb the iconic 5th-century rock fortress rising 200m from the jungle plains — a UNESCO World Heritage site of breathtaking scale.",
    tag:"Heritage",
  },
  {
    id:"kandy",
    name:"Kandy",
    region:"Hill Country",
    badge:"Cultural Hub",
    tagline:"The Sacred City of Sri Lanka",
    type:"Culture",
    heroImg:"https://images.unsplash.com/photo-1575992440891-1e8b38b14c37?w=900&q=85&fit=crop",
    highlights:["Temple of Tooth","Kandy Lake","Royal Palace","Cultural Show"],
    desc:"Sri Lanka's last royal capital, home to the sacred Temple of the Tooth Relic — surrounded by misty hills, tea estates and Kandyan dance.",
    tag:"Culture",
  },
  {
    id:"ella",
    name:"Ella",
    region:"Uva Province",
    badge:"Trending",
    tagline:"Sri Lanka's Scenic Village",
    type:"Nature",
    heroImg:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&fit=crop",
    highlights:["Nine Arch Bridge","Little Adam's Peak","Ravana Falls","Tea Trails"],
    desc:"A dreamy village perched at 1,000m — world-famous for its emerald tea hills, colonial railway viaducts and cool mountain air.",
    tag:"Nature",
  },
  {
    id:"galle",
    name:"Galle",
    region:"Southern Coast",
    badge:"Colonial Gem",
    tagline:"Dutch Fort by the Sea",
    type:"Heritage",
    heroImg:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85&fit=crop",
    highlights:["Dutch Fort","Lighthouse","Boutique Cafés","Stilt Fishermen"],
    desc:"A UNESCO-listed Dutch colonial fort city on the Indian Ocean coast — cobbled streets, white-washed churches and some of Sri Lanka's best dining.",
    tag:"Heritage",
  },
  {
    id:"yala",
    name:"Yala National Park",
    region:"Southern Province",
    badge:"Wildlife",
    tagline:"Home of the Leopard",
    type:"Wildlife",
    heroImg:"https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85&fit=crop",
    highlights:["Leopard Safari","Elephants","Sloth Bears","Bird Watching"],
    desc:"Sri Lanka's most visited national park with the world's highest density of wild leopards — alongside elephants, sloth bears and crocodiles.",
    tag:"Wildlife",
  },
  {
    id:"mirissa",
    name:"Mirissa",
    region:"Southern Coast",
    badge:"Beach Paradise",
    tagline:"Whale Watching Capital",
    type:"Beach",
    heroImg:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85&fit=crop",
    highlights:["Blue Whale Watching","Coconut Tree Hill","Snorkelling","Sunset Beach"],
    desc:"A crescent-shaped bay with turquoise waters — the world's best spot for blue whale watching, dreamy sunsets and fresh seafood by the shore.",
    tag:"Beach",
  },
  {
    id:"nuwara-eliya",
    name:"Nuwara Eliya",
    region:"Central Province",
    badge:"Hill Station",
    tagline:"Little England of Sri Lanka",
    type:"Nature",
    heroImg:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=85&fit=crop",
    highlights:["Tea Plantations","Gregory Lake","Horton Plains","World's End"],
    desc:"Perched at 1,868m, this misty colonial hill town is framed by manicured tea estates, strawberry farms and colonial bungalows wrapped in cool mist.",
    tag:"Nature",
  },
  {
    id:"colombo",
    name:"Colombo",
    region:"Western Province",
    badge:"City Life",
    tagline:"Sri Lanka's Vibrant Capital",
    type:"City",
    heroImg:"https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&q=85&fit=crop",
    highlights:["Galle Face Green","Pettah Market","Gangaramaya Temple","Street Food"],
    desc:"A colourful capital blending colonial history, modern sky-scrapers and buzzing bazaars — the perfect start and end point for every Sri Lanka trip.",
    tag:"City",
  },
];

const FILTERS = ["All", "Heritage", "Nature", "Wildlife", "Beach", "Culture", "City"];

/* ─── Packages ────────────────────────────────────────────────────────── */
const PACKAGES = [
  {
    id:"express",
    name:"Sri Lanka Express",
    duration:"5 Nights / 6 Days",
    destinations:["Colombo","Sigiriya","Kandy","Ella"],
    price:"₹34,999",
    unit:"per person",
    badge:"",
    color: C.gLeaf,
    ideal:"First-timers",
    features:[
      "Sigiriya Rock Fortress climb",
      "Kandy Temple of the Tooth",
      "Colombo city half-day tour",
      "Scenic Kandy–Ella train ride",
      "3-star hotel stays + breakfast",
      "All transfers & visa support",
    ],
  },
  {
    id:"classic",
    name:"Classic Sri Lanka",
    duration:"8 Nights / 9 Days",
    destinations:["Colombo","Sigiriya","Kandy","Ella","Galle","Mirissa"],
    price:"₹54,999",
    unit:"per person",
    badge:"Most Popular",
    color:"#C8F060",
    ideal:"Couples & Families",
    features:[
      "Everything in Express +",
      "Yala National Park jeep safari",
      "Mirissa blue whale watching",
      "Galle Fort heritage walk",
      "Stilt fishermen at sunset",
      "Dedicated trip manager",
      "Daily breakfast + 3 dinners",
    ],
  },
  {
    id:"premium",
    name:"Grand Lanka Odyssey",
    duration:"11 Nights / 12 Days",
    destinations:["Colombo","Sigiriya","Kandy","Nuwara Eliya","Ella","Yala","Galle","Mirissa"],
    price:"₹84,999",
    unit:"per person",
    badge:"Premium",
    color:"#F59E0B",
    ideal:"Luxury Travellers",
    features:[
      "All 8 iconic destinations",
      "Luxury boutique hotel stays",
      "Private AC vehicle throughout",
      "Hot air balloon over Sigiriya",
      "Ayurvedic spa & wellness day",
      "Cooking class & tea tasting",
      "Horton Plains World's End trek",
      "Full-board meals throughout",
    ],
  },
];

/* ─── Itinerary ───────────────────────────────────────────────────────── */
const ITINERARY = [
  {
    day:1,
    title:"Colombo Arrival",
    items:[
      "Arrive at Bandaranaike International Airport",
      "Transfer to Colombo hotel",
      "Galle Face Green evening stroll",
      "Gangaramaya Buddhist Temple visit",
      "Welcome dinner — authentic Sri Lankan curry",
    ],
  },
  {
    day:2,
    title:"Cultural Triangle",
    items:[
      "Drive north to Sigiriya (4 hrs)",
      "Check-in at jungle-view resort",
      "Afternoon: Pidurangala Rock for sunset views",
      "Optional: Dambulla Cave Temple",
      "Dinner overlooking the paddy fields",
    ],
  },
  {
    day:3,
    title:"Sigiriya & Kandy",
    items:[
      "Early morning Sigiriya Rock Fortress climb",
      "Explore water gardens & frescoes",
      "Afternoon drive to Kandy (2.5 hrs)",
      "Temple of the Sacred Tooth Relic",
      "Kandyan cultural dance performance",
    ],
  },
  {
    day:4,
    title:"Kandy to Ella",
    items:[
      "Morning Kandy Lake & Royal Palace gardens",
      "Iconic scenic train journey Kandy → Ella (7 hrs)",
      "Arrive Ella — check into boutique guesthouse",
      "Evening walk to Nine Arch Bridge",
      "Dinner at clifftop restaurant with valley views",
    ],
  },
  {
    day:5,
    title:"Ella Explorer",
    items:[
      "Sunrise hike up Little Adam's Peak",
      "Ravana Waterfalls photography stop",
      "Tea factory tour & tasting",
      "Ella Rock afternoon trek",
      "Bonfire dinner under the stars",
    ],
  },
  {
    day:6,
    title:"Yala Safari",
    items:[
      "Drive to Yala National Park (3.5 hrs)",
      "Afternoon & sunset jeep safari",
      "Search for leopards, elephants & sloth bears",
      "Overnight at eco-lodge near park boundary",
      "Night sounds of the jungle",
    ],
  },
  {
    day:7,
    title:"Mirissa Beaches",
    items:[
      "Early morning sunrise safari in Yala",
      "Drive to Mirissa (2 hrs)",
      "Blue whale / dolphin watching boat trip",
      "Coconut Tree Hill viewpoint",
      "Snorkelling at Mirissa Reef",
      "Fresh seafood dinner at beach shack",
    ],
  },
  {
    day:8,
    title:"Galle & Departure",
    items:[
      "Morning: Galle Fort UNESCO heritage walk",
      "Dutch Reformed Church & Lighthouse",
      "Boutique café brunch inside the fort",
      "Stilt fishermen photography at Koggala",
      "Drive to Colombo for departure (2.5 hrs)",
    ],
  },
];

/* ─── Why Sri Lanka ───────────────────────────────────────────────────── */
const WHY = [
  { icon:"🏛️", title:"UNESCO Heritage",      desc:"8 UNESCO World Heritage Sites in a single island — more heritage per square km than almost anywhere on Earth." },
  { icon:"🐆", title:"Wildlife Wonders",      desc:"Home to the world&apos;s highest density of leopards at Yala, plus elephants, blue whales and 400+ bird species." },
  { icon:"🍵", title:"Tea Country Magic",      desc:"Ceylon tea&apos;s birthplace — ride the iconic train through misty highlands and sip fresh-brewed tea at 1,800m." },
  { icon:"🏖️", title:"Pristine Beaches",      desc:"260 beaches along 1,340 km of coastline — from the whale-watching coves of Mirissa to the surf of Arugam Bay." },
  { icon:"🍛", title:"Incredible Cuisine",    desc:"Sri Lankan food is one of Asia&apos;s best-kept secrets — fiery curries, hoppers, kottu roti and wood-apple desserts." },
  { icon:"✈️", title:"Easy from South India", desc:"Just a 1.5-hr flight from Chennai, Coimbatore or Trivandrum — Sri Lanka is closer than most Indian hill stations." },
];

/* ─── Best Time ───────────────────────────────────────────────────────── */
const BEST_TIME = [
  { month:"Dec – Mar", label:"Peak Season",  note:"Dry & sunny on west & south coasts — best for beaches, Galle & whale watching", active:true  },
  { month:"Apr – Jun", label:"Shoulder",     note:"Ideal for Cultural Triangle & east coast; Yala safari season begins",            active:true  },
  { month:"Jul – Sep", label:"East Season",  note:"East coast beaches at their best — Arugam Bay surf, Trincomalee diving",        active:true  },
  { month:"Oct – Nov", label:"Inter-monsoon", note:"Short rains — fewer tourists, lush green landscapes, good deals",              active:false },
];

/* ─── Travel Tips ─────────────────────────────────────────────────────── */
const TIPS = [
  { icon:"📋", title:"Visa",           desc:"Indian citizens get free 30-day e-visa on arrival. Apply online at www.eta.gov.lk before departure." },
  { icon:"💱", title:"Currency",       desc:"Sri Lankan Rupee (LKR). INR 1 ≈ LKR 3.5. ATMs widely available. Cards accepted at most hotels." },
  { icon:"🚂", title:"Getting Around", desc:"Scenic train journeys are a highlight. Hire a private driver for comfort — our package includes one." },
  { icon:"📱", title:"SIM Card",       desc:"Buy a Dialog or Mobitel SIM at the airport for ₹500 equivalent. 4G works across major tourist areas." },
];

/* ─── FAQ ─────────────────────────────────────────────────────────────── */
const FAQS = [
  { q:"Do Indians need a visa for Sri Lanka?",           a:"Yes, but it&apos;s simple. Indians can apply for a free 30-day Electronic Travel Authorisation (ETA) online at eta.gov.lk before travel. The process takes about 15 minutes and approval is usually within 24 hours. We assist all our guests with the application." },
  { q:"How many days are enough for Sri Lanka?",         a:"6–8 days covers the highlights (Sigiriya, Kandy, Ella, Galle). For a more relaxed trip including wildlife and beaches, 10–12 days is ideal. Our Classic package at 9 days is the most popular choice." },
  { q:"What is the best season to visit Sri Lanka?",     a:"December to March is ideal for the south and west coasts. April–September is better for the Cultural Triangle, hill country and east coast. Sri Lanka is a year-round destination — different regions peak at different times." },
  { q:"Is Sri Lanka safe for Indian tourists?",          a:"Sri Lanka is very safe and extremely welcoming to Indian visitors. The tourism infrastructure is excellent, the culture has deep ties with India, and Tamil is widely spoken in the Northern Province." },
  { q:"Can we combine Sri Lanka with South India?",      a:"Absolutely — this is one of our most popular requests! A classic combo is Munnar or Kodaikanal + Sri Lanka in a single trip. With flights from Coimbatore or Trivandrum taking just 1.5 hours, the combo makes perfect sense." },
  { q:"What currency and budget should I plan for?",     a:"Sri Lanka is great value for Indian tourists. Budget travellers can manage on ₹3,000–4,000/day; mid-range travellers on ₹5,000–8,000/day. Our all-inclusive packages eliminate daily budgeting stress entirely." },
];

/* ─── Types ──────────────────────────────────────────────────────────── */
interface SectionProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

interface EyebrowProps {
  text: string;
}

type BadgeKey = "Must Visit" | "Cultural Hub" | "Trending" | "Colonial Gem" | "Wildlife" | "Beach Paradise" | "Hill Station" | "City Life";

const BADGE_COLORS: Record<BadgeKey, { bg: string; color: string }> = {
  "Must Visit":     { bg:"rgba(107,189,40,0.18)",  color:C.gLeaf },
  "Cultural Hub":   { bg:"rgba(245,158,11,0.18)",  color:"#F59E0B" },
  "Trending":       { bg:"rgba(236,72,153,0.18)",  color:"#f472b6" },
  "Colonial Gem":   { bg:"rgba(99,153,238,0.18)",  color:"#82b4f5" },
  "Wildlife":       { bg:"rgba(34,211,102,0.18)",  color:"#4ade80" },
  "Beach Paradise": { bg:"rgba(34,211,238,0.18)",  color:"#67e8f9" },
  "Hill Station":   { bg:"rgba(167,139,250,0.18)", color:"#c4b5fd" },
  "City Life":      { bg:"rgba(251,146,60,0.18)",  color:"#fb923c" },
};

/* ─── Hooks ──────────────────────────────────────────────────────────── */
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

/* ─── Breadcrumb Component ── */
function Breadcrumb() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:FB, fontSize:11, fontWeight:600, color:"rgba(150,210,90,0.55)", letterSpacing:".04em" }}>
      <span style={{ cursor:"pointer" }}>Home</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      <span style={{ cursor:"pointer" }}>Tour Packages</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      <span style={{ color:C.gLeaf }}>Sri Lanka</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function SriLankaPage() {
  const width    = useW();
  const isXS     = width < 480;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesk   = width >= 1024;

  const px   = isXS?"16px":isMobile?"20px":isTablet?"32px":"56px";
  const maxW = 1280;

  const [filter,    setFilter]    = useState<string>("All");
  const [openFaq,   setOpenFaq]   = useState<number | null>(null);
  const [activeDay, setActiveDay] = useState<number>(0);
  const [mounted,   setMounted]   = useState(false);
  const [hovered,   setHovered]   = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroVis = useInView(heroRef, 0.01);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const filtered = filter === "All" ? DESTINATIONS : DESTINATIONS.filter(d => d.tag === filter);

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

        .dest-card  { transition:all .30s cubic-bezier(.22,1,.36,1); }
        .dest-card:hover  { transform:translateY(-8px)!important; box-shadow:0 24px 72px rgba(0,0,0,0.55)!important; }
        .pkg-card   { transition:all .28s cubic-bezier(.22,1,.36,1); }
        .pkg-card:hover   { transform:translateY(-6px)!important; }
        .why-card   { transition:all .26s; }
        .why-card:hover   { transform:translateY(-4px); border-color:rgba(107,189,40,0.40)!important; background:rgba(12,32,6,0.98)!important; }
        .tip-card   { transition:all .26s; }
        .tip-card:hover   { transform:translateY(-4px); border-color:rgba(107,189,40,0.40)!important; }
        .filter-btn { transition:all .22s; cursor:pointer; }
        .filter-btn:hover { background:rgba(107,189,40,0.12)!important; }
        .faq-row    { transition:all .22s; cursor:pointer; }
        .faq-row:hover    { background:rgba(107,189,40,0.06)!important; }
        .day-btn    { transition:all .22s; cursor:pointer; }
        .day-btn:hover    { background:rgba(107,189,40,0.12)!important; }
        .cta-btn    { transition:all .26s; }
        .cta-btn:hover    { transform:translateY(-3px); }
        .dest-img   { transition:transform .50s cubic-bezier(.22,1,.36,1); }
        .dest-card:hover .dest-img { transform:scale(1.07); }
      `}</style>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position:"relative", minHeight:"100vh", overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:`url(${HERO_IMG})`, backgroundSize:"cover", backgroundPosition:"center 38%", transform:mounted?"scale(1)":"scale(1.07)", transition:"transform 2s cubic-bezier(.22,1,.36,1)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:1, background:"rgba(3,10,1,0.50)" }}/>
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
              <span style={{ fontFamily:FB, fontSize:isXS?10:11, fontWeight:700, color:C.gLeaf, letterSpacing:".18em", textTransform:"uppercase" }}>Pearl of the Indian Ocean · 8 Destinations</span>
            </div>
          </div>

          <h1 style={{ fontFamily:F, fontStyle:"italic", fontWeight:800, fontSize:isXS?"36px":isMobile?"50px":isTablet?"66px":"86px", lineHeight:.97, letterSpacing:"-.038em", color:"#fff", margin:"0 0 8px", textShadow:"0 4px 40px rgba(0,0,0,0.55)", animation:heroVis?"fadeUp .62s .10s ease both":"none" }}>
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 38%,${C.gLight} 65%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Sri Lanka</span>
          </h1>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontWeight:700, fontSize:isXS?"17px":isMobile?"21px":"27px", color:"rgba(200,240,150,0.68)", margin:"0 0 20px", letterSpacing:"-.02em", animation:heroVis?"fadeUp .62s .14s ease both":"none" }}>
            Tour Packages from South India
          </h2>

          <p style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:500, color:"rgba(185,228,130,0.60)", maxWidth:530, lineHeight:1.84, margin:"0 0 36px", animation:heroVis?"fadeUp .62s .18s ease both":"none" }}>
            Just 1.5 hours by flight from South India, Sri Lanka packs 8 UNESCO sites, leopard safaris, whale watching, colonial forts, misty tea hills and technicolour coral reefs into one teardrop-shaped island. The world&apos;s best short international trip awaits.
          </p>

          <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:36, animation:heroVis?"fadeUp .62s .22s ease both":"none" }}>
            {[
              { icon:"✈️", text:"1.5 hrs from CBE/TRV" },
              { icon:"🏛️", text:"8 UNESCO Sites"       },
              { icon:"🆓", text:"Free e-Visa for Indians"},
              { icon:"💰", text:"From ₹34,999"          },
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

        <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
          <span style={{ fontFamily:FB, fontSize:10, fontWeight:600, color:"rgba(140,200,90,0.45)", letterSpacing:".14em", textTransform:"uppercase" }}>Scroll</span>
          <div style={{ width:22, height:36, borderRadius:11, border:"1.5px solid rgba(125,200,50,0.30)", display:"flex", justifyContent:"center", paddingTop:6 }}>
            <div style={{ width:4, height:4, borderRadius:"50%", background:C.gLeaf, animation:"scrollBob 1.8s ease-in-out infinite" }}/>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:130, zIndex:8, background:"linear-gradient(to bottom,transparent,#040E02)", pointerEvents:"none" }}/>
      </div>

      {/* ══ 2. WHY SRI LANKA ══════════════════════════════════════════════ */}
      <div style={{ background:"#040E02", padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Why Sri Lanka"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            Six Reasons to{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Fall in Love</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:520, lineHeight:1.80, marginBottom:40 }}>
            Sri Lanka isn&apos;t just a destination — it&apos;s a revelation. Here&apos;s why it tops every South Indian traveller&apos;s bucket list.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isMobile?"1fr 1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:isXS?14:18 }}>
            {WHY.map((w,i) => (
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

      {/* ══ 3. DESTINATIONS GRID ══════════════════════════════════════════ */}
      <div id="destinations" style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Places to Visit"/>
          <div style={{ display:"flex", flexDirection:isMobile?"column":"row", alignItems:isMobile?"flex-start":"flex-end", justifyContent:"space-between", gap:20, marginBottom:40 }}>
            <div>
              <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
                Top{" "}
                <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Destinations</span>
              </h2>
              <p style={{ fontFamily:FB, fontSize:13, color:"rgba(175,225,120,0.55)", lineHeight:1.70 }}>
                {filtered.length} place{filtered.length !== 1 ? "s" : ""} · Curated by our Sri Lanka specialists
              </p>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {FILTERS.map(f => (
                <button key={f} className="filter-btn" onClick={() => setFilter(f)}
                  style={{ padding:"8px 16px", borderRadius:100, border:`1.5px solid ${filter===f?C.gLeaf+"70":"rgba(125,200,50,0.18)"}`, background:filter===f?"rgba(107,189,40,0.16)":"rgba(6,18,3,0.70)", fontFamily:FB, fontSize:12, fontWeight:700, color:filter===f?C.gLeaf:"rgba(165,215,100,0.55)", letterSpacing:".05em" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isMobile?"1fr":isTablet?"1fr 1fr":"repeat(4,1fr)", gap:20 }}>
            {filtered.map((dest, i) => {
              const bc = BADGE_COLORS[dest.badge as BadgeKey] || { bg:"rgba(107,189,40,0.18)", color:C.gLeaf };
              return (
                <div key={dest.id} className="dest-card"
                  style={{ borderRadius:20, overflow:"hidden", background:"rgba(6,18,3,0.90)", border:"1.5px solid rgba(125,200,50,0.13)", boxShadow:"0 6px 32px rgba(0,0,0,0.35)", display:"block", opacity:0, animation:`fadeUp .55s ${i*0.07}s ease both`, position:"relative", cursor:"pointer" }}
                  onMouseEnter={() => setHovered(dest.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div style={{ height:190, overflow:"hidden", position:"relative" }}>
                    <div className="dest-img" style={{ width:"100%", height:"100%", backgroundImage:`url(${dest.heroImg})`, backgroundSize:"cover", backgroundPosition:"center" }}/>
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(4,12,2,0.82) 0%,transparent 52%)" }}/>
                    <div style={{ position:"absolute", top:12, left:12, padding:"4px 10px", borderRadius:100, background:bc.bg, border:`1px solid ${bc.color}40`, backdropFilter:"blur(8px)" }}>
                      <span style={{ fontFamily:FB, fontSize:9.5, fontWeight:800, color:bc.color, letterSpacing:".10em", textTransform:"uppercase" }}>{dest.badge}</span>
                    </div>
                    <div style={{ position:"absolute", top:12, right:12, padding:"4px 10px", borderRadius:100, background:"rgba(4,12,2,0.72)", border:"1px solid rgba(125,200,50,0.20)", backdropFilter:"blur(8px)" }}>
                      <span style={{ fontFamily:FB, fontSize:9.5, fontWeight:700, color:"rgba(165,215,100,0.72)", letterSpacing:".06em" }}>{dest.region}</span>
                    </div>
                    <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"12px 14px" }}>
                      <div style={{ fontFamily:FB, fontSize:9.5, fontWeight:700, color:"rgba(165,215,100,0.55)", letterSpacing:".12em", textTransform:"uppercase", marginBottom:2 }}>{dest.tagline}</div>
                      <div style={{ fontFamily:F, fontStyle:"italic", fontSize:20, fontWeight:800, color:"#fff", letterSpacing:"-.02em", textShadow:"0 2px 10px rgba(0,0,0,0.6)" }}>{dest.name}</div>
                    </div>
                  </div>
                  <div style={{ padding:"14px 16px 18px" }}>
                    <p style={{ fontFamily:FB, fontSize:12, color:"rgba(175,220,115,0.58)", lineHeight:1.70, marginBottom:12 }}>{dest.desc}</p>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                      {dest.highlights.map(h => (
                        <span key={h} style={{ fontFamily:FB, fontSize:10.5, fontWeight:600, padding:"3px 9px", borderRadius:100, background:"rgba(107,189,40,0.09)", border:"1px solid rgba(107,189,40,0.18)", color:"rgba(165,215,100,0.65)" }}>{h}</span>
                      ))}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, padding:"10px", borderRadius:10, background:hovered===dest.id?`linear-gradient(135deg,${C.gLeaf},${C.gMid})`:"rgba(107,189,40,0.09)", color:hovered===dest.id?C.gDeep:C.gLeaf, border:hovered===dest.id?"none":"1px solid rgba(107,189,40,0.22)", fontFamily:FB, fontSize:12, fontWeight:700, letterSpacing:".04em", transition:"all .26s" }}>
                      Explore
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 4. PACKAGES ══════════════════════════════════════════════════ */}
      <div id="packages" style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Our Packages"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            Choose Your{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Sri Lanka Trip</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>
            All packages include visa support, airport transfers and a dedicated trip manager. Fully customisable on request.
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
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
                      {pkg.destinations.map(d => (
                        <span key={d} style={{ fontFamily:FB, fontSize:10.5, fontWeight:600, padding:"3px 10px", borderRadius:100, background:"rgba(107,189,40,0.10)", border:"1px solid rgba(107,189,40,0.22)", color:"rgba(165,215,100,0.70)" }}>📍 {d}</span>
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

      {/* ══ 5. ITINERARY ═════════════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Sample Itinerary"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            Day-by-Day{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Plan</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:480, lineHeight:1.80, marginBottom:36 }}>
            Based on our Classic Sri Lanka — 8 Nights / 9 Days package. Fully customisable on request.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:isDesk?"260px 1fr":"1fr", gap:isDesk?28:20 }}>
            <div style={{ display:"flex", flexDirection:isDesk?"column":"row", gap:8, overflowX:isDesk?"visible":"auto", paddingBottom:isDesk?0:4 }}>
              {ITINERARY.map((d,i) => (
                <button key={d.day} className="day-btn" onClick={() => setActiveDay(i)}
                  style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px", borderRadius:14, border:`1.5px solid ${i===activeDay?C.gLeaf+"60":"rgba(125,200,50,0.14)"}`, background:i===activeDay?"rgba(107,189,40,0.14)":"rgba(6,18,3,0.80)", flexShrink:0, textAlign:"left" }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:i===activeDay?`linear-gradient(135deg,${C.gLeaf},${C.gMid})`:"rgba(107,189,40,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontFamily:FB, fontSize:13, fontWeight:800, color:i===activeDay?C.gDeep:C.gLeaf }}>{d.day}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:"rgba(155,210,90,0.50)", letterSpacing:".08em", textTransform:"uppercase" }}>Day {d.day}</div>
                    <div style={{ fontFamily:F, fontStyle:"italic", fontSize:14, fontWeight:800, color:i===activeDay?"#fff":"rgba(200,235,155,0.70)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:150 }}>{d.title}</div>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ borderRadius:22, padding:isXS?"22px 18px":"30px 32px", background:"rgba(6,18,3,0.90)", border:"1.5px solid rgba(107,189,40,0.18)", boxShadow:"0 8px 40px rgba(0,0,0,0.30)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24 }}>
                <div style={{ width:50, height:50, borderRadius:14, background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontFamily:F, fontStyle:"italic", fontSize:22, fontWeight:800, color:C.gDeep }}>{ITINERARY[activeDay].day}</span>
                </div>
                <div>
                  <div style={{ fontFamily:FB, fontSize:11, fontWeight:700, color:"rgba(155,215,90,0.55)", letterSpacing:".12em", textTransform:"uppercase" }}>Day {ITINERARY[activeDay].day}</div>
                  <div style={{ fontFamily:F, fontStyle:"italic", fontSize:22, fontWeight:800, color:"#fff", letterSpacing:"-.02em" }}>{ITINERARY[activeDay].title}</div>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {ITINERARY[activeDay].items.map((item,ii) => (
                  <div key={item} style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0, marginTop:2 }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:C.gLeaf, boxShadow:`0 0 8px ${C.gLeaf}60` }}/>
                      {ii < ITINERARY[activeDay].items.length-1 && <div style={{ width:1.5, height:24, background:`linear-gradient(to bottom,${C.gLeaf}60,transparent)`, marginTop:3 }}/>}
                    </div>
                    <span style={{ fontFamily:FB, fontSize:13.5, fontWeight:500, color:"rgba(195,235,145,0.80)", lineHeight:1.60 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 6. BEST TIME ═════════════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Best Time to Visit"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:36, letterSpacing:"-.03em" }}>
            When to Go to{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Sri Lanka</span>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr 1fr":isDesk?"repeat(4,1fr)":"1fr 1fr", gap:16 }}>
            {BEST_TIME.map(b => (
              <div key={b.month} style={{ borderRadius:18, padding:"22px 20px", background:b.active?"rgba(10,28,5,0.96)":"rgba(6,15,3,0.70)", border:`2px solid ${b.active?C.gLeaf+"45":"rgba(125,200,50,0.10)"}`, boxShadow:b.active?`0 8px 30px rgba(107,189,40,0.14)`:"none" }}>
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

      {/* ══ 7. TRAVEL TIPS ═══════════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Travel Tips"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:36, letterSpacing:"-.03em" }}>
            Good to Know Before{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>You Go</span>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isMobile?"1fr 1fr":"repeat(4,1fr)", gap:16 }}>
            {TIPS.map((t,i) => (
              <div key={t.title} className="tip-card" style={{ borderRadius:18, padding:"22px 20px", background:"rgba(6,18,3,0.88)", border:"1.5px solid rgba(125,200,50,0.13)", boxShadow:"0 4px 24px rgba(0,0,0,0.28)", opacity:0, animation:`fadeUp .55s ${i*0.08}s ease both` }}>
                <div style={{ fontSize:26, marginBottom:12 }}>{t.icon}</div>
                <div style={{ fontFamily:F, fontStyle:"italic", fontSize:16, fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.02em" }}>{t.title}</div>
                <div style={{ fontFamily:FB, fontSize:12.5, color:"rgba(175,220,115,0.58)", lineHeight:1.72 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 8. FAQ ════════════════════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="FAQ"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:36, letterSpacing:"-.03em" }}>
            Common{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Questions</span>
          </h2>
          <div style={{ display:"flex", flexDirection:"column", borderRadius:20, overflow:"hidden", border:"1px solid rgba(125,200,50,0.12)" }}>
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

      {/* ══ 9. BOTTOM CTA ════════════════════════════════════════════════ */}
      <div id="enquiry" style={{ position:"relative", overflow:"hidden", padding:`80px ${px} 96px` }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`url(${HERO_IMG})`, backgroundSize:"cover", backgroundPosition:"center 50%", filter:"brightness(0.14) saturate(1.6)", zIndex:0 }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#040E02 0%,rgba(4,14,2,0.0) 30%,rgba(4,14,2,0.0) 70%,#040E02 100%)", zIndex:1 }}/>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 70% 60% at 50% 50%,rgba(46,128,16,0.16) 0%,transparent 65%)`, zIndex:2 }}/>

        <Section style={{ position:"relative", zIndex:10, maxWidth:700, margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
            <Eyebrow text="Book Now"/>
          </div>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"28px":isMobile?"36px":"52px", fontWeight:800, color:"#fff", letterSpacing:"-.034em", lineHeight:1.04, marginBottom:16, textShadow:"0 4px 32px rgba(0,0,0,0.55)" }}>
            Ready for Your{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 45%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Sri Lanka Adventure?</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:isXS?13:14.5, color:"rgba(180,225,130,0.62)", lineHeight:1.80, marginBottom:36 }}>
            Our Sri Lanka specialists will craft your perfect itinerary — including visa support, airport transfers and local guidance — completely free, with no advance payment needed. We call back within 2 hours.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:28 }}>
            <a href="tel:+919876543210" className="cta-btn" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"13px 22px":"16px 34px", borderRadius:14, border:"none", background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color:C.gDeep, cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:10, boxShadow:`0 10px 32px ${C.gLeaf}55` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call Us Free
            </a>
            <a href="https://wa.me/919876543210?text=Hi! I want to plan a trip to Sri Lanka." target="_blank" rel="noreferrer" className="cta-btn" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"12px 20px":"15px 28px", borderRadius:14, border:"2px solid rgba(37,211,102,0.45)", background:"rgba(37,211,102,0.10)", color:"rgba(37,211,102,0.95)", cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, backdropFilter:"blur(10px)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z"/></svg>
              WhatsApp Us
            </a>
          </div>

          <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:isXS?14:24 }}>
            {["✅ Visa support included","🔒 No advance needed","⚡ 2-hr reply"].map(t => (
              <span key={t} style={{ fontFamily:FB, fontSize:12, fontWeight:600, color:"rgba(170,220,110,0.55)" }}>{t}</span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}