function KeywordMatch({ missingKeywords, keywordMatch, matchedSkills, missingCriticalSkills }) {
  const kw = Math.round(keywordMatch || 0);
  const barColor = kw >= 70 ? "from-green-400 to-green-500" : kw >= 50 ? "from-amber-400 to-amber-500" : "from-red-400 to-red-500";
  const barMsg = kw >= 70 ? "Strong keyword alignment." : kw >= 50 ? "Moderate match — add more role-specific keywords." : "Low match — resume may be filtered before a recruiter sees it.";

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-7">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-lg shrink-0">🔍</div>
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Keyword Analysis</h3>
          <p className="text-xs text-gray-400">ATS keyword compatibility and skill gap detection</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-100 dark:border-gray-600 mb-7">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">ATS Keyword Match</span>
          <span className={`text-sm font-bold ${kw >= 70 ? "text-green-600" : kw >= 50 ? "text-amber-500" : "text-red-500"}`}>{kw}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-2">
          <div className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-700`} style={{ width: `${kw}%` }} />
        </div>
        <p className="text-xs text-gray-400">{barMsg}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "✅ Matched Skills",    items: matchedSkills,         cls: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700" },
          { label: "❌ Missing Keywords",  items: missingKeywords,       cls: "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700" },
          { label: "⚡ Critical Gaps",    items: missingCriticalSkills, cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700" },
        ].map(({ label, items, cls }) => (
          <div key={label}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{label} ({items?.length || 0})</p>
            <div className="flex flex-wrap gap-2">
              {items?.length
                ? items.map((k, i) => <span key={i} className={`text-xs border px-3 py-1.5 rounded-full font-medium ${cls}`}>{k}</span>)
                : <span className="text-xs text-gray-400">None detected</span>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default KeywordMatch;
