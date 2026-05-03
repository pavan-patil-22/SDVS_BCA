import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../BaseAPI";
import Aos from "aos";

const API_URL = `${BASE_API_URL}/placements`;

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dj4tc4ih1/image/upload/v1770733938/user_profile_images/xkg5nwjhsura49msluym.jpg";

const IconBuilding = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
);

const IconCoin = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v10M9.5 9.5C9.5 8.1 10.6 7 12 7s2.5 1.1 2.5 2.5S13.4 12 12 12s-2.5 1.1-2.5 2.5S10.6 17 12 17s2.5-1.1 2.5-2.5"/>
  </svg>
);

const IconGrad = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
};

const PlacementCard = ({ placement, index }) => {
  const [ref, vis] = useReveal(0.08);
  const delay = (index % 8) * 60;

  return (
    <article
      ref={ref}
      className={`gp-card${vis ? " gp-card--vis" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="gp-card-img-wrap">
        <img
          src={placement.image || FALLBACK_IMAGE}
          alt={placement.studentname}
          className="gp-card-img"
          onError={e => { e.currentTarget.src = FALLBACK_IMAGE; }}
          loading="lazy"
        />
        <div className="gp-card-shimmer" />
        <div className="gp-card-pkg-chip">
          <IconCoin />
          <span>{placement.package} LPA</span>
        </div>
      </div>

      <div className="gp-card-body">
        <h3 className="gp-card-name">{placement.studentname}</h3>
        <p className="gp-card-course">
          <IconGrad />
          {placement.course}
          {placement.batch && <span className="gp-card-batch">{placement.batch}</span>}
        </p>
        <p className="gp-card-company">
          <IconBuilding />
          {placement.company}
        </p>
      </div>
    </article>
  );
};

const GuestPlacementView = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const res = await axios.get(API_URL);
        setPlacements(res.data || []);
      } catch (err) {
        console.error("Error fetching placements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlacements();
  }, []);

  
 useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });
  }, []);


  return (
    <div className="gp-root">

      {/* ── HERO ── */}
      <header className="gp-hero">
        <div className="gp-hero-inner">
          <div className="gp-eyebrow">
            <IconStar /><span>Placement Achievements</span>
          </div>
          <h1 className="gp-hero-title">
            Our Placed <em>Students</em>
          </h1>
          <p className="gp-hero-sub">
            BCA graduates from SDVS securing roles at leading companies across India and beyond.
          </p>
        </div>
      </header>

      {/* ── CARDS ── */}
      <main className="gp-main">
        {loading ? (
          <div className="gp-skeleton-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="gp-skeleton-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="gp-skeleton-img" />
                <div className="gp-skeleton-body">
                  <div className="gp-skel-bar gp-skel-bar--lg" />
                  <div className="gp-skel-bar gp-skel-bar--md" />
                  <div className="gp-skel-bar gp-skel-bar--sm" />
                </div>
              </div>
            ))}
          </div>
        ) : placements.length === 0 ? (
          <div className="gp-empty">No placement records found.</div>
        ) : (
          <div className="gp-grid">
            {placements.map((p, i) => (
              <PlacementCard key={i} placement={p} index={i} />
            ))}
          </div>
        )}
      </main>

      <Styles />
    </div>
  );
};

const Styles = () => (
  <style>{`
    .gp-root {
      --ink:      #111111;
      --ink2:     #1c1c1c;
      --mist:     #f5f5f5;
      --mist2:    #ebebeb;
      --muted:    #888888;
      --border:   #e8e8e8;
      --border2:  #d4d4d4;
      --accent:   #d7ab0cfc;
      --accent-lt:#eff6ff;
      --teal:     #0f766e;
      --r:        14px;
      --r-sm:     8px;
      --sh-sm:    0 1px 4px rgba(0,0,0,.06);
      --sh-md:    0 6px 24px rgba(0,0,0,.10);

      background: #ffffff;
      color: var(--ink);
      overflow-x: hidden;
    }

    /* ── HERO ── */
    .gp-hero {
      background: #ffffff;
      border-bottom: 1px solid var(--border);
      padding: 48px 20px 32px;
      text-align: center;
    }
    .gp-hero-inner { max-width: 560px; margin: 0 auto; }

    .gp-eyebrow {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 11px; font-weight: 600; letter-spacing: .1em;
      text-transform: uppercase; color: var(--accent);
      margin-bottom: 16px;
      animation: gp-fadeUp .6s .1s both;
    }

    .gp-hero-title {
      font-size: clamp(28px, 6vw, 48px);
      font-weight: 700; line-height: 1.15;
      color: var(--ink); letter-spacing: -.02em;
      margin: 0 0 14px;
      animation: gp-fadeUp .6s .2s both;
    }
    .gp-hero-title em { font-style: italic; color: var(--accent); }

    .gp-hero-sub {
      font-size: clamp(13px, 2vw, 15px);
      color: var(--muted); line-height: 1.65;
      max-width: 380px; margin: 0 auto;
      animation: gp-fadeUp .6s .3s both;
    }

    /* ── MAIN GRID ── */
    .gp-main {
      max-width: 1200px; margin: 0 auto;
      padding: 28px 16px 80px;
    }
    .gp-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }

    /* ── CARD ── */
    .gp-card {
      border-radius: var(--r);
      border: 1px solid var(--border);
      background: #fff;
      overflow: hidden;
      opacity: 0; transform: translateY(20px);
      transition: opacity .5s ease, transform .5s ease,
                  box-shadow .3s ease;
      box-shadow: var(--sh-sm);
    }
    .gp-card--vis { opacity: 1; transform: translateY(0); }
    .gp-card:hover {
      box-shadow: var(--sh-md);
      transform: translateY(-5px);
      border-color: var(--border2);
    }

    .gp-card-img-wrap {
      position: relative; height: 200px; overflow: hidden;
      background: var(--mist);
    }
    .gp-card-img {
      width: 100%; height: 100%;
      object-fit: cover; object-position: top center;
      transition: transform .5s ease; display: block;
    }
    .gp-card:hover .gp-card-img { transform: scale(1.05); }

    .gp-card-shimmer {
      position: absolute; inset: 0;
      background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,.3) 50%, transparent 70%);
      transform: translateX(-110%);
      transition: transform .6s ease; pointer-events: none;
    }
    .gp-card:hover .gp-card-shimmer { transform: translateX(110%); }

    .gp-card-pkg-chip {
      position: absolute; bottom: 8px; left: 8px;
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: 999px;
      background: #fff;
      color: var(--ink2);
      font-size: 11px; font-weight: 700;
      border: 1px solid var(--border);
      box-shadow: 0 1px 4px rgba(0,0,0,.08);
    }

    .gp-card-body {
      padding: 13px 14px 16px;
      border-top: 1px solid var(--border);
      display: flex; flex-direction: column; gap: 6px;
    }
    .gp-card-name {
      font-size: 14px; font-weight: 600;
      color: var(--ink); line-height: 1.3; margin: 0;
    }
    .gp-card-course {
      display: flex; align-items: center; gap: 5px;
      font-size: 12px; color: var(--muted); margin: 0;
    }
    .gp-card-batch {
      margin-left: 3px; padding: 1px 6px;
      border-radius: 4px; background: var(--mist);
      color: var(--muted); font-size: 11px; font-weight: 600;
    }
    .gp-card-company {
      display: flex; align-items: center; gap: 5px;
      font-size: 12.5px; font-weight: 600;
      color: var(--teal); margin: 0;
    }

    /* ── SKELETON ── */
    .gp-skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
    .gp-skeleton-card {
      border-radius: var(--r); border: 1px solid var(--border); overflow: hidden;
    }
    .gp-skeleton-img {
      height: 200px;
      background: linear-gradient(90deg, var(--mist) 25%, var(--mist2) 50%, var(--mist) 75%);
      background-size: 400% 100%;
      animation: gp-shimmer 1.8s linear infinite;
    }
    .gp-skeleton-body { padding: 13px 14px; display: flex; flex-direction: column; gap: 9px; }
    .gp-skel-bar { height: 10px; border-radius: 4px; background: var(--mist2); }
    .gp-skel-bar--lg { width: 75%; height: 13px; }
    .gp-skel-bar--md { width: 55%; }
    .gp-skel-bar--sm { width: 40%; }

    /* ── EMPTY ── */
    .gp-empty {
      text-align: center; padding: 80px 20px;
      color: var(--muted); font-size: 15px;
    }

    /* ── KEYFRAMES ── */
    @keyframes gp-fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes gp-shimmer {
      0%   { background-position: -400% 0; }
      100% { background-position:  400% 0; }
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 640px) {
      .gp-hero { padding: 36px 16px 24px; }
      .gp-main { padding: 20px 12px 60px; }
      .gp-grid,
      .gp-skeleton-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      .gp-card-img-wrap { height: 160px; }
      .gp-skeleton-img  { height: 160px; }
      .gp-card-body { padding: 10px 11px 13px; }
      .gp-card-name { font-size: 13px; }
      .gp-card-course { font-size: 11px; }
      .gp-card-company { font-size: 11.5px; }
    }

    @media (max-width: 360px) {
      .gp-grid,
      .gp-skeleton-grid { gap: 10px; }
      .gp-card-img-wrap { height: 140px; }
      .gp-skeleton-img  { height: 140px; }
    }
  `}</style>
);

export default GuestPlacementView;