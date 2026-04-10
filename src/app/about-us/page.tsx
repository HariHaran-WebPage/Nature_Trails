"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

/* ─── Tokens (Contact Page Color Scheme & Fonts) ───────────────────── */
const C = {
  gDeep: "#0F3D06",
  gDark: "#1A5C0A",
  gMid: "#2E8010",
  gLeaf: "#6BBD28",
  gLight: "#96D94A",
  gold: "#E8A020",
  warn: "#FF6B35",
  white: "#FFFFFF",
  black: "#000000",
};

const F = {
  display: "'Playfair Display', Georgia, serif",
  label: "'Cinzel', serif",
  body: "'DM Sans', 'Segoe UI', sans-serif",
};

const HERO_BG = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=85&fit=crop";

const ABOUT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&family=Cinzel:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Global Background (Contact Page Style) */
  .nt__about {
    position: relative;
    min-height: 100vh;
    width: 100%;
    font-family: ${F.body};
  }

  .nt__global-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    background-image: url('${HERO_BG}');
    background-size: cover;
    background-position: center 60%;
    background-attachment: fixed;
    filter: brightness(0.18) saturate(1.4);
  }

  .nt__global-overlay {
    position: fixed;
    inset: 0;
    z-index: 1;
    background: radial-gradient(ellipse 65% 50% at 10% 5%, rgba(46,128,16,.12) 0%, transparent 58%),
                radial-gradient(ellipse 55% 45% at 90% 90%, rgba(15,61,6,.17) 0%, transparent 55%),
                linear-gradient(180deg, rgba(4,12,2,.68) 0%, rgba(6,18,3,.25) 40%, rgba(4,10,2,.70) 100%);
    pointer-events: none;
  }

  .nt__content {
    position: relative;
    z-index: 2;
  }

  /* Container Design (Contact Page Style) */
  .nt__container {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 28px;
  }

  @media (max-width: 768px) {
    .nt__container {
      padding: 0 20px;
    }
  }

  @media (max-width: 480px) {
    .nt__container {
      padding: 0 16px;
    }
  }

  /* Animations */
  @keyframes nt__fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes nt__pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: .4; transform: scale(.65); }
  }

  @keyframes shimmer {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
  }

  /* ── HERO SECTION ── */
  .nt__hero {
    position: relative;
    min-height: 520px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .nt__hero__content {
    max-width: 780px;
    margin: 0 auto;
    padding: 80px 24px;
    animation: nt__fadeUp 0.9s cubic-bezier(.16,1,.3,1) both;
  }

  .nt__hero__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    border: 0.5px solid rgba(232,160,32,0.55);
    border-radius: 40px;
    padding: 8px 22px;
    margin-bottom: 28px;
  }

  .nt__hero__eyebrow__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${C.gold};
    animation: nt__pulse 2.2s infinite;
  }

  .nt__hero__eyebrow__text {
    font-family: ${F.label};
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${C.gold};
  }

  .nt__hero__title {
    font-family: ${F.display};
    font-size: clamp(44px, 8vw, 80px);
    font-weight: 700;
    font-style: italic;
    color: #fff;
    line-height: 1.08;
    margin-bottom: 10px;
    text-shadow: 0 4px 28px rgba(0,0,0,.55);
    letter-spacing: -0.01em;
  }

  .nt__hero__title strong {
    background: linear-gradient(125deg, ${C.gLeaf} 0%, #C8F060 45%, ${C.gMid} 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
    font-weight: 800;
    font-style: normal;
  }

  .nt__hero__rule {
    width: 36px;
    height: 1px;
    background: ${C.gold};
    margin: 22px auto;
  }

  .nt__hero__sub {
    font-family: ${F.body};
    font-size: 18px;
    font-weight: 400;
    color: rgba(255,255,255,0.75);
    line-height: 1.8;
    max-width: 560px;
    margin: 0 auto;
  }

  /* ── STORY SECTION ── */
  .nt__section {
    padding: 80px 0;
  }

  .nt__section--tight {
    padding: 60px 0;
  }

  .nt__story__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: center;
  }

  @media (max-width: 768px) {
    .nt__story__grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  .nt__story__eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
  }

  .nt__story__eyebrow__line {
    width: 28px;
    height: 0.5px;
    background: ${C.gLeaf};
  }

  .nt__story__eyebrow__text {
    font-family: ${F.label};
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${C.gLeaf};
  }

  .nt__story__title {
    font-family: ${F.display};
    font-size: clamp(34px, 5vw, 54px);
    font-weight: 700;
    font-style: italic;
    background: linear-gradient(135deg, #fff 0%, ${C.gLight} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.15;
    margin-bottom: 24px;
    letter-spacing: -0.01em;
  }

  .nt__story__body {
    font-family: ${F.body};
    font-size: 17px;
    font-weight: 400;
    color: rgba(255,255,255,0.85);
    line-height: 1.9;
    margin-bottom: 18px;
  }

  .nt__story__body strong {
    color: ${C.gLeaf};
    font-weight: 600;
  }

  .nt__story__img {
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 4/3;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    border: 1px solid rgba(125,200,50,0.2);
  }

  .nt__story__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.7s ease;
  }

  .nt__story__img:hover img {
    transform: scale(1.04);
  }

  /* ── DIVIDER ── */
  .nt__divider {
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(125,200,50,0.3), transparent);
    max-width: 1240px;
    margin: 0 auto;
  }

  /* ── VALUES SECTION (Card Style from Contact Page) ── */
  .nt__values {
    background: rgba(6,18,3,0.88);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 60px 48px;
    border: 1px solid rgba(125,200,50,0.14);
    box-shadow: 0 8px 48px rgba(0,0,0,0.38);
  }

  @media (max-width: 600px) {
    .nt__values {
      padding: 44px 24px;
    }
  }

  .nt__values__header {
    text-align: center;
    margin-bottom: 52px;
  }

  .nt__values__header__title {
    font-family: ${F.display};
    font-size: clamp(32px, 4vw, 44px);
    font-weight: 700;
    font-style: italic;
    background: linear-gradient(135deg, #fff 0%, ${C.gLight} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
    letter-spacing: -0.01em;
  }

  .nt__values__header__sub {
    font-family: ${F.label};
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
  }

  .nt__values__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 1.5px;
    background: rgba(255,255,255,0.08);
    border-radius: 16px;
    overflow: hidden;
  }

  .nt__value {
    background: rgba(6,18,3,0.95);
    padding: 36px 26px;
    text-align: center;
    transition: all 0.25s ease;
  }

  .nt__value:hover {
    background: rgba(46,128,16,0.9);
    transform: translateY(-2px);
  }

  .nt__value__icon {
    width: 60px;
    height: 60px;
    border: 1.5px solid rgba(232,160,32,0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 18px;
    font-size: 28px;
    transition: all 0.25s ease;
  }

  .nt__value:hover .nt__value__icon {
    border-color: ${C.gold};
    transform: scale(1.05);
  }

  .nt__value__title {
    font-family: ${F.display};
    font-size: 22px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 10px;
    letter-spacing: 0.01em;
  }

  .nt__value__desc {
    font-family: ${F.body};
    font-size: 15px;
    font-weight: 400;
    color: rgba(255,255,255,0.65);
    line-height: 1.75;
  }

  /* ── STATS SECTION ── */
  .nt__stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: rgba(6,18,3,0.88);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(125,200,50,0.14);
  }

  @media (max-width: 560px) {
    .nt__stats {
      grid-template-columns: 1fr 1fr;
    }
  }

  .nt__stat {
    padding: 40px 20px;
    text-align: center;
    border-right: 1px solid rgba(125,200,50,0.1);
  }

  .nt__stat:last-child {
    border-right: none;
  }

  .nt__stat__num {
    font-family: ${F.display};
    font-size: clamp(38px, 5vw, 58px);
    font-weight: 700;
    font-style: italic;
    background: linear-gradient(135deg, ${C.gLeaf}, ${C.gold});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 10px;
  }

  .nt__stat__label {
    font-family: ${F.label};
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
  }

  /* ── TEAM SECTION ── */
  .nt__team__header {
    text-align: center;
    margin-bottom: 52px;
  }

  .nt__team__header__title {
    font-family: ${F.display};
    font-size: clamp(32px, 4vw, 44px);
    font-weight: 700;
    font-style: italic;
    background: linear-gradient(135deg, #fff 0%, ${C.gLight} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
    letter-spacing: -0.01em;
  }

  .nt__team__header__sub {
    font-family: ${F.label};
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
  }

  .nt__team__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 28px;
  }

  .nt__member {
    background: rgba(255,255,255,0.95);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }

  .nt__member:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.25);
  }

  .nt__member__img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    display: block;
    transition: all 0.4s ease;
  }

  .nt__member:hover .nt__member__img {
    transform: scale(1.02);
  }

  .nt__member__body {
    padding: 24px 22px 28px;
  }

  .nt__member__role {
    font-family: ${F.label};
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${C.gMid};
    margin-bottom: 8px;
  }

  .nt__member__name {
    font-family: ${F.display};
    font-size: 24px;
    font-weight: 600;
    color: ${C.gDeep};
    margin-bottom: 10px;
  }

  .nt__member__desc {
    font-family: ${F.body};
    font-size: 15px;
    font-weight: 400;
    color: #6B7060;
    line-height: 1.7;
  }

  /* ── CTA SECTION (Contact Page Style Card) ── */
  .nt__cta {
    background: rgba(6,18,3,0.88);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 60px 48px;
    text-align: center;
    border: 1px solid rgba(125,200,50,0.14);
    box-shadow: 0 8px 48px rgba(0,0,0,0.38);
  }

  @media (max-width: 600px) {
    .nt__cta {
      padding: 44px 24px;
    }
  }

  .nt__cta__eyebrow {
    font-family: ${F.label};
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${C.gLeaf};
    margin-bottom: 18px;
  }

  .nt__cta__title {
    font-family: ${F.display};
    font-size: clamp(32px, 4.5vw, 48px);
    font-weight: 700;
    font-style: italic;
    color: #fff;
    margin-bottom: 8px;
    letter-spacing: -0.01em;
  }

  .nt__cta__rule {
    width: 36px;
    height: 1px;
    background: ${C.gold};
    margin: 18px auto;
  }

  .nt__cta__desc {
    font-family: ${F.body};
    font-size: 17px;
    font-weight: 400;
    color: rgba(255,255,255,0.65);
    margin-bottom: 32px;
    max-width: 460px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.8;
  }

  .nt__cta__btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, ${C.gLeaf}, ${C.gMid});
    color: ${C.gDeep};
    border: none;
    border-radius: 12px;
    padding: 16px 38px;
    cursor: pointer;
    transition: all 0.25s ease;
    font-weight: 700;
  }

  .nt__cta__btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px ${C.gLeaf}48;
  }

  .nt__cta__btn__label {
    font-family: ${F.label};
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${C.gDeep};
  }

  .nt__cta__btn__arrow {
    font-family: ${F.body};
    font-size: 17px;
    color: ${C.gDeep};
  }
