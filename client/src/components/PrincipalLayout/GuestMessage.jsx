

// import React, { useEffect, useState } from "react";
// import { 
//   Container, 
//   Row, 
//   Col, 
//   Card, 
//   Button, 
//   Modal, 
//   Form, 
//   Spinner, 
//   Alert,
//   Badge,
//   Dropdown
// } from "react-bootstrap";
// import { 
//   FaEnvelope, 
//   FaReply, 
//   FaUser, 
//   FaPhone, 
//   FaFilter, 
//   FaChevronDown,
//   FaChevronUp,
//   FaEye
// } from "react-icons/fa";
// import { BASE_API_URL } from "../../BaseAPI";

// const GuestMessage = () => {
//   const [messages, setMessages] = useState([]);
//   const [filteredMessages, setFilteredMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [reply, setReply] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [sendingReply, setSendingReply] = useState(false);
//   const [error, setError] = useState(null);
//   const [sortOrder, setSortOrder] = useState("latest");
//   const [visibleCount, setVisibleCount] = useState(10);
//   const [expandedMessage, setExpandedMessage] = useState(null);

//   // Fetch all messages
//   const fetchMessages = async () => {
//     try {
//       const res = await fetch(`${BASE_API_URL}/contact-message`);
//       if (!res.ok) throw new Error("Failed to fetch messages");
//       const data = await res.json();
//       setMessages(data);
//       setFilteredMessages(data);
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

//   // Sort messages
//   useEffect(() => {
//     const sorted = [...messages].sort((a, b) => {
//       if (sortOrder === "latest") {
//         return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
//       } else {
//         return new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date);
//       }
//     });
//     setFilteredMessages(sorted);
//   }, [messages, sortOrder]);

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

//   // Toggle message expansion
//   const toggleExpandMessage = (id) => {
//     if (expandedMessage === id) {
//       setExpandedMessage(null);
//     } else {
//       setExpandedMessage(id);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) return (
//     <div className="text-center py-5">
//       <Spinner animation="border" variant="primary" className="mb-3" />
//       <p>Loading messages...</p>
//     </div>
//   );

//   return (
//     <div className="guest-messages-page">
//       <Container className="py-4">
//         <div className="page-header" data-aos="fade-down">
//           <h2>
//             <FaEnvelope className="me-2" />
//             Guest Messages
//           </h2>
//           <p>Manage and respond to messages from your guests</p>
//         </div>

//         {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

//         {/* Filter and Sort Controls */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <div className="d-flex align-items-center">
//             <span className="me-2">Sort by:</span>
//             <Dropdown>
//               <Dropdown.Toggle variant="outline-primary" size="sm">
//                 <FaFilter className="me-2" />
//                 {sortOrder === "latest" ? "Latest First" : "Oldest First"}
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={() => setSortOrder("latest")}>Latest First</Dropdown.Item>
//                 <Dropdown.Item onClick={() => setSortOrder("oldest")}>Oldest First</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
          
//           <Badge bg="primary" className="fs-6">
//             Total: {messages.length} messages
//           </Badge>
//         </div>

//         {filteredMessages.length === 0 ? (
//           <Card className="text-center py-5 mt-4">
//             <FaEnvelope size={48} className="text-muted mb-3 mx-auto" />
//             <h4>No Messages</h4>
//             <p className="text-muted">No guest messages have been received yet</p>
//           </Card>
//         ) : (
//           <>
//             <Row>
//               {filteredMessages.slice(0, visibleCount).map((message, index) => (
//                 <Col lg={6} className="mb-4" key={message._id}>
//                   <Card className="message-card h-100" data-aos="fade-up" data-aos-delay={index * 100}>
//                     <Card.Body>
//                       <div className="d-flex justify-content-between align-items-start mb-3">
//                         <div>
//                           <Card.Title className="d-flex align-items-center">
//                             <FaUser className="me-2 text-primary" />
//                             {message.name}
//                           </Card.Title>
//                           <div className="message-meta">
//                             <small className="text-muted d-block">
//                               <FaEnvelope className="me-1" />
//                               {message.email}
//                             </small>
//                             {message.phone && (
//                               <small className="text-muted d-block">
//                                 <FaPhone className="me-1" />
//                                 {message.phone}
//                               </small>
//                             )}
//                             <small className="text-muted">
//                               {formatDate(message.createdAt || message.date)}
//                             </small>
//                           </div>
//                         </div>
//                         <div>
//                           {message.reply ? (
//                             <Badge bg="success" className="me-2">
//                               Replied
//                             </Badge>
//                           ) : (
//                             <Badge bg="warning" text="dark">
//                               Pending
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
                      
