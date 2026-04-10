"use client";
import { useState, useEffect, useRef, RefObject, ChangeEvent } from "react";
import Image from "next/image";

/* ─── Design Tokens ─────────────────────────────────────────────── */
const C = {
  gDeep:  "#0A2704",
  gDark:  "#163A07",
  gMid:   "#2A7010",
  gLeaf:  "#5DB520",
  gLight: "#89D43E",
  gPale:  "#B8EC7A",
  cream:  "#F2F7EC",
  gold:   "#D4A520",
  ember:  "#C45A1A",
};
const F  = "'Cormorant Garamond', Georgia, serif";
const FB = "'Outfit', 'Segoe UI', sans-serif";

/* ─── Types ──────────────────────────────────────────────────────── */
interface Author { name: string; role: string; color: string; av: string; }
interface Post {
  id: number; category: string; catColor: string; catText: string;
  accentColor: string; title: string; excerpt: string; tags: string[];
  img: string; author: Author; date: string; readTime: string;
  featured: boolean; type: string;
}
interface Topic  { icon: string; name: string; count: string; hot: boolean; }
interface FilterItem { label: string; value: string; icon: string; }

/* ─── Data ───────────────────────────────────────────────────────── */
const POSTS: Post[] = [
  {
    id:1, category:"Travel Guide", catColor:C.gLeaf, catText:"#fff",
    accentColor:C.gLight,
    title:"Best Time to Visit Ooty: A Month-by-Month Weather Guide",
    excerpt:"From misty monsoons to golden winters — we break down exactly when to go to the Queen of Hill Stations.",
    tags:["Ooty","Weather","Best Time"],
    img:"https://images.unsplash.com/photo-1582479253765-44e25ea4f56a?w=900&q=85&fit=crop",
    author:{name:"Priya Nair", role:"Travel Writer", color:"#C45A8E", av:"PN"},
    date:"Mar 12, 2025", readTime:"6 min", featured:true, type:"Guide",
  },
  {
    id:2, category:"Itinerary", catColor:"#E8971A", catText:"#fff",
    accentColor:"#E8971A",
    title:"Kodaikanal in 3 Days: The Perfect Weekend Itinerary",
    excerpt:"From Coaker's Walk at sunrise to Silver Cascade at dusk — our tried and tested 3-day plan.",
    tags:["Kodaikanal","Weekend","Planning"],
    img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&fit=crop",
    author:{name:"Arjun Menon", role:"Tour Guide", color:"#1A7AB8", av:"AM"},
    date:"Feb 28, 2025", readTime:"8 min", featured:false, type:"Itinerary",
  },
  {
    id:3, category:"Budget Travel", catColor:"#2A9BD4", catText:"#fff",
    accentColor:"#2A9BD4",
    title:"Munnar on ₹5,000: Budget Guide for 2 Nights in Kerala",
    excerpt:"Luxury doesn't have to break the bank in Kerala's tea country. Here's how to do it all under ₹5K.",
    tags:["Munnar","Budget","Kerala"],
    img:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=85&fit=crop",
    author:{name:"Kavitha Rao", role:"Budget Traveller", color:C.gMid, av:"KR"},
    date:"Feb 14, 2025", readTime:"7 min", featured:false, type:"Tips",
  },
  {
    id:4, category:"Adventure", catColor:"#E0427A", catText:"#fff",
    accentColor:"#E0427A",
    title:"Top 7 Adventure Activities in Coorg You Must Try",
    excerpt:"River rafting, cliff jumping and trekking through coffee estates — Coorg is South India's adventure capital.",
    tags:["Coorg","Trekking","Adventure"],
    img:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85&fit=crop",
    author:{name:"Rajan Pillai", role:"Adventure Guide", color:"#E0427A", av:"RP"},
    date:"Jan 30, 2025", readTime:"5 min", featured:false, type:"Adventure",
  },
  {
    id:5, category:"Honeymoon", catColor:"#B84C6E", catText:"#fff",
    accentColor:"#B84C6E",
    title:"Romantic Escapes: 5 Hidden Resorts in the Nilgiris",
    excerpt:"Skip the crowded hilltop hotels. Five stunning intimate resorts tucked into Nilgiri forests.",
    tags:["Honeymoon","Resorts","Romance"],
    img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85&fit=crop",
    author:{name:"Divya Sharma", role:"Lifestyle Writer", color:"#B84C6E", av:"DS"},
    date:"Jan 15, 2025", readTime:"6 min", featured:false, type:"Honeymoon",
  },
  {
    id:6, category:"Food & Culture", catColor:"#7C52E0", catText:"#fff",
    accentColor:"#9B7AE8",
    title:"What to Eat in Wayanad: A Local Food Trail Guide",
    excerpt:"From bamboo-steamed kanji to wild honey on jackfruit — Wayanad's tribal cuisine is a revelation.",
    tags:["Wayanad","Food","Culture"],
    img:"https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=900&q=85&fit=crop",
    author:{name:"Meena Krishnan", role:"Food Writer", color:"#7C52E0", av:"MK"},
    date:"Dec 28, 2024", readTime:"9 min", featured:false, type:"Culture",
  },
];

const FILTERS: FilterItem[] = [
  { label:"All",       value:"All",       icon:"✦"  },
  { label:"Guides",    value:"Guide",     icon:"🗺️" },
  { label:"Itinerary", value:"Itinerary", icon:"📅" },
  { label:"Tips",      value:"Tips",      icon:"💡" },
  { label:"Adventure", value:"Adventure", icon:"🧗" },
  { label:"Honeymoon", value:"Honeymoon", icon:"💑" },
  { label:"Culture",   value:"Culture",   icon:"🍃" },
];

const TOPICS: Topic[] = [
  { icon:"🏔️", name:"Ooty",       count:"12 articles", hot:true  },
  { icon:"🌿", name:"Kodaikanal", count:"9 articles",  hot:false },
  { icon:"🍃", name:"Munnar",     count:"11 articles", hot:true  },
  { icon:"☕", name:"Coorg",      count:"7 articles",  hot:false },
  { icon:"🌴", name:"Wayanad",    count:"6 articles",  hot:false },
  { icon:"✈️", name:"Sri Lanka",  count:"5 articles",  hot:true  },
];

const TICKER = [
  "🏔️ New: Ooty Summer Festival 2025 Package Launched",
  "🌿 Top 5 Monsoon Treks in Munnar Revealed",
  "💑 Exclusive Honeymoon Deals — Limited Time",
  "☕ Coorg Coffee Festival — Book Your Spot",
  "✈️ Sri Lanka Visa-Free Entry Extended to Oct 2025",
  "🎒 Group Tour Slots Open for May–June 2025",
];

/* ─── Hooks ──────────────────────────────────────────────────────── */
function useW() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.06) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref, threshold]);
  return v;
}

/* ─── CSS ────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@400;500;600;700;800&display=swap');

.b *, .b *::before, .b *::after { box-sizing:border-box; margin:0; padding:0; }
.b a { text-decoration:none; }
.b button { cursor:pointer; font-family:'Outfit',sans-serif; -webkit-tap-highlight-color:transparent; }
.b button:active { opacity:.82; }
.b img { display:block; }

/* Animations */
@keyframes b__up     { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
@keyframes b__fade   { from{opacity:0} to{opacity:1} }
@keyframes b__ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes b__shimmer{ 0%{background-position:200%} 100%{background-position:-200%} }
@keyframes b__pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.2;transform:scale(.5)} }
@keyframes b__spin   { to{transform:rotate(360deg)} }

/* ── TICKER ── */
.b__ticker { display:flex; align-items:center; height:40px; background:rgba(255,255,255,.05); border:1px solid rgba(93,181,32,.18); border-radius:40px; overflow:hidden; margin-bottom:40px; backdrop-filter:blur(12px); }
.b__ticker__badge { flex-shrink:0; background:${C.gLeaf}; color:${C.gDeep}; height:100%; padding:0 18px; display:flex; align-items:center; gap:6px; font-size:9px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; border-radius:40px 0 0 40px; }
.b__ticker__live { width:6px; height:6px; border-radius:50%; background:${C.gDeep}; animation:b__pulse 1.2s infinite; }
.b__ticker__track { overflow:hidden; flex:1; }
.b__ticker__inner { display:inline-flex; white-space:nowrap; animation:b__ticker 32s linear infinite; }
.b__ticker__item  { display:inline-flex; align-items:center; gap:10px; padding:0 32px; font-size:12px; font-weight:500; color:rgba(184,236,122,.72); }
.b__ticker__dot   { color:rgba(93,181,32,.30); font-size:16px; line-height:0; }

/* ── FILTERS ── */
.b__filters { display:flex; gap:6px; flex-wrap:wrap; }
@media(max-width:639px) { .b__filters { flex-wrap:nowrap; overflow-x:auto; scrollbar-width:none; padding-bottom:2px; } .b__filters::-webkit-scrollbar{display:none} }
.b__filter { display:inline-flex; align-items:center; gap:5px; padding:7px 14px; border-radius:30px; white-space:nowrap; flex-shrink:0; border:1.5px solid rgba(93,181,32,.20); background:rgba(255,255,255,.04); color:rgba(184,236,122,.65); font-size:12px; font-weight:600; letter-spacing:.02em; transition:all .20s cubic-bezier(.22,1,.36,1); }
.b__filter:hover { border-color:rgba(93,181,32,.40); background:rgba(93,181,32,.08); color:${C.gPale}; transform:translateY(-1px); }
.b__filter--on { border-color:${C.gLeaf}; background:${C.gLeaf}; color:${C.gDeep}; font-weight:700; box-shadow:0 6px 18px rgba(93,181,32,.34); }
.b__filter--on:hover { transform:translateY(-1px); }
.b__filter__n { font-size:9px; font-weight:700; padding:1px 6px; border-radius:10px; background:rgba(10,39,4,.28); }
.b__filter--on .b__filter__n { background:rgba(10,39,4,.22); color:${C.gDeep}; }
.b__filter:not(.b__filter--on) .b__filter__n { background:rgba(93,181,32,.12); color:rgba(155,210,95,.55); }

