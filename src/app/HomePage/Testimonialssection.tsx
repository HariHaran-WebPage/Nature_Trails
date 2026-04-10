"use client";
import { useState, useEffect, useRef, useCallback, RefObject, ReactNode } from "react";
import Image from "next/image";

const C = {
  gDeep: "#0F3D06", gDark: "#1A5C0A", gMid: "#2E8010",
  gLeaf: "#6BBD28", gLight: "#96D94A",
};
const F  = "'Playfair Display', Georgia, serif";
const FB = "'DM Sans', 'Segoe UI', sans-serif";
const HERO_BG = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=85&fit=crop";

interface Review {
  name: string; location: string; trip: string;
  rating: number; date: string; avatar: string;
  text: string; tripImg: string; tag: string;
  tagColor: string; verified: boolean;
}
interface Platform { name: string; rating: string; reviews: string; color: string; icon: ReactNode; }
interface StarsProps { rating: number; size?: number; }
interface CardProps  { review: Review; index: number; inView: boolean; isMobile: boolean; }

/* ─── Data ──────────────────────────────────────────────────────────── */
const REVIEWS: Review[] = [
  { name:"Priya Ramesh",      location:"Chennai, Tamil Nadu",      trip:"Ooty Honeymoon Package",    rating:5, date:"March 2025",    avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&fit=crop",  text:"Absolutely magical experience! The team handled every detail — from hotel booking to sightseeing. Our room had a breathtaking valley view and the Nilgiri train ride was unforgettable. Will definitely book again for our anniversary!", tripImg:"https://images.unsplash.com/photo-1582479253765-44e25ea4f56a?w=400&q=75&fit=crop", tag:"Honeymoon",     tagColor:"#EC4899", verified:true },
  { name:"Karthik Subramaniam",location:"Coimbatore, Tamil Nadu",  trip:"Munnar Group Tour",         rating:5, date:"February 2025", avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&fit=crop",  text:"Travelled with 12 friends and everything was perfectly organised. The bus was comfortable, hotels were clean and the guide was knowledgeable and fun. Tea estate visit at sunrise was the highlight. Great value for money!", tripImg:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=75&fit=crop",    tag:"Group Tour",   tagColor:C.gMid,    verified:true },
  { name:"Deepa Krishnan",    location:"Madurai, Tamil Nadu",      trip:"Kodaikanal Family Trip",    rating:5, date:"January 2025",  avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&fit=crop",  text:"Planned a trip for my parents and two kids — the team was so patient and customised everything for senior citizens. Wheelchair-friendly hotel, comfortable vehicle with AC, and a local guide who spoke Tamil. Highly recommended!", tripImg:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75&fit=crop", tag:"Family Trip",  tagColor:"#F59E0B", verified:true },
  { name:"Arun Selvam",       location:"Bangalore, Karnataka",     trip:"Coorg Weekend Getaway",     rating:5, date:"December 2024", avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80&fit=crop",  text:"Booked a last-minute trip on Friday and by Saturday morning we were in Coorg! The team worked overnight to arrange everything. Coffee plantation stay was outstanding. The rafting experience was thrilling. 10/10 service.", tripImg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=75&fit=crop",         tag:"Weekend Trip", tagColor:"#8B5CF6", verified:true },
  { name:"Meena Sundaram",    location:"Tiruchirappalli, Tamil Nadu",trip:"Valparai Day Trip",       rating:5, date:"November 2024", avatar:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&fit=crop",  text:"Even a simple day trip was handled with so much care. Packed breakfast, bottled water, a detailed itinerary and a driver who knew every hidden waterfall. The elephant sighting was a bonus we didn&apos;t expect. Superb!", tripImg:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=75&fit=crop",         tag:"Day Trip",     tagColor:C.gDark,   verified:true },
  { name:"Vijay & Lakshmi",   location:"Salem, Tamil Nadu",        trip:"Wayanad Couple Package",   rating:5, date:"October 2024",  avatar:"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&q=80&fit=crop",  text:"Our first trip planned by a travel agency and we were nervous — but they exceeded every expectation. Treehouse stay in Wayanad was a dream. Private candlelight dinner, morning jeep safari, everything was perfect. Thank you!", tripImg:"https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400&q=75&fit=crop",     tag:"Couple",       tagColor:"#0EA5E9", verified:true },
];

const PLATFORMS: Platform[] = [
  { name:"Google",      rating:"4.9", reviews:"1,240+", color:"#4285F4", icon: <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
  { name:"TripAdvisor", rating:"5.0", reviews:"860+",   color:"#00AA6C", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#00AA6C"><circle cx="6.5" cy="12" r="4.5"/><circle cx="17.5" cy="12" r="4.5"/><path d="M12 4C8.96 4 6.22 5.23 4.27 7.23L2 5h3.07A10 10 0 0 1 12 2c2.63 0 5.02.99 6.83 2.6L22 2v3.4A9.96 9.96 0 0 0 19.73 7.23C17.78 5.23 15.04 4 12 4z"/></svg> },
  { name:"Facebook",    rating:"4.8", reviews:"540+",   color:"#1877F2", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
];

const RATING_BARS = [
  { label: "Service Quality", pct: 98 },
  { label: "Value for Money", pct: 96 },
  { label: "Punctuality",     pct: 97 },
  { label: "Cleanliness",     pct: 95 },
];

/* ─── Hooks ─────────────────────────────────────────────────────────── */
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

/* ─── Stars ─────────────────────────────────────────────────────────── */
function Stars({ rating, size = 13 }: StarsProps) {
  return (
    <div style={{ display:"flex", gap:2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= rating ? "#FBBF24" : "rgba(255,255,255,0.15)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ─── ReviewCard ─────────────────────────────────────────────────────── */
function ReviewCard({ review, index, inView, isMobile }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 155;
  const displayText = (!expanded && isLong) ? review.text.slice(0, 155) + "…" : review.text;

  return (
    <div
      className="rev-card"
      style={{
        borderRadius:22, overflow:"hidden",
        background:"rgba(6,18,3,0.90)",
        border:"1px solid rgba(125,200,50,0.12)",
        transform: inView ? "translateY(0)" : "translateY(48px)",
        opacity: inView ? 1 : 0,
        transition:"all .48s cubic-bezier(.22,1,.36,1)",
        transitionDelay:`${index * 80}ms`,
        display:"flex", flexDirection:"column",
        boxShadow:"0 4px 24px rgba(0,0,0,0.28)",
      }}
    >
      {/* Photo strip */}
      <div className="rev-photo" style={{ position:"relative", overflow:"hidden", flexShrink:0 }}>
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`url(${review.tripImg})`,
          backgroundSize:"cover", backgroundPosition:"center",
          filter:"brightness(0.58) saturate(1.2)",
        }}/>
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to bottom,rgba(0,0,0,.08) 0%,rgba(6,18,3,.88) 100%)",
        }}/>
        {/* Tag */}
        <div style={{
          position:"absolute", bottom:13, left:14,
          background:review.tagColor, borderRadius:20, padding:"3px 11px",
          fontFamily:FB, fontSize:9, fontWeight:800,
          color:"#fff", letterSpacing:".12em", textTransform:"uppercase",
          boxShadow:`0 3px 12px ${review.tagColor}55`,
        }}>{review.tag}</div>
        {/* Trip name */}
        <div style={{
          position:"absolute", bottom:11, right:14,
          fontFamily:FB, fontSize:9.5, fontWeight:600,
          color:"rgba(210,240,170,0.68)",
        }}>{review.trip}</div>
      </div>

      {/* Body */}
      <div style={{ padding:"18px 18px 20px", flex:1, display:"flex", flexDirection:"column", gap:13 }}>

        {/* Avatar + name */}
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ position:"relative", flexShrink:0 }}>
            <Image
              src={review.avatar}
              alt={review.name}
              width={46}
              height={46}
              style={{
                width:46, height:46, borderRadius:"50%", objectFit:"cover",
                border:`2px solid ${review.tagColor}60`,
              }}
            />
            {review.verified && (
              <div style={{
                position:"absolute", bottom:-2, right:-2,
                width:16, height:16, borderRadius:"50%",
                background:C.gLeaf,
                display:"flex", alignItems:"center", justifyContent:"center",
                border:"2px solid rgba(6,18,3,0.95)",
              }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            )}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{
              fontFamily:F, fontStyle:"italic",
              fontSize:14, fontWeight:800, color:"#fff", lineHeight:1.2,
              whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
            }}>{review.name}</div>
            <div style={{ fontFamily:FB, fontSize:10.5, color:"rgba(180,225,120,0.50)", marginTop:2 }}>
              📍 {review.location}
            </div>
          </div>
          <div style={{ flexShrink:0, textAlign:"right" }}>
            <Stars rating={review.rating} size={11}/>
            <div style={{ fontFamily:FB, fontSize:9.5, color:"rgba(160,210,100,0.42)", marginTop:3 }}>
              {review.date}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:1, background:"linear-gradient(to right,transparent,rgba(125,200,50,0.14),transparent)" }}/>

        {/* Quote */}
        <div style={{ position:"relative" }}>
          <svg style={{ position:"absolute", top:-4, left:-2, opacity:.16 }}
            width="26" height="20" viewBox="0 0 28 22" fill={C.gLeaf}>
            <path d="M0 22V13.6C0 9.07 1.4 5.4 4.2 2.6 7 .2 10.27-.73 14 .4l-1.4 3.6c-2-.53-3.8-.07-5.4 1.4C5.6 6.87 4.8 8.8 4.8 11.2H8V22H0zm16 0V13.6c0-4.53 1.4-8.2 4.2-11C23 .2 26.27-.73 30 .4l-1.4 3.6c-2-.53-3.8-.07-5.4 1.4-1.6 1.47-2.4 3.4-2.4 5.8H24V22h-8z"/>
          </svg>
          <p style={{
            fontFamily:FB,
            fontSize: isMobile ? 12.5 : 13,
            color:"rgba(200,235,160,0.76)",
            lineHeight:1.78, margin:0, paddingLeft:6,
          }}>
            {displayText}
            {isLong && (
              <button
                onClick={() => setExpanded(e => !e)}
                style={{
                  background:"none", border:"none", cursor:"pointer",
                  fontFamily:FB, fontSize:11.5, fontWeight:700,
                  color:C.gLeaf, marginLeft:4, padding:0,
                  WebkitTapHighlightColor:"transparent",
                }}>
                {expanded ? " Show less" : " Read more"}
              </button>
            )}
          </p>
        </div>

        {/* Verified badge */}
        <div style={{
          marginTop:"auto",
          display:"flex", alignItems:"center", gap:6,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.gLeaf} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
          <span style={{ fontFamily:FB, fontSize:10, fontWeight:600, color:"rgba(125,200,50,0.58)" }}>
            Verified Traveller
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Carousel ────────────────────────────────────────────────── */
function MobileCarousel({ inView }: { inView: boolean }) {
  const [current, setCurrent]   = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused]     = useState(false);
  const startX   = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const progRef  = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const DURATION = 4500;
  const total    = REVIEWS.length;

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total);
    setProgress(0);
  }, [total]);

  useEffect(() => {
    if (!inView || paused) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(0);
    clearInterval(timerRef.current);
    clearInterval(progRef.current);
    const start = Date.now();
    progRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / DURATION) * 100, 100));
    }, 30);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total);
      setProgress(0);
    }, DURATION);
    return () => { clearInterval(timerRef.current); clearInterval(progRef.current); };
  }, [current, inView, paused, total]);

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; setPaused(true); };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 44) goTo(current + (dx < 0 ? 1 : -1));
    setPaused(false);
  };

  const rev = REVIEWS[current];

  return (
    <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(36px)", transition:"all .6s ease" }}>

      {/* Name tab strip */}
      <div className="tab-strip-scroll" style={{ marginBottom:16 }}>
        <div style={{ display:"flex", gap:8, width:"max-content", paddingBottom:2 }}>
          {REVIEWS.map((r, i) => (
            <button key={i} onClick={() => { goTo(i); setPaused(false); }} style={{
              fontFamily:FB, fontSize:11.5, fontWeight:700,
              padding:"7px 15px", borderRadius:30, border:"none",
              background: current===i ? rev.tagColor : "rgba(255,255,255,0.09)",
              color: current===i ? "#fff" : "rgba(255,255,255,0.52)",
              cursor:"pointer", whiteSpace:"nowrap",
              transition:"all .28s",
              boxShadow: current===i ? `0 4px 16px ${rev.tagColor}55` : "none",
              letterSpacing:".02em",
            }}>{r.name.split(" ")[0]}</button>
          ))}
        </div>
      </div>

      {/* Card */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ position:"relative", userSelect:"none" }}
      >
        {/* Progress bar at top */}
        <div style={{ height:3, borderRadius:2, background:"rgba(255,255,255,0.10)", marginBottom:10, overflow:"hidden" }}>
          <div style={{
            height:"100%", width:`${progress}%`,
            background:`linear-gradient(to right,${rev.tagColor},${C.gLeaf})`,
            transition:"width .03s linear,background .40s",
            borderRadius:2,
          }}/>
        </div>

        <ReviewCard review={rev} index={0} inView={true} isMobile={true} />
      </div>

      {/* Dots + counter */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginTop:20 }}>
        {REVIEWS.map((r, i) => (
          <button key={i} onClick={() => { goTo(i); setPaused(false); }} style={{
            width:current===i?28:8, height:8, borderRadius:4, border:"none",
            background:current===i ? r.tagColor : "rgba(255,255,255,0.20)",
            cursor:"pointer", transition:"all .34s cubic-bezier(.22,1,.36,1)", padding:0,
            boxShadow:current===i ? `0 0 10px ${r.tagColor}80` : "none",
          }}/>
        ))}
        <span style={{ fontFamily:FB,fontSize:11,color:"rgba(255,255,255,0.32)",marginLeft:8,fontWeight:600 }}>
          {current+1} / {total}
        </span>
      </div>
      <p style={{ textAlign:"center",marginTop:8,fontFamily:FB,fontSize:11,color:"rgba(255,255,255,0.22)",letterSpacing:".04em" }}>
        ← Swipe to browse →
      </p>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────── */
