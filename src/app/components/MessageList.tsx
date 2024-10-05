'use client';

import React from 'react';
import { Message } from 'ai';
import ReactMarkdown from 'react-markdown';

interface MessageListProps {
  messages: Message[];
  onCopyMessage: (content: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onCopyMessage }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-3/4 p-3 rounded-lg relative group ${
              message.role === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
            <button
              onClick={() => onCopyMessage(message.content)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white px-2 py-1 rounded text-xs"
            >
              Copy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;