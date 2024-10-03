# CV Analyzer - AI-Powered Resume Analysis Tool

A modern, production-ready Next.js application that analyzes resumes using Claude AI. Get instant, detailed feedback on your resume with section-by-section analysis, ATS compatibility checks, and keyword suggestions.

## ✨ Features

- **📊 Resume Scoring**: Get an instant score (0-100) based on industry standards
- **📝 Section-by-Section Analysis**: Detailed breakdown of each resume section with actual content review
- **🔑 Keyword Analysis**: Discover missing and recommended keywords for your target role
- **📋 ATS Compatibility Check**: Ensure your resume passes Applicant Tracking Systems
- **🤖 Claude AI-Powered**: Uses Claude 3.5 Sonnet for intelligent, context-aware analysis
- **📄 Multiple Input Methods**: Paste text (recommended) or upload DOCX/TXT files
- **🎨 Modern UI**: Premium dark theme design with smooth animations
- **🔒 Privacy-Focused**: All processing happens in your browser - no backend servers
- **🔐 Secure**: API keys stored only in browser session

## 🚀 Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: TailwindCSS 4
- **AI Integration**: Anthropic API (Claude 3.5 Sonnet) - Client-side only
- **File Processing**: PDF.js & Mammoth.js for file parsing
- **UI**: React 19 with modern animations and responsive design

## 📋 Prerequisites

- Node.js 18+ and npm
- (Optional) Anthropic API key for Claude analysis

## 🛠️ Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd cv-analyzer
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key (optional):
```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open http://localhost:3000** in your browser

## 📖 Usage

### Analyzing a Resume

1. Navigate to the **Analyse** page
2. Choose your input method:
   - **⭐ Paste Text (Recommended)**: Copy your resume text and paste it
   - **Upload File**: Upload DOCX or TXT file
3. (Optional) Click "Show" to enter your Anthropic API key
   - Get your key from [Anthropic Console](https://console.anthropic.com/)
   - If you don't enter a key, sample data will be shown
4. Click "Analyze Resume"
5. Review your detailed results:
   - Overall resume score (0-100)
   - Section-by-section analysis with actual content
   - Strengths in each section
   - Specific improvements needed
   - Missing keywords
   - Recommended keywords
   - ATS compatibility feedback

### Input Methods

**Paste Text (Recommended) ⭐**
- Most reliable: 100% success rate
- How to use:
  1. Open your resume in any PDF viewer or Word
  2. Select all (Ctrl+A / Cmd+A)
  3. Copy (Ctrl+C / Cmd+C)
  4. Click "Paste Text" button
  5. Paste in the text area

**File Upload**
- **DOCX**: ✅ Works well
- **TXT**: ✅ Works well
- **PDF**: ⚠️ May have issues with some PDFs (use Paste Text instead)

## 🏗️ Project Structure

```
cv-analyzer/
├── src/
│   ├── app/
│   │   ├── analyse/          # Resume analysis page
│   │   ├── about/            # About page
│   │   ├── layout.tsx        # Root layout with navbar
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── Navbar.tsx        # Navigation component
│   │   ├── UploadForm.tsx    # File upload & text paste form
│   │   ├── ResultCard.tsx    # Analysis results display
│   │   └── ApiKeyInput.tsx   # API key input component
│   └── types/
│       └── index.ts          # TypeScript interfaces
├── public/                   # Static assets
├── .env.example             # Environment variables template
└── package.json
```

## 🔑 API Key Setup

### Anthropic (Claude)
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key
5. Add it to your `.env` file or enter it in the app

**Note**: Without an API key, the app shows sample analysis data for testing purposes.

## 🌟 Key Features Explained

### Section-by-Section Analysis
Each resume section is analyzed individually:
- **Content Summary**: What's actually written in the section
- **Strengths**: What works well in that section
- **Improvements**: Specific suggestions for enhancement

### ATS Compatibility
Checks for:
- Standard section headings
- Proper formatting
- Keyword density
- File structure

### Keyword Analysis
- **Missing Keywords**: Important terms not found in your resume
- **Recommended Keywords**: Additional powerful keywords to add

## 🔒 Privacy & Security

- **No Backend**: All file processing and AI analysis happens directly in your browser
- **API Key**: Your API key is only stored in your browser session
- **Secure**: API key is sent only to Anthropic servers for analysis
- **No Storage**: Files and results are never sent to or stored on any server

## 🚢 Building for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

This app can be deployed to any platform that supports Next.js:
- **Vercel**: One-click deployment (recommended)
- **Netlify**: Static site hosting
- **AWS Amplify**: Full-stack hosting
- **Cloudflare Pages**: Edge deployment

Since there's no backend, deployment is straightforward - just deploy the static Next.js app.

## 🎨 Customization

### Updating the About Page

Edit `src/app/about/page.tsx` to add your personal information.

### Modifying Analysis Logic

The analysis logic is in `src/app/analyse/page.tsx`. You can:
- Adjust the Claude prompt for different analysis focus
- Change the mock data structure
- Modify section analysis parameters

### Styling

The app uses TailwindCSS with a dark theme. Modify styles in:
- Component files (inline Tailwind classes)
- `src/app/globals.css` (global styles and theme colors)

## 🐛 Troubleshooting

### PDF Upload Issues
**Problem**: PDF extraction fails  
**Solution**: Use the "Paste Text" feature instead:
1. Open PDF in any viewer
2. Select all text (Ctrl+A)
3. Copy and paste into the text area

### API Key Errors
**Problem**: "invalid x-api-key" error  
**Solution**:
- Ensure you copied the complete API key from Anthropic Console
- Key should start with `sk-ant-`
- No extra spaces before/after the key

### No Results Showing
**Problem**: Sample data disclaimer appears  
**Solution**: This is expected without an API key. Add your Anthropic API key for real analysis.

## 🔮 Future Enhancements

Potential features to add:
- [ ] Resume comparison tool
- [ ] Job description matching
- [ ] Export analysis as PDF
- [ ] Save analysis history (in browser localStorage)
- [ ] Multiple language support
- [ ] Resume templates
- [ ] Real-time editing suggestions
- [ ] Better PDF text extraction
- [ ] Cover letter analysis
- [ ] LinkedIn profile optimization

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ using Next.js, TypeScript, and Claude AI**
