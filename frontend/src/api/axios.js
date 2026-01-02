import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

// ✅ REQUEST INTERCEPTOR (attach token)
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // ✅ FIXED

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ RESPONSE INTERCEPTOR (auto logout on 401)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isAuthRoute =
      err.config?.url?.includes("/auth/login") ||
      err.config?.url?.includes("/auth/signup");

   if (err.response?.status === 401 && !isAuthRoute) {
  sessionStorage.clear();     // ✅ FIXED
  window.location.href = "/";
}


    return Promise.reject(err);
  }
);





export default api;
