import api from "./axios";

export const createFeedback = (data) => {
  return api.post("/feedback", data);
};

export const fetchFeedback = () => {
  return api.get("/feedback");
};
