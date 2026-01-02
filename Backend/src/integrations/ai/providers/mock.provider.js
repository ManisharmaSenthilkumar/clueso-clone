export class MockAIProvider {
  async generateInsights(feedback) {
    return {
      summary: "Users love the UI but struggle with onboarding clarity.",

      sentiment: {
        positive: 62,
        neutral: 21,
        negative: 17,
      },

      themes: [
        { label: "UI Design", count: 18 },
        { label: "Performance", count: 12 },
        { label: "Onboarding", count: 9 },
      ],

      painPoints: [
        "Signup flow is confusing",
        "No tutorial for first-time users",
        "Slow loading on mobile",
      ],

      suggestions: [
        "Add a 3-step onboarding guide",
        "Improve mobile load performance",
        "Clarify CTA labels on signup page",
      ],
    };
  }
}
