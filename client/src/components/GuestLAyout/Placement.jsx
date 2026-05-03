
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { FaBuilding, FaHandshake, FaMoneyBillWave } from "react-icons/fa";
// import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

// const API_URL = `${BASE_API_URL}/placements`;
// const IMG_URL = ``;
// const FALLBACK_IMAGE = "https://res.cloudinary.com/dj4tc4ih1/image/upload/v1770733938/user_profile_images/xkg5nwjhsura49msluym.jpg";

// const COMPANY_LOGOS = [
//   "https://mms.businesswire.com/media/20190123005482/en/594194/23/Wiprologo1.jpg",
//   "https://indiancompanies.in/wp-content/uploads/2020/05/TCS-Logo-Tata-consultancy-service-1920x1144.png",
//   "https://logowik.com/content/uploads/images/cognizant-new-20223302.jpg",
//   "https://pngimg.com/uploads/ibm/ibm_PNG19658.png",
//   "https://wallpaperaccess.com/full/6578146.png",
// ];

// const Placement = () => {
//   const [placements, setPlacements] = useState([]);

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: "ease-in-out",
//       once: false,
//     });

//     const fetchPlacements = async () => {
//       try {
//         const res = await axios.get(API_URL);
//         setPlacements(res.data);
//       } catch (err) {
//         console.error("Error fetching placements:", err);
//       }
//     };
//     fetchPlacements();
//   }, []);

//   return (
//     <div className="placement-container">
//       {/* Placement Info Section */}
//       <div className="placement-row" data-aos="fade-up">
//         <div className="placement-left">
//           <h2>🚀 100% Placements</h2>
//           <p>
//             SDVS'S BCA College invites recruiters from across the globe. 
//           </p>
//           <p>
//             Our
//             students are future-ready, skilled, and committed to excellence.
//           </p>
//         </div>
//         <div className="placement-right">
//           <button className="placement-know-more-btn"
//           onClick={() => window.location.href = '/placements'}
//           >KNOW MORE</button>
//           <div className="placement-percent-box">
//             <span className="placement-percentage">100%</span>
//             <div className="placement-percent-text">
//               Placement Rate <br /> Over the Years
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Auto Scroll Placement Cards */}
//       <div className="placement-marquee">
//         <div className="placement-marquee-content">
//           {placements.concat(placements).map((placement, index) => (
//             <div
//               className="placement-marquee-card"
//               key={index}
//               data-aos="fade-up"
//               data-aos-delay={index % 6 * 100}
//             >
//               {placement.image && (
//                 <img
//                   src={`${IMG_URL}${placement.image}`}
//                   alt={placement.studentname}
//                   className="placement-marquee-img"
//                   onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
//                 />
//               )}
//               <h3 className="placement-student-name">
//                 {placement.studentname}, {placement.course} ({placement.batch})
//               </h3>
//               <p className="placement-company">
//                 <FaBuilding /> {placement.company}
//               </p>
//               <p className="placement-package">
//                 <FaMoneyBillWave /> {placement.package} LPA
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Recruiters Section */}
//       <div className="placement-recruiters-section" data-aos="fade-up">
//         <h2>
//           <FaHandshake /> Some of Our Esteemed Recruiters
//         </h2>
//         <div className="placement-recruiters-marquee">
//           <div className="placement-recruiters-content">
//             {COMPANY_LOGOS.concat(COMPANY_LOGOS).map((logo, index) => (
//               <div className="placement-logo-card" key={index}>
//                 <img src={logo} alt={`Recruiter-${index}`} onError={(e) => { e.target.src = FALLBACK_IMAGE; }} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CSS Styling */}
//       <style jsx>{`
//         /* --- Placement Info Section --- */
//         .placement-row {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           background: linear-gradient(135deg, #014d5a, #013b45);
//           color: white;
//           padding: 30px 40px;
//           margin: 0 auto 30px;
//           box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
//         }
//         .placement-left h2 {
//           margin: 0;
//           font-size: 32px;
//           font-weight: 800;
//           color: #ffcc00;
//         }
//         .placement-left p {
//           margin: 10px 0 0;
//           font-size: 16px;
//           opacity: 0.9;
//           line-height: 1.4;
//         }
//         .placement-right {
//           display: flex;
//           align-items: center;
//           gap: 25px;
//         }
//         .placement-percent-box {
//           background: white;
//           color: #014d5a;
//           padding: 18px 24px;
//           border-radius: 10px;
//           text-align: center;
//           box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
//         }
//         .placement-percentage {
//           font-size: 34px;
//           font-weight: 800;
//           color: #ff8c00;
//         }
//         .placement-percent-text {
//           font-size: 14px;
//           font-weight: 600;
//           margin-top: 5px;
//         }
//         .placement-know-more-btn {
//           background: #ff8c00;
//           color: white;
//           border: none;
//           padding: 12px 24px;
//           font-size: 15px;
//           font-weight: bold;
//           cursor: pointer;
//           border-radius: 8px;
//           transition: 0.3s ease;
//         }
//         .placement-know-more-btn:hover {
//           background: #e67e00;
//           transform: translateY(-2px);
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
//         }