//                       <div className="mb-3">
//                         <h6 className="text-primary">{message.subject}</h6>
//                         <p className={`message-content ${expandedMessage === message._id ? '' : 'truncated'}`}>
//                           {message.message}
//                         </p>
//                         {message.message.length > 150 && (
//                           <Button 
//                             variant="link" 
//                             size="sm" 
//                             className="p-0"
//                             onClick={() => toggleExpandMessage(message._id)}
//                           >
//                             {expandedMessage === message._id ? (
//                               <>Show less <FaChevronUp size={12} /></>
//                             ) : (
//                               <>Read more <FaChevronDown size={12} /></>
//                             )}
//                           </Button>
//                         )}
//                       </div>
                      
//                       {message.reply && (
//                         <div className="reply-section bg-light p-3 rounded">
//                           <h6 className="text-success">Your Reply:</h6>
//                           <p className="mb-0">{message.reply}</p>
//                           <small className="text-muted">
//                             {formatDate(message.repliedAt)}
//                           </small>
//                         </div>
//                       )}
                      
//                       <div className="d-flex justify-content-end mt-3">
//                         {!message.reply && (
//                           <Button 
//                             variant="primary" 
//                             size="sm"
//                             onClick={() => handleReplyClick(message)}
//                           >
//                             <FaReply className="me-1" />
//                             Reply
//                           </Button>
//                         )}
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
            
//             {visibleCount < filteredMessages.length && (
//               <div className="text-center mt-4">
//                 <Button 
//                   variant="outline-primary"
//                   onClick={() => setVisibleCount(prev => prev + 6)}
//                 >
//                   <FaEye className="me-2" />
//                   View More Messages
//                 </Button>
//               </div>
//             )}
//           </>
//         )}

//         {/* Reply Modal */}
//         <Modal show={showModal} onHide={() => setShowModal(false)} centered className="reply-modal">
//           <Modal.Header closeButton>
//             <Modal.Title>
//               <FaReply className="me-2" />
//               Reply to {selectedMessage?.name}
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="original-message bg-light p-3 rounded mb-3">
//               <h6 className="text-primary">Original Message:</h6>
//               <p><strong>Subject:</strong> {selectedMessage?.subject}</p>
//               <p><strong>Message:</strong> {selectedMessage?.message}</p>
//             </div>

//             <Form.Group>
//               <Form.Label>Your Reply</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={5}
//                 value={reply}
//                 onChange={(e) => setReply(e.target.value)}
//                 placeholder="Type your response here..."
//                 className="reply-textarea"
//               />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button 
//               variant="outline-secondary" 
//               onClick={() => setShowModal(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="primary"
//               onClick={handleSendReply}
//               disabled={sendingReply || !reply.trim()}
//             >
//               {sendingReply ? (
//                 <>
//                   <Spinner animation="border" size="sm" className="me-2" />
//                   Sending...
//                 </>
//               ) : (
//                 <>
//                   <FaReply className="me-2" />
//                   Send Reply
//                 </>
//               )}
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </Container>

//       <style>
//         {`
//           .guest-messages-page {
//             min-height: 100vh;
//             background: linear-gradient(135deg, #f8f9fc 0%, #eef2f6 100%);
//           }
          
//           .page-header {
//             background: white;
//             padding: 25px;
//             border-radius: 12px;
//             margin-bottom: 25px;
//             box-shadow: 0 4px 20px rgba(0,0,0,0.08);
//             border-left: 4px solid #4e73df;
//             text-align: center;
//           }
          
//           .page-header h2 {
//             color: #2e3a59;
//             font-weight: 700;
//             margin-bottom: 5px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }
          
//           .page-header p {
//             color: #6e6e6e;
//             margin: 0 0 15px 0;
//           }
          
//           .message-card {
//             border: none;
//             border-radius: 12px;
//             box-shadow: 0 5px 15px rgba(0,0,0,0.08);
//             transition: all 0.3s ease;
//           }
          
//           .message-card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 10px 25px rgba(0,0,0,0.15);
//           }
          
//           .message-content.truncated {
//             display: -webkit-box;
//             -webkit-line-clamp: 3;
//             -webkit-box-orient: vertical;
//             overflow: hidden;
//           }
          
//           .reply-section {
//             border-left: 3px solid #28a745;
//           }
          
