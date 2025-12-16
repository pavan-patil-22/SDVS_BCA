import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBuilding, FaMoneyBillWave } from "react-icons/fa";
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const API_URL = `${BASE_API_URL}/placements`;
const IMG_URL = `${Img_BASE_URL}`;

const GuestPlacementView = () => {
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    // Initialize AOS animation
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });

    // Fetch placement data from API
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
    <div className="guest-placement-container">
      <h2 className="guest-placement-title" data-aos="fade-down">
        🚀 Our Placed Students
      </h2>
      <p className="guest-placement-subtitle" data-aos="fade-down" data-aos-delay="100">
        SDVS's BCA students are ready for the global industry. Check out their achievements below!
      </p>

      <div className="guest-placement-cards">
        {placements.map((placement, index) => (
          <div
            className="guest-placement-card"
            key={index}
            data-aos="fade-up"
            data-aos-delay={index % 6 * 100}
          >
            {placement.image && (
              <img
                src={`${IMG_URL}${placement.image}`}
                alt={placement.studentname}
                className="guest-placement-img"
              />
            )}
            <h3 className="guest-student-name">
              {placement.studentname}
            </h3>
            <p className="guest-student-course">
              {placement.course} ({placement.batch})
            </p>
            <p className="guest-company">
              <FaBuilding /> {placement.company}
            </p>
            <p className="guest-package">
              <FaMoneyBillWave /> {placement.package} LPA
            </p>
          </div>
        ))}
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        .guest-placement-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 20px;
          text-align: center;
        }
        .guest-placement-title {
          font-size: 32px;
          font-weight: 800;
          color: #014d5a;
          margin-bottom: 10px;
        }
        .guest-placement-subtitle {
          font-size: 16px;
          color: #555;
          margin-bottom: 40px;
        }

        .guest-placement-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .guest-placement-card {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .guest-placement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .guest-placement-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 15px;
        }

        .guest-student-name {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .guest-student-course {
          font-size: 14px;
          color: #777;
          margin-bottom: 10px;
        }
        .guest-company,
        .guest-package {
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default GuestPlacementView;
