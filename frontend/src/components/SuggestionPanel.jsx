function SuggestionPanel({ suggestions, improvedBulletPoints, formattingIssues }) {
  return (
    <div className="space-y-6">

      {/* FORMATTING RISKS */}
      {formattingIssues?.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-lg shrink-0">🖥️</div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">ATS Formatting Risks</h3>
              <p className="text-xs text-gray-400">{formattingIssues.length} issue{formattingIssues.length > 1 ? "s" : ""} that may prevent ATS from parsing correctly</p>
            </div>
          </div>
          <div className="space-y-3">
            {formattingIssues.map((item, i) => (
              <div key={i} className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-700 rounded-xl p-4 flex gap-3 items-start">
                <span className="text-amber-500 shrink-0 mt-0.5">⚡</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUGGESTIONS */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-7">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-lg shrink-0">💡</div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Improvement Recommendations</h3>
            <p className="text-xs text-gray-400">{suggestions?.length || 0} actionable recommendations</p>
          </div>
        </div>
        {!suggestions?.length
          ? <p className="text-sm text-gray-400 text-center py-4">No suggestions generated.</p>
          : <div className="space-y-3">
              {suggestions.map((item, i) => (
                <div key={i} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-700 rounded-xl p-4 flex gap-3 items-start">
                  <span className="text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-900 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
        }
      </div>

      {/* BULLET REWRITES */}
      {improvedBulletPoints?.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-lg shrink-0">✏️</div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">AI-Optimized Bullet Points</h3>
              <p className="text-xs text-gray-400">Rewritten with stronger action verbs, quantified impact, and ATS keywords</p>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-gray-400 mb-5">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-100 border border-red-200 inline-block" /> Original (weak)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-100 border border-green-200 inline-block" /> Improved (ATS-optimized)</span>
          </div>
          <div className="space-y-4">
            {improvedBulletPoints.map((item, i) => {
              const isObj = typeof item === "object" && item !== null;
              return (
                <div key={i} className="rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                  {isObj ? (
                    <>
                      <div className="bg-red-50 dark:bg-red-900/20 px-4 py-3 flex gap-2 items-start border-b border-gray-100 dark:border-gray-700">
                        <span className="text-red-400 text-xs mt-0.5 shrink-0 font-bold">✗</span>
                        <p className="text-sm text-gray-400 line-through leading-relaxed">{item.original}</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 px-4 py-3 flex gap-2 items-start border-b border-gray-100 dark:border-gray-700">
                        <span className="text-green-500 text-xs mt-0.5 shrink-0 font-bold">✓</span>
                        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed">{item.improved}</p>
                      </div>
                      {item.reason && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2.5 flex gap-2 items-start">
                          <span className="text-blue-400 text-xs mt-0.5 shrink-0">💡</span>
                          <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">{item.reason}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-green-50 dark:bg-green-900/20 px-4 py-3 flex gap-2 items-start">
                      <span className="text-green-500 font-bold text-xs mt-0.5">✓</span>
                      <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{item}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
export default SuggestionPanel;
