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
const HERO_IMG = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&q=85&fit=crop";

/* ─── Data ──────────────────────────────────────────────────────────── */
const HIGHLIGHTS = [
  { icon:"👨‍👩‍👧‍👦", val:"500+",   label:"Family Trips"     },
  { icon:"⭐",        val:"4.9",    label:"Avg Rating"       },
  { icon:"💰",        val:"₹3,499", label:"Starting Price"   },
  { icon:"🛡️",        val:"100%",   label:"Safe & Verified"  },
];

const PACKAGES = [
  {
    id: "ooty-kodai",
    badge: "Best Seller",
    badgeColor: C.gLeaf,
    badgeTxt: C.gDeep,
    name: "Ooty & Kodaikanal Family Trail",
    tagline: "Twin Hills · Cool Air · Happy Kids",
    duration: "4 Nights / 5 Days",
    destinations: ["Ooty", "Kodaikanal"],
    price: "₹8,999",
    unit: "per person (family of 4)",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85&fit=crop",
    highlights: ["Ooty Toy Train 🚂", "Botanical Garden 🌸", "Kodai Lake Boating 🚣", "Bryant Park 🌳", "Silver Cascade 💧"],
    included: [
      "4 nights family room stay",
      "Daily breakfast & dinner",
      "AC vehicle with child seats",
      "All sightseeing & entry fees",
      "Kids activity kit included",
      "Dedicated family guide",
    ],
    rating: "4.9", reviews: "1,840",
    ageGroup: "All ages · Toddlers to Grandparents",
    tag: "Hill Station",
  },
  {
    id: "kerala-family",
    badge: "Editor's Pick",
    badgeColor: "rgba(99,153,238,0.22)",
    badgeTxt: "#82b4f5",
    name: "Kerala Family Magic",
    tagline: "Munnar · Thekkady · Alleppey Backwaters",
    duration: "6 Nights / 7 Days",
    destinations: ["Munnar", "Thekkady", "Alleppey"],
    price: "₹14,999",
    unit: "per person (family of 4)",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&q=85&fit=crop",
    highlights: ["Tea Garden Walk 🍃", "Elephant Safari 🐘", "Houseboat Stay 🛥️", "Wildlife Jeep Safari 🦁", "Spice Plantation Tour 🌿"],
    included: [
      "6 nights incl. 1 houseboat night",
      "All meals throughout",
      "Elephant encounter experience",
      "Private AC Innova / Tempo",
      "Guided jungle trek (kids-safe)",
      "Trip manager 24/7",
    ],
    rating: "4.9", reviews: "2,310",
    ageGroup: "Ages 5+ recommended",
    tag: "Nature & Wildlife",
  },
  {
    id: "rajasthan-family",
    badge: "Most Popular",
    badgeColor: "rgba(245,158,11,0.20)",
    badgeTxt: "#F59E0B",
    name: "Rajasthan Royal Family Tour",
    tagline: "Jaipur · Jodhpur · Udaipur · Jaisalmer",
    duration: "7 Nights / 8 Days",
    destinations: ["Jaipur", "Jodhpur", "Udaipur", "Jaisalmer"],
    price: "₹18,999",
    unit: "per person (family of 4)",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=85&fit=crop",
    highlights: ["Amber Fort Elephant Ride 🐘", "Desert Camel Safari 🐪", "Boat Ride Lake Pichola ⛵", "Mehrangarh Fort 🏰", "Cultural Folk Show 🎭"],
    included: [
      "7 nights palace / heritage hotels",
      "All meals included",
      "Luxury private coach",
      "Camel safari & bonfire night",
      "Entry to all forts & palaces",
      "Kids heritage storytelling tours",
    ],
    rating: "4.8", reviews: "1,620",
    ageGroup: "Ages 6+ recommended",
    tag: "Heritage & Culture",
  },
  {
    id: "goa-family",
    badge: "Beach Escape",
    badgeColor: "rgba(34,211,238,0.18)",
    badgeTxt: "#67e8f9",
    name: "Goa Family Beach Holiday",
    tagline: "Sun · Sand · Seafood · Fun",
    duration: "4 Nights / 5 Days",
    destinations: ["North Goa", "South Goa"],
    price: "₹9,499",
    unit: "per person (family of 4)",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=85&fit=crop",
    highlights: ["Calangute & Baga Beach 🏖️", "Dudhsagar Waterfalls 💦", "Old Goa Churches ⛪", "Water Sports 🏄", "Cruise Dinner 🚢"],
    included: [
      "4 nights beachside resort",
      "Breakfast & dinner daily",
      "AC vehicle all days",
      "Water sports for kids (safe)",
      "Sunset cruise",
      "Dudhsagar day trip",
    ],
    rating: "4.8", reviews: "2,050",
    ageGroup: "All ages · Beach-safe zones",
    tag: "Beach Holiday",
  },
  {
    id: "coorg-family",
    badge: "Nature Pick",
    badgeColor: "rgba(167,139,250,0.18)",
    badgeTxt: "#c4b5fd",
    name: "Coorg Family Nature Retreat",
    tagline: "Coffee Estates · Waterfalls · Wildlife",
    duration: "3 Nights / 4 Days",
    destinations: ["Coorg", "Wayanad"],
    price: "₹7,499",
    unit: "per person (family of 4)",
    img: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=900&q=85&fit=crop",
    highlights: ["Coffee Plantation Walk ☕", "Abbey Falls 🌊", "Nagarhole Safari 🐅", "Elephant Camp 🐘", "River Rafting 🚣"],
    included: [
      "3 nights estate / resort stay",
      "All meals",
      "Coffee & spice tour",
      "Wildlife safari (Nagarhole)",
      "Kids forest activity session",
      "Return transfers from CBE/BLR",
    ],
    rating: "4.9", reviews: "980",
    ageGroup: "Ages 4+ · Very family-friendly",
    tag: "Nature & Wildlife",
  },
  {
    id: "himachal-family",
    badge: "Snow Special",
    badgeColor: "rgba(125,211,252,0.18)",
    badgeTxt: "#7dd3fc",
    name: "Himachal Snow Family Tour",
    tagline: "Shimla · Manali · Solang Valley",
    duration: "6 Nights / 7 Days",
    destinations: ["Shimla", "Manali", "Solang"],
    price: "₹16,999",
    unit: "per person (family of 4)",
    img: "https://images.unsplash.com/photo-1573143804538-fbd5d0a59f98?w=900&q=85&fit=crop",
    highlights: ["Snow Activities ❄️", "Rohtang Pass 🏔️", "Solang Valley Skiing ⛷️", "Toy Train Shimla 🚂", "Hadimba Temple 🛕"],
    included: [
      "6 nights snow-view hotels",
      "All meals included",
      "Volvo + local transfers",
      "Snow gear rental included",
      "Kids sledding & snow play",
      "Emergency medical support",
    ],
    rating: "4.8", reviews: "1,270",
    ageGroup: "Ages 5+ · Light winter prep",
    tag: "Snow & Adventure",
  },
];

