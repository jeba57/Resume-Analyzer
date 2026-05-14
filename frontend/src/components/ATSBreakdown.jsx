import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

function ATSBreakdown({
  atsScore,
  keywordMatch,
}) {

  const data = [
    {
      subject: "ATS",
      value: atsScore,
    },
    {
      subject: "Keywords",
      value: keywordMatch,
    },
    {
      subject: "Formatting",
      value: 78,
    },
    {
      subject: "Readability",
      value: 82,
    },
    {
      subject: "Projects",
      value: 88,
    },
  ];

  return (

    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow hover:shadow-xl transition duration-300">

      <h2 className="text-3xl font-bold text-gray-900 mb-8">

        ATS Breakdown Analysis

      </h2>

      <div
        className="w-full h-[400px]">
        
        <ResponsiveContainer
  width="99%"
  height={400}
>

          <RadarChart
            outerRadius={140}
            data={data}
          >

            <PolarGrid />

            <PolarAngleAxis
              dataKey="subject"
            />

            <Radar
              dataKey="value"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.5}
            />

          </RadarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ATSBreakdown;