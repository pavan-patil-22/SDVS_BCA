// import React, { useEffect, useState } from "react";
// import { Container, Table, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
// import { BASE_API_URL } from "../../BaseAPI";



// const GuestMessage = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [reply, setReply] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [sendingReply, setSendingReply] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch all messages
//   const fetchMessages = async () => {
//     try {
//       const res = await fetch(`${BASE_API_URL}/contact-message`);
//       if (!res.ok) throw new Error("Failed to fetch messages");
//       const data = await res.json();
//       setMessages(data);
//     } catch (err) {
//       console.error(err);
//       setError("Error fetching messages.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   // Open modal to reply
//   const handleReplyClick = (message) => {
//     setSelectedMessage(message);
//     setReply("");
//     setShowModal(true);
//   };

//   // Send reply
//   const handleSendReply = async () => {
//     if (!reply.trim()) {
//       alert("Reply cannot be empty!");
//       return;
//     }

//     try {
//       setSendingReply(true);
//       const res = await fetch(`${BASE_API_URL}/contact-message/${selectedMessage._id}/reply`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ reply }),
//       });

//       if (res.ok) {
//         alert("Reply sent successfully!");
//         setShowModal(false);
//         fetchMessages(); // refresh list
//       } else {
//         alert("Failed to send reply.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error sending reply.");
//     } finally {
//       setSendingReply(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

//   return (
//     <Container className="my-5">
//       <h2 className="mb-4 text-center text-primary fw-bold">Guest Messages</h2>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {messages.length === 0 ? (
//         <Alert variant="info" className="text-center">
//           No messages found.
//         </Alert>
//       ) : (
//         <Table striped bordered hover responsive className="shadow">
//           <thead className="table-primary">
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Subject</th>
//               <th>Message</th>
//               <th>Reply</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {messages.map((msg) => (
//               <tr key={msg._id}>
//                 <td>{msg.name}</td>
//                 <td>{msg.email}</td>
//                 <td>{msg.phone || "N/A"}</td>
//                 <td>{msg.subject}</td>
//                 <td style={{ maxWidth: "300px", wordWrap: "break-word" }}>{msg.message}</td>
//                 <td>
//                   {msg.reply ? (
//                     <span className="text-success">
//                       ✅ {msg.reply} <br />
//                       <small className="text-muted">
//                         ({new Date(msg.repliedAt).toLocaleString()})
//                       </small>
//                     </span>
//                   ) : (
//                     <span className="text-muted">No reply yet</span>
//                   )}
//                 </td>
//                 <td className="text-center">
//                   {!msg.reply && (
//                     <Button size="sm" variant="primary" onClick={() => handleReplyClick(msg)}>
//                       Reply
//                     </Button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}

//       {/* Reply Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Reply to {selectedMessage?.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p><strong>Subject:</strong> {selectedMessage?.subject}</p>
//           <p><strong>Message:</strong> {selectedMessage?.message}</p>

//           <Form.Group>
//             <Form.Label>Your Reply</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={4}
//               value={reply}
//               onChange={(e) => setReply(e.target.value)}
//               placeholder="Type your reply here..."
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleSendReply}
//             disabled={sendingReply}
//           >
//             {sendingReply ? "Sending..." : "Send Reply"}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <style>{`
//         h2 {
//           font-weight: bold;
//         }
//         table td {
//           vertical-align: middle;
//         }
//       `}</style>
//     </Container>
//   );
// };

// export default GuestMessage;




import React, { useEffect, useState } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Modal, 
  Form, 
  Spinner, 
  Alert,
  Badge,
  Dropdown
} from "react-bootstrap";
import { 
  FaEnvelope, 
  FaReply, 
  FaUser, 
  FaPhone, 
  FaFilter, 
  FaChevronDown,
  FaChevronUp,
  FaEye
} from "react-icons/fa";
import { BASE_API_URL } from "../../BaseAPI";

