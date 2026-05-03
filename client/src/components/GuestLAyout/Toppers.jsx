import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_API_URL } from "../../BaseAPI";
import Aos from "aos";

/* ============================================================
   SVG ICONS — no emojis anywhere
============================================================ */
const IconTrophy = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4a2 2 0 0 1-2-2V5h4"/>
    <path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/>
    <path d="M6 9c0 4.97 2.686 9 6 9s6-4.03 6-9"/>
    <path d="M9 21h6"/><path d="M12 18v3"/><path d="M8 21h8"/>
  </svg>
);

const IconMedal = ({ size = 12, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="15" r="5"/>
    <polyline points="8.56 2.9 7 7 12 10 17 7 15.44 2.9"/>
  </svg>
);

const IconStar = ({ size = 14, color = "currentColor", filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill={filled ? color : "none"} stroke={color} strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconGraduate = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const IconChevronRight = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const IconBoy = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/>
    <path d="M16 3l4 4-4 4"/><path d="M20 7H14"/>
  </svg>
);

const IconGirl = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/>
    <path d="M12 14v4"/><path d="M10 18h4"/>
  </svg>
);

/* ============================================================
   CONSTANTS
============================================================ */
const DEFAULT_IMAGE = "https://res.cloudinary.com/dj4tc4ih1/image/upload/v1777741577/user_profile_images/falnxki60bnselmoyetb.jpg";

/* ============================================================
   HELPERS
============================================================ */
const getAcademicYear = () => {
  const y = new Date().getFullYear();
  return new Date().getMonth() >= 5 ? y.toString() : (y - 1).toString();
};

const rankMeta = (r) => ({
  cls:   r === 1 ? "rk-gold" : r === 2 ? "rk-silver" : r === 3 ? "rk-bronze" : "rk-plain",
  label: r === 1 ? "1st" : r === 2 ? "2nd" : r === 3 ? "3rd" : `#${r}`,
});

/* ── NEW: format percentage or CGPA based on value ── */
const formatScore = (value) => {
  if (value == null) return null;
  return value < 10 ? `${value} CGPA` : `${value}%`;
};

/* ============================================================
   INTERSECTION OBSERVER HOOK
============================================================ */
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
  }, [threshold]);
  return [ref, vis];
};

