

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { 
//   FaCalendarAlt, 
//   FaChalkboardTeacher, 
//   FaImages, 
//   FaBriefcase, 
//   FaNewspaper, 
//   FaEnvelope, 
//   FaBell,
//   FaUserTie,
//   FaChartLine,
//   FaCog
// } from "react-icons/fa";
// import { PiStudentDuotone } from "react-icons/pi";
// import { BASE_API_URL } from "../../BaseAPI";

// const API_CONFIG = [
//   { 
//     name: "Events", 
//     endpoint: `${BASE_API_URL}/events`, 
//     route: "/Principal/events", 
//     icon: <FaCalendarAlt size={24} />,
//     color: "#df158e"
//   },
//    { 
//     name: "Facility", 
//     endpoint: `${BASE_API_URL}/facilities`, 
//     route: "/Principal/facility", 
//     icon: <FaCalendarAlt size={24} />,
//     color: "#4caf50"
//   },
//   { 
//     name: "Faculty", 
//     endpoint: `${BASE_API_URL}/faculty`, 
//     route: "/Principal/faculty", 
//     icon: <FaChalkboardTeacher size={24} />,
//     color: "#2196f3"
//   },
  // { 
  //   name: "Toppers", 
  //   endpoint: `${BASE_API_URL}/topper`, 
  //   route: "/Principal/manage-toppers", 
  //   icon: <PiStudentDuotone  size={24} />,
  //   color: "#2196f3"
  // },
//   { 
//     name: "Gallery", 
//     endpoint: `${BASE_API_URL}/gallery`, 
//     route: "/Principal/manage-gallery", 
//     icon: <FaImages size={24} />,
//     color: "#ff9800"
//   },
//   { 
//     name: "Placement", 
//     endpoint: `${BASE_API_URL}/placements`, 
//     route: "/Principal/manage-placement", 
//     icon: <FaBriefcase size={24} />,
//     color: "#9c27b0"
//   },
//   { 
//     name: "Event and News", 
//     endpoint: `${BASE_API_URL}/events-news`, 
//     route: "/Principal/manage-eventnews", 
//     icon: <FaNewspaper size={24} />,
//     color: "#f44336"
//   },
//   { 
//     name: "Guest Messages", 
//     endpoint: `${BASE_API_URL}/contact-message`, 
//     route: "/Principal/guest-messages", 
//     icon: <FaEnvelope size={24} />,
//     color: "#f5a208"
//   },
//   { 
//     name: "Quick Notification", 
//     endpoint: `${BASE_API_URL}/notifications`, 
//     route: "/Principal/manage-notifications", 
//     icon: <FaBell size={24} />,
//     color: "#ff5722"
//   },
// ];

// const PrincipalDashboard = () => {
//   const navigate = useNavigate();
//   const [dataCounts, setDataCounts] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const promises = API_CONFIG.map(config => 
//           axios.get(config.endpoint)
//             .then(res => ({ [config.name]: res.data.length }))
//             .catch(err => {
//               console.error(`Error fetching ${config.name}:`, err);
//               return { [config.name]: 0 };
//             })
//         );
        
//         const results = await Promise.all(promises);
//         const counts = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
//         setDataCounts(counts);
//       } catch (err) {
//         setError("Failed to fetch data. Please try again later.");
//         console.error("Dashboard error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) {
//     return (
//       <div className="dashboard-container">
//         <div className="dashboard-error">
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()}>Retry</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1>Principal Dashboard</h1>
//         <p>🎯 All-in-one Dashboard: Manage, Monitor & Master with ease 💡</p>
//       </div>
      
