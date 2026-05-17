import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

function BarRow({ label, value }) {
  const v = Math.round(value || 0);
  const color = v >= 70 ? "bg-green-500" : v >= 50 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-sm text-gray-500 dark:text-gray-400 w-36 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-2 rounded-full ${color} transition-all duration-700`} style={{ width: `${v}%` }} />
      </div>
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 w-9 text-right">{v}%</span>
    </div>
  );
}

function ATSBreakdown({ atsScore, keywordMatch, formattingScore, readabilityScore, technicalScore }) {
  const data = [
    { subject: "ATS Score",   value: Math.round(atsScore        || 0) },
    { subject: "Keywords",    value: Math.round(keywordMatch     || 0) },
    { subject: "Formatting",  value: Math.round(formattingScore  || 0) },
    { subject: "Readability", value: Math.round(readabilityScore || 0) },
    { subject: "Technical",   value: Math.round(technicalScore   || 0) },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-7">
      <h2 className="text-base font-bold text-gray-900 dark:text-white mb-6">Score Breakdown</h2>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <BarRow label="Overall ATS Score"  value={atsScore} />
          <BarRow label="Keyword Match"      value={keywordMatch} />
          <BarRow label="Formatting Quality" value={formattingScore} />
          <BarRow label="Readability"        value={readabilityScore} />
          <BarRow label="Technical Depth"    value={technicalScore} />
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={data}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#6b7280" }} />
              <Radar dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} />
              <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "13px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ATSBreakdown;