//           .reply-modal .modal-content {
//             border-radius: 15px;
//             overflow: hidden;
//             border: none;
//             box-shadow: 0 15px 35px rgba(0,0,0,0.2);
//           }
          
//           .reply-modal .modal-header {
//             background: white;
//             color: #2e3a59;
//             border-bottom: 1px solid #eaecf4;
//           }
          
//           .reply-modal .modal-title {
//             font-weight: 600;
//             display: flex;
//             align-items: center;
//           }
          
//           .reply-textarea {
//             resize: none;
//             border-radius: 8px;
//             border: 1px solid #d1d3e2;
//           }
          
//           .reply-textarea:focus {
//             border-color: #4e73df;
//             box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
//           }
          
//           .original-message {
//             border-left: 3px solid #4e73df;
//           }
          
//           @media (max-width: 768px) {
//             .page-header {
//               text-align: center;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default GuestMessage;







import React, { useEffect, useState } from "react";
import {
  FaEnvelope, FaReply, FaUser, FaPhone,
  FaChevronDown, FaChevronUp, FaEye, FaFilter, FaTimes
} from "react-icons/fa";
import { BASE_API_URL } from "../../BaseAPI";

/* ─── Design tokens ──────────────────────────────── */
const T = {
  red:       "#c4122f",
  redDark:   "#8a0000",
  blue:      "#1a4eb0",
  blueDark:  "#0d2f6e",
  yellow:    "#ffcc00",
  white:     "#ffffff",
  offWhite:  "#f7f7f5",
  dark:      "#111111",
  muted:     "#666666",
  border:    "#e4e4e0",
  success:   "#1a8a4a",
  successBg: "#edfbf2",
  pendingBg: "#fff8e1",
};

