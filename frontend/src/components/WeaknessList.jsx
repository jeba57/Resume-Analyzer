import { FaExclamationTriangle } from "react-icons/fa";

function WeaknessList({
  weaknesses,
}) {

  return (

    <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow hover:shadow-xl transition duration-300">

      <div className="flex items-center gap-4 mb-6">

        <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

          <FaExclamationTriangle className="text-red-500 text-2xl" />

        </div>

        <div>

          <h3 className="text-2xl font-bold text-gray-900">

            Resume Weaknesses

          </h3>

          <p className="text-gray-500 text-sm">

            Critical ATS and recruiter concerns detected by AI

          </p>

        </div>

      </div>

      <div className="space-y-4">

        {weaknesses.map(
          (item, index) => (

            <div
              key={index}
              className="bg-red-50 border border-red-100 rounded-2xl p-4 hover:scale-[1.01] transition"
            >

              <div className="flex gap-3 items-start">

                <FaExclamationTriangle className="text-red-500 mt-1" />

                <p className="text-gray-700 leading-7">

                  {item}

                </p>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default WeaknessList;