/* ============================================================
   MAIN COMPONENT
============================================================ */
const Toppers = () => {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selYear, setSelYear] = useState(getAcademicYear());
  const [selSem,  setSelSem]  = useState(null);
  const [apiError, setApiError] = useState(false);

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

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/topper`);
        const data = res.data?.data || [];
        setToppers(data);
        if (!data.length) setApiError(true);
      } catch {
        setApiError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const years = [...new Set(toppers.map((t) => t.year))].sort((a, b) => b - a);
  const currentYear = getAcademicYear();

  useEffect(() => {
    if (!years.length) return;
    const match = years.find((y) => y === currentYear) ?? years[0];
    setSelYear(match);
  }, [years.join(",")]); // eslint-disable-line

  const yearData = toppers.filter((t) => t.year === selYear);

  const bestStudents = yearData.filter(
    (t) => t.topperType === "best boy/girl of the college"
  );

  const semesterGroups = {};
  yearData
    .filter((t) => t.topperType === "Sem topper")
    .sort((a, b) => a.rank - b.rank)
    .forEach((t) => {
      semesterGroups[t.semester] ??= [];
      semesterGroups[t.semester].push(t);
    });
  const semesters = Object.keys(semesterGroups).sort((a, b) => +a - +b);

  const universityToppers = toppers
    .filter((t) => t.topperType === "university topper")
    .sort((a, b) => a.year !== b.year ? b.year - a.year : a.rank - b.rank);

  useEffect(() => {
    if (semesters.length && !selSem) setSelSem(semesters[0]);
  }, [selYear, toppers]); // eslint-disable-line

  const activeSem = selSem || semesters[0] || null;

  const handleYearChange = (y) => {
    setSelYear(y);
    setSelSem(null);
  };

  const isEmpty = !universityToppers.length && !bestStudents.length && !semesters.length;

  return (
    <div className="tp-root">
      <Hero year={selYear} />

      {years.length > 1 && (
        <YearFilter
          years={years}
          selYear={selYear}
          currentYear={currentYear}
          onChange={handleYearChange}
        />
      )}

      {loading ? <SkeletonLoader /> : apiError ? <NoData /> : (
        <main className="tp-main">

          {/* 1. University Rank Holders */}
          {universityToppers.length > 0 && (
            <Section icon={<IconGraduate size={16} color="#9a7c2c" />} title="University Rank Holders">
              <RankGrid list={universityToppers} showSemMeta />
            </Section>
          )}

          {/* 2. Best Boy & Best Girl */}
          {bestStudents.length > 0 && (
            <Section icon={<IconStar size={16} color="#9a7c2c" filled />} title="Best Boy & Best Girl">
              <div className="tp-centered-grid">
                {bestStudents.map((t, i) => (
                  <BestCard key={t._id} topper={t} delay={i * 0.14} />
                ))}
              </div>
            </Section>
          )}

          {/* 3. Semester Toppers */}
          {semesters.length > 0 && (
            <Section icon={<IconTrophy size={16} color="#9a7c2c" />} title="Semester Toppers">
              <div className="tp-sem-tabs">
                {semesters.map((s) => (
                  <button
                    key={s}
                    className={`tp-sem-tab${s === activeSem ? " tp-sem-tab--active" : ""}`}
                    onClick={() => setSelSem(s)}
                  >Semester {s}</button>
                ))}
              </div>
              <RankGrid list={semesterGroups[activeSem] || []} showSemMeta={false} />
            </Section>
          )}

          {isEmpty && <NoData />}
        </main>
      )}

      <Styles />
    </div>
  );
};

/* ============================================================
   HERO
============================================================ */
const Hero = ({ year }) => {
  const [ref, vis] = useReveal(0.05);
  return (
    <header className={`tp-hero${vis ? " tp-hero--vis" : ""}`} ref={ref}>
      <div className="tp-hero-bg" aria-hidden>
        {[...Array(7)].map((_, i) => (
          <div key={i} className="tp-vline" style={{ left: `${(i + 1) * 12.5}%`, animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>

      <div className="tp-hero-inner">
        <div className="tp-hero-chip" style={{ animationDelay: ".1s" }}>
          <IconTrophy size={13} color="#9a7c2c" />
          <span>Academic Excellence — {year}</span>
        </div>

        <h1 className="tp-hero-title" style={{ animationDelay: ".22s" }}>
          <span className="tp-word">Honoring</span>{" "}
          <em className="tp-word tp-word--gold">Our Best</em>
        </h1>

        <p className="tp-hero-sub" style={{ animationDelay: ".38s" }}>
          Recognising students who set benchmarks of dedication,
          discipline and outstanding academic performance.
        </p>

        <div className="tp-ornament" style={{ animationDelay: ".5s" }} aria-hidden>
          <svg viewBox="0 0 280 6" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="3" x2="110" y2="3" stroke="#ddd8ce" strokeWidth="1"/>
            <circle cx="140" cy="3" r="3" fill="#c9a84c"/>
            <circle cx="128" cy="3" r="1.5" fill="#ddd8ce"/>
            <circle cx="152" cy="3" r="1.5" fill="#ddd8ce"/>
            <line x1="170" y1="3" x2="280" y2="3" stroke="#ddd8ce" strokeWidth="1"/>
          </svg>
        </div>
      </div>
    </header>
  );
};

/* ============================================================
   YEAR FILTER
============================================================ */
const YearFilter = ({ years, selYear, currentYear, onChange }) => (
  <div className="tp-year-bar">
    <span className="tp-year-label">Academic Year</span>
    <div className="tp-year-pills">
      {years.map((y) => (
        <button
          key={y}
          className={`tp-year-pill${y === selYear ? " tp-year-pill--active" : ""}`}
          onClick={() => onChange(y)}
        >
          {y === currentYear ? `${y} — Current` : y}
          <IconChevronRight size={11} />
        </button>
      ))}
    </div>
  </div>
);

/* ============================================================
   SECTION
============================================================ */
const Section = ({ icon, title, children }) => {
  const [ref, vis] = useReveal(0.08);
  return (
    <section
      className={`tp-section${vis ? " tp-section--vis" : ""}`}
      ref={ref}
    >
      <div className="tp-sec-head">
        <div className="tp-sec-icon">{icon}</div>
        <h2 className="tp-sec-title">{title}</h2>
        <div className="tp-sec-rule" />
      </div>
      {children}
    </section>
  );
};

/* ============================================================
   RANK GRID
============================================================ */
const RankGrid = ({ list, showSemMeta }) => {
  const rankCount = {};
  list.forEach((t) => { if (t.rank) rankCount[t.rank] = (rankCount[t.rank] || 0) + 1; });
  return (
    <div className="tp-rank-grid">
      {list.map((t, i) => (
        <TopperCard
          key={t._id} topper={t}
          isShared={rankCount[t.rank] > 1}
          showSemMeta={showSemMeta}
          delay={i * 0.08}
        />
      ))}
    </div>
  );
};

/* ============================================================
   BEST CARD
============================================================ */
const BestCard = ({ topper: t, delay }) => {
  const label = t.gender === "boy" ? "Best Boy" : "Best Girl";
  const GIcon = t.gender === "boy" ? IconBoy : IconGirl;

  return (
    <div className="tp-best-card" style={{ animationDelay: `${delay}s` }}>
      <div className="tp-best-img">
        <img
          src={t.photo || DEFAULT_IMAGE}
          alt={t.studentName}
          onError={(e) => {
            if (e.currentTarget.src !== DEFAULT_IMAGE) {
              e.currentTarget.src = DEFAULT_IMAGE;
            }
          }}
        />
        <div className="tp-img-sheen" />
      </div>
      <div className="tp-best-info">
        <div className="tp-badge-row">
          <span className="tp-gold-badge">
            <IconStar size={11} color="#9a7c2c" filled />
            <GIcon size={11} />
            {label}
          </span>
        </div>
        <div className="tp-card-name">{t.studentName}</div>
        {/* ── CHANGED: show CGPA if value < 10, else show % ── */}
        {t.percentage != null && (
          <div className="tp-card-pct">{formatScore(t.percentage)}</div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   TOPPER CARD
============================================================ */
const TopperCard = ({ topper: t, isShared, showSemMeta, delay }) => {
  const { cls, label } = rankMeta(t.rank);
  return (
    <div className={`tp-topper-card ${cls}`} style={{ animationDelay: `${delay}s` }}>
      <div className="tp-topper-img">
        <img
          src={t.photo || DEFAULT_IMAGE}
          alt={t.studentName}
          onError={(e) => {
            if (e.currentTarget.src !== DEFAULT_IMAGE) {
              e.currentTarget.src = DEFAULT_IMAGE;
            }
          }}
        />
        <div className="tp-img-sheen" />
        {t.rank && (
          <div className={`tp-rank-chip ${cls}`}>
            <IconMedal size={10} color="currentColor" />
            <span>{label} rank</span>
          </div>
        )}
      </div>
      <div className="tp-topper-info">
        <div className="tp-card-name">{t.studentName}</div>
        {/* ── CHANGED: show CGPA if value < 10, else show % ── */}
        {t.percentage != null && (
          <div className="tp-card-pct">{formatScore(t.percentage)}</div>
        )}
        {showSemMeta && t.semester && (
          <div className="tp-card-meta">Sem {t.semester} · {t.year}</div>
        )}
        {showSemMeta && !t.semester && t.year && (
          <div className="tp-card-meta">{t.year}</div>
        )}
        {isShared && (
          <div className="tp-shared">
            <IconStar size={9} color="#9a7c2c" />
            Shared Rank
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   NO DATA
============================================================ */
const IconInbox = ({ size = 48, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
);

const NoData = () => (
  <div className="tp-nodata">
    <div className="tp-nodata-icon">
      <IconInbox size={40} color="#c9a84c" />
    </div>
    <h3 className="tp-nodata-title">Toppers Data Not Added By College</h3>
    <p className="tp-nodata-sub">
      The college administration has not published topper records yet.
      Please check back later.
    </p>
  </div>
);

/* ============================================================
   SKELETON
============================================================ */
const SkeletonLoader = () => (
  <div className="tp-skeleton-wrap">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="tp-skeleton-card" style={{ animationDelay: `${i * 0.12}s` }}>
        <div className="tp-skeleton-img" />
        <div className="tp-skeleton-body">
          <div className="tp-skeleton-bar tp-skeleton-bar--lg" />
          <div className="tp-skeleton-bar tp-skeleton-bar--sm" />
        </div>
      </div>
    ))}
  </div>
);

/* ============================================================
   STYLES
============================================================ */
const Styles = () => (
  <style>{`

    /* ── TOKENS ── */
    .tp-root {
      --white:      #ffffff;
      --off:        #faf9f7;
      --off2:       #f2efea;
      --border:     #e8e3da;
      --border2:    #d6d0c5;
      --text:       #18160f;
      --muted:      #6e6a60;
      --gold:       #c9a84c;
      --gold-lt:    #f5edda;
      --gold-dk:    #7a5e18;
      --sh-sm:      0 2px 14px rgba(0,0,0,.055);
      --sh-md:      0 8px 32px rgba(0,0,0,.10);
      --sh-lg:      0 20px 64px rgba(0,0,0,.14);
      --r:          16px;
      --r-sm:       8px;

      background: var(--white);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* ── HERO ── */
    .tp-hero {
      position: relative;
      text-align: center;
      padding: 90px 24px 72px;
      background: linear-gradient(175deg, #faf9f7 0%, #fff 55%);
      overflow: hidden;
    }

    .tp-hero-bg { position: absolute; inset: 0; pointer-events: none; }
    .tp-vline {
      position: absolute; top: 0; width: 1px; height: 100%;
      background: linear-gradient(180deg, transparent, rgba(201,168,76,.13) 40%, transparent);
      transform: scaleY(0); transform-origin: top;
      animation: tp-lineGrow 1.4s cubic-bezier(.22,1,.36,1) both;
    }
    @keyframes tp-lineGrow { to { transform: scaleY(1); } }

    .tp-hero-inner > * {
      opacity: 0; transform: translateY(18px);
      animation: tp-fadeUp .75s cubic-bezier(.22,1,.36,1) both;
    }

    .tp-hero-chip {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 6px 18px; border-radius: 999px;
      border: 1px solid var(--gold-lt);
      background: #fffdf5;
      font-size: 11.5px; font-weight: 600;
      text-transform: uppercase; letter-spacing: .09em;
      color: var(--gold-dk); margin-bottom: 28px;
    }

    .tp-hero-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(44px, 8vw, 84px);
      font-weight: 700; line-height: 1.08;
      letter-spacing: -.025em; color: var(--text);
      margin-bottom: 22px;
    }
    .tp-word--gold { font-style: italic; color: var(--gold); }

    .tp-hero-sub {
      font-size: clamp(14px, 2vw, 16px);
      color: var(--muted); max-width: 460px;
      margin: 0 auto 36px; line-height: 1.75;
      font-weight: 300;
    }

    .tp-ornament { width: 280px; max-width: 80%; margin: 0 auto; }
    .tp-ornament svg { width: 100%; display: block; }

    /* ── YEAR BAR ── */
    .tp-year-bar {
      display: flex; flex-wrap: wrap; align-items: center;
      gap: 10px; justify-content: center;
      padding: 20px 20px 16px;
      border-bottom: 1px solid var(--border);
    }

    .tp-year-label {
      font-size: 10.5px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .12em;
      color: var(--muted);
    }
    .tp-year-pills { display: flex; flex-wrap: wrap; gap: 6px; }
    .tp-year-pill {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 7px 16px; border-radius: 999px;
      border: 1.5px solid var(--border2);
      background: var(--white); color: var(--muted);
      font-size: 13px; font-weight: 500; cursor: pointer;
      transition: all .22s ease;
    }
    .tp-year-pill:hover {
      border-color: var(--gold); color: var(--gold-dk);
      background: #fffdf5; box-shadow: 0 0 0 3px rgba(201,168,76,.08);
    }
    .tp-year-pill--active {
      background: var(--text); border-color: var(--text);
      color: #fff; box-shadow: var(--sh-sm);
    }

    /* ── MAIN ── */
    .tp-main { max-width: 1060px; margin: 0 auto; padding: 60px 20px 100px; }

    /* ── SECTION ── */
    .tp-section {
      margin-bottom: 76px;
      opacity: 0; transform: translateY(30px);
      transition: opacity .75s ease, transform .75s ease;
    }
    .tp-section--vis { opacity: 1; transform: translateY(0); }

    .tp-sec-head {
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 32px;
    }
    .tp-sec-icon {
      width: 36px; height: 36px; border-radius: 10px;
      background: var(--gold-lt);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .tp-sec-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(22px, 3.5vw, 30px);
      font-weight: 700; color: var(--text); margin: 0;
      white-space: nowrap;
    }
    .tp-sec-rule {
      flex: 1; height: 1px;
      background: linear-gradient(90deg, var(--border2), transparent);
    }

    /* ── SEM TABS ── */
    .tp-sem-tabs {
      display: flex; flex-wrap: wrap; gap: 6px;
      margin-bottom: 28px;
    }
    .tp-sem-tab {
      padding: 6px 16px; border-radius: var(--r-sm);
      border: 1.5px solid var(--border);
      background: var(--white); color: var(--muted);
      font-size: 12.5px; font-weight: 600; cursor: pointer;
      transition: all .2s ease;
    }
    .tp-sem-tab:hover { border-color: var(--gold); color: var(--gold-dk); }
    .tp-sem-tab--active {
      background: var(--text); border-color: var(--text); color: #fff;
    }

    /* ── CENTERED GRID (Best cards) ── */
    .tp-centered-grid {
      display: flex; flex-wrap: wrap;
      gap: 24px; justify-content: center;
    }

    /* ── BEST CARD ── */
    .tp-best-card {
      width: 215px; flex: 0 0 auto;
      border-radius: var(--r);
      border: 1px solid var(--border);
      background: var(--white);
      box-shadow: var(--sh-sm);
      overflow: hidden;
      transition: transform .38s cubic-bezier(.22,1,.36,1), box-shadow .38s ease;
      animation: tp-fadeUp .65s ease both;
      cursor: default;
    }
    .tp-best-card:hover {
      transform: translateY(-12px) scale(1.025);
      box-shadow: var(--sh-lg);
    }

    .tp-best-img {
      position: relative;
      height: 295px;
      background: var(--off2);
      overflow: hidden;
    }
    .tp-best-img img {
      width: 100%; height: 100%;
      object-fit: cover; object-position: top center;
      transition: transform .55s ease;
    }
    .tp-best-card:hover .tp-best-img img { transform: scale(1.07); }

    .tp-img-sheen {
      position: absolute; inset: 0;
      background: linear-gradient(
        120deg, transparent 25%,
        rgba(255,255,255,.22) 50%,
        transparent 75%
      );
      transform: translateX(-110%);
      transition: transform .65s ease;
      pointer-events: none;
    }
    .tp-best-card:hover .tp-img-sheen,
    .tp-topper-card:hover .tp-img-sheen { transform: translateX(110%); }

    .tp-best-info {
      padding: 14px 16px 18px;
      border-top: 1px solid var(--border);
    }
    .tp-badge-row { margin-bottom: 8px; }
    .tp-gold-badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 3px 10px; border-radius: 4px;
      background: var(--gold-lt); color: var(--gold-dk);
      font-size: 10.5px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .07em;
    }

    /* ── RANK GRID ── */
    .tp-rank-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(158px, 1fr));
      gap: 20px;
      justify-content: center;
    }

    /* ── TOPPER CARD ── */
    .tp-topper-card {
      border-radius: var(--r);
      border: 1px solid var(--border);
      background: var(--white);
      box-shadow: var(--sh-sm);
      overflow: hidden;
      transition: transform .38s cubic-bezier(.22,1,.36,1), box-shadow .38s ease;
      animation: tp-fadeUp .6s ease both;
      cursor: default;
    }
    .tp-topper-card:hover {
      transform: translateY(-10px);
      box-shadow: var(--sh-md);
    }
    .tp-topper-card.rk-gold   { border-top: 3px solid var(--gold); }
    .tp-topper-card.rk-silver { border-top: 3px solid #a0a0a0; }
    .tp-topper-card.rk-bronze { border-top: 3px solid #a8722a; }

    .tp-topper-img {
      position: relative;
      height: 210px;
      background: var(--off2);
      overflow: hidden;
    }
    .tp-topper-img img {
      width: 100%; height: 100%;
      object-fit: cover; object-position: top center;
      transition: transform .55s ease;
    }
    .tp-topper-card:hover .tp-topper-img img { transform: scale(1.07); }

    /* ── RANK CHIP ── */
    .tp-rank-chip {
      position: absolute; bottom: 10px; left: 10px;
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 9px; border-radius: 999px;
      font-size: 11px; font-weight: 700;
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 8px rgba(0,0,0,.12);
    }
    .tp-rank-chip.rk-gold   { background: rgba(201,168,76,.9);  color: #3a2800; }
    .tp-rank-chip.rk-silver { background: rgba(175,175,175,.9); color: #111; }
    .tp-rank-chip.rk-bronze { background: rgba(168,114,42,.9);  color: #fff; }
    .tp-rank-chip.rk-plain  { background: rgba(240,237,232,.9); color: #555; }

    /* ── CARD TEXT ── */
    .tp-topper-info { padding: 12px 14px 16px; border-top: 1px solid var(--border); }
    .tp-card-name {
      font-size: 13.5px; font-weight: 600;
      color: var(--text); line-height: 1.3; margin-bottom: 4px;
    }
    .tp-card-pct {
      font-family: 'Cormorant Garamond', serif;
      font-size: 16px; font-weight: 700;
      color: var(--gold-dk); margin-bottom: 3px;
    }
    .tp-card-meta { font-size: 11px; color: var(--muted); margin-bottom: 3px; }
    .tp-shared {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 10.5px; font-weight: 600; color: var(--muted);
      background: var(--off2); border-radius: 4px;
      padding: 2px 8px; margin-top: 4px;
    }

    /* ── SKELETON ── */
    .tp-skeleton-wrap {
      display: flex; flex-wrap: wrap; gap: 20px;
      justify-content: center; padding: 60px 20px;
    }
    .tp-skeleton-card {
      width: 180px; border-radius: var(--r);
      border: 1px solid var(--border); overflow: hidden;
      animation: tp-pulse 1.8s ease-in-out infinite;
    }
    .tp-skeleton-img {
      height: 210px;
      background: linear-gradient(90deg, #f2efea 25%, #e8e3da 50%, #f2efea 75%);
      background-size: 400% 100%;
      animation: tp-shimmer 1.8s linear infinite;
    }
    .tp-skeleton-body { padding: 12px 14px 14px; }
    .tp-skeleton-bar {
      border-radius: 4px; background: #e8e3da; margin-bottom: 8px;
    }
    .tp-skeleton-bar--lg { height: 13px; }
    .tp-skeleton-bar--sm { height: 10px; width: 55%; }

    @keyframes tp-shimmer {
      0%   { background-position: -400% 0; }
      100% { background-position:  400% 0; }
    }
    @keyframes tp-pulse {
      0%, 100% { opacity: 1; } 50% { opacity: .7; }
    }

    /* ── NO DATA ── */
    .tp-nodata {
      display: flex; flex-direction: column; align-items: center;
      text-align: center; padding: 90px 24px 100px;
      animation: tp-fadeUp .6s ease both;
    }
    .tp-nodata-icon {
      width: 84px; height: 84px; border-radius: 50%;
      background: var(--gold-lt);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 24px;
      box-shadow: 0 0 0 12px rgba(201,168,76,.08);
    }
    .tp-nodata-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(20px, 4vw, 28px);
      font-weight: 700; color: var(--text);
      margin: 0 0 12px; line-height: 1.3;
    }
    .tp-nodata-sub {
      font-size: 14px; color: var(--muted);
      max-width: 340px; line-height: 1.7; margin: 0;
      font-weight: 300;
    }

    /* ── EMPTY ── */
    .tp-empty {
      text-align: center; padding: 80px 20px;
      color: var(--muted); font-size: 15px;
    }

    /* ── ANIMATIONS ── */
    @keyframes tp-fadeUp {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      .tp-rank-grid { grid-template-columns: repeat(auto-fill, minmax(145px, 1fr)); gap: 16px; }
    }

    @media (max-width: 600px) {
      .tp-hero { padding: 60px 18px 52px; }

      .tp-centered-grid { gap: 14px; }
      .tp-best-card { width: calc(50% - 7px); max-width: none; }
      .tp-best-img  { height: 240px; }

      .tp-rank-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      .tp-topper-img { height: 180px; }
      .tp-topper-info { padding: 10px 10px 12px; }
      .tp-card-name { font-size: 12px; }
      .tp-card-pct  { font-size: 14px; }

      .tp-year-bar { flex-direction: column; align-items: flex-start; padding: 14px 16px; }
      .tp-year-pills { overflow-x: auto; flex-wrap: nowrap; width: 100%; padding-bottom: 4px; }
      .tp-year-pill  { flex-shrink: 0; }

      .tp-sem-tabs { gap: 5px; }
      .tp-sem-tab  { font-size: 11.5px; padding: 5px 12px; }

      .tp-sec-title { font-size: 20px; }
    }

    @media (max-width: 360px) {
      .tp-best-img  { height: 190px; }
      .tp-topper-img { height: 150px; }
    }
  `}</style>
);

export default Toppers;