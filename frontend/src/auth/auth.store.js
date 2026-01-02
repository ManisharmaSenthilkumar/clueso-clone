export const setAuth = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  sessionStorage.clear();   // ✅ FIXED
  window.location.href = "/";
};