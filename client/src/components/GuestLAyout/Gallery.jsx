// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Spinner, Badge, Modal, Button } from "react-bootstrap";
// import { FaImage, FaVideo, FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const API_URL = "http://localhost:8000/api/gallery";

// const Gallery = () => {
//   const [galleries, setGalleries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedMedia, setSelectedMedia] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Fetch all galleries
//   const fetchGalleries = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_URL);
//       setGalleries(res.data);
//       setError("");
//     } catch (err) {
//       setError("Failed to load gallery images");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: 'ease-in-out',
//       once: false
//     });
//     fetchGalleries();
//   }, []);

//   const openModal = (gallery, index) => {
//     setSelectedMedia(gallery);
//     setCurrentIndex(index);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedMedia(null);
//   };

//   const navigateMedia = (direction) => {
//     let newIndex;
//     if (direction === 'prev') {
//       newIndex = currentIndex === 0 ? galleries.length - 1 : currentIndex - 1;
//     } else {
//       newIndex = currentIndex === galleries.length - 1 ? 0 : currentIndex + 1;
//     }
//     setCurrentIndex(newIndex);
//     setSelectedMedia(galleries[newIndex]);
//   };

//   const isVideo = (media) => {
//     return media.type === 'video' || (media.image && media.image.match(/\.(mp4|webm|ogg)$/i));
//   };

//   return (
//     <div className="gallery-page">
//       <Container className="py-5">
//         <div className="page-header text-center mb-5" data-aos="fade-down">
//           <h2 className="display-4 fw-bold text-dark">Our Gallery</h2>
//           <p className="lead text-muted">Explore our collection of images and videos</p>
//         </div>

//         {error && (
//           <div className="alert alert-danger text-center" role="alert">
//             {error}
//           </div>
//         )}

//         {loading ? (
//           <div className="text-center py-5">
//             <Spinner animation="border" variant="primary" className="mb-3" />
//             <p>Loading gallery images...</p>
//           </div>
//         ) : galleries.length === 0 ? (
//           <Card className="text-center py-5 mt-4">
//             <FaImage size={48} className="text-muted mb-3 mx-auto" />
//             <h4>No Gallery Images</h4>
//             <p className="text-muted">Check back later for new content</p>
//           </Card>
//         ) : (
//           <Row className="gallery-grid">
//             {galleries.map((gallery, index) => (
//               <Col lg={4} md={6} className="mb-4" key={gallery._id}>
//                 <div 
//                   className="gallery-item position-relative overflow-hidden rounded"
//                   data-aos="fade-up" 
//                   data-aos-delay={index * 100}
//                 >
//                   <div className="gallery-media-container" onClick={() => openModal(gallery, index)}>
//                     {isVideo(gallery) ? (
//                       <div className="position-relative">
//                         <video
//                           className="gallery-media w-100"
//                           style={{ height: "250px", objectFit: "cover" }}
//                           src={`http://localhost:8000/${gallery.image}`}
//                           muted
//                         />
//                         <div className="video-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
//                           <div className="play-icon bg-white rounded-circle p-3">
//                             <FaPlay className="text-primary" />
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <img
//                         src={`http://localhost:8000/${gallery.image}`}
//                         alt={gallery.title}
//                         className="gallery-media w-100"
//                         style={{ height: "250px", objectFit: "cover", cursor: "pointer" }}
//                       />
//                     )}
//                   </div>
                  
//                   <div className="gallery-info p-3">
//                     <h5 className="gallery-title mb-1">{gallery.title}</h5>
//                     <Badge bg={isVideo(gallery) ? "danger" : "primary"} className="mt-1">
//                       {isVideo(gallery) ? (
//                         <><FaVideo className="me-1" />Video</>
//                       ) : (
//                         <><FaImage className="me-1" />Image</>
//                       )}
//                     </Badge>
//                   </div>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         )}

//         {/* Media Modal */}
//         <Modal show={showModal} onHide={closeModal} centered size="lg" className="media-modal">
//           <Modal.Header closeButton>
//             <Modal.Title>{selectedMedia?.title}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body className="text-center p-0">
//             {selectedMedia && (
//               <>
//                 <Button 
//                   variant="light" 
//                   className="nav-btn prev-btn position-absolute top-50 start-0 translate-middle-y"
//                   onClick={() => navigateMedia('prev')}
//                 >
//                   <FaChevronLeft />
//                 </Button>
                
//                 <div className="modal-media-container">
//                   {isVideo(selectedMedia) ? (
//                     <video 
//                       controls 
//                       autoPlay 
//                       className="img-fluid"
//                       style={{ maxHeight: "70vh" }}
//                     >
//                       <source src={`http://localhost:8000/${selectedMedia.image}`} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                   ) : (
//                     <img 
//                       src={`http://localhost:8000/${selectedMedia.image}`} 
//                       alt={selectedMedia.title}
//                       className="img-fluid"
//                       style={{ maxHeight: "70vh" }}
//                     />
//                   )}
//                 </div>
                
//                 <Button 
//                   variant="light" 
//                   className="nav-btn next-btn position-absolute top-50 end-0 translate-middle-y"
//                   onClick={() => navigateMedia('next')}
//                 >
//                   <FaChevronRight />
//                 </Button>
//               </>
//             )}
//           </Modal.Body>
//         </Modal>
//       </Container>

      
//     </div>
//   );
// };