//         /* Responsive Info Section */
//         @media (max-width: 768px) {
//           .placement-row {
//             flex-direction: column;
//             text-align: center;
//             gap: 20px;
//             padding: 20px;
//           }
//           .placement-right {
//             flex-direction: column-reverse;
//           }
//         }

//         /* --- Placement Marquee --- */
//         .placement-marquee {
//           overflow: hidden;
//           white-space: nowrap;
//           width: 100%;
//           background: #f9f9f9;
//           padding: 20px 0;
//         }
//         .placement-marquee-content {
//           display: inline-flex;
//           gap: 30px;
//           animation: placement-marquee-left 25s linear infinite;
//         }
//         .placement-marquee-card {
//           flex: 0 0 auto;
//           text-align: center;
//           background: #fff;
//           border-radius: 12px;
//           padding: 15px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//           min-width: 250px;
//         }
//         .placement-marquee-img {
//           width: 200px;
//           height: 230px;
//           object-fit: cover;
//           border-radius: 12px;
//           margin-bottom: 10px;
//         }
//         .placement-student-name {
//           font-size: 16px;
//           font-weight: bold;
//           margin-bottom: 8px;
//         }
//         .placement-company,
//         .placement-package {
//           font-size: 14px;
//           margin: 4px 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 6px;
//         }
//         @keyframes placement-marquee-left {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         /* --- Recruiters Section --- */
//         .placement-recruiters-section {
//           width: 100%;
//           text-align: center;
//           margin: 40px 0;
//         }
//         .placement-recruiters-section h2 {
//           font-size: 26px;
//           font-weight: 700;
//           color: #014d5a;
//           margin-bottom: 20px;
//         }
//         .placement-recruiters-marquee {
//           overflow: hidden;
//           white-space: nowrap;
//           width: 100%;
//           background: #ffffff;
//           padding: 15px 0;
//         }
//         .placement-recruiters-content {
//           display: inline-flex;
//           gap: 50px;
//           animation: placement-marquee-right 25s linear infinite;
//         }
//         .placement-logo-card img {
//           height: 50px;
//           object-fit: contain;
//           filter: grayscale(20%);
//           transition: transform 0.3s ease;
//         }
//         .placement-logo-card img:hover {
//           transform: scale(1.1);
//           filter: none;
//         }
//         @keyframes placement-marquee-right {
//           0% {
//             transform: translateX(-50%);
//           }
//           100% {
//             transform: translateX(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Placement;
import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBuilding, FaHandshake, FaMoneyBillWave, FaUserGraduate, FaArrowRight } from "react-icons/fa";
import { BASE_API_URL } from "../../BaseAPI";

