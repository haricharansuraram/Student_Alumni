import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaPaperPlane, FaPlus, FaSearch } from 'react-icons/fa';
import '../styles/studentDashboard/EchoChamberSection.css';

const FaUserCircle = ({ className }) => (
  <div className={`user-circle-avatar ${className}`}>
    <FaUser />
  </div>
);

const mockConversations = [
  {
    id: 'conv1',
    participant: { id: 'alum1', name: 'Dr. Alum Smith', avatar: '' },
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
    participant: { id: 'alum2', name: 'Peer Jane', avatar: '' },
    lastMessage: 'Project deadline is next week.',
    timestamp: '1h ago',
    messages: [
      { id: 'm6', sender: 'Me', text: 'Hey Jane, how\'s the project coming along?', type: 'sent' },
      { id: 'm7', sender: 'Peer Jane', text: 'Almost done, just finishing up the report.', type: 'received' },
      { id: 'm8', sender: 'Me', text: 'Cool. Need any help?', type: 'sent' },
      { id: 'm9', sender: 'Peer Jane', text: 'Maybe with the data visualization part later.', type: 'received' },
      { id: 'm10', sender: 'Peer Jane', text: 'Project deadline is next week.', type: 'received' },
    ],
  }
];

const EchoChamberSection = ({ selectedChatUser, onNavigate }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setConversations(mockConversations);
    localStorage.removeItem('chats');
  }, []);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (selectedChatUser) {
      const conversation = conversations.find(conv => conv.participant.id === selectedChatUser.id);
      if (conversation) {
        setSelectedConversation(conversation);
      } else {
        const newConv = {
          id: `conv${Date.now()}`,
          participant: { id: selectedChatUser.id, name: selectedChatUser.name, avatar: selectedChatUser.avatar },
          lastMessage: `You started a new chat with ${selectedChatUser.name}.`,
          timestamp: 'Just now',
          messages: [],
        };
        setConversations(prev => [newConv, ...(Array.isArray(prev) ? prev : [])]);
        setSelectedConversation(newConv);
      }
    } else if (conversations.length > 0) {
      setSelectedConversation(conversations[0]);
    }
  }, [selectedChatUser, conversations]);

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

    setConversations(prevConvs =>
      prevConvs.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, messages: [...conv.messages, messageToSend], lastMessage: newMessage.trim(), timestamp: 'Just now' }
          : conv
      )
    );

    setNewMessage('');
  };

  return (
    <div className="echo-chamber-page">
      
      <div className="echo-chamber-container dashboard-section-card full-width-card">
        <h2 className="section-title">Chats</h2>
        <div className="chat-interface">
          <button
        className="chat-profile-back-btn"
        onClick={() => onNavigate ? onNavigate('alumni') : null}
      >
        ← Back
      </button>
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
                  <div ref={messagesEndRef} />
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
    </div>
  );
};

export default EchoChamberSection;