export default function TestimonialsSection() {
  const width    = useW();
  const isXS     = width < 480;
  const isSM     = width >= 480 && width < 640;
  const isMD     = width >= 640 && width < 1024;
  const isLG     = width >= 1024 && width < 1280;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const secRef   = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(secRef);
  const cardsIn   = useInView(cardsRef);
  const ratingIn  = useInView(ratingRef);

  const px    = isXS ? "16px" : isSM ? "18px" : isMD ? "28px" : isLG ? "40px" : "52px";
  const pyTop = isXS ? "60px" : isMD ? "80px" : "96px";
  const pyBot = isXS ? "68px" : isMD ? "88px" : "108px";
  const h2Sz  = isXS ? "26px" : isSM ? "30px" : isMD ? "40px" : isLG ? "46px" : "52px";
  const gridCols = isTablet ? "1fr 1fr" : "1fr 1fr 1fr";

  return (
    <section style={{ fontFamily:FB, position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        button { -webkit-tap-highlight-color:transparent; cursor:pointer; }
        button:active { transform:scale(0.96)!important; }

        /* Review card photo height */
        .rev-photo { height:88px; }
        @media(min-width:640px)  { .rev-photo { height:96px; } }
        @media(min-width:1024px) { .rev-photo { height:100px; } }

        /* Tab strip scroll */
        .tab-strip-scroll { overflow-x:auto; scrollbar-width:none; padding-bottom:4px; }
        .tab-strip-scroll::-webkit-scrollbar { display:none; }

        /* Platform pills mobile scroll */
        .platform-strip { overflow-x:auto; scrollbar-width:none; }
        .platform-strip::-webkit-scrollbar { display:none; }

        /* Keyframes */
        @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.55)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }

        /* Card hover — desktop only */
        @media(hover:hover) {
          .rev-card:hover { transform:translateY(-6px)!important; border-color:rgba(125,200,50,0.28)!important; box-shadow:0 22px 50px rgba(0,0,0,0.40)!important; }
        }

        /* CTA layout */
        .cta-inner { display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        @media(max-width:639px) { .cta-inner { flex-direction:column; align-items:flex-start; } }
        .cta-btns { display:flex; gap:12px; flex-wrap:wrap; flex-shrink:0; }
        @media(max-width:479px) {
          .cta-btns { width:100%; flex-direction:column; }
          .cta-btns button { width:100%!important; justify-content:center!important; }
        }
      `}</style>

      {/* ── Backgrounds ── */}
      <div style={{
        position:"absolute",inset:0,zIndex:0,
        backgroundImage:`url(${HERO_BG})`,
        backgroundSize:"cover",backgroundPosition:"center 60%",
        backgroundAttachment:isMobile?"scroll":"fixed",
        filter:"brightness(0.18) saturate(1.4)",
      }}/>
      <div style={{
        position:"absolute",inset:0,zIndex:2,pointerEvents:"none",
        background:`
          radial-gradient(ellipse 65% 50% at 10% 5%,rgba(46,128,16,.12) 0%,transparent 58%),
          radial-gradient(ellipse 55% 45% at 90% 90%,rgba(15,61,6,.17) 0%,transparent 55%),
          linear-gradient(180deg,rgba(4,12,2,.68) 0%,rgba(6,18,3,.25) 40%,rgba(4,10,2,.70) 100%)
        `,
      }}/>
      <div style={{ position:"absolute",inset:0,zIndex:3,pointerEvents:"none",opacity:.016,backgroundImage:`radial-gradient(circle,${C.gLeaf} 1px,transparent 1px)`,backgroundSize:"38px 38px" }}/>

      {/* ── Content ── */}
      <div style={{ position:"relative",zIndex:10,maxWidth:1320,margin:"0 auto",padding:`${pyTop} ${px} ${pyBot}` }}>

        {/* ── Header ── */}
        <div ref={secRef} style={{ marginBottom:isMobile?28:50 }}>

          {/* Eyebrow */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:10,marginBottom:16,animation:inView?"fadeUp .55s ease both":"none" }}>
            <div style={{ height:2,width:26,borderRadius:2,background:`linear-gradient(to right,${C.gDeep},${C.gLeaf})` }}/>
            <span style={{ width:5,height:5,borderRadius:"50%",background:C.gLeaf,display:"inline-block",animation:"pulse 2.2s infinite" }}/>
            <span style={{ fontFamily:FB,fontSize:isXS?9:10,fontWeight:700,color:C.gLeaf,letterSpacing:".20em",textTransform:"uppercase" }}>Real Traveller Stories</span>
            <span style={{ width:5,height:5,borderRadius:"50%",background:C.gLeaf,display:"inline-block",animation:"pulse 2.2s .5s infinite" }}/>
            <div style={{ height:2,width:26,borderRadius:2,background:`linear-gradient(to left,${C.gDeep},${C.gLeaf})` }}/>
          </div>

          {/* Title row */}
          <div style={{
            display:"flex",
            flexDirection:isMobile?"column":"row",
            alignItems:isMobile?"flex-start":"flex-end",
            justifyContent:"space-between", gap:20,
          }}>
            <div style={{ animation:inView?"fadeUp .58s .06s ease both":"none" }}>
              <h2 style={{
                fontFamily:F, fontStyle:"italic",
                fontSize:h2Sz, fontWeight:800, color:"#fff",
                margin:"0 0 12px", letterSpacing:"-.032em", lineHeight:1.03,
                textShadow:"0 4px 28px rgba(0,0,0,.55)",
              }}>
                What Our{" "}
                <span style={{
                  background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 45%,${C.gMid} 100%)`,
                  backgroundSize:"200% auto",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
                  animation:"shimmer 4s linear infinite",
                }}>Travellers Say</span>
              </h2>
              <p style={{
                fontFamily:FB, fontSize:isXS?12.5:isMobile?13:14.5,
                color:"rgba(180,225,130,0.65)", maxWidth:480, lineHeight:1.82, margin:0,
              }}>
                Over 8,500 happy travellers and counting — here&apos;s what they say about their experience with us.
              </p>
            </div>

            {/* Platform ratings — desktop */}
            {!isMobile && (
              <div style={{ display:"flex",gap:12,flexShrink:0,animation:inView?"fadeUp .58s .12s ease both":"none" }}>
                {PLATFORMS.map(p => (
                  <div key={p.name} style={{
                    padding:"12px 18px",borderRadius:14,
                    background:"rgba(6,18,3,0.80)",backdropFilter:"blur(14px)",
                    border:"1px solid rgba(125,200,50,0.14)",
                    display:"flex",alignItems:"center",gap:10,
                    boxShadow:"0 4px 20px rgba(0,0,0,0.25)",
                  }}>
                    {p.icon}
                    <div>
                      <div style={{ fontFamily:F,fontStyle:"italic",fontSize:16,fontWeight:800,color:"#fff",lineHeight:1 }}>
                        {p.rating} <span style={{ fontFamily:FB,fontSize:11,color:"#FBBF24",fontStyle:"normal" }}>★</span>
                      </div>
                      <div style={{ fontFamily:FB,fontSize:9.5,color:"rgba(170,215,110,0.48)",marginTop:2 }}>
                        {p.reviews} on {p.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Platform ratings — mobile scroll */}
          {isMobile && (
            <div className="platform-strip" style={{ display:"flex",gap:10,marginTop:18,paddingBottom:4 }}>
              {PLATFORMS.map(p => (
                <div key={p.name} style={{
                  padding:"10px 14px",borderRadius:12,flexShrink:0,
                  background:"rgba(6,18,3,0.80)",backdropFilter:"blur(14px)",
                  border:"1px solid rgba(125,200,50,0.14)",
                  display:"flex",alignItems:"center",gap:8,
                }}>
                  {p.icon}
                  <div>
                    <div style={{ fontFamily:F,fontStyle:"italic",fontSize:14,fontWeight:800,color:"#fff" }}>
                      {p.rating} <span style={{ fontFamily:FB,fontSize:10,color:"#FBBF24",fontStyle:"normal" }}>★</span>
                    </div>
                    <div style={{ fontFamily:FB,fontSize:9,color:"rgba(170,215,110,0.48)" }}>
                      {p.reviews} on {p.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Rating summary bar ── */}
        <div
          ref={ratingRef}
          style={{
            marginBottom:isMobile?28:44,
            padding:isXS?"20px 16px":isMobile?"24px 18px":"28px 36px",
            borderRadius:20,
            background:"rgba(6,18,3,0.83)",
            backdropFilter:"blur(18px)",
            border:"1px solid rgba(125,200,50,0.16)",
            display:"flex",
            flexDirection:isMobile?"column":"row",
            alignItems:isMobile?"flex-start":"center",
            gap:isMobile?20:40,
            animation:inView?"fadeUp .58s .18s ease both":"none",
          }}
        >
          {/* Big score */}
          <div style={{ textAlign:"center", flexShrink:0 }}>
            <div style={{
              fontFamily:F, fontStyle:"italic",
              fontSize:isMobile?54:72, fontWeight:800,
              color:C.gLeaf, lineHeight:1, letterSpacing:"-.04em",
            }}>4.9</div>
            <Stars rating={5} size={isMobile?14:16}/>
            <div style={{ fontFamily:FB,fontSize:11,color:"rgba(170,215,110,0.50)",marginTop:6,fontWeight:600 }}>
              Overall Rating
            </div>
          </div>

          {/* Divider */}
          <div style={{
            width:isMobile?"100%":1, height:isMobile?1:80,
            background:"linear-gradient(to bottom,transparent,rgba(125,200,50,0.20),transparent)",
            flexShrink:0,
          }}/>

          {/* Rating bars */}
          <div style={{ flex:1,display:"flex",flexDirection:"column",gap:10,width:isMobile?"100%":"auto" }}>
            {RATING_BARS.map(r => (
              <div key={r.label} style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div style={{ fontFamily:FB,fontSize:isXS?10.5:11.5,fontWeight:600,color:"rgba(185,230,130,0.65)",width:isXS?100:130,flexShrink:0 }}>{r.label}</div>
                <div style={{ flex:1,height:6,borderRadius:6,background:"rgba(255,255,255,0.08)",overflow:"hidden" }}>
                  <div style={{
                    height:"100%",borderRadius:6,
                    width:ratingIn?`${r.pct}%`:"0%",
                    background:`linear-gradient(to right,${C.gMid},${C.gLeaf})`,
                    transition:"width 1.2s cubic-bezier(.22,1,.36,1)",transitionDelay:".3s",
                  }}/>
                </div>
                <div style={{ fontFamily:FB,fontSize:11.5,fontWeight:700,color:C.gLeaf,width:32,textAlign:"right",flexShrink:0 }}>{r.pct}%</div>
              </div>
            ))}
          </div>

          {/* Totals — desktop */}
          {!isMobile && (
            <>
              <div style={{ width:1,height:80,background:"linear-gradient(to bottom,transparent,rgba(125,200,50,0.20),transparent)",flexShrink:0 }}/>
              <div style={{ flexShrink:0,display:"flex",flexDirection:"column",gap:14 }}>
                {[{val:"8,500+",label:"Reviews"},{val:"100%",label:"Recommend Us"}].map(s => (
                  <div key={s.label} style={{ textAlign:"center" }}>
                    <div style={{ fontFamily:F,fontStyle:"italic",fontSize:26,fontWeight:800,color:"#fff",letterSpacing:"-.03em" }}>{s.val}</div>
                    <div style={{ fontFamily:FB,fontSize:10.5,fontWeight:600,color:"rgba(170,215,110,0.50)",letterSpacing:".04em" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Mobile: auto-play carousel ── */}
        {isMobile && <MobileCarousel inView={cardsIn || inView} />}

        {/* ── Desktop/Tablet: grid ── */}
        {!isMobile && (
          <div
            ref={cardsRef}
            style={{ display:"grid",gridTemplateColumns:gridCols,gap:isTablet?18:22 }}
          >
            {REVIEWS.map((review, i) => (
              <ReviewCard key={review.name} review={review} index={i} inView={cardsIn} isMobile={false} />
            ))}
          </div>
        )}

        {/* Invisible inView trigger for mobile carousel */}
        {isMobile && <div ref={cardsRef} style={{ height:1 }}/>}

        {/* ── CTA Banner ── */}
        <div style={{
          marginTop:isMobile?40:60,
          borderRadius:22,overflow:"hidden",position:"relative",
          animation:inView?"fadeUp .65s .35s ease both":"none",
        }}>
          <div style={{
            position:"absolute",inset:0,
            backgroundImage:"url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=75&fit=crop)",
            backgroundSize:"cover",backgroundPosition:"center",
            filter:"brightness(0.16) saturate(1.5)",
          }}/>
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(120deg,rgba(8,24,4,0.94) 0%,rgba(18,50,8,0.82) 100%)" }}/>

          <div
            className="cta-inner"
            style={{
              position:"relative",zIndex:2,
              padding:isXS?"24px 16px":isMobile?"28px 20px":isMD?"34px 40px":"38px 52px",
            }}
          >
            <div>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
                <Stars rating={5} size={13}/>
                <span style={{ fontFamily:FB,fontSize:12,fontWeight:700,color:"#FBBF24" }}>4.9 / 5.0</span>
                <span style={{ fontFamily:FB,fontSize:11,color:"rgba(170,215,110,0.48)" }}>· 8,500+ reviews</span>
              </div>
              <div style={{
                fontFamily:F,fontStyle:"italic",
                fontSize:isXS?18:isMobile?20:24,
                fontWeight:800,color:"#fff",marginBottom:7,letterSpacing:"-.02em",lineHeight:1.2,
              }}>
                Join thousands of happy travellers
              </div>
              <div style={{ fontFamily:FB,fontSize:isXS?12.5:13.5,color:"rgba(178,222,118,0.56)",lineHeight:1.65,maxWidth:420 }}>
                Your perfect hill station trip is one call away. Let us make your story the next great review.
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
                Book Your Trip
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}