const TAGS = ["All", "Hill Station", "Nature & Wildlife", "Heritage & Culture", "Beach Holiday", "Snow & Adventure"];

const INCLUSIONS = [
  { icon:"🏨", title:"Family Room Stays",    desc:"Spacious rooms with extra beds or adjoining rooms. All accommodations are child-verified and safety-checked." },
  { icon:"🍽️", title:"All Meals Included",   desc:"Breakfast and dinner at minimum, lunch on touring days. Kid-friendly menus always available." },
  { icon:"🚗", title:"Private AC Vehicles",  desc:"Innova, Tempo Traveller, or equivalent — with child safety seats available on request." },
  { icon:"🎒", title:"Kids Activity Kit",    desc:"Every family receives a travel kit with colouring books, games, and local fun-fact cards for children." },
  { icon:"👨‍⚕️", title:"Medical Support",       desc:"First aid on board, tie-up with local hospitals, 24/7 emergency contacts at every destination." },
  { icon:"📸", title:"Complimentary Photos", desc:"Our guides capture candid family moments at every major spot. Shared via Google Photos within 24 hrs." },
];

const TESTIMONIALS = [
  { name:"Ranjith & Family", city:"Coimbatore", rating:5, text:"We did the Kerala Magic package with our two kids (ages 6 & 9). The houseboat night was magical — kids still talk about it. Absolutely zero stress, everything was arranged perfectly.", trip:"Kerala Family Magic", avatar:"👨‍👩‍👦‍👦" },
  { name:"Priya Subramaniam", city:"Chennai", rating:5, text:"Rajasthan with elderly parents + toddler sounded impossible — but these guys made it seamless. Heritage hotels were spacious, driver was patient, and the folk show night was unforgettable.", trip:"Rajasthan Royal Family Tour", avatar:"👩‍👧" },
  { name:"The Krishnamurthy Family", city:"Bangalore", rating:5, text:"Ooty & Kodai in 5 days — perfectly paced for kids. The toy train booking was a highlight. Guide was amazing with our hyperactive 7-year-old. Already planning Himachal next!", trip:"Ooty & Kodaikanal Trail", avatar:"👨‍👩‍👧" },
];

