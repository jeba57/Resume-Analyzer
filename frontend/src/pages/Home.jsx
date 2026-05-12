import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>
          <p className="text-blue-500 font-semibold mb-4">
            AI Powered Resume Analysis
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Improve Your Resume With AI
          </h1>

          <p className="text-gray-600 text-lg leading-8 mb-8">
            Upload your resume and get ATS
            score analysis, missing keywords,
            strengths, weaknesses, and recruiter-friendly suggestions instantly.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/upload"
              className="bg-blue-500 text-white px-8 py-4 rounded-2xl hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Analyze Resume
            </Link>

            <Link
              to="/register"
              className="bg-white border border-gray-300 px-8 py-4 rounded-2xl hover:bg-gray-100 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition duration-300">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              ATS Analysis
            </h2>

            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl font-semibold">
              8.5/10
            </span>
          </div>

          <div className="space-y-4">

            <div className="bg-blue-50 p-4 rounded-2xl">
              <h3 className="font-semibold text-blue-600 mb-2">
                Strengths
              </h3>

              <p className="text-gray-600 text-sm">
                Strong MERN stack skills,
                authentication, REST APIs,
                MongoDB integration.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-2xl">
              <h3 className="font-semibold text-yellow-600 mb-2">
                Missing Skills
              </h3>

              <p className="text-gray-600 text-sm">
                AWS, Docker, Kubernetes,
                CI/CD pipelines.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-2xl">
              <h3 className="font-semibold text-green-600 mb-2">
                Suggestions
              </h3>

              <p className="text-gray-600 text-sm">
                Add cloud deployment
                projects and DevOps tools.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful AI Features
          </h2>

          <p className="text-gray-600 text-lg">
            Everything you need to improve your resume.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-3xl shadow hover:-translate-y-2 hover:shadow-2xl transition duration-300">
            <div className="text-5xl mb-4">
              🤖
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              AI Analysis
            </h3>

            <p className="text-gray-600 leading-7">
              Analyze resumes using AI-powered ATS scoring and smart recommendations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow hover:-translate-y-2 hover:shadow-2xl transition duration-300">
            <div className="text-5xl mb-4">
              📄
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Resume Parsing
            </h3>

            <p className="text-gray-600 leading-7">
              Extract resume content automatically using PDF parsing technology.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow hover:-translate-y-2 hover:shadow-2xl transition duration-300">
            <div className="text-5xl mb-4">
              📊
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              ATS Score
            </h3>

            <p className="text-gray-600 leading-7">
              Get recruiter-friendly ATS score and missing keyword suggestions.
            </p>
          </div>

        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>

            <p className="text-gray-600 text-lg">
              Simple 3-step workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>
              <div className="w-20 h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                1
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                Upload Resume
              </h3>

              <p className="text-gray-600">
                Upload your resume securely in PDF format.
              </p>
            </div>

            <div>
              <div className="w-20 h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                2
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                AI Processing
              </h3>

              <p className="text-gray-600">
                Our AI analyzes ATS compatibility and resume quality.
              </p>
            </div>

            <div>
              <div className="w-20 h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                3
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                Get Insights
              </h3>

              <p className="text-gray-600">
                Receive scores, missing keywords, and improvements instantly.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <div className="py-24 px-6">

        <div className="max-w-4xl mx-auto bg-blue-500 rounded-3xl p-12 text-center text-white shadow-2xl">

          <h2 className="text-4xl font-bold mb-6">
            Ready To Improve Your Resume?
          </h2>

          <p className="text-lg mb-8 text-blue-100">
            Start analyzing your resume with AI today.
          </p>

          <Link
            to="/upload"
            className="bg-white text-blue-500 px-8 py-4 rounded-2xl font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 inline-block"
          >
            Analyze Now
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;