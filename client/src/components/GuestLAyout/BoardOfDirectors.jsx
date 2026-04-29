import React from "react";

const BoardOfDirectors = () => {
  
  const boardMembersSet2 = [
    { name: "Shri. A.B. Patil", position: "President", image: "A_B_Patil.png" },
    { name: "Shri. K.C. Shirakoli", position: "Vice-President", image: "K_C_Shirakoli.png" },
    { name: "Shri.R.B. Patil", position: "Member", image: "R_B_Patil.png" },
    { name: "Shri.V.A. Patil", position: "Member", image: "v_a_patil.png" },
    { name: "Shri. V.B. Todakar", position: "Member", image: "v_b_Todakar .png" },
    { name: "Dr.N.P. Haval", position: "Member", image: "N_P_Haval.png" },
    { name: "Shri B.S. Vairagi", position: "Member", image: "B_S_Vairagi.png" },
    { name: "Shri S.M. Patil", position: "Member", image: "S_M_patil.png" },
    { name: "D.S. Pachandi", position: "Member", image: "D_S_Pachandi.png" },
    { name: "Shri G.B. Patil", position: "Member", image: "G_B_Patil.png" },
    { name: "Shri G.C. Kotagi", position: "Chairman", image: "G_C_Kotagi.png" },
    
  ];

  return (
    <div className="board-of-directors-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .board-of-directors-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
        //   background-color: #f5f5f5;
          min-height: 100vh;
        }

        .title-container {
          text-align: center;
          margin-bottom: 50px;
        }

        .page-title {
          text-align: center;
          font-size: 36px;
          color: #1f3b88;
          margin-bottom: 40px;
          padding-bottom: 15px;
          border-bottom: 3px solid #f5a623;
          display: inline-block;
          width: auto;
        }

        .section-title {
          font-size: 24px;
          color: #333;
          margin: 30px 0 20px 0;
          padding-left: 15px;
          border-left: 4px solid #f5a623;
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
          margin-bottom: 50px;
        }

        .member-card {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .member-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        }

        .member-image {
          width: 100%;
          height: 280px;
          object-fit: cover;
          background-color: #e0e0e0;
        }

        .member-info {
          padding: 15px;
          text-align: center;
        }

        .member-name {
          font-size: 16px;
          font-weight: bold;
          color: #1f3b88;
          margin: 0 0 5px 0;
        }

        .member-position {
          font-size: 13px;
          color: #666;
          margin: 0;
        }

        /* Large Desktop - 4 cards per row */
        @media (min-width: 1200px) {
          .members-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Desktop - 3 cards per row */
        @media (min-width: 992px) and (max-width: 1199px) {
          .members-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Tablet - 3 cards per row */
        @media (min-width: 768px) and (max-width: 991px) {
          .members-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          
          .page-title {
            font-size: 32px;
          }
          
          .section-title {
            font-size: 22px;
          }
          
          .member-image {
            height: 250px;
          }
          
          .member-name {
            font-size: 15px;
          }
        }

        /* Mobile Landscape - 3 cards per row */
        @media (min-width: 576px) and (max-width: 767px) {
          .board-of-directors-page {
            padding: 20px 15px;
          }

          .page-title {
            font-size: 28px;
          }

          .section-title {
            font-size: 20px;
          }

          .members-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .member-image {
            height: 180px;
          }

          .member-name {
            font-size: 13px;
          }
          
          .member-position {
            font-size: 11px;
          }
          
          .member-info {
            padding: 10px;
          }
        }

        /* Mobile Portrait - 2 cards per row */
        @media (min-width: 400px) and (max-width: 575px) {
          .board-of-directors-page {
            padding: 20px 12px;
          }

          .page-title {
            font-size: 26px;
          }

          .section-title {
            font-size: 18px;
          }

          .members-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .member-image {
            height: 200px;
          }

          .member-name {
            font-size: 14px;
          }
          
          .member-position {
            font-size: 11px;
          }
          
          .member-info {
            padding: 10px;
          }
        }

        /* Small Mobile - 2 cards per row */
        @media (max-width: 399px) {
          .board-of-directors-page {
            padding: 15px 10px;
          }

          .page-title {
            font-size: 24px;
            margin-bottom: 30px;
          }

          .section-title {
            font-size: 18px;
            margin: 20px 0 15px 0;
          }

          .members-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .member-image {
            height: 160px;
          }

          .member-name {
            font-size: 12px;
          }
          
          .member-position {
            font-size: 10px;
          }
          
          .member-info {
            padding: 8px;
          }
        }

        /* Very Small Devices - 2 cards per row (compact) */
        @media (max-width: 320px) {
          .members-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
          
          .member-image {
            height: 140px;
          }
          
          .member-name {
            font-size: 11px;
          }
          
          .member-position {
            font-size: 9px;
          }
          
          .member-info {
            padding: 6px;
          }
        }
      `}</style>

      <div className="title-container">
        <h1 className="page-title">Board of Directors</h1>
      </div>

      <h2 className="section-title">Executive Committee</h2>
      <div className="members-grid">
        {boardMembersSet2.map((member, index) => (
          <div key={`set2-${index}`} className="member-card">
            <img
              src={member.image}
              alt={member.name}
              className="member-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />
            <div className="member-info">
              <h3 className="member-name">{member.name}</h3>
              <p className="member-position">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardOfDirectors;