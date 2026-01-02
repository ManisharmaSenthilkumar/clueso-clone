import api from "../../api/axios";

// Get all feedback (protected)
export const fetchFeedback = async () => {
  const res = await api.get("/feedback");
  return res.data;
};

// Create feedback (protected)
export const createFeedback = async (data) => {
  const res = await api.post("/feedback", data);
  return res.data;
};
