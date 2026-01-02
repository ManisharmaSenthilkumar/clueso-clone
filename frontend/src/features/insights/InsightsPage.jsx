import { useEffect, useState } from "react";
import { fetchInsights } from "./insights.api";
import { useNavigate } from "react-router-dom";
import { fetchFeedback } from "../feedback/feedback.api";





import InsightsLoading from "./components/InsightsLoading";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer, // ✅ ADD THIS
} from "recharts";


const mainNavItems = [
  { name: "Home", icon: "home", path: "/dashboard" },
  { name: "All Projects", icon: "folder", path: "/dashboard" },
  { name: "Video Templates", icon: "video", path: "/dashboard" },
  { name: "Auto-update", icon: "sparkles", path: "/dashboard" },
  { name: "Team", icon: "users", path: "/dashboard" },
  { name: "Analytics", icon: "chart", path: "/dashboard" },
  { name: "Feedback", icon: "feedback", path: "/feedback" },
  {
    name: "Feedback insights",
    icon: "insights",
    active: true,
    path: "/insights",
  },
];

const bottomNavItems = [
  { name: "Settings", icon: "settings" },
  { name: "Trash", icon: "trash" },
];

const analysisTypes = [
  {
    id: "summary",
    name: "Summary",
    icon: "document",
    description: "Overall feedback summary with key themes",
  },
  {
    id: "trends",
    name: "Trends",
    icon: "trending",
    description: "Identify patterns and trending topics",
  },
  {
    id: "recommendations",
    name: "Recommendations",
    icon: "lightbulb",
    description: "AI-powered product suggestions",
  },
  {
    id: "sentiment",
    name: "Sentiment",
    icon: "heart",
    description: "Emotional analysis of feedback",
  },
];

export default function Insights() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [insights, setInsights] = useState("");
const [sentimentData, setSentimentData] = useState(null);
const [activeAnalysis, setActiveAnalysis] = useState("summary");
const [isAnalyzing, setIsAnalyzing] = useState(false);
const [activeNav, setActiveNav] = useState("Home");
const [feedbackList, setFeedbackList] = useState([]);
const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

const handleLogoutConfirm = () => {
  sessionStorage.clear();   // ✅ FIXED
  navigate("/");
};
  
 

useEffect(() => {
  const token = sessionStorage.getItem("token");
  const storedUser = sessionStorage.getItem("user");

  if (!token || !storedUser) {
    navigate("/");
    return;
  }

  setUser(JSON.parse(storedUser));
}, []);

useEffect(() => {
  Promise.all([
    fetchInsights(),
    fetchFeedback()
  ])
    .then(([insightsData, feedbackData]) => {
      setData(insightsData);
      setFeedbackList(feedbackData || []);
    })
    .catch(() => setError("Failed to load data"))
    .finally(() => setLoading(false));
}, []);

 const [user, setUser] = useState(null);
 useEffect(() => {
  
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (!token || !storedUser) {
      window.location.href = "/";
      return;
    }

    setUser(JSON.parse(storedUser));
  }, []);