//       <div className="dashboard-cards">
//         {API_CONFIG.map((card, idx) => (
//           <div
//             key={idx}
//             className="dashboard-card"
//             style={{ '--card-color': card.color }}
//             onClick={() => navigate(card.route)}
//           >
//             <div className="card-icon" style={{ backgroundColor: `${card.color}20` }}>
//               {card.icon}
//             </div>
//             <h3>{card.name}</h3>
//             <div className="card-count">
//               {isLoading ? (
//                 <div className="loading-pulse"></div>
//               ) : (
//                 dataCounts[card.name] || 0
//               )}
//             </div>
//             <div className="card-footer">
//               <span>View Details</span>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Quick Stats Section */}
//       <div className="dashboard-stats">
//         <div className="stat-card">
//           <div className="stat-icon">
//             <FaUserTie size={20} />
//           </div>
//           <div className="stat-info">
//             <h4>Total Items</h4>
//             <p>{Object.values(dataCounts).reduce((a, b) => a + b, 0)}</p>
//           </div>
//         </div>
        
//         <div className="stat-card">
//           <div className="stat-icon">
//             <FaChartLine size={20} />
//           </div>
//           <div className="stat-info">
//             <h4>Categories</h4>
//             <p>{API_CONFIG.length}</p>
//           </div>
//         </div>
        
//         <div className="stat-card">
//           <div className="stat-icon">
//             <FaCog size={20} />
//           </div>
//           <div className="stat-info">
//             <h4>Last Updated</h4>
//             <p>Just now</p>
//           </div>
//         </div>
//       </div>
//       <style>
//         {`
//         /* PrincipalDashboard.css */
// .dashboard-container {
//   min-height: 100vh;
//   background: #f8fafc;;
//   padding: 20px;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// }

// .dashboard-header {
//   text-align: center;
//   margin-bottom: 30px;
//   animation: fadeIn 0.8s ease-out;
// }

// .dashboard-header h1 {
//   color: #2c3e50;
//   margin-bottom: 10px;
//   font-size: 2.5rem;
// }

// .dashboard-header p {
//   color: #7f8c8d;
//   font-size: 1.1rem;
// }

// .dashboard-cards {
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//   gap: 25px;
//   margin-bottom: 40px;
// }

// .dashboard-card {
//   background: white;
//   border-radius: 12px;
//   padding: 25px;
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
//   cursor: pointer;
//   transition: all 0.3s ease;
//   position: relative;
//   overflow: hidden;
//   animation: slideUp 0.5s ease-out;
//   animation-fill-mode: both;
// }

// .dashboard-card:nth-child(1) { animation-delay: 0.1s; }
// .dashboard-card:nth-child(2) { animation-delay: 0.2s; }
// .dashboard-card:nth-child(3) { animation-delay: 0.3s; }
// .dashboard-card:nth-child(4) { animation-delay: 0.4s; }
// .dashboard-card:nth-child(5) { animation-delay: 0.5s; }
// .dashboard-card:nth-child(6) { animation-delay: 0.6s; }
// .dashboard-card:nth-child(7) { animation-delay: 0.7s; }

// .dashboard-card::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 5px;
//   height: 100%;
//   background-color: var(--card-color);
//   transition: width 0.3s ease;
// }

// .dashboard-card:hover {
//   transform: translateY(-5px);
//   box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
// }

// .dashboard-card:hover::before {
//   width: 8px;
// }

// .card-icon {
//   width: 60px;
//   height: 60px;
//   border-radius: 12px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 20px;
//   color: var(--card-color);
// }

// .dashboard-card h3 {
//   color: #2c3e50;
//   margin-bottom: 15px;
//   font-size: 1.3rem;
// }

// .card-count {
//   font-size: 2.5rem;
//   font-weight: bold;
//   color: var(--card-color);
//   margin-bottom: 15px;
// }

// .loading-pulse {
//   width: 60px;
//   height: 40px;
//   background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//   background-size: 200% 100%;
//   border-radius: 4px;
//   animation: loading 1.5s infinite;
// }

// .card-footer {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-top: 1px solid #f1f1f1;
//   padding-top: 15px;
//   margin-top: 15px;
//   color: #7f8c8d;
//   font-size: 0.9rem;
//   transition: color 0.3s ease;
// }

// .dashboard-card:hover .card-footer {
//   color: var(--card-color);
// }

