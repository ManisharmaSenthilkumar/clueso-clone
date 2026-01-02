import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

// ✅ REQUEST INTERCEPTOR (attach token)
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ RESPONSE INTERCEPTOR (auto logout on 401)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // 🔕 TEMP: DO NOT FORCE LOGOUT
    return Promise.reject(err);
  }
);




export default api;
