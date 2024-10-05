'use client';

import React from 'react';

interface ModelSelectorProps {
  model: 'openai' | 'anthropic';
  onModelChange: (model: 'openai' | 'anthropic') => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ model, onModelChange }) => {
  return (
    <div className="p-4 border-b">
      <label className="flex items-center space-x-2">
        <span>Select AI Model:</span>
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value as 'openai' | 'anthropic')}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
        </select>
      </label>
    </div>
  );
};

export default ModelSelector;