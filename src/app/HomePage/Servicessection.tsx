"use client";
import { useState, useEffect, useRef, ReactNode, RefObject } from "react";

/* ─── Design Tokens ─────────────────────────────────────────────────── */
const C = {
  gDeep: "#0F3D06", gDark: "#1A5C0A", gMid: "#2E8010",
  gLeaf: "#6BBD28", gLight: "#96D94A", gPale: "#C8EDAA",
  brMid: "#5A2E12", gold: "#C8A84B",
};
const F  = "'Playfair Display', Georgia, serif";
const FB = "'DM Sans', 'Segoe UI', sans-serif";

/* ─── Types ─────────────────────────────────────────────────────────── */
type ImgKey = "ooty" | "kodaikanal" | "munnar" | "road" | "hotel" | "support";
interface ServiceData {
  icon: ReactNode; title: string; short: string;
  desc: string; highlight: string; color: string; imgKey: ImgKey;
}
interface CounterProps { target: number; suffix: string; go: boolean; }
interface CardProps    { svc: ServiceData; index: number; inView: boolean; }

/* ─── Images ─────────────────────────────────────────────────────────── */
const SERVICE_IMAGES: Record<ImgKey, string> = {
  ooty:       "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=82&fit=crop",
  kodaikanal: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=82&fit=crop",
  munnar:     "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=82&fit=crop",
  road:       "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=82&fit=crop",
  hotel:      "https://images.unsplash.com/photo-1582479253765-44e25ea4f56a?w=800&q=82&fit=crop",
  support:    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=82&fit=crop",
};
const HERO_BG      = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=85&fit=crop";
const LEAF_OVERLAY = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&q=60&fit=crop";

/* ─── Icons ──────────────────────────────────────────────────────────── */
const IcoOoty = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><circle cx="12" cy="12" r="3"/></svg>;
const IcoKodaikanal = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>;
const IcoMunnar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10c0-3.5 2.5-6 6-6s6 2.5 6 6c0 4-6 10-6 10s-6-6-6-10z"/><path d="M15 10c0-3.5 2.5-6 6-6s6 2.5 6 6c0 4-6 10-6 10s-6-6-6-10z"/></svg>;
const IcoTaxi = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const IcoHotel = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IcoSupport = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;

// Services focused on Ooty, Kodaikanal, Munnar + essential travel services
const SERVICES: ServiceData[] = [
  { icon: <IcoOoty/>, title: "Ooty Tour Packages", short: "Queen of Hills", desc: "Experience the charm of Nilgiris with tea garden visits, boating at Ooty Lake, and stunning views from Doddabetta Peak.", highlight: "From ₹2,499/person", color: C.gDark, imgKey: "ooty" },
  { icon: <IcoKodaikanal/>, title: "Kodaikanal Getaway", short: "Princess of Hills", desc: "Discover the mystical Kodaikanal with Coaker's Walk, Silver Cascade, and peaceful boat rides on the star-shaped lake.", highlight: "From ₹2,999/person", color: "#B84C6E", imgKey: "kodaikanal" },
  { icon: <IcoMunnar/>, title: "Munnar Honeymoon", short: "God's Own Country", desc: "Rolling tea estates, misty mountains, and romantic sunsets. Perfect for couples seeking tranquility in Kerala's hills.", highlight: "From ₹3,499/couple", color: C.gMid, imgKey: "munnar" },
  { icon: <IcoTaxi/>, title: "Coimbatore to Hills Taxi", short: "Door-to-Door", desc: "Comfortable AC cabs from Coimbatore Airport, Railway Station, or your doorstep to Ooty, Kodaikanal, or Munnar.", highlight: "From ₹1,299 one-way", color: C.brMid, imgKey: "road" },
  { icon: <IcoHotel/>, title: "Hill Station Stays", short: "Rest in Comfort", desc: "Curated stays from budget-friendly homestays to luxury resorts with valley views. All vetted for quality.", highlight: "Stays from ₹799/night", color: "#2E7D8C", imgKey: "hotel" },
  { icon: <IcoSupport/>, title: "24/7 Travel Support", short: "Always Here", desc: "Our Coimbatore-based team is just a call or WhatsApp away. We're here before, during, and after your trip.", highlight: "Instant Response", color: C.gLeaf, imgKey: "support" },
];

