import { FaCheckCircle } from "react-icons/fa";

function StrengthList({
  strengths,
}) {

  return (

    <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow hover:shadow-xl transition duration-300">

      <div className="flex items-center gap-4 mb-6">

        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

          <FaCheckCircle className="text-green-500 text-2xl" />

        </div>

        <div>

          <h3 className="text-2xl font-bold text-gray-900">

            Resume Strengths

          </h3>

          <p className="text-gray-500 text-sm">

            Strong recruiter-friendly sections identified by AI

          </p>

        </div>

      </div>

      <div className="space-y-4">

        {strengths.map(
          (item, index) => (

            <div
              key={index}
              className="bg-green-50 border border-green-100 rounded-2xl p-4 hover:scale-[1.01] transition"
            >

              <div className="flex gap-3 items-start">

                <FaCheckCircle className="text-green-500 mt-1" />

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

export default StrengthList;