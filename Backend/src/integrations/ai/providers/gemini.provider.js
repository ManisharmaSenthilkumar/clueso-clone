import { AIProvider } from "../ai.interface.js";

const MODEL = "models/gemini-2.5-flash"; // ✅ from your ListModels

export class GeminiAIProvider extends AIProvider {
  async generateInsights(feedback) {
    const prompt = `
Return ONLY valid JSON.

{
  "summary": string,
  "sentiment": { "positive": number, "neutral": number, "negative": number },
  "themes": [{ "label": string, "count": number }],
  "painPoints": string[],
  "suggestions": string[]
}

Feedback:
${feedback.map((f, i) => `${i + 1}. ${f}`).join("\n")}
`;
console.log("🔥 GEMINI PROMPT FEEDBACK:", feedback);


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );
console.log("🧠 GEMINI RAW RESULT:", parsedJson);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Empty response from Gemini");

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Invalid JSON from Gemini");

    return JSON.parse(match[0]);
  }
}
