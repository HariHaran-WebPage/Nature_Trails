"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import NatureTrailsAuthModal from "./NatureTrailsAuthModal";

/* ─────────────── TYPES ─────────────── */
interface NavSubItem { label: string; sub: string; icon?: string; href?: string; }
interface NavItem { label: string; href?: string; hd?: string; hdSub?: string; items?: NavSubItem[]; }
interface SocialLink { name: string; color: string; path: string; }
interface DropdownProps { item: NavItem; }
interface MainNavProps { active: string; setActive: (label: string) => void; onMobileMenu: () => void; onAuth: (mode: "login"|"register") => void; }
interface MobileMenuProps { onClose: () => void; onAuth: (mode: "login"|"register") => void; onNavigate: (href: string) => void; }
interface MobileHeaderProps { onMenu: () => void; }

/* ─────────────── PALETTE ─────────────── */
const C = {
  gd:"#1A4D05", gm:"#2A6B08", gl:"#5EAF18", gli:"#7DC832",
  gxp:"#F4FAF0", gpd:"#e8f5d8", wh:"#FFFFFF", bg:"#F8FAF5",
  gr:"#2E3328", grl:"#6B7060", bdr:"#DDE5D4", bdr2:"#C8D8B8",
  gold:"#E8A020", warn:"#FF6B35",
};
const F = "'Plus Jakarta Sans','Segoe UI',sans-serif";

/* ─────────────── SEARCH DATA ─────────────── */
interface SearchCategory { category: string; icon: string; items: { label: string; sub: string; tag?: string; }[]; }

const SEARCH_DATA: SearchCategory[] = [
  {
    category: "Destinations",
    icon: "🏔️",
    items: [
      { label: "Ooty",        sub: "Tamil Nadu • 2,240m altitude",    tag: "Popular" },
      { label: "Kodaikanal",  sub: "Tamil Nadu • 2,133m altitude",    tag: "Trending" },
      { label: "Munnar",      sub: "Kerala • Tea Gardens",            tag: "Popular" },
      { label: "Coorg",       sub: "Karnataka • Coffee Estates"       },
    ],
  },
  {
    category: "Tour Packages",
    icon: "🎒",
    items: [
      { label: "Ooty Weekend Package",       sub: "2N/3D • From ₹8,999",   tag: "Hot Deal" },
      { label: "Sri Lanka Tour",             sub: "5N/6D • From ₹24,999",  tag: "Best Seller" },
      { label: "Kodaikanal Honeymoon",       sub: "3N/4D • From ₹12,999"   },
      { label: "Munnar Family Tour",         sub: "4N/5D • From ₹18,999"   },
      { label: "Hill Station Group Tour",    sub: "5N/6D • From ₹9,999/pp" },
    ],
  },
  {
    category: "Taxi Services",
    icon: "🚗",
    items: [
      { label: "Coimbatore → Ooty",         sub: "Airport / City • ₹999 flat",  tag: "Fast Booking" },
      { label: "Coimbatore → Kodaikanal",   sub: "4–5 hrs • Sedan / SUV"        },
      { label: "Coimbatore → Munnar",       sub: "4–5 hrs • Sedan / SUV"        },
      { label: "Airport Transfer",           sub: "CBE Airport • Any time"       },
    ],
  },
];

const QUICK_TAGS = ["🏔️ Ooty", "🌸 Kodaikanal", "🌴 Sri Lanka", "✈️ Airport Taxi", "👨‍👩‍👧‍👦 Family Tour"];

/* ─────────────── NAV DATA ─────────────── */
const NAV: NavItem[] = [
  { label: "Home",          href: "/" },
  { label: "Destinations",  href: "/destinations",
    hd: "Our Destinations", hdSub: "Handpicked hill stations across South India",
    items: [
      { label: "Ooty",       sub: "The Queen of Hill Stations, Tamil Nadu", icon: "🏔️", href: "/destinations/ooty" },
      { label: "Kodaikanal", sub: "Princess of Hill Stations, Tamil Nadu",  icon: "🌸", href: "/destinations/kodaikanal" },
      { label: "Munnar",     sub: "Tea Gardens & Misty Valleys, Kerala",    icon: "🍃", href: "/destinations/munnar" },
    ],
  },
  { label: "Tour Packages", href: "/tour-packages",
    hd: "Tour Packages", hdSub: "Curated domestic & international experiences",
    items: [
      { label: "Hill Station Tours",  sub: "Ooty · Kodaikanal · Munnar packages",  icon: "⛰️", href: "/tour-packages/hill-stations" },
      { label: "Sri Lanka Tours",     sub: "5 Nights / 6 Days curated itinerary",  icon: "🌴", href: "/tour-packages/sri-lanka" },
      { label: "Family Packages",     sub: "Comfortable & safe for all ages",      icon: "👨‍👩‍👧‍👦", href: "/tour-packages/family" },
      { label: "Honeymoon Packages",  sub: "Romantic escapes & private retreats",  icon: "💑", href: "/tour-packages/honeymoon" },
      { label: "Group Tours",         sub: "Corporate & leisure group getaways",   icon: "🎒", href: "/tour-packages/group" },
    ],
  },
  { label: "Taxi Services", href: "/taxi-services",
    hd: "Taxi & Transport", hdSub: "Reliable, comfortable, on-time",
    items: [
      { label: "Airport Transfers", sub: "Coimbatore International Airport",       icon: "✈️", href: "/taxi-services/airport" },
      { label: "Outstation Taxi",   sub: "Ooty · Munnar · Kodaikanal", icon: "🚗", href: "/taxi-services/outstation" },
      { label: "Corporate Travel",  sub: "Professional fleet for business needs",  icon: "💼", href: "/taxi-services/corporate" },
    ],
  },
  { label: "About Us", href: "/about-us" },
  { label: "Contact",  href: "/contact" },
];