/* ─── Font injection ─────────────────────────────── */
const injectFonts = () => {
  if (document.getElementById("gm-fonts")) return;
  const el = document.createElement("style");
  el.id = "gm-fonts";
  el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    @keyframes fadeUp   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes spin     { to { transform: rotate(360deg); } }
    @keyframes modalIn  { from { opacity:0; transform:scale(0.95) translateY(10px); } to { opacity:1; transform:none; } }
  `;
  document.head.appendChild(el);
};

/* ─── Tiny helpers ───────────────────────────────── */
const Badge = ({ children, variant }) => {
  const styles = {
    replied: { bg: T.successBg, color: T.success, border: T.success },
    pending: { bg: T.pendingBg, color: "#8a6500", border: T.yellow },
  }[variant] || { bg: "#eef2ff", color: T.blue, border: T.blue };
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
      background: styles.bg, color: styles.color,
      border: `1px solid ${styles.border}`,
    }}>{children}</span>
  );
};

const Spinner = () => (
  <span style={{
    display: "inline-block", width: 16, height: 16,
    border: "2px solid rgba(255,255,255,0.4)",
    borderTopColor: T.white, borderRadius: "50%",
    animation: "spin 0.7s linear infinite", verticalAlign: "middle",
  }} />
);

const formatDate = (d) => !d ? "" : new Date(d).toLocaleDateString("en-IN", {
  year: "numeric", month: "short", day: "numeric",
  hour: "2-digit", minute: "2-digit",
});

/* ═══════════════════════════════════════════════════ */
const GuestMessage = () => {
  const [messages,         setMessages]         = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [selectedMessage,  setSelectedMessage]  = useState(null);
  const [reply,            setReply]            = useState("");
  const [showModal,        setShowModal]        = useState(false);
  const [sendingReply,     setSendingReply]     = useState(false);
  const [error,            setError]            = useState(null);
  const [sortOrder,        setSortOrder]        = useState("latest");
  const [visibleCount,     setVisibleCount]     = useState(10);
  const [expandedId,       setExpandedId]       = useState(null);
  const [showSortMenu,     setShowSortMenu]     = useState(false);

  useEffect(() => { injectFonts(); }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/contact-message`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMessages(data);
      setFilteredMessages(data);
    } catch {
      setError("Could not load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  useEffect(() => {
    const sorted = [...messages].sort((a, b) => {
      const da = new Date(a.createdAt || a.date);
      const db = new Date(b.createdAt || b.date);
      return sortOrder === "latest" ? db - da : da - db;
    });
    setFilteredMessages(sorted);
  }, [messages, sortOrder]);

  const handleReplyClick = (msg) => {
    setSelectedMessage(msg);
    setReply("");
    setShowModal(true);
  };

  const handleSendReply = async () => {
    if (!reply.trim()) return;
    try {
      setSendingReply(true);
      const res = await fetch(`${BASE_API_URL}/contact-message/${selectedMessage._id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });
      if (res.ok) {
        setShowModal(false);
        fetchMessages();
      } else {
        setError("Failed to send reply. Try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSendingReply(false);
    }
  };

  /* ─── Loading State ────────────────────────────── */
  if (loading) return (
    <div style={{
      minHeight: "60vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif", gap: 16,
    }}>
      <div style={{
        width: 44, height: 44,
        border: `3px solid ${T.border}`,
        borderTopColor: T.blue, borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{ color: T.muted, fontSize: 15 }}>Loading messages…</p>
    </div>
  );

  /* ─── RENDER ───────────────────────────────────── */
  return (
    <div style={{
      minHeight: "100vh",
      background: T.offWhite,
      fontFamily: "'DM Sans', sans-serif",
      padding: "0 0 60px",
    }}>

      {/* ── Page Header ────────────────────────────── */}
      <div style={{
        background: T.blue,
        padding: "36px 20px 28px",
        position: "relative", overflow: "hidden",
      }}>
        {/* decorative accent */}
        <div style={{
          position: "absolute", top: -30, right: -30,
          width: 160, height: 160, borderRadius: "50%",
          background: "rgba(255,204,0,0.12)",
        }} />
        <div style={{
          position: "absolute", bottom: -50, left: "30%",
          width: 200, height: 200, borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }} />

        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <FaEnvelope style={{ color: T.yellow, fontSize: 16 }} />
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 900,
              color: T.white, lineHeight: 1,
            }}>Guest Messages</h1>
          </div>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, paddingLeft: 48 }}>
            Manage and respond to enquiries from guests
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px" }}>

        {/* ── Error Alert ────────────────────────── */}
        {error && (
          <div style={{
            marginTop: 20, padding: "12px 16px",
            background: "#fff0f2", border: `1px solid ${T.red}`,
            borderLeft: `4px solid ${T.red}`, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            animation: "fadeUp 0.3s ease both",
          }}>
            <span style={{ color: T.redDark, fontSize: 14 }}>{error}</span>
            <button onClick={() => setError(null)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: T.red, fontSize: 16, lineHeight: 1,
            }}><FaTimes /></button>
          </div>
        )}

        {/* ── Toolbar ────────────────────────────── */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: 12, marginTop: 24, marginBottom: 20,
        }}>
          {/* Sort dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowSortMenu(p => !p)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "9px 16px", background: T.white,
                border: `1.5px solid ${T.border}`, borderRadius: 8,
                cursor: "pointer", fontSize: 13, fontWeight: 600,
                color: T.dark, transition: "border-color 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <FaFilter style={{ color: T.blue, fontSize: 11 }} />
              {sortOrder === "latest" ? "Latest First" : "Oldest First"}
              <FaChevronDown style={{ fontSize: 10, color: T.muted }} />
            </button>
            {showSortMenu && (
              <div style={{
                position: "absolute", top: "calc(100% + 6px)", left: 0,
                background: T.white, border: `1px solid ${T.border}`,
                borderRadius: 8, overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 50,
                minWidth: 160, animation: "fadeIn 0.15s ease both",
              }}>
                {["latest", "oldest"].map(opt => (
                  <button key={opt} onClick={() => { setSortOrder(opt); setShowSortMenu(false); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "10px 16px", border: "none", cursor: "pointer",
                      background: sortOrder === opt ? "#eef3ff" : "transparent",
                      color: sortOrder === opt ? T.blue : T.dark,
                      fontSize: 13, fontWeight: sortOrder === opt ? 600 : 400,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                    {opt === "latest" ? "Latest First" : "Oldest First"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Count badge */}
          <div style={{
            padding: "7px 14px", background: T.blue,
            borderRadius: 8, color: T.white, fontSize: 13, fontWeight: 600,
          }}>
            {messages.length} {messages.length === 1 ? "Message" : "Messages"}
          </div>
        </div>

        {/* ── Empty State ─────────────────────────── */}
        {filteredMessages.length === 0 ? (
          <div style={{
            background: T.white, borderRadius: 14,
            border: `1px solid ${T.border}`,
            padding: "56px 24px", textAlign: "center",
            marginTop: 16, animation: "fadeUp 0.4s ease both",
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "#eef2ff", margin: "0 auto 16px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <FaEnvelope style={{ fontSize: 26, color: T.blue }} />
            </div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20, color: T.dark, marginBottom: 6,
            }}>No messages yet</h3>
            <p style={{ color: T.muted, fontSize: 14 }}>
              Guest enquiries will appear here once received.
            </p>
          </div>
        ) : (
          <>
            {/* ── Message Cards Grid ──────────────── */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: 16,
            }}>
              {filteredMessages.slice(0, visibleCount).map((msg, idx) => {
                const isExpanded = expandedId === msg._id;
                const longMsg = (msg.message || "").length > 150;
                return (
                  <div key={msg._id} style={{
                    background: T.white, borderRadius: 14,
                    border: `1px solid ${T.border}`,
                    borderTop: `3px solid ${msg.reply ? T.success : T.yellow}`,
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    animation: `fadeUp 0.4s ${idx * 0.05}s both`,
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.12)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <div style={{ padding: "20px 20px 0" }}>
                      {/* Header row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 14 }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", minWidth: 0 }}>
                          {/* Avatar */}
                          <div style={{
                            width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                            background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: T.white, fontWeight: 700, fontSize: 16,
                            fontFamily: "'Playfair Display', serif",
                          }}>
                            {(msg.name || "?")[0].toUpperCase()}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <p style={{ fontWeight: 600, fontSize: 15, color: T.dark, marginBottom: 3, lineHeight: 1.2 }}>
                              {msg.name}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                              <span style={{ fontSize: 12, color: T.muted, display: "flex", alignItems: "center", gap: 5 }}>
                                <FaEnvelope style={{ fontSize: 10 }} />{msg.email}
                              </span>
                              {msg.phone && (
                                <span style={{ fontSize: 12, color: T.muted, display: "flex", alignItems: "center", gap: 5 }}>
                                  <FaPhone style={{ fontSize: 10 }} />{msg.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge variant={msg.reply ? "replied" : "pending"}>
                          {msg.reply ? "Replied" : "Pending"}
                        </Badge>
                      </div>

                      {/* Subject */}
                      {msg.subject && (
                        <p style={{
                          fontSize: 13, fontWeight: 600, color: T.blue,
                          marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em",
                        }}>{msg.subject}</p>
                      )}

                      {/* Message body */}
                      <p style={{
                        fontSize: 14, color: T.muted, lineHeight: 1.6,
                        marginBottom: 4,
                        display: "-webkit-box",
                        WebkitLineClamp: isExpanded ? "unset" : 3,
                        WebkitBoxOrient: "vertical",
                        overflow: isExpanded ? "visible" : "hidden",
                      }}>{msg.message}</p>

                      {longMsg && (
                        <button onClick={() => setExpandedId(isExpanded ? null : msg._id)} style={{
                          background: "none", border: "none", cursor: "pointer",
                          fontSize: 12, fontWeight: 600, color: T.blue,
                          display: "flex", alignItems: "center", gap: 4,
                          padding: "4px 0", fontFamily: "'DM Sans', sans-serif",
                        }}>
                          {isExpanded ? <><FaChevronUp size={10} /> Show less</> : <><FaChevronDown size={10} /> Read more</>}
                        </button>
                      )}

                      {/* Timestamp */}
                      <p style={{ fontSize: 11, color: "#aaa", marginTop: 6 }}>
                        {formatDate(msg.createdAt || msg.date)}
                      </p>
                    </div>

                    {/* Reply preview */}
                    {msg.reply && (
                      <div style={{
                        margin: "14px 20px 0",
                        padding: "12px 14px",
                        background: T.successBg,
                        borderRadius: 8,
                        borderLeft: `3px solid ${T.success}`,
                      }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: T.success, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          Your Reply
                        </p>
                        <p style={{ fontSize: 13, color: "#1a5c38", lineHeight: 1.5, marginBottom: 4 }}>{msg.reply}</p>
                        <p style={{ fontSize: 11, color: "#5a9a74" }}>{formatDate(msg.repliedAt)}</p>
                      </div>
                    )}

                    {/* Footer */}
                    <div style={{
                      padding: "14px 20px",
                      display: "flex", justifyContent: "flex-end",
                    }}>
                      {!msg.reply && (
                        <button onClick={() => handleReplyClick(msg)} style={{
                          display: "flex", alignItems: "center", gap: 7,
                          padding: "9px 18px", background: T.blue, color: T.white,
                          border: "none", borderRadius: 8, cursor: "pointer",
                          fontSize: 13, fontWeight: 600,
                          fontFamily: "'DM Sans', sans-serif",
                          transition: "background 0.2s",
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = T.blueDark}
                          onMouseLeave={e => e.currentTarget.style.background = T.blue}
                        >
                          <FaReply style={{ fontSize: 11 }} /> Reply
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More */}
            {visibleCount < filteredMessages.length && (
              <div style={{ textAlign: "center", marginTop: 28 }}>
                <button
                  onClick={() => setVisibleCount(p => p + 6)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "12px 28px",
                    background: "transparent", color: T.blue,
                    border: `2px solid ${T.blue}`, borderRadius: 9,
                    cursor: "pointer", fontSize: 14, fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = T.blue; e.currentTarget.style.color = T.white; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.blue; }}
                >
                  <FaEye /> View More ({filteredMessages.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Reply Modal ─────────────────────────────── */}
      {showModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(10,20,50,0.55)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
            padding: "0",
            animation: "fadeIn 0.2s ease both",
          }}
        >
          <div style={{
            background: T.white,
            borderRadius: "20px 20px 0 0",
            width: "100%", maxWidth: 600,
            maxHeight: "92vh", overflowY: "auto",
            animation: "modalIn 0.3s ease both",
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "20px 24px 16px",
              borderBottom: `1px solid ${T.border}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              position: "sticky", top: 0, background: T.white, zIndex: 2,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: "#eef3ff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <FaReply style={{ color: T.blue, fontSize: 13 }} />
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: T.dark, lineHeight: 1 }}>
                    Reply to {selectedMessage?.name}
                  </p>
                  <p style={{ fontSize: 12, color: T.muted }}>
                    {selectedMessage?.email}
                  </p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} style={{
                width: 32, height: 32, borderRadius: "50%",
                background: T.offWhite, border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: T.muted, fontSize: 14, transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = T.border}
                onMouseLeave={e => e.currentTarget.style.background = T.offWhite}
              >
                <FaTimes />
              </button>
            </div>

            <div style={{ padding: "20px 24px" }}>
              {/* Original message */}
              <div style={{
                background: "#f0f4ff",
                borderLeft: `3px solid ${T.blue}`,
                borderRadius: "0 8px 8px 0",
                padding: "14px 16px", marginBottom: 20,
              }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: T.blue, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                  Original Message
                </p>
                {selectedMessage?.subject && (
                  <p style={{ fontSize: 13, color: T.dark, marginBottom: 6 }}>
                    <strong>Subject:</strong> {selectedMessage.subject}
                  </p>
                )}
                <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>
                  {selectedMessage?.message}
                </p>
              </div>

              {/* Reply textarea */}
              <div style={{ marginBottom: 20 }}>
                <label style={{
                  display: "block", fontSize: 13, fontWeight: 600,
                  color: T.dark, marginBottom: 8,
                }}>Your Reply</label>
                <textarea
                  rows={5}
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder="Type your response here…"
                  style={{
                    width: "100%", padding: "12px 14px",
                    border: `1.5px solid ${reply ? T.blue : T.border}`,
                    borderRadius: 10, resize: "vertical",
                    fontSize: 14, color: T.dark,
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6, outline: "none",
                    transition: "border-color 0.2s",
                    background: T.white,
                  }}
                  onFocus={e => e.target.style.borderColor = T.blue}
                  onBlur={e => e.target.style.borderColor = reply ? T.blue : T.border}
                />
                <p style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>
                  This reply will be sent to {selectedMessage?.email}
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button onClick={() => setShowModal(false)} style={{
                  padding: "11px 22px", background: "transparent",
                  border: `1.5px solid ${T.border}`, borderRadius: 9,
                  cursor: "pointer", fontSize: 14, fontWeight: 600,
                  color: T.muted, fontFamily: "'DM Sans', sans-serif",
                  transition: "border-color 0.2s",
                }}>
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={sendingReply || !reply.trim()}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "11px 24px",
                    background: !reply.trim() ? "#c0cce8" : T.blue,
                    color: T.white, border: "none", borderRadius: 9,
                    cursor: !reply.trim() ? "not-allowed" : "pointer",
                    fontSize: 14, fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { if (reply.trim() && !sendingReply) e.currentTarget.style.background = T.blueDark; }}
                  onMouseLeave={e => { if (reply.trim()) e.currentTarget.style.background = T.blue; }}
                >
                  {sendingReply ? <><Spinner /> Sending…</> : <><FaReply style={{ fontSize: 12 }} /> Send Reply</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestMessage;