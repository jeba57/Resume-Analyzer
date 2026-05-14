import { FaLightbulb } from "react-icons/fa";

function SuggestionPanel({
  suggestions,
  improvedBulletPoints,
}) {

  return (

    <div className="space-y-6">

      {/* AI SUGGESTIONS */}
      <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow hover:shadow-xl transition duration-300">

        <div className="flex items-center gap-4 mb-6">

          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

            <FaLightbulb className="text-blue-500 text-2xl" />

          </div>

          <div>

            <h3 className="text-2xl font-bold text-gray-900">

              AI Suggestions

            </h3>

            <p className="text-gray-500 text-sm">

              Professional ATS optimization recommendations

            </p>

          </div>

        </div>

        <div className="space-y-4">

          {suggestions.map(
            (item, index) => (

              <div
                key={index}
                className="bg-blue-50 border border-blue-100 rounded-2xl p-4 hover:scale-[1.01] transition"
              >

                <div className="flex gap-3 items-start">

                  <FaLightbulb className="text-blue-500 mt-1" />

                  <p className="text-gray-700 leading-7">

                    {item}

                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* IMPROVED BULLETS */}
      <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow hover:shadow-xl transition duration-300">

        <h3 className="text-2xl font-bold text-gray-900 mb-6">

          AI Improved Bullet Points

        </h3>

        <div className="space-y-4">

          {improvedBulletPoints.map(
            (item, index) => (

              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-4"
              >

                <p className="text-gray-700 leading-7">

                  ✨ {item}

                </p>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default SuggestionPanel;