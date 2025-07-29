// src/components/EchoChamberSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaPaperPlane, FaPlus, FaSearch } from 'react-icons/fa';
import '../styles/studentDashboard/EchoChamberSection.css'; // Dedicated CSS for Echo Chamber

// Placeholder for a circular user avatar
const FaUserCircle = ({ className }) => (
    <div className={`user-circle-avatar ${className}`}>
        <FaUser />
    </div>
);

const EchoChamberSection = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref for scrolling to bottom of chat

  useEffect(() => {
    // Mock conversations data
    const mockConversations = [
      {
        id: 'conv1',
        participant: { id: 'p1', name: 'Dr. Alum Smith', avatar: 'alum-smith.jpg' },
        lastMessage: 'Great discussion on AI ethics!',
        timestamp: '2m ago',
        messages: [
          { id: 'm1', sender: 'Dr. Alum Smith', text: 'Hello! Thanks for connecting.', type: 'received' },
          { id: 'm2', sender: 'Me', text: 'Hi Dr. Smith! Enjoyed your talk on AI.', type: 'sent' },
          { id: 'm3', sender: 'Dr. Alum Smith', text: 'Glad to hear! What are your thoughts on current AI trends?', type: 'received' },
          { id: 'm4', sender: 'Me', text: 'I\'m particularly interested in ethical AI development.', type: 'sent' },
          { id: 'm5', sender: 'Dr. Alum Smith', text: 'Great discussion on AI ethics!', type: 'received' },
        ],
      },
      {
        id: 'conv2',
        participant: { id: 'p2', name: 'Peer Jane', avatar: 'peer-jane.jpg' },
        lastMessage: 'Project deadline is next week.',
        timestamp: '1h ago',
        messages: [
          { id: 'm6', sender: 'Me', text: 'Hey Jane, how\'s the project coming along?', type: 'sent' },
          { id: 'm7', sender: 'Peer Jane', text: 'Almost done, just finishing up the report.', type: 'received' },
          { id: 'm8', sender: 'Me', text: 'Cool. Need any help?', type: 'sent' },
          { id: 'm9', sender: 'Peer Jane', text: 'Maybe with the data visualization part later.', type: 'received' },
          { id: 'm10', sender: 'Peer Jane', text: 'Project deadline is next week.', type: 'received' },
        ],
      },
      {
        id: 'conv3',
        participant: { id: 'p3', name: 'Mentor John', avatar: 'mentor-john.jpg' },
        lastMessage: 'Let\'s schedule our next session.',
        timestamp: 'Yesterday',
        messages: [
          { id: 'm11', sender: 'Mentor John', text: 'Hope you\'re doing well!', type: 'received' },
          { id: 'm12', sender: 'Me', text: 'Thanks, same to you!', type: 'sent' },
          { id: 'm13', sender: 'Mentor John', text: 'Let\'s schedule our next session.', type: 'received' },
        ],
      },
    ];
    setConversations(mockConversations);
    if (mockConversations.length > 0) {
      setSelectedConversation(mockConversations[0]); // Select the first conversation by default
    }
  }, []);

  // Scroll to the latest message whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedConversation) return;

    const messageToSend = {
      id: `m${Date.now()}`,
      sender: 'Me',
      text: newMessage.trim(),
      type: 'sent',
    };

    setSelectedConversation(prevConv => {
      const updatedMessages = [...prevConv.messages, messageToSend];
      return { ...prevConv, messages: updatedMessages, lastMessage: newMessage.trim() };
    });

    // Also update the main conversations list
    setConversations(prevConvs =>
      prevConvs.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, messages: [...conv.messages, messageToSend], lastMessage: newMessage.trim() }
          : conv
      )
    );

    setNewMessage(''); // Clear input field
  };

  return (
    <div className="echo-chamber-container dashboard-section-card full-width-card">
      <h2 className="section-title">Echo Chamber (Chats)</h2>
      <p className="section-description">Real-time conversations with your connections. Connect, collaborate, and communicate seamlessly.</p>

      <div className="chat-interface">
        <div className="chat-list-panel">
          <div className="chat-list-header">
            <h4>Conversations</h4>
            <button className="new-chat-button" onClick={() => alert('Start a new chat!')}><FaPlus /></button>
          </div>
          <div className="chat-search">
            <input type="text" placeholder="Search chats..." />
            <FaSearch className="search-icon" />
          </div>
          <div className="conversations-scroll-area">
            {conversations.map(conv => (
              <div
                key={conv.id}
                className={`chat-preview ${selectedConversation?.id === conv.id ? 'active' : ''}`}
                onClick={() => setSelectedConversation(conv)}
              >
                <FaUserCircle className="chat-avatar" />
                <div className="chat-info">
                  <h5>{conv.participant.name}</h5>
                  <p className="last-message">{conv.lastMessage}</p>
                  <span className="timestamp">{conv.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-window-panel">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                <FaUserCircle className="chat-avatar" />
                <h4>{selectedConversation.participant.name}</h4>
              </div>
              <div className="chat-messages-area">
                {selectedConversation.messages.map(msg => (
                  <div key={msg.id} className={`message ${msg.type}`}>
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} /> {/* Scroll target */}
              </div>
              <form className="chat-input-area" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit"><FaPaperPlane /> Send</button>
              </form>
            </>
          ) : (
            <div className="no-conversation-selected">
              Select a conversation to start chatting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EchoChamberSection;
