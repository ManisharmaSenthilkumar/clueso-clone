import { useState } from "react";
import api from "../api/axios";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/images/loginlogo.png"; // adjust path if needed



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔥 LOGIN SUBMIT CLICKED");


    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ ADD THIS
      window.location.href = "/dashboard";

    } catch (err) {
      console.log("LOGIN ERROR FULL:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);

      if (err.response?.status === 404) {
        setError("No account found with this email.");
      } else if (err.response?.status === 401) {
        setError("Wrong password. Please enter the correct password.");
      } else {
        setError("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
    
        <img
    src={logo}   // 👈 your imported image
    alt="Clueso logo"
    className="w-20 h-20 object-contain"
  />
      

      {/* Heading */}
      <h1 className="text-[24px] font-semibold text-[#1a1a1a] mb-6">
        Log in to Clueso
      </h1>

      {/* Card */}
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-sm border border-[#e5e5e5] p-8">
        {/* Google Button (UI only) */}
        <button
          type="button"
          className="w-full h-[44px] bg-white border border-[#e0e0e0] rounded-lg flex items-center justify-center gap-3 text-[14px] font-medium text-[#333] hover:bg-[#fafafa] transition-colors mb-3"
        >
          Sign in with Google
        </button>

        {/* SSO Button (UI only) */}
        <button
          type="button"
          className="w-full h-[44px] bg-white border border-[#e0e0e0] rounded-lg flex items-center justify-center gap-3 text-[14px] font-medium text-[#333] hover:bg-[#fafafa] transition-colors"
        >
          Sign in with SSO
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[#e5e5e5]" />
          <span className="text-[13px] text-[#999] font-medium">OR</span>
          <div className="flex-1 h-px bg-[#e5e5e5]" />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-[14px] font-medium text-[#333] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-[44px] px-3 border border-[#e0e0e0] rounded-lg text-[14px] text-[#333] outline-none focus:border-[#e056a0] focus:ring-2 focus:ring-[#e056a0]/20 transition-all"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[14px] font-medium text-[#333]">
                Password
              </label>
              <a
                href="#"
                className="text-[13px] text-[#d45094] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-[44px] px-3 pr-10 border border-[#e0e0e0] rounded-lg text-[14px] text-[#333] outline-none focus:border-[#e056a0] focus:ring-2 focus:ring-[#e056a0]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#666]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>


            </div>
            {error && (
              <p className="text-red-500 text-xs mt-1">
                {error}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[44px] bg-[#d45094] hover:bg-[#c44888] text-white text-[14px] font-medium rounded-lg transition-colors disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in with email"}
          </button>
        </form>
      </div>

      {/* Sign up */}
      <p className="mt-6 text-[14px] text-[#666]">
        Don&apos;t have an account?{" "}
        <a
          href="/signup"
          className="text-[#d45094] hover:underline font-medium"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
