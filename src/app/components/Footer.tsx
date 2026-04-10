"use client";
import { useState, useEffect, useRef, RefObject } from "react";

/* ─── Tokens ─────────────────────────────────────────────────────────── */
const C = {
  gDeep: "#0F3D06", gDark: "#1A5C0A", gMid: "#2E8010",
  gLeaf: "#6BBD28", gLight: "#96D94A",
};
const FB = "'DM Sans', 'Segoe UI', sans-serif";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface LogoProps       { size?: number; }
interface MainFooterProps { isMobile: boolean; inView: boolean; isXS: boolean; }

/* ─── Scoped CSS ─────────────────────────────────────────────────────── */
const SCOPED_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap');

.ftr__root *, .ftr__root *::before, .ftr__root *::after { box-sizing:border-box; margin:0; padding:0; }
.ftr__root a      { text-decoration:none; cursor:pointer; display:block; }
.ftr__root button { cursor:pointer; -webkit-tap-highlight-color:transparent; }
.ftr__root button:active { transform:scale(0.96)!important; }

/* ── Pre-footer CTA bar ── */
.ftr__prebar { position:relative; overflow:hidden; }
.ftr__prebar__bg {
  position:absolute; inset:0;
  background-image:url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=70&fit=crop);
  background-size:cover; background-position:center 30%;
  filter:brightness(.18) saturate(1.3); z-index:0;
}
.ftr__prebar__overlay {
  position:absolute; inset:0; z-index:1;
  background:linear-gradient(135deg,rgba(10,36,4,.96) 0%,rgba(26,92,10,.88) 50%,rgba(18,65,7,.94) 100%);
}
.ftr__prebar__dots {
  position:absolute; inset:0; z-index:2; pointer-events:none; opacity:.018;
  background-image:radial-gradient(circle,${C.gLeaf} 1px,transparent 1px);
  background-size:34px 34px;
}
.ftr__prebar__inner {
  position:relative; z-index:3;
  max-width:1320px; margin:0 auto;
  display:flex; align-items:center; justify-content:space-between; gap:16px;
}
.ftr__prebar__left { display:flex; align-items:center; gap:14px; flex:1; min-width:0; }
.ftr__prebar__label { display:flex; align-items:center; gap:7px; flex-shrink:0; }
.ftr__prebar__dot {
  width:7px; height:7px; border-radius:50%; background:${C.gLeaf};
  box-shadow:0 0 0 2px rgba(107,189,40,.28); animation:ftr__pulse 1.8s infinite; flex-shrink:0;
}
.ftr__prebar__tag {
  font-family:'DM Sans',sans-serif; font-size:9px; font-weight:700;
  color:${C.gLeaf}; letter-spacing:.16em; text-transform:uppercase; white-space:nowrap;
}
.ftr__prebar__divider { width:1px; height:20px; background:rgba(107,189,40,.25); flex-shrink:0; }
.ftr__prebar__title {
  font-family:'Playfair Display',Georgia,serif; font-style:italic;
  font-weight:800; color:#fff; letter-spacing:-.02em; line-height:1;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.ftr__prebar__sub {
  font-family:'DM Sans',sans-serif; color:rgba(178,222,118,.52); font-size:11.5px;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.ftr__prebar__btns { display:flex; gap:10px; flex-shrink:0; align-items:center; }
.ftr__prebar__primary {
  padding:9px 20px; border-radius:9px; border:none;
  background:linear-gradient(135deg,${C.gLeaf},${C.gMid}); color:${C.gDeep};
  font-family:'DM Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:.03em;
  display:flex; align-items:center; gap:7px; white-space:nowrap;
  box-shadow:0 6px 18px rgba(107,189,40,.40); transition:all .22s;
}
.ftr__prebar__primary:hover { transform:translateY(-2px); box-shadow:0 12px 28px rgba(107,189,40,.55); }
.ftr__prebar__secondary {
  padding:8px 16px; border-radius:9px;
  border:1.5px solid rgba(255,255,255,.20); background:rgba(255,255,255,.07);
  backdrop-filter:blur(10px); color:#fff;
  font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600;
  display:flex; align-items:center; gap:7px; white-space:nowrap; transition:all .22s;
}
.ftr__prebar__secondary:hover { background:rgba(255,255,255,.15); border-color:rgba(255,255,255,.38); transform:translateY(-2px); }

/* ── Main footer ── */
.ftr__main { background:#030C02; position:relative; overflow:hidden; }
.ftr__main__topline {
  height:2px;
  background:linear-gradient(90deg,transparent 0%,${C.gDeep} 20%,${C.gLeaf} 50%,${C.gMid} 80%,transparent 100%);
}
.ftr__main__glow {
  position:absolute; top:0; left:50%; transform:translateX(-50%);
  width:600px; height:1px;
  background:radial-gradient(ellipse,rgba(107,189,40,.35) 0%,transparent 70%);
  pointer-events:none; z-index:1;
}
.ftr__main__content { position:relative; z-index:2; max-width:1320px; margin:0 auto; }

/* ── Grid ── */
.ftr__grid { display:grid; }

/* ── Brand ── */
.ftr__brand__logo { display:flex; align-items:center; gap:12px; margin-bottom:16px; cursor:pointer; }
.ftr__brand__icon {
  width:46px; height:46px; border-radius:12px; background:${C.gDeep};
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
  box-shadow:0 4px 18px rgba(26,92,10,.50),0 0 0 1px rgba(107,189,40,.20);
}
.ftr__brand__name {
  font-family:'Playfair Display',Georgia,serif; font-style:italic;
  font-weight:800; font-size:21px; color:#fff; line-height:1; letter-spacing:-.02em;
}
.ftr__brand__tagline {
  font-family:'DM Sans',sans-serif; font-size:8px; color:rgba(165,215,110,.50);
  margin-top:3px; letter-spacing:.14em; text-transform:uppercase;
}
.ftr__brand__desc {
  font-family:'DM Sans',sans-serif; font-size:12.5px; color:rgba(185,230,130,.50);
  line-height:1.82; margin-bottom:20px; max-width:300px;
}
.ftr__brand__badges { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:22px; }
.ftr__brand__badge {
  display:flex; align-items:center; gap:6px; padding:6px 12px; border-radius:10px;
  background:rgba(107,189,40,.08); border:1px solid rgba(107,189,40,.16);
  font-family:'DM Sans',sans-serif; font-size:10.5px; font-weight:600; color:rgba(185,230,130,.70);
}
.ftr__socials { display:flex; gap:8px; flex-wrap:wrap; }
.ftr__social {
  width:38px; height:38px; border-radius:10px; flex-shrink:0;
  display:flex!important; align-items:center; justify-content:center;
  border:1.5px solid rgba(255,255,255,.10); background:rgba(255,255,255,.05);
  transition:all .22s;
}
.ftr__social:hover { transform:translateY(-3px); box-shadow:0 8px 22px rgba(0,0,0,.40); }

/* ── Nav columns ── */
.ftr__col__title {
  font-family:'DM Sans',sans-serif; font-size:11px; font-weight:800;
  color:#fff; letter-spacing:.14em; text-transform:uppercase;
  margin-bottom:16px; display:flex; align-items:center; gap:8px;
}
.ftr__col__title::after {
  content:""; flex:1; height:1px;
  background:linear-gradient(to right,rgba(107,189,40,.25),transparent);
}
.ftr__links { display:flex; flex-direction:column; gap:0; }
.ftr__link {
  display:flex!important; align-items:center; gap:8px; padding:7px 0;
  font-family:'DM Sans',sans-serif; font-size:12.5px; font-weight:500;
  color:rgba(185,230,130,.52); transition:all .18s;
  border-left:2px solid transparent; width:100%;
}
.ftr__link:hover { color:${C.gLeaf}; border-left-color:${C.gLeaf}; padding-left:8px; }
.ftr__link__arrow { opacity:0; transition:all .18s; font-size:10px; color:${C.gLeaf}; }
.ftr__link:hover .ftr__link__arrow { opacity:1; }
.ftr__link__badge {
  font-size:8px; font-weight:800; padding:1px 6px; border-radius:20px;
  background:${C.gLeaf}; color:${C.gDeep}; letter-spacing:.05em; text-transform:uppercase;
  flex-shrink:0; margin-left:auto;
}

/* ── Contact column ── */
.ftr__contact__item {
  display:flex!important; align-items:flex-start; gap:12px;
  padding:10px 0; border-bottom:1px solid rgba(107,189,40,.07);
  transition:all .20s; cursor:pointer; width:100%;
}
.ftr__contact__item:last-of-type { border-bottom:none; }
.ftr__contact__item:hover { padding-left:4px; }
.ftr__contact__icon {
  width:34px; height:34px; border-radius:9px; flex-shrink:0;
  display:flex; align-items:center; justify-content:center; font-size:14px; transition:all .20s;
}
.ftr__contact__item:hover .ftr__contact__icon { transform:scale(1.08); }
.ftr__contact__label { font-family:'DM Sans',sans-serif; font-size:9.5px; font-weight:700; color:rgba(155,205,100,.45); letter-spacing:.10em; text-transform:uppercase; margin-bottom:2px; }
.ftr__contact__val   { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; color:#fff; }
.ftr__contact__sub   { font-family:'DM Sans',sans-serif; font-size:10.5px; color:rgba(155,205,100,.40); margin-top:1px; }

/* ── Map placeholder ── */
.ftr__map {
  border-radius:12px; overflow:hidden; margin-top:14px;
  border:1.5px solid rgba(107,189,40,.14); background:rgba(6,20,3,.80);
  display:flex; align-items:center; justify-content:center;
  gap:10px; padding:14px;
  font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; color:rgba(165,215,110,.55);
}

/* ── Trust strip ── */
.ftr__trust {
  display:flex; flex-wrap:wrap; gap:9px;
  padding:20px 0; border-top:1px solid rgba(107,189,40,.08); border-bottom:1px solid rgba(107,189,40,.08);
  margin-top:8px;
}
.ftr__trust__item {
  display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:12px;
  background:rgba(107,189,40,.05); border:1px solid rgba(107,189,40,.11);
  flex:1; min-width:140px;
}
.ftr__trust__val { font-family:'Playfair Display',Georgia,serif; font-style:italic; font-size:15px; font-weight:800; color:${C.gLeaf}; line-height:1; }
.ftr__trust__lbl { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; color:rgba(165,215,110,.48); margin-top:2px; }

/* ── Bottom bar ── */
.ftr__bottom {
  display:flex; align-items:center; justify-content:space-between;
  flex-wrap:nowrap; gap:14px;
}
.ftr__bottom__copy {
  font-family:'DM Sans',sans-serif; font-size:11.5px; color:rgba(155,205,100,.38);
  font-weight:400; line-height:1; white-space:nowrap; flex-shrink:0;
}
.ftr__bottom__copy span { color:${C.gLeaf}; font-weight:600; }
.ftr__bottom__links { display:flex; align-items:center; gap:2px; flex-shrink:0; overflow:hidden; }
.ftr__bottom__link {
  font-family:'DM Sans',sans-serif; font-size:11px; font-weight:500; color:rgba(155,205,100,.38);
  padding:4px 8px; border-radius:6px; transition:all .18s;
  background:transparent; border:none; white-space:nowrap;
}
.ftr__bottom__link:hover { color:${C.gLeaf}; background:rgba(107,189,40,.08); }
.ftr__bottom__sep { color:rgba(107,189,40,.18); font-size:9px; flex-shrink:0; }
.ftr__bottom__right { display:flex; align-items:center; gap:10px; flex-shrink:0; }
.ftr__back__top {
  width:34px; height:34px; border-radius:9px;
  background:rgba(107,189,40,.10); border:1.5px solid rgba(107,189,40,.22);
  display:flex; align-items:center; justify-content:center; transition:all .22s; color:${C.gLeaf};
}
.ftr__back__top:hover { background:${C.gLeaf}; color:${C.gDeep}; transform:translateY(-2px); box-shadow:0 6px 18px rgba(107,189,40,.40); }
.ftr__status__circle {
  width:6px; height:6px; border-radius:50%; background:${C.gLeaf};
  box-shadow:0 0 0 2px rgba(107,189,40,.22); animation:ftr__pulse 2s infinite; flex-shrink:0;
}
.ftr__status__txt { font-family:'DM Sans',sans-serif; font-size:10.5px; font-weight:600; color:rgba(155,205,100,.46); white-space:nowrap; }

/* ── Keyframes ── */
@keyframes ftr__pulse   { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.28;transform:scale(.52)} }
@keyframes ftr__shimmer { 0%{background-position:200% center}100%{background-position:-200% center} }
@keyframes ftr__fadeUp  { from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)} }