// Realistic stats for a startup launched this year
const STATS = [
  { num: 128,  suffix: "+",     label: "Happy Travellers (2024)" },
  { num: 8,    suffix: "+",     label: "Curated Packages"    },
  { num: 1,    suffix: " Yr",   label: "Journey Started"       },
  { num: 4.9,  suffix: "★",    label: "Customer Rating"       },
];

/* ─── Hooks ──────────────────────────────────────────────────────────── */
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

function useInView(ref: RefObject<HTMLElement | null>) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return vis;
}

/* ─── Counter ─────────────────────────────────────────────────────────── */
function Counter({ target, suffix, go }: CounterProps) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    if (String(target).includes(".")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setN(target);
      return;
    }
    let cur = 0; const step = Math.ceil(target / 55);
    const id = setInterval(() => { cur += step; if (cur >= target) { setN(target); clearInterval(id); } else setN(cur); }, 28);
    return () => clearInterval(id);
  }, [go, target]);
  return <>{n.toLocaleString()}{suffix}</>;
}

/* ─── Desktop ServiceCard (Improved Design) ─────────────────────────────── */
function ServiceCard({ svc, index, inView }: CardProps) {
  const [hov, setHov] = useState(false);
  const needsDark = [C.gLeaf, C.gMid, C.gDark, C.gLight].includes(svc.color);
  
  return (
    <div
      className="svc-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 24, overflow: "hidden",
        border: `1.5px solid ${hov ? svc.color + "99" : "rgba(107,189,40,0.2)"}`,
        background: "linear-gradient(145deg, #0B1E04 0%, #102508 100%)",
        cursor: "pointer",
        transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${index * 60}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? (hov ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)") : "translateY(56px) scale(0.94)",
        boxShadow: hov ? `0 32px 60px ${svc.color}40, 0 8px 24px rgba(0,0,0,0.35)` : "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* Image Section */}
      <div className="svc-photo" style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${SERVICE_IMAGES[svc.imgKey]})`,
          backgroundSize: "cover", backgroundPosition: "center",
          transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s",
          transform: hov ? "scale(1.12)" : "scale(1.03)",
          filter: hov ? "brightness(0.75) saturate(1.2)" : "brightness(0.6) saturate(1.05)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: `radial-gradient(circle at 30% 40%, ${svc.color}25 0%, transparent 70%)`, opacity: hov ? 1 : 0.5, transition: "opacity 0.45s" }} />
        
        {/* Icon Badge */}
        <div style={{ position: "absolute", top: 16, left: 16, zIndex: 5 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14,
            background: hov ? svc.color : "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: hov ? (needsDark ? C.gDeep : "#fff") : svc.color,
            border: `1px solid ${hov ? svc.color + "66" : "rgba(255,255,255,0.2)"}`,
            transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: hov ? "rotate(-6deg) scale(1.1)" : "none",
            boxShadow: hov ? `0 6px 20px ${svc.color}60` : "0 3px 12px rgba(0,0,0,0.2)",
          }}>{svc.icon}</div>
        </div>
        
        {/* Short Badge */}
        <div style={{ position: "absolute", top: 16, right: 16, zIndex: 5, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)", borderRadius: 30, padding: "5px 14px", fontFamily: FB, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.15)" }}>
          {svc.short}
        </div>
        
        {/* Title & Highlight */}
        <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, zIndex: 5 }}>
          <div style={{ fontFamily: F, fontStyle: "italic", fontSize: 22, fontWeight: 800, color: "#fff", textShadow: "0 2px 14px rgba(0,0,0,0.8)", lineHeight: 1.15, marginBottom: 10 }}>{svc.title}</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${svc.color}22`, border: `1px solid ${svc.color}60`, borderRadius: 30, padding: "5px 14px" }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill={svc.color}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 800, color: svc.color }}>{svc.highlight}</span>
          </div>
        </div>
      </div>
      
      {/* Description Section */}
      <div style={{ padding: "20px 18px 22px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: 1, background: `linear-gradient(to right, transparent, ${svc.color}60, transparent)` }} />
        <p style={{ fontFamily: FB, fontSize: 13, color: "rgba(186, 222, 136, 0.75)", lineHeight: 1.75, margin: "0 0 16px" }}>{svc.desc}</p>
        
        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <button style={{
            fontFamily: FB, fontSize: 12, fontWeight: 700, padding: "9px 20px", borderRadius: 30,
            border: `1.5px solid ${svc.color}60`, background: "transparent", color: svc.color,
            cursor: "pointer", transition: "all 0.28s", letterSpacing: "0.03em",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = svc.color; (e.currentTarget as HTMLElement).style.color = needsDark ? C.gDeep : "#fff"; (e.currentTarget as HTMLElement).style.borderColor = svc.color; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = svc.color; (e.currentTarget as HTMLElement).style.borderColor = `${svc.color}60`; }}>
            View Details
          </button>
          <button style={{
            fontFamily: FB, fontSize: 12, fontWeight: 800, padding: "9px 22px", borderRadius: 30,
            border: "none", background: `linear-gradient(135deg, ${svc.color}, ${C.gMid})`,
            color: needsDark ? C.gDeep : "#fff", cursor: "pointer", transition: "all 0.28s",
            letterSpacing: "0.03em", boxShadow: `0 4px 14px ${svc.color}50`,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${svc.color}80`; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 14px ${svc.color}50`; }}>
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Carousel (auto-play, improved design) ────────────────────────── */
function MobileCarousel({ inView }: { inView: boolean }) {
  const [active,   setActive]   = useState(0);
  const [paused,   setPaused]   = useState(false);
  const [progress, setProgress] = useState(0);
  const startX   = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const progRef  = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const total    = SERVICES.length;
  const DURATION = 4000;
  const svc      = SERVICES[active];

  const goTo = (idx: number) => {
    setActive(((idx % total) + total) % total);
    setProgress(0);
  };

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
      setActive(a => (a + 1) % total);
      setProgress(0);
    }, DURATION);
    return () => { clearInterval(timerRef.current); clearInterval(progRef.current); };
  }, [active, inView, paused, total]);

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; setPaused(true); };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 44) goTo(active + (dx < 0 ? 1 : -1));
    setPaused(false);
  };

  const needsDark = [C.gLeaf, C.gMid, C.gDark, C.gLight].includes(svc.color);

  return (
    <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.65s ease" }}>

      {/* Tab Strip */}
      <div className="tab-strip-scroll" style={{ overflowX: "auto", scrollbarWidth: "none", paddingBottom: 16, marginBottom: 4 }}>
        <div style={{ display: "flex", gap: 10, width: "max-content" }}>
          {SERVICES.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                fontFamily: FB, fontSize: 12.5, fontWeight: 700,
                padding: "9px 20px", borderRadius: 40, border: "none",
                background: active === i ? s.color : "rgba(255,255,255,0.08)",
                color: active === i ? (needsDark ? C.gDeep : "#fff") : "rgba(255,255,255,0.6)",
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "all 0.28s",
                boxShadow: active === i ? `0 4px 16px ${s.color}60` : "none",
                letterSpacing: "0.02em",
              }}>
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Card Stage */}
      <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ position: "relative", userSelect: "none", paddingTop: 4 }}>
        <div style={{
          borderRadius: 24, overflow: "hidden",
          background: "linear-gradient(145deg, #0B1E04 0%, #102508 100%)",
          border: `1.5px solid ${svc.color}80`,
          boxShadow: `0 20px 50px ${svc.color}30, 0 6px 24px rgba(0,0,0,0.4)`,
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}>
          {/* Photo */}
          <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(${SERVICE_IMAGES[svc.imgKey]})`,
              backgroundSize: "cover", backgroundPosition: "center",
              filter: "brightness(0.65) saturate(1.1)",
              transition: "all 0.55s ease",
            }}/>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.85) 100%)", zIndex: 1 }}/>
            <div style={{ position: "absolute", inset: 0, zIndex: 2, background: `radial-gradient(circle at 25% 45%, ${svc.color}25 0%, transparent 70%)` }}/>

            {/* Icon */}
            <div style={{ position: "absolute", top: 16, left: 16, zIndex: 5 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: svc.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: needsDark ? C.gDeep : "#fff",
                boxShadow: `0 6px 20px ${svc.color}70`,
              }}>{svc.icon}</div>
            </div>

            {/* Badge */}
            <div style={{ position: "absolute", top: 16, right: 16, zIndex: 5, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)", borderRadius: 30, padding: "5px 14px", fontFamily: FB, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.15)" }}>
              {svc.short}
            </div>

            {/* Title + Price */}
            <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, zIndex: 5 }}>
              <div style={{ fontFamily: F, fontStyle: "italic", fontSize: 24, fontWeight: 800, color: "#fff", textShadow: "0 2px 16px rgba(0,0,0,0.9)", lineHeight: 1.1, marginBottom: 12 }}>{svc.title}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${svc.color}28`, border: `1px solid ${svc.color}60`, borderRadius: 30, padding: "5px 15px" }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill={svc.color}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span style={{ fontFamily: FB, fontSize: 12, fontWeight: 800, color: svc.color }}>{svc.highlight}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.15)", zIndex: 6 }}>
              <div style={{ height: "100%", width: `${progress}%`, background: svc.color, transition: "width 0.03s linear", borderRadius: "0 2px 2px 0" }}/>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "20px 18px 24px", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: "6%", right: "6%", height: 1, background: `linear-gradient(to right, transparent, ${svc.color}60, transparent)` }}/>
            <p style={{ fontFamily: FB, fontSize: 14, color: "rgba(186, 222, 136, 0.75)", lineHeight: 1.75, margin: "0 0 20px" }}>{svc.desc}</p>
            <button style={{
              width: "100%", padding: "14px", borderRadius: 40, border: "none",
              background: `linear-gradient(135deg, ${svc.color}, ${C.gMid})`,
              color: needsDark ? C.gDeep : "#fff",
              fontFamily: FB, fontSize: 15, fontWeight: 800, cursor: "pointer",
              letterSpacing: "0.04em", boxShadow: `0 6px 24px ${svc.color}60`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              transition: "all 0.22s",
            }}>
              Book This Service →
            </button>
          </div>
        </div>
      </div>

      {/* Dots + Counter */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 24 }}>
        {SERVICES.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: active === i ? 34 : 8, height: 8, borderRadius: 4, border: "none",
              background: active === i ? s.color : "rgba(255,255,255,0.2)",
              cursor: "pointer", transition: "all 0.34s cubic-bezier(0.22, 1, 0.36, 1)",
              padding: 0, boxShadow: active === i ? `0 0 12px ${s.color}80` : "none",
            }}
          />
        ))}
        <span style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,0.4)", marginLeft: 8, fontWeight: 600 }}>
          {active + 1} / {total}
        </span>
      </div>

      {/* Swipe Hint */}
      <p style={{ textAlign: "center", marginTop: 12, fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
        ← Swipe to browse →
      </p>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────────────── */
export default function ServicesSection() {
  const width    = useWindowWidth();
  const secRef   = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const inView   = useInView(secRef);
  const statsGo  = useInView(statsRef);

  const isXS     = width < 480;
  const isSM     = width >= 480 && width < 768;
  const isMD     = width >= 768 && width < 1100;
  const isLG     = width >= 1100 && width < 1280;
  const isMobile = width < 768;

  const px      = isXS ? "20px" : isSM ? "22px" : isMD ? "28px" : isLG ? "40px" : "56px";
  const pyTop   = isXS ? "56px" : isSM ? "64px" : isMD ? "80px" : "96px";
  const pyBot   = isXS ? "68px" : isSM ? "76px" : isMD ? "92px" : "108px";
  const h2Size  = isXS ? "28px" : isSM ? "32px" : isMD ? "42px" : isLG ? "50px" : "56px";
  const gridCols = isMD ? "1fr 1fr" : "repeat(3,1fr)";
  const cardGap  = isMD ? 14 : isLG ? 18 : 22;

  return (
    <section style={{ fontFamily: FB, position: "relative", overflow: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        button { -webkit-tap-highlight-color: transparent; cursor: pointer; }
        .svc-photo { position: relative; height: 200px; overflow: hidden; }
        @media (min-width: 1280px) { .svc-photo { height: 220px; } }
        .tab-strip-scroll::-webkit-scrollbar { display: none; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.35; transform: scale(0.6); } }
        @keyframes bobble { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        @media (hover: none) { .svc-card { transform: translateY(0) scale(1) !important; } }
      `}</style>

      {/* Background Layers */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center 30%", backgroundAttachment: isMobile ? "scroll" : "fixed", filter: "brightness(0.25) saturate(1.35)" }}/>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: `url(${LEAF_OVERLAY})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06, mixBlendMode: "screen" }}/>
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse 70% 55% at 5% 15%, rgba(46,128,16,0.15) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 95% 80%, rgba(15,61,6,0.2) 0%, transparent 55%), linear-gradient(180deg, rgba(8,22,3,0.55) 0%, rgba(12,28,5,0.3) 45%, rgba(8,18,3,0.65) 100%)" }}/>
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", opacity: 0.015, backgroundImage: `radial-gradient(circle, ${C.gLeaf} 1px, transparent 1px)`, backgroundSize: "34px 34px" }}/>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1440, margin: "0 auto", padding: `${pyTop} ${px} ${pyBot}` }}>

        {/* Header */}
        <div ref={secRef} style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: isXS ? 20 : 28, marginBottom: isXS ? 36 : isMobile ? 44 : 60 }}>
          <div style={{ animation: inView ? "fadeUp 0.65s ease both" : "none" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, marginBottom: isXS ? 14 : 18 }}>
              <div style={{ height: 2, width: 28, borderRadius: 2, background: `linear-gradient(to right, ${C.gDeep}, ${C.gLeaf})` }}/>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.gLeaf, display: "inline-block", animation: "pulse 2.2s infinite" }}/>
              <span style={{ fontFamily: FB, fontSize: isXS ? 9 : 10, fontWeight: 700, color: C.gLeaf, letterSpacing: "0.2em", textTransform: "uppercase" }}>Our Services</span>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.gLeaf, display: "inline-block", animation: "pulse 2.2s 0.5s infinite" }}/>
              <div style={{ height: 2, width: 28, borderRadius: 2, background: `linear-gradient(to left, ${C.gDeep}, ${C.gLeaf})` }}/>
            </div>
            <h2 style={{ fontFamily: F, fontStyle: "italic", fontSize: h2Size, fontWeight: 800, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.02, textShadow: "0 4px 32px rgba(0,0,0,0.66)" }}>
              Explore South India&apos;s
              <span style={{ display: "block", fontStyle: "italic", background: `linear-gradient(125deg, ${C.gLeaf} 0%, #C0F055 45%, ${C.gMid} 100%)`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 4s linear infinite" }}>Best Hill Stations</span>
            </h2>
            <p style={{ fontFamily: FB, fontSize: isXS ? 12.5 : isMobile ? 13 : 14.5, color: "rgba(175, 215, 125, 0.7)", maxWidth: isMobile ? "100%" : 520, lineHeight: 1.85, margin: 0 }}>
              From Coimbatore to Ooty, Kodaikanal, and Munnar — we create unforgettable journeys through the misty mountains of South India.
            </p>
          </div>

          {!isMobile && (
            <div style={{ flexShrink: 0, animation: inView ? "fadeUp 0.65s 0.22s ease both" : "none" }}>
              <button className="view-all-btn" style={{ fontFamily: FB, fontSize: 12.5, fontWeight: 700, padding: "13px 28px", borderRadius: 40, border: "2px solid rgba(107,189,40,0.45)", background: "rgba(107,189,40,0.08)", backdropFilter: "blur(14px)", color: C.gLeaf, letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 10 }}>
                View All Services
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          )}
        </div>

        {/* MOBILE: Carousel */}
        {isMobile && <MobileCarousel inView={inView} />}

        {/* DESKTOP: Grid */}
        {!isMobile && (
          <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: cardGap }}>
            {SERVICES.map((svc, i) => <ServiceCard key={i} svc={svc} index={i} inView={inView} />)}
          </div>
        )}

        {/* Mobile View All */}
        {isMobile && (
          <button style={{ fontFamily: FB, fontSize: 13.5, fontWeight: 700, padding: "14px", borderRadius: 40, marginTop: isXS ? 18 : 22, border: "2px solid rgba(107,189,40,0.4)", background: "rgba(107,189,40,0.08)", backdropFilter: "blur(10px)", color: C.gLeaf, letterSpacing: "0.05em", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
            View All Services
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        )}

        {/* Stats Section - Realistic for New Startup */}
        <div ref={statsRef} style={{ marginTop: isXS ? 36 : isMobile ? 48 : 68, display: "grid", gridTemplateColumns: isXS ? "1fr 1fr" : "repeat(4,1fr)", background: "rgba(7,18,3,0.8)", backdropFilter: "blur(22px)", borderRadius: isXS ? 18 : 24, overflow: "hidden", border: "1px solid rgba(107,189,40,0.18)", boxShadow: "0 8px 48px rgba(0,0,0,0.4)" }}>
          {STATS.map((st, i) => (
            <div key={i} className="stat-cell" style={{ padding: isXS ? "18px 10px" : isMobile ? "22px 14px" : "32px 22px", textAlign: "center", borderRight: (isXS ? i % 2 !== 1 : i < 3) ? "1px solid rgba(107,189,40,0.1)" : "none", borderBottom: isXS && i < 2 ? "1px solid rgba(107,189,40,0.1)" : "none", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -16, right: -16, width: 64, height: 64, borderRadius: "50%", background: `${C.gLeaf}08`, pointerEvents: "none" }}/>
              <div style={{ fontFamily: F, fontStyle: "italic", fontSize: isXS ? 26 : isMobile ? 32 : 40, fontWeight: 800, color: C.gLeaf, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 6, animation: statsGo ? "bobble 3s ease-in-out infinite" : "none", animationDelay: `${i * 0.22}s` }}>
                {statsGo ? <Counter target={st.num} suffix={st.suffix} go={statsGo} /> : `0${st.suffix}`}
              </div>
              <div style={{ fontFamily: FB, fontSize: isXS ? 10 : isMobile ? 11 : 12, color: "rgba(152, 192, 102, 0.65)", fontWeight: 600, letterSpacing: "0.05em" }}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div style={{ marginTop: isXS ? 14 : isMobile ? 18 : 24, padding: isXS ? "24px 16px" : isMobile ? "28px 20px" : isMD ? "36px 40px" : "40px 52px", borderRadius: isXS ? 18 : 24, position: "relative", overflow: "hidden", background: "rgba(7,20,3,0.78)", backdropFilter: "blur(24px)", border: "1px solid rgba(107,189,40,0.2)", boxShadow: "0 22px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(107,189,40,0.1)" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=70&fit=crop)", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.12) saturate(1.4)" }}/>
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(120deg, rgba(10,28,5,0.88) 0%, rgba(16,44,8,0.78) 100%)" }}/>

          <div className="cta-inner" style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.gLeaf, display: "inline-block", animation: "pulse 2s infinite" }}/>
                <span style={{ fontFamily: FB, fontSize: 9.5, fontWeight: 700, color: C.gLeaf, letterSpacing: "0.18em", textTransform: "uppercase" }}>Free Consultation</span>
              </div>
              <div style={{ fontFamily: F, fontStyle: "italic", fontSize: isXS ? 19 : isMobile ? 21 : 26, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Planning a trip from Coimbatore?
              </div>
              <div style={{ fontFamily: FB, fontSize: isXS ? 12.5 : 13.5, color: "rgba(175, 215, 125, 0.6)", lineHeight: 1.65, maxWidth: isMobile ? "100%" : 440 }}>
                Talk to our local travel expert — no obligations, just honest advice on the best routes and packages.
              </div>
            </div>
            <div className="cta-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button style={{ fontFamily: FB, fontSize: isXS ? 13 : 13.5, fontWeight: 700, padding: isXS ? "13px 20px" : "13px 26px", borderRadius: 40, border: "none", background: `linear-gradient(135deg, ${C.gLeaf}, ${C.gMid})`, color: C.gDeep, letterSpacing: "0.04em", boxShadow: `0 10px 30px rgba(46,128,16,0.55)`, transition: "all 0.22s", display: "flex", alignItems: "center", gap: 8 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 18px 46px rgba(46,128,16,0.7)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px rgba(46,128,16,0.55)`; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call Us Now
              </button>
              <button style={{ fontFamily: FB, fontSize: isXS ? 13 : 13.5, fontWeight: 600, padding: isXS ? "12px 18px" : "13px 22px", borderRadius: 40, border: "1.5px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)", color: "#fff", backdropFilter: "blur(10px)", letterSpacing: "0.04em", transition: "all 0.22s", display: "flex", alignItems: "center", gap: 9 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z"/></svg>
                WhatsApp Chat
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}