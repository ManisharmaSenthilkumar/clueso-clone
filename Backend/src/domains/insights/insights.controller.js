import { getAIProvider } from "../../integrations/ai/ai.service.js";
import { MockAIProvider } from "../../integrations/ai/providers/mock.provider.js";

/**
 * POST: Generate AI insights from feedback
 */
export const generateInsightsFromFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;
    if (!Array.isArray(feedback)) {
      return res.status(400).json({ message: "Feedback array required" });
    }

    let result;
    try {
      const provider = getAIProvider();
      result = await provider.generateInsights(feedback);
    } catch (err) {
      console.warn("⚠️ Gemini failed, using MockAI");
      result = await new MockAIProvider().generateInsights(feedback);
    }

    res.json({ ...result, generatedAt: new Date() });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate insights" });
  }
};

/**
 * GET: Fetch AI insights
 */
export const getInsights = async (req, res) => {
  console.log("➡️ /api/insights called");

  let result;
  let feedback = []; // ✅ FIX: declared in outer scope

  try {
    const feedbackRecords = await getAllFeedback(req.user.workspaceId);

    if (!feedbackRecords || feedbackRecords.length === 0) {
      return res.json({
        summary: "No feedback available yet",
        sentiment: { positive: 0, neutral: 0, negative: 0 },
        themes: [],
        painPoints: [],
        suggestions: [],
        generatedAt: new Date(),
      });
    }

    // ✅ assign, not declare
    feedback = feedbackRecords.map(
      (f) => `${f.title}. ${f.description}`
    );

    const provider = getAIProvider();
    console.log("🧠 AI Provider:", provider.constructor.name);

    result = await provider.generateInsights(feedback);

  } catch (err) {
    console.warn("⚠️ Gemini quota hit, fallback to MockAI");

    const mock = new MockAIProvider();
    result = await mock.generateInsights(feedback);
  }

  return res.json({
    ...result,
    generatedAt: new Date(),
  });
};