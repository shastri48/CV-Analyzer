'use client';

import { useState } from 'react';
import { ModelOption } from '@/types';

interface UploadFormProps {
  onSubmit: (file: File, model: string) => Promise<void>;
  isLoading: boolean;
}

const modelOptions: ModelOption[] = [
  { value: 'chatgpt', label: 'ChatGPT (GPT-4)' },
  { value: 'claude', label: 'Claude (Anthropic)' },
];

export default function UploadForm({ onSubmit, isLoading }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [useTextInput, setUseTextInput] = useState(false);
  const [resumeText, setResumeText] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (useTextInput && resumeText.trim()) {
      // Create a text file from the input
      const blob = new Blob([resumeText], { type: 'text/plain' });
      const textFile = new File([blob], 'resume.txt', { type: 'text/plain' });
      await onSubmit(textFile, 'claude'); // Always use Claude
    } else if (file) {
      await onSubmit(file, 'claude'); // Always use Claude
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Toggle between file upload and text input */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-blue-800 mb-3">
          💡 <strong>Recommended:</strong> Use &ldquo;Paste Text&rdquo; for best results. File upload may have issues with some PDFs.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button
            type="button"
            onClick={() => setUseTextInput(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              !useTextInput
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setUseTextInput(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              useTextInput
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            ⭐ Paste Text (Recommended)
          </button>
        </div>
      </div>

      {useTextInput ? (
        /* Text Input Area */
        <div className="space-y-4">
          <label htmlFor="resume-text" className="block text-sm font-medium text-gray-900 mb-2">
            Paste your resume text here:
          </label>
          <textarea
            id="resume-text"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your complete resume text here..."
            rows={12}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            disabled={isLoading}
          />
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
            <p className="text-sm text-green-800">
              ✅ <strong>This method works reliably!</strong> Copy all text from your resume and paste it here.
            </p>
          </div>
        </div>
      ) : (
        /* File Upload Area */
        <div
        className={`relative border-3 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
          dragActive
            ? 'border-blue-500 bg-gradient-to-br from-blue-500/10 to-purple-500/10 scale-[1.02]'
            : file
            ? 'border-green-500 bg-gradient-to-br from-green-500/10 to-emerald-500/10'
            : 'border-gray-600 bg-gray-800/50 hover:border-blue-400 hover:bg-gray-800/70'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          disabled={isLoading}
        />
        
        <div className="space-y-4">
          {/* Icon */}
          <div className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            file
              ? 'bg-gradient-to-br from-green-500 to-emerald-600'
              : 'bg-gradient-to-br from-blue-500 to-purple-600'
          }`}>
            {file ? (
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
          </div>

          {/* Text Content */}
          {file ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-lg font-semibold text-gray-900">{file.name}</span>
              </div>
              <p className="text-sm text-gray-700">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="text-sm text-blue-600 hover:text-blue-700 underline font-medium"
              >
                Change file
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                Drop your resume here
              </h3>
              <p className="text-gray-300">
                or{' '}
                <label
                  htmlFor="resume-upload"
                  className="text-blue-400 hover:text-blue-300 cursor-pointer font-semibold underline"
                >
                  browse files
                </label>
              </p>
              <p className="text-xs text-gray-300 pt-2">
                Supported: DOCX, TXT (Max 10MB)
              </p>
              <p className="text-xs text-yellow-400 pt-1">
                ⚠️ PDF upload may fail - use &ldquo;Paste Text&rdquo; instead
              </p>
            </div>
          )}
        </div>
      </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={(useTextInput ? !resumeText.trim() : !file) || isLoading}
        className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Analyzing Your Resume...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Analyze Resume
          </span>
        )}
      </button>
    </form>
  );
}
