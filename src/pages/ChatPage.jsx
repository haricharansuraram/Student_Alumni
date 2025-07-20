import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useChat } from './ChatContext';

const ChatPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { chats, sendMessage } = useChat();

  const alumni = state?.alumni || chats[id]?.alumni;
  const messages = chats[id]?.messages || [];
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(id, alumni, input);
      setInput('');
    }
  };

  if (!alumni) return <div style={{ padding: 24 }}>Alumni not found.</div>;

  return (
    <div style={{ maxWidth: 350, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 18 }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#1976d2', fontSize: 22, display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: 12 }}>
        <span style={{ fontSize: 24, marginRight: 6 }}>←</span> Back
      </button>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <img src={alumni.img} alt={alumni.name} style={{ width: 38, height: 38, borderRadius: '50%', marginRight: 10 }} />
        <div>
          <div style={{ fontWeight: 600 }}>{alumni.name}</div>
          <div style={{ fontSize: 13, color: '#666' }}>{alumni.profession}</div>
        </div>
      </div>
      <div style={{ minHeight: 100, border: '1px solid #eee', borderRadius: 8, padding: 10, marginBottom: 10, background: '#fafbfc', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {messages.length === 0 ? (
          <div style={{ color: '#aaa', marginBottom: 8 }}>No messages yet. Say hi!</div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} style={{ textAlign: msg.from === 'me' ? 'right' : 'left', margin: '6px 0' }}>
              <span style={{ background: msg.from === 'me' ? '#1976d2' : '#e3f0fc', color: msg.from === 'me' ? '#fff' : '#1976d2', borderRadius: 16, padding: '6px 14px', display: 'inline-block' }}>
                {msg.text}
              </span>
            </div>
          ))
        )}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8, gap: 6 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            style={{ padding: 8, borderRadius: 16, border: '1px solid #ccc', fontSize: 14, marginBottom: 4 }}
          />
          <button
            onClick={handleSend}
            style={{
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: 16,
              padding: '0 14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: 14,
              height: 32
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;