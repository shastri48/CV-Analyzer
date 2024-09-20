import { AnalysisResult } from '@/types';

interface ResultCardProps {
  result: AnalysisResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="space-y-6">
      {/* Score Section */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Resume Score</h2>
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke={result.score >= 70 ? '#10b981' : result.score >= 50 ? '#f59e0b' : '#ef4444'}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(result.score / 100) * 351.86} 351.86`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-900">{result.score}</span>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-800 font-medium mt-4">
          {result.score >= 70 ? 'Excellent!' : result.score >= 50 ? 'Good, but can improve' : 'Needs improvement'}
        </p>
      </div>

      {/* Keywords Section */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Keywords Analysis</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">Missing Keywords</h3>
            {result.keywords.missing.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {result.keywords.missing.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">No missing keywords identified</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">Recommended Keywords</h3>
            {result.keywords.recommended.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {result.keywords.recommended.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">No additional keywords recommended</p>
            )}
          </div>
        </div>
      </div>

      {/* ATS Feedback Section */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">ATS Compatibility</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Formatting Assessment</h3>
            <p className="text-gray-800 leading-relaxed">{result.atsCheck.formatting}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Suggestions</h3>
            {result.atsCheck.suggestions.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                {result.atsCheck.suggestions.map((suggestion, index) => (
                  <li key={index} className="leading-relaxed">
                    {suggestion}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">No suggestions at this time</p>
            )}
          </div>
        </div>
      </div>

      {/* Section-wise Analysis */}
      {result.sections && result.sections.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">Section-by-Section Analysis</h2>
          
          <div className="space-y-6">
            {result.sections.map((section, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-6 py-2">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{section.sectionName}</h3>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-1">Content Summary:</p>
                  <p className="text-gray-800">{section.content}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="text-sm font-semibold text-green-800">Strengths</h4>
                    </div>
                    {section.strengths.length > 0 ? (
                      <ul className="space-y-1 text-sm">
                        {section.strengths.map((strength, idx) => (
                          <li key={idx} className="text-green-700 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-green-600 italic">No specific strengths identified</p>
                    )}
                  </div>

                  {/* Improvements */}
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <h4 className="text-sm font-semibold text-orange-800">Improvements Needed</h4>
                    </div>
                    {section.improvements.length > 0 ? (
                      <ul className="space-y-1 text-sm">
                        {section.improvements.map((improvement, idx) => (
                          <li key={idx} className="text-orange-700 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-orange-600 italic">No improvements needed</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
