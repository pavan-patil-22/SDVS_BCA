// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BASE_API_URL } from "../../BaseAPI";

// const API_CONFIG = [
//   { name: "Events", endpoint:  `${BASE_API_URL}/events`, route: "/Principal/faculty" },
//   { name: "Faculty", endpoint: `${BASE_API_URL}/faculty`, route: "/Principal/facility" },
//    { name: "Gallery", endpoint: `${BASE_API_URL}/gallery`, route: "/Principal/manage-gallery" },
//    { name: "Placement", endpoint: `${BASE_API_URL}/placements`, route: "/Principal/manage-placement" },
//     { name: "Event and News", endpoint: `${BASE_API_URL}/events-news`, route: "/Principal/manage-eventnews" },
//     { name: "Guest Messages", endpoint: `${BASE_API_URL}/contact-message`, route: "/Principal/guest-messages" },
//     { name: "Oucik Noficifation", endpoint: `${BASE_API_URL}/notifications`, route: "/Principal/manage-notifications" },
    
 
//   // Add more cards here
// ];

// const PrincipalDashboard = () => {
//   const navigate = useNavigate();
//   const [dataCounts, setDataCounts] = useState({});

//   useEffect(() => {
//     API_CONFIG.forEach(async (config) => {
//       try {
//         const res = await axios.get(config.endpoint);
//         setDataCounts(prev => ({ ...prev, [config.name]: res.data.length }));
//       } catch (err) {
//         console.error(`Error fetching ${config.name}:`, err);
//         setDataCounts(prev => ({ ...prev, [config.name]: 0 }));
//       }
//     });
//   }, []);

//   return (
//     <div className="dashboard-container">
//         <style>{`
//         .dashboard-container {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   padding: 20px;
// }

// .dashboard-card {
//   flex: 1 1 200px;
//   min-width: 200px;
//   max-width: 250px;
//   background: #4caf50;
//   color: #fff;
//   border-radius: 12px;
//   padding: 30px 20px;
//   text-align: center;
//   cursor: pointer;
//   transition: transform 0.3s, box-shadow 0.3s;
// }

// .dashboard-card:hover {
//   transform: translateY(-5px);
//   box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
// }

// .dashboard-card h2 {
//   margin-bottom: 10px;
//   font-size: 1.5rem;
// }

// .dashboard-card p {
//   font-size: 1.2rem;
//   font-weight: bold;
// }

//         `}</style>
//       {API_CONFIG.map((card, idx) => (
//         <div
//           key={idx}
//           className="dashboard-card"
//           onClick={() => navigate(card.route)}
//         >
//           <h2>{card.name}</h2>
//           <p>{dataCounts[card.name] ?? "Loading..."}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PrincipalDashboard;


import React, { useEffect, useState } from "react";
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
  FaCog
} from "react-icons/fa";
import { BASE_API_URL } from "../../BaseAPI";

const API_CONFIG = [
  { 
    name: "Events", 
    endpoint: `${BASE_API_URL}/events`, 
    route: "/Principal/faculty", 
    icon: <FaCalendarAlt size={24} />,
    color: "#4caf50"
  },
  { 
    name: "Faculty", 
    endpoint: `${BASE_API_URL}/faculty`, 
    route: "/Principal/facility", 
    icon: <FaChalkboardTeacher size={24} />,
    color: "#2196f3"
  },
  { 
    name: "Gallery", 
    endpoint: `${BASE_API_URL}/gallery`, 
    route: "/Principal/manage-gallery", 
    icon: <FaImages size={24} />,
    color: "#ff9800"
  },
  { 
    name: "Placement", 
    endpoint: `${BASE_API_URL}/placements`, 
    route: "/Principal/manage-placement", 
    icon: <FaBriefcase size={24} />,
    color: "#9c27b0"
  },
  { 
    name: "Event and News", 
    endpoint: `${BASE_API_URL}/events-news`, 
    route: "/Principal/manage-eventnews", 
    icon: <FaNewspaper size={24} />,
    color: "#f44336"
  },
  { 
    name: "Guest Messages", 
    endpoint: `${BASE_API_URL}/contact-message`, 
    route: "/Principal/guest-messages", 
    icon: <FaEnvelope size={24} />,
    color: "#607d8b"
  },
  { 
    name: "Quick Notification", 
    endpoint: `${BASE_API_URL}/notifications`, 
    route: "/Principal/manage-notifications", 
    icon: <FaBell size={24} />,
    color: "#ff5722"
  },
];

