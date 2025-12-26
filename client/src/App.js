import GuestLayout from "./components/GuestLAyout/GuestLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/GuestLAyout/Login";
import ForgotPassword from "./components/GuestLAyout/ForgotPassword";
import PrincipalLayout from "./components/PrincipalLayout/PrincipalLayout";
import Register from "./components/GuestLAyout/Register";
import ManageFaculty from "./components/PrincipalLayout/ManageFaculty";
import Faculty from "./components/GuestLAyout/Faculty";
import ManageFacility from "./components/PrincipalLayout/ManageFacility";
import Facility from "./components/GuestLAyout/Facility";
import ManageEvents from "./components/PrincipalLayout/ManageEvents";
import Events from "./components/GuestLAyout/Events";
import EventDetails from "./components/GuestLAyout/EventDetails";
import Home from "./components/GuestLAyout/Home";
import AboutSDVS from "./components/GuestLAyout/AboutSDVS";
import PrincipalMessage from "./components/GuestLAyout/PrincipalMessage";
import ChairmanMessage from "./components/GuestLAyout/ChairmanMessage";
import Contact from "./components/GuestLAyout/Contact";
import ManageGallery from "./components/PrincipalLayout/ManageGallery";
import ManagePlacement from "./components/PrincipalLayout/ManagePlacement";
import ManageEventNews from "./components/PrincipalLayout/ManageEventNews";
import GuestPlacementView from "./components/GuestLAyout/GuestPlacementView ";
import Chatbot from "./components/GuestLAyout/Chatbot";
import GuestMessage from "./components/PrincipalLayout/GuestMessage";
import ManageNotification from "./components/PrincipalLayout/ManageNotification";
import NotFoundPage from "./components/GuestLAyout/NotFoundPage ";
import PrincipalDashboard from "./components/PrincipalLayout/PrincipalDashboard";
import ChangePassword from "./components/PrincipalLayout/ChangePassword";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import AboutCollege from "./components/GuestLAyout/AboutCollege";

function App() {
  // useEffect(() => {
  //   // Disable right-click
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //     toast.info("😎 Hey! Right-click is disabled, nice try!", { position: "top-center" });
  //   };
  //   document.addEventListener("contextmenu", handleContextMenu);

  //   // Disable F12, Ctrl+Shift+I/J/C, Ctrl+U
  //   const handleKeyDown = (event) => {
  //     if (
  //       event.key === "F12" ||
  //       (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C")) ||
  //       (event.ctrlKey && event.key === "U")
  //     ) {
  //       event.preventDefault();
  //       toast.error("🐱 Developers say NO! Right-click blocked!", { position: "top-center" });
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/facilities" element={<Facility />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about-sdvs" element={<AboutSDVS />} />
          <Route path="/about-college" element={<AboutCollege/>}/>
          <Route path="/principal-message" element={<PrincipalMessage />} />
          <Route path="/chairmans-message" element={<ChairmanMessage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/placements" element={<GuestPlacementView />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/principal" element={<PrincipalLayout />}>
            <Route index element={<PrincipalDashboard />} />
            <Route path="faculty" element={<ManageFaculty />} />
            <Route path="facility" element={<ManageFacility />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="manage-gallery" element={<ManageGallery />} />
            <Route path="manage-placement" element={<ManagePlacement />} />
            <Route path="manage-eventnews" element={<ManageEventNews />} />
            <Route path="guest-messages" element={<GuestMessage />} />
            <Route path="manage-notifications"element={<ManageNotification />}/>
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default App;
