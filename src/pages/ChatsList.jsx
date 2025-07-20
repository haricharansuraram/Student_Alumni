import React from 'react';
import { useChat } from './ChatContext'; // <-- Correct import
import { useNavigate } from 'react-router-dom';

const ChatsList = () => {
  const { chats } = useChat();
  const navigate = useNavigate();

  const chatEntries = Object.entries(chats);

  if (chatEntries.length === 0) {
    return <div style={{ padding: 24 }}>No chats yet. Start a conversation from the Alumni page!</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Chats</h2>
      {chatEntries.map(([id, { alumni, messages }]) => (
        <div
          key={id}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: 16 }}
          onClick={() => navigate(`/student/dashboard/chats/${id}`)}
        >
          <img src={alumni.img} alt={alumni.name} style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 12 }} />
          <div>
            <div style={{ fontWeight: 600 }}>{alumni.name}</div>
            <div style={{ fontSize: 13, color: '#666' }}>
              {messages[messages.length - 1]?.text || 'No messages yet'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;