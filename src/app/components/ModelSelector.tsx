'use client';

import React from 'react';

interface ModelSelectorProps {
  model: 'openai' | 'anthropic';
  onModelChange: (model: 'openai' | 'anthropic') => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ model, onModelChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="model-select" className="text-gray-300 font-medium">
        AI Model:
      </label>
      <select
        id="model-select"
        value={model}
        onChange={(e) => onModelChange(e.target.value as 'openai' | 'anthropic')}
        className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="openai" className="bg-gray-700">OpenAI</option>
        <option value="anthropic" className="bg-gray-700">Anthropic</option>
      </select>
    </div>
  );
};

export default ModelSelector;