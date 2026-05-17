// ════════════════════════════════════════════
// src/components/ATSScoreCard.jsx
// ════════════════════════════════════════════
function ScoreRing({ score }) {
  const s = Math.min(Math.round(score || 0), 100);
  const r = 54, circ = 2 * Math.PI * r;
  const offset = circ - (s / 100) * circ;
  const color = s >= 70 ? "#16a34a" : s >= 50 ? "#d97706" : "#dc2626";
  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      <svg width="176" height="176" style={{ transform: "rotate(-90deg)", position: "absolute" }}>
        <circle cx="88" cy="88" r={r} fill="none" stroke="#f3f4f6" strokeWidth="10" />
        <circle cx="88" cy="88" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div className="flex flex-col items-center justify-center z-10">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">{s}</span>
        <span className="text-gray-400 text-sm mt-0.5">ATS Score</span>
      </div>
    </div>
  );
}

export function ATSScoreCard({ atsScore, keywordMatch, recruiterConfidence, strengthsCount, missingCount, scoreTitle }) {
  const conf = Math.round(recruiterConfidence || 0);
  const confLabel = conf >= 70 ? "High Confidence" : conf >= 45 ? "Moderate Confidence" : "Low Confidence";
  const confStyle = conf >= 70 ? "bg-green-50 border-green-200 text-green-700" : conf >= 45 ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-red-50 border-red-200 text-red-600";
  const stats = [
    { label: "Keyword Match",        value: `${Math.round(keywordMatch || 0)}%`, color: "text-blue-600",  bg: "bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-700" },
    { label: "Strengths Found",      value: strengthsCount,                      color: "text-green-600", bg: "bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-700" },
    { label: "Missing Keywords",     value: missingCount,                        color: "text-red-500",   bg: "bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-700" },
    { label: "Recruiter Confidence", value: `${conf}%`,
      color: conf >= 70 ? "text-green-600" : conf >= 45 ? "text-amber-500" : "text-red-500",
      bg: conf >= 70 ? "bg-green-50 border-green-100" : conf >= 45 ? "bg-amber-50 border-amber-100" : "bg-red-50 border-red-100" },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-8">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex flex-col items-center gap-3 shrink-0">
          <ScoreRing score={atsScore} />
          {scoreTitle && <p className="text-sm text-gray-500 dark:text-gray-400 text-center font-medium max-w-[170px] leading-snug">{scoreTitle}</p>}
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${confStyle}`}>{confLabel}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 flex-1 w-full">
          {stats.map((s) => (
            <div key={s.label} className={`${s.bg} border rounded-2xl p-5 text-center`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ATSScoreCard;
