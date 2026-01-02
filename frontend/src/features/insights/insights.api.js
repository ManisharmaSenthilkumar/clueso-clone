import api from "../../api/axios";

export const fetchInsights = async () => {
  const res = await api.get("/api/insights");
  return res.data;
};
