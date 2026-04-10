"use client";
import { useState, useEffect, useRef, ReactNode } from "react";

/* ─── Design Tokens ──────────────────────────────────────────────────── */
const C = {
  gDeep: "#0F3D06", gDark: "#1A5C0A", gMid: "#2E8010",
  gLeaf: "#6BBD28", gLight: "#96D94A",
  amber: "#F59E0B", amberDim: "rgba(245,158,11,0.18)",
  sky: "#38BDF8",   skyDim:   "rgba(56,189,248,0.16)",
};
const F  = "'Playfair Display', Georgia, serif";
const FB = "'DM Sans', 'Segoe UI', sans-serif";

const HERO_IMG = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&q=85&fit=crop";

/* ─── Data ──────────────────────────────────────────────────────────── */
const STATS = [
  { icon:"👥", val:"1,200+", label:"Groups Served"    },
  { icon:"⭐", val:"4.9",    label:"Avg Rating"        },
  { icon:"💰", val:"₹2,999", label:"Per Person From"   },
  { icon:"🎯", val:"15–50",  label:"Ideal Group Size"  },
];

const GROUP_TYPES = [
  { icon:"🎓", label:"College Trips"    },
  { icon:"🏢", label:"Corporate Outings"},
  { icon:"👨‍👩‍👧", label:"Large Families"  },
  { icon:"🤝", label:"Friends Groups"   },
  { icon:"⛪", label:"Pilgrimage Tours" },
  { icon:"🎉", label:"Reunion Trips"    },
];

