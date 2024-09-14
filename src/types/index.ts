export interface SectionAnalysis {
  sectionName: string;
  content: string;
  strengths: string[];
  improvements: string[];
}

export interface AnalysisResult {
  score: number;
  keywords: {
    missing: string[];
    recommended: string[];
  };
  atsCheck: {
    formatting: string;
    suggestions: string[];
  };
  sections: SectionAnalysis[];
}

export interface AnalysisRequest {
  resumeText: string;
  model: 'chatgpt' | 'claude';
}

export type ModelOption = {
  value: 'chatgpt' | 'claude';
  label: string;
};
