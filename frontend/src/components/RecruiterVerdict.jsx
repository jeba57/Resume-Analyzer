import { FaUserTie } from "react-icons/fa";

function RecruiterVerdict({
  recruiterVerdict,
}) {

  return (

    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow hover:shadow-xl transition duration-300">

      <div className="flex items-center gap-4 mb-6">

        <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">

          <FaUserTie className="text-purple-600 text-2xl" />

        </div>

        <div>

          <h3 className="text-2xl font-bold text-gray-900">

            Recruiter Verdict

          </h3>

          <p className="text-gray-500 text-sm">

            Final recruiter-focused resume evaluation

          </p>

        </div>

      </div>

      <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6">

        <p className="text-gray-700 leading-8 text-lg">

          {recruiterVerdict}

        </p>

      </div>

    </div>
  );
}

export default RecruiterVerdict;