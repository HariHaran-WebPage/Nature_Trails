"use client";
import { useState, useEffect, useRef, ReactNode, RefObject, ChangeEvent } from "react";

/* ─── Tokens ─────────────────────────────────────────────────────────── */
const C = {
  gDeep: "#0F3D06", gDark: "#1A5C0A", gMid: "#2E8010",
  gLeaf: "#6BBD28", gLight: "#96D94A",
};
const F  = "'Playfair Display', Georgia, serif";
const FB = "'DM Sans', 'Segoe UI', sans-serif";
const HERO_BG = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=85&fit=crop";

/* ─── Data ──────────────────────────────────────────────────────────── */
const DESTINATIONS_LIST = ["Ooty","Kodaikanal","Munnar","Coorg","Valparai","Wayanad","Yercaud","Coonoor","Pollachi","Other"];
const TRIP_TYPES        = ["Honeymoon","Family Trip","Group Tour","Solo Trip","Corporate Outing","Weekend Getaway"];
const BUDGETS           = ["Under ₹5,000","₹5,000 – ₹10,000","₹10,000 – ₹20,000","₹20,000 – ₹50,000","Above ₹50,000"];

const STATS = [
  { value: "2,400+", label: "Happy Travellers" },
  { value: "12+",    label: "Years Experience" },
  { value: "18",     label: "Destinations" },
  { value: "4.9★",   label: "Avg Rating" },
];

const DESTINATIONS_PREVIEW = [
  { name: "Ooty",       tag: "Queen of Hills",    img: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&q=75" },
  { name: "Kodaikanal", tag: "Princess of Hills", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=75" },
  { name: "Munnar",     tag: "Tea Country",       img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=400&q=75" },
];

interface ContactItem { icon: ReactNode; label: string; value: string; sub: string; color: string; }

const CONTACT_INFO: ContactItem[] = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    label:"Call Us", value:"+91 98765 43210", sub:"Mon – Sun, 7 AM – 10 PM", color:C.gLeaf,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z"/></svg>,
    label:"WhatsApp", value:"+91 98765 43210", sub:"Instant reply guaranteed", color:"#25D366",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    label:"Email Us", value:"hello@hillstravel.in", sub:"Reply within 2 hours", color:"#F59E0B",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    label:"Office", value:"Tirunelveli, TN", sub:"Near Central Bus Stand", color:"#0EA5E9",
  },
];

/* ─── Types ─────────────────────────────────────────────────────────── */
interface InputFieldProps {
  label: string; type?: string; placeholder?: string;
  value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; icon?: ReactNode;
}
interface SelectFieldProps {
  label: string; options: string[]; value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean; placeholder: string; icon?: ReactNode;
}
interface FormState {
  name: string; phone: string; email: string;
  destination: string; tripType: string; budget: string;
  travellers: string; date: string; message: string;
}
type FormKey = keyof FormState;

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

/* ─── Shared field styles ─────────────────────────────────────────────── */
function fieldStyle(focus: boolean, hasIcon: boolean): React.CSSProperties {
  return {
    width: "100%", fontFamily: FB, fontSize: 13, fontWeight: 500,
    color: "rgba(220,245,180,0.90)",
    padding: hasIcon ? "13px 14px 13px 40px" : "13px 14px",
    borderRadius: 12,
    border: `1.5px solid ${focus ? C.gLeaf + "80" : "rgba(125,200,50,0.20)"}`,
    background: focus ? "rgba(10,28,5,0.95)" : "rgba(6,18,3,0.80)",
    outline: "none", backdropFilter: "blur(10px)",
    transition: "all .22s",
    boxShadow: focus ? `0 0 0 3px ${C.gLeaf}15` : "none",
  };
}

/* ─── InputField ─────────────────────────────────────────────────────── */
function InputField({ label, type = "text", placeholder = "", value, onChange, required = false, icon }: InputFieldProps) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"rgba(190,230,140,0.72)", letterSpacing:".04em" }}>
        {label}{required && <span style={{ color:C.gLeaf, marginLeft:3 }}>*</span>}
      </label>
      <div style={{ position:"relative" }}>
        {icon && (
          <div style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:focus?C.gLeaf:"rgba(150,200,100,0.45)",transition:"color .22s",zIndex:1,pointerEvents:"none" }}>
            {icon}
          </div>
        )}
        <input
          type={type} placeholder={placeholder} value={value} onChange={onChange}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          required={required}
          style={fieldStyle(focus, !!icon)}
        />
      </div>
    </div>
  );
}

