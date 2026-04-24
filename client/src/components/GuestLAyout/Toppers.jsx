import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const Toppers = () => {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  /* -------------------- Effects -------------------- */
  useEffect(() => {
    AOS.init({ duration: 900, once: false });
  }, []);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    fetchToppers();
  }, []);

  /* -------------------- Helpers -------------------- */
  const fetchToppers = async () => {
    try {
      const res = await axios.get(`${BASE_API_URL}/topper`);
      setToppers(res.data?.data || []);
    } catch {
      toast.error("Failed to load toppers");
    } finally {
      setLoading(false);
    }
  };

  const getAcademicYear = () => {
    const y = new Date().getFullYear();
    return new Date().getMonth() >= 5 ? y.toString() : (y - 1).toString();
  };

  const currentYearToppers = toppers.filter(
    t => t.year === getAcademicYear()
  );

  const bestStudents = currentYearToppers.filter(
    t => t.topperType === "best boy/girl of the college"
  );

  const semesterGroups = {};
  currentYearToppers
    .filter(t => t.topperType === "Sem topper")
    .sort((a, b) => a.rank - b.rank)
    .forEach(t => {
      semesterGroups[t.semester] ??= [];
      if (semesterGroups[t.semester].length < 3) {
        semesterGroups[t.semester].push(t);
      }
    });

  const universityToppers = toppers
    .filter(t => t.topperType === "university topper")
    .sort((a, b) => a.rank - b.rank);

  const getRankColor = r =>
    r === 1 ? "#ffcc00" : r === 2 ? "#c0c0c0" : "#cd7f32";

  /* -------------------- Render -------------------- */
  return (
    <div className="toppers-page">
      <ToastContainer />

      <Container className="py-5">
        <h2 className="text-center fw-bold mb-2 text-primary">
          🏆 Academic Achievers of the Year {getAcademicYear()}
        </h2>

        {/* ===== Guest View Line ===== */}
        <p className="text-center text-muted mb-4">
          Celebrating academic excellence and recognizing students who set benchmarks
          of dedication, discipline, and success.
        </p>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            {/* ================= Best Boy / Girl ================= */}
            {bestStudents.length > 0 && (
              <Row className="justify-content-center g-3 mb-5">
                {bestStudents.map(t => (
                  <Col key={t._id} xs={4} sm={4} md={4} lg={4}>
                    <BestTopperCard topper={t} />
                  </Col>
                ))}
              </Row>
            )}

            {/* ================= Semester Toppers ================= */}
            {Object.entries(semesterGroups).map(([sem, list]) => (
              <div key={sem} className="mb-5">
                <h4 className="text-center fw-bold text-primary mb-3">
                  Semester {sem} Toppers{" "}
                  {/* <Badge bg="primary">Top 3</Badge> */}
                </h4>

                <Row className="g-3 justify-content-center">
                  {list.map(t => (
                    <Col key={t._id} xs={4} sm={4} md={4} lg={4}>
                      <TopperCard topper={t} rankColor={getRankColor} />
                    </Col>
                  ))}
                </Row>
              </div>
            ))}

            {/* ================= University Toppers ================= */}
            {universityToppers.length > 0 && (
              <div className="mb-5">
                <h4 className="text-center fw-bold text-warning mb-3">
                  🎓 University Rank Holders 🎓
                </h4>

                <Row className="g-3 justify-content-center">
                  {universityToppers.map(t => (
                    <Col key={t._id} xs={4} sm={4} md={4} lg={4}>
                      <TopperCard topper={t} rankColor={getRankColor} />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </>
        )}
      </Container>

      {/* ================= Styles ================= */}
      <style>{`
        .toppers-page {
          background: #fff;
        }

        .card {
          border: none;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(0,0,0,.12);
          height: 100%;
        }

        .image-box {
          height: 320px;
          background: #f2f2f2;
        }

        .image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* -------- Mobile small card tuning ONLY -------- */
        @media (max-width: 576px) {
          .image-box {
            height: 120px;
          }

          .card-body h5,
          .card-body h6 {
            font-size: 13px;
            margin-bottom: 4px;
          }

          .badge {
            font-size: 10px;
            padding: 4px 8px;
          }

          .card-body small {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
};

/* ================= Best Card ================= */
const BestTopperCard = ({ topper }) => {
  const bestTitle =
    topper.gender === "boy" ? "Best Boy" : "Best Girl";

  const genderIcon =
    topper.gender === "boy" ? "👨" : "👩";

  return (
    <Card data-aos="zoom-in">
      <div className="image-box">
        <img
          src={
            topper.photo
              ? `${topper.photo}`
              : "/avatar.png"
          }
          alt={topper.studentName}
        />
      </div>
      <Card.Body className="text-center">
        <h5 className="fw-bold">{topper.studentName}</h5>
        <Badge bg="danger">
          👑 {bestTitle} {genderIcon}
        </Badge>
      </Card.Body>
    </Card>
  );
};

/* ================= Normal Card ================= */
const TopperCard = ({ topper, rankColor }) => (
  <Card data-aos="fade-up">
    <div className="image-box">
      <img
        src={
          topper.photo
            ? `${topper.photo}`
            : "/avatar.png"
        }
        alt={topper.studentName}
      />
    </div>
    <Card.Body className="text-center">
      <Badge
        style={{
          background: rankColor(topper.rank),
          color: "#000",
        }}
        className="mb-1"
      >
        🏆 Rank {topper.rank}
      </Badge>

      <h6 className="fw-bold">{topper.studentName}</h6>
      {topper.topperType === "university topper" && (
        <>
          {topper.year && (
            <small className="text-muted d-block">
              Year: {topper.year}
            </small>
          )}
          {topper.semester && (
            <small className="text-muted d-block">
              Semester {topper.semester}
            </small>
          )}
        </>
      )}
      {topper.percentage && (
        <small className="text-muted">
          {topper.percentage}%
        </small>
      )}
    </Card.Body>
  </Card>
);

export default Toppers;
