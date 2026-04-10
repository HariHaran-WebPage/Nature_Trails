"use client";
import { useState, useEffect, useRef, ReactNode } from "react";
import React from "react";
import Head from "next/head";
import Image from "next/image";

const C = {
  gDeep:     "#0F3D06",
  gDark:     "#1A5C0A",
  gMid:      "#2E8010",
  gLeaf:     "#6BBD28",
  gLight:    "#96D94A",
  gPale:     "#C8EDAA",
  brDark:    "#3A1C08",
  brMid:     "#5A2E12",
  cream:     "#F6F1E9",
  parchment: "#EDE6D8",
  wh:        "#FFFFFF",
  bg:        "#F0EBE1",
  textDark:  "#1C1810",
  textMid:   "#4A3F30",
  textLight: "#8A7A60",
  bdrWarm:   "#D0C0A0",
  bdrGreen:  "#A8D880",
  gold:      "#C8A84B",
};

const F  = "'Playfair Display', 'Georgia', serif";
const FB = "'DM Sans', 'Segoe UI', sans-serif";


interface SlideData {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  badge: string;
  temp: string;
  accent: string;
  accentDark: string;
  heroImg: string;
  cardImg: string;
  overlay: string;
}


interface FieldProps {
  label: string;
  mb?: number;
  children: ReactNode;
}

interface DestCardProps {
  slide: SlideData;
  active: boolean;
  onClick: () => void;
  isMobile: boolean;
}


const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  border: `1.5px solid ${C.bdrWarm}`,
  borderRadius: 10,
  fontFamily: FB,
  fontSize: 13,
  color: C.textDark,
  background: C.cream,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color .15s, background .15s",
  appearance: "none" as React.CSSProperties["appearance"],
};


const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = C.gMid;
    e.currentTarget.style.background = "#fff";
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = C.bdrWarm;
    e.currentTarget.style.background = C.cream;
  },
};