/* ─── SelectField ────────────────────────────────────────────────────── */
function SelectField({ label, options, value, onChange, required = false, placeholder, icon }: SelectFieldProps) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"rgba(190,230,140,0.72)", letterSpacing:".04em" }}>
        {label}{required && <span style={{ color:C.gLeaf, marginLeft:3 }}>*</span>}
      </label>
      <div style={{ position:"relative" }}>
        {icon && (
          <div style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:focus?C.gLeaf:"rgba(150,200,100,0.45)",transition:"color .22s",zIndex:1,pointerEvents:"none" }}>
            {icon}
          </div>
        )}
        <select
          value={value} onChange={onChange} required={required}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            ...fieldStyle(focus, !!icon),
            padding: icon ? "13px 36px 13px 40px" : "13px 36px 13px 14px",
            color: value ? "rgba(220,245,180,0.90)" : "rgba(150,200,100,0.45)",
            cursor: "pointer", appearance: "none",
          }}
        >
          <option value="" disabled style={{ background:"#0A1E04", color:"rgba(150,200,100,0.60)" }}>{placeholder}</option>
          {options.map((o: string) => (
            <option key={o} value={o} style={{ background:"#0A1E04", color:"rgba(220,245,180,0.90)" }}>{o}</option>
          ))}
        </select>
        <div style={{ position:"absolute",right:13,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"rgba(125,200,50,0.50)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Icon constants ─────────────────────────────────────────────────── */
const IcoPhone = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const IcoUser  = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IcoMail  = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IcoMap   = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcoCal   = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IcoGroup = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IcoCash  = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const IcoTaxi  = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;

/* ═══════════════════════════════════════════════════════════════════════
   HERO HEADER SECTION (fixed: removed mounted state & effect)
═══════════════════════════════════════════════════════════════════════ */
function HeroHeader() {
  const width    = useW();
  const isXS     = width < 480;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const [activeDestIdx, setActiveDestIdx] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(heroRef, 0.01);

  // Cycle destination previews
  useEffect(() => {
    const t = setInterval(() => setActiveDestIdx(i => (i + 1) % DESTINATIONS_PREVIEW.length), 3200);
    return () => clearInterval(t);
  }, []);

  const px    = isXS ? "16px" : isMobile ? "20px" : isTablet ? "32px" : "52px";
  const h1Sz  = isXS ? "36px" : isMobile ? "44px" : isTablet ? "58px" : "76px";
  const subSz = isXS ? "13px" : isMobile ? "14px" : "16px";

  return (
    <div ref={heroRef} style={{ position:"relative", minHeight: isMobile ? "100vh" : "100vh", overflow:"hidden", display:"flex", flexDirection:"column" }}>

      {/* ── BG Image ── */}
      <div style={{
        position:"absolute", inset:0, zIndex:0,
        backgroundImage:`url(${HERO_BG})`,
        backgroundSize:"cover", backgroundPosition:"center 40%",
        animation: "scaleIn 1.8s cubic-bezier(.22,1,.36,1) both",
      }}/>

      {/* ── Layered overlays ── */}
      <div style={{ position:"absolute",inset:0,zIndex:1,background:"rgba(4,14,2,0.60)" }}/>
      <div style={{ position:"absolute",inset:0,zIndex:2,background:`linear-gradient(180deg, rgba(4,12,2,0.80) 0%, rgba(4,12,2,0.10) 45%, rgba(4,14,2,0.55) 100%)` }}/>
      {/* Green atmospheric glow */}
      <div style={{ position:"absolute",inset:0,zIndex:3,pointerEvents:"none",background:`radial-gradient(ellipse 70% 50% at 50% 80%, rgba(46,128,16,0.18) 0%, transparent 65%)` }}/>
      {/* Grain texture */}
      <div style={{ position:"absolute",inset:0,zIndex:4,pointerEvents:"none",opacity:.028,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"200px" }}/>

      {/* ── Floating destination cards ── */}
      {!isMobile && (
        <div style={{ position:"absolute",right: isTablet?"28px":"60px",top:"50%",transform:"translateY(-50%)",zIndex:10,display:"flex",flexDirection:"column",gap:12 }}>
          {DESTINATIONS_PREVIEW.map((d, i) => (
            <div
              key={d.name}
              onClick={() => setActiveDestIdx(i)}
              style={{
                width:200, borderRadius:16, overflow:"hidden", cursor:"pointer",
                border:`2px solid ${i===activeDestIdx ? C.gLeaf+"90" : "rgba(125,200,50,0.15)"}`,
                background:`rgba(6,18,3,${i===activeDestIdx?"0.92":"0.70"})`,
                boxShadow: i===activeDestIdx ? `0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px ${C.gLeaf}30` : "0 4px 20px rgba(0,0,0,0.35)",
                transform: i===activeDestIdx ? "translateX(-8px) scale(1.03)" : "translateX(0) scale(1)",
                opacity: i===activeDestIdx ? 1 : 0.60,
                transition:"all .50s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <div style={{ height:90, backgroundImage:`url(${d.img})`,backgroundSize:"cover",backgroundPosition:"center",filter:i===activeDestIdx?"brightness(0.9)":"brightness(0.6)",transition:"filter .5s" }}/>
              <div style={{ padding:"10px 12px 11px" }}>
                <div style={{ fontFamily:F,fontStyle:"italic",fontSize:14,fontWeight:800,color:"#fff",marginBottom:2 }}>{d.name}</div>
                <div style={{ fontFamily:FB,fontSize:10,fontWeight:600,color:C.gLeaf,letterSpacing:".08em" }}>{d.tag}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Main content ── */}
      <div style={{ position:"relative",zIndex:10,maxWidth:1320,margin:"0 auto",padding:`0 ${px}`,flex:1,display:"flex",flexDirection:"column",justifyContent:"center",paddingTop: isMobile?"100px":"80px",paddingBottom: isMobile?"60px":"80px" }}>

        {/* Eyebrow badge */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8, marginBottom:22,
          animation: inView ? "slideDown .6s ease both" : "none",
        }}>
          <div style={{
            display:"flex", alignItems:"center", gap:8,
            padding:"8px 16px", borderRadius:100,
            background:"rgba(107,189,40,0.12)",
            border:"1.5px solid rgba(107,189,40,0.28)",
            backdropFilter:"blur(12px)",
          }}>
            <span style={{ width:7,height:7,borderRadius:"50%",background:C.gLeaf,display:"inline-block",animation:"pulse 2s infinite",boxShadow:`0 0 8px ${C.gLeaf}` }}/>
            <span style={{ fontFamily:FB,fontSize:isXS?10:11,fontWeight:700,color:C.gLeaf,letterSpacing:".18em",textTransform:"uppercase" }}>South India&apos;s Trusted Hill Travel Experts</span>
          </div>
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily:F, fontStyle:"italic", fontWeight:800,
          fontSize:h1Sz, lineHeight:1.02, letterSpacing:"-.036em",
          color:"#fff", margin:"0 0 10px",
          maxWidth: isMobile?"100%":"640px",
          textShadow:"0 4px 40px rgba(0,0,0,0.60)",
          animation: inView ? "fadeUp .65s .08s ease both" : "none",
        }}>
          Escape to the<br/>
          <span style={{
            background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 40%,${C.gLight} 70%,${C.gMid} 100%)`,
            backgroundSize:"200% auto",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            animation:"shimmer 4s linear infinite",
          }}>Misty Hills</span>
        </h1>

        {/* Sub-tagline */}
        <p style={{
          fontFamily:FB, fontSize:subSz, fontWeight:500,
          color:"rgba(190,230,140,0.65)", maxWidth:460, lineHeight:1.80,
          margin:"0 0 36px",
          animation: inView ? "fadeUp .65s .14s ease both" : "none",
        }}>
          Handcrafted getaways to Ooty, Kodaikanal, Munnar & beyond — with personalised itineraries, transparent pricing, and zero hassle.
        </p>

        {/* CTA buttons */}
        <div style={{
          display:"flex", gap:12, flexWrap:"wrap",
          animation: inView ? "fadeUp .65s .20s ease both" : "none",
        }}>
          <a
            href="#book"
            style={{
              fontFamily:FB, fontSize:isXS?13:14, fontWeight:700,
              padding: isXS?"13px 22px":"15px 30px",
              borderRadius:14, border:"none",
              background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`,
              color:C.gDeep, cursor:"pointer",
              letterSpacing:".04em", textDecoration:"none",
              display:"inline-flex", alignItems:"center", gap:9,
              boxShadow:`0 10px 32px ${C.gLeaf}55`,
              transition:"all .26s",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform="translateY(-3px)"; el.style.boxShadow=`0 18px 48px ${C.gLeaf}65`; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform="none"; el.style.boxShadow=`0 10px 32px ${C.gLeaf}55`; }}
          >
            Plan My Trip — Free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank" rel="noreferrer"
            style={{
              fontFamily:FB, fontSize:isXS?13:14, fontWeight:700,
              padding: isXS?"12px 20px":"14px 26px",
              borderRadius:14,
              border:"2px solid rgba(37,211,102,0.40)",
              background:"rgba(37,211,102,0.10)",
              color:"rgba(37,211,102,0.95)", cursor:"pointer",
              letterSpacing:".04em", textDecoration:"none",
              display:"inline-flex", alignItems:"center", gap:9,
              backdropFilter:"blur(10px)",
              transition:"all .26s",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background="rgba(37,211,102,0.20)"; el.style.borderColor="rgba(37,211,102,0.70)"; el.style.transform="translateY(-3px)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background="rgba(37,211,102,0.10)"; el.style.borderColor="rgba(37,211,102,0.40)"; el.style.transform="none"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z"/></svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Stats bar */}
        <div style={{
          display:"flex", flexWrap:"wrap", gap: isXS?"16px 24px":"12px 36px",
          marginTop:48,
          animation: inView ? "fadeUp .65s .28s ease both" : "none",
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ display:"flex", alignItems:"center", gap:10 }}>
              {i > 0 && !isXS && <div style={{ width:1,height:32,background:"rgba(125,200,50,0.20)" }}/>}
              <div>
                <div style={{ fontFamily:F,fontStyle:"italic",fontSize:isXS?20:24,fontWeight:800,color:"#fff",lineHeight:1,letterSpacing:"-.02em" }}>{s.value}</div>
                <div style={{ fontFamily:FB,fontSize:10,fontWeight:600,color:"rgba(160,215,100,0.55)",letterSpacing:".08em",textTransform:"uppercase",marginTop:3 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div style={{
        position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
        zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:8,
        animation: inView ? "fadeUp .65s .45s ease both" : "none",
      }}>
        <span style={{ fontFamily:FB,fontSize:10,fontWeight:600,color:"rgba(150,200,100,0.45)",letterSpacing:".14em",textTransform:"uppercase" }}>Scroll</span>
        <div style={{ width:22,height:36,borderRadius:11,border:"1.5px solid rgba(125,200,50,0.30)",display:"flex",justifyContent:"center",paddingTop:6 }}>
          <div style={{ width:4,height:4,borderRadius:"50%",background:C.gLeaf,animation:"scrollBob 1.8s ease-in-out infinite" }}/>
        </div>
      </div>

      {/* ── Bottom gradient bleed into contact section ── */}
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:120,zIndex:8,background:"linear-gradient(to bottom,transparent,rgba(4,10,2,0.95))",pointerEvents:"none" }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CONTACT SECTION (unchanged)
═══════════════════════════════════════════════════════════════════════ */
function ContactSection() {
  const width    = useW();
  const isXS     = width < 480;
  const isSM     = width >= 480 && width < 640;
  const isMD     = width >= 640 && width < 1024;
  const isLG     = width >= 1024 && width < 1280;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const secRef  = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(secRef);
  const formIn  = useInView(formRef);

  const emptyForm: FormState = { name:"", phone:"", email:"", destination:"", tripType:"", budget:"", travellers:"", date:"", message:"" };
  const [form,      setForm]      = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [agree,     setAgree]     = useState(false);

  const set = (k: FormKey) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    setSubmitted(true);
  };

  const px      = isXS ? "16px" : isSM ? "18px" : isMD ? "28px" : isLG ? "40px" : "52px";
  const pyTop   = isXS ? "60px" : isMD ? "80px" : "96px";
  const pyBot   = isXS ? "68px" : isMD ? "88px" : "108px";
  const h2Size  = isXS ? "26px" : isSM ? "30px" : isMD ? "40px" : isLG ? "46px" : "52px";
  const layoutCols = isMobile || isTablet ? "1fr" : "1fr 390px";

  return (
    <section id="book" style={{ fontFamily: FB, position:"relative", overflow:"hidden" }}>
      {/* ── Backgrounds ── */}
      <div style={{ position:"absolute",inset:0,zIndex:0, backgroundImage:`url(${HERO_BG})`, backgroundSize:"cover", backgroundPosition:"center 60%", backgroundAttachment:isMobile?"scroll":"fixed", filter:"brightness(0.18) saturate(1.4)" }}/>
      <div style={{ position:"absolute",inset:0,zIndex:2,pointerEvents:"none", background:`radial-gradient(ellipse 65% 50% at 10% 5%,rgba(46,128,16,.12) 0%,transparent 58%),radial-gradient(ellipse 55% 45% at 90% 90%,rgba(15,61,6,.17) 0%,transparent 55%),linear-gradient(180deg,rgba(4,12,2,.68) 0%,rgba(6,18,3,.25) 40%,rgba(4,10,2,.70) 100%)` }}/>
      <div style={{ position:"absolute",inset:0,zIndex:3,pointerEvents:"none",opacity:.016, backgroundImage:`radial-gradient(circle,${C.gLeaf} 1px,transparent 1px)`, backgroundSize:"38px 38px" }}/>

      {/* ── Content ── */}
      <div style={{ position:"relative",zIndex:10,maxWidth:1320,margin:"0 auto",padding:`${pyTop} ${px} ${pyBot}` }}>

        {/* ── Header ── */}
        <div ref={secRef} style={{ marginBottom:isMobile?32:52 }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:10,marginBottom:isXS?14:18,animation:inView?"fadeUp .55s ease both":"none" }}>
            <div style={{ height:2,width:26,borderRadius:2,background:`linear-gradient(to right,${C.gDeep},${C.gLeaf})` }}/>
            <span style={{ width:5,height:5,borderRadius:"50%",background:C.gLeaf,display:"inline-block",animation:"pulse 2.2s infinite" }}/>
            <span style={{ fontFamily:FB,fontSize:isXS?9:10,fontWeight:700,color:C.gLeaf,letterSpacing:".20em",textTransform:"uppercase" }}>Book Your Trip</span>
            <span style={{ width:5,height:5,borderRadius:"50%",background:C.gLeaf,display:"inline-block",animation:"pulse 2.2s .5s infinite" }}/>
            <div style={{ height:2,width:26,borderRadius:2,background:`linear-gradient(to left,${C.gDeep},${C.gLeaf})` }}/>
          </div>

          <h2 style={{
            fontFamily:F, fontStyle:"italic",
            fontSize:h2Size, fontWeight:800, color:"#fff",
            margin:"0 0 12px", letterSpacing:"-.032em", lineHeight:1.03,
            textShadow:"0 4px 28px rgba(0,0,0,.55)",
            animation:inView?"fadeUp .58s .06s ease both":"none",
          }}>
            Plan Your Perfect{" "}
            <span style={{
              background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 45%,${C.gMid} 100%)`,
              backgroundSize:"200% auto",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
              animation:"shimmer 4s linear infinite",
            }}>Hill Escape</span>
          </h2>

          <p style={{
            fontFamily:FB, fontSize:isXS?12.5:isMobile?13:14.5,
            color:"rgba(180,225,130,0.65)", maxWidth:500, lineHeight:1.82, margin:0,
            animation:inView?"fadeUp .58s .10s ease both":"none",
          }}>
            Fill in the form and our travel expert will call you within 2 hours with a personalised itinerary — completely free.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div ref={formRef} style={{ display:"grid", gridTemplateColumns:layoutCols, gap:isMobile?24:36, alignItems:"start" }}>

          {/* ══ FORM PANEL ══ */}
          <div style={{
            borderRadius:24, overflow:"hidden",
            background:"rgba(6,18,3,0.88)",
            border:"1px solid rgba(125,200,50,0.14)",
            boxShadow:"0 8px 48px rgba(0,0,0,0.38)",
            transform:formIn?"translateY(0)":"translateY(40px)",
            opacity:formIn?1:0,
            transition:"all .50s cubic-bezier(.22,1,.36,1)",
          }}>
            <div style={{ padding:isXS?"18px 16px 0":isMobile?"20px 20px 0":"26px 28px 0" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:C.gLeaf,animation:"pulse 2s infinite" }}/>
                <span style={{ fontFamily:FB,fontSize:11,fontWeight:700,color:C.gLeaf,letterSpacing:".14em",textTransform:"uppercase" }}>Free Enquiry</span>
              </div>
              <div style={{ fontFamily:F,fontStyle:"italic",fontSize:isXS?17:20,fontWeight:800,color:"#fff",letterSpacing:"-.02em" }}>Get Your Custom Itinerary</div>
              <div style={{ fontFamily:FB,fontSize:12,color:"rgba(170,215,110,0.50)",marginTop:4 }}>No advance payment · Reply within 2 hrs · 100% free</div>
              <div style={{ height:1,background:"linear-gradient(to right,transparent,rgba(125,200,50,0.16),transparent)",margin:"16px 0 0" }}/>
            </div>

            {submitted ? (
              <div style={{ padding:isXS?"28px 16px 32px":isMobile?"32px 20px 36px":"40px 28px 44px",textAlign:"center",animation:"successPop .55s cubic-bezier(.22,1,.36,1) both" }}>
                <div style={{ width:70,height:70,borderRadius:"50%",background:`linear-gradient(135deg,${C.gDeep},${C.gMid})`,border:`2px solid ${C.gLeaf}50`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",boxShadow:`0 12px 36px ${C.gMid}50` }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ fontFamily:F,fontStyle:"italic",fontSize:22,fontWeight:800,color:"#fff",marginBottom:8 }}>Enquiry Sent! 🎉</div>
                <div style={{ fontFamily:FB,fontSize:13,color:"rgba(180,225,130,0.65)",lineHeight:1.78,marginBottom:24,maxWidth:340,margin:"0 auto 24px" }}>
                  Thank you, <strong style={{ color:C.gLeaf }}>{form.name || "traveller"}</strong>! Our team will call you within 2 hours with your personalised itinerary.
                </div>
                <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" }}>
                  <a href="tel:+919876543210" style={{ fontFamily:FB,fontSize:13,fontWeight:700,padding:"11px 22px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`,color:C.gDeep,cursor:"pointer",letterSpacing:".04em",textDecoration:"none",display:"flex",alignItems:"center",gap:7,boxShadow:`0 6px 20px ${C.gLeaf}45` }}>
                    Call Now
                  </a>
                  <button onClick={() => { setSubmitted(false); setForm(emptyForm); setAgree(false); }} style={{ fontFamily:FB,fontSize:13,fontWeight:600,padding:"10px 20px",borderRadius:10,border:`1.5px solid rgba(125,200,50,0.30)`,background:"transparent",color:C.gLeaf,cursor:"pointer" }}>
                    New Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ padding:isXS?"16px":isMobile?"20px":"26px 28px",display:"flex",flexDirection:"column",gap:14 }}>
                <div className="form-row-2">
                  <InputField label="Your Name" placeholder="e.g. Ramesh Kumar" value={form.name} onChange={set("name")} required icon={IcoUser}/>
                  <InputField label="Phone Number" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} required icon={IcoPhone}/>
                </div>
                <InputField label="Email Address" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} icon={IcoMail}/>
                <div className="form-row-2">
                  <SelectField label="Destination" options={DESTINATIONS_LIST} value={form.destination} onChange={set("destination")} required placeholder="Choose destination" icon={IcoMap}/>
                  <SelectField label="Trip Type" options={TRIP_TYPES} value={form.tripType} onChange={set("tripType")} required placeholder="Type of trip" icon={IcoTaxi}/>
                </div>
                <div className="form-row-2">
                  <InputField label="Travel Date" type="date" value={form.date} onChange={set("date")} icon={IcoCal}/>
                  <InputField label="No. of Travellers" type="number" placeholder="e.g. 4" value={form.travellers} onChange={set("travellers")} icon={IcoGroup}/>
                </div>
                <SelectField label="Your Budget (per person)" options={BUDGETS} value={form.budget} onChange={set("budget")} placeholder="Select budget range" icon={IcoCash}/>
                <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                  <label style={{ fontFamily:FB,fontSize:11.5,fontWeight:700,color:"rgba(190,230,140,0.72)",letterSpacing:".04em" }}>Special Requests</label>
                  <textarea
                    placeholder="Any special requests, dietary needs, mobility concerns, preferred hotels..."
                    value={form.message} onChange={set("message")} rows={3}
                    style={{ width:"100%",fontFamily:FB,fontSize:13,fontWeight:500,color:"rgba(220,245,180,0.88)",padding:"13px 14px",borderRadius:12,border:"1.5px solid rgba(125,200,50,0.20)",background:"rgba(6,18,3,0.80)",outline:"none",backdropFilter:"blur(10px)",transition:"border .22s" }}
                    onFocus={e => { e.target.style.border=`1.5px solid ${C.gLeaf}80`; e.target.style.boxShadow=`0 0 0 3px ${C.gLeaf}15`; }}
                    onBlur={e  => { e.target.style.border="1.5px solid rgba(125,200,50,0.20)"; e.target.style.boxShadow="none"; }}
                  />
                </div>
                <div style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                  <div onClick={() => setAgree(a => !a)} style={{ width:20,height:20,borderRadius:6,border:`2px solid ${agree?C.gLeaf:"rgba(125,200,50,0.35)"}`,background:agree?C.gLeaf:"transparent",flexShrink:0,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .22s",marginTop:1 }}>
                    {agree && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.gDeep} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span style={{ fontFamily:FB,fontSize:11.5,color:"rgba(175,220,120,0.55)",lineHeight:1.65,cursor:"pointer" }} onClick={() => setAgree(a => !a)}>
                    I agree to be contacted by the Hills Travel team via phone, WhatsApp or email regarding my enquiry.
                  </span>
                </div>
                <button
                  type="submit" disabled={loading || !agree}
                  style={{
                    fontFamily:FB, fontSize:14, fontWeight:700,
                    padding:"15px", borderRadius:13, border:"none",
                    background: agree ? `linear-gradient(135deg,${C.gLeaf},${C.gMid})` : "rgba(125,200,50,0.18)",
                    color: agree ? C.gDeep : "rgba(125,200,50,0.40)",
                    cursor: agree ? "pointer" : "not-allowed",
                    letterSpacing:".04em", transition:"all .26s",
                    boxShadow: agree ? `0 10px 30px ${C.gLeaf}48` : "none",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                  }}
                  onMouseEnter={e => { if (agree && !loading) { (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow=`0 18px 44px ${C.gLeaf}60`; } }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="none"; (e.currentTarget as HTMLElement).style.boxShadow=agree?`0 10px 30px ${C.gLeaf}48`:"none"; }}
                >
                  {loading ? (
                    <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation:"spin 0.8s linear infinite" }}><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1"/></svg>Sending Enquiry…</>
                  ) : (
                    <>Send My Enquiry — It&apos;s Free<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                  )}
                </button>
                <div style={{ textAlign:"center",fontFamily:FB,fontSize:10.5,color:"rgba(155,205,110,0.42)",display:"flex",alignItems:"center",justifyContent:"center",gap:6 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Your details are safe and will never be shared with third parties.
                </div>
              </form>
            )}
          </div>

          {/* ══ RIGHT PANEL ══ */}
          <div className="right-panel-wrap" style={{ transform:formIn?"translateY(0)":"translateY(40px)", opacity:formIn?1:0, transition:"all .50s .12s cubic-bezier(.22,1,.36,1)" }}>
            <div className="contact-cards-row" style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {CONTACT_INFO.map(c => (
                <div key={c.label} className="contact-card" style={{ borderRadius:16,padding:"16px 18px",background:"rgba(6,18,3,0.86)",border:"1px solid rgba(125,200,50,0.12)",display:"flex",alignItems:"center",gap:14,boxShadow:"0 4px 20px rgba(0,0,0,0.28)",cursor:"pointer" }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.border=`1px solid ${c.color}45`; el.style.background="rgba(10,28,5,0.96)"; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.border="1px solid rgba(125,200,50,0.12)"; el.style.background="rgba(6,18,3,0.86)"; }}
                >
                  <div style={{ width:44,height:44,borderRadius:12,background:`${c.color}18`,border:`1.5px solid ${c.color}35`,display:"flex",alignItems:"center",justifyContent:"center",color:c.color,flexShrink:0 }}>{c.icon}</div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontFamily:FB,fontSize:10,fontWeight:700,color:"rgba(170,215,110,0.50)",letterSpacing:".10em",textTransform:"uppercase",marginBottom:2 }}>{c.label}</div>
                    <div style={{ fontFamily:F,fontStyle:"italic",fontSize:15,fontWeight:800,color:"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{c.value}</div>
                    <div style={{ fontFamily:FB,fontSize:10.5,color:"rgba(165,210,110,0.48)",marginTop:2 }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="https://wa.me/919876543210?text=Hi! I'd like to plan a hill station trip." target="_blank" rel="noreferrer"
              style={{ borderRadius:16,padding:"20px 18px",background:"linear-gradient(135deg,rgba(37,211,102,0.15),rgba(37,211,102,0.08))",border:"1.5px solid rgba(37,211,102,0.30)",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textDecoration:"none",transition:"all .26s" }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(37,211,102,0.22)"; el.style.borderColor="rgba(37,211,102,0.55)"; el.style.transform="translateY(-3px)"; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="linear-gradient(135deg,rgba(37,211,102,0.15),rgba(37,211,102,0.08))"; el.style.borderColor="rgba(37,211,102,0.30)"; el.style.transform="none"; }}
            >
              <div style={{ width:46,height:46,borderRadius:13,background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 6px 20px rgba(37,211,102,0.40)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:F,fontStyle:"italic",fontSize:15,fontWeight:800,color:"#fff",marginBottom:3 }}>Chat on WhatsApp</div>
                <div style={{ fontFamily:FB,fontSize:11.5,color:"rgba(37,211,102,0.75)" }}>Instant reply · Available 24/7</div>
              </div>
              <div style={{ color:"rgba(37,211,102,0.60)",flexShrink:0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </a>

            <div style={{ borderRadius:16,padding:"18px 20px",background:"rgba(6,18,3,0.82)",border:"1px solid rgba(125,200,50,0.10)",display:"flex",flexDirection:"column",gap:11 }}>
              <div style={{ fontFamily:FB,fontSize:10,fontWeight:700,color:"rgba(170,215,110,0.45)",letterSpacing:".12em",textTransform:"uppercase" }}>We Promise You</div>
              {[
                { icon:"✅", text:"No advance payment to enquire"      },
                { icon:"🔒", text:"Your data is 100% private & secure" },
                { icon:"⚡", text:"Reply within 2 hours guaranteed"    },
                { icon:"🎯", text:"Custom itinerary, no template tours" },
              ].map(t => (
                <div key={t.text} style={{ display:"flex",alignItems:"center",gap:10 }}>
                  <span style={{ fontSize:14 }}>{t.icon}</span>
                  <span style={{ fontFamily:FB,fontSize:12,fontWeight:600,color:"rgba(190,230,140,0.65)" }}>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ROOT EXPORT — Full Page
═══════════════════════════════════════════════════════════════════════ */
export default function HillsTravelPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:#040E02; }
        button { -webkit-tap-highlight-color:transparent; cursor:pointer; }
        button:active { transform:scale(0.96)!important; }

        @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.55)} }
        @keyframes shimmer   { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes successPop{ 0%{transform:scale(0.7);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        @keyframes scrollBob { 0%,100%{transform:translateY(0);opacity:1} 60%{transform:translateY(14px);opacity:0} 61%{transform:translateY(0);opacity:0} 80%{opacity:1} }
        @keyframes scaleIn   { from { transform: scale(1.06); } to { transform: scale(1); } }

        input::placeholder, textarea::placeholder { color:rgba(150,200,100,0.38)!important; }
        select option { background:#0A1E04; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter:invert(1) brightness(0.5) sepia(1) hue-rotate(80deg); }
        textarea { resize:vertical; }

        .contact-card { transition:all .26s; }
        .contact-card:hover { transform:translateY(-3px)!important; box-shadow:0 14px 36px rgba(0,0,0,0.38)!important; }
        .right-panel-wrap { display:flex; flex-direction:column; gap:14px; }
        @media(min-width:480px) and (max-width:639px) {
          .contact-cards-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        }
        .form-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        @media(max-width:479px) { .form-row-2 { grid-template-columns:1fr; gap:12px; } }
      `}</style>

      <HeroHeader />
      <ContactSection />
    </>
  );
}