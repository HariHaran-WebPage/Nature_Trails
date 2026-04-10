"use client";
import { useState, useEffect, useRef, ReactNode, RefObject } from "react";

/* ─── Tokens ─────────────────────────────────────────────────────────── */
const C = {
  gDeep: "#0F3D06", gDark: "#1A5C0A", gMid: "#2E8010",
  gLeaf: "#6BBD28", gLight: "#96D94A",
};
const F  = "'Playfair Display', Georgia, serif";
const FB = "'DM Sans', 'Segoe UI', sans-serif";
const HERO_BG = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=85&fit=crop";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface Reason {
  icon: ReactNode; title: string; desc: string;
  accent: string; stat: string; statLabel: string;
}
interface ProcessStep {
  step: string; title: string; desc: string; icon: string;
}
interface ReasonCardProps {
  r: Reason; index: number; inView: boolean; isMobile: boolean;
}

/* ─── Data ──────────────────────────────────────────────────────────── */
const REASONS: Reason[] = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
    title: "100% Safe & Trusted",
    desc: "All our vehicles are GPS-tracked, insured and regularly maintained. Your safety is our top priority on every trip.",
    accent: C.gLeaf, stat: "0 incidents", statLabel: "in 12 years",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: "On-Time Guarantee",
    desc: "We respect your time. Our drivers arrive 10 minutes early, every time. Delayed? We refund your waiting charges.",
    accent: "#F59E0B", stat: "97%", statLabel: "on-time rate",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "Local Expert Guides",
    desc: "Our guides are born and raised in the hills — they know every hidden trail, waterfall and local eatery you'd never find alone.",
    accent: "#0EA5E9", stat: "25+", statLabel: "expert guides",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    title: "Best Price Promise",
    desc: "Found the same package cheaper elsewhere? We'll beat it by 5%. No hidden charges, no surprise fees — transparent pricing always.",
    accent: "#10B981", stat: "₹0", statLabel: "hidden charges",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    title: "24 / 7 Support",
    desc: "A real person — not a bot — answers your call any time of day or night. We're with you from booking until you're safely home.",
    accent: "#8B5CF6", stat: "< 2 min", statLabel: "avg response",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    title: "Custom Itineraries",
    desc: "Every traveller is different. We craft personalised itineraries around your budget, interests, pace and group — no template tours.",
    accent: "#EC4899", stat: "100%", statLabel: "personalised",
  },
];

