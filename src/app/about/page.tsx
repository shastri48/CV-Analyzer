export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">About CV Analyzer</h1>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg">
                We believe that everyone deserves a fair chance in the job market. CV Analyzer was created 
                to help job seekers optimize their resumes, pass through Applicant Tracking Systems (ATS), 
                and make a strong impression on hiring managers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Do</h2>
              <p className="mb-4">
                CV Analyzer uses Claude AI (Anthropic&apos;s advanced language model) to provide detailed, 
                actionable feedback on your resume. Our tool analyzes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Overall resume quality with a score out of 100</li>
                <li>Section-by-section detailed breakdown with actual content review</li>
                <li>Specific strengths and improvements for each section</li>
                <li>Industry-relevant keywords you may be missing</li>
                <li>ATS compatibility and formatting assessment</li>
                <li>Actionable recommendations based on your actual resume content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
                    <div>
                      <strong>Upload or Paste:</strong> Choose to paste your resume text (recommended) or upload a DOCX/TXT file
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
                    <div>
                      <strong>Add API Key (Optional):</strong> Enter your Anthropic API key for real AI analysis, or skip to see sample data
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
                    <div>
                      <strong>Analyze:</strong> Our AI examines each section, identifies strengths, and provides specific suggestions
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">4</span>
                    <div>
                      <strong>Improve:</strong> Get personalized recommendations to enhance your resume and increase interview chances
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Claude AI?</h2>
              <p className="mb-4">
                We use Claude 3.5 Sonnet for its exceptional capabilities:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">🎯 Context Understanding</h3>
                  <p className="text-sm text-blue-800">
                    Understands nuance and context in professional writing
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">📋 Detailed Feedback</h3>
                  <p className="text-sm text-blue-800">
                    Provides actionable, specific recommendations
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">🔍 Multi-Aspect Analysis</h3>
                  <p className="text-sm text-blue-800">
                    Analyzes multiple aspects simultaneously
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">🎓 Personalized Advice</h3>
                  <p className="text-sm text-blue-800">
                    Generates recommendations based on actual content
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy & Security</h2>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <p className="mb-3">
                  <strong className="text-green-900">Your privacy is our priority.</strong> All resume processing 
                  happens entirely in your browser - there are no backend servers.
                </p>
                <ul className="space-y-2 text-green-800">
                  <li>✅ Your resume content is only sent to Anthropic&apos;s Claude AI for analysis</li>
                  <li>✅ API keys are stored only in your browser session</li>
                  <li>✅ No data is saved to any server</li>
                  <li>✅ Files are processed locally in your browser</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology</h2>
              <p className="mb-4">
                Built with modern web technologies for the best user experience:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">Next.js 15</span>
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">TypeScript</span>
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">TailwindCSS</span>
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">React 19</span>
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">Claude AI</span>
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">PDF.js</span>
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">Mammoth.js</span>
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Started</h2>
              <p className="mb-6 text-lg">
                Ready to optimize your resume and increase your chances of landing interviews? 
                Get instant AI-powered feedback now!
              </p>
              <a
                href="/analyse"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Analyze Your Resume Now →
              </a>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Open Source</h2>
              <p>
                CV Analyzer is an open-source project. We believe in transparency and community-driven 
                development. Feel free to contribute, suggest features, or report issues on our GitHub repository.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
