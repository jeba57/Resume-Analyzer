function WeaknessList({ weaknesses }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-7">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-lg shrink-0">⚠️</div>
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Resume Weaknesses</h3>
          <p className="text-xs text-gray-400">
            {weaknesses?.length ? `${weaknesses.length} issue${weaknesses.length > 1 ? "s" : ""} — fix these to raise your score` : "Critical ATS and recruiter concerns"}
          </p>
        </div>
      </div>
      {!weaknesses?.length
        ? <p className="text-sm text-gray-400 text-center py-6">No weaknesses detected.</p>
        : <div className="space-y-3">
            {weaknesses.map((item, i) => (
              <div key={i} className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-700 rounded-xl p-4 flex gap-3 items-start">
                <span className="text-xs font-bold text-red-500 bg-red-100 dark:bg-red-900 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
      }
    </div>
  );
}
export default WeaknessList;