const SOCIAL: SocialLink[] = [
  { name: "Facebook",  color: "#1877F2", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "Instagram", color: "#E1306C", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
  { name: "WhatsApp",  color: "#25D366", path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" },
  { name: "YouTube",   color: "#FF0000", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
];

const OFFERS = [
  { emoji: "🎉", label: "Summer Special:", desc: "20% off on all Hill Station packages — Limited seats!" },
  { emoji: "✈️", label: "Sri Lanka Tours:", desc: "5N/6D from ₹24,999 per person — Book now!" },
  { emoji: "🏔️", label: "Ooty Package:",   desc: "3N/4D couple special at ₹12,999 — Hurry!" },
  { emoji: "🚗", label: "Airport Taxi:",   desc: "Flat ₹999 Coimbatore Airport to Ooty — Any time!" },
  { emoji: "🌸", label: "Kodaikanal:",     desc: "Honeymoon package with lake view stay — Limited rooms!" },
  { emoji: "🏆", label: "10+ Years",       desc: "of trusted travel — 8,500+ happy travellers served!" },
];

/* ─────────────── SCOPED CSS (single quotes) ─────────────── */
const SCOPED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700;1,800&display=swap');
  .nt__root *, .nt__root *::before, .nt__root *::after { box-sizing:border-box; margin:0; padding:0; }
  .nt__root a { text-decoration:none; }
  .nt__root button { cursor:pointer; font-family:${F}; }

  /* ── Strip ── */
  .nt__strip { background:${C.gd}; height:36px; display:flex; align-items:center; position:relative; overflow:hidden; border-bottom:1px solid rgba(255,255,255,.08); }
  .nt__strip__badge { position:relative; z-index:2; flex-shrink:0; background:${C.gold}; color:#fff; font-family:${F}; font-size:9px; font-weight:800; letter-spacing:.12em; padding:4px 12px; text-transform:uppercase; white-space:nowrap; height:100%; display:flex; align-items:center; box-shadow:4px 0 12px rgba(0,0,0,.20); }
  .nt__strip__track { flex:1; overflow:hidden; display:flex; align-items:center; -webkit-mask-image:linear-gradient(to right,transparent 0%,black 4%,black 96%,transparent 100%); mask-image:linear-gradient(to right,transparent 0%,black 4%,black 96%,transparent 100%); }
  .nt__strip__inner { display:flex; align-items:center; animation:nt__marquee 28s linear infinite; white-space:nowrap; }
  .nt__strip__inner:hover { animation-play-state:paused; }
  @keyframes nt__marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  .nt__strip__item { display:inline-flex; align-items:center; gap:8px; padding:0 40px; font-family:${F}; font-size:12px; color:rgba(255,255,255,.88); font-weight:500; border-right:1px solid rgba(255,255,255,.12); }
  .nt__strip__item strong { color:#fff; font-weight:700; }
  .nt__strip__item__dot { width:5px; height:5px; border-radius:50%; background:${C.gli}; flex-shrink:0; box-shadow:0 0 6px ${C.gli}; }
  .nt__strip__cta { position:relative; z-index:2; flex-shrink:0; background:rgba(255,255,255,.14); border:none; border-left:1px solid rgba(255,255,255,.12); color:#fff; font-family:${F}; font-size:11px; font-weight:700; padding:0 18px; height:100%; cursor:pointer; letter-spacing:.05em; text-transform:uppercase; transition:background .15s; white-space:nowrap; }
  .nt__strip__cta:hover { background:rgba(255,255,255,.24); }

  /* ── Main Nav ── */
  .nt__mainnav { background:${C.wh}; position:sticky; top:0; z-index:600; box-shadow:0 1px 0 ${C.bdr},0 6px 24px rgba(15,30,8,.08); }
  .nt__mainnav__inner { display:flex; align-items:center; padding:0 48px; height:56px; gap:0; }
  .nt__mainnav__accent { height:3px; background:linear-gradient(90deg,${C.gd} 0%,${C.gl} 35%,${C.gli} 65%,${C.gd} 100%); background-size:200% 100%; animation:nt__accentShift 6s ease-in-out infinite alternate; }
  @keyframes nt__accentShift { from{background-position:0% 0} to{background-position:100% 0} }

  .nt__logo { display:flex; align-items:center; gap:10px; cursor:pointer; user-select:none; flex-shrink:0; }
  .nt__logo__wordmark { display:flex; flex-direction:column; gap:1px; }
  .nt__logo__name { font-family:${F}; font-style:italic; font-weight:800; font-size:18px; color:${C.gd}; line-height:1; letter-spacing:-.02em; }
  .nt__logo__sub  { font-family:${F}; font-size:7px; color:${C.grl}; letter-spacing:.14em; text-transform:uppercase; }

  /* ── Inline Search ── */
  .nt__navsearch { flex:1; max-width:380px; margin:0 20px; position:relative; }
  .nt__navsearch__row { display:flex; align-items:center; border:1.5px solid ${C.bdr2}; border-radius:7px; height:38px; background:${C.bg}; transition:border-color .16s,box-shadow .16s,background .16s; overflow:hidden; }
  .nt__navsearch__row--focus { border-color:${C.gm}; box-shadow:0 0 0 3px rgba(94,175,24,.12); background:${C.wh}; }
  .nt__navsearch__icon { padding:0 10px 0 12px; display:flex; align-items:center; flex-shrink:0; }
  .nt__navsearch__input { flex:1; border:none; outline:none; font-family:${F}; font-size:12.5px; color:${C.gr}; background:transparent; }
  .nt__navsearch__input::placeholder { color:${C.grl}; }
  .nt__navsearch__clear { padding:0 8px; background:none; border:none; cursor:pointer; color:${C.grl}; display:flex; align-items:center; }
  .nt__navsearch__btn { height:100%; padding:0 16px; background:${C.gd}; color:#fff; border:none; font-family:${F}; font-size:11px; font-weight:700; letter-spacing:.06em; cursor:pointer; flex-shrink:0; transition:background .13s; }
  .nt__navsearch__btn:hover { background:${C.gm}; }

  /* ── Search Dropdown ── */
  .nt__sdrop { position:absolute; top:calc(100% + 8px); left:0; right:0; background:${C.wh}; border:1px solid ${C.bdr}; border-top:3px solid ${C.gm}; border-radius:12px; box-shadow:0 28px 80px rgba(15,30,8,.18),0 6px 20px rgba(15,30,8,.10); z-index:99999; overflow:hidden; animation:nt__dropIn .2s cubic-bezier(.34,1.56,.64,1); min-width:520px; }
  @keyframes nt__dropIn { from{opacity:0;transform:translateY(-8px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }

  .nt__sdrop__tags { display:flex; align-items:center; gap:6px; padding:10px 14px 8px; flex-wrap:wrap; border-bottom:1px solid ${C.bdr}; background:${C.gxp}; }
  .nt__sdrop__tags__label { font-family:${F}; font-size:9.5px; font-weight:700; color:${C.grl}; letter-spacing:.10em; text-transform:uppercase; margin-right:2px; flex-shrink:0; }
  .nt__sdrop__tag { font-family:${F}; font-size:11px; font-weight:600; color:${C.gm}; background:${C.wh}; border:1.5px solid ${C.bdr2}; border-radius:20px; padding:3px 10px; cursor:pointer; transition:all .13s; white-space:nowrap; }
  .nt__sdrop__tag:hover { background:${C.gm}; color:#fff; border-color:${C.gm}; transform:translateY(-1px); }

  .nt__sdrop__body { max-height:360px; overflow-y:auto; }
  .nt__sdrop__body::-webkit-scrollbar { width:4px; }
  .nt__sdrop__body::-webkit-scrollbar-thumb { background:${C.bdr2}; border-radius:4px; }
  .nt__sdrop__cat { padding:8px 14px 4px; display:flex; align-items:center; gap:6px; }
  .nt__sdrop__cat__icon { font-size:12px; }
  .nt__sdrop__cat__label { font-family:${F}; font-size:9.5px; font-weight:800; color:${C.gm}; letter-spacing:.12em; text-transform:uppercase; }
  .nt__sdrop__item { display:flex; align-items:center; gap:10px; padding:9px 14px; cursor:pointer; border-left:3px solid transparent; transition:all .11s; }
  .nt__sdrop__item:hover { background:${C.gxp}; border-left-color:${C.gm}; }
  .nt__sdrop__item__icon { width:32px; height:32px; border-radius:8px; background:${C.gxp}; border:1px solid ${C.bdr2}; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; }
  .nt__sdrop__item__label { font-family:${F}; font-size:13px; font-weight:600; color:${C.gr}; }
  .nt__sdrop__item:hover .nt__sdrop__item__label { color:${C.gd}; }
  .nt__sdrop__item__sub { font-family:${F}; font-size:11px; color:${C.grl}; margin-top:1px; }
  .nt__sdrop__item__tag { margin-left:auto; font-family:${F}; font-size:9px; font-weight:700; padding:2px 7px; border-radius:10px; background:rgba(232,160,32,.12); color:${C.gold}; border:1px solid rgba(232,160,32,.25); white-space:nowrap; flex-shrink:0; }
  .nt__sdrop__item__go { margin-left:auto; opacity:0; transition:opacity .11s,transform .11s; }
  .nt__sdrop__item:hover .nt__sdrop__item__go { opacity:1; transform:translateX(3px); }
  .nt__sdrop__divider { height:1px; background:${C.bdr}; margin:4px 0; }
  .nt__sdrop__footer { padding:10px 14px; border-top:1px solid ${C.bdr}; background:${C.gxp}; display:flex; align-items:center; justify-content:space-between; }
  .nt__sdrop__footer__tip { font-family:${F}; font-size:10px; color:${C.grl}; }
  .nt__sdrop__footer__tip kbd { background:${C.wh}; border:1px solid ${C.bdr2}; border-radius:3px; padding:1px 5px; font-size:9px; }
  .nt__sdrop__footer__link { font-family:${F}; font-size:11px; font-weight:700; color:${C.gm}; display:flex; align-items:center; gap:4px; }
  .nt__sdrop__item__label mark { background:rgba(94,175,24,.18); color:${C.gd}; border-radius:2px; padding:0 1px; font-style:normal; }
  .nt__sdrop__empty { padding:24px 14px; text-align:center; }
  .nt__sdrop__empty__emoji { font-size:28px; display:block; margin-bottom:8px; }
  .nt__sdrop__empty__text { font-family:${F}; font-size:13px; color:${C.grl}; }

  /* ── Nav links ── */
  .nt__navlinks { display:flex; align-items:stretch; height:56px; }
  .nt__navitem  { position:relative; flex-shrink:0; }
  .nt__navbtn { display:flex; align-items:center; gap:4px; padding:0 12px; height:56px; background:none; border:none; cursor:pointer; font-family:${F}; font-weight:500; font-size:13px; white-space:nowrap; color:${C.gr}; position:relative; transition:color .13s; text-decoration:none; }
  .nt__navbtn:hover { color:${C.gd}; }
  .nt__navbtn--active { font-weight:700; color:${C.gd}; }
  .nt__navbtn__bar { position:absolute; bottom:0; left:50%; right:50%; height:3px; background:linear-gradient(90deg,${C.gm},${C.gl}); border-radius:3px 3px 0 0; transition:all .22s cubic-bezier(.34,1.56,.64,1); }
  .nt__navbtn--active .nt__navbtn__bar, .nt__navbtn:hover .nt__navbtn__bar { left:10px; right:10px; }
  .nt__navbtn__caret { transition:transform .18s; }
  .nt__navbtn__caret--open { transform:rotate(180deg); }

  /* ── Nav Dropdown ── */
  .nt__dropdown { position:absolute; top:calc(100% + 1px); left:50%; transform:translateX(-50%); min-width:320px; background:${C.wh}; border-radius:10px; box-shadow:0 24px 60px rgba(15,30,8,.16),0 4px 16px rgba(15,30,8,.08); border:1px solid ${C.bdr}; border-top:3px solid ${C.gm}; z-index:700; overflow:hidden; animation:nt__dropIn .2s cubic-bezier(.34,1.56,.64,1); }
  .nt__dropdown__hd { padding:12px 18px 9px; border-bottom:1px solid ${C.bdr}; background:${C.gxp}; }
  .nt__dropdown__hd__label { font-family:${F}; font-size:10px; font-weight:800; color:${C.gm}; letter-spacing:.12em; text-transform:uppercase; }
  .nt__dropdown__hd__sub   { font-family:${F}; font-size:11.5px; color:${C.grl}; margin-top:2px; }
  .nt__dropdown__body { padding:4px 0; }
  .nt__dropdown__item { display:flex; align-items:center; gap:10px; padding:10px 18px; text-decoration:none; border-left:3px solid transparent; background:transparent; transition:all .12s; }
  .nt__dropdown__item:hover { background:${C.gxp}; border-left-color:${C.gm}; }
  .nt__dropdown__item__icon  { font-size:16px; flex-shrink:0; line-height:1; }
  .nt__dropdown__item__label { font-family:${F}; font-size:13px; font-weight:700; color:${C.gr}; }
  .nt__dropdown__item:hover .nt__dropdown__item__label { color:${C.gd}; }
  .nt__dropdown__item__sub   { font-family:${F}; font-size:11px; color:${C.grl}; margin-top:1px; }
  .nt__dropdown__item__arrow { margin-left:auto; opacity:0; transition:opacity .12s,transform .12s; }
  .nt__dropdown__item:hover .nt__dropdown__item__arrow { opacity:1; transform:translateX(3px); }
  .nt__dropdown__footer { padding:8px 18px; border-top:1px solid ${C.bdr}; background:${C.gxp}; }
  .nt__dropdown__footer a { font-family:${F}; font-size:11px; font-weight:700; color:${C.gm}; display:flex; align-items:center; gap:5px; transition:gap .13s; text-decoration:none; }
  .nt__dropdown__footer a:hover { gap:8px; }

  /* ── Nav CTA ── */
  .nt__navcta { display:flex; align-items:center; gap:8px; flex-shrink:0; margin-left:auto; }
  .nt__navcta__divider { width:1px; height:16px; background:${C.bdr2}; }
  .nt__navcta__phone { display:flex; align-items:center; gap:5px; font-family:${F}; font-size:11.5px; color:${C.grl}; text-decoration:none; font-weight:600; transition:color .14s; white-space:nowrap; }
  .nt__navcta__phone:hover { color:${C.gd}; }
  .nt__navcta__social { display:flex; align-items:center; gap:3px; }
  .nt__navcta__social__btn { width:24px; height:24px; border-radius:5px; display:flex; align-items:center; justify-content:center; border:1px solid ${C.bdr2}; text-decoration:none; transition:all .16s; background:transparent; }
  .nt__navcta__social__btn:hover { transform:translateY(-2px); border-color:${C.gm}; background:${C.gxp}; }
  .nt__navcta__login { background:transparent; border:1.5px solid ${C.bdr2}; color:${C.gr}; font-family:${F}; font-size:11.5px; font-weight:600; padding:7px 14px; border-radius:6px; cursor:pointer; transition:all .14s; white-space:nowrap; }
  .nt__navcta__login:hover { border-color:${C.gm}; color:${C.gd}; background:${C.gxp}; }
  .nt__navcta__quote { background:linear-gradient(135deg,${C.gd} 0%,${C.gm} 100%); color:#fff; border:none; font-family:${F}; font-size:11.5px; font-weight:700; padding:8px 16px; border-radius:6px; cursor:pointer; letter-spacing:.04em; transition:all .14s; box-shadow:0 4px 14px rgba(26,77,5,.28); white-space:nowrap; }
  .nt__navcta__quote:hover { opacity:.88; transform:translateY(-1px); }

  .nt__hamburger { display:none; background:none; border:1.5px solid ${C.bdr2}; border-radius:6px; width:38px; height:38px; align-items:center; justify-content:center; margin-left:8px; flex-shrink:0; transition:all .14s; }
  .nt__hamburger:hover { border-color:${C.gm}; background:${C.gxp}; }

  /* ── Mobile Header ── */
  .nt__mobilehdr { display:none; background:${C.wh}; padding:10px 16px; align-items:center; justify-content:space-between; border-bottom:2px solid ${C.gm}; box-shadow:0 2px 12px rgba(15,30,8,.08); position:sticky; top:0; z-index:900; }
  .nt__mobilehdr__logo { display:flex; align-items:center; gap:8px; }
  .nt__mobilehdr__name { font-family:${F}; font-style:italic; font-weight:800; font-size:16px; color:${C.gd}; line-height:1; }
  .nt__mobilehdr__sub  { font-family:${F}; font-size:7px; color:${C.grl}; margin-top:2px; letter-spacing:.10em; text-transform:uppercase; }
  .nt__mobilehdr__right { display:flex; align-items:center; gap:8px; }
  .nt__mobilehdr__call { background:${C.gxp}; border:1.5px solid ${C.bdr2}; border-radius:6px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; text-decoration:none; transition:all .14s; }
  .nt__mobilehdr__btn { background:linear-gradient(135deg,${C.gd},${C.gm}); border:none; border-radius:6px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(26,77,5,.25); }

  /* ── Mobile overlay ── */
  .nt__mobileoverlay { position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; }
  .nt__mobileoverlay__backdrop { position:absolute; inset:0; background:rgba(15,30,8,.60); backdrop-filter:blur(6px); }
  .nt__mobilepanel { position:relative; width:100%; max-width:360px; background:${C.wh}; height:100%; overflow-y:auto; box-shadow:6px 0 40px rgba(15,30,8,.22); display:flex; flex-direction:column; animation:nt__slideIn .25s cubic-bezier(.34,1.2,.64,1); }
  @keyframes nt__slideIn { from{transform:translateX(-100%);opacity:0} to{transform:translateX(0);opacity:1} }
  .nt__mobilepanel__hdr { background:linear-gradient(135deg,${C.gd} 0%,#1e5c06 100%); padding:16px 18px; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; position:relative; overflow:hidden; }
  .nt__mobilepanel__hdr::after { content:''; position:absolute; right:-30px; bottom:-30px; width:120px; height:120px; border-radius:50%; background:rgba(255,255,255,.05); }
  .nt__mobilepanel__hdrlogo { display:flex; align-items:center; gap:10px; }
  .nt__mobilepanel__hdrname { font-family:${F}; font-style:italic; font-weight:800; font-size:17px; color:#fff; line-height:1; }
  .nt__mobilepanel__hdrsub  { font-family:${F}; font-size:8px; color:rgba(255,255,255,.55); margin-top:2px; letter-spacing:.10em; text-transform:uppercase; }
  .nt__mobilepanel__closebtn { background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.2); border-radius:6px; width:30px; height:30px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .14s; position:relative; z-index:1; }
  .nt__mobilepanel__closebtn:hover { background:rgba(255,255,255,.28); }

  .nt__mobilepanel__quickbar { display:grid; grid-template-columns:1fr 1fr; gap:1px; background:${C.bdr}; border-bottom:1px solid ${C.bdr}; flex-shrink:0; }
  .nt__mobilepanel__quickitem { background:${C.wh}; padding:11px 14px; display:flex; align-items:center; gap:8px; cursor:pointer; transition:background .12s; text-decoration:none; }
  .nt__mobilepanel__quickitem:hover { background:${C.gxp}; }
  .nt__mobilepanel__quickitem__emoji { font-size:17px; }
  .nt__mobilepanel__quickitem__label { font-family:${F}; font-size:11px; font-weight:700; color:${C.gd}; }
  .nt__mobilepanel__quickitem__sub   { font-family:${F}; font-size:9.5px; color:${C.grl}; margin-top:1px; }

  .nt__mobilepanel__search { padding:12px 14px; border-bottom:1px solid ${C.bdr}; background:${C.gxp}; }
  .nt__mobilepanel__searchrow { display:flex; align-items:center; border:1.5px solid ${C.bdr2}; border-radius:6px; height:40px; background:${C.wh}; overflow:hidden; }
  .nt__mobilepanel__searchicon { padding:0 8px 0 12px; }
  .nt__mobilepanel__searchfield { flex:1; border:none; outline:none; font-family:${F}; font-size:13px; color:${C.gr}; background:transparent; }
  .nt__mobilepanel__searchbtn  { height:100%; padding:0 16px; background:linear-gradient(135deg,${C.gd},${C.gm}); color:#fff; border:none; font-family:${F}; font-size:11px; font-weight:700; cursor:pointer; }

  .nt__mobilepanel__nav { flex:1; padding:4px 0; }
  .nt__mobilenav__item { display:flex; align-items:center; justify-content:space-between; padding:13px 18px; cursor:pointer; font-family:${F}; font-size:13.5px; font-weight:500; color:${C.gr}; border-bottom:1px solid ${C.bdr}; border-left:3px solid transparent; transition:all .12s; }
  .nt__mobilenav__item--open { background:${C.gxp}; border-left-color:${C.gm}; color:${C.gd}; font-weight:700; }
  .nt__mobilenav__item--active { color:${C.gd}; font-weight:700; border-left-color:${C.gm}; }
  .nt__mobilenav__caret { transition:transform .18s; flex-shrink:0; }
  .nt__mobilenav__caret--open { transform:rotate(180deg); }
  .nt__mobilenav__sub { background:#f7fcf3; border-bottom:1px solid ${C.bdr}; }
  .nt__mobilenav__subitem { display:flex; align-items:center; gap:10px; padding:11px 18px 11px 22px; text-decoration:none; border-bottom:1px solid rgba(221,229,212,.5); transition:background .12s; }
  .nt__mobilenav__subitem:hover { background:${C.gxp}; }
  .nt__mobilenav__subitem__emoji { font-size:15px; flex-shrink:0; }
  .nt__mobilenav__subitem__label { font-family:${F}; font-size:13px; font-weight:600; color:${C.gd}; }
  .nt__mobilenav__subitem__sub   { font-family:${F}; font-size:10.5px; color:${C.grl}; margin-top:1px; }

  .nt__mobilepanel__auth { padding:14px 18px; border-top:1px solid ${C.bdr}; display:grid; grid-template-columns:1fr 1fr; gap:10px; flex-shrink:0; }
  .nt__mobilepanel__auth__login    { background:transparent; border:1.5px solid ${C.gm}; color:${C.gm}; font-family:${F}; font-size:13px; font-weight:600; padding:10px; border-radius:6px; cursor:pointer; transition:background .14s; }
  .nt__mobilepanel__auth__login:hover { background:${C.gxp}; }
  .nt__mobilepanel__auth__register { background:linear-gradient(135deg,${C.gd},${C.gm}); color:#fff; border:none; font-family:${F}; font-size:13px; font-weight:700; padding:10px; border-radius:6px; cursor:pointer; box-shadow:0 3px 10px rgba(26,77,5,.25); }

  .nt__mobilepanel__social { padding:12px 18px 20px; border-top:1px solid ${C.bdr}; display:flex; align-items:center; gap:10px; flex-shrink:0; }
  .nt__mobilepanel__social__label { font-family:${F}; font-size:10px; color:${C.grl}; letter-spacing:.06em; text-transform:uppercase; margin-right:4px; font-weight:600; }
  .nt__mobilepanel__social__icon  { width:30px; height:30px; border-radius:6px; display:flex; align-items:center; justify-content:center; text-decoration:none; transition:transform .14s; }
  .nt__mobilepanel__social__icon:hover { transform:translateY(-2px); }

  /* ── Responsive ── */
  @media (max-width: 1023px) {
    .nt__strip     { height:32px; }
    .nt__mainnav   { display:none !important; }
    .nt__mobilehdr { display:flex !important; }
    .nt__hamburger { display:flex !important; }
  }
  @media (min-width: 1024px) {
    .nt__mobilehdr { display:none !important; }
  }
`;

/* ─────────────── HELPERS ─────────────── */
function highlight(text: string, query: string) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return <>{text.slice(0, idx)}<mark>{text.slice(idx, idx + query.length)}</mark>{text.slice(idx + query.length)}</>;
}

/* ─────────────── LOGO ─────────────── */
function LogoSVG({ size = 38 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      width={size}
      height={size}
      style={{ objectFit:"contain", display:"block", width:"auto", maxHeight:size }}
      alt="Nature Trails"
    />
  );
}

/* ─────────────── ANNOUNCEMENT STRIP ─────────────── */
function AnnouncementStrip() {
  const items = [...OFFERS, ...OFFERS];
  return (
    <div className="nt__strip">
      <span className="nt__strip__badge">🔥 Offers</span>
      <div className="nt__strip__track">
        <div className="nt__strip__inner">
          {items.map((o, i) => (
            <span key={i} className="nt__strip__item">
              <span className="nt__strip__item__dot"/>
              <span>{o.emoji} <strong>{o.label}</strong> {o.desc}</span>
            </span>
          ))}
        </div>
      </div>
      <button className="nt__strip__cta">Book Now →</button>
    </div>
  );
}

/* ─────────────── SEARCH DROPDOWN ─────────────── */
function SearchDropdown({ query, onSelect }: { query: string; onSelect: (val: string) => void }) {
  const filtered = SEARCH_DATA.map(cat => ({
    ...cat,
    items: cat.items.filter(it =>
      !query ||
      it.label.toLowerCase().includes(query.toLowerCase()) ||
      it.sub.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  const total = filtered.reduce((s, c) => s + c.items.length, 0);

  return (
    <div className="nt__sdrop">
      {!query && (
        <div className="nt__sdrop__tags">
          <span className="nt__sdrop__tags__label">Quick:</span>
          {QUICK_TAGS.map(tag => (
            <button key={tag} className="nt__sdrop__tag"
              onMouseDown={() => onSelect(tag.replace(/^[^\s]+ /, ""))}>
              {tag}
            </button>
          ))}
        </div>
      )}
      <div className="nt__sdrop__body">
        {total === 0 ? (
          <div className="nt__sdrop__empty">
            <span className="nt__sdrop__empty__emoji">🔍</span>
            {/* ✅ Fixed: replaced literal " with HTML entities */}
            <p className="nt__sdrop__empty__text">
              No results for &ldquo;<strong>{query}</strong>&rdquo;
              <br/>Try &ldquo;Ooty&rdquo;, &ldquo;Sri Lanka&rdquo; or &ldquo;Airport Taxi&rdquo;
            </p>
          </div>
        ) : (
          filtered.map((cat, ci) => (
            <div key={cat.category}>
              {ci > 0 && <div className="nt__sdrop__divider"/>}
              <div className="nt__sdrop__cat">
                <span className="nt__sdrop__cat__icon">{cat.icon}</span>
                <span className="nt__sdrop__cat__label">{cat.category}</span>
              </div>
              {cat.items.map(it => (
                <div key={it.label} className="nt__sdrop__item"
                  onMouseDown={() => onSelect(it.label)}>
                  <div className="nt__sdrop__item__icon">{cat.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="nt__sdrop__item__label">{highlight(it.label, query)}</div>
                    <div className="nt__sdrop__item__sub">{it.sub}</div>
                  </div>
                  {it.tag
                    ? <span className="nt__sdrop__item__tag">{it.tag}</span>
                    : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke={C.gm} strokeWidth="2.5" strokeLinecap="round"
                        className="nt__sdrop__item__go">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    )
                  }
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <div className="nt__sdrop__footer">
        <span className="nt__sdrop__footer__tip">
          Press <kbd>Enter</kbd> to search &nbsp;·&nbsp; <kbd>Esc</kbd> to close
        </span>
        <a href="#" className="nt__sdrop__footer__link">
          View all results
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.gm} strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ─────────────── INLINE NAV SEARCH ─────────────── */
function NavSearch() {
  const [query,   setQuery]   = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setFocused(false);
    };
    const kb = (e: KeyboardEvent) => { if (e.key === "Escape") setFocused(false); };
    document.addEventListener("mousedown", fn);
    document.addEventListener("keydown", kb);
    return () => { document.removeEventListener("mousedown", fn); document.removeEventListener("keydown", kb); };
  }, []);

  return (
    <div ref={wrapRef} className="nt__navsearch">
      <div className={`nt__navsearch__row${focused ? " nt__navsearch__row--focus" : ""}`}>
        <div className="nt__navsearch__icon">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={focused ? C.gm : C.grl} strokeWidth="2.2" strokeLinecap="round" style={{ transition:"stroke .15s" }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text" value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search destinations, packages…"
          className="nt__navsearch__input"
        />
        {query && (
          <button onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="nt__navsearch__clear">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.grl} strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        )}
        <button className="nt__navsearch__btn">Go</button>
      </div>
      {focused && (
        <SearchDropdown
          query={query}
          onSelect={(val) => { setQuery(val); setFocused(false); }}
        />
      )}
    </div>
  );
}

/* ─────────────── NAV DROPDOWN ─────────────── */
function Dropdown({ item }: DropdownProps) {
  const [hovItem, setHovItem] = useState<string | null>(null);
  if (!item.items) return null;
  return (
    <div className="nt__dropdown">
      <div className="nt__dropdown__hd">
        <div className="nt__dropdown__hd__label">{item.hd}</div>
        <div className="nt__dropdown__hd__sub">{item.hdSub}</div>
      </div>
      <div className="nt__dropdown__body">
        {item.items.map((it: NavSubItem) => (
          <Link
            key={it.label}
            href={it.href ?? "#"}
            onMouseEnter={() => setHovItem(it.label)}
            onMouseLeave={() => setHovItem(null)}
            className="nt__dropdown__item">
            {it.icon && <span className="nt__dropdown__item__icon">{it.icon}</span>}
            <div style={{ flex:1 }}>
              <div className="nt__dropdown__item__label">{it.label}</div>
              <div className="nt__dropdown__item__sub">{it.sub}</div>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke={hovItem === it.label ? C.gm : C.bdr2}
              strokeWidth="2.5" strokeLinecap="round" className="nt__dropdown__item__arrow">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </Link>
        ))}
      </div>
      <div className="nt__dropdown__footer">
        <Link href={item.items[0]?.href?.split("/").slice(0, -1).join("/") ?? "#"}>
          View all {item.label}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.gm} strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ─────────────── MOBILE MENU ─────────────── */
function MobileMenu({ onClose, onAuth, onNavigate }: MobileMenuProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <div className="nt__mobileoverlay">
      <div className="nt__mobileoverlay__backdrop" onClick={onClose}/>
      <div className="nt__mobilepanel">
        <div className="nt__mobilepanel__hdr">
          <div className="nt__mobilepanel__hdrlogo">
            <LogoSVG size={32}/>
            <div>
              <div className="nt__mobilepanel__hdrname">Nature Trails</div>
              <div className="nt__mobilepanel__hdrsub">Travel & Tourism</div>
            </div>
          </div>
          <button onClick={onClose} className="nt__mobilepanel__closebtn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="nt__mobilepanel__quickbar">
          <a href="tel:+919876543210" className="nt__mobilepanel__quickitem">
            <span className="nt__mobilepanel__quickitem__emoji">📞</span>
            <div><div className="nt__mobilepanel__quickitem__label">Call Us</div><div className="nt__mobilepanel__quickitem__sub">+91 98765 43210</div></div>
          </a>
          <a href="#" className="nt__mobilepanel__quickitem">
            <span className="nt__mobilepanel__quickitem__emoji">💬</span>
            <div><div className="nt__mobilepanel__quickitem__label">WhatsApp</div><div className="nt__mobilepanel__quickitem__sub">Chat with us</div></div>
          </a>
          <a href="#" className="nt__mobilepanel__quickitem">
            <span className="nt__mobilepanel__quickitem__emoji">📋</span>
            <div><div className="nt__mobilepanel__quickitem__label">Get Quote</div><div className="nt__mobilepanel__quickitem__sub">Free, instant</div></div>
          </a>
          <a href="#" className="nt__mobilepanel__quickitem">
            <span className="nt__mobilepanel__quickitem__emoji">📍</span>
            <div><div className="nt__mobilepanel__quickitem__label">Track Booking</div><div className="nt__mobilepanel__quickitem__sub">Live status</div></div>
          </a>
        </div>

        <div className="nt__mobilepanel__search">
          <div className="nt__mobilepanel__searchrow">
            <div className="nt__mobilepanel__searchicon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.grl} strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
            <input type="text" placeholder="Search destinations, packages…" className="nt__mobilepanel__searchfield"/>
            <button className="nt__mobilepanel__searchbtn">Go</button>
          </div>
        </div>

        <div className="nt__mobilepanel__nav">
          {NAV.map((item: NavItem) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.label}>
                <div
                  onClick={() => {
                    if (item.items) {
                      setOpenItem(openItem === item.label ? null : item.label);
                    } else if (item.href) {
                      onNavigate(item.href);
                    }
                  }}
                  className={[
                    "nt__mobilenav__item",
                    openItem === item.label ? "nt__mobilenav__item--open" : "",
                    isActive ? "nt__mobilenav__item--active" : "",
                  ].join(" ").trim()}>
                  <span>{item.label}</span>
                  {item.items && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.grl} strokeWidth="2.5" strokeLinecap="round"
                      className={`nt__mobilenav__caret${openItem === item.label ? " nt__mobilenav__caret--open" : ""}`}>
                      <path d="M19 9l-7 7-7-7"/>
                    </svg>
                  )}
                </div>
                {item.items && openItem === item.label && (
                  <div className="nt__mobilenav__sub">
                    {item.items.map((sub: NavSubItem) => (
                      <Link
                        key={sub.label}
                        href={sub.href ?? "#"}
                        className="nt__mobilenav__subitem"
                        onClick={onClose}>
                        {sub.icon && <span className="nt__mobilenav__subitem__emoji">{sub.icon}</span>}
                        <div>
                          <div className="nt__mobilenav__subitem__label">{sub.label}</div>
                          <div className="nt__mobilenav__subitem__sub">{sub.sub}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="nt__mobilepanel__auth">
          <button className="nt__mobilepanel__auth__login"
            onClick={() => { onAuth("login"); onClose(); }}>Login</button>
          <button className="nt__mobilepanel__auth__register"
            onClick={() => { onAuth("register"); onClose(); }}>Register Free</button>
        </div>

        <div className="nt__mobilepanel__social">
          <span className="nt__mobilepanel__social__label">Follow</span>
          {SOCIAL.map(s => (
            <a key={s.name} href="#" title={s.name}
              className="nt__mobilepanel__social__icon"
              style={{ background:s.color+"20", border:`1.5px solid ${s.color}40` }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill={s.color}><path d={s.path}/></svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── MAIN NAV ─────────────── */
function MainNav({ active, setActive, onMobileMenu, onAuth }: MainNavProps) {
  const [openDD, setOpenDD] = useState<string | null>(null);
  const navRef   = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDD(null);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={navRef} className="nt__mainnav">
      <div className="nt__mainnav__inner">
        <Link href="/" className="nt__logo">
          <LogoSVG size={38}/>
          <div className="nt__logo__wordmark">
            <div className="nt__logo__name">Nature Trails</div>
            <div className="nt__logo__sub">Travel & Tourism</div>
          </div>
        </Link>

        <NavSearch />

        <div className="nt__navlinks">
          {NAV.map((item: NavItem) => {
            const isA = pathname === item.href || active === item.label;
            const isO = openDD === item.label;
            return (
              <div key={item.label} className="nt__navitem"
                onMouseEnter={() => item.items ? setOpenDD(item.label) : undefined}
                onMouseLeave={() => item.items ? setOpenDD(null) : undefined}>
                {item.items ? (
                  <button
                    onClick={() => { setActive(item.label); setOpenDD(isO ? null : item.label); }}
                    className={`nt__navbtn${isA ? " nt__navbtn--active" : ""}`}>
                    {item.label}
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                      stroke={isO ? C.gm : C.grl} strokeWidth="2.5" strokeLinecap="round"
                      className={`nt__navbtn__caret${isO ? " nt__navbtn__caret--open" : ""}`}>
                      <path d="M19 9l-7 7-7-7"/>
                    </svg>
                    <span className="nt__navbtn__bar"/>
                  </button>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    onClick={() => setActive(item.label)}
                    className={`nt__navbtn${isA ? " nt__navbtn--active" : ""}`}>
                    {item.label}
                    <span className="nt__navbtn__bar"/>
                  </Link>
                )}
                {item.items && isO && <Dropdown item={item}/>}
              </div>
            );
          })}
        </div>

        <div className="nt__navcta">
          <a href="tel:+919876543210" className="nt__navcta__phone">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.gm} strokeWidth="2" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +91 98765 43210
          </a>
          <span className="nt__navcta__divider"/>
          <div className="nt__navcta__social">
            {SOCIAL.slice(0, 3).map(s => (
              <a key={s.name} href="#" title={s.name} className="nt__navcta__social__btn">
                <svg viewBox="0 0 24 24" width="10" height="10" fill={C.grl}><path d={s.path}/></svg>
              </a>
            ))}
          </div>
          <span className="nt__navcta__divider"/>
          <button className="nt__navcta__login" onClick={() => onAuth("login")}>Login</button>
          <button className="nt__navcta__quote" onClick={() => onAuth("register")}>Register Free</button>
        </div>

        <button onClick={onMobileMenu} className="nt__hamburger">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={C.gr} strokeWidth="2" strokeLinecap="round">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
      </div>
      <div className="nt__mainnav__accent"/>
    </div>
  );
}

/* ─────────────── MOBILE HEADER ─────────────── */
function MobileHeader({ onMenu }: MobileHeaderProps) {
  return (
    <div className="nt__mobilehdr">
      <Link href="/" className="nt__mobilehdr__logo">
        <LogoSVG size={30}/>
        <div>
          <div className="nt__mobilehdr__name">Nature Trails</div>
          <div className="nt__mobilehdr__sub">Travel & Tourism</div>
        </div>
      </Link>
      <div className="nt__mobilehdr__right">
        <a href="tel:+919876543210" className="nt__mobilehdr__call" title="Call us">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gm} strokeWidth="2" strokeLinecap="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 8 8l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </a>
        <button onClick={onMenu} className="nt__mobilehdr__btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────────── ROOT EXPORT ─────────────── */
export default function NatureTrailsNavbar() {
  const [active,     setActive]     = useState<string>("Home");
  const [showMobile, setShowMobile] = useState<boolean>(false);
  const [authMode,   setAuthMode]   = useState<"login"|"register"|null>(null);
  const router = useRouter();

  const handleNavigate = (href: string) => {
    setShowMobile(false);
    router.push(href);
  };

  return (
    <div className="nt__root" style={{ fontFamily: F }}>
      <style>{SCOPED_CSS}</style>

      <AnnouncementStrip />
      <MainNav
        active={active}
        setActive={setActive}
        onMobileMenu={() => setShowMobile(true)}
        onAuth={setAuthMode}
      />
      <MobileHeader onMenu={() => setShowMobile(true)} />

      {showMobile && (
        <MobileMenu
          onClose={() => setShowMobile(false)}
          onAuth={(m) => { setShowMobile(false); setAuthMode(m); }}
          onNavigate={handleNavigate}
        />
      )}

      {authMode && (
        <NatureTrailsAuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitch={(m) => setAuthMode(m)}
        />
      )}
    </div>
  );
}