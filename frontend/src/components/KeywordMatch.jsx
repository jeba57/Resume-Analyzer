import { FaTags } from "react-icons/fa";

function KeywordMatch({
  missingKeywords,
  keywordMatch,
}) {

  return (

    <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow hover:shadow-xl transition duration-300">

      <div className="flex items-center gap-4 mb-6">

        <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">

          <FaTags className="text-yellow-500 text-2xl" />

        </div>

        <div>

          <h3 className="text-2xl font-bold text-gray-900">

            Keyword Match Analysis

          </h3>

          <p className="text-gray-500 text-sm">

            ATS keyword compatibility and missing technologies

          </p>

        </div>

      </div>

      {/* MATCH BAR */}
      <div className="mb-8">

        <div className="flex justify-between mb-2">

          <span className="text-gray-700 font-medium">

            ATS Keyword Match

          </span>

          <span className="font-bold text-blue-600">

            {keywordMatch}%

          </span>

        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-700"
            style={{
              width: `${keywordMatch}%`,
            }}
          />

        </div>

      </div>

      {/* MISSING KEYWORDS */}
      <div>

        <h4 className="text-lg font-semibold text-gray-900 mb-4">

          Missing Keywords

        </h4>

        <div className="flex flex-wrap gap-3">

          {missingKeywords.map(
            (item, index) => (

              <div
                key={index}
                className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-full font-medium hover:scale-105 transition"
              >

                {item}

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default KeywordMatch;