const PACKAGES = [
  {
    id: "ooty-kodai-group",
    badge: "Best Seller",
    badgeBg: "rgba(107,189,40,0.20)",
    badgeTxt: C.gLeaf,
    name: "Ooty & Kodaikanal Group Tour",
    tagline: "Twin Hills · Cool Air · Great Fun",
    duration: "3 Nights / 4 Days",
    destinations: ["Ooty", "Kodaikanal"],
    price: "₹4,499",
    unit: "per person (min 15 pax)",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85&fit=crop",
    groupSize: "15–50 people",
    groupIcon: "🏔️",
    type: "Hill Station",
    highlights: ["Ooty Toy Train 🚂", "Botanical Garden 🌸", "Kodai Lake Boating 🚣", "Pine Forest Walk 🌲", "Group Campfire Night 🔥"],
    included: [
      "3 nights group accommodation",
      "Breakfast & dinner daily",
      "Dedicated Tempo Traveller / Bus",
      "All sightseeing & entry fees",
      "Group coordinator on tour",
      "Bonfire & DJ night (on request)",
    ],
    rating: "4.9", reviews: "980",
  },
  {
    id: "kerala-group",
    badge: "Editor's Pick",
    badgeBg: C.skyDim,
    badgeTxt: C.sky,
    name: "Kerala Group Escape",
    tagline: "Munnar · Thekkady · Alleppey",
    duration: "5 Nights / 6 Days",
    destinations: ["Munnar", "Thekkady", "Alleppey"],
    price: "₹8,999",
    unit: "per person (min 20 pax)",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&q=85&fit=crop",
    groupSize: "20–60 people",
    groupIcon: "🌿",
    type: "Nature & Wildlife",
    highlights: ["Tea Garden Walk 🍃", "Elephant Safari 🐘", "Houseboat Cruise 🛥️", "Wildlife Jeep Safari 🦁", "Backwater Sunset 🌅"],
    included: [
      "5 nights resort/hotel stays",
      "All meals included",
      "Private AC coach",
      "Elephant interaction experience",
      "Houseboat group cruise",
      "Group trip manager throughout",
    ],
    rating: "4.9", reviews: "760",
  },
  {
    id: "rajasthan-group",
    badge: "Heritage Tour",
    badgeBg: C.amberDim,
    badgeTxt: C.amber,
    name: "Rajasthan Grand Group Tour",
    tagline: "Jaipur · Jodhpur · Udaipur · Jaisalmer",
    duration: "7 Nights / 8 Days",
    destinations: ["Jaipur", "Jodhpur", "Udaipur", "Jaisalmer"],
    price: "₹14,999",
    unit: "per person (min 20 pax)",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=85&fit=crop",
    groupSize: "20–80 people",
    groupIcon: "🏰",
    type: "Heritage & Culture",
    highlights: ["Amber Fort 🏰", "Desert Safari 🐪", "Folk Dance Show 🎭", "Lake Pichola Cruise ⛵", "Group Camel Ride 🐪"],
    included: [
      "7 nights heritage hotel stays",
      "All meals throughout",
      "Luxury coach with guide",
      "All fort & monument entries",
      "Camel safari + bonfire night",
      "Dedicated group escort",
    ],
    rating: "4.8", reviews: "540",
  },
  {
    id: "himachal-group",
    badge: "Snow Special",
    badgeBg: "rgba(125,211,252,0.16)",
    badgeTxt: "#7dd3fc",
    name: "Himachal Snow Group Tour",
    tagline: "Shimla · Manali · Solang Valley",
    duration: "6 Nights / 7 Days",
    destinations: ["Shimla", "Manali", "Solang"],
    price: "₹11,999",
    unit: "per person (min 15 pax)",
    img: "https://images.unsplash.com/photo-1573143804538-fbd5d0a59f98?w=900&q=85&fit=crop",
    groupSize: "15–50 people",
    groupIcon: "❄️",
    type: "Snow & Adventure",
    highlights: ["Rohtang Pass ❄️", "Solang Valley Skiing ⛷️", "Shimla Toy Train 🚂", "River Rafting 🚣", "Group Snow Fight ☃️"],
    included: [
      "6 nights snow-view hotels",
      "All meals included",
      "Volvo + local bus transfers",
      "Snow gear & activity package",
      "Group games & DJ night",
      "Medical support on tour",
    ],
    rating: "4.8", reviews: "620",
  },
  {
    id: "goa-group",
    badge: "Party Favourite",
    badgeBg: "rgba(236,72,153,0.16)",
    badgeTxt: "#f472b6",
    name: "Goa Group Beach Party",
    tagline: "Sun · Sand · Parties · Memories",
    duration: "3 Nights / 4 Days",
    destinations: ["North Goa", "South Goa"],
    price: "₹5,999",
    unit: "per person (min 15 pax)",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=85&fit=crop",
    groupSize: "15–100 people",
    groupIcon: "🏖️",
    type: "Beach Holiday",
    highlights: ["Baga & Calangute Beach 🏖️", "Water Sports 🤿", "Sunset Cruise 🚢", "Casino Night 🎰", "Group Beach BBQ 🍢"],
    included: [
      "3 nights beach resort",
      "Breakfast daily",
      "AC coach transfers",
      "Water sports group package",
      "Sunset cruise",
      "Private group beach BBQ night",
    ],
    rating: "4.9", reviews: "1,140",
  },
  {
    id: "andaman-group",
    badge: "Island Adventure",
    badgeBg: "rgba(16,185,129,0.16)",
    badgeTxt: "#6ee7b7",
    name: "Andaman Group Expedition",
    tagline: "Islands · Coral · Crystal Waters",
    duration: "5 Nights / 6 Days",
    destinations: ["Port Blair", "Havelock", "Neil Island"],
    price: "₹16,999",
    unit: "per person (min 15 pax)",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85&fit=crop",
    groupSize: "15–40 people",
    groupIcon: "🏝️",
    type: "Island & Beach",
    highlights: ["Radhanagar Beach 🏖️", "Group Snorkelling 🐠", "Glass-bottom Boat 🚤", "Scuba Diving 🤿", "Cellular Jail Sound & Light Show 🌅"],
    included: [
      "5 nights island resorts",
      "Daily breakfast & dinner",
      "All ferry & transfer tickets",
      "Group snorkelling + glass boat",
      "Sound & light show entry",
      "Group travel coordinator",
    ],
    rating: "4.9", reviews: "420",
  },
  {
    id: "corporate-south",
    badge: "Corporate Special",
    badgeBg: "rgba(99,153,238,0.18)",
    badgeTxt: "#82b4f5",
    name: "South India Corporate Retreat",
    tagline: "Team Building · Refresh · Reconnect",
    duration: "2 Nights / 3 Days",
    destinations: ["Coorg", "Wayanad", "Kodaikanal"],
    price: "₹5,499",
    unit: "per person (min 20 pax)",
    img: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=900&q=85&fit=crop",
    groupSize: "20–200 people",
    groupIcon: "🏢",
    type: "Corporate",
    highlights: ["Team building activities 🤝", "Nature hike & outdoor games 🏕️", "Resort bonfire & networking 🔥", "Estate / plantation tour 🌿", "Customisable agenda"],
    included: [
      "2 nights resort stay",
      "All meals",
      "AC coach transfers",
      "Team building facilitator",
      "Customisable activity plan",
      "Event coordinator & AV support",
    ],
    rating: "4.8", reviews: "310",
  },
  {
    id: "pilgrimage-south",
    badge: "Pilgrimage Tour",
    badgeBg: "rgba(251,191,36,0.16)",
    badgeTxt: "#fcd34d",
    name: "South India Pilgrimage Circuit",
    tagline: "Tirupati · Madurai · Rameswaram · Kanyakumari",
    duration: "5 Nights / 6 Days",
    destinations: ["Tirupati", "Madurai", "Rameswaram", "Kanyakumari"],
    price: "₹6,499",
    unit: "per person (min 20 pax)",
    img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=900&q=85&fit=crop",
    groupSize: "20–100 people",
    groupIcon: "🛕",
    type: "Pilgrimage",
    highlights: ["Tirupati Darshan 🛕", "Meenakshi Temple 🌸", "Rameswaram Corridor 🌊", "Kanyakumari Sunrise 🌅", "Special puja arrangements"],
    included: [
      "5 nights hotel/dharamshala",
      "Vegetarian all meals",
      "AC sleeper coach",
      "Darshan ticket assistance",
      "Priest / puja arrangements",
      "Dedicated pilgrimage guide",
    ],
    rating: "4.9", reviews: "880",
  },
  {
    id: "north-india-group",
    badge: "Grand Tour",
    badgeBg: "rgba(167,139,250,0.18)",
    badgeTxt: "#c4b5fd",
    name: "North India Golden Triangle",
    tagline: "Delhi · Agra · Jaipur · Varanasi",
    duration: "7 Nights / 8 Days",
    destinations: ["Delhi", "Agra", "Jaipur", "Varanasi"],
    price: "₹12,999",
    unit: "per person (min 20 pax)",
    img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&q=85&fit=crop",
    groupSize: "20–80 people",
    groupIcon: "🕌",
    type: "Heritage & Culture",
    highlights: ["Taj Mahal sunrise 🌅", "Red Fort 🏯", "Ganga Aarti Varanasi 🪔", "Amber Fort Jaipur 🏰", "Qutub Minar 🗼"],
    included: [
      "7 nights hotel stays",
      "All meals",
      "AC luxury coach",
      "All monument entry fees",
      "Licensed English guide",
      "Varanasi boat aarti experience",
    ],
    rating: "4.8", reviews: "690",
  },
];

