import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-200 mb-6">
            Optimize Your Resume with
            <span className="text-blue-400"> AI-Powered Analysis</span>
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Get instant feedback on your resume with our advanced AI technology. 
            Improve your chances of landing interviews with ATS-optimized suggestions and keyword recommendations.
          </p>
          <Link
            href="/analyse"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow border border-gray-200">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Resume Scoring
            </h3>
            <p className="text-gray-700">
              Get an instant score out of 100 based on industry standards and best practices. 
              Understand exactly where your resume stands.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow border border-gray-200">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Keyword Suggestions
            </h3>
            <p className="text-gray-700">
              Discover missing and recommended keywords to help your resume pass through 
              Applicant Tracking Systems (ATS).
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow border border-gray-200">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ATS Compatibility
            </h3>
            <p className="text-gray-700">
              Receive detailed feedback on formatting and structure to ensure your resume 
              is ATS-friendly and easily parsed by systems.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Line for Desktop */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-30" style={{ top: '3.5rem' }}></div>
            
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="w-16 h-16 bg-blue-900 bg-opacity-30 rounded-xl flex items-center justify-center mx-auto mb-4 border-2 border-white border-opacity-30">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Upload Resume
                  </h3>
                  <p className="text-blue-100">
                    Simply drag and drop your resume in PDF or DOC format
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-purple-600">2</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="w-16 h-16 bg-purple-900 bg-opacity-30 rounded-xl flex items-center justify-center mx-auto mb-4 border-2 border-white border-opacity-30">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Choose AI Model
                  </h3>
                  <p className="text-purple-100">
                    Select ChatGPT or Claude for personalized analysis
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-green-600">3</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="w-16 h-16 bg-green-900 bg-opacity-30 rounded-xl flex items-center justify-center mx-auto mb-4 border-2 border-white border-opacity-30">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Get Results
                  </h3>
                  <p className="text-green-100">
                    Receive instant, detailed analysis and actionable recommendations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-blue-600 rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Improve Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start analyzing your resume today and increase your chances of landing your dream job.
          </p>
          <Link
            href="/analyse"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Analyze Now
          </Link>
        </div>
      </section>
    </div>
  );
}