// .dashboard-stats {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 20px;
// }

// .stat-card {
//   background: white;
//   border-radius: 12px;
//   padding: 20px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
//   display: flex;
//   align-items: center;
//   animation: fadeIn 1s ease-out;
// }

// .stat-icon {
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   background: #f0f7ff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 15px;
//   color: #3498db;
// }

// .stat-info h4 {
//   color: #7f8c8d;
//   margin: 0 0 5px 0;
//   font-size: 0.9rem;
//   font-weight: normal;
// }

// .stat-info p {
//   color: #2c3e50;
//   margin: 0;
//   font-size: 1.5rem;
//   font-weight: bold;
// }

// .dashboard-error {
//   text-align: center;
//   padding: 40px;
//   background: white;
//   border-radius: 12px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//   color: #e74c3c;
// }

// .dashboard-error button {
//   background: #3498db;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 6px;
//   cursor: pointer;
//   margin-top: 15px;
//   transition: background 0.3s;
// }

// .dashboard-error button:hover {
//   background: #2980b9;
// }

// /* Animations */
// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }

// @keyframes slideUp {
//   from { 
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to { 
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// @keyframes loading {
//   0% { background-position: 200% 0; }
//   100% { background-position: -200% 0; }
// }

// /* Responsive design */
// @media (max-width: 768px) {
//   .dashboard-cards {
//     grid-template-columns: 1fr;
//   }
  
//   .dashboard-stats {
//     grid-template-columns: 1fr;
//   }
  
//   .dashboard-header h1 {
//     font-size: 2rem;
//   }
// }
//         `}
//       </style>
//     </div>
//   );
// };

// export default PrincipalDashboard;





import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaImages,
  FaBriefcase,
  FaNewspaper,
  FaEnvelope,
  FaBell,
  FaUserTie,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { BASE_API_URL } from "../../BaseAPI";

const API_CONFIG = [
  {
    name: "Events",
    endpoint: `${BASE_API_URL}/events`,
    route: "/Principal/events",
    icon: FaCalendarAlt,
    color: "#e91e8c",
    accent: "#ff6ec7",
    bg: "linear-gradient(135deg, #e91e8c22 0%, #e91e8c08 100%)",
    description: "Upcoming & past events",
  },
   
  {
    name: "Toppers",
    endpoint: `${BASE_API_URL}/toppers`,
    route: "/Principal/manage-toppers",
    icon: FaCalendarAlt,
    color: "#e91e8c",
    accent: "#ff6ec7",
    bg: "linear-gradient(135deg, #e91e8c22 0%, #e91e8c08 100%)",
    description: "Upcoming & past events",
  },
  {
    name: "Facility",
    endpoint: `${BASE_API_URL}/facilities`,
    route: "/Principal/facility",
    icon: FaCog,
    color: "#00c896",
    accent: "#80ffda",
    bg: "linear-gradient(135deg, #00c89622 0%, #00c89608 100%)",
    description: "Manage campus facilities",
  },
  {
    name: "Faculty",
    endpoint: `${BASE_API_URL}/faculty`,
    route: "/Principal/faculty",
    icon: FaChalkboardTeacher,
    color: "#3d8ef8",
    accent: "#90c2ff",
    bg: "linear-gradient(135deg, #3d8ef822 0%, #3d8ef808 100%)",
    description: "Teaching staff records",
  },
  {
    name: "Gallery",
    endpoint: `${BASE_API_URL}/gallery`,
    route: "/Principal/manage-gallery",
    icon: FaImages,
    color: "#ff9c00",
    accent: "#ffd07a",
    bg: "linear-gradient(135deg, #ff9c0022 0%, #ff9c0008 100%)",
    description: "Photos & media albums",
  },
  {
    name: "Placement",
    endpoint: `${BASE_API_URL}/placements`,
    route: "/Principal/manage-placement",
    icon: FaBriefcase,
    color: "#9c3dfa",
    accent: "#d4a3ff",
    bg: "linear-gradient(135deg, #9c3dfa22 0%, #9c3dfa08 100%)",
    description: "Student placement data",
  },
  {
    name: "Event & News",
    endpoint: `${BASE_API_URL}/events-news`,
    route: "/Principal/manage-eventnews",
    icon: FaNewspaper,
    color: "#f44949",
    accent: "#ff9a9a",
    bg: "linear-gradient(135deg, #f4494922 0%, #f4494908 100%)",
    description: "Latest announcements",
  },
  {
    name: "Guest Messages",
    endpoint: `${BASE_API_URL}/contact-message`,
    route: "/Principal/guest-messages",
    icon: FaEnvelope,
    color: "#f5a208",
    accent: "#ffd77a",
    bg: "linear-gradient(135deg, #f5a20822 0%, #f5a20808 100%)",
    description: "Visitor enquiries & feedback",
  },
  {
    name: "Notifications",
    endpoint: `${BASE_API_URL}/notifications`,
    route: "/Principal/manage-notifications",
    icon: FaBell,
    color: "#ff5722",
    accent: "#ffab91",
    bg: "linear-gradient(135deg, #ff572222 0%, #ff572208 100%)",
    description: "Push alerts & updates",
  },
];

/* ─── SVG Decorations ─── */
const GridPattern = () => (
  <svg
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: 0.035,
      pointerEvents: "none",
    }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a237e" strokeWidth="0.8" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const HeroBlob = () => (
  <svg
    viewBox="0 0 800 300"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", top: 0, right: 0, width: "55%", opacity: 0.06, pointerEvents: "none" }}
    preserveAspectRatio="xMaxYMin slice"
  >
    <ellipse cx="600" cy="120" rx="340" ry="200" fill="#3d8ef8" />
    <ellipse cx="720" cy="60" rx="200" ry="120" fill="#e91e8c" />
  </svg>
);

