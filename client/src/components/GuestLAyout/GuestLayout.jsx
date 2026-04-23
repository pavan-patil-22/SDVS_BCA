

// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import GuestHeader from "./GuestHeader";
// import GuestFooter from "./GuestFooter";
// import Chatbot from "./Chatbot";

// const GuestLayout = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 600);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//         backgroundColor: "#f8f9fb", // 🎨 page background
//       }}
//     >
//       {/* Fixed Header */}
//       <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
//         <GuestHeader />
//       </div>

//       {/* Main Content */}
//       <div
//         style={{
//           flex: 1,
//           marginTop: isMobile ? "80px" : "90px", // Push content below header
//           paddingBottom: "0px", // Avoid footer overlap
//         }}
//       >
//         <Outlet />
//       </div>

//       {/* Footer (Sticky at bottom, not overlap) */}
//       <div
//         style={{
//           position: "relative",
//           bottom: 0,
//           width: "100%",
//           backgroundColor: "#1f3b88", // 🎨 deep navy footer
//           color: "#fff",
//           zIndex: 99,
//         }}
//       >
//         <GuestFooter />
//       </div>

//       {/* Chatbot */}
//       <Chatbot />
//     </div>
//   );
// };

// export default GuestLayout;


import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import GuestHeader from "./GuestHeader";
import GuestFooter from "./GuestFooter";
import Chatbot from "./Chatbot";

const GuestLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle click on overlay (outside the modal content)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f8f9fb",
      }}
    >
      {/* Modal with two banners side by side */}
      {showModal && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(3px)",
            padding: "20px",
            boxSizing: "border-box",
            overflow: "auto",
          }}
        >
          <div
            style={{
              backgroundColor: "transparent",
              borderRadius: "12px",
              maxWidth: isMobile ? "100%" : "70%", // Reduced from 90% to 70% on desktop
              minWidth: isMobile ? "100%" : "auto",
              maxHeight: "none",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "20px" : "15px", // Reduced gap on desktop
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              padding: isMobile ? "80px 15px 30px 15px" : "10px", // Reduced padding on desktop
              marginTop: isMobile ? "30px" : "0",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: isMobile ? "fixed" : "absolute",
                top: isMobile ? "20px" : "-35px", // Adjusted close button position
                right: isMobile ? "20px" : "-8px", // Adjusted close button position
                background: "white",
                border: "none",
                fontSize: isMobile ? "24px" : "24px",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#333",
                width: isMobile ? "44px" : "32px", // Smaller button on desktop
                height: isMobile ? "44px" : "32px", // Smaller button on desktop
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                zIndex: 1001,
                transition: "all 0.2s ease",
              }}
              aria-label="Close"
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.target.style.backgroundColor = "#f0f0f0";
                  e.target.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.target.style.backgroundColor = "white";
                  e.target.style.transform = "scale(1)";
                }
              }}
            >
              ✕
            </button>

            {/* Banner 1 */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                width: isMobile ? "100%" : "auto",
                maxWidth: isMobile ? "100%" : "48%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/banner1.jpeg"
                alt="Banner 1 - Key Features & Career Opportunities"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  maxHeight: isMobile ? "auto" : "70vh", // Limit height on desktop
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Banner 2 */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                width: isMobile ? "100%" : "auto",
                maxWidth: isMobile ? "100%" : "48%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/banner2.jpeg"
                alt="Banner 2 - Infrastructure, Medal Winners, Placements"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  maxHeight: isMobile ? "auto" : "70vh", // Limit height on desktop
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Fixed Header */}
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
        <GuestHeader />
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginTop: isMobile ? "80px" : "90px",
          paddingBottom: "0px",
        }}
      >
        <Outlet />
      </div>

      {/* Footer */}
      <div
        style={{
          position: "relative",
          bottom: 0,
          width: "100%",
          backgroundColor: "#1f3b88",
          color: "#fff",
          zIndex: 99,
        }}
      >
        <GuestFooter />
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default GuestLayout;