`;

/* ─────────────── MAIN COMPONENT ─────────────── */
export default function AboutUsPage() {
  const router = useRouter();

  const values = [
    {
      icon: "🏔️",
      title: "Authentic Experiences",
      desc: "No tourist traps. We show you the real magic of each destination.",
    },
    {
      icon: "💚",
      title: "Transparent Pricing",
      desc: "What you see is what you pay. No hidden charges, ever.",
    },
    {
      icon: "🤝",
      title: "24/7 Local Support",
      desc: "Our Coimbatore team is always a call away, before and during your trip.",
    },
    {
      icon: "🌿",
      title: "Sustainable Travel",
      desc: "We partner with eco-friendly stays and promote responsible tourism.",
    },
  ];

  const stats = [
    { num: "8,500+", label: "Happy Travellers" },
    { num: "50+", label: "Curated Packages" },
    { num: "12+", label: "Years Experience" },
    { num: "4.9 ★", label: "Average Rating" },
  ];

  const team = [
    {
      name: "Arun Kumar",
      role: "Founder & Travel Curator",
      desc: "10+ years exploring the Western Ghats. Personalises every itinerary.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop",
    },
    {
      name: "Priya Rajan",
      role: "Customer Experience Lead",
      desc: "Ensures every traveller feels at home. Loves Kodaikanal the most.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fit=crop",
    },
    {
      name: "Senthil M",
      role: "Operations & Taxi Coordinator",
      desc: "Manages our fleet of 50+ vehicles. Always on time, every time.",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&fit=crop",
    },
    {
      name: "Divya S",
      role: "Destination Specialist",
      desc: "Knows every hidden gem in Ooty and Munnar. Your insider guide.",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&fit=crop",
    },
  ];

  return (
    <div className="nt__about">
      <style>{ABOUT_CSS}</style>

      {/* Global Background */}
      <div className="nt__global-bg" />
      <div className="nt__global-overlay" />

      <div className="nt__content">
        {/* Hero Section */}
        <div className="nt__hero">
          <div className="nt__container">
            <div className="nt__hero__content">
              <div className="nt__hero__eyebrow">
                <span className="nt__hero__eyebrow__dot" />
                <span className="nt__hero__eyebrow__text">
                  Nature Trails · Est. Coimbatore
                </span>
              </div>
              <h1 className="nt__hero__title">
                Crafting Memories
                <br />
                <strong>Through the Misty Mountains</strong>
              </h1>
              <div className="nt__hero__rule" />
              <p className="nt__hero__sub">
                From Coimbatore to the clouds — connecting travellers with the
                soul of South India&apos;s hill stations since day one.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="nt__section">
          <div className="nt__container">
            <div className="nt__story__grid">
              <div>
                <div className="nt__story__eyebrow">
                  <span className="nt__story__eyebrow__line" />
                  <span className="nt__story__eyebrow__text">Who We Are</span>
                </div>
                <h2 className="nt__story__title">
                  Your Gateway to the
                  <br />
                  Western Ghats
                </h2>
                <p className="nt__story__body">
                  Founded in Coimbatore, <strong>Nature Trails</strong> was born
                  from a simple belief — that travel should be effortless,
                  authentic, and soul-stirring. We saw countless travellers
                  struggling with unreliable bookings, hidden costs, and
                  generic itineraries. So we decided to change that.
                </p>
                <p className="nt__story__body">
                  Today, we&apos;re proud to be{" "}
                  <strong>Coimbatore&apos;s most trusted travel partner</strong> for
                  Ooty, Kodaikanal, Munnar, and beyond. Every package we craft,
                  every taxi we arrange, every hotel we recommend comes from
                  personal experience and genuine care for our guests.
                </p>
                <p className="nt__story__body">
                  Whether you&apos;re planning a <strong>romantic honeymoon</strong>,{" "}
                  a <strong>fun-filled family getaway</strong>, or a{" "}
                  <strong>solo adventure into the clouds</strong> — we&apos;re here
                  to make it happen, seamlessly.
                </p>
              </div>
              <div className="nt__story__img">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&fit=crop"
                  alt="Misty hills of Kodaikanal"
                  width={800}
                  height={600}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="nt__container">
          <div className="nt__divider" />
        </div>

        {/* Values Section */}
        <div className="nt__section nt__section--tight">
          <div className="nt__container">
            <div className="nt__values">
              <div className="nt__values__header">
                <h3 className="nt__values__header__title">What Drives Us</h3>
                <p className="nt__values__header__sub">
                  Core values that shape every journey we create
                </p>
              </div>
              <div className="nt__values__grid">
                {values.map((v, i) => (
                  <div key={i} className="nt__value">
                    <div className="nt__value__icon">{v.icon}</div>
                    <h4 className="nt__value__title">{v.title}</h4>
                    <p className="nt__value__desc">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="nt__section nt__section--tight">
          <div className="nt__container">
            <div className="nt__stats">
              {stats.map((s, i) => (
                <div key={i} className="nt__stat">
                  <div className="nt__stat__num">{s.num}</div>
                  <div className="nt__stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="nt__section nt__section--tight">
          <div className="nt__container">
            <div className="nt__team__header">
              <h3 className="nt__team__header__title">
                The Faces Behind the Magic
              </h3>
              <p className="nt__team__header__sub">
                Meet your travel experts from Coimbatore
              </p>
            </div>
            <div className="nt__team__grid">
              {team.map((m, i) => (
                <div key={i} className="nt__member">
                  <Image
                    src={m.img}
                    alt={m.name}
                    width={400}
                    height={300}
                    className="nt__member__img"
                  />
                  <div className="nt__member__body">
                    <div className="nt__member__role">{m.role}</div>
                    <h4 className="nt__member__name">{m.name}</h4>
                    <p className="nt__member__desc">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="nt__section nt__section--tight">
          <div className="nt__container">
            <div className="nt__cta">
              <p className="nt__cta__eyebrow">Begin Your Journey</p>
              <h3 className="nt__cta__title">Ready to Explore the Hills?</h3>
              <div className="nt__cta__rule" />
              <p className="nt__cta__desc">
                Let&apos;s craft your perfect getaway — from Coimbatore to the
                clouds.
              </p>
              <button
                className="nt__cta__btn"
                onClick={() => router.push("/")}
              >
                <span className="nt__cta__btn__label">Plan Your Trip</span>
                <span className="nt__cta__btn__arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}