/* ── Responsive ── */
@media (max-width:479px) {
  .ftr__prebar__inner   { padding:12px 14px; flex-wrap:wrap; gap:10px; }
  .ftr__prebar__left    { flex-direction:column; align-items:flex-start; gap:5px; }
  .ftr__prebar__divider { display:none; }
  .ftr__prebar__sub     { display:none; }
  .ftr__prebar__title   { font-size:16px!important; }
  .ftr__prebar__btns    { width:100%; }
  .ftr__prebar__primary, .ftr__prebar__secondary { flex:1; justify-content:center; }
  .ftr__main__content   { padding:40px 14px 24px; }
  .ftr__grid            { grid-template-columns:1fr; gap:28px; }
  .ftr__bottom          { padding:12px 14px; gap:8px; }
  .ftr__bottom__links   { display:none; }
  .ftr__bottom__copy    { font-size:10px; }
  .ftr__trust__item     { min-width:calc(50% - 5px); }
  .ftr__brand__desc     { max-width:100%; }
  .ftr__status__txt     { display:none; }
}
@media (min-width:480px) and (max-width:639px) {
  .ftr__prebar__inner   { padding:12px 18px; gap:12px; }
  .ftr__prebar__sub     { display:none; }
  .ftr__prebar__title   { font-size:16px!important; }
  .ftr__main__content   { padding:44px 18px 26px; }
  .ftr__grid            { grid-template-columns:1fr 1fr; gap:24px; }
  .ftr__bottom          { padding:12px 18px; }
  .ftr__bottom__links   { display:none; }
  .ftr__trust__item     { min-width:calc(50% - 5px); }
  .ftr__brand__desc     { max-width:100%; }
}
@media (min-width:640px) and (max-width:1023px) {
  .ftr__prebar__inner   { padding:14px 28px; }
  .ftr__prebar__sub     { display:none; }
  .ftr__prebar__title   { font-size:17px!important; }
  .ftr__main__content   { padding:50px 28px 28px; }
  .ftr__grid            { grid-template-columns:1fr 1fr 1fr; gap:26px; }
  .ftr__bottom          { padding:14px 28px; }
  .ftr__bottom__links   { display:none; }
}
@media (min-width:1024px) {
  .ftr__prebar__inner   { padding:16px 52px; }
  .ftr__prebar__title   { font-size:18px!important; }
  .ftr__main__content   { padding:60px 52px 32px; }
  .ftr__grid            { grid-template-columns:1.5fr 1fr 1fr 1fr 1.2fr; gap:36px; }
  .ftr__bottom          { padding:14px 52px; }
  .ftr__bottom__links   { display:flex; }
}