const TAGS = ["All", "Hill Station", "Nature & Wildlife", "Heritage & Culture", "Beach Holiday", "Snow & Adventure", "Island & Beach", "Corporate", "Pilgrimage"];

const WHY_GROUP = [
  { icon:"🚌", title:"Fleet for Any Size",       desc:"From 15-seater Tempo Travellers to 50-seater luxury coaches — we match the vehicle to your group size perfectly, with backup arrangements always in place." },
  { icon:"💰", title:"Group Pricing Advantage",   desc:"The bigger the group, the better the price. Groups of 30+ get automatic tiered discounts. We&apos;ll always quote the best possible per-head rate." },
  { icon:"📋", title:"Single-Point Coordination", desc:"One dedicated group coordinator handles everything — hotel check-ins, restaurant bookings, activity slots, payments. Your group just shows up and enjoys." },
  { icon:"🎯", title:"Fully Customisable Plan",   desc:"Add a team-building activity, swap a destination, arrange a DJ night, or plan a surprise birthday. Every group itinerary is built around your group&apos;s personality." },
  { icon:"🏨", title:"Group Room Allocations",    desc:"We pre-negotiate group blocks at hotels so your entire group stays together. No scattered rooms, no surprises at check-in." },
  { icon:"🛡️", title:"Safety & Insurance",        desc:"All group packages include travel insurance, emergency contact support, and driver safety checks. College trips include a faculty/group leader coordination service." },
];

