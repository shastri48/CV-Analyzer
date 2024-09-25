'use client';

import { useState } from 'react';

interface ApiKeyInputProps {
  apiKeys: {
    openai: string;
    anthropic: string;
  };
  setApiKeys: (keys: { openai: string; anthropic: string }) => void;
}

export default function ApiKeyInput({ apiKeys, setApiKeys }: ApiKeyInputProps) {
  const [showKeys, setShowKeys] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl p-1 mb-8 overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-gray-900 rounded-xl p-6">
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div>
          <h3 className="text-lg font-bold text-white mb-1 flex items-center">
            Anthropic API Key
            <span className="ml-2 px-2 py-0.5 bg-blue-500 bg-opacity-20 text-blue-300 text-xs rounded-full">Optional</span>
          </h3>
          <p className="text-sm text-gray-300">
            Enter your Anthropic API key for real AI analysis or leave empty to see sample data.
          </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowKeys(!showKeys)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-lg"
          >
            <span>{showKeys ? 'Hide' : 'Show'}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${showKeys ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Expandable content with animation */}
        <div 
          className={`transition-all duration-300 ease-in-out ${
            showKeys ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="space-y-5 pt-4 border-t border-white border-opacity-10">
            {/* Anthropic Key Input */}
            <div className="group">
              <label htmlFor="anthropic-key" className="flex items-center text-sm font-medium text-white mb-2">
                <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                Anthropic API Key (Claude)
              </label>
              <input
                type="password"
                id="anthropic-key"
                value={apiKeys.anthropic}
                onChange={(e) => setApiKeys({ ...apiKeys, anthropic: e.target.value })}
                placeholder="sk-ant-..."
                className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-white placeholder-gray-500 transition-all"
              />
              <p className="mt-2 text-xs text-gray-400">
                Get your key from{' '}
                <a
                  href="https://console.anthropic.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Anthropic Console
                </a>
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-4 mt-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-xs text-yellow-200">
                  <strong className="font-semibold">Privacy Note:</strong> Your API keys are stored only in your browser session and are never sent to our servers. They are transmitted directly to OpenAI or Anthropic for analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
