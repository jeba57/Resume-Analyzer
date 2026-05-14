function ATSScoreCard({
  atsScore,
  keywordMatch,
  strengthsCount,
  missingCount,
}) {

  return (

    <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 mb-8">

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">

        {/* SCORE */}
        <div className="flex flex-col items-center">

          <div className="relative w-44 h-44 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center shadow-2xl">

            <div className="w-36 h-36 bg-white rounded-full flex flex-col items-center justify-center">

              <h2 className="text-5xl font-bold text-gray-900">
                {atsScore}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                ATS Score
              </p>

            </div>

          </div>

        </div>

        {/* BREAKDOWN */}
        <div className="grid grid-cols-2 gap-5 w-full max-w-lg">

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center hover:shadow-lg transition">

            <p className="text-sm text-gray-500 mb-2">
              Keyword Match
            </p>

            <h3 className="text-3xl font-bold text-blue-600">
              {keywordMatch}%
            </h3>

          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-5 text-center hover:shadow-lg transition">

            <p className="text-sm text-gray-500 mb-2">
              Strengths
            </p>

            <h3 className="text-3xl font-bold text-green-600">
              {strengthsCount}
            </h3>

          </div>

          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5 text-center hover:shadow-lg transition">

            <p className="text-sm text-gray-500 mb-2">
              Missing Skills
            </p>

            <h3 className="text-3xl font-bold text-yellow-600">
              {missingCount}
            </h3>

          </div>

          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 text-center hover:shadow-lg transition">

            <p className="text-sm text-gray-500 mb-2">
              Recruiter Ready
            </p>

            <h3 className="text-2xl font-bold text-purple-600">
              YES
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ATSScoreCard;