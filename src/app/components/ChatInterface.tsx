'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useChat } from 'ai/react';
import MessageList from './MessageList';
import ModelSelector from './ModelSelector';
import LoadingIndicator from './LoadingIndicator';
import InputField from './InputField';
import ErrorDisplay from './ErrorDisplay';
import { useChatHistory } from '../hooks/useChatHistory';

// Temporarily comment out these imports until we create the components
// import InputField from './InputField';
// import ErrorDisplay from './ErrorDisplay';

const ChatInterface: React.FC = () => {
  const [model, setModel] = useState<'openai' | 'anthropic'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('selectedModel') as 'openai' | 'anthropic') || 'openai';
    }
    return 'openai';
  });

  const { chatHistory, addMessage, clearHistory } = useChatHistory();

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, stop, reload } = useChat({
    api: `/api/${model}/chat`,
    onError: (error) => {
      console.error('Chat error:', error);
    },
    onFinish: (message) => {
      addMessage(message);
    },
  });

  useEffect(() => {
    localStorage.setItem('selectedModel', model);
  }, [model]);

  const handleModelChange = (newModel: 'openai' | 'anthropic') => {
    setModel(newModel);
  };

  const handleStopGenerating = useCallback(() => {
    stop();
  }, [stop]);

  const handleRetry = useCallback(() => {
    reload();
  }, [reload]);

  const handleCopyMessage = useCallback((content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      alert('Message copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy message:', err);
    });
  }, []);

  const handleClearHistory = useCallback(() => {
    clearHistory();
  }, [clearHistory]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800">
        <ModelSelector model={model} onModelChange={handleModelChange} />
        <button
          onClick={handleClearHistory}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Clear History
        </button>
      </div>
      <div className="flex-grow overflow-auto">
        <MessageList messages={[...chatHistory, ...messages]} onCopyMessage={handleCopyMessage} />
      </div>
      {isLoading && (
        <div className="flex justify-between items-center p-2 bg-yellow-900 text-yellow-100">
          <LoadingIndicator />
          <button
            onClick={handleStopGenerating}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Stop Generating
          </button>
        </div>
      )}
      {error && <ErrorDisplay error={error} onRetry={handleRetry} />}
      <div className="p-4 bg-gray-800">
        <InputField
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatInterface;