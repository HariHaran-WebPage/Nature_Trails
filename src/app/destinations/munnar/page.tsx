"use client";
import { useState, useEffect, useRef, ReactNode } from "react";

/* ─── Design Tokens ──────────────────────────────────────────────────── */
const C = {
  gDeep: "#0F3D06", gDark: "#1A5C0A", gMid: "#2E8010",
  gLeaf: "#6BBD28", gLight: "#96D94A",
};
const F  = "'Playfair Display', Georgia, serif";
const FB = "'DM Sans', 'Segoe UI', sans-serif";

/* ─── Munnar Images ─────────────────────────────────────────────────── */
const HERO_IMG = "https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=1800&q=85&fit=crop";
const GALLERY  = [
  { src:"https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=85&fit=crop", caption:"Munnar Tea Gardens" },
  { src:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&fit=crop", caption:"Eravikulam National Park" },
  { src:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=85&fit=crop", caption:"Anamudi Peak" },
  { src:"https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85&fit=crop", caption:"Attukal Waterfalls" },
  { src:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=85&fit=crop", caption:"Misty Valleys" },
  { src:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=85&fit=crop", caption:"Shola Forest" },
];

/* ─── Content Data ──────────────────────────────────────────────────── */
const HIGHLIGHTS = [
  { icon:"🍵", title:"Tea Gardens",           desc:"Vast rolling estates of the finest Nilgiri tea — walk through emerald rows, visit factories and sip freshly brewed chai at sunrise." },
  { icon:"🦣", title:"Eravikulam NP",          desc:"Home to the endangered Nilgiri Tahr, this national park at 2,695 m hosts the breathtaking Rajamala Hills and rare grasslands." },
  { icon:"⛰️", title:"Anamudi Peak",           desc:"South India's highest peak at 2,695 m — trekking permits available for a spectacular sunrise summit hike." },
  { icon:"💧", title:"Attukal Waterfalls",     desc:"Pristine cascade through thick shola forest, best visited post-monsoon when the falls roar with full fury." },
  { icon:"🌿", title:"Mattupetty Dam",         desc:"Serene reservoir amidst rolling hills — enjoy boating, echo point views and the famous Indo-Swiss livestock project nearby." },
  { icon:"🌸", title:"Top Station",            desc:"The highest point on the Munnar–Kodaikanal road at 1,700 m, offering a jaw-dropping panorama of the Western Ghats into Tamil Nadu." },
];

const PACKAGES = [
  {
    name:"Quick Escape",
    duration:"2 Nights / 3 Days",
    price:"₹4,999",
    unit:"per person",
    badge:"",
    color: C.gLeaf,
    features:[
      "Tea garden walk & factory tour",
      "Mattupetty Dam boating",
      "Echo Point & Photo Point",
      "Comfortable hotel stay",
      "All transfers included",
    ],
  },
  {
    name:"Classic Munnar",
    duration:"3 Nights / 4 Days",
    price:"₹8,499",
    unit:"per person",
    badge:"Most Popular",
    color:"#C8F060",
    features:[
      "Everything in Quick Escape +",
      "Eravikulam National Park",
      "Top Station panorama drive",
      "Attukal & Nyayamakad Falls",
      "Spice plantation tour",
      "Daily breakfast included",
    ],
  },
  {
    name:"Premium Hills",
    duration:"4 Nights / 5 Days",
    price:"₹15,999",
    unit:"per person",
    badge:"Premium",
    color:"#F59E0B",
    features:[
      "Everything in Classic +",
      "Luxury tea estate bungalow",
      "Private vehicle all days",
      "Anamudi sunrise trek",
      "Chinnar Wildlife Sanctuary",
      "Candlelight dinner & spa",
    ],
  },
];

const ITINERARY = [
  {
    day:1,
    title:"Arrival & Tea Country",
    items:[
      "Pick-up from Cochin / Coimbatore / Madurai",
      "Scenic drive through Kerala's winding ghat roads",
      "Check-in & freshen up at hill resort",
      "Evening stroll through tea estates near town",
      "Sunset at Pothamedu Viewpoint",
      "Welcome dinner with Kerala cuisine",
    ],
  },
  {
    day:2,
    title:"Waterfalls & Gardens",
    items:[
      "Early morning Attukal Waterfalls trek",
      "Nyayamakad Waterfalls visit",
      "TATA Tea Museum & factory tour",
      "Spice plantation walk at Rajamallay",
      "Kundale Lake boating",
      "Evening market stroll in Munnar town",
    ],
  },
  {
    day:3,
    title:"Wildlife & Peaks",
    items:[
      "Eravikulam National Park — spot Nilgiri Tahr",
      "Rajamala Hills grassland walk",
      "Mattupetty Dam boating",
      "Echo Point — natural echo experience",
      "Top Station panorama (sunset view)",
      "Bonfire evening at resort",
    ],
  },
  {
    day:4,
    title:"Hidden Trails",
    items:[
      "Anamudi Peak sunrise trek (permit required)",
      "Chinnar Wildlife Sanctuary safari",
      "Marayoor Sandalwood forest",
      "Thoovanam Waterfalls exploration",
      "Traditional Kerala dinner experience",
    ],
  },
  {
    day:5,
    title:"Departure",
    items:[
      "Checkout & leisurely breakfast",
      "Last stop: Blossom Hydel Park",
      "Shopping — tea, cardamom, eucalyptus oil",
      "Drop to Cochin / Coimbatore / Madurai",
    ],
  },
];

const BEST_TIME = [
  { month:"Sep – Feb", label:"Peak Season",  note:"Cool 10–20°C, lush post-rain greenery, best visibility",  active:true  },
  { month:"Mar – May", label:"Summer",        note:"Warm and dry, great for trekking & wildlife spotting",     active:true  },
  { month:"Jun – Aug", label:"Monsoon",       note:"Heavy rain, misty falls, dramatic landscapes — plan wisely", active:false },
  { month:"Dec – Jan", label:"Winter",        note:"Cold 5–15°C, misty mornings — magical for couples",        active:true  },
];

const FAQS = [
  { q:"How to reach Munnar?",                 a:"Nearest airport is Cochin International (130 km). Nearest railway stations are Angamaly (100 km) and Ernakulam (110 km). We arrange comfortable cab transfers from all these points." },
  { q:"Is Munnar good for families?",         a:"Absolutely! Tea garden walks, Eravikulam wildlife spotting, boating at Mattupetty and the spice plantation are all family-friendly. The cool climate and safe roads make it ideal for all ages." },
  { q:"What is the best season to visit?",    a:"September to February is ideal — post-monsoon greenery with cool temperatures. March–May is great for trekking. June–August is rainy but dramatically beautiful if you love misty landscapes." },
  { q:"Is Munnar good for a honeymoon?",      a:"Yes! Misty tea gardens at dawn, private estate cottages, candlelight dinners with valley views and serene waterfall hikes make Munnar one of Kerala's most romantic destinations." },
  { q:"Is a permit needed for Anamudi Trek?", a:"Yes, Anamudi trekking requires a Forest Department permit, available from the Eravikulam National Park office. We assist all guests with advance permit arrangements as part of our Premium package." },
];

/* ─── Types ─────────────────────────────────────────────────────────── */
interface SectionProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

interface EyebrowProps {
  text: string;
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

/* ─── Breadcrumb (moved outside main component) ──────────────────────── */
function Breadcrumb() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:FB, fontSize:11, fontWeight:600, color:"rgba(150,210,90,0.55)", letterSpacing:".04em" }}>
      <span style={{ cursor:"pointer" }}>Home</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      <span style={{ cursor:"pointer" }}>Destinations</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      <span style={{ color:C.gLeaf }}>Munnar</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function MunnarPage() {
  const width    = useW();
  const isXS     = width < 480;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesk   = width >= 1024;

  const px   = isXS?"16px":isMobile?"20px":isTablet?"32px":"56px";
  const maxW = 1280;

  const [activeDay, setActiveDay] = useState<number>(0);
  const [openFaq,   setOpenFaq]   = useState<number | null>(null);
  const [activeImg, setActiveImg] = useState<number>(0);
  const [mounted,   setMounted]   = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroVis = useInView(heroRef, 0.01);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

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

        .pkg-card  { transition:all .28s cubic-bezier(.22,1,.36,1); }
        .pkg-card:hover  { transform:translateY(-6px)!important; }
        .hl-card   { transition:all .26s; }
        .hl-card:hover   { transform:translateY(-4px); border-color:rgba(107,189,40,0.40)!important; background:rgba(12,32,6,0.98)!important; }
        .gal-thumb { transition:all .28s; cursor:pointer; overflow:hidden; border-radius:14px; }
        .gal-thumb:hover { transform:scale(1.03); }
        .day-btn   { transition:all .22s; cursor:pointer; }
        .day-btn:hover   { background:rgba(107,189,40,0.12)!important; }
        .faq-row   { transition:all .22s; cursor:pointer; }
        .faq-row:hover   { background:rgba(107,189,40,0.06)!important; }
        .cta-btn   { transition:all .26s; }
        .cta-btn:hover   { transform:translateY(-3px); }
      `}</style>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position:"relative", minHeight:"100vh", overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:`url(${HERO_IMG})`, backgroundSize:"cover", backgroundPosition:"center 40%", transform:mounted?"scale(1)":"scale(1.07)", transition:"transform 2s cubic-bezier(.22,1,.36,1)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:1, background:"rgba(3,10,1,0.52)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:2, background:"linear-gradient(180deg,rgba(4,12,2,0.85) 0%,rgba(4,10,2,0.06) 44%,rgba(4,12,2,0.80) 100%)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none", background:`radial-gradient(ellipse 72% 55% at 50% 85%, rgba(46,128,16,0.20) 0%,transparent 65%)` }}/>
        <div style={{ position:"absolute", inset:0, zIndex:4, pointerEvents:"none", opacity:.025, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"200px" }}/>

        {/* Content */}
        <div style={{ position:"relative", zIndex:10, maxWidth:maxW, margin:"0 auto", width:"100%", padding:`0 ${px}`, flex:1, display:"flex", flexDirection:"column", justifyContent:"center", paddingTop:isMobile?"90px":"80px", paddingBottom:isMobile?"64px":"80px" }}>

          {/* Breadcrumb */}
          <div style={{ marginBottom:20, animation:heroVis?"slideDown .55s ease both":"none" }}>
            <Breadcrumb/>
          </div>

          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:20, animation:heroVis?"fadeUp .55s .05s ease both":"none" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 16px", borderRadius:100, background:"rgba(107,189,40,0.12)", border:"1.5px solid rgba(107,189,40,0.28)", backdropFilter:"blur(12px)" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:C.gLeaf, display:"inline-block", animation:"pulse 2s infinite", boxShadow:`0 0 8px ${C.gLeaf}` }}/>
              <span style={{ fontFamily:FB, fontSize:isXS?10:11, fontWeight:700, color:C.gLeaf, letterSpacing:".18em", textTransform:"uppercase" }}>Kashmir of South India · Kerala</span>
            </div>
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily:F, fontStyle:"italic", fontWeight:800, fontSize:isXS?"36px":isMobile?"50px":isTablet?"68px":"88px", lineHeight:.97, letterSpacing:"-.038em", color:"#fff", margin:"0 0 8px", textShadow:"0 4px 40px rgba(0,0,0,0.55)", animation:heroVis?"fadeUp .62s .10s ease both":"none" }}>
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 38%,${C.gLight} 65%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Munnar</span>
          </h1>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontWeight:700, fontSize:isXS?"17px":isMobile?"21px":"27px", color:"rgba(200,240,150,0.68)", margin:"0 0 20px", letterSpacing:"-.02em", animation:heroVis?"fadeUp .62s .14s ease both":"none" }}>
            Where Tea Meets the Sky
          </h2>

          <p style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:500, color:"rgba(185,228,130,0.60)", maxWidth:490, lineHeight:1.84, margin:"0 0 36px", animation:heroVis?"fadeUp .62s .18s ease both":"none" }}>
            Nestled at 1,600m in the Western Ghats, Munnar captivates with its endless carpets of emerald tea, mist-shrouded peaks, roaring waterfalls and rare Nilgiri wildlife — Kerala&apos;s most beloved hill station, just 130 km from Cochin.
          </p>

          {/* Quick facts */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:36, animation:heroVis?"fadeUp .62s .22s ease both":"none" }}>
            {[
              { icon:"🌡️", text:"10–20°C Avg"       },
              { icon:"📍", text:"1,600m altitude"    },
              { icon:"🚗", text:"130 km from COK"    },
              { icon:"⭐", text:"4.9 / 5 rating"     },
            ].map(c => (
              <div key={c.text} style={{ display:"flex", alignItems:"center", gap:7, padding:"8px 14px", borderRadius:100, background:"rgba(107,189,40,0.10)", border:"1.5px solid rgba(107,189,40,0.22)", backdropFilter:"blur(8px)" }}>
                <span style={{ fontSize:13 }}>{c.icon}</span>
                <span style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"rgba(200,240,150,0.80)", letterSpacing:".04em" }}>{c.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", animation:heroVis?"fadeUp .62s .26s ease both":"none" }}>
            <a href="#packages" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"13px 22px":"15px 30px", borderRadius:14, border:"none", background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color:C.gDeep, cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, boxShadow:`0 10px 32px ${C.gLeaf}55`, transition:"all .26s" }}
              onMouseEnter={e=>{const el=e.currentTarget;el.style.transform="translateY(-3px)";el.style.boxShadow=`0 18px 48px ${C.gLeaf}65`;}}
              onMouseLeave={e=>{const el=e.currentTarget;el.style.transform="none";el.style.boxShadow=`0 10px 32px ${C.gLeaf}55`;}}
            >
              View Packages
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#enquiry" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"12px 20px":"14px 26px", borderRadius:14, border:"2px solid rgba(107,189,40,0.35)", background:"rgba(107,189,40,0.09)", color:"rgba(150,217,74,0.95)", cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, backdropFilter:"blur(10px)", transition:"all .26s" }}
              onMouseEnter={e=>{const el=e.currentTarget;el.style.background="rgba(107,189,40,0.18)";el.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{const el=e.currentTarget;el.style.background="rgba(107,189,40,0.09)";el.style.transform="none";}}
            >
              Free Enquiry
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

      {/* ══ 2. HIGHLIGHTS ════════════════════════════════════════════════ */}
      <div style={{ background:"#040E02", padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Why Visit Munnar"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.03em" }}>
            Top Attractions &amp;{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Experiences</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:isXS?13:14, color:"rgba(175,225,120,0.58)", maxWidth:520, lineHeight:1.80, marginBottom:40 }}>
            Six must-see experiences curated by our local experts — every one a reason to fall in love with Munnar.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isMobile?"1fr 1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:isXS?14:18 }}>
            {HIGHLIGHTS.map((h,i) => (
              <div key={h.title} className="hl-card" style={{ borderRadius:20, padding:isXS?"18px":"22px 24px", background:"rgba(6,18,3,0.88)", border:"1px solid rgba(125,200,50,0.13)", boxShadow:"0 4px 24px rgba(0,0,0,0.30)", opacity:0, animation:`fadeUp .55s ${i*0.07}s ease both` }}>
                <div style={{ fontSize:28, marginBottom:14 }}>{h.icon}</div>
                <div style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?15:17, fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:"-.02em" }}>{h.title}</div>
                <div style={{ fontFamily:FB, fontSize:12.5, color:"rgba(175,220,115,0.58)", lineHeight:1.76 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Divider/>

      {/* ══ 3. GALLERY ═══════════════════════════════════════════════════ */}
      <div style={{ padding:`72px ${px}`, maxWidth:maxW, margin:"0 auto" }}>
        <Section>
          <Eyebrow text="Photo Gallery"/>
          <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?"26px":isMobile?"32px":"42px", fontWeight:800, color:"#fff", marginBottom:36, letterSpacing:"-.03em" }}>
            Munnar in Every{" "}
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Season</span>
          </h2>

          {/* Lightbox */}
          <div style={{ borderRadius:22, overflow:"hidden", marginBottom:16, height:isXS?"220px":isMobile?"280px":isTablet?"380px":"480px", position:"relative", boxShadow:"0 16px 60px rgba(0,0,0,0.55)", border:`2px solid rgba(107,189,40,0.18)` }}>
            {GALLERY.map((g,i) => (
              <div key={g.src} style={{ position:"absolute", inset:0, backgroundImage:`url(${g.src})`, backgroundSize:"cover", backgroundPosition:"center", opacity:i===activeImg?1:0, transition:"opacity .70s ease" }}/>
            ))}
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(4,12,2,0.70) 0%,transparent 55%)", zIndex:2 }}/>
            <div style={{ position:"absolute", bottom:20, left:24, zIndex:3, fontFamily:F, fontStyle:"italic", fontSize:18, fontWeight:800, color:"#fff", textShadow:"0 2px 12px rgba(0,0,0,0.7)" }}>{GALLERY[activeImg].caption}</div>
            {[{dir:-1,pos:"left"},{dir:1,pos:"right"}].map(({dir,pos}) => (
              <button key={pos} onClick={() => setActiveImg(i => (i+dir+GALLERY.length)%GALLERY.length)}
                style={{ position:"absolute", [pos]:16, top:"50%", transform:"translateY(-50%)", zIndex:4, width:42, height:42, borderRadius:"50%", border:"2px solid rgba(107,189,40,0.35)", background:"rgba(6,18,3,0.75)", color:C.gLeaf, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(8px)", transition:"all .22s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(107,189,40,0.25)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(6,18,3,0.75)";}}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">{dir===-1?<path d="M15 18l-6-6 6-6"/>:<path d="M9 18l6-6-6-6"/>}</svg>
              </button>
            ))}
          </div>

          {/* Thumbnails */}
          <div style={{ display:"grid", gridTemplateColumns:`repeat(${GALLERY.length},1fr)`, gap:10 }}>
            {GALLERY.map((g,i) => (
              <div key={g.src} className="gal-thumb" onClick={() => setActiveImg(i)}
                style={{ height:isXS?52:isMobile?64:80, backgroundImage:`url(${g.src})`, backgroundSize:"cover", backgroundPosition:"center", borderRadius:12, border:`2px solid ${i===activeImg?C.gLeaf+"80":"rgba(125,200,50,0.12)"}`, opacity:i===activeImg?1:0.55, transition:"all .28s" }}
              />
            ))}
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
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Perfect Trip</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:14, color:"rgba(175,225,120,0.58)", maxWidth:500, lineHeight:1.80, marginBottom:44 }}>All prices are per person. Group discounts available. We customise every package on request.</p>

          <div style={{ display:"grid", gridTemplateColumns:isXS?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:20 }}>
            {PACKAGES.map((pkg) => {
              const isPopular = pkg.badge === "Most Popular";
              const isPremium = pkg.badge === "Premium";
              return (
                <div key={pkg.name} className="pkg-card" style={{ borderRadius:22, overflow:"hidden", background:isPopular?"linear-gradient(160deg,rgba(12,36,6,0.98),rgba(8,24,4,0.98))":"rgba(6,18,3,0.90)", border:`2px solid ${isPopular?C.gLeaf+"50":isPremium?"rgba(245,158,11,0.30)":"rgba(125,200,50,0.14)"}`, boxShadow:isPopular?`0 16px 60px rgba(107,189,40,0.18)`:"0 6px 32px rgba(0,0,0,0.30)", position:"relative" }}>
                  {pkg.badge && (
                    <div style={{ position:"absolute", top:18, right:18, padding:"5px 12px", borderRadius:100, background:isPopular?C.gLeaf:isPremium?"#F59E0B":"rgba(125,200,50,0.18)", color:isPopular?C.gDeep:isPremium?"#040E02":"rgba(125,200,50,0.90)", fontFamily:FB, fontSize:10, fontWeight:800, letterSpacing:".10em", textTransform:"uppercase" }}>
                      {pkg.badge}
                    </div>
                  )}
                  <div style={{ padding:"28px 26px 24px" }}>
                    <div style={{ fontFamily:F, fontStyle:"italic", fontSize:22, fontWeight:800, color:"#fff", marginBottom:4, letterSpacing:"-.02em" }}>{pkg.name}</div>
                    <div style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"rgba(165,215,100,0.55)", letterSpacing:".08em", textTransform:"uppercase", marginBottom:20 }}>{pkg.duration}</div>
                    <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:6 }}>
                      <span style={{ fontFamily:F, fontStyle:"italic", fontSize:36, fontWeight:800, color:pkg.color, letterSpacing:"-.03em" }}>{pkg.price}</span>
                    </div>
                    <div style={{ fontFamily:FB, fontSize:11, fontWeight:600, color:"rgba(155,210,90,0.50)", marginBottom:24 }}>{pkg.unit}</div>
                    <div style={{ height:1, background:"linear-gradient(to right,transparent,rgba(125,200,50,0.18),transparent)", marginBottom:22 }}/>
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
            Based on our Classic Munnar — 3 Nights / 4 Days package. Fully customisable on request.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:isDesk?"240px 1fr":"1fr", gap:isDesk?28:20 }}>
            {/* Day selector */}
            <div style={{ display:"flex", flexDirection:isDesk?"column":"row", gap:8, overflowX:isDesk?"visible":"auto", paddingBottom:isDesk?0:4 }}>
              {ITINERARY.map((d,i) => (
                <button key={d.day} className="day-btn" onClick={() => setActiveDay(i)} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px", borderRadius:14, border:`1.5px solid ${i===activeDay?C.gLeaf+"60":"rgba(125,200,50,0.14)"}`, background:i===activeDay?"rgba(107,189,40,0.14)":"rgba(6,18,3,0.80)", flexShrink:0, textAlign:"left" }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:i===activeDay?`linear-gradient(135deg,${C.gLeaf},${C.gMid})`:"rgba(107,189,40,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontFamily:FB, fontSize:13, fontWeight:800, color:i===activeDay?C.gDeep:C.gLeaf }}>{d.day}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:"rgba(155,210,90,0.50)", letterSpacing:".08em", textTransform:"uppercase" }}>Day {d.day}</div>
                    <div style={{ fontFamily:F, fontStyle:"italic", fontSize:14, fontWeight:800, color:i===activeDay?"#fff":"rgba(200,235,155,0.70)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:140 }}>{d.title}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail */}
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
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf},#C8F060,${C.gMid})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Munnar</span>
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

      {/* ══ 7. FAQ ═══════════════════════════════════════════════════════ */}
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

      {/* ══ 8. BOTTOM CTA ════════════════════════════════════════════════ */}
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
            <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 45%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 4s linear infinite" }}>Munnar Escape?</span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:isXS?13:14.5, color:"rgba(180,225,130,0.62)", lineHeight:1.80, marginBottom:36 }}>
            Our travel experts will craft your personalised Munnar itinerary — for free, with no advance payment required. Just reach out and we&apos;ll call you within 2 hours.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:28 }}>
            <a href="tel:+919876543210" className="cta-btn" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"13px 22px":"16px 34px", borderRadius:14, border:"none", background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color:C.gDeep, cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:10, boxShadow:`0 10px 32px ${C.gLeaf}55` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call Us Free
            </a>
            <a href="https://wa.me/919876543210?text=Hi! I want to plan a trip to Munnar." target="_blank" rel="noreferrer" className="cta-btn" style={{ fontFamily:FB, fontSize:isXS?13:14, fontWeight:700, padding:isXS?"12px 20px":"15px 28px", borderRadius:14, border:"2px solid rgba(37,211,102,0.45)", background:"rgba(37,211,102,0.10)", color:"rgba(37,211,102,0.95)", cursor:"pointer", letterSpacing:".04em", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, backdropFilter:"blur(10px)" }}>
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