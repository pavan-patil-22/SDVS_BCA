import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdFiberNew } from "react-icons/md";
import { BASE_API_URL } from "../../BaseAPI";

const API_URL = `${BASE_API_URL}/notifications`;

const NotificationBar = () => {
  const [notifications, setNotifications] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(API_URL);
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };
    fetchNotifications();
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div
      style={styles.wrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.scrollWrapper}>
        <div
          style={{
            ...styles.scrollContent,
            animationDuration: isHovered ? "10s" : "25s", // 🔥 speed boost on hover
          }}
        >
          {/* First set of notifications */}
          {notifications.map((n, index) => (
            <span
              key={`first-${n._id}`}
              style={styles.item}
              onClick={() => window.open(n.link, "_blank")}
            >
              <MdFiberNew style={styles.icon} /> {n.title}
              {index < notifications.length - 1 && (
                <span style={styles.separator}> | </span>
              )}
            </span>
          ))}

          {/* Duplicate for seamless looping */}
          {notifications.map((n, index) => (
            <span
              key={`second-${n._id}`}
              style={styles.item}
              onClick={() => window.open(n.link, "_blank")}
            >
              <MdFiberNew style={styles.icon} /> {n.title}
              {index < notifications.length - 1 && (
                <span style={styles.separator}> | </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    background: "linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 100%)",
    color: "white",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: "500",
    fontSize: "15px",
    letterSpacing: "0.3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "38px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    borderBottom: "1px solid #444",
  },
  scrollWrapper: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    position: "relative",
  },
  scrollContent: {
    display: "inline-block",
    whiteSpace: "nowrap",
    animation: "scroll-left linear infinite",
    animationDuration: "25s", // default speed
  },
  item: {
    marginRight: "20px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    height: "100%",
    verticalAlign: "middle",
    lineHeight: "38px",
    padding: "0 5px",
    transition: "all 0.2s ease",
  },
  icon: {
    color: "#FFD700",
    marginRight: "8px",
    fontSize: "18px",
    verticalAlign: "middle",
    filter: "drop-shadow(0 0 2px rgba(255, 215, 0, 0.5))",
  },
  separator: {
    marginLeft: "15px",
    opacity: 0.5,
    color: "#aaa",
  },
};

// Inject CSS keyframes
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    @keyframes scroll-left {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    @media (max-width: 768px) {
      .notification-bar {
        font-size: 14px;
        height: 34px;
      }
    }
    @media (max-width: 480px) {
      .notification-bar {
        font-size: 13px;
        height: 32px;
      }
    }
  `;
  document.head.appendChild(styleElement);
}

export default NotificationBar;
