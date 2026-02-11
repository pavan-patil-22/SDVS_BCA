
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaCommentDots } from "react-icons/fa";
// import { CHATBOT_URL } from "../../BaseAPI";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to bottom when messages change
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
    
//     // Add user message
//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       // Get bot response
//       const res = await axios.post(`${CHATBOT_URL}`, { question: input });
//       const botMessage = { sender: "bot", text: res.data.answer };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       const errorMessage = { sender: "bot", text: "⚠️ Server error. Please try again." };
//       setMessages((prev) => [...prev, errorMessage]);
//     }
//   };

//   return (
//     <>
//       <style>
//         {`
//           .chat-button {
//             position: fixed;
//             bottom: 20px;
//             right: 20px;
//             background: linear-gradient(135deg, #2563eb, #1d4ed8);
//             color: white;
//             border: none;
//             border-radius: 50%;
//             width: 60px;
//             height: 60px;
//             font-size: 24px;
//             cursor: pointer;
//             box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
//             transition: all 0.3s ease;
//             z-index: 1000;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }
//           .chat-button:hover {
//             transform: scale(1.05);
//             box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
//           }
//           .chat-window {
//             position: fixed;
//             bottom: 90px;
//             right: 20px;
//             width: 350px;
//             height: 450px;
//             background: white;
//             border-radius: 16px;
//             box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//             display: flex;
//             flex-direction: column;
//             overflow: hidden;
//             z-index: 1000;
//             transition: all 0.3s ease;
//           }
//           .chat-header {
//             background: linear-gradient(135deg, #2563eb, #1d4ed8);
//             color: white;
//             padding: 16px;
//             font-weight: 600;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//           }
//           .chat-messages {
//             flex: 1;
//             padding: 16px;
//             overflow-y: auto;
//             display: flex;
//             flex-direction: column;
//             gap: 12px;
//           }
//           .chat-message {
//             padding: 12px 16px;
//             border-radius: 18px;
//             max-width: 80%;
//             font-size: 14px;
//             line-height: 1.4;
//             position: relative;
//             animation: fadeIn 0.3s ease;
//           }
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           .chat-message.user {
//             background: linear-gradient(135deg, #2563eb, #1d4ed8);
//             color: white;
//             align-self: flex-end;
//             border-bottom-right-radius: 4px;
//             display: flex;
//             align-items: flex-start;
//             gap: 8px;
//           }
//           .chat-message.bot {
//             background: #f7f7f8;
//             color: #333;
//             align-self: flex-start;
//             border-bottom-left-radius: 4px;
//             display: flex;
//             align-items: flex-start;
//             gap: 8px;
//           }
//           .chat-input-container {
//             display: flex;
//             border-top: 1px solid #e5e7eb;
//             padding: 12px;
//             background: white;
//           }
//           .chat-input {
//             flex: 1;
//             border: 1px solid #e5e7eb;
//             border-radius: 24px;
//             padding: 10px 16px;
//             outline: none;
//             font-size: 14px;
//             margin-right: 8px;
//           }
//           .chat-input:focus {
//             border-color: #2563eb;
//           }
//           .send-button {
//             background: linear-gradient(135deg, #2563eb, #1d4ed8);
//             color: white;
//             border: none;
//             border-radius: 50%;
//             width: 40px;
//             height: 40px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             cursor: pointer;
//             transition: all 0.2s ease;
//           }
//           .send-button:hover {
//             transform: scale(1.05);
//           }
//           .send-button:active {
//             transform: scale(0.95);
//           }
//           .close-button {
//             background: transparent;
//             border: none;
//             color: white;
//             font-size: 18px;
//             cursor: pointer;
//             padding: 4px;
//             border-radius: 50%;
//             width: 28px;
//             height: 28px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }
//           .close-button:hover {
//             background: rgba(255, 255, 255, 0.2);
//           }
//           .welcome-message {
//             text-align: center;
//             color: #6b7280;
//             font-size: 14px;
//             padding: 16px;
//             background: #f9fafb;
//             border-radius: 12px;
//             margin: 8px 0;
//           }
//           .disclaimer {
//             text-align: center;
//             color: #9ca3af;
//             font-size: 11px;
//             padding: 8px 12px;
//             background: #f3f4f6;
//             border-top: 1px solid #e5e7eb;
//           }
//           .message-icon {
//             margin-top: 2px;
//             flex-shrink: 0;
//           }
//         `}
//       </style>

//       {/* Floating Chat Button */}
//       {!isOpen && (
//         <button className="chat-button" onClick={() => setIsOpen(true)}>
//           <FaCommentDots />
//         </button>
//       )}

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="chat-window">
//           <div className="chat-header">
//             <span>SDVS'S BCA College Assistant</span>
//             <button
//               className="close-button"
//               onClick={() => setIsOpen(false)}
//             >
//               <FaTimes />
//             </button>
//           </div>

//           <div className="chat-messages">
//             {messages.length === 0 ? (
//               <div className="welcome-message">
//                 <FaRobot style={{ fontSize: '20px', marginBottom: '8px' }} />
//                 <div>Hello! I'm your college assistant. How can I help you today?</div>
//               </div>
//             ) : (
//               messages.map((msg, i) => (
//                 <div key={i} className={`chat-message ${msg.sender}`}>
//                   {msg.sender === "user" ? (
//                     <FaUser className="message-icon" size={14} />
//                   ) : (
//                     <FaRobot className="message-icon" size={14} />
//                   )}
//                   <span>{msg.text}</span>
//                 </div>
//               ))
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="disclaimer">
//             This is a trained AI model and may provide incorrect information due to outdated data.
//           </div>

//           <div className="chat-input-container">
//             <input
//               className="chat-input"
//               type="text"
//               placeholder="Type your question..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button className="send-button" onClick={sendMessage}>
//               <FaPaperPlane />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;



import { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaCompress, FaUser, FaBriefcase, FaGraduationCap, FaCode, FaProjectDiagram } from "react-icons/fa";

const API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const API_URL = process.env.REACT_APP_GROQ_API_URL || "https://api.groq.com/openai/v1/chat/completions";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const chatContainerRef = useRef(null);
    const viewportHeight = useRef(window.innerHeight);

    // Quick action buttons data
    const quickActions = [
        {
            id: 1,
            label: "Experience",
            icon: <FaBriefcase size={14} />,
            question: "What is Pavan's work experience?",
            color: "#667eea"
        },
        {
            id: 2,
            label: "Education",
            icon: <FaGraduationCap size={14} />,
            question: "What is Pavan's educational background?",
            color: "#764ba2"
        },
        {
            id: 3,
            label: "Skills",
            icon: <FaCode size={14} />,
            question: "What technical skills does Pavan have?",
            color: "#667eea"
        },
        {
            id: 4,
            label: "Projects",
            icon: <FaProjectDiagram size={14} />,
            question: "What projects has Pavan worked on?",
            color: "#764ba2"
        }
    ];

    const RESUME_CONTEXT = `
               
You are SDVS BCA College AI Assistant.

Rules:
- Give short, clear and professional answers.
- First try to answer using given college information.
- If question is college related but info missing → answer using general knowledge.
- If question NOT related to college → reply:
"Sorry, please contact college for relevant queries."

College Info:

SDVS's BCA College established in 2007 in Sankeshwar.
College Timing: 10 AM – 5 PM (Except Sunday & Govt Holidays)

Vision:
Prominent institute where technology meets learning.

Mission:
Empower individuals through education and innovation.

Infrastructure:
• Computer Labs
• Digital Library

Principals:
• 2007-2009 Prof. S. S. Patil
• 2009-2010 Prof. B. I. Hebbali
• 2011-2012 Prof. D. S. Khade
• 2012-2013 Prof. B. I. Hebbali
• 2013-2015 Prof. G. L. Badiger
• 2016-Present Prof. B. I. Hebbali

Faculty:
Teaching Faculty
Prof.B.I.HebbaliPrincipalFull Time
Prof.B.I.Hebbali
Msc(cs and maths), M Phil(cs), B ED(P.hd)
Experience
18 years
Prof.R.G.BagewadiHODFull Time
Prof.R.G.Bagewadi
MBA,MSc(Maths),MCA
Experience
11 years
Prof.M.A.IkkalmarLecturerFull Time
Prof.M.A.Ikkalmar
MCA
Experience
6 years
Prof.N.D.JadhavLecturerFull Time
Prof.N.D.Jadhav
Msc (cs), B.ed
Experience
3 years
 Prof.A.M.GuravLecturerFull Time
Prof.A.M.Gurav
MCA
Experience
1 years
Prof.N.M.TaradaleLecturerFull Time
Prof.N.M.Taradale
MCA
Experience
Fresher
Miss.K.N.SavalagiLecturerFull Time
Miss.K.N.Savalagi
BCA
Experience
Fresher
Prof.Y.R.KattimaniLecturerFull Time
Prof.Y.R.Kattimani
MA,BEd
Experience
Fresher
Prof.R.D.BadigerLecturerFull Time
Prof.R.D.Badiger
MA,BEd
Experience
Fresher
Prof.M.S.GattiLecturerPart Time
Prof.M.S.Gatti
M.com ,M.Phil. ,B.ED
Experience
Fresher
Prof.M.G.KhadedLecturerPart Time
Prof.M.G.Khaded
MA
Experience
Fresher
Miss. S.S.HegadeLecturerPart Time
Miss. S.S.Hegade
MA,BEd
Experience
Fresher
Prof.M.S.KambleLecturerPart Time
Prof.M.S.Kamble
MA,BEd
Experience
Fresher
Smt.A.R.MariguddiLab InstructorFull Time
Smt.A.R.Mariguddi
BCA
Experience
1 years
Non-Teaching Staff
Mr. S.N.PatilClerkFull Time
Mr. S.N.Patil
Shri.M.C.HiremathAccountantFull Time
Shri.M.C.Hiremath
Smt.M.A.DesaiLibrarianPart Time
Smt.M.A.Desai
Shri. S.S. KamblePeonFull Time
Shri. S.S. Kamble
Smt. S.S.ShintrePeonFull Time
Smt. S.S.Shintre

Facilities Available in the College Campus
Important Committees Available in Campus

Internal Quality Assurance Cell
Prof. R. G. Bagewadi

Cultural Committee & Red Cross Club
Smt. A. K. Mariguddi

N.S.S, Sports, H.R, SC/ST
Shri R. D. Badiger

Anti Ragging, Anti Sexual, Women Empowerment
Miss. N. M. Taradale

Students Guidance & Welfare, Placement Cell
Smt. M. A. Ikkalmar

Examination & Time-Table
Smt. N. D. Jadhav

Health Care Centre, Student Mentor, Alumni, Internal Complaints Committee
Miss. A. M. Gurav

Discipline & Lab Complaints Committee
Miss. Kavyashri M. S


Admission Process
-> Admissions start after the PUC results are announced by the Government of Karnataka.
-> Students must visit the college personally for the admission process (parents can accompany if required).
-> Admission details and verification are completed at the college office.

Fee Structure
-> Fees will be decided at the time of admission.
-> Students do not need to pay the full amount at once.
-> Installment payment options are available as per college rules.

College Events
SDVS BCA College regularly conducts academic, cultural, and technical events to improve student skills, teamwork, and innovation.
Common Annual Events
-> Fresher’s Party
-> Farewell Program
-> Technical & IT Events like TechCivil War

about TechCivil War
A special coding and quiz competition organized by BCA students.
Started by the 2025 batch students.
Focuses on programming skills, logical thinking, and technical knowledge.
Encourages teamwork and healthy competition among students.

Full from of SDVS: Shri. Duradundeeshwar Vidya Samavardhak Sangh 

SDVS BCA College encourages student participation in sports activities through the NSS & Sports Committee and provides basic sports support and gymkhana facilities.


Location:
Nipani Road, Sankeshwar, Karnataka 591313

Contacts:
Office: +91-9448636015
Principal: +91-9448636015
HOD: +91-8147947926



Interaction Rules:

1. Respond strictly using only the SDVS BCA College information provided in this context. 
   Keep responses short, clear, and professional like a college assistant.

2. Do not answer questions that are not related to SDVS BCA College.
   If such questions are asked, respond with:
   "Sorry, please ask questions related to SDVS BCA College."

3. If a question is college-related but detailed information is not available,
   give a general short response suitable for a college website.

4. Do not give long explanations unless the user clearly asks for details.

5. Provide information in simple points or short sentences whenever possible.

6. When users ask about events, committees, faculty, admission, or facilities,
   answer only with relevant college details.

7. Do not include any unnecessary external information or unrelated topics.

8. If someone asks who developed you, respond with:
   "Developed by LIGAND DEVELOPERS under the requirements of the SDVS BCA College Principal.
"

9. If greetings are received, reply with a short professional welcome message with polite tone.

10. If exact information is missing, respond with:
"Please contact the college office for more details.
Office: +91-9448636015
Principal: +91-9448636015
HOD: +91-8147947926"

    `;

    // Detect mobile and keyboard visibility
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
            viewportHeight.current = window.innerHeight;
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // Detect keyboard on mobile
        const handleResize = () => {
            const heightDiff = Math.abs(viewportHeight.current - window.innerHeight);
            setKeyboardVisible(heightDiff > 100 && isMobile);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobile]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, keyboardVisible]);

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen, isMinimized]);

    const sendMessage = async (messageContent = input) => {
        if ((!messageContent.trim() && !input.trim()) || loading) return;

        const userMessage = { role: "user", content: messageContent };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setLoading(true);
        setShowWelcome(false);

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    messages: [
                        { role: "system", content: RESUME_CONTEXT },
                        ...updatedMessages,
                    ],
                    temperature: 0.2,
                    max_tokens: 512,
                }),
            });

            if (!res.ok) throw new Error("Groq request failed");
            
            const data = await res.json();
            const botReply = data.choices[0].message.content;

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: botReply },
            ]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { 
                    role: "assistant", 
                    content: "Sorry, I encountered an error. Please try again." 
                },
            ]);
        } finally {
            setLoading(false);
            setTimeout(() => {
                inputRef.current?.focus();
                scrollToBottom();
            }, 100);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !loading) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Handle quick action button click
    const handleQuickAction = (question) => {
        sendMessage(question);
    };

    const clearChat = () => {
        setMessages([]);
        setShowWelcome(true);
        setTimeout(() => {
            inputRef.current?.focus();
            scrollToBottom();
        }, 100);
    };

    if (isMinimized) {
        return (
            <div 
                style={styles.minimizedContainer} 
                onClick={() => setIsMinimized(false)}
            >
                <div style={styles.minimizedContent}>
                    <FaRobot style={styles.minimizedIcon} />
                    <span style={styles.minimizedText}>Ask about SDVS BCA</span>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Floating Avatar */}
            {!isOpen && (
                <div 
                    style={styles.avatarContainer}
                    onMouseEnter={() => setIsVisible(true)}
                    onMouseLeave={() => setIsVisible(false)}
                    onClick={() => {
                        setIsOpen(true);
                        setTimeout(() => {
                            inputRef.current?.focus();
                        }, 200);
                    }}
                >
                    <div style={styles.avatar}>
                        <FaRobot style={styles.avatarIcon} />
                    </div>
                    {isVisible && !isMobile && (
                        <div style={styles.speechBubble}>
                            Hi...👋
                        </div>
                    )}
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div 
                    ref={chatContainerRef}
                    style={{
                        ...(isMobile ? styles.mobileChatContainer : styles.chatContainer),
                        ...(isMobile && keyboardVisible && styles.keyboardOpen)
                    }}
                >
                    <div style={styles.chatWrapper}>
                        {/* Header */}
                        <div style={styles.chatHeader}>
                            <div style={styles.headerLeft}>
                                <div style={styles.avatarCircle}>
                                    <FaRobot style={styles.headerIcon} />
                                </div>
                                <div>
                                    <h3 style={styles.headerTitle}>SDVS BCA Assistant</h3>
                                    <p style={styles.headerSubtitle}>College AI Assistant</p>
                                </div>
                            </div>
                            <div style={styles.headerActions}>
                                <button 
                                    onClick={() => setIsMinimized(true)}
                                    style={styles.iconButton}
                                    title="Minimize"
                                >
                                    <FaCompress size={14} />
                                </button>
                                <button 
                                    onClick={clearChat}
                                    style={styles.clearButton}
                                    title="Clear Chat"
                                >
                                    Clear
                                </button>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    style={styles.closeButton}
                                    title="Close"
                                >
                                    <FaTimes size={16} />
                                </button>
                            </div>
                        </div>

                        {/* AI Notice - Light warning notice */}
                        <div style={styles.noticeContainer}>
                            <span style={styles.noticeIcon}>ⓘ</span>
                            <span style={styles.noticeText}>
                                This is an AI assistant. Information is based on available college data and may be incorrect sometimes. Please contact the college for official details.
                            </span>
                        </div>

                        {/* Messages Area */}
                        <div style={{
                            ...styles.messagesContainer,
                            ...(isMobile && keyboardVisible && styles.messagesContainerKeyboard)
                        }}>
                            {showWelcome && (
                                <div style={styles.welcomeMessage}>
                                    <div style={styles.botMessageWrapper}>
                                        <div style={styles.messageAvatar}>
                                            <FaRobot style={styles.botAvatarIcon} />
                                        </div>
                                        <div style={styles.botMessage}>
                                            <div style={styles.messageHeader}>
                                                <strong>AI Assistant</strong>
                                            </div>
                                            <div style={styles.messageText}>
                                                <p>Hello! I'm the official SDVS BCA College AI assistant. You can ask me about:</p>
                                                <p>• Admissions & Fee Structure</p>
                                                <p>• Faculty & Committees</p>
                                                <p>• Events like TechCivil War</p>
                                                <p>• College infrastructure</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <div 
                                    key={i} 
                                    style={msg.role === "user" ? styles.userMessageWrapper : styles.botMessageWrapper}
                                >
                                    {msg.role === "assistant" && (
                                        <div style={styles.messageAvatar}>
                                            <FaRobot style={styles.botAvatarIcon} />
                                        </div>
                                    )}
                                    <div style={msg.role === "user" ? styles.userMessage : styles.botMessage}>
                                        <div style={styles.messageHeader}>
                                            <strong>{msg.role === "user" ? "You" : "AI Assistant"}</strong>
                                        </div>
                                        <div style={styles.messageText}>
                                            {msg.content.split('\n').map((line, idx) => (
                                                <p key={idx} style={styles.messageParagraph}>
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    {msg.role === "user" && (
                                        <div style={styles.messageAvatar}>
                                            <FaUser style={styles.userAvatarIcon} />
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {loading && (
                                <div style={styles.botMessageWrapper}>
                                    <div style={styles.messageAvatar}>
                                        <FaRobot style={styles.botAvatarIcon} />
                                    </div>
                                    <div style={styles.botMessage}>
                                        <div style={styles.typingContainer}>
                                            <div style={styles.typingIndicator}>
                                                <span style={styles.typingDot}></span>
                                                <span style={styles.typingDot}></span>
                                                <span style={styles.typingDot}></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} style={styles.bottomSpacer} />
                        </div>

                        
                        {/* Input Area */}
                        <div style={{
                            ...styles.inputContainer,
                            ...(isMobile && keyboardVisible && styles.inputContainerKeyboard)
                        }}>
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about college, faculty, events..."
                                style={styles.input}
                                disabled={loading}
                            />
                            <button
                                onClick={() => sendMessage()}
                                style={{
                                    ...styles.sendButton,
                                    opacity: (loading || !input.trim()) ? 0.6 : 1
                                }}
                                disabled={loading || !input.trim()}
                            >
                                {loading ? "..." : "Send"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                }

                @keyframes typing {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                    100% { transform: translateY(0px); }
                }

                @keyframes slideIn {
                    from { transform: translateX(-10px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                .typing-dot {
                    animation: typing 1s infinite ease-in-out;
                }

                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }

                /* Mobile optimization */
                @media (max-width: 768px) {
                    input, button {
                        font-size: 16px;
                    }
                    * {
                        -webkit-tap-highlight-color: transparent;
                    }
                }
            `}</style>
        </>
    );
};

const styles = {
    // Floating Avatar - Glassmorphism style
    avatarContainer: {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 10000,
        cursor: 'pointer',
        animation: 'float 3s ease-in-out infinite',
        filter: 'drop-shadow(0 10px 15px rgba(102, 126, 234, 0.3))',
    },
    avatar: {
        width: '90px',
        height: '60px',
        borderRadius: '30px',
        background: 'linear-gradient(145deg, #667eea, #764ba2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        boxShadow: '0 15px 25px rgba(102, 126, 234, 0.4), 0 0 0 3px rgba(255,255,255,0.5)',
        border: '2px solid rgba(255,255,255,0.8)',
        backdropFilter: 'blur(5px)',
    },
    avatarIcon: { 
        width: '28px', 
        height: '28px' 
    },
    speechBubble: {
        position: 'absolute',
        bottom: '70px',
        right: '0',
        padding: '12px 18px',
        borderRadius: '20px 20px 20px 6px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
        color: '#2d3748',
        fontSize: '14px',
        maxWidth: '250px',
        animation: 'slideIn 0.3s ease-out',
        border: '1px solid rgba(255,255,255,0.5)',
        fontWeight: '500',
    },

    // Minimized State
    minimizedContainer: {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 10000,
        cursor: 'pointer',
    },
    minimizedContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 22px',
        borderRadius: '40px',
        background: 'linear-gradient(145deg, #667eea, #764ba2)',
        color: '#fff',
        boxShadow: '0 15px 30px rgba(102, 126, 234, 0.4), 0 0 0 2px rgba(255,255,255,0.3)',
        border: '2px solid rgba(255,255,255,0.8)',
        backdropFilter: 'blur(5px)',
    },
    minimizedIcon: { 
        width: '20px', 
        height: '20px' 
    },
    minimizedText: { 
        fontSize: '15px', 
        fontWeight: '600',
        letterSpacing: '0.5px',
    },

    // Chat Container - Glassmorphism
    chatContainer: {
        position: 'fixed',
        right: '30px',
        bottom: '20px',
        width: '400px',
        height: '650px',
        maxHeight: '80vh',
        zIndex: 10000,
        animation: 'fadeIn 0.3s ease-out',
        filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.25))',
    },
    mobileChatContainer: {
        position: 'fixed',
        left: '0',
        right: '0',
        bottom: '0',
        top: '0',
        zIndex: 10000,
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'flex-end',
    },
    keyboardOpen: {
        top: '0',
        background: 'rgba(0, 0, 0, 0.6)',
    },
    chatWrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(15px)',
        borderRadius: '24px 24px 0 0',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.2)',
        overflow: 'hidden',
        width: '100%',
        maxHeight: '100%',
        border: '1px solid rgba(255,255,255,0.3)',
    },

    // Header - Soft gradient
    chatHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 22px',
        background: 'linear-gradient(145deg, #667eea, #764ba2)',
        color: '#fff',
        flexShrink: 0,
        borderBottom: '1px solid rgba(255,255,255,0.2)',
    },
    headerLeft: {
        display: 'flex',
        gap: '14px',
        alignItems: 'center',
        flex: 1,
    },
    avatarCircle: {
        width: '44px',
        height: '44px',
        borderRadius: '22px',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid rgba(255, 255, 255, 0.5)',
        flexShrink: 0,
    },
    headerIcon: { 
        width: '22px', 
        height: '22px' 
    },
    headerTitle: { 
        margin: '0', 
        fontSize: '18px', 
        fontWeight: '700',
        lineHeight: '1.2',
        letterSpacing: '-0.3px',
    },
    headerSubtitle: { 
        margin: '4px 0 0 0', 
        fontSize: '12px', 
        opacity: '0.95',
        lineHeight: '1.2',
        fontWeight: '400',
    },
    headerActions: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        flexShrink: 0,
    },
    iconButton: {
        background: 'rgba(255, 255, 255, 0.25)',
        border: 'none',
        width: '36px',
        height: '36px',
        borderRadius: '18px',
        cursor: 'pointer',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        flexShrink: 0,
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.3)',
    },
    clearButton: {
        background: 'rgba(255, 255, 255, 0.25)',
        border: 'none',
        padding: '7px 14px',
        borderRadius: '20px',
        cursor: 'pointer',
        color: '#fff',
        fontSize: '12px',
        fontWeight: '600',
        transition: 'all 0.2s',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.3)',
    },
    closeButton: {
        background: 'rgba(255, 255, 255, 0.25)',
        border: 'none',
        width: '36px',
        height: '36px',
        borderRadius: '18px',
        cursor: 'pointer',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        flexShrink: 0,
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.3)',
    },

    // Notice Container - Light warning
    noticeContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        margin: '12px 15px 6px 15px',
        backgroundColor: '#f3f6ff',
        borderRadius: '14px',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        flexShrink: 0,
    },
    noticeIcon: {
        color: '#667eea',
        fontSize: '14px',
        fontWeight: '600',
    },
    noticeText: {
        fontSize: '12px',
        color: '#4a5568',
        lineHeight: '1.5',
        fontWeight: '400',
    },

    // Messages Area
    messagesContainer: {
        padding: '18px',
        overflowY: 'auto',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minHeight: 0,
        background: 'linear-gradient(145deg, #f9faff, #f5f7ff)',
    },
    messagesContainerKeyboard: {
        maxHeight: 'calc(100vh - 300px)',
    },
    welcomeMessage: {
        marginBottom: '6px',
        animation: 'fadeIn 0.5s ease-out',
    },
    
    // Message Layout - WhatsApp style bubbles
    botMessageWrapper: {
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        maxWidth: '90%',
        animation: 'fadeIn 0.3s ease-out',
    },
    userMessageWrapper: {
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start',
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
        maxWidth: '90%',
        animation: 'fadeIn 0.3s ease-out',
    },
    
    // Message Bubbles
    botMessage: {
        background: '#ffffff',
        padding: '14px 18px',
        borderRadius: '22px',
        borderTopLeftRadius: '6px',
        maxWidth: '100%',
        wordBreak: 'break-word',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
    },
    userMessage: {
        background: 'linear-gradient(145deg, #667eea, #764ba2)',
        color: '#fff',
        padding: '14px 18px',
        borderRadius: '22px',
        borderTopRightRadius: '6px',
        maxWidth: '100%',
        wordBreak: 'break-word',
        boxShadow: '0 8px 18px rgba(102, 126, 234, 0.25)',
    },
    
    // Message Content
    messageAvatar: {
        width: '34px',
        height: '34px',
        borderRadius: '17px',
        background: 'rgba(102, 126, 234, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: '0',
        marginTop: '3px',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(102,126,234,0.2)',
    },
    botAvatarIcon: {
        color: '#667eea',
        width: '18px',
        height: '18px',
    },
    userAvatarIcon: {
        color: '#764ba2',
        width: '18px',
        height: '18px',
    },
    messageHeader: {
        marginBottom: '5px',
        fontSize: '12px',
        opacity: '0.75',
        fontWeight: '500',
    },
    messageText: {
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#2d3748',
    },
    userMessage: {
        background: 'linear-gradient(145deg, #667eea, #764ba2)',
        color: '#fff',
        padding: '14px 18px',
        borderRadius: '22px',
        borderTopRightRadius: '6px',
        maxWidth: '100%',
        wordBreak: 'break-word',
        boxShadow: '0 8px 18px rgba(102, 126, 234, 0.25)',
    },
    messageParagraph: {
        margin: '0 0 8px 0',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        '&:last-child': {
            marginBottom: 0,
        },
    },
    
    // Typing Indicator
    typingContainer: {
        padding: '8px 12px',
    },
    typingIndicator: {
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
    },
    typingDot: {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '4px',
        background: 'linear-gradient(145deg, #667eea, #764ba2)',
        animation: 'typing 1.4s infinite ease-in-out',
        '&:nth-child(2)': {
            animationDelay: '0.2s',
        },
        '&:nth-child(3)': {
            animationDelay: '0.4s',
        },
    },
    bottomSpacer: {
        height: '10px',
        flexShrink: 0,
    },

    // Quick Action Buttons - Glassmorphism
    quickActionsContainer: {
        display: 'flex',
        gap: '10px',
        padding: '14px 18px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.5)',
        borderBottom: '1px solid rgba(255,255,255,0.5)',
        overflowX: 'auto',
        flexShrink: 0,
    },
    hiddenOnKeyboard: {
        display: 'none',
    },
    quickActionButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 18px',
        borderRadius: '40px',
        border: 'none',
        color: '#fff',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        boxShadow: '0 6px 14px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.3)',
        border: '1px solid rgba(255,255,255,0.5)',
        backdropFilter: 'blur(5px)',
    },
    quickActionLabel: {
        marginLeft: '4px',
    },

    // Input Area - Modern minimal
    inputContainer: {
        display: 'flex',
        padding: '18px 20px',
        gap: '12px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(224,224,224,0.5)',
        flexShrink: 0,
    },
    inputContainerKeyboard: {
        paddingBottom: 'calc(18px + env(safe-area-inset-bottom, 0px))',
    },
    input: {
        flex: '1',
        padding: '14px 20px',
        borderRadius: '30px',
        border: '2px solid rgba(224,224,224,0.5)',
        fontSize: '15px',
        outline: 'none',
        transition: 'all 0.2s',
        background: '#ffffff',
        minHeight: '50px',
        boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.02)',
        ':focus': {
            borderColor: '#667eea',
            boxShadow: '0 0 0 3px rgba(102,126,234,0.1)',
        },
    },
    sendButton: {
        padding: '14px 26px',
        borderRadius: '30px',
        background: 'linear-gradient(145deg, #667eea, #764ba2)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: '600',
        transition: 'all 0.2s',
        minWidth: '80px',
        flexShrink: 0,
        boxShadow: '0 8px 16px rgba(102,126,234,0.3), 0 0 0 1px rgba(255,255,255,0.2)',
        ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 22px rgba(102,126,234,0.4)',
        },
        ':disabled': {
            opacity: 0.6,
            transform: 'none',
        },
    }
};

export default Chatbot;