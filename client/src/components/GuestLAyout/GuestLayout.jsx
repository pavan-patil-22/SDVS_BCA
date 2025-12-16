// import React from "react";
// import { Outlet } from "react-router-dom";
// import GuestHeader from "./GuestHeader";
// import GuestFooter from "./GuestFooter";
// import Chatbot from "./Chatbot";
// const GuestLayout = () => {
//   return (
//     <div
//       style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
//     >
     
//       <div style={{ position: "fixed", top: 0, width: "100vw", zIndex: 100 }}>
//         <GuestHeader />
//       </div>
//       {/* Main Content (Outlet) */}
//       <div
//         style={{
//           marginTop: window.innerWidth <= 600 ? "80px" : "90px"
//         }}
//       >
//         <Outlet />
//       </div>
      
//       {/* Fixed Footer */}
//       <div
//         style={{
//           position: "float",
//           bottom: 0,
//           width: "100%",
//           zIndex: 100,
//           backgroundColor: "black",
//           color: "white",
//         }}
//       >
//         <GuestFooter />
//       </div>
//       <Chatbot/>
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f8f9fb", // 🎨 page background
      }}
    >
      {/* Fixed Header */}
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
        <GuestHeader />
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginTop: isMobile ? "80px" : "90px", // Push content below header
          paddingBottom: "0px", // Avoid footer overlap
        }}
      >
        <Outlet />
      </div>

      {/* Footer (Sticky at bottom, not overlap) */}
      <div
        style={{
          position: "relative",
          bottom: 0,
          width: "100%",
          backgroundColor: "#1f3b88", // 🎨 deep navy footer
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
