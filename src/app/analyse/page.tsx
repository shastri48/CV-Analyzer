'use client';

import { useState } from 'react';
import UploadForm from '@/components/UploadForm';
import ResultCard from '@/components/ResultCard';
import ApiKeyInput from '@/components/ApiKeyInput';
import { AnalysisResult } from '@/types';
import Anthropic from '@anthropic-ai/sdk';

export default function AnalysePage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeys, setApiKeys] = useState({ openai: '', anthropic: '' });

  // Extract text from PDF using PDF.js (dynamically imported)
  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      // Dynamic import to avoid SSR issues
      const pdfjsLib = await import('pdfjs-dist');
      
      // Set up worker - try local path first, then CDN
      try {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
      } catch {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      }
      
      const arrayBuffer = await file.arrayBuffer();
      
      const loadingTask = pdfjsLib.getDocument({ 
        data: arrayBuffer,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true
      });
      
      const pdf = await loadingTask.promise;
      
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => ('str' in item ? item.str : ''))
          .filter(text => text.length > 0)
          .join(' ');
        fullText += pageText + '\n';
      }

      const result = fullText.trim();
      
      if (!result || result.length < 10) {
        throw new Error('PDF appears to be empty or text extraction failed');
      }
      
      return result;
    } catch (err) {
      // Provide more specific error message
      if (err instanceof Error) {
        if (err.message.includes('Invalid PDF')) {
          throw new Error('The PDF file appears to be corrupted or in an unsupported format.');
        } else if (err.message.includes('password')) {
          throw new Error('The PDF is password-protected. Please provide an unprotected version.');
        } else if (err.message.includes('empty')) {
          throw new Error('No text could be extracted from the PDF. It may be an image-based PDF.');
        } else {
          throw new Error(`PDF extraction failed: ${err.message}. Try converting to DOCX or TXT format.`);
        }
      }
      
      throw new Error('Failed to extract text from PDF. Please try converting it to DOCX or TXT format.');
    }
  };

  // Extract text from DOCX using mammoth (dynamically imported)
  const extractTextFromDOCX = async (file: File): Promise<string> => {
    try {
      // Dynamic import to avoid SSR issues
      const mammoth = await import('mammoth');
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value.trim();
    } catch {
      throw new Error('Failed to extract text from DOCX file.');
    }
  };

  // Extract text from file based on type
  const extractTextFromFile = async (file: File): Promise<string> => {
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.pdf')) {
      return await extractTextFromPDF(file);
    } else if (fileName.endsWith('.docx')) {
      return await extractTextFromDOCX(file);
    } else if (fileName.endsWith('.doc')) {
      // For old .doc files, try to read as text (limited support)
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          resolve(text.replace(/[^\x20-\x7E\n]/g, '').trim());
        };
        reader.onerror = () => reject(new Error('Failed to read DOC file'));
        reader.readAsText(file);
      });
    } else {
      // Fallback for text files
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
      });
    }
  };

  // Analyze with Claude
  const analyzeWithClaude = async (resumeText: string): Promise<AnalysisResult> => {
    if (!apiKeys.anthropic) {
      throw new Error('Please enter your Anthropic API key');
    }

    const anthropic = new Anthropic({
      apiKey: apiKeys.anthropic,
      dangerouslyAllowBrowser: true, // Enable browser usage
    });

    const prompt = `You are an expert resume reviewer. Analyze this resume carefully and provide a detailed assessment in JSON format.

IMPORTANT: You must extract and quote actual content from the resume in your analysis. For each section, include:
- What is ACTUALLY written in that section (direct quotes or summaries)
- Specific strengths based on the actual content
- Specific improvements needed based on what's actually there (or missing)

Resume to analyze:
${resumeText}

Provide your analysis in this exact JSON format:
{
  "score": <number between 0-100>,
  "keywords": {
    "missing": [<keywords that should be in the resume but aren't>],
    "recommended": [<additional powerful keywords to add>]
  },
  "atsCheck": {
    "formatting": "<detailed assessment of ATS compatibility>",
    "suggestions": [<specific formatting improvements>]
  },
  "sections": [
    {
      "sectionName": "<actual section name from resume>",
      "content": "<QUOTE or summarize the ACTUAL content from this section>",
      "strengths": [<specific strengths based on ACTUAL content>],
      "improvements": [<specific improvements based on what's ACTUALLY there>]
    }
  ]
}

Analyze these aspects:
1. Overall score (0-100) based on completeness, impact, and professionalism
2. Missing keywords that would improve ATS matching
3. ATS formatting compatibility
4. For EACH section found in the resume:
   - Name the section exactly as it appears
   - Summarize what's ACTUALLY written there
   - List specific strengths in that section
   - List specific improvements needed`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type === 'text') {
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return result as AnalysisResult;
      }
    }

    throw new Error('Failed to parse Claude response');
  };

  // Generate mock analysis
  const generateMockAnalysis = (): AnalysisResult => {
    return {
      score: 75,
      keywords: {
        missing: ['project management', 'agile', 'stakeholder communication'],
        recommended: ['leadership', 'cross-functional teams', 'data analysis', 'strategic planning'],
      },
      atsCheck: {
        formatting: 'Your resume has good ATS compatibility. The structure is clear with standard section headings. However, consider using more common section titles like "Work Experience" instead of creative alternatives.',
        suggestions: [
          'Add more quantifiable achievements with specific metrics and numbers',
          'Include relevant technical skills in a dedicated skills section',
          'Use standard fonts like Arial, Calibri, or Times New Roman',
          'Avoid using tables, text boxes, or columns as they may not parse correctly',
          'Include keywords from job descriptions you are targeting',
          'Keep the formatting simple and consistent throughout',
        ],
      },
      sections: [
        {
          sectionName: 'Contact Information',
          content: 'Contains name, email, phone, and location details',
          strengths: ['Clear and easy to find', 'Professional email address'],
          improvements: ['Add LinkedIn profile URL', 'Consider adding a professional portfolio link'],
        },
        {
          sectionName: 'Professional Summary',
          content: 'Brief overview of experience and career goals',
          strengths: ['Concise and focused', 'Highlights key strengths'],
          improvements: ['Add specific years of experience', 'Include 1-2 major achievements', 'Tailor to target role'],
        },
        {
          sectionName: 'Work Experience',
          content: 'Lists previous positions with responsibilities',
          strengths: ['Clear job titles and companies', 'Uses action verbs'],
          improvements: ['Add quantifiable metrics (%, $, numbers)', 'Include more specific achievements', 'Use STAR format for accomplishments'],
        },
        {
          sectionName: 'Education',
          content: 'Degree information and academic credentials',
          strengths: ['Includes degree type and institution', 'Clear graduation date'],
          improvements: ['Add relevant coursework if recent graduate', 'Include GPA if above 3.5', 'Add academic honors or awards'],
        },
        {
          sectionName: 'Skills',
          content: 'Technical and soft skills listing',
          strengths: ['Organized by category', 'Includes industry-relevant tools'],
          improvements: ['Add proficiency levels', 'Include certifications', 'Prioritize most relevant skills for target role'],
        },
      ],
    };
  };

  const handleFileSubmit = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Extract text from file
      const resumeText = await extractTextFromFile(file);

      if (!resumeText || resumeText.trim().length < 50) {
        throw new Error('Could not extract enough text from the resume. Please ensure the file is readable.');
      }

      // Analyze with AI
      let analysisResult: AnalysisResult;

      if (apiKeys.anthropic) {
        // Use Claude if Anthropic API key provided
        analysisResult = await analyzeWithClaude(resumeText);
      } else {
        // No API key - show mock data
        analysisResult = generateMockAnalysis();
        setError('ℹ️ Showing sample analysis data. Add your Anthropic API key above for real AI-powered analysis of your resume.');
      }

      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">
            Analyze Your Resume
          </h1>
          <p className="text-lg text-white">
            Upload your resume and get instant AI-powered feedback
          </p>
        </div>

        {/* API Key Input */}
        <ApiKeyInput apiKeys={apiKeys} setApiKeys={setApiKeys} />

        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
          <UploadForm onSubmit={handleFileSubmit} isLoading={isLoading} />
        </div>

        {error && (
          <div className={`${
            error.startsWith('ℹ️') 
              ? 'bg-blue-50 border-blue-200 text-blue-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          } border px-4 py-3 rounded-lg mb-8`}>
            <p className="font-medium">{error.startsWith('ℹ️') ? 'Information' : 'Error'}</p>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-400">Analysis Results</h2>
            </div>
            <ResultCard result={result} />
          </div>
        )}

        {!result && !isLoading && !error && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-24 w-24 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-4 text-white text-lg font-medium">
              Upload your resume to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