/* ── FEATURED CARD ── */
.b__feat { border-radius:24px; overflow:hidden; position:relative; border:1.5px solid rgba(93,181,32,.18); cursor:pointer; transition:all .40s cubic-bezier(.22,1,.36,1); }
.b__feat:hover { transform:translateY(-4px); box-shadow:0 30px 70px rgba(0,0,0,.55),0 0 0 1px rgba(93,181,32,.28); }
.b__feat__img { width:100%; object-fit:cover; transition:transform .80s cubic-bezier(.22,1,.36,1),filter .40s; transform:scale(1.04); filter:brightness(.50) saturate(1.2); }
.b__feat:hover .b__feat__img { transform:scale(1.10); filter:brightness(.38) saturate(1.35); }
.b__feat__grad { position:absolute; inset:0; background:linear-gradient(to top,rgba(4,12,2,.98) 0%,rgba(4,12,2,.50) 40%,rgba(93,181,32,.06) 100%); }
.b__feat__body { position:absolute; bottom:0; left:0; right:0; z-index:2; }
.b__feat__badge { display:inline-flex; align-items:center; gap:5px; background:${C.gLeaf}; color:${C.gDeep}; border-radius:20px; padding:4px 14px; font-size:9px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; margin-bottom:12px; box-shadow:0 4px 14px rgba(93,181,32,.50); }
.b__feat__cat { font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; margin-bottom:8px; }
.b__feat__title { font-family:'Cormorant Garamond',Georgia,serif; font-style:italic; font-weight:700; color:#fff; line-height:1.10; letter-spacing:-.01em; text-shadow:0 2px 20px rgba(0,0,0,.60); margin-bottom:12px; }
.b__feat__excerpt { font-size:13.5px; color:rgba(180,225,120,.56); line-height:1.80; margin-bottom:16px; }
.b__feat__meta { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.b__feat__btn { display:inline-flex; align-items:center; gap:7px; padding:10px 22px; border-radius:10px; border:none; background:linear-gradient(135deg,${C.gLeaf},${C.gMid}); color:${C.gDeep}; font-size:12.5px; font-weight:700; transition:all .20s; box-shadow:0 6px 18px rgba(93,181,32,.42); }
.b__feat__btn:hover { transform:translateY(-2px); box-shadow:0 12px 28px rgba(93,181,32,.58); }

/* ── BLOG CARD ── */
.b__card { display:flex; flex-direction:column; border-radius:20px; overflow:hidden; background:rgba(6,16,3,.92); border:1.5px solid rgba(255,255,255,.06); transition:all .38s cubic-bezier(.22,1,.36,1); cursor:pointer; }
.b__card:hover { border-color:rgba(93,181,32,.32); transform:translateY(-6px); box-shadow:0 22px 54px rgba(0,0,0,.50),0 0 0 1px rgba(93,181,32,.14); }
@media(hover:none) { .b__card:hover { transform:none; } }

/* Card photo */
.b__card__photo { position:relative; overflow:hidden; flex-shrink:0; }
.b__card__photo__img { position:absolute; inset:0; background-size:cover; background-position:center; transition:transform .70s cubic-bezier(.22,1,.36,1),filter .38s; transform:scale(1.04); filter:brightness(.82) saturate(1.12); }
.b__card:hover .b__card__photo__img { transform:scale(1.12); filter:brightness(.60) saturate(1.30); }
.b__card__photo__grad { position:absolute; inset:0; z-index:1; background:linear-gradient(to bottom,rgba(0,0,0,.04) 20%,rgba(6,16,3,.96) 100%); }
.b__card__toprow { position:absolute; top:12px; left:12px; right:12px; display:flex; justify-content:space-between; align-items:flex-start; z-index:4; }
.b__card__pill { borderRadius:20px; padding:4px 11px; font-size:9px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }
.b__card__save { width:30px; height:30px; border-radius:50%; background:rgba(0,0,0,.48); backdrop-filter:blur(8px); border:1.5px solid rgba(255,255,255,.14); display:flex; align-items:center; justify-content:center; transition:all .20s; }
.b__card__save:hover { background:rgba(93,181,32,.85); border-color:${C.gLeaf}; transform:scale(1.10); }
.b__card__save--on { background:rgba(93,181,32,.88); border-color:${C.gLeaf}; }

/* Card read-time strip */
.b__card__strip { position:absolute; bottom:10px; left:12px; z-index:4; display:flex; align-items:center; gap:6px; background:rgba(0,0,0,.52); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,.10); border-radius:20px; padding:3px 10px; font-size:10px; font-weight:600; color:rgba(200,240,140,.72); }

/* Card body */
.b__card__body { padding:16px 18px 18px; display:flex; flex-direction:column; gap:10px; flex:1; }
.b__card__cat  { font-size:9.5px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; filter:brightness(1.25); }
.b__card__title { font-family:'Cormorant Garamond',Georgia,serif; font-style:italic; font-weight:700; color:#fff; line-height:1.18; letter-spacing:-.01em; transition:color .20s; }
.b__card:hover .b__card__title { color:${C.gPale}; }
.b__card__excerpt { font-size:12px; color:rgba(178,225,120,.50); line-height:1.78; }
.b__card__tags { display:flex; gap:5px; flex-wrap:wrap; }
.b__card__tag  { font-size:9.5px; font-weight:600; color:rgba(165,220,100,.62); background:rgba(93,181,32,.08); border:1px solid rgba(93,181,32,.14); border-radius:6px; padding:2px 8px; }
.b__card__hr   { height:1px; background:linear-gradient(to right,transparent,rgba(93,181,32,.14),transparent); }
.b__card__foot { display:flex; align-items:center; justify-content:space-between; gap:8px; }
.b__card__av   { width:30px; height:30px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:10.5px; font-weight:800; color:#fff; border:1.5px solid rgba(255,255,255,.18); }
.b__card__anm  { font-size:12px; font-weight:700; color:#fff; }
.b__card__adt  { font-size:10px; color:rgba(155,210,95,.42); margin-top:1px; }
.b__card__readbtn { display:inline-flex; align-items:center; gap:5px; padding:7px 12px; border-radius:8px; font-size:11px; font-weight:700; color:${C.gLeaf}; background:rgba(93,181,32,.08); border:1px solid rgba(93,181,32,.18); transition:all .20s; flex-shrink:0; }
.b__card__readbtn:hover { background:${C.gLeaf}; color:${C.gDeep}; border-color:${C.gLeaf}; box-shadow:0 6px 18px rgba(93,181,32,.40); transform:translateY(-1px); }

/* ── GRID ── */
.b__grid { display:grid; gap:16px; }
@media(min-width:480px) { .b__grid { gap:18px; } }
@media(min-width:600px) { .b__grid { grid-template-columns:1fr 1fr; } }
@media(min-width:1024px){ .b__grid { grid-template-columns:repeat(3,1fr); gap:20px; } }

/* ── LAYOUT ── */
.b__layout { display:flex; flex-direction:column; gap:28px; }
@media(min-width:1024px) { .b__layout { display:grid; grid-template-columns:1fr 290px; gap:26px; align-items:start; } }

/* ── SIDEBAR ── */
.b__sidebar { border-radius:20px; overflow:hidden; border:1.5px solid rgba(93,181,32,.14); }
.b__sidebar__sect { background:rgba(6,16,3,.88); backdrop-filter:blur(18px); padding:20px; }
.b__sidebar__sect + .b__sidebar__sect { border-top:1px solid rgba(93,181,32,.10); }
.b__sidebar__hd { font-size:12px; font-weight:800; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:7px; }
.b__topic { display:flex; align-items:center; justify-content:space-between; padding:9px 0; border-bottom:1px solid rgba(93,181,32,.07); transition:all .18s; cursor:pointer; }
.b__topic:last-child { border-bottom:none; padding-bottom:0; }
.b__topic:hover .b__topic__nm { color:${C.gLeaf}; }
.b__topic:hover .b__topic__ar { opacity:1; transform:translateX(3px); }
.b__topic__nm  { font-size:12.5px; font-weight:600; color:rgba(195,235,145,.76); transition:color .18s; }
.b__topic__cnt { font-size:10px; color:rgba(145,200,90,.38); margin-top:1px; }
.b__topic__hot { font-size:9px; font-weight:700; background:rgba(212,165,32,.12); border:1px solid rgba(212,165,32,.22); color:${C.gold}; border-radius:20px; padding:2px 8px; }
.b__topic__ar  { opacity:0; transition:all .18s; color:rgba(93,181,32,.65); font-size:14px; }

/* ── SIDEBAR MINI NL ── */
.b__snl__input { width:100%; padding:10px 13px; border-radius:9px; border:1.5px solid rgba(93,181,32,.22); background:rgba(255,255,255,.05); color:#fff; font-family:'Outfit',sans-serif; font-size:12.5px; outline:none; transition:all .20s; margin-bottom:8px; }
.b__snl__input::placeholder { color:rgba(175,225,115,.28); }
.b__snl__input:focus { border-color:rgba(93,181,32,.55); background:rgba(255,255,255,.07); box-shadow:0 0 0 3px rgba(93,181,32,.10); }
.b__snl__btn { width:100%; padding:10px; border-radius:9px; border:none; background:linear-gradient(135deg,${C.gLeaf},${C.gMid}); color:${C.gDeep}; font-size:12px; font-weight:700; letter-spacing:.04em; box-shadow:0 8px 22px rgba(93,181,32,.38); transition:all .20s; }
.b__snl__btn:hover { transform:translateY(-2px); box-shadow:0 14px 32px rgba(93,181,32,.52); }

/* ── MOBILE TOPICS STRIP ── */
.b__mstrip { overflow-x:auto; scrollbar-width:none; }
.b__mstrip::-webkit-scrollbar { display:none; }
.b__mstrip__inner { display:flex; gap:10px; width:max-content; padding-bottom:4px; }
.b__mtopic { flex-shrink:0; border-radius:14px; background:rgba(6,16,3,.88); backdrop-filter:blur(14px); border:1px solid rgba(93,181,32,.14); padding:11px 14px; display:flex; align-items:center; gap:9px; cursor:pointer; transition:all .20s; }
.b__mtopic:hover { border-color:rgba(93,181,32,.36); background:rgba(93,181,32,.07); transform:translateY(-2px); }
.b__mtopic:active { transform:scale(.97); }
.b__mtopic__name { font-size:12px; font-weight:700; color:#fff; display:flex; align-items:center; gap:5px; }
.b__mtopic__cnt  { font-size:10px; color:rgba(145,205,88,.38); margin-top:2px; }
.b__mtopic__hot  { font-size:8.5px; font-weight:700; background:rgba(212,165,32,.12); border:1px solid rgba(212,165,32,.24); color:${C.gold}; border-radius:20px; padding:1.5px 6px; }

/* ── NEWSLETTER SECTION ── */
.b__nl { border-radius:22px; overflow:hidden; position:relative; }
.b__nl__bg { position:absolute; inset:0; background-size:cover; background-position:center; filter:brightness(.14) saturate(1.5); }
.b__nl__overlay { position:absolute; inset:0; background:linear-gradient(115deg,rgba(5,14,3,.96) 0%,rgba(18,52,7,.86) 100%); }
.b__nl__body { position:relative; z-index:2; }
.b__nl__input { padding:13px 16px; border-radius:11px; border:1.5px solid rgba(93,181,32,.24); background:rgba(255,255,255,.06); color:#fff; font-family:'Outfit',sans-serif; font-size:13.5px; outline:none; transition:all .20s; }
.b__nl__input::placeholder { color:rgba(178,228,118,.28); }
.b__nl__input:focus { border-color:rgba(93,181,32,.56); background:rgba(255,255,255,.09); box-shadow:0 0 0 3px rgba(93,181,32,.11); }
.b__nl__btn { padding:13px 28px; border-radius:11px; border:none; background:linear-gradient(135deg,${C.gLeaf},${C.gMid}); color:${C.gDeep}; font-size:13.5px; font-weight:700; display:flex; align-items:center; gap:8px; box-shadow:0 10px 28px rgba(93,181,32,.44); transition:all .22s; flex-shrink:0; }
.b__nl__btn:hover { transform:translateY(-3px); box-shadow:0 18px 44px rgba(93,181,32,.58); }
.b__nl__stat { display:flex; align-items:center; gap:12px; padding:12px 16px; border-radius:13px; background:rgba(93,181,32,.07); border:1px solid rgba(93,181,32,.13); }

/* ── VIEW ALL ── */
.b__viewall { transition:all .20s; }
.b__viewall:hover { background:rgba(93,181,32,.16)!important; transform:translateY(-2px)!important; box-shadow:0 10px 26px rgba(93,181,32,.26)!important; }

/* ── MOBILE IMPROVEMENTS ── */
@media(max-width:639px) {
  .b__feat__excerpt { display:none; }
  .b__card__excerpt { -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; display:-webkit-box; }
}
@media(max-width:479px) {
  .b__card__tags { display:none; }
}
`;

/* ─── Sub-components ─────────────────────────────────────────────── */

function Ticker() {
  const doubled = [...TICKER, ...TICKER];
  return (
    <div className="b__ticker">
      <div className="b__ticker__badge">
        <span className="b__ticker__live"/>
        Live
      </div>
      <div className="b__ticker__track">
        <div className="b__ticker__inner">
          {doubled.map((item, i) => (
            <span key={i} className="b__ticker__item">
              {item}
              <span className="b__ticker__dot">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:16 }}>
      <div style={{ height:1.5, width:22, borderRadius:2, background:`linear-gradient(to right,transparent,${C.gLeaf})` }}/>
      <span style={{ width:4, height:4, borderRadius:"50%", background:C.gLeaf, display:"block", animation:"b__pulse 2s infinite" }}/>
      <span style={{ fontFamily:FB, fontSize:10, fontWeight:700, color:C.gLeaf, letterSpacing:".22em", textTransform:"uppercase" }}>{children}</span>
      <span style={{ width:4, height:4, borderRadius:"50%", background:C.gLeaf, display:"block", animation:"b__pulse 2s .4s infinite" }}/>
      <div style={{ height:1.5, width:22, borderRadius:2, background:`linear-gradient(to left,transparent,${C.gLeaf})` }}/>
    </div>
  );
}

function AuthorChip({ author, date, readTime }: { author: { name:string; role:string; color:string; av:string }; date:string; readTime:string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0, background:`linear-gradient(135deg,${author.color},${author.color}88)`, border:"2px solid rgba(93,181,32,.35)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:FB, fontSize:10.5, fontWeight:800, color:"#fff" }}>
        {author.av}
      </div>
      <div>
        <div style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:"#fff" }}>{author.name}</div>
        <div style={{ fontFamily:FB, fontSize:9.5, color:"rgba(150,205,90,.45)", marginTop:1, display:"flex", alignItems:"center", gap:5 }}>
          {date}
          <span>·</span>
          <span style={{ display:"flex", alignItems:"center", gap:3 }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {readTime}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Featured Post ──────────────────────────────────────────────── */
function FeaturedPost({ post, isMobile }: { post: Post; isMobile: boolean }) {
  return (
    <div className="b__feat" style={{ boxShadow:"0 8px 48px rgba(0,0,0,.42)" }}>
      <div style={{ position:"relative", height: isMobile ? 260 : 500, overflow:"hidden" }}>
        <Image
          src={post.img}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 1320px"
          className="b__feat__img"
          style={{ objectFit:"cover" }}
          priority
        />
      </div>
      <div className="b__feat__grad"/>
      <div className="b__feat__body" style={{ padding: isMobile ? "20px 18px 22px" : "40px 44px 40px" }}>
        <div className="b__feat__badge">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
          Featured Story
        </div>
        <div className="b__feat__cat" style={{ color: post.accentColor }}>{post.category}</div>
        <div className="b__feat__title" style={{ fontSize: isMobile ? 22 : 38, maxWidth: isMobile ? "100%" : 680 }}>
          {post.title}
        </div>
        {!isMobile && (
          <div className="b__feat__excerpt" style={{ maxWidth: 620 }}>{post.excerpt}</div>
        )}
        <div className="b__feat__meta">
          <AuthorChip author={post.author} date={post.date} readTime={post.readTime}/>
          {!isMobile && (
            <button className="b__feat__btn" style={{ marginLeft:"auto" }}>
              Read Article
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          )}
        </div>
        {isMobile && (
          <button className="b__feat__btn" style={{ marginTop:14, width:"100%", justifyContent:"center", fontSize:13 }}>
            Read Article
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Blog Card ──────────────────────────────────────────────────── */
function BlogCard({ post, index, inView, isMobile }: { post: Post; index: number; inView: boolean; isMobile: boolean }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="b__card" style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(40px)",
      transition: `opacity .44s cubic-bezier(.22,1,.36,1) ${index * 75}ms, transform .44s cubic-bezier(.22,1,.36,1) ${index * 75}ms`,
    }}>
      {/* Photo */}
      <div className="b__card__photo" style={{ height: isMobile ? 180 : 210 }}>
        <div className="b__card__photo__img" style={{ backgroundImage:`url(${post.img})` }}/>
        <div className="b__card__photo__grad"/>
        <div className="b__card__toprow">
          <div className="b__card__pill" style={{ background:post.catColor, color:post.catText, boxShadow:`0 4px 12px ${post.catColor}44` }}>
            {post.category}
          </div>
          <button onClick={(e) => { e.stopPropagation(); setSaved(s => !s); }}
            className={`b__card__save${saved ? " b__card__save--on" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill={saved?"#fff":"none"} stroke={saved?"#fff":"rgba(255,255,255,.82)"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>
        {/* Read time strip */}
        <div className="b__card__strip">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {post.readTime} read
        </div>
      </div>

      {/* Body */}
      <div className="b__card__body">
        <div className="b__card__cat" style={{ color:post.accentColor }}>{post.category}</div>
        <div className="b__card__title" style={{ fontSize: isMobile ? 16 : 18 }}>{post.title}</div>
        <p className="b__card__excerpt">{post.excerpt}</p>
        <div className="b__card__tags">
          {post.tags.map((t, i) => <span key={i} className="b__card__tag">{t}</span>)}
        </div>
        <div className="b__card__hr"/>
        <div className="b__card__foot">
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div className="b__card__av" style={{ background:`linear-gradient(135deg,${post.author.color},${post.author.color}88)` }}>
              {post.author.av}
            </div>
            <div>
              <div className="b__card__anm">{post.author.name}</div>
              <div className="b__card__adt">{post.date}</div>
            </div>
          </div>
          <button className="b__card__readbtn">
            Read
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Topics Strip ────────────────────────────────────────── */
function MobileTopics() {
  return (
    <div className="b__mstrip">
      <div className="b__mstrip__inner">
        {TOPICS.map((t, i) => (
          <div key={i} className="b__mtopic">
            <span style={{ fontSize:20 }}>{t.icon}</span>
            <div>
              <div className="b__mtopic__name">
                {t.name}
                {t.hot && <span className="b__mtopic__hot">Hot</span>}
              </div>
              <div className="b__mtopic__cnt">{t.count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Sidebar ────────────────────────────────────────────────────── */
function Sidebar({ inView }: { inView: boolean }) {
  const [email, setEmail] = useState("");
  const [done,  setDone]  = useState(false);

  return (
    <div className="b__sidebar" style={{ opacity:inView?1:0, transform:inView?"none":"translateY(40px)", transition:"all .50s .22s cubic-bezier(.22,1,.36,1)" }}>
      {/* Popular Destinations */}
      <div className="b__sidebar__sect">
        <div className="b__sidebar__hd"><span style={{ fontSize:16 }}>🔥</span> Popular Destinations</div>
        {TOPICS.map((t, i) => (
          <div key={i} className="b__topic">
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:17 }}>{t.icon}</span>
              <div>
                <div className="b__topic__nm">{t.name}</div>
                <div className="b__topic__cnt">{t.count}</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              {t.hot && <span className="b__topic__hot">Hot</span>}
              <span className="b__topic__ar">›</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Newsletter */}
      <div className="b__sidebar__sect">
        <div className="b__sidebar__hd"><span style={{ fontSize:16 }}>📬</span> Weekly Travel Tips</div>
        <p style={{ fontFamily:FB, fontSize:11.5, color:"rgba(168,218,108,.52)", lineHeight:1.64, marginBottom:14 }}>
          Get the best hill station guides delivered every Monday.
        </p>
        {!done ? (
          <>
            <input type="email" placeholder="your@email.com" value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="b__snl__input"/>
            <button className="b__snl__btn" onClick={() => email && setDone(true)}>
              Subscribe Free
            </button>
          </>
        ) : (
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:10, background:"rgba(93,181,32,.10)", border:"1px solid rgba(93,181,32,.20)" }}>
            <span style={{ fontSize:20 }}>🎉</span>
            <div>
              <div style={{ fontFamily:FB, fontSize:12.5, fontWeight:700, color:"#fff" }}>You&apos;re subscribed!</div>
              <div style={{ fontFamily:FB, fontSize:10.5, color:"rgba(165,215,110,.55)", marginTop:2 }}>First issue lands Monday.</div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="b__sidebar__sect">
        <div className="b__sidebar__hd"><span style={{ fontSize:16 }}>⚡</span> Quick Book</div>
        {[
          { emoji:"🏔️", label:"Ooty 3N Package",   price:"₹8,999" },
          { emoji:"🌴", label:"Sri Lanka 5N Tour",  price:"₹24,999" },
          { emoji:"🚗", label:"Airport Taxi",       price:"₹999 flat" },
        ].map((item, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 0", borderBottom:i<2?"1px solid rgba(93,181,32,.07)":"none", cursor:"pointer" }}
            role="button">
            <div style={{ display:"flex", alignItems:"center", gap:9 }}>
              <span style={{ fontSize:16 }}>{item.emoji}</span>
              <span style={{ fontFamily:FB, fontSize:12.5, fontWeight:600, color:"rgba(190,232,142,.74)" }}>{item.label}</span>
            </div>
            <span style={{ fontFamily:FB, fontSize:11.5, fontWeight:700, color:C.gLeaf }}>{item.price}</span>
          </div>
        ))}
        <button style={{ marginTop:14, width:"100%", padding:"10px", borderRadius:10, border:"none", background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color:C.gDeep, fontFamily:FB, fontSize:12.5, fontWeight:700, cursor:"pointer", boxShadow:`0 6px 20px rgba(93,181,32,.36)`, transition:"all .20s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; }}>
          Get a Quote →
        </button>
      </div>
    </div>
  );
}

/* ─── Newsletter Banner ──────────────────────────────────────────── */
function Newsletter({ isMobile, isXS }: { isMobile: boolean; isXS: boolean }) {
  const [email, setEmail] = useState("");
  const [done,  setDone]  = useState(false);

  return (
    <div className="b__nl">
      <div className="b__nl__bg" style={{ backgroundImage:"url(https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1400&q=70&fit=crop)" }}/>
      <div className="b__nl__overlay"/>
      <div className="b__nl__body" style={{ padding: isXS?"28px 16px" : isMobile?"32px 22px" : "50px 56px" }}>
        <div style={{ display:"flex", flexDirection:isMobile?"column":"row", gap:32, alignItems:isMobile?"flex-start":"center", justifyContent:"space-between" }}>

          {/* Left */}
          <div style={{ flex:1 }}>
            {/* Label */}
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:12 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:C.gLeaf, display:"block", boxShadow:`0 0 0 3px rgba(93,181,32,.24)`, animation:"b__pulse 1.8s infinite" }}/>
              <span style={{ fontFamily:FB, fontSize:9.5, fontWeight:700, color:C.gLeaf, letterSpacing:".20em", textTransform:"uppercase" }}>Travel Newsletter</span>
            </div>

            <h3 style={{ fontFamily:F, fontStyle:"italic", fontSize:isXS?22:isMobile?24:30, fontWeight:700, color:"#fff", letterSpacing:"-.02em", lineHeight:1.14, marginBottom:10 }}>
              Never Miss a Hill Station Story
            </h3>
            <p style={{ fontFamily:FB, fontSize:isXS?12.5:13.5, color:"rgba(172,220,112,.56)", lineHeight:1.72, maxWidth:440, marginBottom:22 }}>
              Curated travel guides, itineraries, hidden gems and exclusive deals — every week in your inbox.
            </p>

            {!done ? (
              <>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  <input type="email" placeholder="Enter your email address" value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="b__nl__input" style={{ flex:1, minWidth:isMobile?"100%":200 }}/>
                  <button className="b__nl__btn" style={{ width:isMobile?"100%":"auto" }}
                    onClick={() => email && setDone(true)}>
                    Subscribe Free
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
                <div style={{ fontFamily:FB, fontSize:10.5, color:"rgba(155,210,90,.36)", marginTop:12 }}>
                  🔒 No spam · Unsubscribe anytime · 3,200+ readers
                </div>
              </>
            ) : (
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 20px", borderRadius:12, background:"rgba(93,181,32,.11)", border:"1px solid rgba(93,181,32,.22)", maxWidth:380 }}>
                <span style={{ fontSize:24 }}>🎉</span>
                <div>
                  <div style={{ fontFamily:F, fontStyle:"italic", fontSize:15, fontWeight:700, color:"#fff" }}>You&apos;re in!</div>
                  <div style={{ fontFamily:FB, fontSize:11.5, color:"rgba(168,215,110,.58)", marginTop:3 }}>First edition arrives Monday.</div>
                </div>
              </div>
            )}
          </div>

          {/* Right stats — desktop only */}
          {!isMobile && (
            <div style={{ flexShrink:0, display:"flex", flexDirection:"column", gap:12 }}>
              {[
                { val:"3,200+", label:"Subscribers",     icon:"👥" },
                { val:"52",     label:"Issues Published", icon:"📖" },
                { val:"4.8★",  label:"Reader Rating",    icon:"⭐" },
              ].map((s, i) => (
                <div key={i} className="b__nl__stat">
                  <span style={{ fontSize:22 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontFamily:F, fontStyle:"italic", fontSize:19, fontWeight:700, color:C.gLeaf, lineHeight:1 }}>{s.val}</div>
                    <div style={{ fontFamily:FB, fontSize:10.5, color:"rgba(155,210,90,.44)", marginTop:3 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile stats row */}
        {isMobile && (
          <div style={{ display:"flex", gap:10, marginTop:22, justifyContent:"space-between" }}>
            {[{ val:"3.2K+", label:"Readers" }, { val:"52", label:"Issues" }, { val:"4.8★", label:"Rating" }].map((s, i) => (
              <div key={i} style={{ flex:1, textAlign:"center", padding:"10px 8px", borderRadius:11, background:"rgba(93,181,32,.07)", border:"1px solid rgba(93,181,32,.12)" }}>
                <div style={{ fontFamily:F, fontStyle:"italic", fontSize:18, fontWeight:700, color:C.gLeaf }}>{s.val}</div>
                <div style={{ fontFamily:FB, fontSize:10, color:"rgba(150,205,88,.44)", marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── MAIN EXPORT ────────────────────────────────────────────────── */
export default function BlogSection() {
  const w       = useW();
  const isXS    = w < 480;
  const isMobile= w < 640;
  const isTablet= w >= 640 && w < 1024;

  const secRef  = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(secRef);
  const gridIn  = useInView(gridRef);

  const [filter, setFilter] = useState("All");

  const featured = POSTS.find(p => p.featured)!;
  const others   = POSTS.filter(p => !p.featured);
  const filtered = filter === "All" ? others : others.filter(p => p.type === filter);

  const px   = isXS ? "14px" : isMobile ? "16px" : isTablet ? "28px" : "52px";
  const pyT  = isXS ? "52px" : isMobile ? "60px" : "88px";
  const pyB  = isXS ? "60px" : isMobile ? "72px" : "104px";
  const h2   = isXS ? "28px" : isMobile ? "32px" : isTablet ? "42px" : "52px";

  return (
    <div className="b">
      <style>{CSS}</style>

      <section style={{ position:"relative", overflow:"hidden", fontFamily:FB }}>
        {/* Background */}
        <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:"url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=85&fit=crop)", backgroundSize:"cover", backgroundPosition:"center 35%", backgroundAttachment:isMobile?"scroll":"fixed", filter:"brightness(.14) saturate(1.45)" }}/>
        <div style={{ position:"absolute", inset:0, zIndex:2, pointerEvents:"none", background:`radial-gradient(ellipse 65% 50% at 6% 8%,rgba(42,112,16,.13) 0%,transparent 55%),radial-gradient(ellipse 55% 45% at 94% 90%,rgba(10,39,4,.18) 0%,transparent 55%),linear-gradient(180deg,rgba(3,9,2,.72) 0%,rgba(5,14,3,.22) 46%,rgba(3,8,2,.75) 100%)` }}/>
        {/* Dot grid texture */}
        <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none", opacity:.012, backgroundImage:`radial-gradient(circle,${C.gLeaf} 1px,transparent 1px)`, backgroundSize:"36px 36px" }}/>

        <div style={{ position:"relative", zIndex:10, maxWidth:1320, margin:"0 auto", padding:`${pyT} ${px} ${pyB}` }}>

          {/* ── Header section ── */}
          <div ref={secRef}>

            {/* Ticker */}
            <div style={{ animation:inView?"b__up .50s ease both":"none" }}><Ticker/></div>

            <div style={{ animation:inView?"b__up .54s .06s ease both":"none", marginBottom:isMobile?18:28 }}>
              <SectionLabel>Travel Blog</SectionLabel>

              <div style={{ display:"flex", flexDirection:isMobile?"column":"row", alignItems:isMobile?"flex-start":"flex-end", justifyContent:"space-between", gap:16, marginBottom:isMobile?18:24 }}>
                <div>
                  <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:h2, fontWeight:700, color:"#fff", margin:"0 0 12px", letterSpacing:"-.022em", lineHeight:1.06, textShadow:"0 4px 24px rgba(0,0,0,.55)" }}>
                    Stories from the{" "}
                    <span style={{ background:`linear-gradient(125deg,${C.gLeaf} 0%,${C.gPale} 48%,${C.gMid} 100%)`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"b__shimmer 4.5s linear infinite" }}>
                      Hills
                    </span>
                  </h2>
                  <p style={{ fontFamily:FB, fontSize:isXS?12.5:isMobile?13:14.5, color:"rgba(175,222,120,.58)", maxWidth:500, lineHeight:1.84, margin:0 }}>
                    Travel guides, hidden gems and real stories from the roads less travelled across South India&apos;s finest hill stations.
                  </p>
                </div>
                {!isMobile && (
                  <button className="b__viewall" style={{ fontFamily:FB, fontSize:12.5, fontWeight:700, flexShrink:0, padding:"11px 22px", borderRadius:11, border:"1.5px solid rgba(93,181,32,.28)", background:"rgba(93,181,32,.07)", color:C.gLeaf, letterSpacing:".04em", display:"flex", alignItems:"center", gap:7 }}>
                    View All Posts
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="b__filters">
                {FILTERS.map(f => {
                  const cnt = f.value === "All" ? others.length : others.filter(p => p.type === f.value).length;
                  if (cnt === 0 && f.value !== "All") return null;
                  return (
                    <button key={f.value} onClick={() => setFilter(f.value)}
                      className={`b__filter${filter === f.value ? " b__filter--on" : ""}`}>
                      <span style={{ fontSize:12 }}>{f.icon}</span>
                      {f.label}
                      <span className="b__filter__n">{cnt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Featured Post ── */}
          <div style={{ marginBottom:isMobile?24:38, animation:inView?"b__up .56s .12s ease both":"none" }}>
            <FeaturedPost post={featured} isMobile={isMobile}/>
          </div>

          {/* ── Mobile: Topics horizontal strip ── */}
          {isMobile && (
            <div style={{ marginBottom:24 }}>
              <div style={{ fontFamily:FB, fontSize:10.5, fontWeight:700, color:"rgba(158,210,95,.42)", letterSpacing:".14em", textTransform:"uppercase", marginBottom:10 }}>
                Popular Destinations
              </div>
              <MobileTopics/>
            </div>
          )}

          {/* ── Main 2-col layout ── */}
          <div ref={gridRef} className="b__layout">

            {/* Cards column */}
            <div>
              {filtered.length > 0 ? (
                <div className="b__grid">
                  {filtered.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} inView={gridIn} isMobile={isMobile}/>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign:"center", padding:"56px 24px", animation:"b__up .38s ease both" }}>
                  <div style={{ fontSize:44, marginBottom:14 }}>📖</div>
                  <div style={{ fontFamily:F, fontStyle:"italic", fontSize:19, fontWeight:700, color:"#fff", marginBottom:8 }}>No posts found</div>
                  <div style={{ fontFamily:FB, fontSize:13, color:"rgba(172,218,112,.48)", marginBottom:20 }}>Try a different filter.</div>
                  <button onClick={() => setFilter("All")} style={{ fontFamily:FB, fontSize:12.5, fontWeight:700, padding:"10px 24px", borderRadius:10, border:"none", background:`linear-gradient(135deg,${C.gLeaf},${C.gMid})`, color:C.gDeep, cursor:"pointer", boxShadow:`0 6px 20px ${C.gLeaf}40` }}>
                    Show All Posts
                  </button>
                </div>
              )}

              {/* Mobile view-all */}
              {isMobile && (
                <button className="b__viewall" style={{ fontFamily:FB, fontSize:13.5, fontWeight:700, width:"100%", padding:"14px", borderRadius:13, border:"1.5px solid rgba(93,181,32,.26)", background:"rgba(93,181,32,.07)", color:C.gLeaf, letterSpacing:".04em", marginTop:22, display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
                  View All Articles
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              )}
            </div>

            {/* Sidebar — desktop only */}
            {!isMobile && <Sidebar inView={gridIn}/>}
          </div>

          {/* ── Newsletter ── */}
          <div style={{ marginTop:isMobile?48:68, animation:inView?"b__up .60s .28s ease both":"none" }}>
            <Newsletter isMobile={isMobile} isXS={isXS}/>
          </div>

        </div>
      </section>
    </div>
  );
}