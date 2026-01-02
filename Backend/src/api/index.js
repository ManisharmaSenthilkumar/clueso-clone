import authRoutes from "../domains/auth/auth.routes.js";
import feedbackRoutes from "../domains/feedback/feedback.routes.js";
import insightsRoutes from "../domains/insights/insights.routes.js";


export const registerRoutes = (app) => {
  app.use("/auth", authRoutes);
  app.use("/feedback", feedbackRoutes);
  app.use("/api/insights", insightsRoutes);
};
