import React, { useState, useRef, useEffect } from 'react';

const ChatWindow = ({ messages, isLoading, onSendMessage, onClearChat }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <section className="chat-section glass-panel">
      <header className="chat-header">
        <div>
          <h1>ET Concierge</h1>
          <p className="subtitle">Your AI-powered guide</p>
        </div>
        <button className="icon-button" onClick={onClearChat} title="Clear Session">
          <i className="ph ph-trash"></i>
        </button>
      </header>
      
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="avatar">
              {msg.role === 'user' ? <i className="ph ph-user"></i> : <i className="ph ph-robot"></i>}
            </div>
            <div className="content">
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message assistant">
            <div className="avatar"><i className="ph ph-robot"></i></div>
            <div className="content typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <form id="chat-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Type a message to concierge..." 
            autoComplete="off"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            id="chat-input"
          />
          <button 
            type="submit" 
            className={`send-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? <i className="ph ph-spinner-gap"></i> : <i className="ph ph-paper-plane-right"></i>}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatWindow;