// export default Gallery;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Spinner, Modal, Button } from "react-bootstrap";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaTimes,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const API_URL = `${BASE_API_URL}/gallery`;

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch galleries
  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setGalleries(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load gallery");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
    fetchGalleries();
  }, []);

  // Refresh AOS whenever visibleCount changes
  // useEffect(() => {
  //   AOS.refresh();
  // }, [visibleCount]);

  const openModal = (gallery, index) => {
    setSelectedMedia(gallery);
    setCurrentIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMedia(null);
  };

  const navigateMedia = (direction) => {
    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? galleries.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === galleries.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setSelectedMedia(galleries[newIndex]);
  };

  const isVideo = (media) =>
    media.type === "video" ||
    (media.image && media.image.match(/\.(mp4|webm|ogg)$/i));

  return (
    <div className="gallery-page">
      <Container className="py-5">
        <div className="gallery-header text-center mb-5" data-aos="fade-down">
          <h2 className="display-4 fw-bold text-dark">Our Gallery</h2>
          <p className="lead text-muted">
            Explore our collection of images and videos
          </p>
        </div>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p>Loading gallery...</p>
          </div>
        ) : galleries.length === 0 ? (
          <p className="text-center">No gallery items available</p>
        ) : (
          <>
            <div className="gallery-masonry">
              {galleries.slice(0, visibleCount).map((gallery, index) => (
                <div
                  className="gallery-item"
                  key={gallery._id}
                  data-aos-delay={(index % 10) * 100} 
                  onClick={() => openModal(gallery, index)}
                >
                  {isVideo(gallery) ? (
                    <div className="gallery-video-wrapper">
                      <video
                        className="gallery-media"
                        src={`${Img_BASE_URL}${gallery.image}`}
                        muted
                      />
                      <div className="gallery-video-overlay">
                        <FaPlay />
                      </div>
                    </div>
                  ) : (
                    <div className="gallery-image-wrapper">
                      <img
                        src={`${Img_BASE_URL}${gallery.image}`}
                        alt={gallery.title}
                        className="gallery-media"
                      />
                      <div className="gallery-image-overlay">
                        <div className="overlay-content">
                          <h5 className="overlay-title">{gallery.title}</h5>
                          {gallery.description && (
                            <p className="overlay-description">
                              {gallery.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {visibleCount < galleries.length && (
              <div className="text-center mt-4">
                <Button
                  variant="primary"
                  onClick={() => setVisibleCount((prev) => prev + 5)}
                >
                  View More
                </Button>
              </div>
            )}
          </>
        )}

        {/* Fullscreen Modal */}
        <Modal
          show={showModal}
          onHide={closeModal}
          fullscreen
          className="gallery-modal"
        >
          <Modal.Body className="gallery-modal-body text-center p-0 position-relative">
            {selectedMedia && (
              <>
                {/* Close Button */}
                <Button
                  variant="dark"
                  className="gallery-close-btn position-absolute top-0 end-0 m-3"
                  onClick={closeModal}
                >
                  <FaTimes />
                </Button>

                {/* Prev Button */}
                <Button
                  variant="dark"
                  className="gallery-nav-btn gallery-prev-btn position-absolute top-50 start-0 translate-middle-y"
                  onClick={() => navigateMedia("prev")}
                >
                  <FaChevronLeft />
                </Button>

                {isVideo(selectedMedia) ? (
                  <video
                    controls
                    autoPlay
                    className="w-100 h-100"
                    style={{ objectFit: "contain" }}
                  >
                    <source
                      src={`${Img_BASE_URL}${selectedMedia.image}`}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <img
                    src={`${Img_BASE_URL}${selectedMedia.image}`}
                    alt={selectedMedia.title}
                    className="w-100 h-100"
                    style={{ objectFit: "contain" }}
                  />
                )}

                {/* Next Button */}
                <Button
                  variant="dark"
                  className="gallery-nav-btn gallery-next-btn position-absolute top-50 end-0 translate-middle-y"
                  onClick={() => navigateMedia("next")}
                >
                  <FaChevronRight />
                </Button>
              </>
            )}
          </Modal.Body>
        </Modal>
      </Container>

      {/* Gallery CSS */}
      <style jsx>{`
        .gallery-masonry {
          column-count: 4;
          column-gap: 15px;
        }

        @media (max-width: 1200px) {
          .gallery-masonry {
            column-count: 3;
          }
        }

        @media (max-width: 992px) {
          .gallery-masonry {
            column-count: 2;
          }
        }

        @media (max-width: 576px) {
          .gallery-masonry {
            column-count: 1;
          }
        }

        .gallery-item {
          margin-bottom: 15px;
          break-inside: avoid;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        .gallery-image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }

        .gallery-media {
          width: 100%;
          display: block;
          border-radius: 8px;
          transition: transform 0.5s ease;
        }

        .gallery-item:hover .gallery-media {
          transform: scale(1.05);
        }

        .gallery-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          padding: 15px;
          box-sizing: border-box;
        }

        .gallery-item:hover .gallery-image-overlay {
          opacity: 1;
        }

        .overlay-content {
          text-align: center;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .overlay-content {
          transform: translateY(0);
        }

        .overlay-title {
          font-weight: bold;
          margin-bottom: 8px;
          font-size: 1.1rem;
        }

        .overlay-description {
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.4;
        }

        .gallery-video-wrapper {
          position: relative;
        }

        .gallery-video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          background: rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .gallery-item:hover .gallery-video-overlay {
          opacity: 1;
        }

        .gallery-modal-body {
          background: black;
        }

        .gallery-nav-btn {
          z-index: 1050;
          opacity: 0.8;
          font-size: 1.5rem;
        }

        .gallery-close-btn {
          z-index: 1060;
          font-size: 1.2rem;
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default Gallery;