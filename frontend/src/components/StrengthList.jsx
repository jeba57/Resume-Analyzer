// ════════ StrengthList.jsx ════════
export function StrengthList({ strengths }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-7">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-lg shrink-0">✅</div>
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Resume Strengths</h3>
          <p className="text-xs text-gray-400">{strengths?.length ? `${strengths.length} strength${strengths.length > 1 ? "s" : ""} identified` : "Identified by AI"}</p>
        </div>
      </div>
      {!strengths?.length
        ? <p className="text-sm text-gray-400 text-center py-6">No strengths detected.</p>
        : <div className="space-y-3">
            {strengths.map((item, i) => (
              <div key={i} className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-700 rounded-xl p-4 flex gap-3 items-start">
                <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
      }
    </div>
  );
}
export default StrengthList;
