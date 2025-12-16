// import React, { useState } from "react";
// import axios from "axios";
// import { Card, Button, Form } from "react-bootstrap";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const API_URL = "http://localhost:8000/api/faq/ask";

//   const sendMessage = async () => {
//     if (!input) return;

//     // User message
//     const userMsg = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);

//     try {
//       const res = await axios.post(API_URL, { question: input });
//       const botMsg = { sender: "bot", text: res.data.answer };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch (err) {
//       const botMsg = { sender: "bot", text: "Error fetching response." };
//       setMessages((prev) => [...prev, botMsg]);
//     }

//     setInput("");
//   };

//   return (
//     <Card
//       style={{
//         position: "fixed",
//         bottom: "20px",
//         right: "20px",
//         width: "300px",
//         zIndex: 1000,
//       }}
//     >
//       <Card.Body>
//         <Card.Title>🤖 College Chatbot</Card.Title>
//         <div
//           style={{
//             maxHeight: "250px",
//             overflowY: "auto",
//             marginBottom: "10px",
//           }}
//         >
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               style={{
//                 textAlign: msg.sender === "user" ? "right" : "left",
//                 margin: "5px 0",
//               }}
//             >
//               <b>{msg.sender === "user" ? "You: " : "Bot: "}</b>
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <Form.Control
//           type="text"
//           value={input}
//           placeholder="Ask something..."
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" ? sendMessage() : null}
//         />
//         <Button className="mt-2 w-100" onClick={sendMessage}>
//           Send
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Chatbot;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaCommentDots } from "react-icons/fa";
import { CHATBOT_URL } from "../../BaseAPI";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // Get bot response
      const res = await axios.post(`${CHATBOT_URL}`, { question: input });
      const botMessage = { sender: "bot", text: res.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: "bot", text: "⚠️ Server error. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <>
      <style>
        {`
          .chat-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .chat-button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
          }
          .chat-window {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 450px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 1000;
            transition: all 0.3s ease;
          }
          .chat-header {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            padding: 16px;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .chat-messages {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .chat-message {
            padding: 12px 16px;
            border-radius: 18px;
            max-width: 80%;
            font-size: 14px;
            line-height: 1.4;
            position: relative;
            animation: fadeIn 0.3s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .chat-message.user {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
            display: flex;
            align-items: flex-start;
            gap: 8px;
          }
          .chat-message.bot {
            background: #f7f7f8;
            color: #333;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            display: flex;
            align-items: flex-start;
            gap: 8px;
          }
          .chat-input-container {
            display: flex;
            border-top: 1px solid #e5e7eb;
            padding: 12px;
            background: white;
          }
          .chat-input {
            flex: 1;
            border: 1px solid #e5e7eb;
            border-radius: 24px;
            padding: 10px 16px;
            outline: none;
            font-size: 14px;
            margin-right: 8px;
          }
          .chat-input:focus {
            border-color: #2563eb;
          }
          .send-button {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .send-button:hover {
            transform: scale(1.05);
          }
          .send-button:active {
            transform: scale(0.95);
          }
          .close-button {
            background: transparent;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 4px;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .close-button:hover {
            background: rgba(255, 255, 255, 0.2);
          }
          .welcome-message {
            text-align: center;
            color: #6b7280;
            font-size: 14px;
            padding: 16px;
            background: #f9fafb;
            border-radius: 12px;
            margin: 8px 0;
          }
          .disclaimer {
            text-align: center;
            color: #9ca3af;
            font-size: 11px;
            padding: 8px 12px;
            background: #f3f4f6;
            border-top: 1px solid #e5e7eb;
          }
          .message-icon {
            margin-top: 2px;
            flex-shrink: 0;
          }
        `}
      </style>

      {/* Floating Chat Button */}
      {!isOpen && (
        <button className="chat-button" onClick={() => setIsOpen(true)}>
          <FaCommentDots />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>SDVS'S BCA College Assistant</span>
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <FaRobot style={{ fontSize: '20px', marginBottom: '8px' }} />
                <div>Hello! I'm your college assistant. How can I help you today?</div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.sender}`}>
                  {msg.sender === "user" ? (
                    <FaUser className="message-icon" size={14} />
                  ) : (
                    <FaRobot className="message-icon" size={14} />
                  )}
                  <span>{msg.text}</span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="disclaimer">
            This is a trained AI model and may provide incorrect information due to outdated data.
          </div>

          <div className="chat-input-container">
            <input
              className="chat-input"
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="send-button" onClick={sendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;