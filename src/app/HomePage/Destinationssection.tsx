"use client";
import { useState, useEffect, useRef, RefObject } from "react";

const C = {
  gDeep: "#0F3D06", gDark: "#1A5C0A", gMid: "#2E8010",
  gLeaf: "#6BBD28", gLight: "#96D94A",
};
const F  = "'Playfair Display', Georgia, serif";
const FB = "'DM Sans', 'Segoe UI', sans-serif";
const HERO_BG = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=85&fit=crop";


interface Destination {
  name: string; tagline: string; state: string;
  altitude: string; bestTime: string; rating: number;
  reviews: number; price: number; duration: string;
  tags: string[]; badge: string; badgeColor: string; badgeText: string;
  img: string; accentColor: string; category: string;
}
interface StarProps   { rating: number; }
interface ChipProps   { icon: string; label: string; }
interface CardProps   { dest: Destination; index: number; inView: boolean; isMobile: boolean; }


const DESTINATIONS: Destination[] = [
  { name:"Ooty",       tagline:"Queen of Hill Stations",   state:"Tamil Nadu", altitude:"2,240m", bestTime:"Oct – Jun", rating:4.9, reviews:1240, price:3499, duration:"2N / 3D", tags:["Tea Gardens","Nilgiri Train","Botanical Garden"], badge:"Most Popular", badgeColor:C.gLeaf,   badgeText:C.gDeep, img:"https://images.unsplash.com/photo-1582479253765-44e25ea4f56a?w=800&q=85&fit=crop",  accentColor:C.gMid,   category:"Tamil Nadu" },
  { name:"Kodaikanal", tagline:"Princess of Hill Stations",state:"Tamil Nadu", altitude:"2,133m", bestTime:"Apr – Jun", rating:4.8, reviews:980,  price:2999, duration:"2N / 3D", tags:["Coaker's Walk","Pine Forest","Waterfalls"],        badge:"Trending",     badgeColor:"#F59E0B", badgeText:"#fff",  img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&fit=crop", accentColor:"#D97706", category:"Tamil Nadu" },
  { name:"Munnar",     tagline:"Land of Tea & Mist",       state:"Kerala",     altitude:"1,600m", bestTime:"Sep – May", rating:4.9, reviews:1580, price:4299, duration:"3N / 4D", tags:["Tea Estates","Eravikulam NP","Mattupetty"],        badge:"Editor's Pick", badgeColor:"#0EA5E9", badgeText:"#fff",  img:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=85&fit=crop", accentColor:"#0284C7", category:"Kerala"     },
  { name:"Coorg",      tagline:"Scotland of India",         state:"Karnataka",  altitude:"1,525m", bestTime:"Oct – Mar", rating:4.7, reviews:860,  price:5199, duration:"3N / 4D", tags:["Coffee Estates","Abbey Falls","River Rafting"],    badge:"Adventure",    badgeColor:"#EC4899", badgeText:"#fff",  img:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85&fit=crop", accentColor:"#DB2777", category:"Karnataka"  },
  { name:"Valparai",   tagline:"The Hidden Gem",            state:"Tamil Nadu", altitude:"1,050m", bestTime:"Nov – Feb", rating:4.6, reviews:420,  price:1999, duration:"1N / 2D", tags:["Tea Trails","Waterfalls","Wildlife"],              badge:"Hidden Gem",   badgeColor:C.gDark,   badgeText:"#fff",  img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=85&fit=crop", accentColor:C.gDark,   category:"Tamil Nadu" },
  { name:"Wayanad",    tagline:"Nature's Own Country",      state:"Kerala",     altitude:"900m",   bestTime:"Oct – Feb", rating:4.8, reviews:1120, price:3799, duration:"2N / 3D", tags:["Chembra Peak","Bamboo Forest","Cave Temple"],     badge:"New",          badgeColor:"#8B5CF6", badgeText:"#fff",  img:"https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=85&fit=crop", accentColor:"#7C3AED", category:"Kerala"     },
];

const FILTERS = [
  { label:"All",           value:"All",        icon:"🏔️" },
  { label:"Tamil Nadu",    value:"Tamil Nadu",  icon:"🌿" },
  { label:"Kerala",        value:"Kerala",      icon:"🌴" },
  { label:"Karnataka",     value:"Karnataka",   icon:"☕" },
  { label:"Budget < ₹3K", value:"Budget",      icon:"💰" },
  { label:"Premium > ₹4K",value:"Premium",     icon:"⭐" },
];


function useW(): number {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.06): boolean {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref, threshold]);
  return v;
}


function StarRating({ rating }: StarProps) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24"
          fill={i <= Math.floor(rating) ? "#FBBF24" : "rgba(255,255,255,0.18)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      <span style={{ fontFamily:FB, fontSize:11, fontWeight:700, color:"#FBBF24", marginLeft:4 }}>{rating}</span>
    </div>
  );
}


function InfoChip({ icon, label }: ChipProps) {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:5,
      background:"rgba(255,255,255,0.07)",
      border:"1px solid rgba(255,255,255,0.11)",
      borderRadius:8, padding:"5px 10px",
    }}>
      <span style={{ fontSize:11 }}>{icon}</span>
      <span style={{ fontFamily:FB, fontSize:10.5, fontWeight:600, color:"rgba(200,235,160,0.80)" }}>{label}</span>
    </div>
  );
}

