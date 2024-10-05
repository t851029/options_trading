import { useState, useEffect } from 'react';
import { Message } from 'ai';

const CHAT_HISTORY_KEY = 'chatHistory';

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
      return savedHistory ? JSON.parse(savedHistory) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
  }, [chatHistory]);

  const addMessage = (message: Message) => {
    setChatHistory((prevHistory) => [...prevHistory, message]);
  };

  const clearHistory = () => {
    setChatHistory([]);
  };

  return { chatHistory, addMessage, clearHistory };
};