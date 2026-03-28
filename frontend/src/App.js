import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import { sendMessage } from './services/api';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your ET Concierge. I'm here to help you navigate The Economic Times ecosystem. What brings you here today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("123");
  const [profile, setProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [actions, setActions] = useState([]);

  const handleSendMessage = async (text) => {
    // Add user message
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await sendMessage(text, userId);
      
      // Update UI with AI state matching real backend schema
      setMessages([...newMessages, { role: 'assistant', content: response.reply }]);
      setProfile(response.profile || profile);
      setRecommendations(response.recommendations || []);
      setActions(response.actions || []);

    } catch (error) {
      console.error("API Error:", error);
      setMessages([...newMessages, { role: 'assistant', content: "I encountered an error connecting to the backend. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: "Hello! Let's start over. What can I help you with?" }]);
    setProfile(null);
    setRecommendations([]);
    setActions([]);
  };

  return (
    <>
      <div className="app-background">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <main className="dashboard-container">
        <ChatWindow 
          messages={messages} 
          isLoading={isLoading} 
          onSendMessage={handleSendMessage} 
          onClearChat={clearChat} 
        />
        <Sidebar 
          profile={profile} 
          recommendations={recommendations} 
          actions={actions} 
        />
      </main>
    </>
  );
}

export default App;