function DestinationCard({ dest, index, inView, isMobile }: CardProps) {
  const [hov, setHov]             = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="dest-card"
      style={{
        borderRadius:22, overflow:"hidden",
        background:"rgba(6,16,3,0.93)",
        border:`1.5px solid ${hov ? dest.accentColor+"65" : "rgba(255,255,255,0.08)"}`,
        boxShadow: hov
          ? `0 28px 56px rgba(0,0,0,0.55),0 0 0 1px ${dest.accentColor}28`
          : "0 4px 22px rgba(0,0,0,0.32)",
        transform: inView
          ? hov ? "translateY(-8px)" : "translateY(0)"
          : "translateY(50px)",
        opacity: inView ? 1 : 0,
        transition:"all .46s cubic-bezier(.22,1,.36,1)",
        transitionDelay:`${index * 75}ms`,
        display:"flex", flexDirection:"column",
      }}
    >
    
      <div style={{ position:"relative", overflow:"hidden", flexShrink:0 }} className="dest-photo">
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`url(${dest.img})`,
          backgroundSize:"cover", backgroundPosition:"center",
          transition:"transform .70s cubic-bezier(.22,1,.36,1)",
          transform: hov ? "scale(1.08)" : "scale(1.02)",
          filter:"brightness(0.82) saturate(1.12)",
        }}/>
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to bottom, rgba(0,0,0,0.04) 30%, rgba(6,16,3,0.94) 100%)",
          zIndex:1,
        }}/>

        <div style={{
          position:"absolute", top:14, left:14, zIndex:4,
          background:dest.badgeColor, borderRadius:30, padding:"4px 13px",
          fontFamily:FB, fontSize:9.5, fontWeight:800, color:dest.badgeText,
          letterSpacing:".12em", textTransform:"uppercase",
          boxShadow:`0 4px 14px ${dest.badgeColor}55`,
        }}>{dest.badge}</div>


        <button
          onClick={e => { e.stopPropagation(); setWishlisted(w => !w); }}
          style={{
            position:"absolute", top:12, right:12, zIndex:4,
            width:38, height:38, borderRadius:"50%",
            background: wishlisted ? "rgba(239,68,68,0.90)" : "rgba(0,0,0,0.48)",
            backdropFilter:"blur(8px)",
            border:`1.5px solid ${wishlisted ? "rgba(239,100,100,0.65)" : "rgba(255,255,255,0.18)"}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", transition:"all .22s",
            transform: wishlisted ? "scale(1.10)" : "scale(1)",
          }}>
          <svg width="15" height="15" viewBox="0 0 24 24"
            fill={wishlisted ? "#fff" : "none"}
            stroke={wishlisted ? "#fff" : "rgba(255,255,255,0.80)"}
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Name overlay */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 18px 16px", zIndex:4 }}>
          <div style={{
            fontFamily:FB, fontSize:9.5, fontWeight:700,
            color: dest.accentColor === C.gMid ? C.gLeaf : dest.accentColor,
            letterSpacing:".16em", textTransform:"uppercase", marginBottom:2,
            filter:"brightness(1.25)",
          }}>{dest.state}</div>
          <div style={{
            fontFamily:F, fontStyle:"italic",
            fontSize: isMobile ? 22 : 26, fontWeight:800, color:"#fff",
            lineHeight:1.05, letterSpacing:"-.025em",
            textShadow:"0 2px 14px rgba(0,0,0,0.80)", marginBottom:6,
          }}>{dest.name}</div>
          <StarRating rating={dest.rating} />
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding:"15px 18px 20px", display:"flex", flexDirection:"column", gap:12, flex:1 }}>
        <p style={{
          fontFamily:FB, fontSize:12, fontStyle:"italic",
          color:"rgba(185,230,130,0.52)", margin:0, lineHeight:1.5,
        }}>{dest.tagline}</p>

        <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
          <InfoChip icon="🏔️" label={dest.altitude} />
          <InfoChip icon="📅" label={dest.bestTime} />
          <InfoChip icon="🕐" label={dest.duration} />
        </div>

        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {dest.tags.map((tag: string, ti: number) => (
            <span key={ti} style={{
              fontFamily:FB, fontSize:10, fontWeight:600,
              color:"rgba(175,228,110,0.70)",
              background:"rgba(125,200,50,0.09)",
              border:"1px solid rgba(125,200,50,0.18)",
              borderRadius:6, padding:"3px 9px",
            }}>{tag}</span>
          ))}
        </div>

        <div style={{ height:1, background:"linear-gradient(to right,transparent,rgba(125,200,50,0.16),transparent)" }}/>

        {/* Price + CTA */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
          <div>
            <div style={{
              fontFamily:FB, fontSize:9, fontWeight:700,
              color:"rgba(160,210,110,0.48)", letterSpacing:".10em",
              textTransform:"uppercase", marginBottom:2,
            }}>Starts From</div>
            <div style={{
              fontFamily:F, fontStyle:"italic",
              fontSize: isMobile ? 20 : 23, fontWeight:800,
              color:C.gLeaf, letterSpacing:"-.02em", lineHeight:1,
            }}>
              ₹{dest.price.toLocaleString()}
              <span style={{ fontFamily:FB, fontSize:10, fontWeight:600, color:"rgba(155,205,100,0.48)", marginLeft:5 }}>/person</span>
            </div>
          </div>

          <button style={{
            fontFamily:FB, fontSize:12, fontWeight:700,
            padding:"11px 18px", borderRadius:11, border:"none",
            background: hov
              ? `linear-gradient(135deg,${dest.accentColor},${dest.accentColor}CC)`
              : `linear-gradient(135deg,${C.gLeaf},${C.gMid})`,
            color: hov ? "#fff" : C.gDeep,
            cursor:"pointer", letterSpacing:".03em",
            boxShadow: hov ? `0 8px 24px ${dest.accentColor}50` : `0 6px 18px ${C.gLeaf}38`,
            display:"flex", alignItems:"center", gap:7,
            transition:"all .26s", flexShrink:0, whiteSpace:"nowrap",
          }}>
            Book Now
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div style={{ fontFamily:FB, fontSize:10, color:"rgba(160,210,110,0.38)", fontWeight:500 }}>
          ✓ {dest.reviews.toLocaleString()} verified travellers rated this trip
        </div>
      </div>
    </div>
  );
}


export default function DestinationsSection() {
  const width    = useW();
  const isXS     = width < 480;
  const isSM     = width >= 480 && width < 640;
  const isMD     = width >= 640 && width < 1024;
  const isLG     = width >= 1024 && width < 1280;
  const isMobile = width < 640;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isTablet = width >= 640 && width < 1024; // kept for potential future use

  const secRef  = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(secRef);
  const gridIn  = useInView(gridRef);

  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll]           = useState(false);

  const filtered = DESTINATIONS.filter(d => {
    if (activeFilter === "All")      return true;
    if (activeFilter === "Budget")   return d.price < 3000;
    if (activeFilter === "Premium")  return d.price >= 4000;
    return d.category === activeFilter;
  });

  /* On mobile show only 2 cards initially, "Show More" reveals the rest */
  const INITIAL_MOBILE = 2;
  const visible = (isMobile && !showAll) ? filtered.slice(0, INITIAL_MOBILE) : filtered;

  const px      = isXS ? "16px" : isSM ? "18px" : isMD ? "28px" : isLG ? "40px" : "52px";
  const pyTop   = isXS ? "60px" : isMD ? "80px" : "96px";
  const pyBot   = isXS ? "68px" : isMD ? "88px" : "108px";
  const h2Size  = isXS ? "26px" : isSM ? "30px" : isMD ? "40px" : isLG ? "46px" : "52px";
  const gridCols = isXS ? "1fr" : isSM ? "1fr" : isMD ? "1fr 1fr" : "1fr 1fr 1fr";
  const cardGap  = isMobile ? 14 : isMD ? 18 : 22;

  return (
    <section style={{ fontFamily:FB, position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        button { -webkit-tap-highlight-color:transparent; cursor:pointer; }
        button:active { transform:scale(0.97) !important; }

        /* Photo height per breakpoint */
        .dest-photo { height:190px; }
        @media(min-width:480px)  { .dest-photo { height:205px; } }
        @media(min-width:640px)  { .dest-photo { height:215px; } }
        @media(min-width:1024px) { .dest-photo { height:225px; } }
        @media(min-width:1280px) { .dest-photo { height:235px; } }

        /* Keyframes */
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.55)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }

        /* Filter strip — horizontal scroll on mobile */
        .filter-strip { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
        @media(max-width:639px) {
          .filter-strip { flex-wrap:nowrap; overflow-x:auto; scrollbar-width:none; padding-bottom:4px; }
          .filter-strip::-webkit-scrollbar { display:none; }
        }

        /* Card hover lift disabled on touch */
        @media(hover:none) { .dest-card { transform:translateY(0)!important; } }

        /* CTA banner column on mobile */
        .cta-inner { display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        @media(max-width:639px) { .cta-inner { flex-direction:column; align-items:flex-start; } }

        /* CTA buttons stack on XS */
        .cta-btns { display:flex; gap:12px; flex-wrap:wrap; flex-shrink:0; }
        @media(max-width:479px) {
          .cta-btns { width:100%; flex-direction:column; }
          .cta-btns button { width:100%!important; justify-content:center!important; }
        }

        /* Stats borders on mobile 2×2 grid */
        .stat-row { display:grid; border-radius:20px; overflow:hidden; }
        @media(max-width:639px) { .stat-row { grid-template-columns:1fr 1fr; } }
        @media(min-width:640px) { .stat-row { grid-template-columns:repeat(4,1fr); } }
      `}</style>

      {/* ── Backgrounds ── */}
      <div style={{
        position:"absolute", inset:0, zIndex:0,
        backgroundImage:`url(${HERO_BG})`,
        backgroundSize:"cover", backgroundPosition:"center 40%",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
        filter:"brightness(0.20) saturate(1.4)",
      }}/>
      <div style={{ position:"absolute",inset:0,zIndex:2,pointerEvents:"none",
        background:`
          radial-gradient(ellipse 70% 55% at 5% 10%,rgba(46,128,16,.13) 0%,transparent 60%),
          radial-gradient(ellipse 50% 40% at 95% 85%,rgba(15,61,6,.18) 0%,transparent 55%),
          linear-gradient(180deg,rgba(4,12,2,.65) 0%,rgba(6,18,3,.28) 40%,rgba(4,10,2,.68) 100%)
        `
      }}/>
      <div style={{ position:"absolute",inset:0,zIndex:3,pointerEvents:"none",opacity:.016,
        backgroundImage:`radial-gradient(circle,${C.gLeaf} 1px,transparent 1px)`,
        backgroundSize:"38px 38px"
      }}/>

      {/* ── Content ── */}
      <div style={{
        position:"relative", zIndex:10,
        maxWidth:1320, margin:"0 auto",
        padding:`${pyTop} ${px} ${pyBot}`,
      }}>

        {/* ── Header ── */}
        <div ref={secRef} style={{ marginBottom: isMobile ? 30 : 52 }}>

          {/* Eyebrow */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:10,marginBottom:16, animation:inView?"fadeUp .55s ease both":"none" }}>
            <div style={{ height:2,width:26,borderRadius:2,background:`linear-gradient(to right,${C.gDeep},${C.gLeaf})` }}/>
            <span style={{ width:5,height:5,borderRadius:"50%",background:C.gLeaf,display:"inline-block",animation:"pulse 2.2s infinite" }}/>
            <span style={{ fontFamily:FB,fontSize:isXS?9:10,fontWeight:700,color:C.gLeaf,letterSpacing:".20em",textTransform:"uppercase" }}>
              Explore Destinations
            </span>
            <span style={{ width:5,height:5,borderRadius:"50%",background:C.gLeaf,display:"inline-block",animation:"pulse 2.2s .5s infinite" }}/>
            <div style={{ height:2,width:26,borderRadius:2,background:`linear-gradient(to left,${C.gDeep},${C.gLeaf})` }}/>
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily:F, fontStyle:"italic",
            fontSize:h2Size, fontWeight:800, color:"#fff",
            margin:"0 0 12px", letterSpacing:"-.032em", lineHeight:1.03,
            textShadow:"0 4px 28px rgba(0,0,0,.55)",
            animation:inView?"fadeUp .58s .06s ease both":"none",
          }}>
            Handpicked{" "}
            <span style={{
              background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 45%,${C.gMid} 100%)`,
              backgroundSize:"200% auto",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              animation:"shimmer 4s linear infinite",
            }}>Hill Escapes</span>
          </h2>

          <p style={{
            fontFamily:FB, fontSize:isXS?12.5:isMobile?13:14.5,
            color:"rgba(180,225,130,0.65)", maxWidth:520, lineHeight:1.82, margin:"0 0 26px",
            animation:inView?"fadeUp .58s .10s ease both":"none",
          }}>
            From misty Nilgiris to lush Kerala valleys — South India&apos;s finest hill stations, curated just for you.
          </p>

          {/* ── Filter bar ── */}
          <div className="filter-strip" style={{ animation:inView?"fadeUp .58s .15s ease both":"none" }}>
            {FILTERS.map(f => {
              const active = activeFilter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => { setActiveFilter(f.value); setShowAll(false); }}
                  style={{
                    fontFamily:FB, fontSize:isXS?11:12, fontWeight:active?700:600,
                    padding:isXS?"7px 13px":"9px 18px",
                    borderRadius:30, flexShrink:0,
                    border:`1.5px solid ${active ? C.gLeaf : "rgba(125,200,50,0.26)"}`,
                    background: active ? `linear-gradient(135deg,${C.gLeaf},${C.gMid})` : "rgba(255,255,255,0.05)",
                    backdropFilter:"blur(12px)",
                    color: active ? C.gDeep : "rgba(190,235,130,0.75)",
                    letterSpacing:".02em",
                    boxShadow: active ? `0 6px 22px ${C.gLeaf}38` : "none",
                    transition:"all .22s cubic-bezier(.22,1,.36,1)",
                    display:"flex", alignItems:"center", gap:6,
                    whiteSpace:"nowrap",
                  }}>
                  <span style={{ fontSize:isXS?12:13 }}>{f.icon}</span>
                  {f.label}
                </button>
              );
            })}
            <div style={{ fontFamily:FB, fontSize:11.5, fontWeight:600, color:"rgba(175,225,110,0.40)", marginLeft:4, flexShrink:0 }}>
              {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div ref={gridRef} style={{ display:"grid", gridTemplateColumns:gridCols, gap:cardGap }}>
          {visible.length > 0 ? (
            visible.map((dest, i) => (
              <DestinationCard key={dest.name} dest={dest} index={i} inView={gridIn} isMobile={isMobile} />
            ))
          ) : (
            <div style={{
              gridColumn:"1 / -1", textAlign:"center",
              padding:"64px 24px", animation:"fadeUp .40s ease both",
            }}>
              <div style={{ fontSize:44, marginBottom:16 }}>🏔️</div>
              <div style={{ fontFamily:F,fontStyle:"italic",fontSize:18,fontWeight:700,color:"#fff",marginBottom:8 }}>
                No destinations found
              </div>
              <div style={{ fontFamily:FB,fontSize:13,color:"rgba(180,220,130,0.50)",marginBottom:20 }}>
                Try a different filter to explore more places.
              </div>
              <button
                onClick={() => setActiveFilter("All")}
                style={{
                  fontFamily:FB,fontSize:13,fontWeight:700,
                  padding:"11px 26px",borderRadius:10,border:"none",
                  background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`,
                  color:C.gDeep,cursor:"pointer",
                  boxShadow:`0 6px 20px ${C.gLeaf}40`,
                }}>Show All Destinations</button>
            </div>
          )}
        </div>

        {/* ── Mobile "Show More / Less" toggle ── */}
        {isMobile && filtered.length > INITIAL_MOBILE && (
          <button
            onClick={() => setShowAll(s => !s)}
            style={{
              width:"100%", marginTop:16,
              padding:"14px", borderRadius:13,
              border: showAll ? "1.5px solid rgba(125,200,50,0.28)" : "none",
              background: showAll ? "rgba(255,255,255,0.08)" : `linear-gradient(135deg,${C.gLeaf},${C.gMid})`,
              color: showAll ? "rgba(190,235,130,0.80)" : C.gDeep,
              fontFamily:FB, fontSize:14, fontWeight:800,
              cursor:"pointer", letterSpacing:".04em",
              boxShadow: showAll ? "none" : `0 8px 28px ${C.gLeaf}50`,
              display:"flex", alignItems:"center", justifyContent:"center", gap:9,
              transition:"all .24s",
            }}>
            {showAll ? (
              <>Show Less <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 15l-6-6-6 6"/></svg></>
            ) : (
              <>Show All {filtered.length} Destinations <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg></>
            )}
          </button>
        )}
        <div
          className="stat-row"
          style={{
            marginTop: isMobile ? 44 : 64,
            background:"rgba(6,16,3,0.78)",
            backdropFilter:"blur(20px)",
            border:"1px solid rgba(125,200,50,0.14)",
            boxShadow:"0 8px 40px rgba(0,0,0,0.28)",
            animation:inView?"fadeUp .65s .28s ease both":"none",
          }}
        >
          {[
            { icon:"🏔️", val:"50+",    label:"Destinations"     },
            { icon:"👥", val:"8,500+", label:"Happy Travellers"  },
            { icon:"⭐", val:"4.9 / 5",label:"Average Rating"    },
            { icon:"🎒", val:"12 Yrs", label:"Experience"        },
          ].map((s, i, arr) => (
            <div
              key={i}
              style={{
                padding: isMobile ? "20px 12px" : "28px 24px",
                textAlign:"center",
                borderRight:
                  (isMobile ? i%2!==1 : i<arr.length-1)
                    ? "1px solid rgba(125,200,50,0.09)" : "none",
                borderBottom: isMobile && i<2 ? "1px solid rgba(125,200,50,0.09)" : "none",
                transition:"background .22s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(125,200,50,0.06)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
            >
              <div style={{ fontSize: isMobile ? 20 : 26, marginBottom:6 }}>{s.icon}</div>
              <div style={{
                fontFamily:F, fontStyle:"italic",
                fontSize: isMobile ? 22 : 28, fontWeight:800,
                color:C.gLeaf, letterSpacing:"-.03em", marginBottom:4,
              }}>{s.val}</div>
              <div style={{
                fontFamily:FB, fontSize: isMobile ? 10.5 : 11.5,
                fontWeight:600, color:"rgba(170,215,110,0.50)", letterSpacing:".04em",
              }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: isMobile ? 20 : 24,
          borderRadius:22, overflow:"hidden", position:"relative",
          animation:inView?"fadeUp .65s .38s ease both":"none",
        }}>
          <div style={{
            position:"absolute",inset:0,
            backgroundImage:"url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=75&fit=crop)",
            backgroundSize:"cover",backgroundPosition:"center",
            filter:"brightness(0.18) saturate(1.5)",
          }}/>
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(120deg,rgba(8,24,4,0.94) 0%,rgba(18,50,8,0.82) 100%)" }}/>

          <div className="cta-inner" style={{
            position:"relative", zIndex:2,
            padding: isXS ? "26px 18px" : isMobile ? "28px 22px" : isMD ? "34px 40px" : "38px 52px",
          }}>
            <div>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
                <span style={{ width:7,height:7,borderRadius:"50%",background:C.gLeaf,display:"inline-block",boxShadow:`0 0 0 3px ${C.gLeaf}28`,animation:"pulse 1.8s infinite" }}/>
                <span style={{ fontFamily:FB,fontSize:9.5,fontWeight:700,color:C.gLeaf,letterSpacing:".18em",textTransform:"uppercase" }}>
                  Free Consultation
                </span>
              </div>
              <div style={{
                fontFamily:F, fontStyle:"italic",
                fontSize: isXS ? 18 : isMobile ? 20 : 24,
                fontWeight:800, color:"#fff", marginBottom:7, letterSpacing:"-.02em", lineHeight:1.2,
              }}>
                Can&apos;t find your destination?
              </div>
              <div style={{
                fontFamily:FB, fontSize: isXS ? 12.5 : 13.5,
                color:"rgba(178,222,118,0.58)", lineHeight:1.65, maxWidth:420,
              }}>
                We cover 50+ hill stations across South India. Tell us where you want to go and we&apos;ll plan everything.
              </div>
            </div>

            <div className="cta-btns">
              <button
                style={{
                  fontFamily:FB,fontSize:13,fontWeight:700,
                  padding:"13px 26px",borderRadius:12,border:"none",
                  background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`,
                  color:C.gDeep,letterSpacing:".04em",
                  boxShadow:`0 10px 30px ${C.gLeaf}46`,
                  transition:"all .22s",
                  display:"flex",alignItems:"center",gap:9,
                }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-3px)";(e.currentTarget as HTMLElement).style.boxShadow=`0 18px 44px ${C.gLeaf}60`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="none";(e.currentTarget as HTMLElement).style.boxShadow=`0 10px 30px ${C.gLeaf}46`;}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Us Now
              </button>

              <button
                style={{
                  fontFamily:FB,fontSize:13,fontWeight:600,
                  padding:"12px 22px",borderRadius:12,
                  border:"1.5px solid rgba(255,255,255,0.20)",
                  background:"rgba(255,255,255,0.07)",color:"#fff",
                  backdropFilter:"blur(10px)",letterSpacing:".04em",
                  transition:"all .22s",
                  display:"flex",alignItems:"center",gap:9,
                }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.16)";(e.currentTarget as HTMLElement).style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.07)";(e.currentTarget as HTMLElement).style.transform="none";}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z"/>
                </svg>
                WhatsApp Chat
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}