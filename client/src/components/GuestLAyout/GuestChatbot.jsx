// src/components/GuestChatbot.jsx
import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../BaseAPI";

const GuestChatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I am your College Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post(`${BASE_API_URL}/chatbot/ask`, { message: input });
      const botReply = res.data.response || "Sorry, I didn't get that. Can you try again?";
      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Something went wrong. Please try again later." }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-lg mx-auto border rounded-2xl shadow-lg bg-white">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-3 rounded-t-2xl font-semibold">
        💬 College Chatbot
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[75%] ${
              msg.sender === "bot"
                ? "bg-gray-200 text-gray-800 self-start"
                : "bg-blue-500 text-white self-end ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex border-t p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          className="flex-1 p-2 border rounded-lg focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GuestChatbot;
