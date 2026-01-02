import { useState } from "react";
import api from "../api/axios";
import logo from "../assets/images/loginlogo.png"; 
import { Eye, EyeOff, Key } from "lucide-react";
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!PASSWORD_REGEX.test(formData.password)) {
    setError(
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
    );
    return;
  }

  setLoading(true);

  try {
    await api.post("/auth/signup", {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });

    alert("Account created successfully. Please login.");
    window.location.href = "/";
  } catch (err) {
    setError(err.response?.data?.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
       <img
          src={logo}   // 👈 your imported image
          alt="Clueso logo"
          className="w-20 h-20 object-contain"
        />

      <h1 className="text-2xl font-semibold mb-6">Create an account</h1>

      <div className="w-full max-w-md bg-white rounded-xl shadow-md border p-8">
        {/* Social Buttons */}
        <div className="space-y-3 mb-6">
          <button className="w-full h-12 border rounded-lg text-sm hover:bg-gray-50">
            Sign up with Google
          </button>
          <button className="w-full h-12 border rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-gray-50">
            <Key className="w-4 h-4" />
            Sign up with SSO
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="h-11 w-full px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="h-11 w-full px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="h-11 w-full px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="h-11 w-full px-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
             

              <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>

  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up with email"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-sm">
        Already have an account?{" "}
        <a href="/" className="text-pink-500 font-medium hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};

export default SignUp;