const RingIcon = ({ color, size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="24" stroke={color} strokeWidth="2.5" strokeDasharray="6 4" opacity="0.35" />
    <circle cx="26" cy="26" r="18" fill={color} fillOpacity="0.12" />
  </svg>
);

const ArrowRight = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.75 9H14.25M14.25 9L10.5 5.25M14.25 9L10.5 12.75" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SparkSVG = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 2L12.5 9.5L20 11L12.5 12.5L11 20L9.5 12.5L2 11L9.5 9.5L11 2Z" fill="#f5a208" />
  </svg>
);

const PulseDot = ({ color }) => (
  <span style={{ position: "relative", display: "inline-flex", width: 12, height: 12 }}>
    <span
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        backgroundColor: color,
        opacity: 0.4,
        animation: "ping 1.4s cubic-bezier(0,0,0.2,1) infinite",
      }}
    />
    <span style={{ position: "relative", display: "inline-flex", width: 12, height: 12, borderRadius: "50%", backgroundColor: color }} />
  </span>
);

/* ─── Card ─── */
const DashboardCard = ({ card, count, isLoading, onClick, delay }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = card.icon;

  return (
    <div
      className="db-card"
      style={{ animationDelay: `${delay}ms`, "--card-color": card.color }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* top accent bar */}
      <div className="db-card__bar" style={{ background: `linear-gradient(90deg, ${card.color}, ${card.accent})` }} />

      {/* ring + icon */}
      <div className="db-card__icon-wrap" style={{ position: "relative", width: 52, height: 52 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <RingIcon color={card.color} />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: card.color,
            transition: "transform 0.3s",
            transform: hovered ? "scale(1.15) rotate(-8deg)" : "scale(1)",
          }}
        >
          <Icon size={22} />
        </div>
      </div>

      {/* text */}
      <div className="db-card__body">
        <span className="db-card__name">{card.name}</span>
        <span className="db-card__desc">{card.description}</span>
      </div>

      {/* count */}
      <div className="db-card__count" style={{ color: card.color }}>
        {isLoading ? <div className="skeleton-num" /> : count ?? 0}
      </div>

      {/* footer */}
      <div className="db-card__footer">
        <span style={{ color: hovered ? card.color : "#94a3b8", transition: "color 0.3s", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em" }}>
          VIEW DETAILS
        </span>
        <span style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.3s", display: "flex" }}>
          <ArrowRight color={hovered ? card.color : "#94a3b8"} />
        </span>
      </div>

      {/* hover bg glow */}
      <div
        className="db-card__glow"
        style={{
          background: card.bg,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      />
    </div>
  );
};

/* ─── Main Component ─── */
const PrincipalDashboard = () => {
  const navigate = useNavigate();
  const [dataCounts, setDataCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  /* live clock */
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const promises = API_CONFIG.map((config) =>
          axios
            .get(config.endpoint)
            .then((res) => ({ [config.name]: res.data.length }))
            .catch(() => ({ [config.name]: 0 }))
        );
        const results = await Promise.all(promises);
        const counts = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setDataCounts(counts);
      } catch {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalItems = Object.values(dataCounts).reduce((a, b) => a + b, 0);

  const fmt = (d) =>
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

  const fmtDate = (d) =>
    d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  if (error) {
    return (
      <div className="db-container">
        <div className="db-error">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="28" stroke="#f44336" strokeWidth="2.5" />
            <path d="M30 18V32M30 40V42" stroke="#f44336" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="db-container">
      <GridPattern />
      <style>{styles}</style>

      {/* ── HEADER ── */}
      <header className="db-header">
        <HeroBlob />
        <div className="db-header__left">
          <div className="db-header__badge">
            <PulseDot color="#00c896" />
            <span>Live Dashboard</span>
          </div>
          <h1 className="db-header__title">
            Principal's
            <span className="db-header__title--accent"> Command Center</span>
          </h1>
          <p className="db-header__sub">Manage · Monitor · Master — all in one place</p>
        </div>
        <div className="db-header__right">
          <div className="db-clock">
            <div className="db-clock__time">{fmt(currentTime)}</div>
            <div className="db-clock__date">{fmtDate(currentTime)}</div>
          </div>
        </div>
      </header>

      {/* ── STAT STRIP ── */}
      <div className="db-strip">
        {[
          { label: "Total Records", value: isLoading ? "—" : totalItems, icon: <FaUserTie size={16} />, color: "#3d8ef8" },
          { label: "Sections", value: API_CONFIG.length, icon: <FaChartLine size={16} />, color: "#9c3dfa" },
          { label: "Status", value: "Online", icon: <SparkSVG />, color: "#00c896" },
        ].map((s, i) => (
          <div className="db-strip__item" key={i} style={{ "--strip-color": s.color }}>
            <span className="db-strip__icon" style={{ color: s.color }}>{s.icon}</span>
            <div>
              <div className="db-strip__val">{s.value}</div>
              <div className="db-strip__label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── SECTION LABEL ── */}
      <div className="db-section-label">
        <span>Management Modules</span>
        <div className="db-section-label__line" />
      </div>

      {/* ── CARDS GRID ── */}
      <div className="db-grid">
        {API_CONFIG.map((card, idx) => (
          <DashboardCard
            key={card.name}
            card={card}
            count={dataCounts[card.name]}
            isLoading={isLoading}
            onClick={() => navigate(card.route)}
            delay={80 + idx * 70}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Styles ─── */
const styles = `

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.db-container {
  min-height: 100vh;
  padding: 28px 28px 48px;
  font-family: 'DM Sans', sans-serif;
  position: relative;
  overflow-x: hidden;
}

/* ── HEADER ── */
.db-header {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  background: linear-gradient(130deg, #0f1c5e 0%, #162580 55%, #1a2fa0 100%);
  border-radius: 20px;
  padding: 36px 40px;
  margin-bottom: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(15, 28, 94, 0.28);
  animation: fadeDown 0.6s cubic-bezier(.22,1,.36,1) both;
}

.db-header__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  // background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 999px;
  padding: 5px 14px;
  color: #a5f3da;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  margin-bottom: 16px;
}

.db-header__title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 10px;
}
.db-header__title--accent { color: #60d0ff; }

.db-header__sub {
  color: rgba(255,255,255,0.55);
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.03em;
}

.db-clock {
  text-align: right;
}
.db-clock__time {
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 700;
  color: #60d0ff;
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
}
.db-clock__date {
  color: rgba(255,255,255,0.45);
  font-size: 0.8rem;
  margin-top: 4px;
}

/* ── STRIP ── */
.db-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
  animation: fadeUp 0.6s 0.15s cubic-bezier(.22,1,.36,1) both;
}

.db-strip__item {
  flex: 1 1 160px;
  background: #ffffff;
  border-radius: 14px;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 4px 20px rgba(15,28,94,0.07);
  border-left: 3px solid var(--strip-color);
  transition: transform 0.2s, box-shadow 0.2s;
}
.db-strip__item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(15,28,94,0.12);
}
.db-strip__icon { flex-shrink: 0; }
.db-strip__val { font-size: 1.4rem; font-weight: 700; color: #0f1c5e; line-height: 1; }
.db-strip__label { font-size: 0.75rem; color: #94a3b8; font-weight: 500; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.06em; }

/* ── SECTION LABEL ── */
.db-section-label {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
  animation: fadeUp 0.5s 0.2s cubic-bezier(.22,1,.36,1) both;
}
.db-section-label span {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #64748b;
  white-space: nowrap;
}
.db-section-label__line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, #cbd5e1 0%, transparent 100%);
}

/* ── GRID ── */
.db-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

/* ── CARD ── */
.db-card {
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  padding: 28px 24px 20px;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 4px 24px rgba(15,28,94,0.07);
  border: 1px solid rgba(226,232,240,0.8);
  transition: transform 0.28s cubic-bezier(.22,1,.36,1), box-shadow 0.28s;
  animation: cardIn 0.55s cubic-bezier(.22,1,.36,1) both;
  outline: none;
}
.db-card:hover {
  transform: translateY(-6px) scale(1.012);
  box-shadow: 0 16px 48px rgba(15,28,94,0.14);
}
.db-card:focus-visible { outline: 2px solid var(--card-color); outline-offset: 3px; }

.db-card__bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3.5px;
  border-radius: 16px 16px 0 0;
}

.db-card__icon-wrap { flex-shrink: 0; }

.db-card__body { flex: 1; }
.db-card__name {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.01em;
}
.db-card__desc {
  display: block;
  font-size: 0.77rem;
  color: #94a3b8;
  margin-top: 3px;
}

.db-card__count {
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
}

.db-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f1f5f9;
  padding-top: 14px;
  margin-top: 4px;
}

.db-card__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 16px;
}

/* skeleton */
.skeleton-num {
  width: 68px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

/* ── ERROR ── */
.db-error {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  color: #f44336;
}
.db-error p { margin: 16px 0 24px; color: #64748b; font-size: 1rem; }
.db-error button {
  background: linear-gradient(135deg, #3d8ef8, #1a65d4);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  transition: opacity 0.2s;
}
.db-error button:hover { opacity: 0.88; }

/* ── ANIMATIONS ── */
@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(22px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@keyframes ping {
  75%, 100% { transform: scale(2.2); opacity: 0; }
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .db-container { padding: 16px 14px 40px; }
  .db-header { padding: 24px 20px; flex-direction: column; gap: 16px; }
  .db-clock { text-align: left; }
  .db-grid { grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 14px; }
  .db-card { padding: 22px 16px 16px; gap: 10px; }
  .db-card__count { font-size: 2rem; }
  .db-strip { gap: 12px; }
  .db-strip__item { padding: 14px 16px; flex: 1 1 120px; }
  .db-strip__val { font-size: 1.15rem; }
}

@media (max-width: 420px) {
  .db-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .db-header__title { font-size: 1.5rem; }
}
`;

export default PrincipalDashboard;