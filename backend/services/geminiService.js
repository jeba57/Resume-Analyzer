import axios from "axios";

const analyzeResumeWithAI = async (
  resumeText
) => {
  const shortenedText = resumeText.slice(0, 4000);

  const prompt = `
Analyze this resume.

Give:
1. ATS Score
2. Missing Skills
3. Strengths
4. Weaknesses
5. Suggestions

Resume:
${shortenedText}
`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.error?.message ||
        "Groq API Error"
    );
  }
};

export default analyzeResumeWithAI;