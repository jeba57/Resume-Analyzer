import { Link } from "react-router-dom";

const features = [
  { icon: "🎯", title: "Realistic ATS Scoring", desc: "Score across keyword density, formatting, readability, and technical depth — just like Jobscan and Resume Worded. No inflated numbers." },
  { icon: "🔍", title: "Keyword Gap Analysis",  desc: "See exactly which keywords are matched, which are missing, and which critical skills recruiters are looking for in your target role." },
  { icon: "✏️", title: "AI Bullet Rewrites",   desc: "Weak bullet points are automatically rewritten with stronger action verbs, quantified impact, and ATS-friendly language with before/after comparison." },
  { icon: "👤", title: "Recruiter Simulation",  desc: "Understand whether a senior recruiter would shortlist your resume — and exactly why or why not, in plain language." },
  { icon: "⚠️", title: "Formatting Risk Detection", desc: "Identify tables, columns, and structures that confuse ATS parsers before they silently filter out your application." },
  { icon: "💡", title: "Actionable Improvements", desc: "Every suggestion explains WHY it matters for ATS parsing, recruiter readability, and your chances of landing an interview." },
];

const steps = [
  { step: "01", title: "Upload Resume",  desc: "Upload your PDF resume and optionally paste the job description for precision keyword matching." },
  { step: "02", title: "AI Analysis",    desc: "Our AI analyzes your resume across 6 dimensions with recruiter-grade intelligence in under 30 seconds." },
  { step: "03", title: "Get Your Report", desc: "Receive a full ATS score, keyword gaps, rewritten bullets, and an honest recruiter simulation." },
];

function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-5">
            Powered by Gemini AI
          </span>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-5">
            Get your resume<br />
            <span className="text-blue-600">ATS-ready</span> in minutes
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            Upload your resume and receive a recruiter-grade analysis — ATS score, keyword gaps, formatting risks, and AI-optimized rewrites instantly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/upload"
              className="bg-blue-600 text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 hover:shadow-lg transition-all"
            >
              Analyze My Resume
            </Link>
            <Link
              to="/register"
              className="border border-gray-200 text-gray-700 px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition"
            >
              Create Free Account
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">No credit card required · Results in under 30 seconds</p>
        </div>

        {/* HERO PREVIEW CARD */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">ATS Analysis Report</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Sample output</span>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="relative w-14 h-14 shrink-0">
              <svg width="56" height="56" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="28" cy="28" r="22" fill="none" stroke="#e5e7eb" strokeWidth="5" />
                <circle cx="28" cy="28" r="22" fill="none" stroke="#16a34a" strokeWidth="5"
                  strokeDasharray="138.2" strokeDashoffset="41.5" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-green-600">70%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Good ATS Compatibility</p>
              <p className="text-xs text-gray-500 mt-0.5">Strong MERN foundation — missing cloud & DevOps keywords</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Matched Keywords</p>
            <div className="flex flex-wrap gap-1.5">
              {["React.js", "Node.js", "MongoDB", "REST APIs", "JWT"].map((k) => (
                <span key={k} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">{k}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Missing Keywords</p>
            <div className="flex flex-wrap gap-1.5">
              {["Docker", "AWS", "CI/CD", "Kubernetes"].map((k) => (
                <span key={k} className="text-xs bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-full">{k}</span>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Recruiter note:</strong> Strong MERN profile, but cloud experience gaps may filter this resume for senior roles. Adding an AWS or GCP project would significantly raise the score.
            </p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-gray-50 py-20 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How it works</h2>
            <p className="text-gray-500">Professional ATS intelligence in 3 steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
                <span className="text-3xl font-black text-blue-100">{s.step}</span>
                <h3 className="text-base font-bold text-gray-900 mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything you need</h2>
            <p className="text-gray-500">Recruiter-grade analysis across every dimension of your resume</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-6">
        <div className="max-w-3xl mx-auto bg-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Ready to optimize your resume?</h2>
          <p className="text-blue-100 text-base mb-7">
            Get your ATS score, keyword analysis, and AI-powered improvements in under 30 seconds.
          </p>
          <Link
            to="/upload"
            className="bg-white text-blue-600 px-8 py-3.5 rounded-xl font-semibold text-sm hover:shadow-xl hover:scale-105 transition-all inline-block"
          >
            Analyze My Resume Free
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Home;