const GuestMessage = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("latest");
  const [visibleCount, setVisibleCount] = useState(10);
  const [expandedMessage, setExpandedMessage] = useState(null);

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/contact-message`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      setMessages(data);
      setFilteredMessages(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Sort messages
  useEffect(() => {
    const sorted = [...messages].sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
      } else {
        return new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date);
      }
    });
    setFilteredMessages(sorted);
  }, [messages, sortOrder]);

  // Open modal to reply
  const handleReplyClick = (message) => {
    setSelectedMessage(message);
    setReply("");
    setShowModal(true);
  };

  // Send reply
  const handleSendReply = async () => {
    if (!reply.trim()) {
      alert("Reply cannot be empty!");
      return;
    }

    try {
      setSendingReply(true);
      const res = await fetch(`${BASE_API_URL}/contact-message/${selectedMessage._id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });

      if (res.ok) {
        alert("Reply sent successfully!");
        setShowModal(false);
        fetchMessages(); // refresh list
      } else {
        alert("Failed to send reply.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending reply.");
    } finally {
      setSendingReply(false);
    }
  };

  // Toggle message expansion
  const toggleExpandMessage = (id) => {
    if (expandedMessage === id) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage(id);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="primary" className="mb-3" />
      <p>Loading messages...</p>
    </div>
  );

  return (
    <div className="guest-messages-page">
      <Container className="py-4">
        <div className="page-header" data-aos="fade-down">
          <h2>
            <FaEnvelope className="me-2" />
            Guest Messages
          </h2>
          <p>Manage and respond to messages from your guests</p>
        </div>

        {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

        {/* Filter and Sort Controls */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <span className="me-2">Sort by:</span>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" size="sm">
                <FaFilter className="me-2" />
                {sortOrder === "latest" ? "Latest First" : "Oldest First"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortOrder("latest")}>Latest First</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOrder("oldest")}>Oldest First</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          
          <Badge bg="primary" className="fs-6">
            Total: {messages.length} messages
          </Badge>
        </div>

        {filteredMessages.length === 0 ? (
          <Card className="text-center py-5 mt-4">
            <FaEnvelope size={48} className="text-muted mb-3 mx-auto" />
            <h4>No Messages</h4>
            <p className="text-muted">No guest messages have been received yet</p>
          </Card>
        ) : (
          <>
            <Row>
              {filteredMessages.slice(0, visibleCount).map((message, index) => (
                <Col lg={6} className="mb-4" key={message._id}>
                  <Card className="message-card h-100" data-aos="fade-up" data-aos-delay={index * 100}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <Card.Title className="d-flex align-items-center">
                            <FaUser className="me-2 text-primary" />
                            {message.name}
                          </Card.Title>
                          <div className="message-meta">
                            <small className="text-muted d-block">
                              <FaEnvelope className="me-1" />
                              {message.email}
                            </small>
                            {message.phone && (
                              <small className="text-muted d-block">
                                <FaPhone className="me-1" />
                                {message.phone}
                              </small>
                            )}
                            <small className="text-muted">
                              {formatDate(message.createdAt || message.date)}
                            </small>
                          </div>
                        </div>
                        <div>
                          {message.reply ? (
                            <Badge bg="success" className="me-2">
                              Replied
                            </Badge>
                          ) : (
                            <Badge bg="warning" text="dark">
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h6 className="text-primary">{message.subject}</h6>
                        <p className={`message-content ${expandedMessage === message._id ? '' : 'truncated'}`}>
                          {message.message}
                        </p>
                        {message.message.length > 150 && (
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0"
                            onClick={() => toggleExpandMessage(message._id)}
                          >
                            {expandedMessage === message._id ? (
                              <>Show less <FaChevronUp size={12} /></>
                            ) : (
                              <>Read more <FaChevronDown size={12} /></>
                            )}
                          </Button>
                        )}
                      </div>
                      
                      {message.reply && (
                        <div className="reply-section bg-light p-3 rounded">
                          <h6 className="text-success">Your Reply:</h6>
                          <p className="mb-0">{message.reply}</p>
                          <small className="text-muted">
                            {formatDate(message.repliedAt)}
                          </small>
                        </div>
                      )}
                      
                      <div className="d-flex justify-content-end mt-3">
                        {!message.reply && (
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => handleReplyClick(message)}
                          >
                            <FaReply className="me-1" />
                            Reply
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            
            {visibleCount < filteredMessages.length && (
              <div className="text-center mt-4">
                <Button 
                  variant="outline-primary"
                  onClick={() => setVisibleCount(prev => prev + 6)}
                >
                  <FaEye className="me-2" />
                  View More Messages
                </Button>
              </div>
            )}
          </>
        )}

        {/* Reply Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered className="reply-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              <FaReply className="me-2" />
              Reply to {selectedMessage?.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="original-message bg-light p-3 rounded mb-3">
              <h6 className="text-primary">Original Message:</h6>
              <p><strong>Subject:</strong> {selectedMessage?.subject}</p>
              <p><strong>Message:</strong> {selectedMessage?.message}</p>
            </div>

            <Form.Group>
              <Form.Label>Your Reply</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your response here..."
                className="reply-textarea"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSendReply}
              disabled={sendingReply || !reply.trim()}
            >
              {sendingReply ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Sending...
                </>
              ) : (
                <>
                  <FaReply className="me-2" />
                  Send Reply
                </>
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <style>
        {`
          .guest-messages-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f9fc 0%, #eef2f6 100%);
          }
          
          .page-header {
            background: white;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 25px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border-left: 4px solid #4e73df;
            text-align: center;
          }
          
          .page-header h2 {
            color: #2e3a59;
            font-weight: 700;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .page-header p {
            color: #6e6e6e;
            margin: 0 0 15px 0;
          }
          
          .message-card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
          }
          
          .message-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
          
          .message-content.truncated {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .reply-section {
            border-left: 3px solid #28a745;
          }
          
          .reply-modal .modal-content {
            border-radius: 15px;
            overflow: hidden;
            border: none;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          }
          
          .reply-modal .modal-header {
            background: white;
            color: #2e3a59;
            border-bottom: 1px solid #eaecf4;
          }
          
          .reply-modal .modal-title {
            font-weight: 600;
            display: flex;
            align-items: center;
          }
          
          .reply-textarea {
            resize: none;
            border-radius: 8px;
            border: 1px solid #d1d3e2;
          }
          
          .reply-textarea:focus {
            border-color: #4e73df;
            box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
          }
          
          .original-message {
            border-left: 3px solid #4e73df;
          }
          
          @media (max-width: 768px) {
            .page-header {
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  );
};

export default GuestMessage;