const analyzeWithAI = async (type) => {
  try {
    setIsAnalyzing(true);
    setActiveAnalysis(type);
    setError("");

    const res = await fetchInsights(); // calls /api/insights

    // SUMMARY / TRENDS / RECOMMENDATIONS
    if (type !== "sentiment") {
      setInsights(
        type === "summary"
          ? res.summary
          : type === "trends"
          ? res.themes.map(t => `• ${t.label} (${t.count})`).join("\n")
          : type === "recommendations"
          ? res.suggestions.map(s => `• ${s}`).join("\n")
          : res.summary
      );
      setSentimentData(null);
    }

    // SENTIMENT
    if (type === "sentiment") {
      setInsights("");
      setSentimentData({
        summary: res.summary,
        overall: res.sentiment,
        painPoints: res.painPoints,
        delightFactors: [],
      });
    }
  } catch (e) {
    setError("Failed to analyze insights");
  } finally {
    setIsAnalyzing(false);
  }
};
 useEffect(() => {
  if (location.pathname.includes("/dashboard/feedback")) {
    setActiveNav("Feedback");
  } else if (location.pathname.includes("/dashboard/insights")) {
    setActiveNav("Feedback insights");
  } else {
    setActiveNav("Home");
  }
},  [location.pathname]);

  // 🚪 LOGOUT (BACKEND MERGE)
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
  const navRoutes = {
  Home: "/dashboard",
  "All Projects": "/dashboard",
  "Video Templates": "/dashboard",
  "Auto-update": "/dashboard",
  Team: "/dashboard",
  Analytics: "/dashboard",
  Feedback: "/feedback",
  "Feedback insights": "/insights",
  Settings: "/settings",
  Trash: "/trash",
};


   const navItems = [
    { name: "Home", icon: "home" },
    { name: "All Projects", icon: "folder" },
    { name: "Video Templates", icon: "video" },
    { name: "Auto-update", icon: "sparkles" },
    { name: "Team", icon: "users" },
    { name: "Analytics", icon: "chart" },
        { name: "Feedback", icon: "feedback" },
    { name: "Feedback insights", icon: "insights" },
  ];

  const bottomNavItems = [
    { name: "Settings", icon: "settings" },
    { name: "Trash", icon: "trash" },
  ];
  const firstName = user?.firstName || "User";
  const lastName = user?.lastName || "";
  const email = user?.email || "unknown@email.com";


 useEffect(() => {
  fetchInsights()
    .then((res) => {
      setData(res);

      // 🔑 map backend → Lovable UI
      setInsights(res.summary);
      setSentimentData({
        summary: res.summary,
    overall: res.sentiment,
    themes: res.themes,
    painPoints: res.painPoints,
    suggestions: res.suggestions,
        delightFactors: [],
      });
    })
    .catch(() => setError("Failed to load insights"))
    .finally(() => setLoading(false));
}, []);


    /* ------------------ ICON RENDERER (UNCHANGED) ------------------ */
  const renderIcon = (iconName, className = "w-5 h-5") => {
    switch (iconName) {
      case "home":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case "folder":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        );
      case "video":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case "sparkles":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case "users":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case "chart":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case "feedback":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case "insights":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case "settings":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case "trash":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        );
      case "search":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case "plus":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
      case "crown":
        return (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
          </svg>
        );
      case "chevron":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        );
      case "collapse":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        );
      case "document":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "trending":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "lightbulb":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case "heart":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case "ai":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "refresh":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading) return <InsightsLoading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="h-screen bg-[#0c0c1d] flex overflow-hidden">

      {/* Left Sidebar */}
      <div className="w-[230px] bg-[#0c0c1d] border-r border-[#1e1e3a] flex flex-col sticky top-0 h-screen">
        {/* Logo */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-[#f472b6]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-lg">Clueso</span>
          </div>
          <button className="text-[#64648c] hover:text-white">
            {renderIcon("collapse", "w-4 h-4")}
          </button>
        </div>

        {/* New Video Button */}
        <div className="px-3 mb-4">
          <button className="w-full bg-[#f472b6] hover:bg-[#f472b6]/90 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
            {renderIcon("plus", "w-5 h-5")}
            New video
          </button>
        </div>

        {/* Search */}
        <div className="px-3 mb-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64648c]">
              {renderIcon("search", "w-4 h-4")}
            </div>
            <input
              type="text"
              placeholder="Search ..."
              className="w-full bg-transparent border border-[#1e1e3a] rounded-lg py-2 pl-10 pr-4 text-[#94a3b8] placeholder-[#64648c] focus:outline-none focus:border-[#f472b6]/50 text-sm"
            />
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.name}>
                <button
  onClick={() => navigate(navRoutes[item.name])}
  className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
    location.pathname === navRoutes[item.name]
      ? "text-white bg-[#1e1e3a] border-r-2 border-[#f472b6]"
      : "text-[#94a3b8] hover:text-white hover:bg-[#1e1e3a]/50"
  }`}
>
  {renderIcon(item.icon, "w-5 h-5")}
  {item.name}
</button>

              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 mb-4">
          <ul className="space-y-1">
            {bottomNavItems.map((item) => (
              <li key={item.name}>
                <button
  onClick={() => navigate(navRoutes[item.name] || "/dashboard")}
  className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
    item.active
      ? "text-white bg-[#1e1e3a] border-r-2 border-[#f472b6]"
      : "text-[#94a3b8] hover:text-white hover:bg-[#1e1e3a]/50"
  }`}

                ></button>
              </li>
            ))}
          </ul>
        </div>

        {/* Trial Banner */}
        <div className="mx-3 mb-4 bg-gradient-to-r from-[#1e1e3a] to-[#2a1e3a] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-yellow-400">{renderIcon("crown", "w-4 h-4")}</span>
            <span className="text-white text-sm font-medium">Your trial expires in 4 days</span>
          </div>
          <a href="#" className="text-[#f472b6] text-sm hover:underline">
            Upgrade your plan
          </a>
        </div>
        

        {/* User Profile */}
