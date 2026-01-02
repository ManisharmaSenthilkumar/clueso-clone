import { MockAIProvider } from "./providers/mock.provider.js";
import { GeminiAIProvider } from "./providers/gemini.provider.js";

export const getAIProvider = () => {
  const provider = process.env.AI_PROVIDER || "mock";

  switch (provider) {
    case "gemini":
      return new GeminiAIProvider();

    case "mock":
    default:
      return new MockAIProvider();
  }
};