const PROCESS: ProcessStep[] = [
  { step:"01", title:"Tell Us Your Plan",  desc:"Share your destination, dates, budget and group size — takes 2 minutes.", icon:"📋" },
  { step:"02", title:"Get Free Quote",     desc:"We send a detailed, no-obligation itinerary and price within 2 hours.",   icon:"💬" },
  { step:"03", title:"Confirm & Relax",    desc:"Pay a small advance, confirm your booking and leave the planning to us.", icon:"✅" },
  { step:"04", title:"Enjoy Your Trip",    desc:"We handle everything — transport, stays, guides and 24/7 support.",       icon:"🏔️" },
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

/* ─── ReasonCard ─────────────────────────────────────────────────────── */
function ReasonCard({ r, index, inView, isMobile }: ReasonCardProps) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="reason-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 20,
        padding: isMobile ? "22px 18px" : "28px 24px",
        background: hov ? "rgba(10,28,5,0.97)" : "rgba(6,18,3,0.85)",
        border: `1.5px solid ${hov ? r.accent + "55" : "rgba(255,255,255,0.08)"}`,
        boxShadow: hov
          ? `0 24px 50px rgba(0,0,0,0.45),0 0 0 1px ${r.accent}22`
          : "0 4px 20px rgba(0,0,0,0.28)",
        transform: inView
          ? hov ? "translateY(-6px)" : "translateY(0)"
          : "translateY(44px)",
        opacity: inView ? 1 : 0,
        transition: "all .44s cubic-bezier(.22,1,.36,1)",
        transitionDelay: `${index * 70}ms`,
        cursor: "default",
        display: "flex", flexDirection: "column", gap: 14,
      }}
    >
      {/* Icon */}
      <div style={{
        width: 54, height: 54, borderRadius: 14,
        background: hov ? r.accent : `${r.accent}18`,
        border: `1.5px solid ${r.accent}35`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? "#fff" : r.accent,
        transition: "all .36s cubic-bezier(.22,1,.36,1)",
        boxShadow: hov ? `0 8px 24px ${r.accent}45` : "none",
        transform: hov ? "scale(1.08) rotate(-4deg)" : "none",
        flexShrink: 0,
      }}>{r.icon}</div>

      <div>
        <div style={{
          fontFamily: F, fontStyle: "italic",
          fontSize: isMobile ? 15.5 : 17, fontWeight: 800,
          color: "#fff", marginBottom: 8, lineHeight: 1.2,
        }}>{r.title}</div>
        <p style={{
          fontFamily: FB, fontSize: isMobile ? 12.5 : 13,
          color: "rgba(190,230,140,0.62)", lineHeight: 1.78, margin: 0,
        }}>{r.desc}</p>
      </div>

      {/* Stat chip */}
      <div style={{
        marginTop: "auto",
        display: "inline-flex", alignItems: "baseline", gap: 6,
        background: `${r.accent}12`,
        border: `1px solid ${r.accent}28`,
        borderRadius: 10, padding: "7px 13px",
        alignSelf: "flex-start",
      }}>
        <span style={{ fontFamily: F, fontStyle: "italic", fontSize: 17, fontWeight: 800, color: r.accent, letterSpacing: "-.02em" }}>{r.stat}</span>
        <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 600, color: `${r.accent}90` }}>{r.statLabel}</span>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  const width    = useW();
  const isXS     = width < 480;
  const isSM     = width >= 480 && width < 640;
  const isMD     = width >= 640 && width < 1024;
  const isLG     = width >= 1024 && width < 1280;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const secRef   = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const procRef  = useRef<HTMLDivElement>(null);
  const inView   = useInView(secRef);
  const cardsIn  = useInView(cardsRef);
  const procIn   = useInView(procRef);

  /* Responsive values */
  const px      = isXS ? "16px" : isSM ? "18px" : isMD ? "28px" : isLG ? "40px" : "52px";
  const pyTop   = isXS ? "60px" : isMD ? "80px" : "96px";
  const pyBot   = isXS ? "68px" : isMD ? "88px" : "108px";
  const h2Size  = isXS ? "26px" : isSM ? "30px" : isMD ? "40px" : isLG ? "46px" : "52px";
  const h3Size  = isXS ? "20px" : isSM ? "22px" : "30px";
  const gridCols = isXS ? "1fr" : isSM ? "1fr" : isMD ? "1fr 1fr" : "1fr 1fr 1fr";
  const stepCols = isXS ? "1fr" : isSM ? "1fr 1fr" : isMD ? "1fr 1fr" : "repeat(4,1fr)";
  const cardGap  = isMobile ? 12 : isMD ? 16 : 22;

  return (
    <section style={{ fontFamily: FB, position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        button { -webkit-tap-highlight-color:transparent; cursor:pointer; }
        button:active { transform:scale(0.96)!important; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.55)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }

        /* Reason card hover — desktop only */
        @media(hover:none) { .reason-card { transform:translateY(0)!important; } }

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
        backgroundSize:"cover",backgroundPosition:"center 50%",
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
      <div style={{
        position:"absolute",inset:0,zIndex:3,pointerEvents:"none",opacity:.016,
        backgroundImage:`radial-gradient(circle,${C.gLeaf} 1px,transparent 1px)`,
        backgroundSize:"38px 38px",
      }}/>

      {/* ── Content ── */}
      <div style={{ position:"relative",zIndex:10,maxWidth:1320,margin:"0 auto",padding:`${pyTop} ${px} ${pyBot}` }}>

        {/* ── Header ── */}
        <div ref={secRef} style={{ marginBottom:isMobile?32:52,animation:inView?"fadeUp .55s ease both":"none" }}>

          {/* Eyebrow */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:10,marginBottom:isXS?14:18 }}>
            <div style={{ height:2,width:26,borderRadius:2,background:`linear-gradient(to right,${C.gDeep},${C.gLeaf})` }}/>
            <span style={{ width:5,height:5,borderRadius:"50%",background:C.gLeaf,display:"inline-block",animation:"pulse 2.2s infinite" }}/>
            <span style={{ fontFamily:FB,fontSize:isXS?9:10,fontWeight:700,color:C.gLeaf,letterSpacing:".20em",textTransform:"uppercase" }}>Why Travel With Us</span>
            <span style={{ width:5,height:5,borderRadius:"50%",background:C.gLeaf,display:"inline-block",animation:"pulse 2.2s .5s infinite" }}/>
            <div style={{ height:2,width:26,borderRadius:2,background:`linear-gradient(to left,${C.gDeep},${C.gLeaf})` }}/>
          </div>

          {/* Title row */}
          <div style={{ display:"flex",flexDirection:isMobile?"column":"row",alignItems:isMobile?"flex-start":"flex-end",justifyContent:"space-between",gap:20 }}>
            <div>
              <h2 style={{
                fontFamily:F, fontStyle:"italic",
                fontSize:h2Size, fontWeight:800, color:"#fff",
                margin:"0 0 12px", letterSpacing:"-.032em", lineHeight:1.03,
                textShadow:"0 4px 28px rgba(0,0,0,.55)",
              }}>
                The Smarter Way{" "}
                <span style={{
                  background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 45%,${C.gMid} 100%)`,
                  backgroundSize:"200% auto",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
                  animation:"shimmer 4s linear infinite",
                }}>to Travel</span>
              </h2>
              <p style={{
                fontFamily:FB, fontSize:isXS?12.5:isMobile?13:14.5,
                color:"rgba(180,225,130,0.65)", maxWidth:500, lineHeight:1.82, margin:0,
              }}>
                We&apos;ve been planning South India&apos;s best hill station trips for 12 years. Here&apos;s why 8,500+ travellers choose us — and come back.
              </p>
            </div>

            {/* 12 yrs badge — desktop */}
            {!isMobile && (
              <div style={{
                flexShrink:0,width:108,height:108,borderRadius:"50%",
                background:"rgba(6,18,3,0.86)",
                border:`2px solid ${C.gLeaf}40`,
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                boxShadow:`0 0 0 8px ${C.gLeaf}0A,0 12px 40px rgba(0,0,0,0.35)`,
                animation:inView?"fadeUp .58s .14s ease both":"none",
              }}>
                <div style={{ fontFamily:F,fontStyle:"italic",fontSize:34,fontWeight:800,color:C.gLeaf,lineHeight:1,letterSpacing:"-.04em" }}>12</div>
                <div style={{ fontFamily:FB,fontSize:9.5,fontWeight:700,color:"rgba(180,225,120,0.55)",letterSpacing:".10em",textTransform:"uppercase" }}>Years of</div>
                <div style={{ fontFamily:FB,fontSize:9.5,fontWeight:700,color:"rgba(180,225,120,0.55)",letterSpacing:".10em",textTransform:"uppercase" }}>Excellence</div>
              </div>
            )}
          </div>
        </div>

        {/* ── Reasons Grid ── */}
        <div
          ref={cardsRef}
          style={{ display:"grid",gridTemplateColumns:gridCols,gap:cardGap,marginBottom:isMobile?44:68 }}
        >
          {REASONS.map((r, i) => (
            <ReasonCard key={r.title} r={r} index={i} inView={cardsIn} isMobile={isMobile} />
          ))}
        </div>

        {/* ── How It Works ── */}
        <div ref={procRef}>

          {/* Section label */}
          <div style={{ textAlign:"center",marginBottom:isMobile?28:40,animation:procIn?"fadeUp .55s ease both":"none" }}>
            <div style={{ fontFamily:FB,fontSize:10,fontWeight:700,color:C.gLeaf,letterSpacing:".18em",textTransform:"uppercase",marginBottom:10 }}>
              Simple Process
            </div>
            <h3 style={{
              fontFamily:F, fontStyle:"italic",
              fontSize:h3Size, fontWeight:800, color:"#fff",
              margin:"0 0 10px", letterSpacing:"-.025em",
            }}>
              Book in 4 Easy Steps
            </h3>
            <p style={{
              fontFamily:FB, fontSize:isXS?12.5:14,
              color:"rgba(180,225,130,0.60)", maxWidth:420, margin:"0 auto", lineHeight:1.78,
            }}>
              No complicated forms, no long waits — just a quick chat and we handle everything else.
            </p>
          </div>

          {/* Steps grid */}
          <div style={{ display:"grid",gridTemplateColumns:stepCols,gap:isMobile?12:18,position:"relative" }}>
            {/* Connector line — 4-col desktop only */}
            {!isMobile && !isTablet && (
              <div style={{
                position:"absolute",top:36,left:"12.5%",right:"12.5%",height:2,
                background:`linear-gradient(to right,${C.gLeaf}60,${C.gLeaf}20,${C.gLeaf}60)`,
                zIndex:0,borderRadius:2,
              }}/>
            )}

            {PROCESS.map((p, i) => (
              <div key={p.step} style={{
                borderRadius:18,
                padding:isXS?"18px 14px":isMobile?"20px 16px":"24px 20px",
                background:"rgba(6,18,3,0.86)",
                border:"1px solid rgba(125,200,50,0.12)",
                display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:12,
                position:"relative",zIndex:1,
                transform:procIn?"translateY(0)":"translateY(40px)",
                opacity:procIn?1:0,
                transition:"all .46s cubic-bezier(.22,1,.36,1)",
                transitionDelay:`${i*100}ms`,
                boxShadow:"0 4px 20px rgba(0,0,0,0.24)",
              }}>
                {/* Step bubble */}
                <div style={{
                  width:60,height:60,borderRadius:"50%",
                  background:`linear-gradient(135deg,${C.gDeep},${C.gMid})`,
                  border:`2px solid ${C.gLeaf}45`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  boxShadow:`0 8px 24px ${C.gMid}40`,
                  fontSize:24,position:"relative",
                }}>
                  {p.icon}
                  <div style={{
                    position:"absolute",top:-6,right:-6,
                    width:22,height:22,borderRadius:"50%",
                    background:C.gLeaf,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontFamily:FB,fontSize:9,fontWeight:800,color:C.gDeep,
                    border:"2px solid rgba(6,18,3,0.90)",
                  }}>{p.step}</div>
                </div>

                <div style={{
                  fontFamily:F, fontStyle:"italic",
                  fontSize:isXS?14:15, fontWeight:800, color:"#fff", lineHeight:1.2,
                }}>{p.title}</div>
                <p style={{
                  fontFamily:FB, fontSize:isXS?11.5:12.5,
                  color:"rgba(185,230,130,0.58)", lineHeight:1.72, margin:0,
                }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

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
                <span style={{ width:7,height:7,borderRadius:"50%",background:C.gLeaf,display:"inline-block",boxShadow:`0 0 0 3px ${C.gLeaf}28`,animation:"pulse 1.8s infinite" }}/>
                <span style={{ fontFamily:FB,fontSize:9.5,fontWeight:700,color:C.gLeaf,letterSpacing:".18em",textTransform:"uppercase" }}>Ready to Plan?</span>
              </div>
              <div style={{
                fontFamily:F, fontStyle:"italic",
                fontSize:isXS?18:isMobile?20:24,
                fontWeight:800,color:"#fff",marginBottom:7,letterSpacing:"-.02em",lineHeight:1.2,
              }}>
                Start your hill station adventure today
              </div>
              <div style={{
                fontFamily:FB,fontSize:isXS?12.5:13.5,
                color:"rgba(178,222,118,0.56)",lineHeight:1.65,
              }}>
                Free consultation · Custom itinerary · No advance payment to enquire
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
                Get Free Quote
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