const PrincipalDashboard = () => {
  const navigate = useNavigate();
  const [dataCounts, setDataCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const promises = API_CONFIG.map(config => 
          axios.get(config.endpoint)
            .then(res => ({ [config.name]: res.data.length }))
            .catch(err => {
              console.error(`Error fetching ${config.name}:`, err);
              return { [config.name]: 0 };
            })
        );
        
        const results = await Promise.all(promises);
        const counts = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setDataCounts(counts);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Dashboard error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Principal Dashboard</h1>
        <p>🎯 All-in-one Dashboard: Manage, Monitor & Master with ease 💡</p>
      </div>
      
      <div className="dashboard-cards">
        {API_CONFIG.map((card, idx) => (
          <div
            key={idx}
            className="dashboard-card"
            style={{ '--card-color': card.color }}
            onClick={() => navigate(card.route)}
          >
            <div className="card-icon" style={{ backgroundColor: `${card.color}20` }}>
              {card.icon}
            </div>
            <h3>{card.name}</h3>
            <div className="card-count">
              {isLoading ? (
                <div className="loading-pulse"></div>
              ) : (
                dataCounts[card.name] || 0
              )}
            </div>
            <div className="card-footer">
              <span>View Details</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Stats Section */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUserTie size={20} />
          </div>
          <div className="stat-info">
            <h4>Total Items</h4>
            <p>{Object.values(dataCounts).reduce((a, b) => a + b, 0)}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaChartLine size={20} />
          </div>
          <div className="stat-info">
            <h4>Categories</h4>
            <p>{API_CONFIG.length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaCog size={20} />
          </div>
          <div className="stat-info">
            <h4>Last Updated</h4>
            <p>Just now</p>
          </div>
        </div>
      </div>
      <style>
        {`
        /* PrincipalDashboard.css */
.dashboard-container {
  min-height: 100vh;
  background: #f8fafc;;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 30px;
  animation: fadeIn 0.8s ease-out;
}

.dashboard-header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.5rem;
}

.dashboard-header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.dashboard-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: slideUp 0.5s ease-out;
  animation-fill-mode: both;
}

.dashboard-card:nth-child(1) { animation-delay: 0.1s; }
.dashboard-card:nth-child(2) { animation-delay: 0.2s; }
.dashboard-card:nth-child(3) { animation-delay: 0.3s; }
.dashboard-card:nth-child(4) { animation-delay: 0.4s; }
.dashboard-card:nth-child(5) { animation-delay: 0.5s; }
.dashboard-card:nth-child(6) { animation-delay: 0.6s; }
.dashboard-card:nth-child(7) { animation-delay: 0.7s; }

.dashboard-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background-color: var(--card-color);
  transition: width 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.dashboard-card:hover::before {
  width: 8px;
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: var(--card-color);
}

.dashboard-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.card-count {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--card-color);
  margin-bottom: 15px;
}

.loading-pulse {
  width: 60px;
  height: 40px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: loading 1.5s infinite;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1f1f1;
  padding-top: 15px;
  margin-top: 15px;
  color: #7f8c8d;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.dashboard-card:hover .card-footer {
  color: var(--card-color);
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  animation: fadeIn 1s ease-out;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f0f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #3498db;
}

.stat-info h4 {
  color: #7f8c8d;
  margin: 0 0 5px 0;
  font-size: 0.9rem;
  font-weight: normal;
}

.stat-info p {
  color: #2c3e50;
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.dashboard-error {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  color: #e74c3c;
}

.dashboard-error button {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
  transition: background 0.3s;
}

.dashboard-error button:hover {
  background: #2980b9;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Responsive design */
@media (max-width: 768px) {
  .dashboard-cards {
    grid-template-columns: 1fr;
  }
  
  .dashboard-stats {
    grid-template-columns: 1fr;
  }
  
  .dashboard-header h1 {
    font-size: 2rem;
  }
}
        `}
      </style>
    </div>
  );
};

export default PrincipalDashboard;