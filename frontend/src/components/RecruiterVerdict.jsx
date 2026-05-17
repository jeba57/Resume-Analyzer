function RecruiterVerdict({ verdict, recruiterConfidence }) {
  const conf = Math.round(recruiterConfidence || 0);
  const confLabel = conf >= 70 ? "High" : conf >= 45 ? "Moderate" : "Low";
  const confStyle =
    conf >= 70 ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-400" :
    conf >= 45 ? "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-400" :
                 "bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400";

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-7">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-lg shrink-0">👤</div>
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Recruiter Simulation</h3>
          <p className="text-xs text-gray-400">Senior recruiter assessment of your resume</p>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recruiter Verdict</p>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${confStyle}`}>
            {confLabel} Confidence · {conf}%
          </span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {verdict || "No recruiter verdict generated."}
        </p>
      </div>
    </div>
  );
}
export default RecruiterVerdict;
