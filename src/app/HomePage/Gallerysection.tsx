"use client";
import { useState, useEffect, useRef, RefObject } from "react";
import Image from "next/image";

/* ─── Tokens ─────────────────────────────────────────────────────────── */
const C = {
  gDeep: "#0F3D06", gDark: "#1A5C0A", gMid: "#2E8010",
  gLeaf: "#6BBD28", gLight: "#96D94A",
};
const F  = "'Playfair Display', Georgia, serif";
const FB = "'DM Sans', 'Segoe UI', sans-serif";
const HERO_BG = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=85&fit=crop";

/* ─── Types ─────────────────────────────────────────────────────────── */
type ItemSize = "wide-tall" | "wide" | "normal";

interface GalleryItem {
  id: number; category: string;
  img: string; thumb: string;
  title: string; desc: string;
  location: string; size: ItemSize;
}

interface EyebrowProps   { label: string; isXS?: boolean; }
interface LightboxProps  {
  items: GalleryItem[]; activeIndex: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
  isMobile: boolean;
}
interface GalleryCardProps {
  item: GalleryItem; index: number; inView: boolean;
  isMobile: boolean; onClick: () => void; gridSpan: string;
}

/* ─── Data ──────────────────────────────────────────────────────────── */
const GALLERY_ITEMS: GalleryItem[] = [
  { id:1,  category:"Ooty",       img:"https://images.unsplash.com/photo-1582479253765-44e25ea4f56a?w=900&q=85&fit=crop", thumb:"https://images.unsplash.com/photo-1582479253765-44e25ea4f56a?w=500&q=80&fit=crop", title:"Ooty Tea Gardens",   desc:"Rolling green tea estates of the Nilgiris stretching to the horizon.",          location:"Ooty, Tamil Nadu",        size:"wide-tall" },
  { id:2,  category:"Ooty",       img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&fit=crop", thumb:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80&fit=crop", title:"Doddabetta Peak",    desc:"The highest peak in the Nilgiri mountains, wrapped in morning mist.",           location:"Ooty, Tamil Nadu",        size:"normal"   },
  { id:3,  category:"Ooty",       img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85&fit=crop", thumb:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=80&fit=crop", title:"Ooty Sunrise",       desc:"Golden hour over the misty Nilgiri hills — a view worth waking up early for.", location:"Ooty, Tamil Nadu",        size:"normal"   },
  { id:4,  category:"Kodaikanal", img:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85&fit=crop", thumb:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80&fit=crop", title:"Kodai Pine Forest",  desc:"Ancient silver oaks and pine trees piercing the clouds near Coaker's Walk.",    location:"Kodaikanal, Tamil Nadu",  size:"normal"   },
  { id:5,  category:"Kodaikanal", img:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=85&fit=crop", thumb:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80&fit=crop", title:"Kodai Lake View",    desc:"The iconic star-shaped lake glistening under the afternoon sun.",              location:"Kodaikanal, Tamil Nadu",  size:"wide"     },
  { id:6,  category:"Kodaikanal", img:"https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=900&q=85&fit=crop", thumb:"https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=500&q=80&fit=crop", title:"Misty Valley",       desc:"Clouds rolling through the valleys of the Palani Hills at dusk.",              location:"Kodaikanal, Tamil Nadu",  size:"normal"   },
  { id:7,  category:"Munnar",     img:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=85&fit=crop", thumb:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80&fit=crop", title:"Munnar Tea Estate",  desc:"Endless rows of tea bushes blanketing the Western Ghats slopes.",              location:"Munnar, Kerala",          size:"wide-tall" },
  { id:8,  category:"Munnar",     img:"https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=900&q=85&fit=crop", thumb:"https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500&q=80&fit=crop", title:"Eravikulam NP",      desc:"Home to the endangered Nilgiri Tahr — rare wildlife in pristine grasslands.",  location:"Munnar, Kerala",          size:"normal"   },
  { id:9,  category:"Munnar",     img:"https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=900&q=85&fit=crop", thumb:"https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=500&q=80&fit=crop", title:"Mattupetty Dam",     desc:"Serene shimmering waters against the backdrop of misty Western Ghats.",        location:"Munnar, Kerala",          size:"normal"   },
  { id:10, category:"Coorg",      img:"https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=900&q=85&fit=crop", thumb:"https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=500&q=80&fit=crop", title:"Coorg Coffee Estate",desc:"Fragrant coffee plantations draped in mist — the Scotland of India.",           location:"Coorg, Karnataka",        size:"wide"     },
  { id:11, category:"Coorg",      img:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=900&q=85&fit=crop", thumb:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&q=80&fit=crop", title:"Abbey Falls",        desc:"A stunning 70-foot waterfall hidden in the dense Coorg forest.",               location:"Coorg, Karnataka",        size:"normal"   },
  { id:12, category:"Coorg",      img:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85&fit=crop", thumb:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&q=80&fit=crop", title:"Coorg Sunset",       desc:"The golden sun melting behind the Brahmagiri range at golden hour.",           location:"Coorg, Karnataka",        size:"normal"   },
];

