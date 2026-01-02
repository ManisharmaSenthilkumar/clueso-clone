import OpenAI from "openai";
import { AIProvider } from "../ai.interface.js";

export class OpenAIProvider extends AIProvider {
  constructor() {
    super();
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateInsights(feedback) {
    const prompt = `
You are a product analyst AI.

Analyze the following user feedback and return ONLY valid JSON with:
- summary (string)
- sentiment (object with positive, neutral, negative percentages)
- themes (array of { label, count })
- painPoints (array of strings)
- suggestions (array of strings)

Feedback:
${feedback.map((f, i) => `${i + 1}. ${f}`).join("\n")}
`;

    const response = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    return JSON.parse(response.choices[0].message.content);
  }
}
