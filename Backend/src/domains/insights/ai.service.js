import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateInsights = async (feedbacks) => {
  const prompt = `
Analyze the following user feedback and return JSON with:
- summary
- sentiment (Positive, Negative, Mixed)
- positive points
- negative points
- actionable suggestions

Feedback:
${feedbacks.map(f => `- ${f.message}`).join("\n")}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4
  });

  return JSON.parse(response.choices[0].message.content);
};