const FAQS = [
  { q:"What is the ideal age group for family packages?",           a:"All our family packages are designed for mixed age groups — from toddlers to grandparents. Specific recommendations per package (e.g., 'Ages 5+') are listed. We can also customise activities based on your family's age mix." },
  { q:"Can we get a discount for a larger group (6-8 members)?",    a:"Yes! Groups of 6+ receive automatic discounts of 8–15% depending on the package. Groups of 10+ get custom pricing. Call or WhatsApp us for a group quote." },
  { q:"Are the vehicles safe for children and elderly?",            a:"Absolutely. We use Innova Crysta, Tempo Traveller, or equivalent. Child safety seats are available on request at no extra cost. All drivers hold commercial licences with clean records." },
  { q:"What if my child falls ill during the trip?",                a:"All our packages include 24/7 emergency medical support. We have tie-ups with hospitals and clinics at every destination. Your trip manager will assist immediately — no extra cost for coordination." },
  { q:"Can we customise a package to add or remove destinations?",  a:"Every package is fully customisable. Add days, swap destinations, upgrade hotels, or remove activities. Share your requirements and we'll send a custom quote within a few hours." },
  { q:"Is advance payment required to book?",                       a:"No advance payment required to enquire or get a custom itinerary. A booking deposit of 20% is required to confirm dates, with the balance payable 7 days before travel." },
];