const API_URL = `${BASE_API_URL}/placements`;
const IMG_URL = ``;
const FALLBACK_IMAGE = "https://res.cloudinary.com/dj4tc4ih1/image/upload/v1770733938/user_profile_images/xkg5nwjhsura49msluym.jpg";

const COMPANY_LOGOS = [
  "https://mms.businesswire.com/media/20190123005482/en/594194/23/Wiprologo1.jpg",
  "https://indiancompanies.in/wp-content/uploads/2020/05/TCS-Logo-Tata-consultancy-service-1920x1144.png",
  "https://logowik.com/content/uploads/images/cognizant-new-20223302.jpg",
  "https://pngimg.com/uploads/ibm/ibm_PNG19658.png",
  "https://wallpaperaccess.com/full/6578146.png",
];

const Placement = () => {
  const [placements, setPlacements] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
    const fetchPlacements = async () => {
      try {
        const res = await axios.get(API_URL);
        setPlacements(res.data);
      } catch (err) {
        console.error("Error fetching placements:", err);
      }
    };
    fetchPlacements();
  }, []);

  return (
    <div className="pl-wrap">

      {/* ── HERO BANNER ── */}
      <div className="pl-hero" data-aos="fade-up">
        <div className="pl-hero-left">
          <span className="pl-badge" data-aos="fade-right" data-aos-delay="100">
            <FaUserGraduate size={12} /> Placement Cell
          </span>
          <h2 className="pl-hero-title" data-aos="fade-right" data-aos-delay="200">
            100% Career Support & Placement Assistance
          </h2>
          <p className="pl-hero-desc" data-aos="fade-right" data-aos-delay="300">
            SDVS'S BCA College provides strong placement assistance, connecting students with recruiters across the globe. Our students are skilled, confident, and industry-ready.
          </p>
          <button
            className="pl-btn"
            onClick={() => window.location.href = '/placements'}
            data-aos="fade-right"
            data-aos-delay="400"
          >
            Know More <FaArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* ── MARQUEE — STUDENT CARDS ── */}
      <div className="pl-section-label" data-aos="fade-up">
        <span>Our Placed Students</span>
        <div className="pl-section-line" />
      </div>

      {placements.length > 0 && (
        <div
          className="pl-marquee"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className="pl-marquee-track"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {[...placements, ...placements].map((p, i) => (
              <div className="pl-card" key={i}>
                <div className="pl-card-img-wrap">
                  <img
                    src={`${IMG_URL}${p.image}`}
                    alt={p.studentname}
                    className="pl-card-img"
                    onError={e => { e.target.src = FALLBACK_IMAGE; }}
                  />
                  <div className="pl-card-pkg">
                    <FaMoneyBillWave size={11} />
                    <span>{p.package} LPA</span>
                  </div>
                </div>
                <div className="pl-card-body">
                  <h3 className="pl-card-name">{p.studentname}</h3>
                  <p className="pl-card-meta">
                    <FaUserGraduate size={11} />
                    {p.course} &middot; {p.batch}
                  </p>
                  <p className="pl-card-company">
                    <FaBuilding size={11} />
                    {p.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RECRUITERS ── */}
      <div className="pl-recruiters" data-aos="fade-up">
        <div className="pl-section-label">
          <span><FaHandshake size={15} style={{ marginRight: 6 }} />Esteemed Recruiters</span>
          <div className="pl-section-line" />
        </div>

        <div className="pl-logo-marquee">
          <div className="pl-logo-track">
            {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, i) => (
              <div className="pl-logo-card" key={i}>
                <img
                  src={logo}
                  alt={`recruiter-${i}`}
                  onError={e => { e.target.src = FALLBACK_IMAGE; }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Styles />
    </div>
  );
};

const Styles = () => (
  <style>{`
    /* ── TOKENS ── */
    .pl-wrap {
      --teal:      #014d5a;
      --teal-dk:   #013b45;
      --teal-lt:   #e6f4f6;
      --orange:    #ff8c00;
      --orange-dk: #e67e00;
      --gold:      #ffcc00;
      --white:     #ffffff;
      --off:       #f7f9fa;
      --border:    #e2e8ea;
      --muted:     #6b7f84;
      --text:      #1a2e33;
      --r:         14px;
      --r-sm:      8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: var(--white);
      color: var(--text);
      /* KEY FIX 1: contain overflow without isolating stacking context */
      overflow-x: clip;
    }

    /* ── HERO ── */
    .pl-hero {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      background: linear-gradient(135deg, var(--teal) 0%, var(--teal-dk) 100%);
      color: var(--white);
      padding: 52px 48px;
      position: relative;
      overflow: hidden;
    }
    .pl-hero::before {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 260px; height: 260px;
      border-radius: 50%;
      background: rgba(255,255,255,.05);
      pointer-events: none;
    }
    .pl-hero::after {
      content: '';
      position: absolute;
      bottom: -80px; left: 30%;
      width: 200px; height: 200px;
      border-radius: 50%;
      background: rgba(255,204,0,.07);
      pointer-events: none;
    }

    .pl-hero-left { flex: 1; position: relative; z-index: 1; }

    .pl-badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(255,255,255,.12);
      border: 1px solid rgba(255,255,255,.2);
      color: var(--gold);
      font-size: 11px; font-weight: 700;
      letter-spacing: .1em; text-transform: uppercase;
      padding: 5px 12px; border-radius: 999px;
      margin-bottom: 16px;
    }

    .pl-hero-title {
      font-size: clamp(28px, 5vw, 44px);
      font-weight: 800; line-height: 1.1;
      color: var(--gold);
      margin: 0 0 14px;
    }

    .pl-hero-desc {
      font-size: clamp(13px, 1.8vw, 15px);
      opacity: .85; line-height: 1.7;
      margin: 0 0 28px;
      max-width: 480px;
    }

    .pl-btn {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--orange);
      color: var(--white);
      border: none; border-radius: var(--r-sm);
      padding: 13px 26px;
      font-size: 14px; font-weight: 700;
      cursor: pointer; letter-spacing: .04em;
      transition: background .25s, transform .25s, box-shadow .25s;
    }
    .pl-btn:hover {
      background: var(--orange-dk);
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(255,140,0,.35);
    }
    .pl-btn:active { transform: translateY(0); }

    /* ── SECTION LABEL ── */
    .pl-section-label {
      display: flex; align-items: center; gap: 14px;
      padding: 28px 40px 10px;
      font-size: 14px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .1em;
      color: var(--teal);
    }
    .pl-section-line {
      flex: 1; height: 1px;
      background: linear-gradient(90deg, var(--border), transparent);
    }

    /* ── STUDENT MARQUEE ── */
    /*
      KEY FIXES for scroll jitter / overlap:
      1. Use "overflow: hidden" NOT clip — clip can cause compositing issues
      2. Remove "will-change" — forces GPU layer which bleeds over other elements
      3. Add "isolation: isolate" to contain the stacking context
      4. Use "transform: translate3d" in keyframes for smoother GPU compositing
      5. Add "backface-visibility: hidden" on the track to prevent paint flickering
    */
    .pl-marquee {
      overflow: hidden;
      background: var(--off);
      padding: 20px 0 28px;
      cursor: default;
      /* KEY FIX 2: isolate stacking context so it never bleeds behind siblings */
      isolation: isolate;
      position: relative;
      z-index: 0;
    }

    .pl-marquee-track {
      display: flex;
      gap: 20px;
      width: max-content;
      animation: pl-scroll-left 30s linear infinite;
      /* KEY FIX 3: backface prevents flicker during compositing */
      backface-visibility: hidden;
      /* KEY FIX 4: NO will-change here — it was creating a new stacking context
         that overlapped adjacent sections on scroll */
    }

    .pl-card {
      flex: 0 0 220px;
      width: 220px;
      background: var(--white);
      border-radius: var(--r);
      border: 1px solid var(--border);
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,.06);
      transition: transform .3s ease, box-shadow .3s ease;
    }
    .pl-card:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 14px 32px rgba(1,77,90,.15);
    }

    .pl-card-img-wrap {
      position: relative;
      height: 210px; overflow: hidden;
      background: var(--teal-lt);
    }
    .pl-card-img {
      width: 100%; height: 100%;
      object-fit: cover; object-position: top center;
      transition: transform .5s ease; display: block;
    }
    .pl-card:hover .pl-card-img { transform: scale(1.07); }

    .pl-card-pkg {
      position: absolute; bottom: 8px; left: 8px;
      display: inline-flex; align-items: center; gap: 5px;
      background: var(--teal);
      color: var(--white);
      font-size: 11px; font-weight: 700;
      padding: 4px 10px; border-radius: 999px;
    }

    .pl-card-body {
      padding: 12px 14px 15px;
      border-top: 1px solid var(--border);
      display: flex; flex-direction: column; gap: 5px;
    }
    .pl-card-name {
      font-size: 14px; font-weight: 700;
      color: var(--text); margin: 0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .pl-card-meta {
      display: flex; align-items: center; gap: 5px;
      font-size: 11.5px; color: var(--muted); margin: 0;
    }
    .pl-card-company {
      display: flex; align-items: center; gap: 5px;
      font-size: 12px; font-weight: 600;
      color: var(--teal); margin: 0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    /* ── RECRUITERS ── */
    .pl-recruiters {
      padding: 10px 0 40px;
      background: var(--white);
      /* KEY FIX 5: same isolation treatment for logo marquee */
      isolation: isolate;
      position: relative;
      z-index: 0;
    }
    .pl-logo-marquee {
      overflow: hidden;
      padding: 10px 0;
    }
    .pl-logo-track {
      display: flex;
      gap: 48px;
      align-items: center;
      width: max-content;
      animation: pl-scroll-right 22s linear infinite;
      backface-visibility: hidden;
    }
    .pl-logo-card img {
      height: 44px;
      object-fit: contain;
      filter: grayscale(30%) opacity(.8);
      transition: filter .3s, transform .3s;
    }
    .pl-logo-card img:hover {
      filter: none;
      transform: scale(1.1);
    }

    /* ── KEYFRAMES ──
       Use translate3d (not translateX) — forces GPU compositing
       on its own layer, preventing bleed into page scroll layers
    */
    @keyframes pl-scroll-left {
      0%   { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); }
    }
    @keyframes pl-scroll-right {
      0%   { transform: translate3d(-50%, 0, 0); }
      100% { transform: translate3d(0, 0, 0); }
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      .pl-hero {
        flex-direction: column;
        text-align: center;
        padding: 36px 24px 32px;
        gap: 28px;
      }
      .pl-hero::before { display: none; }
      .pl-hero-desc { margin-left: auto; margin-right: auto; }
      .pl-btn { margin: 0 auto; }
      .pl-section-label { padding: 22px 20px 8px; }
    }

    @media (max-width: 480px) {
      .pl-hero { padding: 28px 18px; }
      .pl-hero-title { font-size: 26px; }
      .pl-card { flex: 0 0 180px; width: 180px; }
      .pl-card-img-wrap { height: 175px; }
      .pl-section-label { font-size: 12px; padding: 20px 16px 6px; }
    }

    /* KEY FIX 6: Reduce motion preference — some users have this ON
       which causes animation conflicts with scroll */
    @media (prefers-reduced-motion: reduce) {
      .pl-marquee-track,
      .pl-logo-track {
        animation: none;
      }
      .pl-marquee-track {
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
      }
      .pl-logo-track {
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        gap: 24px;
      }
    }
  `}</style>
);

export default Placement;