const CATEGORIES = ["All", "Ooty", "Kodaikanal", "Munnar", "Coorg"];

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

function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.05): boolean {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref, threshold]);
  return v;
}

/* ─── Eyebrow ────────────────────────────────────────────────────────── */
function Eyebrow({ label, isXS = false }: EyebrowProps) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:isXS?14:18 }}>
      <div style={{ height:2, width:26, borderRadius:2, background:`linear-gradient(to right,${C.gDeep},${C.gLeaf})` }}/>
      <span style={{ width:5, height:5, borderRadius:"50%", background:C.gLeaf, display:"inline-block", animation:"gpulse 2.2s infinite" }}/>
      <span style={{ fontFamily:FB, fontSize:isXS?9:10, fontWeight:700, color:C.gLeaf, letterSpacing:".20em", textTransform:"uppercase" }}>{label}</span>
      <span style={{ width:5, height:5, borderRadius:"50%", background:C.gLeaf, display:"inline-block", animation:"gpulse 2.2s .5s infinite" }}/>
      <div style={{ height:2, width:26, borderRadius:2, background:`linear-gradient(to left,${C.gDeep},${C.gLeaf})` }}/>
    </div>
  );
}

/* ─── Lightbox ───────────────────────────────────────────────────────── */
function Lightbox({ items, activeIndex, onClose, onPrev, onNext, isMobile }: LightboxProps) {
  const item = items[activeIndex];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0, zIndex:9999,
        background:"rgba(2,8,1,0.96)",
        backdropFilter:"blur(20px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding: isMobile ? "56px 14px 20px" : "24px 20px",
        animation:"lbFadeIn .22s ease both",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position:"absolute", top:16, right:16,
          width:42, height:42, borderRadius:"50%",
          background:"rgba(255,255,255,0.10)", border:"1.5px solid rgba(255,255,255,0.18)",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", color:"#fff", backdropFilter:"blur(10px)", zIndex:2,
          transition:"all .20s",
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.22)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* Counter */}
      <div style={{
        position:"absolute", top:20, left:"50%", transform:"translateX(-50%)",
        fontFamily:FB, fontSize:11, fontWeight:700,
        color:"rgba(200,240,150,0.58)", letterSpacing:".12em", zIndex:2,
      }}>{activeIndex + 1} / {items.length}</div>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onPrev(); }}
        style={{
          position:"absolute", left: isMobile ? 8 : 20, top:"50%", transform:"translateY(-50%)",
          width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, borderRadius:"50%",
          background:"rgba(255,255,255,0.08)", border:"1.5px solid rgba(255,255,255,0.14)",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", backdropFilter:"blur(10px)", zIndex:2, transition:"all .20s",
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(107,189,40,0.22)`; el.style.borderColor = `${C.gLeaf}60`; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.08)"; el.style.borderColor = "rgba(255,255,255,0.14)"; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNext(); }}
        style={{
          position:"absolute", right: isMobile ? 8 : 20, top:"50%", transform:"translateY(-50%)",
          width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, borderRadius:"50%",
          background:"rgba(255,255,255,0.08)", border:"1.5px solid rgba(255,255,255,0.14)",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", backdropFilter:"blur(10px)", zIndex:2, transition:"all .20s",
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(107,189,40,0.22)`; el.style.borderColor = `${C.gLeaf}60`; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.08)"; el.style.borderColor = "rgba(255,255,255,0.14)"; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Content */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display:"flex", flexDirection:"column", alignItems:"center",
          maxWidth: isMobile ? "100%" : 860, width:"100%",
          animation:"lbSlideUp .28s ease both",
        }}
      >
        <div style={{
          width:"100%", borderRadius:isMobile?14:18, overflow:"hidden",
          boxShadow:"0 32px 80px rgba(0,0,0,0.70)",
          border:"1.5px solid rgba(107,189,40,0.18)",
          maxHeight: isMobile ? "52vh" : "65vh",
          position:"relative",
        }}>
          <Image
            src={item.img}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 90vw, 860px"
            style={{ objectFit:"cover" }}
            priority
          />
        </div>

        {/* Info */}
        <div style={{
          marginTop:16, width:"100%",
          display:"flex", flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-start",
          justifyContent:"space-between", gap:12, padding:"0 4px",
        }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:F, fontStyle:"italic", fontSize: isMobile ? 18 : 20, fontWeight:800, color:"#fff", marginBottom:5 }}>{item.title}</div>
            <div style={{ fontFamily:FB, fontSize: isMobile ? 12 : 13, color:"rgba(190,235,140,0.58)", lineHeight:1.68 }}>{item.desc}</div>
          </div>
          <div style={{ flexShrink:0, display:"flex", alignItems:"center", gap:6, background:"rgba(107,189,40,0.10)", border:"1px solid rgba(107,189,40,0.22)", borderRadius:20, padding:"6px 14px", whiteSpace:"nowrap" }}>
            <span style={{ fontSize:12 }}>📍</span>
            <span style={{ fontFamily:FB, fontSize:11, fontWeight:700, color:C.gLeaf }}>{item.location}</span>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div style={{ marginTop:16, display:"flex", gap:8, overflowX:"auto", width:"100%", paddingBottom:4, scrollbarWidth:"none" }}>
          {items.map((t: GalleryItem, i: number) => (
            <div
              key={t.id}
              onClick={e => { e.stopPropagation(); }}
              style={{
                width: isMobile ? 50 : 60, height: isMobile ? 36 : 44,
                borderRadius:8, flexShrink:0, overflow:"hidden",
                cursor:"pointer", opacity: i === activeIndex ? 1 : 0.42,
                border:`2px solid ${i === activeIndex ? C.gLeaf : "transparent"}`,
                transition:"all .20s",
                boxShadow: i === activeIndex ? `0 4px 14px ${C.gLeaf}40` : "none",
                position:"relative",
              }}
            >
              <Image src={t.thumb} alt={t.title} fill sizes="60px" style={{ objectFit:"cover" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── GalleryCard ────────────────────────────────────────────────────── */
function GalleryCard({ item, index, inView, isMobile, onClick, gridSpan }: GalleryCardProps) {
  const [hov, setHov] = useState(false);

  const HEIGHT_MAP: Record<ItemSize, number> = {
    "wide-tall": isMobile ? 190 : 380,
    "wide":      isMobile ? 175 : 240,
    "normal":    isMobile ? 175 : 240,
  };
  const h = HEIGHT_MAP[item.size];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        gridColumn: gridSpan,
        borderRadius: isMobile ? 14 : 18,
        overflow:"hidden",
        height: h,
        position:"relative",
        cursor:"pointer",
        border:`1.5px solid ${hov ? "rgba(107,189,40,0.50)" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hov
          ? `0 28px 56px rgba(0,0,0,0.55),0 0 0 1px ${C.gLeaf}22`
          : "0 4px 22px rgba(0,0,0,0.28)",
        transform: inView
          ? hov ? "scale(1.025) translateY(-5px)" : "scale(1) translateY(0)"
          : "scale(0.93) translateY(30px)",
        opacity: inView ? 1 : 0,
        transition:"all .48s cubic-bezier(.22,1,.36,1)",
        transitionDelay:`${index * 55}ms`,
      }}
    >
      {/* Photo */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`url(${item.thumb})`,
        backgroundSize:"cover", backgroundPosition:"center",
        transition:"transform .70s cubic-bezier(.22,1,.36,1),filter .40s",
        transform: hov ? "scale(1.10)" : "scale(1.03)",
        filter: hov ? "brightness(0.62) saturate(1.28)" : "brightness(0.84) saturate(1.10)",
      }}/>

      {/* Gradient */}
      <div style={{
        position:"absolute", inset:0,
        background: hov
          ? "linear-gradient(to top,rgba(4,12,2,0.96) 0%,rgba(4,12,2,0.28) 55%,rgba(46,128,16,0.12) 100%)"
          : "linear-gradient(to top,rgba(4,12,2,0.78) 0%,transparent 55%)",
        transition:"background .40s", zIndex:1,
      }}/>

      {/* Category badge */}
      <div style={{
        position:"absolute", top:12, left:12, zIndex:3,
        background:"rgba(0,0,0,0.52)", backdropFilter:"blur(10px)",
        borderRadius:20, padding:"3px 10px",
        fontFamily:FB, fontSize:9, fontWeight:700,
        color:C.gLeaf, letterSpacing:".14em", textTransform:"uppercase",
        border:"1px solid rgba(107,189,40,0.24)",
      }}>{item.category}</div>

      {/* Zoom icon (hover only) */}
      <div style={{
        position:"absolute", top:11, right:11, zIndex:3,
        width:32, height:32, borderRadius:"50%",
        background:"rgba(0,0,0,0.50)", backdropFilter:"blur(8px)",
        border:"1.5px solid rgba(255,255,255,0.20)",
        display:"flex", alignItems:"center", justifyContent:"center",
        opacity: hov ? 1 : 0,
        transform: hov ? "scale(1)" : "scale(0.70)",
        transition:"all .28s cubic-bezier(.22,1,.36,1)",
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.90)" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>

      {/* Bottom info */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0,
        padding: isMobile ? "12px 13px 13px" : "14px 16px 16px",
        zIndex:3,
        transform: hov ? "translateY(0)" : "translateY(3px)",
        transition:"transform .30s",
      }}>
        <div style={{
          fontFamily:F, fontStyle:"italic",
          fontSize: isMobile ? 13.5 : 15, fontWeight:800,
          color:"#fff", letterSpacing:"-.01em",
          textShadow:"0 2px 12px rgba(0,0,0,0.80)", marginBottom:4,
        }}>{item.title}</div>

        <div style={{ display:"flex", alignItems:"center", gap:5, opacity: hov ? 1 : 0.68, transition:"opacity .28s" }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={C.gLeaf} strokeWidth="2.2" strokeLinecap="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span style={{ fontFamily:FB, fontSize:10, color:"rgba(185,230,130,0.70)", fontWeight:600 }}>{item.location}</span>
        </div>

        {/* Description — only on hover, desktop */}
        {!isMobile && (
          <div style={{
            fontFamily:FB, fontSize:11, color:"rgba(185,230,130,0.54)", lineHeight:1.62,
            marginTop:6,
            maxHeight: hov ? 48 : 0, overflow:"hidden",
            opacity: hov ? 1 : 0,
            transition:"all .34s cubic-bezier(.22,1,.36,1)",
          }}>{item.desc}</div>
        )}
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────── */
export default function GallerySection() {
  const width    = useW();
  const isXS     = width < 480;
  const isSM     = width >= 480 && width < 640;
  const isMD     = width >= 640 && width < 1024;
  const isLG     = width >= 1024 && width < 1280;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const secRef  = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(secRef);
  const gridIn  = useInView(gridRef);

  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex,  setLightboxIndex]  = useState<number | null>(null);
  const [visibleCount,   setVisibleCount]   = useState(isMobile ? 6 : 8);

  const filtered = GALLERY_ITEMS.filter(item => activeCategory === "All" || item.category === activeCategory);
  const visible  = filtered.slice(0, visibleCount);
  const hasMore  = visibleCount < filtered.length;

  // Ref to hold current filtered length
  const filteredLengthRef = useRef(filtered.length);
  useEffect(() => {
    filteredLengthRef.current = filtered.length;
  }, [filtered.length]);

  /* Lightbox nav — plain functions, let React Compiler handle memoization */
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => {
    setLightboxIndex(i => {
      const len = filteredLengthRef.current;
      return i === null ? 0 : (i - 1 + len) % len;
    });
  };
  const nextPhoto = () => {
    setLightboxIndex(i => {
      const len = filteredLengthRef.current;
      return i === null ? 0 : (i + 1) % len;
    });
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setVisibleCount(isMobile ? 6 : 8); }, [activeCategory, isMobile]);

  /* Grid span */
  const getSpan = (item: GalleryItem, isMob: boolean, isTab: boolean): string => {
    if (isMob) return "span 1";
    if (isTab) return (item.size === "wide" || item.size === "wide-tall") ? "span 2" : "span 1";
    return (item.size === "wide-tall" || item.size === "wide") ? "span 2" : "span 1";
  };

  const gridCols = isXS ? "1fr 1fr" : isSM ? "1fr 1fr" : isMD ? "1fr 1fr 1fr" : "repeat(4,1fr)";

  const px    = isXS ? "16px" : isSM ? "18px" : isMD ? "28px" : isLG ? "40px" : "52px";
  const pyTop = isXS ? "60px" : isMD ? "80px" : "96px";
  const pyBot = isXS ? "68px" : isMD ? "88px" : "108px";
  const h2Sz  = isXS ? "26px" : isSM ? "30px" : isMD ? "40px" : isLG ? "46px" : "52px";

  return (
    <section style={{ fontFamily:FB, position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        button { -webkit-tap-highlight-color:transparent; cursor:pointer; }
        button:active { transform:scale(0.96)!important; }
        ::-webkit-scrollbar { width:0; height:0; }

        @keyframes gfadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gpulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.28;transform:scale(.52)} }
        @keyframes gshimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes lbFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes lbSlideUp{ from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

        /* Filter strip — horizontal scroll on mobile */
        .filter-strip { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
        @media(max-width:639px) {
          .filter-strip { flex-wrap:nowrap; overflow-x:auto; scrollbar-width:none; padding-bottom:4px; }
          .filter-strip::-webkit-scrollbar { display:none; }
        }

        /* Card hover disabled on touch */
        @media(hover:none) { }

        /* CTA banner */
        .cta-inner { display:flex; align-items:center; justify-content:space-between; gap:22px; }
        @media(max-width:639px) { .cta-inner { flex-direction:column; align-items:flex-start; } }
        .cta-btns { display:flex; gap:12px; flex-wrap:wrap; flex-shrink:0; }
        @media(max-width:479px) {
          .cta-btns { width:100%; flex-direction:column; }
          .cta-btns button, .cta-btns a { width:100%!important; justify-content:center!important; }
        }

        /* Load more hover */
        .load-more-btn { transition:all .22s!important; }
        .load-more-btn:hover { background:rgba(107,189,40,0.18)!important; transform:translateY(-2px)!important; box-shadow:0 10px 30px rgba(107,189,40,0.28)!important; }
      `}</style>

      {/* ── Backgrounds ── */}
      <div style={{ position:"absolute",inset:0,zIndex:0, backgroundImage:`url(${HERO_BG})`, backgroundSize:"cover", backgroundPosition:"center 45%", backgroundAttachment:isMobile?"scroll":"fixed", filter:"brightness(0.18) saturate(1.4)" }}/>
      <div style={{ position:"absolute",inset:0,zIndex:2,pointerEvents:"none", background:`radial-gradient(ellipse 65% 50% at 5% 15%,rgba(46,128,16,.13) 0%,transparent 60%),radial-gradient(ellipse 50% 40% at 95% 80%,rgba(15,61,6,.17) 0%,transparent 55%),linear-gradient(180deg,rgba(3,10,2,.68) 0%,rgba(5,14,3,.28) 45%,rgba(3,8,2,.72) 100%)` }}/>
      <div style={{ position:"absolute",inset:0,zIndex:3,pointerEvents:"none",opacity:.016, backgroundImage:`radial-gradient(circle,${C.gLeaf} 1px,transparent 1px)`, backgroundSize:"38px 38px" }}/>

      {/* ── Content ── */}
      <div style={{ position:"relative",zIndex:10,maxWidth:1320,margin:"0 auto",padding:`${pyTop} ${px} ${pyBot}` }}>

        {/* ── Header ── */}
        <div ref={secRef} style={{ marginBottom:isMobile?28:52 }}>

          <div style={{ animation:inView?"gfadeUp .55s ease both":"none" }}>
            <Eyebrow label="Photo Gallery" isXS={isXS}/>
          </div>

          {/* Title + stats row */}
          <div style={{
            display:"flex", flexDirection:isMobile?"column":"row",
            alignItems:isMobile?"flex-start":"flex-end",
            justifyContent:"space-between", gap:20,
            animation:inView?"gfadeUp .58s .06s ease both":"none",
          }}>
            <div>
              <h2 style={{
                fontFamily:F, fontStyle:"italic",
                fontSize:h2Sz, fontWeight:800, color:"#fff",
                margin:"0 0 12px", letterSpacing:"-.032em", lineHeight:1.03,
                textShadow:"0 4px 28px rgba(0,0,0,.55)",
              }}>
                Stunning{" "}
                <span style={{
                  background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 45%,${C.gMid} 100%)`,
                  backgroundSize:"200% auto",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
                  animation:"gshimmer 4s linear infinite",
                }}>Landscapes</span>
                <span style={{ display:"block",fontStyle:"normal" }}> Await You</span>
              </h2>
              <p style={{ fontFamily:FB, fontSize:isXS?12.5:isMobile?13:14.5, color:"rgba(180,225,130,0.62)", maxWidth:480, lineHeight:1.82, margin:0 }}>
                A glimpse into the breathtaking views, misty mountains, and lush valleys that await you on every trip.
              </p>
            </div>

            {/* Stats — desktop only */}
            {!isMobile && (
              <div style={{ display:"flex",gap:12,flexShrink:0,animation:inView?"gfadeUp .58s .12s ease both":"none" }}>
                {[{val:`${GALLERY_ITEMS.length}+`,label:"Photos"},{val:"4",label:"Destinations"}].map((s,i) => (
                  <div key={i} style={{ textAlign:"center",padding:"14px 22px", background:"rgba(6,18,3,0.78)",backdropFilter:"blur(14px)", border:"1px solid rgba(107,189,40,0.14)",borderRadius:14 }}>
                    <div style={{ fontFamily:F,fontStyle:"italic",fontSize:22,fontWeight:800,color:C.gLeaf,letterSpacing:"-.02em",lineHeight:1 }}>{s.val}</div>
                    <div style={{ fontFamily:FB,fontSize:10,fontWeight:600,color:"rgba(165,215,110,0.50)",marginTop:3,letterSpacing:".06em",textTransform:"uppercase" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Category filter ── */}
          <div
            className="filter-strip"
            style={{ marginTop:isXS?18:26, animation:inView?"gfadeUp .58s .14s ease both":"none" }}
          >
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat;
              const count  = cat === "All" ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter(g => g.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily:FB, fontSize:isXS?11:12, fontWeight:active?700:600,
                    padding:isXS?"7px 12px":"9px 18px", borderRadius:30, flexShrink:0,
                    border:`1.5px solid ${active?C.gLeaf:"rgba(107,189,40,0.24)"}`,
                    background: active ? `linear-gradient(135deg,${C.gLeaf},${C.gMid})` : "rgba(255,255,255,0.05)",
                    backdropFilter:"blur(12px)",
                    color: active ? C.gDeep : "rgba(190,235,130,0.75)",
                    cursor:"pointer", letterSpacing:".02em",
                    boxShadow: active ? `0 6px 22px ${C.gLeaf}38` : "none",
                    transition:"all .22s cubic-bezier(.22,1,.36,1)",
                    display:"flex", alignItems:"center", gap:7, whiteSpace:"nowrap",
                  }}
                >
                  {cat}
                  <span style={{
                    fontFamily:FB, fontSize:9.5, fontWeight:700,
                    padding:"1px 6px", borderRadius:10,
                    background: active ? "rgba(15,61,6,0.30)" : "rgba(107,189,40,0.12)",
                    color: active ? C.gDeep : "rgba(165,215,110,0.60)",
                    letterSpacing:".04em",
                  }}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Grid ── */}
        <div
          ref={gridRef}
          style={{ display:"grid", gridTemplateColumns:gridCols, gap: isMobile ? 9 : 13, gridAutoRows:"auto" }}
        >
          {visible.map((item, i) => (
            <GalleryCard
              key={item.id} item={item} index={i} inView={gridIn} isMobile={isMobile}
              gridSpan={getSpan(item, isMobile, isTablet)}
              onClick={() => setLightboxIndex(filtered.indexOf(item))}
            />
          ))}
        </div>

        {/* ── Load More / Show Less ── */}
        <div style={{ marginTop:isMobile?24:40, display:"flex", justifyContent:"center", alignItems:"center", gap:14, animation:inView?"gfadeUp .60s .28s ease both":"none" }}>
          {hasMore && (
            <button
              className="load-more-btn"
              onClick={() => setVisibleCount(c => c + (isMobile ? 4 : 4))}
              style={{
                fontFamily:FB, fontSize:13, fontWeight:700,
                padding: isMobile ? "13px 22px" : "12px 30px",
                borderRadius:12, border:"1.5px solid rgba(107,189,40,0.32)",
                background:"rgba(107,189,40,0.08)", backdropFilter:"blur(12px)",
                color:C.gLeaf, letterSpacing:".04em",
                display:"inline-flex", alignItems:"center", gap:9,
                width: isMobile ? "100%" : "auto",
                justifyContent: isMobile ? "center" : "flex-start",
              }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
              Load More ({filtered.length - visibleCount} remaining)
            </button>
          )}
          {!hasMore && filtered.length > (isMobile ? 6 : 8) && (
            <button
              onClick={() => setVisibleCount(isMobile ? 6 : 8)}
              style={{
                fontFamily:FB, fontSize:12.5, fontWeight:600,
                padding:"10px 24px", borderRadius:12,
                border:"1px solid rgba(107,189,40,0.18)",
                background:"rgba(107,189,40,0.05)", backdropFilter:"blur(10px)",
                color:"rgba(165,215,110,0.55)", transition:"all .22s",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.gLeaf; (e.currentTarget as HTMLElement).style.borderColor = "rgba(107,189,40,0.35)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(165,215,110,0.55)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(107,189,40,0.18)"; }}
            >
              ↑ Show Less
            </button>
          )}
        </div>

        {/* ── Instagram CTA ── */}
        <div style={{ marginTop:isMobile?40:60, borderRadius:22, overflow:"hidden", position:"relative", animation:inView?"gfadeUp .65s .36s ease both":"none" }}>
          <div style={{ position:"absolute",inset:0, backgroundImage:"url(https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1400&q=70&fit=crop)", backgroundSize:"cover",backgroundPosition:"center",filter:"brightness(0.16) saturate(1.5)" }}/>
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(120deg,rgba(6,18,3,0.94) 0%,rgba(16,44,6,0.82) 100%)" }}/>

          <div
            className="cta-inner"
            style={{ position:"relative",zIndex:2, padding:isXS?"24px 16px":isMobile?"26px 20px":isMD?"32px 40px":"36px 50px" }}
          >
            <div style={{ display:"flex", alignItems:"center", gap: isMobile ? 14 : 20 }}>
              <div style={{ width:52,height:52,borderRadius:15,flexShrink:0, background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, display:"flex",alignItems:"center",justifyContent:"center", boxShadow:`0 8px 26px ${C.gLeaf}44`,fontSize:22 }}>📸</div>
              <div>
                <div style={{ fontFamily:F,fontStyle:"italic",fontSize:isXS?16:isMobile?18:21,fontWeight:800,color:"#fff",marginBottom:5,letterSpacing:"-.02em" }}>
                  Share Your Hill Escape Moments
                </div>
                <div style={{ fontFamily:FB,fontSize:isXS?12:13,color:"rgba(178,222,118,0.56)",lineHeight:1.65 }}>
                  Tag us <span style={{ color:C.gLeaf,fontWeight:700 }}>@hillescapes</span> on Instagram to be featured in our gallery.
                </div>
              </div>
            </div>

            <div className="cta-btns" style={{ marginTop: isMobile ? 4 : 0 }}>
              <button
                style={{
                  fontFamily:FB,fontSize:13,fontWeight:700,
                  padding:"12px 24px",borderRadius:12,border:"none",
                  background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`,
                  color:C.gDeep,letterSpacing:".04em",
                  boxShadow:`0 10px 28px ${C.gLeaf}45`,
                  display:"flex",alignItems:"center",gap:9,transition:"all .22s",
                }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-3px)";(e.currentTarget as HTMLElement).style.boxShadow=`0 18px 44px ${C.gLeaf}58`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="none";(e.currentTarget as HTMLElement).style.boxShadow=`0 10px 28px ${C.gLeaf}45`;}}>
                Follow on Instagram
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button
                style={{
                  fontFamily:FB,fontSize:13,fontWeight:600,
                  padding:"11px 20px",borderRadius:12,
                  border:"1.5px solid rgba(255,255,255,0.20)",
                  background:"rgba(255,255,255,0.07)",backdropFilter:"blur(10px)",
                  color:"#fff",letterSpacing:".04em",transition:"all .22s",
                }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.16)";(e.currentTarget as HTMLElement).style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.07)";(e.currentTarget as HTMLElement).style.transform="none";}}>
                Plan a Trip →
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          isMobile={isMobile}
        />
      )}
    </section>
  );
}