const WHY_FAMILY = [
  { icon:"🧒", title:"Child-First Planning",     desc:"Every activity, restaurant, and hotel is vetted for children. We think about nap times, portion sizes, and safety before we think about sightseeing." },
  { icon:"👴", title:"Elderly-Friendly Routes",  desc:"Gentle walking distances, step-free options, and rest stops built into every day. Grandparents deserve a holiday too." },
  { icon:"📋", title:"No Last-Minute Surprises", desc:"Every ticket, every booking, every meal is confirmed before you board. You focus on making memories; we handle the logistics." },
  { icon:"🧳", title:"Packing Checklist Given",  desc:"Destination-specific packing lists for kids and adults, sent 10 days before departure so you're always prepared." },
  { icon:"🗺️", title:"Local Family Experts",     desc:"Our guides are parents themselves. They know exactly which spots kids love, what's worth skipping, and where to find the best local ice cream." },
  { icon:"🔄", title:"Full Flexibility",         desc:"Plans change — especially with families. We offer free rescheduling up to 10 days before travel and partial refunds for genuine cancellations." },
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
      <span style={{ color:C.gLeaf }}>Family Packages</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function FamilyPackagesPage() {
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
        @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

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
      `}</style>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position:"relative", minHeight:isXS?"88vh":"100vh", overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:`url(${HERO_IMG})`, backgroundSize:"cover", backgroundPosition:"center 40%", transform:mounted?"scale(1)":"scale(1.07)", transition:"transform 2.2s cubic-bezier(.22,1,.36,1)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:1, background:"rgba(3,10,1,0.52)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:2, background:"linear-gradient(180deg,rgba(4,12,2,0.90) 0%,rgba(4,10,2,0.05) 42%,rgba(4,12,2,0.85) 100%)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none", background:`radial-gradient(ellipse 72% 55% at 50% 85%, rgba(46,128,16,0.20) 0%,transparent 65%)` }}/>
        {/* Noise texture */}
        <div style={{ position:"absolute", inset:0, zIndex:4, pointerEvents:"none", opacity:.025, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"200px" }}/>

        <div style={{ position:"relative", zIndex:10, maxWidth:maxW, margin:"0 auto", width:"100%", padding:`0 ${px}`, flex:1, display:"flex", flexDirection:"column", justifyContent:"center", paddingTop:isMobile?"90px":"80px", paddingBottom:isMobile?"64px":"80px" }}>

          {/* Breadcrumb */}
          <div style={{ marginBottom:20, animation:heroVis?"slideDown .55s ease both":"none" }}>
            <Breadcrumb/>
          </div>

          {/* Live pill */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:20, animation:heroVis?"fadeUp .55s .05s ease both":"none" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 16px", borderRadius:100, background:"rgba(107,189,40,0.12)", border:"1.5px solid rgba(107,189,40,0.28)", backdropFilter:"blur(12px)" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:C.gLeaf, display:"inline-block", animation:"pulse 2s infinite", boxShadow:`0 0 8px ${C.gLeaf}` }}/>
              <span style={{ fontFamily:FB, fontSize:isXS?10:11, fontWeight:700, color:C.gLeaf, letterSpacing:".18em", textTransform:"uppercase" }}>South India · 6 Family Packages</span>
            </div>
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily:F, fontStyle:"italic", fontWeight:800, fontSize:isXS?"34px":isMobile?"48px":isTablet?"64px":"82px", lineHeight:.97, letterSpacing:"-.038em", color:"#fff", margin:"0 0 8px", textShadow:"0 4px 40px rgba(0,0,0,0.55)", animation:heroVis?"fadeUp .62s .10s ease both":"none" }}>
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 38%,${C.gLight} 65%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Family</span>
          </h1>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontWeight:700, fontSize:isXS?"17px":isMobile?"21px":"28px", color:"rgba(200,240,150,0.68)", margin:"0 0 20px", letterSpacing:"-.02em", animation:heroVis?"fadeUp .62s .14s ease both":"none" }}>
            Tour Packages
          </h2>

          <p style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:500, color:"rgba(185,228,130,0.60)", maxWidth:560, lineHeight:1.84, margin:"0 0 36px", animation:heroVis?"fadeUp .62s .18s ease both":"none" }}>
            Crafted for families of all sizes — toddlers, teens, grandparents. Every package is paced right, priced right, and packed with moments your family will relive for years. Hill stations, beaches, heritage cities, wildlife — we&apos;ve got your perfect family holiday.
          </p>

          {/* Stats bar */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:36, animation:heroVis?"fadeUp .62s .22s ease both":"none" }}>
            {HIGHLIGHTS.map(h => (
              <div key={h.label} style={{ display:"flex", alignItems:"center", gap:7, padding:"8px 14px", borderRadius:100, background:"rgba(107,189,40,0.10)", border:"1.5px solid rgba(107,189,40,0.22)", backdropFilter:"blur(8px)" }}>
                <span style={{ fontSize:13 }}>{h.icon}</span>
                <span style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"rgba(200,240,150,0.80)", letterSpacing:".04em" }}>{h.val} {h.label}</span>
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
              Get Free Quote
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

      {/* ══ 2. WHAT'S INCLUDED STRIP ══════════════════════════════════════ */}
      <div style={{ background:"rgba(6,18,3,0.95)", borderTop:"1px solid rgba(125,200,50,0.10)", borderBottom:"1px solid rgba(125,200,50,0.10)" }}>
        <div style={{ maxWidth:maxW, margin:"0 auto", padding:`32px ${px}` }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:isXS?16:28, justifyContent:"center" }}>
            {[
              { icon:"🚗", label:"Private AC Vehicle"   },
              { icon:"🍽️", label:"Meals Included"        },
              { icon:"🏨", label:"Family Room Stays"     },
              { icon:"🎒", label:"Kids Activity Kit"     },
              { icon:"👨‍⚕️", label:"Medical Support"       },
              { icon:"📞", label:"24/7 Trip Manager"     },
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
          <Eyebrow text="Family Packages"/>
          <div style={{ display:"flex", flexDirection:isMobile?"column":"row", alignItems:isMobile?"flex-start":"flex-end", justifyContent:"space-between", gap:20, marginBottom:40 }}>
            <div>
              <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
                Choose Your{" "}
                <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Family Adventure</span>
              </h2>
              <p style={{ fontFamily:FB, fontSize:13, color:"rgba(175,225,120,0.55)", lineHeight:1.70 }}>
                {filtered.length} package{filtered.length !== 1?"s":""} · All prices per person · Group discounts available
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
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(4,12,2,0.82) 0%,transparent 52%)" }}/>
                  {/* Badge */}
                  <div style={{ position:"absolute", top:14, left:14, padding:"5px 12px", borderRadius:100, background:pkg.badgeColor, border:`1px solid ${typeof pkg.badgeColor==="string"&&pkg.badgeColor.startsWith("rgba")?pkg.badgeTxt+"30":pkg.badgeTxt+"60"}`, backdropFilter:"blur(8px)" }}>
                    <span style={{ fontFamily:FB, fontSize:10, fontWeight:800, color:pkg.badgeTxt, letterSpacing:".10em", textTransform:"uppercase" }}>{pkg.badge}</span>
                  </div>
                  {/* Tag */}
                  <div style={{ position:"absolute", top:14, right:14, padding:"5px 12px", borderRadius:100, background:"rgba(4,12,2,0.75)", border:"1px solid rgba(125,200,50,0.20)", backdropFilter:"blur(8px)" }}>
                    <span style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:"rgba(165,215,100,0.75)", letterSpacing:".08em" }}>{pkg.tag}</span>
                  </div>
                  {/* Bottom overlay */}
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 18px" }}>
                    <div style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:"rgba(165,215,100,0.60)", letterSpacing:".12em", textTransform:"uppercase", marginBottom:3 }}>{pkg.tagline}</div>
                    <div style={{ fontFamily:F, fontStyle:"italic", fontSize:22, fontWeight:800, color:"#fff", letterSpacing:"-.02em", textShadow:"0 2px 12px rgba(0,0,0,0.6)" }}>{pkg.name}</div>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding:"18px 20px 22px" }}>
                  {/* Duration + Destinations */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:8 }}>
                    <div style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"rgba(165,215,100,0.60)", letterSpacing:".08em", textTransform:"uppercase" }}>{pkg.duration}</div>
                    <div style={{ fontFamily:FB, fontSize:10.5, fontWeight:600, color:"rgba(150,200,90,0.45)", letterSpacing:".06em" }}>👨‍👩‍👧 {pkg.ageGroup}</div>
                  </div>

                  {/* Destination pills */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                    {pkg.destinations.map(d => (
                      <span key={d} style={{ fontFamily:FB, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:100, background:"rgba(107,189,40,0.10)", border:"1px solid rgba(107,189,40,0.22)", color:"rgba(165,215,100,0.70)" }}>📍 {d}</span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
                    {pkg.highlights.slice(0,4).map(h => (
                      <span key={h} style={{ fontFamily:FB, fontSize:11, fontWeight:500, padding:"3px 9px", borderRadius:100, background:"rgba(4,12,2,0.70)", border:"1px solid rgba(125,200,50,0.14)", color:"rgba(175,220,120,0.60)" }}>{h}</span>
                    ))}
                    {pkg.highlights.length>4 && <span style={{ fontFamily:FB, fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:100, background:"rgba(107,189,40,0.08)", color:"rgba(140,195,80,0.55)" }}>+{pkg.highlights.length-4} more</span>}
                  </div>

                  <div style={{ height:1, background:"rgba(125,200,50,0.10)", marginBottom:14 }}/>

                  {/* Inclusions list (top 3) */}
                  <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:16 }}>
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

      {/* ══ 4. WHAT'S INCLUDED IN EVERY PACKAGE ════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="What's Included"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            Every Package Comes{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Fully Loaded</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>
            No hidden extras. No &quot;optional add-ons&quot; that everyone actually needs. Everything that matters is in the price.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isMobile?"1fr 1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:isXS?14:18 }}>
            {INCLUSIONS.map((inc, i) => (
              <div key={inc.title} className="why-card" style={{ borderRadius:20, padding:isXS?"18px":"22px 24px", background:"rgba(6,18,3,0.88)", border:"1px solid rgba(125,200,50,0.13)", boxShadow:"0 4px 24px rgba(0,0,0,0.30)", opacity:0, animation:`fadeUp .55s ${i*0.07}s ease both` }}>
                <div style={{ fontSize:28, marginBottom:14 }}>{inc.icon}</div>
                <div style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?15:17, fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.02em" }}>{inc.title}</div>
                <div style={{ fontFamily:FB, fontSize:12.5, color:"rgba(175,220,115,0.58)", lineHeight:1.76 }}>{inc.desc}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 5. WHY WE'RE DIFFERENT ════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Why Choose Us"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            Built for{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Real Families</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>
            We&apos;ve travelled with 500+ families and learned what actually matters — and it&apos;s not just the destination.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isMobile?"1fr 1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:isXS?14:18 }}>
            {WHY_FAMILY.map((w, i) => (
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
          <Eyebrow text="Family Stories"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            Families Who{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Loved It</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>Real families, real trips, real memories.</p>

          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isDesk?"repeat(3,1fr)":"1fr 1fr", gap:20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="testi-card" style={{ borderRadius:20, padding:"26px 24px", background:"rgba(6,18,3,0.90)", border:"1.5px solid rgba(125,200,50,0.13)", boxShadow:"0 4px 28px rgba(0,0,0,0.30)", opacity:0, animation:`fadeUp .55s ${i*0.09}s ease both` }}>
                {/* Quote mark */}
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
            Family Travel{" "}
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
        <div style={{ position:"absolute", inset:0, backgroundImage:`url(${HERO_IMG})`, backgroundSize:"cover", backgroundPosition:"center 50%", filter:"brightness(0.14) saturate(1.6)", zIndex:0 }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#040E02 0%,rgba(4,14,2,0.0) 30%,rgba(4,14,2,0.0) 70%,#040E02 100%)", zIndex:1 }}/>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 70% 60% at 50% 50%,rgba(46,128,16,0.16) 0%,transparent 65%)`, zIndex:2 }}/>

        <Section style={{ position:"relative", zIndex:10, maxWidth:700, margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
            <Eyebrow text="Plan Your Family Trip"/>
          </div>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"28px":isMobile?"36px":"52px", fontWeight:800, color:"#fff", letterSpacing:"-.034em", lineHeight:1.04, marginBottom:16, textShadow:"0 4px 32px rgba(0,0,0,0.55)" }}>
            Your Family&apos;s Next{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 45%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Great Adventure</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:isXS?13:14.5, color:"rgba(180,225,130,0.62)", lineHeight:1.80, marginBottom:36 }}>
            Tell us your family&apos;s size, ages, and dream destination — we&apos;ll craft a personalised itinerary within 2 hours, free of cost, with no advance payment required.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:28 }}>
            <a href="tel:+919876543210" className="cta-btn" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"13px 22px":"16px 34px", borderRadius:14, border:"none", background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color:C.gDeep, cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:10, boxShadow:`0 10px 32px ${C.gLeaf}55` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call Us Free
            </a>
            <a href="https://wa.me/919876543210?text=Hi! I want to plan a family tour package." target="_blank" rel="noreferrer" className="cta-btn" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"12px 20px":"15px 28px", borderRadius:14, border:"2px solid rgba(37,211,102,0.45)", background:"rgba(37,211,102,0.10)", color:"rgba(37,211,102,0.95)", cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, backdropFilter:"blur(10px)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z"/></svg>
              WhatsApp Us
            </a>
          </div>

          <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:isXS?14:24 }}>
            {["✅ Free itinerary","🔒 No advance needed","⚡ 2-hr callback","👨‍👩‍👧 Family specialists"].map(t => (
              <span key={t} style={{ fontFamily:FB, fontSize:12, fontWeight:600, color:"rgba(170,220,110,0.55)" }}>{t}</span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}