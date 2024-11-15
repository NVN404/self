import React, { useState, useRef } from 'react';
import userIcon from './assets/user-icon.png';
import gptLogo from './assets/gptlogo.png';
import { GoogleGenerativeAI } from '@google/generative-ai';
import navgpt from './assets/NAVGPT.png';
import MoodSelector from './MoodSelector';
import HowDay from './components/Day'; 

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const chatContainerRef = useRef(null);
  const API_KEY = 'AIzaSyA3NP120hd4bj2q1VDZeDWCYKTrefPF6s0';
  // Initialize Google Generative AI
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const fetchGPTResponse = async (userMessage) => {
    try {
      const result = await model.generateContent(userMessage);
      return result.response.text();
    } catch (error) {
      console.error('Error fetching response:', error);
      return 'Oops, something went wrong!';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput) return;

    const updatedMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(updatedMessages);

    const gptResponse = await fetchGPTResponse(userInput);
    setMessages([...updatedMessages, { role: 'gpt', content: gptResponse }]);
    setUserInput('');

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="bg-[white] flex h-screen ">
      {/* Left section (placeholder for future content) */}
      <div className=" w-1/4 flex flex-col ">
        <div className=" ">
        <img
                  src={navgpt}
                  className=" "
                />
        </div>
        <div className=" bg-[white] h-1/2  ">
          <MoodSelector/>
          <HowDay/>
        </div>
        
      </div>

      {/* Right section (main content) */}
      <div className="w-3/4 rounded flex flex-col pb-9 mb-9 relative">
        <div className="flex flex-col items-center ml-6 mr-6 pb-9 mb-9 flex-grow overflow-y-auto" ref={chatContainerRef}>
          {/* Chat messages */}
          <div className="flex flex-col space-y-4 mb-4" style={{ maxHeight: '80vh' }}>
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start">
                <img
                  src={msg.role === 'user' ? userIcon : gptLogo}
                  alt={msg.role}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="bg-[white] p-4 rounded-lg">
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User input at the bottom */}
        <div className="w-3/4 flex items-center p-4 bg-white   fixed bottom-0 left-1/4 right-0">
          <input
            type="text"
            placeholder="share to self...."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            className="border  p-2 rounded w-full mr-2"
          />
          <button
            onClick={handleSubmit}
            className="bg-[black] text-white p-3 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;