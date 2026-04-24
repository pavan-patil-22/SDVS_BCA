import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Spinner,
  Badge,
  Dropdown,
  Nav,
  Accordion
} from "react-bootstrap";
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaTrophy, 
  FaUserGraduate, 
  FaCalendarAlt, 
  FaChartLine,
  FaCrown,
  FaUniversity,
  FaSortAlphaDown,
  FaSortNumericDown,
  FaSearch,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const ManageToppers = () => {
  const [toppers, setToppers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTopper, setSelectedTopper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    semester: "",
    year: "",
    percentage: "",
    rank: "",
    topperType: "",
    gender: "",
  });
  const [topperPhoto, setTopperPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [filterYear, setFilterYear] = useState("");
  const [expandedSections, setExpandedSections] = useState({});

  // Fetch all toppers
  const fetchToppers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_API_URL}/topper`);
      setToppers(res.data.data || res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load toppers data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
    fetchToppers();
  }, []);

  // Filter toppers based on search and filters
  const filteredToppers = toppers.filter(topper => {
    // Tab filtering
    if (activeTab !== "all" && topper.topperType !== activeTab) return false;
    
    // Search filtering
    if (searchTerm && !topper.studentName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    // Year filtering
    if (filterYear && topper.year !== filterYear) return false;
    
    return true;
  });

  // Group semester toppers by semester and sort by rank
  const groupSemesterToppers = () => {
    const semesterGroups = {};
    
    filteredToppers
      .filter(topper => topper.topperType === "Sem topper")
      .sort((a, b) => {
        // First sort by semester
        const semesterCompare = parseInt(a.semester) - parseInt(b.semester);
        if (semesterCompare !== 0) return semesterCompare;
        
        // Then sort by rank within semester
        return parseInt(a.rank) - parseInt(b.rank);
      })
      .forEach(topper => {
        const semester = topper.semester || "Unknown";
        if (!semesterGroups[semester]) {
          semesterGroups[semester] = [];
        }
        semesterGroups[semester].push(topper);
      });
    
    return semesterGroups;
  };

  // Group university toppers by year and sort by rank
  const groupUniversityToppers = () => {
    const yearGroups = {};
    
    filteredToppers
      .filter(topper => topper.topperType === "university topper")
      .sort((a, b) => {
        // First sort by year (newest first)
        const yearCompare = b.year.localeCompare(a.year);
        if (yearCompare !== 0) return yearCompare;
        
        // Then sort by rank within year
        return parseInt(a.rank) - parseInt(b.rank);
      })
      .forEach(topper => {
        const year = topper.year || "Unknown Year";
        if (!yearGroups[year]) {
          yearGroups[year] = [];
        }
        yearGroups[year].push(topper);
      });
    
    return yearGroups;
  };

  // Group best boy/girl by year
  const groupBestBoyGirl = () => {
    const yearGroups = {};
    
    filteredToppers
      .filter(topper => topper.topperType === "best boy/girl of the college")
      .sort((a, b) => b.year.localeCompare(a.year)) // Newest first
      .forEach(topper => {
        const year = topper.year || "Unknown Year";
        if (!yearGroups[year]) {
          yearGroups[year] = [];
        }
        yearGroups[year].push(topper);
      });
    
    return yearGroups;
  };

  // Get available years for filter
  const availableYears = [...new Set(toppers.map(topper => topper.year).filter(Boolean))];

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "topperPhoto" && files) {
      setTopperPhoto(files[0]);
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "" && formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });
    if (topperPhoto) {
      data.append("topperPhoto", topperPhoto);
    }

    try {
      setFormLoading(true);
      if (editMode && selectedTopper) {
        await axios.put(
          `${BASE_API_URL}/topper/${selectedTopper._id}`,
          data
        );
        toast.success("Topper updated successfully!");
      } else {
        await axios.post(`${BASE_API_URL}/topper`, data);
        toast.success("Topper added successfully!");
      }
      fetchToppers();
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save topper data");
    } finally {
      setFormLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this topper?")) {
      try {
        setLoading(true);
        await axios.delete(`${BASE_API_URL}/topper/${id}`);
        toast.success("Topper deleted successfully!");
        fetchToppers();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete topper");
      } finally {
        setLoading(false);
      }
    }
  };

  // Open modal for edit
  const handleEdit = (topper) => {
    setEditMode(true);
    setSelectedTopper(topper);
    setFormData({
      studentName: topper.studentName,
      semester: topper.semester,
      year: topper.year,
      percentage: topper.percentage,
      rank: topper.rank,
      topperType: topper.topperType,
      gender: topper.gender,
    });
    setTopperPhoto(null);
    setPreviewImage(topper.photo ? `${topper.photo}` : null);
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      studentName: "",
      semester: "",
      year: "",
      percentage: "",
      rank: "",
      topperType: "",
      gender: "",
    });
    setTopperPhoto(null);
    setPreviewImage(null);
    setEditMode(false);
    setSelectedTopper(null);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Toggle section expand/collapse
  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Get rank badge color
  const getRankBadgeColor = (rank) => {
    if (rank == 1) return 'gold';
    if (rank == 2) return 'silver';
    if (rank == 3) return 'bronze';
    return 'primary';
  };

  // Get rank icon
  const getRankIcon = (rank) => {
    if (rank == 1) return '🥇';
    if (rank == 2) return '🥈';
    if (rank == 3) return '🥉';
    return '#️⃣';
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterYear("");
    setSortBy("rank");
    setActiveTab("all");
  };

  return (
    <div className="manage-toppers-page">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Container className="py-4">
        <div className="page-header" data-aos="fade-down">
          <h2>🎓 Toppers Management</h2>
          <p>Manage and showcase your institution's academic achievers</p>
          <Button 
            variant="primary" 
            className="mt-3"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <FaPlus className="me-2" />
            Add New Topper
          </Button>
        </div>

        {/* Filter Section */}
        <Card className="mb-4 border-0 shadow" data-aos="fade-up">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={4}>
                <div className="search-box">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Search by student name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </Col>
              
              <Col md={3}>
                <Form.Select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                >
                  <option value="">All Years</option>
                  {availableYears.sort((a, b) => b.localeCompare(a)).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </Form.Select>
              </Col>
              
              <Col md={3}>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rank">Sort by Rank</option>
                  <option value="percentage">Sort by Percentage</option>
                  <option value="name">Sort by Name</option>
                </Form.Select>
              </Col>
              
              <Col md={2}>
                <Button 
                  variant="outline-danger" 
                  className="w-100"
                  onClick={resetFilters}
                >
                  Clear Filters
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Tab Navigation */}
        <div className="topper-tabs mb-4" data-aos="fade-up">
          <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
            <Nav.Item>
              <Nav.Link eventKey="all" className="fw-semibold">
                <FaTrophy className="me-2" /> All Toppers ({filteredToppers.length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Sem topper" className="fw-semibold">
                <FaTrophy className="me-2" /> Sem Toppers ({filteredToppers.filter(t => t.topperType === "Sem topper").length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="university topper" className="fw-semibold">
                <FaUniversity className="me-2" /> University Toppers ({filteredToppers.filter(t => t.topperType === "university topper").length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="best boy/girl of the college" className="fw-semibold">
                <FaCrown className="me-2" /> Best Boy/Girl ({filteredToppers.filter(t => t.topperType === "best boy/girl of the college").length})
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p>Loading toppers data...</p>
          </div>
        ) : filteredToppers.length === 0 ? (
          <div className="text-center py-5 empty-state">
            <FaTrophy size={48} className="text-muted mb-3" />
            <h4>No Toppers Found</h4>
            <p className="text-muted">
              {searchTerm || filterYear ? "Try changing your search or filter criteria" : "Start adding academic achievers to showcase excellence"}
            </p>
            <Button 
              variant="primary" 
              onClick={() => setShowModal(true)}
              className="px-4 me-2"
            >
              Add New Topper
            </Button>
            {(searchTerm || filterYear) && (
              <Button 
                variant="outline-secondary" 
                onClick={resetFilters}
                className="px-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : activeTab === "all" ? (
          // Display all toppers grouped by type
          <div>
            {/* Semester Toppers Section */}
            <div className="topper-section mb-5" data-aos="fade-up">
              <div className="section-header mb-4">
                <h4 className="d-flex align-items-center">
                  <FaTrophy className="me-2 text-info" />
                  Semester Toppers (Semester-wise)
                  <Badge bg="secondary" className="ms-3">
                    {filteredToppers.filter(t => t.topperType === "Sem topper").length}
                  </Badge>
                </h4>
              </div>
              
              {Object.entries(groupSemesterToppers()).map(([semester, semesterToppers]) => (
                <div key={semester} className="mb-4">
                  <Card className="border-0 shadow-sm mb-3">
                    <Card.Header 
                      className="bg-light cursor-pointer"
                      onClick={() => toggleSection(`sem-${semester}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                          <FaTrophy className="me-2 text-info" />
                          Semester {semester} Toppers
                          <Badge bg="info" className="ms-2">
                            {semesterToppers.length} Student{semesterToppers.length > 1 ? 's' : ''}
                          </Badge>
                        </h5>
                        {expandedSections[`sem-${semester}`] ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </Card.Header>
                    {expandedSections[`sem-${semester}`] && (
                      <Card.Body>
                        <Row>
                          {semesterToppers.map((topper, index) => (
                            <Col xl={3} lg={4} md={6} className="mb-4" key={topper._id}>
                              <TopperCard 
                                topper={topper} 
                                handleEdit={handleEdit} 
                                handleDelete={handleDelete}
                                index={index}
                              />
                            </Col>
                          ))}
                        </Row>
                      </Card.Body>
                    )}
                  </Card>
                </div>
              ))}
            </div>

            {/* University Toppers Section */}
            <div className="topper-section mb-5" data-aos="fade-up">
              <div className="section-header mb-4">
                <h4 className="d-flex align-items-center">
                  <FaUniversity className="me-2 text-warning" />
                  University Toppers (Year-wise)
                  <Badge bg="secondary" className="ms-3">
                    {filteredToppers.filter(t => t.topperType === "university topper").length}
                  </Badge>
                </h4>
              </div>
              
              {Object.entries(groupUniversityToppers()).map(([year, yearToppers]) => (
                <div key={year} className="mb-4">
                  <Card className="border-0 shadow-sm mb-3">
                    <Card.Header 
                      className="bg-light cursor-pointer"
                      onClick={() => toggleSection(`uni-${year}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                          <FaUniversity className="me-2 text-warning" />
                          Academic Year: {year}
                          <Badge bg="warning" className="ms-2">
                            {yearToppers.length} Topper{yearToppers.length > 1 ? 's' : ''}
                          </Badge>
                        </h5>
                        {expandedSections[`uni-${year}`] ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </Card.Header>
                    {expandedSections[`uni-${year}`] && (
                      <Card.Body>
                        <Row>
                          {yearToppers.map((topper, index) => (
                            <Col xl={3} lg={4} md={6} className="mb-4" key={topper._id}>
                              <TopperCard 
                                topper={topper} 
                                handleEdit={handleEdit} 
                                handleDelete={handleDelete}
                                index={index}
                              />
                            </Col>
                          ))}
                        </Row>
                      </Card.Body>
                    )}
                  </Card>
                </div>
              ))}
            </div>

            {/* Best Boy/Girl Section */}
            <div className="topper-section mb-5" data-aos="fade-up">
              <div className="section-header mb-4">
                <h4 className="d-flex align-items-center">
                  <FaCrown className="me-2 text-danger" />
                  Best Boy/Girl of the College (Year-wise)
                  <Badge bg="secondary" className="ms-3">
                    {filteredToppers.filter(t => t.topperType === "best boy/girl of the college").length}
                  </Badge>
                </h4>
              </div>
              
              {Object.entries(groupBestBoyGirl()).map(([year, bestToppers]) => (
                <div key={year} className="mb-4">
                  <Card className="border-0 shadow-sm mb-3">
                    <Card.Header 
                      className="bg-light cursor-pointer"
                      onClick={() => toggleSection(`best-${year}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                          <FaCrown className="me-2 text-danger" />
                          Academic Year: {year}
                          <Badge bg="danger" className="ms-2">
                            {bestToppers.length} Student{bestToppers.length > 1 ? 's' : ''}
                          </Badge>
                        </h5>
                        {expandedSections[`best-${year}`] ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </Card.Header>
                    {expandedSections[`best-${year}`] && (
                      <Card.Body>
                        <Row>
                          {bestToppers.map((topper, index) => (
                            <Col xl={3} lg={4} md={6} className="mb-4" key={topper._id}>
                              <TopperCard 
                                topper={topper} 
                                handleEdit={handleEdit} 
                                handleDelete={handleDelete}
                                index={index}
                              />
                            </Col>
                          ))}
                        </Row>
                      </Card.Body>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === "Sem topper" ? (
          // Display only semester toppers
          <div className="topper-section" data-aos="fade-up">
            {Object.entries(groupSemesterToppers()).map(([semester, semesterToppers]) => (
              <div key={semester} className="mb-4">
                <Card className="border-0 shadow-sm mb-3">
                  <Card.Header className="bg-info text-white">
                    <h5 className="mb-0">
                      <FaTrophy className="me-2" />
                      Semester {semester} Toppers
                      <Badge bg="light" text="dark" className="ms-2">
                        {semesterToppers.length} Student{semesterToppers.length > 1 ? 's' : ''}
                      </Badge>
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {semesterToppers.map((topper, index) => (
                        <Col xl={3} lg={4} md={6} className="mb-4" key={topper._id}>
                          <TopperCard 
                            topper={topper} 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}
                            index={index}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : activeTab === "university topper" ? (
          // Display only university toppers
          <div className="topper-section" data-aos="fade-up">
            {Object.entries(groupUniversityToppers()).map(([year, yearToppers]) => (
              <div key={year} className="mb-4">
                <Card className="border-0 shadow-sm mb-3">
                  <Card.Header className="bg-warning text-dark">
                    <h5 className="mb-0">
                      <FaUniversity className="me-2" />
                      Academic Year: {year}
                      <Badge bg="light" text="dark" className="ms-2">
                        {yearToppers.length} Topper{yearToppers.length > 1 ? 's' : ''}
                      </Badge>
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {yearToppers.map((topper, index) => (
                        <Col xl={3} lg={4} md={6} className="mb-4" key={topper._id}>
                          <TopperCard 
                            topper={topper} 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}
                            index={index}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          // Display only best boy/girl
          <div className="topper-section" data-aos="fade-up">
            {Object.entries(groupBestBoyGirl()).map(([year, bestToppers]) => (
              <div key={year} className="mb-4">
                <Card className="border-0 shadow-sm mb-3">
                  <Card.Header className="bg-danger text-white">
                    <h5 className="mb-0">
                      <FaCrown className="me-2" />
                      Academic Year: {year}
                      <Badge bg="light" text="dark" className="ms-2">
                        {bestToppers.length} Student{bestToppers.length > 1 ? 's' : ''}
                      </Badge>
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {bestToppers.map((topper, index) => (
                        <Col xl={3} lg={4} md={6} className="mb-4" key={topper._id}>
                          <TopperCard 
                            topper={topper} 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}
                            index={index}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Add/Edit - Keep the same as before */}
        <Modal show={showModal} onHide={handleCloseModal} centered className="topper-modal">
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? "Edit Topper" : "Add New Topper"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Student Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                      placeholder="Enter student name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Year *</Form.Label>
                    <Form.Control
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 2023-24"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Topper Type *</Form.Label>
                    <Form.Select
                      name="topperType"
                      value={formData.topperType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Sem topper">Sem Topper</option>
                      <option value="university topper">University Topper</option>
                      <option value="best boy/girl of the college">Best Boy/Girl of the College</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select gender</option>
                      <option value="boy">Boy</option>
                      <option value="girl">Girl</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              {formData.topperType === "Sem topper" && (
                <Form.Group className="mb-3">
                  <Form.Label>Semester</Form.Label>
                  <Form.Control
                    type="number"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    min="1"
                    placeholder="Enter semester number"
                  />
                </Form.Group>
              )}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Percentage/SGPA</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="percentage"
                      value={formData.percentage}
                      onChange={handleChange}
                      placeholder="Enter percentage or SGPA"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rank</Form.Label>
                    <Form.Control
                      type="number"
                      name="rank"
                      value={formData.rank}
                      onChange={handleChange}
                      min="1"
                      placeholder="Enter rank"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Student Photo *</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setTopperPhoto(file);
                    if (file) {
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                  required={!editMode}
                />
                {previewImage && (
                  <div className="mt-2">
                    <img src={previewImage} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  </div>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={formLoading}>
              {formLoading ? <Spinner animation="border" size="sm" /> : null}
              {editMode ? "Update Topper" : "Add Topper"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <style>
        {`
          .manage-toppers-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f9fc 0%, #eef2f6 100%);
          }
          
          .page-header {
            background: white;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 25px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border-left: 4px solid #ffc107;
            text-align: center;
          }
          
          .page-header h2 {
            color: #2e3a59;
            font-weight: 700;
            margin-bottom: 5px;
          }
          
          .page-header p {
            color: #6e6e6e;
            margin: 0 0 15px 0;
          }
          
          .search-box .input-group-text {
            background-color: white;
            border-right: none;
          }
          
          .search-box .form-control {
            border-left: none;
            padding-left: 0;
          }
          
          .topper-tabs .nav-link {
            color: #6c757d;
            border-bottom: 3px solid transparent;
          }
          
          .topper-tabs .nav-link.active {
            color: #2e3a59;
            border-bottom: 3px solid #ffc107;
            background-color: transparent;
          }
          
          .section-header {
            padding-bottom: 10px;
            border-bottom: 2px solid #eaeaea;
          }
          
          .cursor-pointer {
            cursor: pointer;
          }
          
          .topper-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            height: 100%;
          }
          
          .topper-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
          
          .topper-image-container {
            position: relative;
            height: 180px;
            overflow: hidden;
          }
          
          .topper-image {
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
          }
          
          .topper-card:hover .topper-image {
            transform: scale(1.05);
          }
          
          .topper-image-placeholder {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e6f0 100%);
            color: #858796;
          }
          
          .topper-actions {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 5px;
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .topper-card:hover .topper-actions {
            opacity: 1;
          }
          
          .action-btn {
            border-radius: 50%;
            width: 35px;
            height: 35px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0;
          }
          
          .topper-name {
            color: #2e3a59;
            font-weight: 600;
            margin-bottom: 10px;
            font-size: 1.1rem;
          }
          
          .topper-details {
            margin-top: 10px;
          }
          
          .topper-detail-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            color: #5a5c69;
            font-size: 0.9rem;
          }
          
          .rank-badge {
            font-size: 0.85rem;
            padding: 6px 12px;
            border-radius: 20px;
          }
          
          .rank-badge.bg-gold {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%) !important;
            color: #000;
          }
          
          .rank-badge.bg-silver {
            background: linear-gradient(135deg, #C0C0C0 0%, #A9A9A9 100%) !important;
            color: #000;
          }
          
          .rank-badge.bg-bronze {
            background: linear-gradient(135deg, #CD7F32 0%, #8B4513 100%) !important;
            color: white;
          }
          
          .empty-state {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          }
          
          @media (max-width: 768px) {
            .page-header {
              text-align: center;
            }
            
            .search-box {
              margin-bottom: 15px;
            }
            
            .topper-image-container {
              height: 160px;
            }
            
            .topper-actions {
              opacity: 1;
            }
            
            .topper-tabs .nav-item {
              width: 100%;
            }
            
            .topper-tabs .nav-link {
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  );
};

// Separate Topper Card Component - Keep the same as before
const TopperCard = ({ topper, handleEdit, handleDelete, index }) => {
  const getRankBadgeColor = (rank) => {
    if (rank == 1) return 'gold';
    if (rank == 2) return 'silver';
    if (rank == 3) return 'bronze';
    return 'primary';
  };

  const getRankIcon = (rank) => {
    if (rank == 1) return '🥇';
    if (rank == 2) return '🥈';
    if (rank == 3) return '🥉';
    return '#️⃣';
  };

  const getTopperTypeColor = (type) => {
    switch(type) {
      case "Sem topper": return "info";
      case "university topper": return "warning";
      case "best boy/girl of the college": return "danger";
      default: return "primary";
    }
  };

  const getTopperTypeIcon = (type) => {
    switch(type) {
      case "Sem topper": return <FaTrophy />;
      case "university topper": return <FaUniversity />;
      case "best boy/girl of the college": return <FaCrown />;
      default: return <FaTrophy />;
    }
  };

  return (
    <Card className="topper-card h-100" data-aos="fade-up" data-aos-delay={index * 50}>
      <div className="topper-image-container">
        {topper.photo ? (
          <Card.Img
            variant="top"
            src={`${topper.photo}`}
            className="topper-image"
          />
        ) : (
          <div className="topper-image-placeholder">
            <FaUserGraduate size={48} />
          </div>
        )}
        <div className="topper-actions">
          <Button 
            variant="primary" 
            size="sm" 
            className="action-btn"
            onClick={() => handleEdit(topper)}
          >
            <FaEdit />
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            className="action-btn"
            onClick={() => handleDelete(topper._id)}
          >
            <FaTrash />
          </Button>
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="topper-name">{topper.studentName}</Card.Title>
        
        <div className="mb-3">
          <Badge bg={getTopperTypeColor(topper.topperType)} className="mb-2">
            {getTopperTypeIcon(topper.topperType)} {topper.topperType}
            {topper.gender && ` (${topper.gender})`}
          </Badge>
        </div>
        
        <div className="topper-details">
          {topper.semester && (
            <div className="topper-detail-item">
              <FaTrophy className="me-2 text-info" />
              <span>Sem {topper.semester}</span>
            </div>
          )}
          
          <div className="topper-detail-item">
            <FaCalendarAlt className="me-2 text-secondary" />
            <span>{topper.year}</span>
          </div>
          
          {topper.percentage && (
            <div className="topper-detail-item">
              <FaChartLine className="me-2 text-success" />
              <span><strong>{topper.percentage}%</strong></span>
            </div>
          )}
          
          {topper.rank && (
            <div className="topper-detail-item">
              <Badge bg={getRankBadgeColor(topper.rank)} className="rank-badge">
                {getRankIcon(topper.rank)} Rank {topper.rank}
              </Badge>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ManageToppers;