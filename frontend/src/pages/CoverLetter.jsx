import { useLocation, useNavigate } from "react-router-dom";
import ATSScoreCard    from "../components/ATSScoreCard";
import ATSBreakdown    from "../components/ATSBreakdown";
import StrengthList    from "../components/StrengthList";
import WeaknessList    from "../components/WeaknessList";
import KeywordMatch    from "../components/KeywordMatch";
import SuggestionPanel from "../components/SuggestionPanel";
import RecruiterVerdict from "../components/RecruiterVerdict";

function ATSResult() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const analysis   = state?.analysis;

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center gap-5 px-4">
        <div className="text-6xl">📄</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No analysis found</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm text-sm">
          Please upload a resume first to generate your ATS report.
        </p>
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Upload Resume
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ATS Analysis Report</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">AI-powered recruiter-grade resume intelligence</p>
          </div>
          <button
            onClick={() => navigate("/upload")}
            className="text-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition shrink-0"
          >
            ← Analyze Another
          </button>
        </div>

        {/* 1 — HERO SCORE */}
        <ATSScoreCard
          atsScore={analysis.atsScore}
          keywordMatch={analysis.keywordMatch}
          recruiterConfidence={analysis.recruiterConfidence}
          strengthsCount={analysis.strengths?.length || 0}
          missingCount={analysis.missingKeywords?.length || 0}
          scoreTitle={analysis.scoreTitle}
        />

        {/* 2 — BREAKDOWN */}
        <ATSBreakdown
          atsScore={analysis.atsScore}
          keywordMatch={analysis.keywordMatch}
          formattingScore={analysis.formattingScore}
          readabilityScore={analysis.readabilityScore}
          technicalScore={analysis.technicalScore}
        />

        {/* 3 — STRENGTHS + WEAKNESSES */}
        <div className="grid md:grid-cols-2 gap-6">
          <StrengthList strengths={analysis.strengths || []} />
          <WeaknessList weaknesses={analysis.weaknesses || []} />
        </div>

        {/* 4 — KEYWORDS */}
        <KeywordMatch
          keywordMatch={analysis.keywordMatch}
          missingKeywords={analysis.missingKeywords || []}
          matchedSkills={analysis.matchedSkills || []}
          missingCriticalSkills={analysis.missingCriticalSkills || []}
        />

        {/* 5 — SUGGESTIONS + BULLETS */}
        <SuggestionPanel
          suggestions={analysis.suggestions || []}
          improvedBulletPoints={analysis.improvedBulletPoints || []}
          formattingIssues={analysis.formattingIssues || []}
        />

        {/* 6 — RECRUITER */}
        <RecruiterVerdict
          verdict={analysis.recruiterVerdict}
          recruiterConfidence={analysis.recruiterConfidence}
        />

        {/* CTA */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Apply the improvements above</h3>
          <p className="text-blue-100 text-sm mb-5">
            Update your resume with the AI suggestions, then re-analyze to track your score improvement.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate("/upload")}
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl text-sm hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Analyze Another Resume
            </button>
            <button
              onClick={() => navigate("/cover-letter", { state: { analysis } })}
              className="border border-white text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              Generate Cover Letter →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ATSResult;
