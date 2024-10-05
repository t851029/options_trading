'use client';

import React from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface MessageListProps {
  messages: Message[];
  onCopyMessage: (content: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onCopyMessage }) => {
  return (
    <div className="space-y-4 p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 rounded-lg ${
            message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className="font-bold">{message.role === 'user' ? 'You' : 'Assistant'}</span>
            <button
              onClick={() => onCopyMessage(message.content)}
              className="text-xs bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded transition duration-150 ease-in-out"
            >
              Copy
            </button>
          </div>
          <p className="mt-2">{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;