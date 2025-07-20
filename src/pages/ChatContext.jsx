import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('chats');
    return saved ? JSON.parse(saved) : {};
  });

  const sendMessage = (alumniId, alumni, message) => {
    setChats(prev => {
      const updated = {
        ...prev,
        [alumniId]: {
          alumni,
          messages: [...(prev[alumniId]?.messages || []), { from: 'me', text: message }]
        }
      };
      localStorage.setItem('chats', JSON.stringify(updated));
      return updated;
    });
  };

  // Add this function
  const clearChats = () => {
    setChats({});
    localStorage.removeItem('chats');
  };

  return (
    <ChatContext.Provider value={{ chats, sendMessage, clearChats }}>
      {children}
    </ChatContext.Provider>
  );
};