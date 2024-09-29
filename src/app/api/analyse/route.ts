import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { AnalysisResult } from '@/types';

// Use dynamic import for pdf-parse to handle module compatibility
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse');

// Initialize clients (will use env vars when available)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
}) : null;

// Extract text from uploaded file
async function extractText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.pdf')) {
    const data = await pdfParse(buffer);
    return data.text;
  } else if (fileName.endsWith('.docx')) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else if (fileName.endsWith('.doc')) {
    // Basic text extraction for .doc (limited support)
    return buffer.toString('utf-8');
  }

  throw new Error('Unsupported file format');
}

// Analyze resume using ChatGPT
async function analyzeWithChatGPT(resumeText: string): Promise<AnalysisResult> {
  if (!openai) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `Analyze this resume and provide a detailed assessment in JSON format with the following structure:
{
  "score": <number between 0-100>,
  "keywords": {
    "missing": [<array of missing keywords>],
    "recommended": [<array of recommended keywords>]
  },
  "atsCheck": {
    "formatting": "<detailed formatting assessment>",
    "suggestions": [<array of improvement suggestions>]
  }
}

Resume:
${resumeText}

Provide a thorough analysis focusing on:
1. Overall resume quality and completeness (score)
2. Industry-relevant keywords that are missing or should be added
3. ATS compatibility - formatting, structure, and readability
4. Specific actionable suggestions for improvement`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an expert resume reviewer and career coach. Provide detailed, actionable feedback in JSON format.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' },
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  return result as AnalysisResult;
}

// Analyze resume using Claude
async function analyzeWithClaude(resumeText: string): Promise<AnalysisResult> {
  if (!anthropic) {
    throw new Error('Anthropic API key not configured');
  }

  const prompt = `Analyze this resume and provide a detailed assessment in JSON format with the following structure:
{
  "score": <number between 0-100>,
  "keywords": {
    "missing": [<array of missing keywords>],
    "recommended": [<array of recommended keywords>]
  },
  "atsCheck": {
    "formatting": "<detailed formatting assessment>",
    "suggestions": [<array of improvement suggestions>]
  }
}

Resume:
${resumeText}

Provide a thorough analysis focusing on:
1. Overall resume quality and completeness (score)
2. Industry-relevant keywords that are missing or should be added
3. ATS compatibility - formatting, structure, and readability
4. Specific actionable suggestions for improvement`;

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
}

// Generate mock analysis when API keys are not available
function generateMockAnalysis(): AnalysisResult {
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
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const model = formData.get('model') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Extract text from the uploaded file
    const resumeText = await extractText(file);

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: 'Could not extract text from the resume. Please ensure the file is readable.' },
        { status: 400 }
      );
    }

    // Analyze resume based on selected model
    let result: AnalysisResult;

    if (model === 'chatgpt' && openai) {
      result = await analyzeWithChatGPT(resumeText);
    } else if (model === 'claude' && anthropic) {
      result = await analyzeWithClaude(resumeText);
    } else {
      // Return mock data if API keys are not configured
      console.warn(`API key not configured for ${model}. Returning mock data.`);
      result = generateMockAnalysis();
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    );
  }
}