/* Nav column collapsible mobile */
.ftr__col__mobile__toggle {
  display:none; align-items:center; justify-content:space-between; width:100%; cursor:pointer;
  background:none; border:none; padding:0;
}
@media (max-width:479px) {
  .ftr__col__mobile__toggle { display:flex; }
  .ftr__links { max-height:0; overflow:hidden; transition:max-height .32s ease; }
  .ftr__links--open { max-height:400px; }
  .ftr__col__title { margin-bottom:0; }
}
`;

/* ─── Data ──────────────────────────────────────────────────────────── */
const SOCIAL_LINKS = [
  { name:"Facebook",  color:"#1877F2", path:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name:"Instagram", color:"#E1306C", path:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
  { name:"WhatsApp",  color:"#25D366", path:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" },
  { name:"YouTube",   color:"#FF0000", path:"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
];

const NAV_COLS = [
  { title:"Destinations", links:[{label:"Ooty",badge:null},{label:"Kodaikanal",badge:null},{label:"Munnar",badge:"Popular"},{label:"Coorg",badge:null},{label:"Valparai",badge:null},{label:"Wayanad",badge:"New"},{label:"View All →",badge:null}] },
  { title:"Our Services",  links:[{label:"Group Tours",badge:null},{label:"Honeymoon Packages",badge:null},{label:"Family Packages",badge:null},{label:"Taxi & Transport",badge:null},{label:"Hotel Booking",badge:null},{label:"Custom Itinerary",badge:"Free"},{label:"Sri Lanka Tours",badge:null}] },
  { title:"Quick Links",   links:[{label:"About Us",badge:null},{label:"Photo Gallery",badge:null},{label:"Travel Blog",badge:null},{label:"Testimonials",badge:null},{label:"Book a Trip",badge:null},{label:"Get a Quote",badge:null},{label:"Contact Us",badge:null}] },
];

const TRUST_ITEMS = [
  {icon:"🏆",val:"12+",    label:"Years Experience" },
  {icon:"👥",val:"8,500+", label:"Happy Travellers" },
  {icon:"🏔️",val:"50+",    label:"Tour Packages"    },
  {icon:"⭐",val:"4.9★",   label:"Average Rating"   },
  {icon:"🌍",val:"3",      label:"Countries Covered"},
  {icon:"💰",val:"₹0",     label:"Hidden Charges"   },
];

const BOTTOM_LINKS = ["Privacy Policy","Terms of Service","Refund Policy","Sitemap","FAQs"];

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

/* ─── Logo ───────────────────────────────────────────────────────────── */
function LogoSVG({ size = 26 }: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
      <path d="M22 6C12 9 9 16 7 23h2.5c.5-2 1.8-4.5 4.5-6.5C17 14 21 13 24 13c2.5 0 5 .7 7 2C30 10 26 5 22 6z" fill={C.gLeaf}/>
      <path d="M19 8C10 11 8 17.5 6 24h2c.5-2 2-4 4.5-6C15 16 18 14.5 21 14.5c2 0 4 .5 6 1.5C26 11 22.5 7 19 8z" fill="rgba(255,255,255,.38)"/>
    </svg>
  );
}

/* ─── Collapsible nav column (mobile) ───────────────────────────────── */
function NavColumn({ col, isXS }: { col: typeof NAV_COLS[0]; isXS: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {isXS ? (
        <button className="ftr__col__mobile__toggle" onClick={() => setOpen(o => !o)}>
          <div className="ftr__col__title" style={{ marginBottom:0 }}>{col.title}</div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(107,189,40,.60)" strokeWidth="2.5" strokeLinecap="round"
            style={{ transform: open ? "rotate(180deg)" : "none", transition:"transform .28s", flexShrink:0 }}>
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      ) : (
        <div className="ftr__col__title">{col.title}</div>
      )}
      <div className={`ftr__links${isXS && open ? " ftr__links--open" : isXS ? "" : " ftr__links--open"}`}
        style={{ marginTop: isXS ? (open ? 12 : 0) : 0 }}>
        {col.links.map((lnk, li) => (
          <a key={li} href="#" className="ftr__link">
            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="rgba(107,189,40,.35)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink:0 }}>
              <path d="M9 18l6-6-6-6"/>
            </svg>
            {lnk.label}
            {lnk.badge && <span className="ftr__link__badge">{lnk.badge}</span>}
            <span className="ftr__link__arrow">›</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── PreFooterBar ───────────────────────────────────────────────────── */
function PreFooterBar() {
  return (
    <div className="ftr__prebar">
      <div className="ftr__prebar__bg"/>
      <div className="ftr__prebar__overlay"/>
      <div className="ftr__prebar__dots"/>
      <div className="ftr__prebar__inner">
        <div className="ftr__prebar__left">
          <div className="ftr__prebar__label">
            <span className="ftr__prebar__dot"/>
            <span className="ftr__prebar__tag">Ready to Explore?</span>
          </div>
          <div className="ftr__prebar__divider"/>
          <div className="ftr__prebar__title">
            Your Next Hill Station Adventure —{" "}
            <span style={{
              fontStyle:"italic",
              background:`linear-gradient(125deg,${C.gLeaf} 0%,#C8F060 45%,${C.gMid} 100%)`,
              backgroundSize:"200% auto",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              animation:"ftr__shimmer 4s linear infinite",
            }}>Starts Here</span>
          </div>
          <div className="ftr__prebar__divider"/>
          <div className="ftr__prebar__sub">Free consultation · Reply in 2 hrs</div>
        </div>
        <div className="ftr__prebar__btns">
          <button className="ftr__prebar__primary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call Now
          </button>
          <button className="ftr__prebar__secondary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.893 0C5.354 0 0 5.335 0 11.898c0 2.1.549 4.152 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 0 0 5.558 1.37h.005c6.538 0 11.892-5.336 11.892-11.9 0-3.178-1.24-6.165-3.49-8.413A11.81 11.81 0 0 0 11.893 0z"/>
            </svg>
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MainFooter ─────────────────────────────────────────────────────── */
function MainFooter({ isMobile, inView, isXS }: MainFooterProps) {
  const [hovSocial, setHovSocial] = useState<string | null>(null);

  return (
    <div className="ftr__main">
      <div className="ftr__main__topline"/>
      <div className="ftr__main__glow"/>

      <div className="ftr__main__content">

        {/* ── Columns ── */}
        <div className="ftr__grid" style={{ marginBottom: isMobile ? 32 : 48 }}>

          {/* Brand column */}
          <div style={{
            opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(28px)",
            transition:"all .50s .05s cubic-bezier(.22,1,.36,1)",
          }}>
            <div className="ftr__brand__logo">
              <div className="ftr__brand__icon"><LogoSVG size={26}/></div>
              <div>
                <div className="ftr__brand__name">Nature Trails</div>
                <div className="ftr__brand__tagline">Coimbatore · Travel & Tourism · Est. 2012</div>
              </div>
            </div>
            <p className="ftr__brand__desc">
              South India&apos;s most trusted hill station travel company — crafting unforgettable journeys to Ooty, Kodaikanal, Munnar, Coorg and beyond.
            </p>
            <div className="ftr__brand__badges">
              {[{icon:"✅",text:"GST Registered"},{icon:"🏅",text:"Award Winning"},{icon:"🔒",text:"Secure Booking"}].map((b,i) => (
                <div key={i} className="ftr__brand__badge">
                  <span style={{ fontSize:13 }}>{b.icon}</span>{b.text}
                </div>
              ))}
            </div>
            <div className="ftr__socials">
              {SOCIAL_LINKS.map(s => (
                <a key={s.name} href="#" title={s.name} className="ftr__social"
                  onMouseEnter={() => setHovSocial(s.name)}
                  onMouseLeave={() => setHovSocial(null)}
                  style={{
                    background: hovSocial===s.name ? s.color : "rgba(255,255,255,0.05)",
                    borderColor: hovSocial===s.name ? s.color : "rgba(255,255,255,0.10)",
                    boxShadow: hovSocial===s.name ? `0 8px 22px ${s.color}44` : "none",
                    transform: hovSocial===s.name ? "translateY(-3px)" : "none",
                  }}>
                  <svg viewBox="0 0 24 24" width="14" height="14"
                    fill={hovSocial===s.name ? "#fff" : "rgba(185,230,130,0.55)"}>
                    <path d={s.path}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col, ci) => (
            <div key={ci} style={{
              opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(28px)",
              transition:`all .50s ${(ci+1)*0.07+0.05}s cubic-bezier(.22,1,.36,1)`,
            }}>
              <NavColumn col={col} isXS={isXS}/>
            </div>
          ))}

          {/* Contact column */}
          <div style={{
            opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(28px)",
            transition:"all .50s .33s cubic-bezier(.22,1,.36,1)",
          }}>
            <div className="ftr__col__title">Get in Touch</div>
            {[
              { icon:"📞", color:`${C.gLeaf}18`, borderColor:`${C.gLeaf}28`, label:"Phone / WhatsApp", val:"+91 98765 43210", sub:"Mon–Sun, 8AM – 9PM", href:"tel:+919876543210" },
              { icon:"✉️", color:"rgba(96,165,250,.12)", borderColor:"rgba(96,165,250,.22)", label:"Email Address", val:"hello@naturetrails.in", sub:"Reply within 2 hours", href:"mailto:hello@naturetrails.in" },
              { icon:"📍", color:"rgba(248,113,113,.12)", borderColor:"rgba(248,113,113,.22)", label:"Office Location", val:"Coimbatore, Tamil Nadu", sub:"Walk-in: Mon–Sat 9AM–6PM", href:null },
              { icon:"🕐", color:"rgba(250,204,21,.12)",  borderColor:"rgba(250,204,21,.22)",  label:"Office Hours",    val:"Mon–Fri: 8AM – 8PM",  sub:"Sat–Sun: 9AM – 5PM",       href:null },
            ].map((c, i) => (
              <a key={i} href={c.href ?? undefined} className="ftr__contact__item">
                <div className="ftr__contact__icon" style={{ background:c.color, border:`1.5px solid ${c.borderColor}` }}>
                  {c.icon}
                </div>
                <div>
                  <div className="ftr__contact__label">{c.label}</div>
                  <div className="ftr__contact__val">{c.val}</div>
                  <div className="ftr__contact__sub">{c.sub}</div>
                </div>
              </a>
            ))}
            <div className="ftr__map">
              <span style={{ fontSize:18 }}>📌</span>
              <span>Coimbatore, Tamil Nadu, India</span>
            </div>
          </div>
        </div>

        {/* ── Trust strip ── */}
        <div className="ftr__trust" style={{
          opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(22px)",
          transition:"all .50s .40s cubic-bezier(.22,1,.36,1)",
        }}>
          {TRUST_ITEMS.map((t, i) => (
            <div key={i} className="ftr__trust__item">
              <span style={{ fontSize:18 }}>{t.icon}</span>
              <div>
                <div className="ftr__trust__val">{t.val}</div>
                <div className="ftr__trust__lbl">{t.label}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop:"1px solid rgba(107,189,40,.08)", background:"rgba(0,0,0,.28)" }}>
        <div className="ftr__bottom" style={{ maxWidth:1320, margin:"0 auto" }}>
          <div className="ftr__bottom__copy">
            © {new Date().getFullYear()} <span>Nature Trails</span>. All rights reserved.
          </div>
          <div className="ftr__bottom__links">
            {BOTTOM_LINKS.map((lnk, i) => (
              <span key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
                {i > 0 && <span className="ftr__bottom__sep">·</span>}
                <button className="ftr__bottom__link">{lnk}</button>
              </span>
            ))}
          </div>
          <div className="ftr__bottom__right">
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <span className="ftr__status__circle"/>
              <span className="ftr__status__txt">All systems online</span>
            </div>
            <button className="ftr__back__top" onClick={() => window.scrollTo({ top:0, behavior:"smooth" })} title="Back to top">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Root Export ─────────────────────────────────────────────────────── */
export default function Footer() {
  const width    = useW();
  const isXS     = width < 480;
  const isMobile = width < 640;

  const footerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(footerRef, 0.04);

  return (
    <div className="ftr__root" ref={footerRef} style={{ fontFamily: FB }}>
      <style>{SCOPED_CSS}</style>
      <PreFooterBar />
      <MainFooter isMobile={isMobile} inView={inView} isXS={isXS}/>
    </div>
  );
}