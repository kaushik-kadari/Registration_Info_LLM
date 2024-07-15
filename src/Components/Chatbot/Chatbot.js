import './Chatbot.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRef } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);
  const LLM_URL = `${process.env.REACT_APP_URL}` + "/query";
  console.log(process.env.REACT_APP_URL);
  
  console.log(LLM_URL);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const newMessages = [...messages, { text: input, isUser: true }];
      setMessages(newMessages);
      setInput("");

      try {
        const response = await axios.post(LLM_URL, 
          { question: input }, 
          { headers: { 'Content-Type': 'application/json' } }
        );

        const botResponse = response.data.response;

        setMessages(prevMessages => [
          ...prevMessages,
          { text: botResponse, isUser: false }
        ]);
      } catch (error) {
        console.error('Error fetching response:', error);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Error: Unable to fetch response', isUser: false, isError : true }
        ]);
      }
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="bg-[#1b2531] text-white p-4 text-center">
        <h1 className="text-2xl">Government Services Chatbot</h1>
      </header>
      <main className="flex-grow p-4 overflow-auto" ref={chatContainerRef}>
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-end">
                { !message.isUser && <div><img src="/images/image.png" alt="" className="w-10 h-10"/></div>}
              </div>

              <div
                className={`max-w-md p-3 rounded-tl-lg rounded-tr-lg ${
                  message.isError ? "bg-[#cb0c0cda] text-white rounded-br-lg" :
                  message.isUser ? "bg-[#1b2531] text-white rounded-bl-lg" : "bg-gray-300 text-black rounded-br-lg"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="p-4 bg-white flex">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-l-lg"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button
          className="bg-[#1b2531] text-white p-2 rounded-r-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Chatbot;