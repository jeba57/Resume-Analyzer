import { useLocation, useNavigate } from "react-router-dom";

function ScoreRing({ score, size = 120, stroke = 10, color }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(score, 100) / 100) * circ;
  const ringColor = color || (score >= 70 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626");
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={ringColor} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
}

function ScoreCard({ title, score, color }) {
  const numScore = Math.round(score || 0);
  const textColor = color || (numScore >= 70 ? "text-green-600" : numScore >= 50 ? "text-amber-500" : "text-red-500");
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center shadow-sm">
      <div className="relative flex items-center justify-center mb-3">
        <ScoreRing score={numScore} size={88} stroke={8} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xl font-bold ${textColor}`}>{numScore}%</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 text-center font-medium">{title}</p>
    </div>
  );
}

function Pill({ text, type }) {
  const styles = {
    green: "bg-green-50 text-green-700 border border-green-200",
    red: "bg-red-50 text-red-600 border border-red-200",
    amber: "bg-amber-50 text-amber-700 border border-amber-200",
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${styles[type] || styles.green}`}>
      {text}
    </span>
  );
}

function Section({ title, icon, children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-7 ${className}`}>
      <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
        <span className="text-lg">{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}

function BarRow({ label, value }) {
  const v = Math.round(value || 0);
  const color = v >= 70 ? "bg-green-500" : v >= 50 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-sm text-gray-500 w-40 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-2 rounded-full ${color} transition-all duration-700`} style={{ width: `${v}%` }} />
      </div>
      <span className="text-sm font-semibold text-gray-700 w-9 text-right">{v}%</span>
    </div>
  );
}

function ATSResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis;

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">No analysis data found.</p>
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
        >
          Upload a Resume
        </button>
      </div>
    );
  }

  const score = Math.round(analysis.atsScore || 0);
  const confidence = Math.round(analysis.recruiterConfidence || 0);
  const confLabel = confidence >= 70 ? "High" : confidence >= 45 ? "Moderate" : "Low";
  const confColor = confidence >= 70 ? "bg-green-50 text-green-700 border-green-200" : confidence >= 45 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-600 border-red-200";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* TOP HEADER */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ATS Analysis Report</h1>
            <p className="text-sm text-gray-500 mt-1">Recruiter-grade intelligence · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
          </div>
          <button
            onClick={() => navigate("/upload")}
            className="text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            ← Analyze Another
          </button>
        </div>

        {/* HERO SCORE CARD */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col md:flex-row items-center gap-8">
          <div className="relative flex items-center justify-center shrink-0">
            <ScoreRing score={score} size={130} stroke={11} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${score >= 70 ? "text-green-600" : score >= 50 ? "text-amber-500" : "text-red-500"}`}>{score}%</span>
              <span className="text-xs text-gray-400">ATS Score</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xl font-semibold text-gray-900">{analysis.scoreTitle || "Resume Analysis Complete"}</h2>
              <span className={`text-xs font-medium px-3 py-1 rounded-full border ${confColor}`}>
                {confLabel} Recruiter Confidence
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{analysis.recruiterVerdict}</p>
          </div>
        </div>

        {/* 4 SUB SCORES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ScoreCard title="Keyword Match" score={analysis.keywordMatch} />
          <ScoreCard title="Formatting" score={analysis.formattingScore} />
          <ScoreCard title="Readability" score={analysis.readabilityScore} />
          <ScoreCard title="Technical Depth" score={analysis.technicalScore} />
        </div>

        {/* BAR BREAKDOWN */}
        <Section title="Score Breakdown" icon="📊">
          <BarRow label="Overall ATS Score" value={analysis.atsScore} />
          <BarRow label="Keyword Match" value={analysis.keywordMatch} />
          <BarRow label="Formatting Quality" value={analysis.formattingScore} />
          <BarRow label="Readability" value={analysis.readabilityScore} />
          <BarRow label="Technical Depth" value={analysis.technicalScore} />
          <BarRow label="Recruiter Confidence" value={analysis.recruiterConfidence} />
        </Section>

        {/* STRENGTHS + WEAKNESSES */}
        <div className="grid md:grid-cols-2 gap-4">
          <Section title="What's Helping Your Score" icon="✅">
            <ul className="space-y-2">
              {(analysis.strengths || []).map((s, i) => (
                <li key={i} className="flex gap-2 items-start text-sm text-gray-700 bg-green-50 rounded-xl px-4 py-3 border border-green-100">
                  <span className="text-green-500 mt-0.5">✓</span> {s}
                </li>
              ))}
            </ul>
          </Section>
          <Section title="What's Hurting Your Score" icon="⚠️">
            <ul className="space-y-2">
              {(analysis.weaknesses || []).map((w, i) => (
                <li key={i} className="flex gap-2 items-start text-sm text-gray-700 bg-red-50 rounded-xl px-4 py-3 border border-red-100">
                  <span className="text-red-400 mt-0.5">✗</span> {w}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* KEYWORD ANALYSIS */}
        <Section title="Keyword Analysis" icon="🔍">
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Matched Keywords</p>
              <div className="flex flex-wrap gap-2">
                {(analysis.matchedSkills || []).map((k, i) => <Pill key={i} text={k} type="green" />)}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Missing Keywords</p>
              <div className="flex flex-wrap gap-2">
                {(analysis.missingKeywords || []).map((k, i) => <Pill key={i} text={k} type="red" />)}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Missing Critical Skills</p>
              <div className="flex flex-wrap gap-2">
                {(analysis.missingCriticalSkills || []).map((k, i) => <Pill key={i} text={k} type="amber" />)}
              </div>
            </div>
          </div>
        </Section>

        {/* FORMATTING RISKS */}
        <Section title="ATS Formatting Risks" icon="🖥️">
          <ul className="space-y-2">
            {(analysis.formattingIssues || []).map((f, i) => (
              <li key={i} className="flex gap-2 items-start text-sm text-amber-800 bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
                <span className="mt-0.5">⚡</span> {f}
              </li>
            ))}
          </ul>
        </Section>

        {/* IMPROVED BULLET POINTS */}
        <Section title="AI-Optimized Bullet Points" icon="✏️">
          <p className="text-xs text-gray-400 mb-4">Rewritten with stronger action verbs, quantified impact, and ATS-friendly language.</p>
          <div className="space-y-4">
            {(analysis.improvedBulletPoints || []).map((b, i) => {
              const isObj = typeof b === "object" && b !== null;
              return (
                <div key={i} className="rounded-xl border border-gray-100 overflow-hidden">
                  {isObj ? (
                    <>
                      <div className="bg-red-50 px-4 py-3 text-sm text-gray-400 line-through border-b border-gray-100">{b.original}</div>
                      <div className="bg-green-50 px-4 py-3 text-sm text-gray-800 font-medium border-b border-gray-100">{b.improved}</div>
                      <div className="bg-blue-50 px-4 py-2 text-xs text-blue-600">💡 {b.reason}</div>
                    </>
                  ) : (
                    <div className="bg-green-50 px-4 py-3 text-sm text-gray-800">{b}</div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* SUGGESTIONS */}
        <Section title="Improvement Recommendations" icon="💡">
          <ul className="space-y-3">
            {(analysis.suggestions || []).map((s, i) => (
              <li key={i} className="flex gap-3 items-start text-sm text-gray-700 bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
                <span className="font-bold text-blue-500 shrink-0">{i + 1}.</span> {s}
              </li>
            ))}
          </ul>
        </Section>

        {/* RECRUITER VERDICT */}
        <Section title="Recruiter Simulation" icon="👤">
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Senior Recruiter Assessment</p>
            <p className="text-sm text-gray-700 leading-relaxed">{analysis.recruiterVerdict}</p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
              <span className={`text-xs font-medium px-3 py-1 rounded-full border ${confColor}`}>
                Recruiter Confidence: {confLabel} ({confidence}%)
              </span>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Ready to improve further?</h3>
          <p className="text-blue-100 text-sm mb-5">Apply the suggestions above and re-analyze your resume to track your score improvement.</p>
          <button
            onClick={() => navigate("/upload")}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl text-sm hover:scale-105 hover:shadow-lg transition-all"
          >
            Analyze Another Resume
          </button>
        </div>

      </div>
    </div>
  );
}

export default ATSResult;