<div className="p-3 border-t border-[#1e1e3a]">
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#f472b6] flex items-center justify-center text-white text-sm font-medium">
      {firstName.charAt(0).toUpperCase()}
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-white text-sm font-medium truncate">
        {user?.firstName}'s Team
      </p>
      <p className="text-[#64648c] text-xs truncate">
        {user?.email}
      </p>
    </div>
  <button
  onClick={() => setShowLogoutConfirm(true)}
  className="text-[#64648c] hover:text-red-400 text-xs"
>
  Logout
</button>

  </div>
</div>

      </div>
       {/* LOGOUT CONFIRM MODAL */}
            {showLogoutConfirm && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
                <div className="bg-white rounded-xl w-[360px] p-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Confirm Logout
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to log out?
                  </p>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowLogoutConfirm(false)}
                      className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleLogoutConfirm}
                      className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

         {/* Main Content */}
       <div className="flex-1 overflow-y-auto ">

           <div className="p-8">
             {/* Header */}
             <div className="flex items-start gap-4 mb-8">
               <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#f472b6] flex items-center justify-center">
                 {renderIcon("insights", "w-7 h-7 text-white")}
               </div>
               <div>
                 <h1 className="text-white text-2xl font-semibold mb-1">Feedback Insights</h1>
                 <p className="text-[#64648c]">AI-powered analysis of your user feedback data.</p>
               </div>
             </div>
   
             {/* Stats Cards */}
             <div className="grid grid-cols-4 gap-4 mb-8">
               <div className="bg-[#1e1e3a] border border-[#2a2a4a] rounded-xl p-5">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-10 h-10 rounded-lg bg-[#f472b6]/20 flex items-center justify-center">
                     {renderIcon("feedback", "w-5 h-5 text-[#f472b6]")}
                   </div>
                   <span className="text-[#64648c] text-sm">Total Feedback</span>
                 </div>
                 <p className="text-white text-2xl font-semibold">{feedbackList.length}</p>
               </div>
               <div className="bg-[#1e1e3a] border border-[#2a2a4a] rounded-xl p-5">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-10 h-10 rounded-lg bg-[#f472b6]/20 flex items-center justify-center">
                     {renderIcon("chart", "w-5 h-5 text-[#f472b6]")}
                   </div>
                   <span className="text-[#64648c] text-sm">Open Issues</span>
                 </div>
                 <p className="text-white text-2xl font-semibold">
                   {feedbackList.filter((f) => f.status === "Open").length}
                 </p>
               </div>
               <div className="bg-[#1e1e3a] border border-[#2a2a4a] rounded-xl p-5">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-10 h-10 rounded-lg bg-[#fbbf24]/20 flex items-center justify-center">
                     {renderIcon("trending", "w-5 h-5 text-[#fbbf24]")}
                   </div>
                   <span className="text-[#64648c] text-sm">In Review</span>
                 </div>
                 <p className="text-white text-2xl font-semibold">
                   {feedbackList.filter((f) => f.status === "In Review").length}
                 </p>
               </div>
               <div className="bg-[#1e1e3a] border border-[#2a2a4a] rounded-xl p-5">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-10 h-10 rounded-lg bg-[#34d399]/20 flex items-center justify-center">
                     {renderIcon("heart", "w-5 h-5 text-[#34d399]")}
                   </div>
                   <span className="text-[#64648c] text-sm">Resolved</span>
                 </div>
                 <p className="text-white text-2xl font-semibold">
                   {feedbackList.filter((f) => f.status === "Resolved").length}
                 </p>
               </div>
             </div>
   
             {/* Analysis Type Selection */}
             <div className="mb-6">
               <h2 className="text-white text-lg font-medium mb-4">Choose Analysis Type</h2>
               <div className="grid grid-cols-4 gap-4">
                 {analysisTypes.map((type) => (
                   <button
                     key={type.id}
                     onClick={() => analyzeWithAI(type.id)}
                     disabled={isAnalyzing}
                     className={`p-4 rounded-xl border transition-all ${
                       activeAnalysis === type.id && insights
                         ? "bg-[#f472b6]/10 border-[#f472b6]"
                         : "bg-[#1e1e3a] border-[#2a2a4a] hover:border-[#f472b6]/50"
                     } ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
                   >
                     <div className="flex items-center gap-3 mb-2">
                       <div className="w-10 h-10 rounded-lg bg-[#f472b6]/20 flex items-center justify-center">
                         {renderIcon(type.icon, "w-5 h-5 text-[#f472b6]")}
                       </div>
                       <span className="text-white font-medium">{type.name}</span>
                     </div>
                     <p className="text-[#64648c] text-sm text-left">{type.description}</p>
                   </button>
                 ))}
               </div>
             </div>
   
             {/* AI Insights Section */}
             <div className="bg-[#1e1e3a] border border-[#2a2a4a] rounded-xl p-6">
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#f472b6] flex items-center justify-center">
                     {renderIcon("ai", "w-5 h-5 text-white")}
                   </div>
                   <div>
                     <h2 className="text-white text-lg font-medium">AI Insights</h2>
                     <p className="text-[#64648c] text-sm">
                       {isAnalyzing
                         ? "Analyzing feedback..."
                         : insights
                         ? `${analysisTypes.find((t) => t.id === activeAnalysis)?.name} Analysis`
                         : "Select an analysis type to get started"}
                     </p>
                   </div>
                 </div>
                 {insights && (
                   <button
                     onClick={() => analyzeWithAI(activeAnalysis)}
                     disabled={isAnalyzing}
                     className="flex items-center gap-2 text-[#f472b6] hover:text-[#f472b6]/80 transition-colors"
                   >
                     {renderIcon("refresh", "w-4 h-4")}
                     Regenerate
                   </button>
                 )}
               </div>
   
               {/* Loading State */}
               {isAnalyzing && (
                 <div className="flex items-center justify-center py-12">
                   <div className="flex flex-col items-center gap-4">
                     <div className="w-12 h-12 border-4 border-[#f472b6]/20 border-t-[#f472b6] rounded-full animate-spin"></div>
                     <p className="text-[#64648c]">Analyzing your feedback with AI...</p>
                   </div>
                 </div>
               )}
   
               {/* Error State */}
               {error && !isAnalyzing && (
                 <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                   <p className="text-red-400">{error}</p>
                 </div>
               )}
   
               {/* Sentiment Charts */}
               {sentimentData && activeAnalysis === "sentiment" && !isAnalyzing && !error && (
                 <div className="space-y-8">
                   {/* Summary */}
                   {sentimentData.summary && (
                     <div className="bg-gradient-to-r from-[#8b5cf6]/10 to-[#f472b6]/10 border border-[#8b5cf6]/30 rounded-xl p-4">
                       <p className="text-[#94a3b8] text-lg leading-relaxed">{sentimentData.summary}</p>
                     </div>
                   )}
   
                   {/* Charts Row */}
                   <div className="grid grid-cols-2 gap-6">
                     {/* Pie Chart - Overall Sentiment */}
                     {sentimentData.overall && (
                       <div className="bg-[#0c0c1d] rounded-xl p-6 border border-[#2a2a4a]">
                         <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-[#f472b6]"></div>
                           Overall Sentiment Distribution
                         </h3>
                         <div className="h-64">
                           <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                               <Pie
                                 data={[
                                   { name: "Positive", value: sentimentData.overall.positive, fill: "#34d399" },
                                   { name: "Neutral", value: sentimentData.overall.neutral, fill: "#fbbf24" },
                                   { name: "Negative", value: sentimentData.overall.negative, fill: "#f472b6" },
                                 ]}
                                 cx="50%"
                                 cy="50%"
                                 innerRadius={60}
                                 outerRadius={90}
                                 paddingAngle={5}
                                 dataKey="value"
                                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                 labelLine={false}
                               >
                                 <Cell fill="#34d399" />
                                 <Cell fill="#fbbf24" />
                                 <Cell fill="#f472b6" />
                               </Pie>
                               <Tooltip
                                 contentStyle={{ backgroundColor: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: "8px" }}
                                 itemStyle={{ color: "#94a3b8" }}
                               />
                               <Legend
                                 wrapperStyle={{ color: "#94a3b8" }}
                                 formatter={(value) => <span style={{ color: "#94a3b8" }}>{value}</span>}
                               />
                             </PieChart>
                           </ResponsiveContainer>
                         </div>
                       </div>
                     )}
   
                     {/* Radar Chart - Emotions */}
                     {sentimentData.emotions && sentimentData.emotions.length > 0 && (
                       <div className="bg-[#0c0c1d] rounded-xl p-6 border border-[#2a2a4a]">
                         <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-[#8b5cf6]"></div>
                           Emotional Analysis
                         </h3>
                         <div className="h-64">
                           <ResponsiveContainer width="100%" height="100%">
                             <RadarChart data={sentimentData.emotions}>
                               <PolarGrid stroke="#2a2a4a" />
                               <PolarAngleAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                               <PolarRadiusAxis
                                 angle={30}
                                 domain={[0, 100]}
                                 tick={{ fill: "#64648c", fontSize: 10 }}
                               />
                               <Radar
                                 name="Score"
                                 dataKey="value"
                                 stroke="#8b5cf6"
                                 fill="#8b5cf6"
                                 fillOpacity={0.4}
                               />
                               <Tooltip
                                 contentStyle={{ backgroundColor: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: "8px" }}
                                 itemStyle={{ color: "#94a3b8" }}
                               />
                             </RadarChart>
                           </ResponsiveContainer>
                         </div>
                       </div>
                     )}
                   </div>
   
                   {/* Bar Chart - Feedback Breakdown */}
                   {sentimentData.feedbackBreakdown && sentimentData.feedbackBreakdown.length > 0 && (
                     <div className="bg-[#0c0c1d] rounded-xl p-6 border border-[#2a2a4a]">
                       <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-[#fbbf24]"></div>
                         Sentiment Score by Feedback
                       </h3>
                       <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={sentimentData.feedbackBreakdown} layout="vertical">
                             <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                             <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64648c" }} />
                             <YAxis
                               dataKey="title"
                               type="category"
                               width={150}
                               tick={{ fill: "#94a3b8", fontSize: 12 }}
                             />
                             <Tooltip
                               contentStyle={{ backgroundColor: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: "8px" }}
                               itemStyle={{ color: "#94a3b8" }}
                               formatter={(value, name, props) => [
                                 `${value}% (${props.payload.sentiment})`,
                                 "Score",
                               ]}
                             />
                             <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                               {sentimentData.feedbackBreakdown.map((entry, index) => (
                                 <Cell
                                   key={`cell-${index}`}
                                   fill={
                                     entry.sentiment === "positive"
                                       ? "#34d399"
                                       : entry.sentiment === "negative"
                                       ? "#f472b6"
                                       : "#fbbf24"
                                   }
                                 />
                               ))}
                             </Bar>
                           </BarChart>
                         </ResponsiveContainer>
                       </div>
                     </div>
                   )}
   
                   {/* Pain Points & Delight Factors */}
                   <div className="grid grid-cols-2 gap-6">
                     {sentimentData.painPoints && sentimentData.painPoints.length > 0 && (
                       <div className="bg-[#0c0c1d] rounded-xl p-6 border border-[#f472b6]/30">
                         <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                           <div className="w-8 h-8 rounded-lg bg-[#f472b6]/20 flex items-center justify-center">
                             {renderIcon("trending", "w-4 h-4 text-[#f472b6]")}
                           </div>
                           Pain Points
                         </h3>
                         <ul className="space-y-3">
                           {sentimentData.painPoints.map((point, idx) => (
                             <li key={idx} className="flex items-start gap-3">
                               <span className="text-[#f472b6] mt-1">•</span>
                               <span className="text-[#94a3b8]">{point}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                     )}
   
                     {sentimentData.delightFactors && sentimentData.delightFactors.length > 0 && (
                       <div className="bg-[#0c0c1d] rounded-xl p-6 border border-[#34d399]/30">
                         <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                           <div className="w-8 h-8 rounded-lg bg-[#34d399]/20 flex items-center justify-center">
                             {renderIcon("heart", "w-4 h-4 text-[#34d399]")}
                           </div>
                           Delight Factors
                         </h3>
                         <ul className="space-y-3">
                           {sentimentData.delightFactors.map((factor, idx) => (
                             <li key={idx} className="flex items-start gap-3">
                               <span className="text-[#34d399] mt-1">•</span>
                               <span className="text-[#94a3b8]">{factor}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                     )}
                   </div>
                 </div>
               )}
   
               {/* Regular Insights Content */}
               {insights && !sentimentData && !isAnalyzing && !error && (
                 <div className="prose prose-invert max-w-none">
                   <div className="text-[#94a3b8] whitespace-pre-wrap leading-relaxed">
                     {insights}
                   </div>
                 </div>
               )}
   
               {/* Empty State */}
               {!insights && !sentimentData && !isAnalyzing && !error && (
                 <div className="flex flex-col items-center justify-center py-12 text-center">
                   <div className="w-16 h-16 rounded-full bg-[#2a2a4a] flex items-center justify-center mb-4">
                     {renderIcon("insights", "w-8 h-8 text-[#64648c]")}
                   </div>
                   <h3 className="text-white text-lg font-medium mb-2">No Insights Yet</h3>
                   <p className="text-[#64648c] max-w-md">
                     Click on one of the analysis types above to generate AI-powered insights from your feedback data.
                   </p>
                 </div>
               )}
             </div>
           </div>
         </div>
       </div>
     );
   };
   
