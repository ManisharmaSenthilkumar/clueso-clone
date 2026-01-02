// src/domains/insights/insights.service.js
import { getAIProvider } from "../../integrations/ai/ai.service.js";

export const generateInsightsFromTexts = async (feedbackTexts) => {
  if (!feedbackTexts || !feedbackTexts.length) {
    throw new Error("No feedback provided");
  }

  const provider = getAIProvider();
  return provider.generateInsights(feedbackTexts);
};
