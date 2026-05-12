import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* HERO SECTION */}
       <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-sky-400 rounded-[32px] p-10 md:p-14 text-white shadow-xl mb-12 border border-blue-200">

          <p className="uppercase tracking-widest text-blue-100 text-sm mb-4">
            AI Resume Dashboard
          </p>

          <h1 className="text-5xl font-bold mb-5">
            Welcome back, Jeba 👋
          </h1>

          <p className="text-xl text-blue-100 max-w-3xl leading-9">
            Track your resume performance,
            ATS scores, keyword optimization,
            and AI-powered insights in one place.
          </p>

        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-4 gap-6 mb-14">

          <div className="bg-white rounded-3xl p-7 shadow border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition duration-300">

            <p className="text-gray-500 mb-3">
              Total Uploads
            </p>

            <h2 className="text-4xl font-bold text-gray-900">
              12
            </h2>

          </div>

          <div className="bg-white rounded-3xl p-7 shadow border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition duration-300">

            <p className="text-gray-500 mb-3">
              Best ATS Score
            </p>

            <h2 className="text-4xl font-bold text-green-600">
              8.9
            </h2>

          </div>

          <div className="bg-white rounded-3xl p-7 shadow border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition duration-300">

            <p className="text-gray-500 mb-3">
              AI Suggestions
            </p>

            <h2 className="text-4xl font-bold text-blue-600">
              46
            </h2>

          </div>

          <div className="bg-white rounded-3xl p-7 shadow border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition duration-300">

            <p className="text-gray-500 mb-3">
              Resume Health
            </p>

            <h2 className="text-4xl font-bold text-yellow-500">
              Strong
            </h2>

          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-[32px] p-8 shadow border border-gray-100 mb-14">

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Quick Actions
              </h2>

              <p className="text-gray-500 text-lg">
                Upload resumes and track ATS performance instantly.
              </p>
            </div>

            <div className="flex gap-5">

              <Link
                to="/upload"
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-medium hover:bg-blue-700 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Upload Resume
              </Link>

              <Link
                to="/history"
                className="bg-gray-100 text-gray-800 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                View History
              </Link>

            </div>

          </div>

        </div>

        {/* RECENT ANALYSIS */}
        <div className="mb-14">

          <div className="flex items-center justify-between mb-8">

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Recent Analysis
              </h2>

              <p className="text-gray-500 text-lg">
                Recently analyzed resumes and ATS reports
              </p>
            </div>

          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* CARD 1 */}
            <div className="bg-white rounded-[32px] p-8 shadow border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition duration-300">

              <div className="flex items-center justify-between mb-6">

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                  📄
                </div>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium">
                  8.5
                </span>

              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Frontend Resume
              </h3>

              <p className="text-gray-500 leading-8 mb-6">
                Missing Skills: AWS, Docker,
                CI/CD pipelines.
              </p>

              <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-2xl hover:bg-gray-200 transition duration-300">
                View Report
              </button>

            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-[32px] p-8 shadow border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition duration-300">

              <div className="flex items-center justify-between mb-6">

                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
                  🚀
                </div>

                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-medium">
                  7.8
                </span>

              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Backend Resume
              </h3>

              <p className="text-gray-500 leading-8 mb-6">
                Missing Skills: Kubernetes,
                Cloud deployment.
              </p>

              <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-2xl hover:bg-gray-200 transition duration-300">
                View Report
              </button>

            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-[32px] p-8 shadow border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition duration-300">

              <div className="flex items-center justify-between mb-6">

                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl">
                  🤖
                </div>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium">
                  9.1
                </span>

              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Full Stack Resume
              </h3>

              <p className="text-gray-500 leading-8 mb-6">
                Excellent ATS optimization and keyword usage.
              </p>

              <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-2xl hover:bg-gray-200 transition duration-300">
                View Report
              </button>

            </div>

          </div>

        </div>

        {/* ATS INSIGHTS */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">

          <div className="bg-white rounded-[32px] p-8 shadow border border-gray-100">

            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Resume Insights
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between bg-green-50 p-5 rounded-2xl">
                <span className="text-gray-700 font-medium">
                  ATS Compatibility
                </span>

                <span className="text-green-600 font-bold">
                  Excellent
                </span>
              </div>

              <div className="flex items-center justify-between bg-yellow-50 p-5 rounded-2xl">
                <span className="text-gray-700 font-medium">
                  Missing Cloud Skills
                </span>

                <span className="text-yellow-600 font-bold">
                  Moderate
                </span>
              </div>

              <div className="flex items-center justify-between bg-blue-50 p-5 rounded-2xl">
                <span className="text-gray-700 font-medium">
                  Keyword Optimization
                </span>

                <span className="text-blue-600 font-bold">
                  Strong
                </span>
              </div>

            </div>

          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-[32px] p-10 text-white shadow-2xl">

            <p className="uppercase tracking-widest text-blue-100 text-sm mb-4">
              AI Resume Intelligence
            </p>

            <h2 className="text-4xl font-bold mb-6">
              Improve Your ATS Score Faster 🚀
            </h2>

            <p className="text-blue-100 text-lg leading-9 mb-8">
              Get AI-powered recommendations,
              recruiter-friendly improvements,
              and keyword optimization instantly.
            </p>

            <Link
              to="/upload"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Analyze New Resume
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;