function Field({ label, children, mb = 0 }: FieldProps) {
  return (
    <div style={{ marginBottom: mb }}>
      <label style={{
        display: "block",
        fontFamily: FB,
        fontSize: 10,
        fontWeight: 700,
        color: C.brMid,
        marginBottom: 6,
        letterSpacing: ".10em",
        textTransform: "uppercase",
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

// Updated slide data for NEW Coimbatore-based tourism startup
const SLIDES: SlideData[] = [
  {
    id: 0,
    tag: "Queen of Hill Stations",
    title: "Ooty",
    subtitle: "Nilgiris, Tamil Nadu",
    desc: "Just 86 km from Coimbatore! Breathe in the cool mountain air, walk through vast tea gardens, and lose yourself in emerald valleys draped in mist.",
    badge: "2,240m Altitude | 3hrs from Coimbatore",
    temp: "15°C – 22°C",
    accent: C.gLight,
    accentDark: C.gDeep,
    heroImg: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1800&q=85&auto=format&fit=crop",
    cardImg: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80&auto=format&fit=crop",
    overlay: "linear-gradient(125deg, rgba(8,22,3,0.96) 0%, rgba(15,42,5,0.80) 42%, rgba(6,18,2,0.12) 100%)",
  },
  {
    id: 1,
    tag: "Princess of Hill Stations",
    title: "Kodaikanal",
    subtitle: "Dindigul, Tamil Nadu",
    desc: "Discover silver cascades, serene lakes, and fragrant forests. Starting just 4 hours from Coimbatore, every trail reveals a new wonder.",
    badge: "2,133m Altitude | 4hrs from Coimbatore",
    temp: "8°C – 20°C",
    accent: C.gPale,
    accentDark: C.gDark,
    heroImg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85&auto=format&fit=crop",
    cardImg: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80&auto=format&fit=crop",
    overlay: "linear-gradient(125deg, rgba(4,16,2,0.96) 0%, rgba(10,30,4,0.80) 42%, rgba(4,14,2,0.12) 100%)",
  },
  {
    id: 2,
    tag: "God's Own Country",
    title: "Munnar",
    subtitle: "Idukki, Kerala",
    desc: "Endless rolling tea estates, misty peaks, and tranquil silence of the Western Ghats. Just 5 hours from Coimbatore, experience Kerala's most beautiful hill station.",
    badge: "1,600m Altitude | 5hrs from Coimbatore",
    temp: "10°C – 25°C",
    accent: C.gLight,
    accentDark: C.gDeep,
    heroImg: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1800&q=85&auto=format&fit=crop",
    cardImg: "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=600&q=80&auto=format&fit=crop",
    overlay: "linear-gradient(125deg, rgba(3,14,1,0.97) 0%, rgba(8,28,3,0.82) 42%, rgba(3,12,1,0.12) 100%)",
  },
];

// Updated stats for NEW startup - honest and achievable numbers
const STATS = [
  { num: "4+",     label: "Curated Destinations" },
  { num: "500+",   label: "Happy Travellers" },
  { num: "15+",    label: "Tailored Packages" },
  { num: "4.8★",   label: "Customer Rating" },
];

function useWindowSize() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}


function HeroSearch() {
  const [tab, setTab]     = useState<string>("Packages");
  const [hovBtn, setHovBtn] = useState<boolean>(false);
  const tabs = ["Packages", "Taxi", "Custom"];

  const tabKey = (t: string) => t === "Custom" ? "Custom Tour" : t;

  return (
    <div style={{
      background: "rgba(255,255,255,0.97)",
      borderRadius: 20,
      boxShadow: "0 32px 100px rgba(6,18,2,0.60), 0 8px 32px rgba(6,18,2,0.28)",
      overflow: "hidden",
      border: "1px solid rgba(168,216,128,0.40)",
    }}>

      <div style={{
        background: `linear-gradient(135deg, ${C.gDeep} 0%, ${C.gDark} 60%, ${C.gMid} 100%)`,
        padding: "16px 22px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,0.50)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 3 }}>
            Coimbatore&apos;s Newest Travel Partner
          </div>
          <div style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: "#fff", fontStyle: "italic", letterSpacing: "-.01em" }}>
            Nature{" "}
            <span style={{ fontStyle: "normal", fontFamily: FB, fontSize: 11, fontWeight: 800, letterSpacing: ".14em", color: C.gLight }}>
              TRAILS
            </span>
          </div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gLight} strokeWidth="2" strokeLinecap="round">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: `1px solid ${C.bdrWarm}`, background: C.parchment }}>
        {tabs.map(t => {
          const key = tabKey(t);
          return (
            <button key={t} onClick={() => setTab(key)} style={{
              flex: 1, padding: "13px 0", border: "none", cursor: "pointer",
              fontFamily: FB, fontSize: 11, fontWeight: 700, letterSpacing: ".06em",
              background: tab === key ? C.wh : "transparent",
              color: tab === key ? C.gDeep : C.textLight,
              borderBottom: tab === key ? `2.5px solid ${C.gMid}` : "2.5px solid transparent",
              transition: "all .15s",
            }}>
              {t}
            </button>
          );
        })}
      </div>
      <div style={{ padding: "20px 20px 16px", background: C.wh }}>
        {tab === "Packages" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <Field label="Destination">
                <select style={inputStyle} {...focusHandlers}>
                  <option>Ooty Tour from Coimbatore</option>
                  <option>Kodaikanal Tour from Coimbatore</option>
                  <option>Munnar Tour from Coimbatore</option>
                  <option>Wayanad Tour from Coimbatore</option>
                  <option>Coorg Tour from Coimbatore</option>
                </select>
              </Field>
              <Field label="Package Type">
                <select style={inputStyle} {...focusHandlers}>
                  <option>Weekend Getaway</option>
                  <option>Family Tour</option>
                  <option>Honeymoon Special</option>
                  <option>Group Adventure</option>
                  <option>Solo Travel</option>
                </select>
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
              <Field label="Travel Date">
                <input type="date" style={inputStyle} {...focusHandlers} />
              </Field>
              <Field label="Travellers">
                <select style={inputStyle} {...focusHandlers}>
                  <option>1 Person</option>
                  <option>2 Persons</option>
                  <option>3–5 Persons</option>
                  <option>6+ Persons</option>
                </select>
              </Field>
            </div>
          </>
        )}

        {tab === "Taxi" && (
          <>
            <Field label="Pickup Location" mb={10}>
              <input style={inputStyle} placeholder="Coimbatore Airport / Railway Station / City" {...focusHandlers} />
            </Field>
            <Field label="Drop Location" mb={10}>
              <input style={inputStyle} placeholder="Ooty / Kodaikanal / Munnar / Coorg..." {...focusHandlers} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
              <Field label="Date & Time">
                <input type="datetime-local" style={inputStyle} {...focusHandlers} />
              </Field>
              <Field label="Vehicle">
                <select style={inputStyle} {...focusHandlers}>
                  <option>Sedan (4 seats) - Ooty from ₹2,499</option>
                  <option>SUV (6 seats) - Ooty from ₹3,499</option>
                  <option>Tempo Traveller - Ooty from ₹5,499</option>
                  <option>Mini Bus - Call for Best Price</option>
                </select>
              </Field>
            </div>
          </>
        )}

        {tab === "Custom Tour" && (
          <>
            <Field label="Your Name" mb={10}>
              <input style={inputStyle} placeholder="Enter your name" {...focusHandlers} />
            </Field>
            <Field label="Phone Number" mb={10}>
              <input style={inputStyle} placeholder="+91 XXXXX XXXXX" {...focusHandlers} />
            </Field>
            <Field label="Your Dream Trip" mb={18}>
              <textarea
                style={{ ...inputStyle, resize: "none" }}
                placeholder="Tell us your dream destinations, dates, number of people, budget..."
                rows={3}
                onFocus={e => { e.currentTarget.style.borderColor = C.gMid; e.currentTarget.style.background = "#fff"; }}
                onBlur={e => { e.currentTarget.style.borderColor = C.bdrWarm; e.currentTarget.style.background = C.cream; }}
              />
            </Field>
          </>
        )}

        <button
          onMouseEnter={() => setHovBtn(true)}
          onMouseLeave={() => setHovBtn(false)}
          style={{
            width: "100%", padding: "14px 0", border: "none", borderRadius: 10,
            background: hovBtn
              ? `linear-gradient(135deg, ${C.gMid}, ${C.gLeaf})`
              : `linear-gradient(135deg, ${C.gDeep}, ${C.gMid})`,
            color: "#fff", fontFamily: FB, fontSize: 13.5, fontWeight: 700,
            cursor: "pointer", letterSpacing: ".06em",
            boxShadow: hovBtn ? "0 12px 36px rgba(26,92,10,0.55)" : "0 6px 20px rgba(26,92,10,0.38)",
            transform: hovBtn ? "translateY(-1px)" : "none",
            transition: "all .18s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          {tab === "Custom Tour" ? "Request Callback" : `Search ${tab} from Coimbatore`}
        </button>
      </div>

      <div style={{
        padding: "10px 20px", background: C.parchment,
        borderTop: `1px solid ${C.bdrWarm}`,
        display: "flex", alignItems: "center", justifyContent: "space-around",
      }}>
        {["Free Cancellation", "Best Price Guarantee", "24/7 Support"].map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill={C.gMid}>
              <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            <span style={{ fontFamily: FB, fontSize: 10, color: C.brMid, fontWeight: 600 }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


function MobileSearchSheet() {
  const [open, setOpen] = useState<boolean>(false);
  const [tab, setTab]   = useState<string>("Packages");
  const tabs = ["Packages", "Taxi", "Custom"];
  const tabKey = (t: string) => t === "Custom" ? "Custom Tour" : t;

  return (
    <>
  
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,30,4,0.95)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(107,189,40,0.30)",
        padding: "12px 16px",
        display: "flex", gap: 10, alignItems: "center",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.40)",
      }}>
        <button onClick={() => setOpen(true)} style={{
          flex: 1, padding: "14px 0",
          background: `linear-gradient(135deg, ${C.gLeaf}, ${C.gMid})`,
          color: C.gDeep, border: "none", borderRadius: 12,
          fontFamily: FB, fontSize: 14, fontWeight: 800,
          cursor: "pointer", letterSpacing: ".04em",
          boxShadow: "0 6px 24px rgba(107,189,40,0.50)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          Book Your Ooty Trip
        </button>
        <a href="tel:+919876543210" style={{
          width: 50, height: 50,
          background: "rgba(255,255,255,0.10)",
          border: "1.5px solid rgba(255,255,255,0.22)",
          borderRadius: 12, textDecoration: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498A1 1 0 0 1 21 15.72V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </div>

  
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
        }}>
          <div onClick={() => setOpen(false)} style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.60)",
            backdropFilter: "blur(4px)",
          }} />

          <div style={{
            position: "relative", zIndex: 1,
            background: C.wh,
            borderRadius: "20px 20px 0 0",
            maxHeight: "88vh", overflowY: "auto",
            boxShadow: "0 -20px 60px rgba(0,0,0,0.40)",
          }}>
        
            <div style={{ padding: "12px 0 0", display: "flex", justifyContent: "center" }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: C.bdrWarm }} />
            </div>

            
            <div style={{
              background: `linear-gradient(135deg, ${C.gDeep}, ${C.gDark})`,
              margin: "12px 16px 0", borderRadius: 14,
              padding: "14px 18px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,0.50)", letterSpacing: ".10em", textTransform: "uppercase", marginBottom: 2 }}>
                  Coimbatore&apos;s Newest Travel Partner
                </div>
                <div style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", fontStyle: "italic" }}>
                  Nature{" "}
                  <span style={{ fontStyle: "normal", fontFamily: FB, fontSize: 10, fontWeight: 800, letterSpacing: ".14em", color: C.gLight }}>
                    TRAILS
                  </span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{
                background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 8,
                width: 32, height: 32, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            
            <div style={{ display: "flex", margin: "12px 16px 0", gap: 8 }}>
              {tabs.map(t => {
                const key = tabKey(t);
                return (
                  <button key={t} onClick={() => setTab(key)} style={{
                    flex: 1, padding: "10px 0", border: "none", borderRadius: 10, cursor: "pointer",
                    fontFamily: FB, fontSize: 11.5, fontWeight: 700,
                    background: tab === key ? C.gDeep : C.parchment,
                    color: tab === key ? "#fff" : C.textLight,
                    transition: "all .15s",
                  }}>
                    {t}
                  </button>
                );
              })}
            </div>

            
            <div style={{ padding: "16px 16px 24px" }}>
              {tab === "Packages" && (
                <>
                  <Field label="Destination" mb={10}>
                    <select style={inputStyle} {...focusHandlers}>
                      <option>Ooty Tour from Coimbatore</option>
                      <option>Kodaikanal Tour from Coimbatore</option>
                      <option>Munnar Tour from Coimbatore</option>
                      <option>Wayanad Tour from Coimbatore</option>
                      <option>Coorg Tour from Coimbatore</option>
                    </select>
                  </Field>
                  <Field label="Package Type" mb={10}>
                    <select style={inputStyle} {...focusHandlers}>
                      <option>Weekend Getaway</option>
                      <option>Family Tour</option>
                      <option>Honeymoon Special</option>
                      <option>Group Adventure</option>
                    </select>
                  </Field>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <Field label="Travel Date">
                      <input type="date" style={inputStyle} {...focusHandlers} />
                    </Field>
                    <Field label="Travellers">
                      <select style={inputStyle} {...focusHandlers}>
                        <option>1 Person</option>
                        <option>2 Persons</option>
                        <option>3–5 Persons</option>
                        <option>6+ Persons</option>
                      </select>
                    </Field>
                  </div>
                </>
              )}
              {tab === "Taxi" && (
                <>
                  <Field label="Pickup Location" mb={10}>
                    <input style={inputStyle} placeholder="Coimbatore Airport / City" {...focusHandlers} />
                  </Field>
                  <Field label="Drop Location" mb={10}>
                    <input style={inputStyle} placeholder="Ooty / Kodaikanal / Munnar..." {...focusHandlers} />
                  </Field>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <Field label="Date & Time">
                      <input type="datetime-local" style={inputStyle} {...focusHandlers} />
                    </Field>
                    <Field label="Vehicle">
                      <select style={inputStyle} {...focusHandlers}>
                        <option>Sedan (4 seats) - Ooty from ₹2,499</option>
                        <option>SUV (6 seats) - Ooty from ₹3,499</option>
                        <option>Tempo Traveller - Ooty from ₹5,499</option>
                      </select>
                    </Field>
                  </div>
                </>
              )}
              {tab === "Custom Tour" && (
                <>
                  <Field label="Your Name" mb={10}>
                    <input style={inputStyle} placeholder="Enter your name" {...focusHandlers} />
                  </Field>
                  <Field label="Phone Number" mb={10}>
                    <input style={inputStyle} placeholder="+91 XXXXX XXXXX" {...focusHandlers} />
                  </Field>
                  <Field label="Your Dream Trip" mb={10}>
                    <textarea
                      style={{ ...inputStyle, resize: "none" }}
                      placeholder="Destinations, dates, people, budget..."
                      rows={3}
                      onFocus={e => { e.currentTarget.style.borderColor = C.gMid; e.currentTarget.style.background = "#fff"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = C.bdrWarm; e.currentTarget.style.background = C.cream; }}
                    />
                  </Field>
                </>
              )}

              <button style={{
                width: "100%", padding: "15px 0", border: "none", borderRadius: 12,
                background: `linear-gradient(135deg, ${C.gDeep}, ${C.gMid})`,
                color: "#fff", fontFamily: FB, fontSize: 14, fontWeight: 700,
                cursor: "pointer", letterSpacing: ".04em",
                boxShadow: "0 8px 28px rgba(26,92,10,0.45)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                marginTop: 4,
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                {tab === "Custom Tour" ? "Request Callback" : `Search ${tab} from Coimbatore`}
              </button>

              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 14 }}>
                {["Free Cancellation", "Best Price", "24/7 Support"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill={C.gMid}>
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                    <span style={{ fontFamily: FB, fontSize: 9.5, color: C.brMid, fontWeight: 600 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


function DestCard({ slide, active, onClick, isMobile }: DestCardProps) {
  const [hov, setHov] = useState<boolean>(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1, minWidth: 0, cursor: "pointer", textAlign: "left",
        background: active ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.07)",
        border: `1.5px solid ${active ? "rgba(107,189,40,0.55)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: 14, overflow: "hidden",
        transition: "all .28s cubic-bezier(.16,1,.3,1)",
        transform: active
          ? isMobile ? "none" : "translateY(-8px) scale(1.01)"
          : hov ? "translateY(-4px)" : "none",
        boxShadow: active
          ? "0 20px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(107,189,40,0.22), inset 0 1px 0 rgba(255,255,255,0.12)"
          : hov ? "0 10px 28px rgba(0,0,0,0.28)" : "none",
        backdropFilter: "blur(14px)",
      }}>

      <div style={{ width: "100%", height: isMobile ? 72 : 130, overflow: "hidden", position: "relative" }}>
        <Image
          src={slide.cardImg}
          alt={`${slide.title} tour from Coimbatore`}
          fill
          sizes="(max-width: 768px) 100px, 200px"
          style={{
            objectFit: "cover",
            transform: (active || hov) ? "scale(1.12)" : "scale(1.0)",
            transition: "transform .70s ease",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)",
        }} />
  
        <div style={{
          position: "absolute", bottom: 8, left: 9,
          background: "rgba(0,0,0,0.60)", backdropFilter: "blur(8px)",
          borderRadius: 20, padding: "3px 9px",
          fontFamily: FB, fontSize: 9.5, fontWeight: 600,
          color: active ? slide.accent : "rgba(255,255,255,0.72)",
          border: `1px solid ${active ? slide.accent + "50" : "rgba(255,255,255,0.16)"}`,
          transition: "all .2s",
        }}>{slide.temp}</div>
        {active && (
          <div style={{
            position: "absolute", top: 8, right: 8,
            width: 8, height: 8, borderRadius: "50%",
            background: slide.accent,
            boxShadow: `0 0 12px ${slide.accent}`,
            animation: "pulse 2s infinite",
          }} />
        )}
      </div>

      <div style={{ padding: isMobile ? "8px 10px 10px" : "13px 14px 15px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
          <div style={{
            width: 4, height: 4, borderRadius: "50%",
            background: active ? slide.accent : "rgba(255,255,255,0.28)",
            transition: "background .2s",
          }} />
          <span style={{ fontFamily: FB, fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.42)", letterSpacing: ".12em", textTransform: "uppercase" }}>
            {slide.tag}
          </span>
        </div>
        <div style={{
          fontFamily: F, fontSize: isMobile ? 15 : 20, fontWeight: 700,
          color: "#fff", lineHeight: 1, letterSpacing: "-.01em", fontStyle: "italic",
        }}>{slide.title}</div>
        <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>{slide.subtitle}</div>
        {!isMobile && (
          <div style={{
            marginTop: 10, display: "inline-flex", alignItems: "center", gap: 5,
            background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: "3px 9px",
          }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={active ? slide.accent : "rgba(255,255,255,0.38)"} strokeWidth="2" strokeLinecap="round">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{ fontFamily: FB, fontSize: 9, color: active ? slide.accent : "rgba(255,255,255,0.35)", fontWeight: 600 }}>
              {slide.badge.split(" | ")[0]}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}


function FloatingLeaves() {
  const leaves = [
    { size: 28, top: "9%",  left: "4%",  delay: "0s",   dur: "8s",  op: 0.14 },
    { size: 18, top: "20%", left: "89%", delay: "1.5s",  dur: "10s", op: 0.11 },
    { size: 24, top: "55%", left: "2%",  delay: "2.8s",  dur: "9s",  op: 0.10 },
    { size: 34, top: "74%", left: "91%", delay: "1.0s",  dur: "11s", op: 0.10 },
    { size: 14, top: "40%", left: "94%", delay: "3.4s",  dur: "7s",  op: 0.12 },
    { size: 20, top: "84%", left: "10%", delay: "2.0s",  dur: "12s", op: 0.08 },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 3 }}>
      {leaves.map((l, i) => (
        <div key={i} style={{
          position: "absolute", top: l.top, left: l.left, opacity: l.op,
          animation: `leafFloat ${l.dur} ease-in-out ${l.delay} infinite alternate`,
        }}>
          <svg width={l.size} height={l.size} viewBox="0 0 24 24" fill={C.gLight}>
            <path d="M12 22C6 17 2 12.5 2 8a10 10 0 0 1 20 0c0 4.5-4 9-10 14z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function NatureTrailsHero() {
  const [slide,    setSlide]    = useState<number>(0);
  const [animKey,  setAnimKey]  = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const width = useWindowSize();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1100;

  const goTo = (idx: number) => {
    if (idx === slide) return;
    setSlide(idx);
    setAnimKey(k => k + 1);
    setProgress(0);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    const start = Date.now();
    const dur = 6000;
    progressRef.current = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / dur) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(progressRef.current);
        setSlide(s => (s + 1) % SLIDES.length);
        setAnimKey(k => k + 1);
        setProgress(0);
      }
    }, 40);
    return () => clearInterval(progressRef.current);
  }, [slide]);

  const s = SLIDES[slide];

  return (
    <>
      <Head>
        <title>Nature Trails | Best Tour Packages from Coimbatore to Ooty, Kodaikanal & Munnar</title>
        <meta name="description" content="Nature Trails - Coimbatore's newest travel agency for hill station tours. Book Ooty tour packages from Coimbatore, Kodaikanal trips, Munnar honeymoon packages, taxi services, and custom tours. Best price guaranteed!" />
        <meta name="keywords" content="tour packages from coimbatore, ooty tour package from coimbatore, kodaikanal tour from coimbatore, munnar tour package, coimbatore to ooty taxi, coimbatore travel agency, best travel agency in coimbatore, weekend getaways from coimbatore, honeymoon packages coimbatore" />
        <meta name="author" content="Nature Trails" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Nature Trails | Best Tour Packages from Coimbatore to Ooty, Kodaikanal & Munnar" />
        <meta property="og:description" content="Coimbatore's trusted travel partner for Ooty, Kodaikanal, Munnar tours. Best price guarantee, free cancellation, 24/7 support. Book your dream vacation today!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=80" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nature Trails | Best Tour Packages from Coimbatore" />
        <meta name="twitter:description" content="Book Ooty, Kodaikanal, Munnar tour packages from Coimbatore. Best price, free cancellation, 24/7 support." />
        <link rel="canonical" href="https://naturetrails.com" />
      </Head>

      <div style={{ fontFamily: FB, background: C.bg }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          select, input, textarea { font-family: 'DM Sans', sans-serif !important; }
          @keyframes leafFloat  { 0%{transform:translateY(0) rotate(-6deg)} 100%{transform:translateY(-22px) rotate(10deg)} }
          @keyframes heroFadeIn { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
          @keyframes pulse      { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }
          @keyframes kenBurns   { 0%{transform:scale(1)} 100%{transform:scale(1.08)} }
          button { -webkit-tap-highlight-color: transparent; }
          select, input, textarea { -webkit-appearance: none; }
        `}</style>

        <div style={{
          position: "relative",
          minHeight: isMobile ? "100svh" : "94vh",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          paddingBottom: isMobile ? 90 : 0,
        }}>

          {SLIDES.map((sl, i) => (
            <div key={i} style={{
              position: "absolute", inset: 0, zIndex: 0,
              opacity: i === slide ? 1 : 0,
              transition: "opacity 1.4s ease",
            }}>
              <Image
                src={sl.heroImg}
                alt={`${sl.title} tour from Coimbatore`}
                fill
                sizes="100vw"
                priority={i === 0}
                style={{
                  objectFit: "cover",
                  objectPosition: "center 40%",
                  animation: i === slide ? "kenBurns 9s ease-in-out forwards" : "none",
                }}
              />
              <div style={{ position: "absolute", inset: 0, background: sl.overlay }} />
            </div>
          ))}

     
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
            background: "linear-gradient(to top, rgba(6,18,2,0.35) 0%, transparent 100%)",
            zIndex: 1, pointerEvents: "none",
          }} />

        
          <div style={{
            position: "absolute", inset: 0, zIndex: 2, opacity: .015, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(45deg,#6BBD28 0,#6BBD28 1px,transparent 0,transparent 50%)",
            backgroundSize: "26px 26px",
          }} />

     
          {!isMobile && (
            <>
              <div style={{ position: "absolute", right: -130, top: "50%", transform: "translateY(-50%)", width: 680, height: 680, borderRadius: "50%", border: "1px solid rgba(107,189,40,0.09)", zIndex: 2, pointerEvents: "none" }} />
              <div style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", width: 460, height: 460, borderRadius: "50%", border: "1px solid rgba(107,189,40,0.06)", zIndex: 2, pointerEvents: "none" }} />
              <div style={{ position: "absolute", left: -90, top: "32%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(90,46,18,0.12)", zIndex: 2, pointerEvents: "none" }} />
            </>
          )}

          <FloatingLeaves />

          <div style={{
            position: "relative", zIndex: 4, flex: 1,
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
            padding: isMobile ? "72px 18px 20px" : isTablet ? "88px 32px 24px" : "100px 56px 32px",
            gap: isMobile ? 24 : isTablet ? 32 : 60,
            maxWidth: 1400, margin: "0 auto", width: "100%",
          }}>

            <div style={{ flex: 1, minWidth: 0 }} key={`txt-${animKey}`}>

              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(107,189,40,0.12)",
                border: "1px solid rgba(107,189,40,0.28)",
                borderRadius: 30, padding: "7px 14px", marginBottom: 18,
                animation: "heroFadeIn .50s ease both",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.accent, display: "inline-block", animation: "pulse 2s infinite" }} />
                <span style={{ fontFamily: FB, fontSize: isMobile ? 9.5 : 10.5, fontWeight: 700, color: s.accent, letterSpacing: ".14em", textTransform: "uppercase" }}>
                  {s.tag}
                </span>
              </div>

              <div style={{ animation: "heroFadeIn .56s .08s ease both", marginBottom: 6 }}>
                <div style={{
                  fontFamily: F, fontStyle: "italic",
                  fontSize: isMobile ? 58 : isTablet ? 76 : 100,
                  fontWeight: 800,
                  color: "#fff", lineHeight: .82, letterSpacing: "-.04em",
                  textShadow: "0 4px 40px rgba(0,0,0,0.50)",
                }}>{s.title}</div>
                <div style={{
                  fontFamily: FB, fontSize: isMobile ? 12 : isTablet ? 16 : 20,
                  fontWeight: 500, color: "rgba(255,255,255,0.40)",
                  letterSpacing: ".20em", marginTop: 12, textTransform: "uppercase",
                }}>{s.subtitle}</div>
              </div>

              <div style={{
                display: "flex", alignItems: "center", gap: 10, marginTop: 18, marginBottom: 18,
                animation: "heroFadeIn .56s .14s ease both",
              }}>
                <div style={{ flex: 1, maxWidth: 50, height: 1, background: "linear-gradient(to right, transparent, rgba(200,168,75,0.50))" }} />
                <svg width="14" height="14" viewBox="0 0 24 24" fill={C.gold} opacity={0.8}>
                  <path d="M12 22C6 17 2 12.5 2 8a10 10 0 0 1 20 0c0 4.5-4 9-10 14z" />
                </svg>
                <div style={{ flex: 1, maxWidth: 180, height: 1, background: "linear-gradient(to right, rgba(200,168,75,0.50), transparent)" }} />
              </div>

        
              <p style={{
                fontFamily: FB, fontSize: isMobile ? 13 : 15,
                lineHeight: 1.85, color: "rgba(255,255,255,0.58)",
                maxWidth: 480, marginBottom: isMobile ? 22 : 32,
                animation: "heroFadeIn .56s .20s ease both",
                textShadow: "0 1px 10px rgba(0,0,0,0.30)",
              }}>{s.desc}</p>

              {!isMobile && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", animation: "heroFadeIn .56s .28s ease both" }}>
                  <button style={{
                    display: "flex", alignItems: "center", gap: 9,
                    background: `linear-gradient(135deg, ${C.gLight}, ${C.gMid})`,
                    color: C.gDeep, border: "none", borderRadius: 11,
                    padding: isTablet ? "13px 22px" : "15px 30px",
                    fontFamily: FB, fontSize: 13.5, fontWeight: 800,
                    cursor: "pointer", letterSpacing: ".02em",
                    boxShadow: "0 10px 32px rgba(46,128,16,0.52)",
                    transition: "all .18s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}
                  >
                    Book {s.title} Tour from Coimbatore
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "rgba(255,255,255,0.10)", color: "#fff",
                    border: "1.5px solid rgba(255,255,255,0.24)", borderRadius: 11,
                    padding: isTablet ? "12px 18px" : "14px 26px",
                    fontFamily: FB, fontSize: 13.5, fontWeight: 600,
                    cursor: "pointer", backdropFilter: "blur(10px)", letterSpacing: ".02em",
                    transition: "all .18s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)"; }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498A1 1 0 0 1 21 15.72V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91 98765 43210
                  </button>
                </div>
              )}
              {!isMobile && (
                <div style={{ display: "flex", alignItems: "center", marginTop: 50, animation: "heroFadeIn .56s .38s ease both" }}>
                  {STATS.map((st, i) => (
                    <div key={st.label} style={{
                      padding: i === 0 ? "0 28px 0 0" : "0 28px",
                      borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
                    }}>
                      <div style={{ fontFamily: F, fontSize: isTablet ? 22 : 28, fontWeight: 800, color: "#fff", lineHeight: 1, textShadow: "0 2px 16px rgba(0,0,0,0.40)", letterSpacing: "-.02em", fontStyle: "italic" }}>{st.num}</div>
                      <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,0.38)", marginTop: 5, fontWeight: 500, letterSpacing: ".06em" }}>{st.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {isMobile && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 0", animation: "heroFadeIn .56s .28s ease both", marginTop: 4 }}>
                  {STATS.map((st, i) => (
                    <div key={st.label} style={{
                      padding: "12px 0",
                      borderLeft: i % 2 !== 0 ? "1px solid rgba(255,255,255,0.12)" : "none",
                      paddingLeft: i % 2 !== 0 ? 16 : 0,
                    }}>
                      <div style={{ fontFamily: F, fontSize: 24, fontWeight: 800, color: "#fff", lineHeight: 1, fontStyle: "italic", letterSpacing: "-.02em" }}>{st.num}</div>
                      <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,0.38)", marginTop: 4, fontWeight: 500, letterSpacing: ".06em" }}>{st.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {!isMobile && (
              <div style={{ flexShrink: 0, width: isTablet ? 360 : 470, animation: "heroFadeIn .70s .12s ease both" }}>
                <HeroSearch />
              </div>
            )}
          </div>
          <div style={{
            position: "relative", zIndex: 4,
            padding: isMobile ? "0 16px 24px" : isTablet ? "0 32px 32px" : "0 56px 40px",
            maxWidth: 1400, margin: "0 auto", width: "100%",
          }}>
            <div style={{ display: "flex", gap: isMobile ? 8 : 14, alignItems: "flex-end" }}>
              {SLIDES.map((sl, i) => (
                <DestCard key={i} slide={sl} active={i === slide} onClick={() => goTo(i)} isMobile={isMobile} />
              ))}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 7, paddingLeft: 6, paddingBottom: 4 }}>
                {SLIDES.map((_, i) => (
                  <div key={i} style={{
                    width: 3, borderRadius: 2,
                    height: i === slide ? 42 : 18,
                    background: i === slide ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.18)",
                    overflow: "hidden", transition: "all .32s", position: "relative",
                  }}>
                    {i === slide && (
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0,
                        height: `${progress}%`,
                        background: s.accent,
                        transition: "height .04s linear",
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {isMobile && <MobileSearchSheet />}
      </div>
    </>
  );
}