const TESTIMONIALS = [
  { name:"Rahul & 28 Friends",     city:"Coimbatore",  rating:5, trip:"Goa Group Beach Party",         avatar:"🎉", text:"28 of us from college — every single person had an absolute blast. The beach BBQ night was legendary. Coordinator was super responsive even at midnight when we needed a cab." },
  { name:"TechCorp India — HR Team", city:"Bangalore", rating:5, trip:"South India Corporate Retreat",  avatar:"🏢", text:"We took 45 employees to Coorg for our annual offsite. The team building activities were genuinely fun, the resort was beautiful, and everything ran on time. Will definitely book again." },
  { name:"Sri Murugan Bhakta Mandal", city:"Chennai",  rating:5, trip:"South India Pilgrimage Circuit", avatar:"🛕", text:"65 devotees, smooth darshan at all temples, vegetarian food at every stop, comfortable AC coach. Everything arranged exactly as promised. Truly blessed trip." },
];

const FAQS = [
  { q:"What is the minimum group size for a group package?",            a:"Most packages require a minimum of 15 people. Some special packages (corporate retreats, pilgrimage tours) have a minimum of 20. For smaller groups of 8–14, we can offer semi-group or private departures — just ask." },
  { q:"Do you offer fixed departure group tours?",                      a:"Yes! We run fixed-departure group tours on popular routes every weekend and during peak season. These are shared with other travellers and are available from ₹2,999 per person. Contact us for the schedule." },
  { q:"How do we manage payments for a large group?",                   a:"We accept a 20% group deposit to block dates, with the balance due 7 days before travel. We can issue individual invoices or a single consolidated invoice — whatever works for your group organiser." },
  { q:"Can we customise activities for a college trip?",                a:"Absolutely. Popular college add-ons include DJ nights, adventure activities, group games, bonfires, and themed dinners. Just share your group&apos;s vibe and we&apos;ll build around it." },
  { q:"What vehicles do you use for large groups?",                     a:"For 15–25 people: Tempo Traveller or Force Urbania. For 26–50: 35-seater mini-coach. For 50+: full luxury coach. All vehicles are AC, GPS-tracked, with experienced commercial licence drivers." },
  { q:"Is there a discount for very large groups (50+ people)?",        a:"Yes — groups of 50+ receive a special large-group rate with enhanced inclusions (extra activities, complimentary room upgrades, dedicated escort). Call us for a custom quote." },
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
      <span style={{ color:C.gLeaf }}>Group Packages</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function GroupPackagesPage() {
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

  const filtered = activeTag === "All" ? PACKAGES : PACKAGES.filter(p => p.type === activeTag);

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
        @keyframes countBounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes crowdWave { 0%,100%{transform:translateY(0)} 25%{transform:translateY(-6px)} 75%{transform:translateY(4px)} }

        .pkg-card  { transition:all .32s cubic-bezier(.22,1,.36,1); }
        .pkg-card:hover  { transform:translateY(-10px)!important; box-shadow:0 28px 80px rgba(0,0,0,0.58)!important; }
        .pkg-card:hover .pkg-img { transform:scale(1.07)!important; }
        .pkg-img   { transition:transform .50s cubic-bezier(.22,1,.36,1); }
        .why-card  { transition:all .26s; }
        .why-card:hover  { transform:translateY(-4px); border-color:rgba(107,189,40,0.40)!important; background:rgba(12,32,6,0.98)!important; }
        .filter-btn { transition:all .22s; cursor:pointer; }
        .filter-btn:hover { background:rgba(107,189,40,0.12)!important; }
        .faq-row   { transition:all .22s; cursor:pointer; }
        .faq-row:hover   { background:rgba(107,189,40,0.06)!important; }
        .cta-btn   { transition:all .26s; }
        .cta-btn:hover   { transform:translateY(-3px); }
        .testi-card { transition:all .26s; }
        .testi-card:hover { transform:translateY(-4px); border-color:rgba(107,189,40,0.35)!important; }
        .type-pill  { transition:all .22s; cursor:pointer; }
        .type-pill:hover { transform:translateY(-2px); background:rgba(107,189,40,0.14)!important; }
      `}</style>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position:"relative", minHeight:isXS?"88vh":"100vh", overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:`url(${HERO_IMG})`, backgroundSize:"cover", backgroundPosition:"center 38%", transform:mounted?"scale(1)":"scale(1.07)", transition:"transform 2.2s cubic-bezier(.22,1,.36,1)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:1, background:"rgba(3,10,1,0.55)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:2, background:"linear-gradient(180deg,rgba(4,12,2,0.92) 0%,rgba(4,10,2,0.04) 42%,rgba(4,12,2,0.88) 100%)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none", background:`radial-gradient(ellipse 72% 55% at 50% 88%, rgba(46,128,16,0.22) 0%,transparent 65%)` }}/>
        {/* Amber accent glow */}
        <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none", background:`radial-gradient(ellipse 50% 40% at 15% 30%, rgba(245,158,11,0.06) 0%,transparent 65%)` }}/>
        {/* Noise */}
        <div style={{ position:"absolute", inset:0, zIndex:4, pointerEvents:"none", opacity:.025, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"200px" }}/>

        <div style={{ position:"relative", zIndex:10, maxWidth:maxW, margin:"0 auto", width:"100%", padding:`0 ${px}`, flex:1, display:"flex", flexDirection:"column", justifyContent:"center", paddingTop:isMobile?"90px":"80px", paddingBottom:isMobile?"64px":"80px" }}>

          <div style={{ marginBottom:20, animation:heroVis?"slideDown .55s ease both":"none" }}>
            <Breadcrumb/>
          </div>

          {/* Pill */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:20, animation:heroVis?"fadeUp .55s .05s ease both":"none" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 16px", borderRadius:100, background:"rgba(107,189,40,0.11)", border:"1.5px solid rgba(107,189,40,0.28)", backdropFilter:"blur(12px)" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:C.gLeaf, display:"inline-block", animation:"pulse 2s infinite", boxShadow:`0 0 8px ${C.gLeaf}` }}/>
              <span style={{ fontFamily:FB, fontSize:isXS?10:11, fontWeight:700, color:C.gLeaf, letterSpacing:".18em", textTransform:"uppercase" }}>Groups of 15–200 · All India</span>
            </div>
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily:F, fontStyle:"italic", fontWeight:800, fontSize:isXS?"34px":isMobile?"48px":isTablet?"64px":"82px", lineHeight:.97, letterSpacing:"-.038em", color:"#fff", margin:"0 0 8px", textShadow:"0 4px 40px rgba(0,0,0,0.55)", animation:heroVis?"fadeUp .62s .10s ease both":"none" }}>
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 38%,${C.gLight} 65%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Group</span>
          </h1>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontWeight:700, fontSize:isXS?"17px":isMobile?"21px":"28px", color:"rgba(200,240,150,0.68)", margin:"0 0 20px", letterSpacing:"-.02em", animation:heroVis?"fadeUp .62s .14s ease both":"none" }}>
            Tour Packages
          </h2>

          <p style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:500, color:"rgba(185,228,130,0.60)", maxWidth:570, lineHeight:1.84, margin:"0 0 36px", animation:heroVis?"fadeUp .62s .18s ease both":"none" }}>
            College groups, corporate teams, large families, pilgrimage batches, friends on a reunion — whoever your group is, we&apos;ve got a package built exactly for you. 9 destinations, dedicated group coordinators, and pricing that gets better the more you are.
          </p>

          {/* Stats */}
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
              View All Packages
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#enquiry" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"12px 20px":"14px 26px", borderRadius:14, border:"2px solid rgba(107,189,40,0.35)", background:"rgba(107,189,40,0.09)", color:"rgba(150,217,74,0.95)", cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, backdropFilter:"blur(10px)", transition:"all .26s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(107,189,40,0.18)";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(107,189,40,0.09)";e.currentTarget.style.transform="none";}}
            >
              Get Group Quote
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

      {/* ══ 2. GROUP TYPES STRIP ══════════════════════════════════════════ */}
      <div style={{ background:"rgba(6,18,3,0.95)", borderTop:"1px solid rgba(125,200,50,0.10)", borderBottom:"1px solid rgba(125,200,50,0.10)" }}>
        <div style={{ maxWidth:maxW, margin:"0 auto", padding:`28px ${px}` }}>
          <p style={{ fontFamily:FB, fontSize:11, fontWeight:700, color:"rgba(155,210,90,0.40)", letterSpacing:".16em", textTransform:"uppercase", textAlign:"center", marginBottom:18 }}>We Specialise In</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
            {GROUP_TYPES.map(g => (
              <div key={g.label} className="type-pill" style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 18px", borderRadius:100, background:"rgba(107,189,40,0.08)", border:"1.5px solid rgba(107,189,40,0.18)" }}>
                <span style={{ fontSize:15 }}>{g.icon}</span>
                <span style={{ fontFamily:FB, fontSize:12, fontWeight:700, color:"rgba(190,235,140,0.72)", letterSpacing:".04em" }}>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 3. PACKAGES GRID ══════════════════════════════════════════════ */}
      <div id="packages" style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Group Packages"/>
          <div style={{ display:"flex", flexDirection:isMobile?"column":"row", alignItems:isMobile?"flex-start":"flex-end", justifyContent:"space-between", gap:20, marginBottom:40 }}>
            <div>
              <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
                Find Your{" "}
                <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Group Adventure</span>
              </h2>
              <p style={{ fontFamily:FB, fontSize:13, color:"rgba(175,225,120,0.55)", lineHeight:1.70 }}>
                {filtered.length} package{filtered.length!==1?"s":""} · All prices per person · Better rates for larger groups
              </p>
            </div>
            {/* Filter pills */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {TAGS.map(t => (
                <button key={t} className="filter-btn" onClick={() => setActiveTag(t)}
                  style={{ padding:"8px 14px", borderRadius:100, border:`1.5px solid ${activeTag===t?C.gLeaf+"70":"rgba(125,200,50,0.18)"}`, background:activeTag===t?"rgba(107,189,40,0.16)":"rgba(6,18,3,0.70)", fontFamily:FB, fontSize:11.5, fontWeight:700, color:activeTag===t?C.gLeaf:"rgba(165,215,100,0.55)", letterSpacing:".04em" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:24 }}>
            {filtered.map((pkg, i) => (
              <div key={pkg.id} className="pkg-card"
                style={{ borderRadius:22, overflow:"hidden", background:"rgba(6,18,3,0.92)", border:"1.5px solid rgba(125,200,50,0.13)", boxShadow:"0 6px 32px rgba(0,0,0,0.35)", opacity:0, animation:`fadeUp .55s ${i*0.07}s ease both`, position:"relative" }}
                onMouseEnter={() => setHovered(pkg.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Image */}
                <div style={{ height:isXS?196:224, overflow:"hidden", position:"relative" }}>
                  <div className="pkg-img" style={{ width:"100%", height:"100%", backgroundImage:`url(${pkg.img})`, backgroundSize:"cover", backgroundPosition:"center" }}/>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(4,12,2,0.84) 0%,transparent 52%)" }}/>
                  {/* Badge */}
                  <div style={{ position:"absolute", top:14, left:14, padding:"5px 12px", borderRadius:100, background:pkg.badgeBg, border:`1px solid ${pkg.badgeTxt}40`, backdropFilter:"blur(8px)" }}>
                    <span style={{ fontFamily:FB, fontSize:10, fontWeight:800, color:pkg.badgeTxt, letterSpacing:".10em", textTransform:"uppercase" }}>{pkg.badge}</span>
                  </div>
                  {/* Group size tag */}
                  <div style={{ position:"absolute", top:14, right:14, padding:"5px 12px", borderRadius:100, background:"rgba(4,12,2,0.78)", border:"1px solid rgba(125,200,50,0.22)", backdropFilter:"blur(8px)" }}>
                    <span style={{ fontFamily:FB, fontSize:11, fontWeight:700, color:"rgba(165,215,100,0.80)" }}>👥 {pkg.groupSize}</span>
                  </div>
                  {/* Bottom overlay */}
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 18px" }}>
                    <div style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:"rgba(165,215,100,0.60)", letterSpacing:".12em", textTransform:"uppercase", marginBottom:3 }}>{pkg.tagline}</div>
                    <div style={{ fontFamily:F, fontStyle:"italic", fontSize:21, fontWeight:800, color:"#fff", letterSpacing:"-.02em", textShadow:"0 2px 12px rgba(0,0,0,0.6)" }}>{pkg.name}</div>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding:"18px 20px 22px" }}>
                  {/* Duration */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12, flexWrap:"wrap", gap:8 }}>
                    <div style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"rgba(165,215,100,0.60)", letterSpacing:".08em", textTransform:"uppercase" }}>{pkg.duration}</div>
                    <div style={{ fontFamily:FB, fontSize:11, fontWeight:700, color:"rgba(150,200,90,0.50)", letterSpacing:".06em" }}>{pkg.groupIcon} {pkg.type}</div>
                  </div>

                  {/* Destinations */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                    {pkg.destinations.map(d => (
                      <span key={d} style={{ fontFamily:FB, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:100, background:"rgba(107,189,40,0.10)", border:"1px solid rgba(107,189,40,0.22)", color:"rgba(165,215,100,0.70)" }}>📍 {d}</span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
                    {pkg.highlights.slice(0,4).map(h => (
                      <div key={h} style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:5, height:5, borderRadius:"50%", background:`${C.gLeaf}70`, flexShrink:0 }}/>
                        <span style={{ fontFamily:FB, fontSize:12, fontWeight:500, color:"rgba(185,228,130,0.65)" }}>{h}</span>
                      </div>
                    ))}
                    {pkg.highlights.length>4 && <span style={{ fontFamily:FB, fontSize:11, color:"rgba(140,190,80,0.45)", paddingLeft:13 }}>+{pkg.highlights.length-4} more</span>}
                  </div>

                  <div style={{ height:1, background:"rgba(125,200,50,0.10)", marginBottom:14 }}/>

                  {/* Inclusions */}
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
                      <div style={{ fontFamily:FB, fontSize:9.5, fontWeight:600, color:"rgba(155,210,90,0.45)", letterSpacing:".08em", textTransform:"uppercase" }}>From</div>
                      <div style={{ fontFamily:F, fontStyle:"italic", fontSize:22, fontWeight:800, color:C.gLeaf, letterSpacing:"-.02em" }}>{pkg.price}</div>
                      <div style={{ fontFamily:FB, fontSize:9.5, color:"rgba(140,190,80,0.45)" }}>{pkg.unit}</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <a href="#enquiry" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px", borderRadius:12, background:hovered===pkg.id?`linear-gradient(135deg,${C.gLeaf},${C.gMid})`:"rgba(107,189,40,0.10)", color:hovered===pkg.id?C.gDeep:C.gLeaf, border:hovered===pkg.id?"none":"1.5px solid rgba(107,189,40,0.24)", fontFamily:FB, fontSize:13, fontWeight:700, letterSpacing:".04em", transition:"all .26s", textDecoration:"none" }}>
                    Get Group Quote
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 4. GROUP PRICING BANNER ══════════════════════════════════════ */}
      <div style={{ padding:`0 ${px} 72px`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <div style={{ borderRadius:24, overflow:"hidden", background:"linear-gradient(135deg,rgba(10,30,5,0.98),rgba(6,20,3,0.98))", border:`1.5px solid ${C.gLeaf}35`, padding:isXS?"24px":"40px 48px", position:"relative" }}>
            {/* Decorative glow */}
            <div style={{ position:"absolute", top:0, right:0, width:"40%", height:"100%", background:`radial-gradient(ellipse at right,${C.gLeaf}12,transparent 65%)`, pointerEvents:"none" }}/>
            <div style={{ position:"relative", zIndex:1 }}>
              <Eyebrow text="Group Discount"/>
              <h3 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"22px":isMobile?"28px":"36px", fontWeight:800, color:"#fff", marginBottom:24, letterSpacing:"-.03em" }}>
                The More You Are,{" "}
                <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>The Less You Pay</span>
              </h3>
              <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr 1fr":isDesk?"repeat(4,1fr)":"1fr 1fr", gap:16 }}>
                {[
                  { range:"15–24 pax", discount:"Standard Rate",   color:C.gLeaf,   note:"Base group pricing" },
                  { range:"25–39 pax", discount:"5% Off",          color:"#86EFAC",  note:"Auto-applied discount" },
                  { range:"40–59 pax", discount:"10% Off",         color:"#C8F060",  note:"+ complimentary activities" },
                  { range:"60+ pax",   discount:"Custom Quote",    color:C.amber,    note:"Best possible rate + perks" },
                ].map(tier => (
                  <div key={tier.range} style={{ borderRadius:16, padding:"20px 18px", background:"rgba(4,12,2,0.70)", border:`1.5px solid ${tier.color}30`, textAlign:"center" }}>
                    <div style={{ fontFamily:FB, fontSize:11, fontWeight:700, color:"rgba(165,215,100,0.50)", letterSpacing:".10em", textTransform:"uppercase", marginBottom:8 }}>{tier.range}</div>
                    <div style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?18:22, fontWeight:800, color:tier.color, marginBottom:6 }}>{tier.discount}</div>
                    <div style={{ fontFamily:FB, fontSize:11, color:"rgba(165,215,100,0.45)" }}>{tier.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 5. WHY CHOOSE US ══════════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Why Choose Us"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            Built for{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Large Groups</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>
            Managing a group holiday is hard. We&apos;ve done it 1,200+ times — here&apos;s what we&apos;ve perfected.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isMobile?"1fr 1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:isXS?14:18 }}>
            {WHY_GROUP.map((w, i) => (
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

      {/* ══ 6. TESTIMONIALS ══════════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Group Stories"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            Groups That{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Loved It</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>Real groups. Real trips. Real laughs.</p>
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

      {/* ══ 7. FAQ ════════════════════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="FAQ"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:36, letterSpacing:"-.03em" }}>
            Group Travel{" "}
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

      {/* ══ 8. BOTTOM CTA ════════════════════════════════════════════════ */}
      <div id="enquiry" style={{ position:"relative", overflow:"hidden", padding:`80px ${px} 96px` }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`url(${HERO_IMG})`, backgroundSize:"cover", backgroundPosition:"center 50%", filter:"brightness(0.13) saturate(1.6)", zIndex:0 }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#040E02 0%,rgba(4,14,2,0.0) 28%,rgba(4,14,2,0.0) 72%,#040E02 100%)", zIndex:1 }}/>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 70% 60% at 50% 50%,rgba(46,128,16,0.16) 0%,transparent 65%)`, zIndex:2 }}/>

        <Section style={{ position:"relative", zIndex:10, maxWidth:700, margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
            <Eyebrow text="Plan Your Group Trip"/>
          </div>
          <div style={{ fontSize:36, marginBottom:14 }}>👥</div>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"28px":isMobile?"36px":"52px", fontWeight:800, color:"#fff", letterSpacing:"-.034em", lineHeight:1.04, marginBottom:16, textShadow:"0 4px 32px rgba(0,0,0,0.55)" }}>
            Let&apos;s Plan Your{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 45%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Group Trip</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:isXS?13:14.5, color:"rgba(180,225,130,0.62)", lineHeight:1.80, marginBottom:36 }}>
            Tell us your group size, travel dates, and destination preference — we&apos;ll send a detailed itinerary and per-head price within 2 hours. No advance payment to enquire.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:28 }}>
            <a href="tel:+919876543210" className="cta-btn" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"13px 22px":"16px 34px", borderRadius:14, border:"none", background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color:C.gDeep, cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:10, boxShadow:`0 10px 32px ${C.gLeaf}55` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call Us Free
            </a>
            <a href="https://wa.me/919876543210?text=Hi! I want to plan a group tour package." target="_blank" rel="noreferrer" className="cta-btn" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"12px 20px":"15px 28px", borderRadius:14, border:"2px solid rgba(37,211,102,0.45)", background:"rgba(37,211,102,0.10)", color:"rgba(37,211,102,0.95)", cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, backdropFilter:"blur(10px)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z"/></svg>
              WhatsApp Us
            </a>
          </div>

          <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:isXS?14:24 }}>
            {["✅ Free group quote","🔒 No advance needed","⚡ 2-hr callback","👥 Groups of 15–200"].map(t => (
              <span key={t} style={{ fontFamily:FB, fontSize:12, fontWeight:600, color:"rgba(170,220,110,0.55)" }}>{t}</span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}