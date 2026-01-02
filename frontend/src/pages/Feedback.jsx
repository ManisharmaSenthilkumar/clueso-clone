import { useEffect, useState } from "react";
import { createFeedback, fetchFeedback } from "../features/feedback/feedback.api";

import { useNavigate } from "react-router-dom";


const Feedback = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, []);

  const firstName = user?.firstName || "User";
  const lastName = user?.lastName || "";
  const email = user?.email || "unknown@email.com";


  const [activeTab, setActiveTab] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

const handleLogoutConfirm = () => {
  sessionStorage.clear();   // ✅ FIXED
  navigate("/");
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


  const loadFeedback = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFeedback();
      setFeedbackList(data || []);
    } catch (error) {
      console.error("Error loading feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddFeedback = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createFeedback({ title, description });
      setTitle("");
      setDescription("");
      setShowAddModal(false);
      loadFeedback();
    } catch (error) {
      console.error("Error creating feedback:", error);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const mainNavItems = [
    { name: "Home", icon: "home" },
    { name: "All Projects", icon: "folder" },
    { name: "Video Templates", icon: "video" },
    { name: "Auto-update", icon: "sparkles" },
    { name: "Team", icon: "users" },
    { name: "Analytics", icon: "chart" },
    { name: "Feedback", icon: "feedback", active: true },
    { name: "Feedback insights", icon: "insights" },
  ];

  const bottomNavItems = [
    { name: "Settings", icon: "settings" },
    { name: "Trash", icon: "trash" },
  ];
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";

    // 👇 Force UTC parsing
    const date = new Date(dateStr + "Z");

    const datePart = date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const timePart = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart} • ${timePart}`;
  };



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
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-[#f472b6]/20 text-[#f472b6]";
      case "In Review":
        return "bg-[#fbbf24]/20 text-[#fbbf24]";
      case "Resolved":
        return "bg-[#34d399]/20 text-[#34d399]";
      default:
        return "bg-[#94a3b8]/20 text-[#94a3b8]";
    }
  };



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
                  className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname === navRoutes[item.name]
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
                  className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${item.active
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
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-[#1e1e3a] border border-[#2a2a4a] flex items-center justify-center">
              {renderIcon("feedback", "w-7 h-7 text-[#f472b6]")}
            </div>
            <div>
              <h1 className="text-white text-2xl font-semibold mb-1">Feedback</h1>
              <p className="text-[#64648c]">Manage and review user feedback submissions.</p>
            </div>
          </div>

          {/* Tabs and Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab("all")}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === "all"
                    ? "text-white border-[#f472b6]"
                    : "text-[#64648c] border-transparent hover:text-white"
                  }`}
              >
                All Feedback
                <span className="ml-2 px-2 py-0.5 rounded-full bg-[#1e1e3a] text-[#94a3b8] text-xs">
                  {feedbackList.length} items
                </span>
              </button>
              <button
                onClick={() => setActiveTab("open")}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === "open"
                    ? "text-white border-[#f472b6]"
                    : "text-[#64648c] border-transparent hover:text-white"
                  }`}
              >
                Open
                <span className="ml-2 px-2 py-0.5 rounded-full bg-[#1e1e3a] text-[#94a3b8] text-xs">
                  1 items
                </span>
              </button>
              <button
                onClick={() => setActiveTab("resolved")}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === "resolved"
                    ? "text-white border-[#f472b6]"
                    : "text-[#64648c] border-transparent hover:text-white"
                  }`}
              >
                Resolved
                <span className="ml-2 px-2 py-0.5 rounded-full bg-[#1e1e3a] text-[#94a3b8] text-xs">
                  1 items
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#f472b6] hover:bg-[#f472b6]/90 text-white py-2.5 px-5 rounded-lg flex items-center gap-2 font-medium transition-colors"
              >
                {renderIcon("plus", "w-5 h-5")}
                Add Feedback
              </button>
              <button className="bg-[#1e1e3a] hover:bg-[#2a2a4a] text-white py-2.5 px-5 rounded-lg flex items-center gap-2 font-medium transition-colors border border-[#2a2a4a]">
                Export Feedback
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#0c0c1d] border border-[#1e1e3a] rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#1e1e3a] text-[#64648c] text-sm font-medium">
              <div className="col-span-4">Title</div>

              <div className="col-span-2">Date</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-2">Status</div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="px-6 py-8 text-center text-[#64648c]">Loading feedback...</div>
            )}

            {/* Empty State */}
            {!isLoading && feedbackList.length === 0 && (
              <div className="px-6 py-8 text-center text-[#64648c]">No feedback yet.</div>
            )}

            {/* Table Body */}
            {!isLoading && feedbackList.map((feedback) => (
              <div
                key={feedback.id}
                onClick={() => setSelectedFeedback(feedback)}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#1e1e3a] hover:bg-[#1e1e3a]/30 transition-colors items-center cursor-pointer"
              >

                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#f472b6] flex items-center justify-center text-white font-medium">
                    {feedback.title.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium">{feedback.title}</p>
                    <p className="text-xs text-[#64648c]">
                      by {feedback.author_email}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 text-[#94a3b8] text-sm">
                  {formatDateTime(feedback.created_at)}
                </div>
                <div className="col-span-4 text-[#94a3b8] text-sm truncate">{feedback.description}</div>
                <div className="col-span-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                    {feedback.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Feedback Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0c0c1d] border border-[#1e1e3a] rounded-xl w-full max-w-md p-6 mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-semibold">Add Feedback</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#64648c] hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[#94a3b8] text-sm mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter feedback title"
                  className="w-full bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg py-2.5 px-4 text-white placeholder-[#64648c] focus:outline-none focus:border-[#f472b6] text-sm"
                />
              </div>

              <div>
                <label className="block text-[#94a3b8] text-sm mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your feedback description"
                  rows={4}
                  className="w-full bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg py-2.5 px-4 text-white placeholder-[#64648c] focus:outline-none focus:border-[#f472b6] text-sm resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-[#1e1e3a] hover:bg-[#2a2a4a] text-white py-2.5 px-5 rounded-lg font-medium transition-colors border border-[#2a2a4a]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFeedback}
                className="flex-1 bg-[#f472b6] hover:bg-[#f472b6]/90 text-white py-2.5 px-5 rounded-lg font-medium transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0c0c1d] border border-[#1e1e3a] rounded-xl w-full max-w-2xl p-6 mx-4">

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-white text-xl font-semibold">
                  {selectedFeedback.title}
                </h2>
                <p className="text-sm text-[#64648c] mt-1">
                  by {selectedFeedback.author_email}
                </p>
              </div>

              <button
                onClick={() => setSelectedFeedback(null)}
                className="text-[#64648c] hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm text-[#94a3b8] mb-6">

              <p className="text-xs text-[#64648c] mt-1">
                Submitted on {formatDateTime(selectedFeedback.created_at)}
              </p>


              <div>
                <span className="block text-xs uppercase text-[#64648c]">Status</span>
                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    selectedFeedback.status
                  )}`}
                >
                  {selectedFeedback.status}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-white font-medium mb-2">Feedback Details</h3>
              <div className="bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg p-4 text-[#94a3b8] text-sm leading-relaxed">
                {selectedFeedback.description}
              </div>
            </div>
          

            {/* Footer actions (future-ready) */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedFeedback(null)}
                className="bg-[#1e1e3a] hover:bg-[#2a2a4a] text-white py-2 px-4 rounded-lg text-sm"
              >
                Close
              </button>

              {/* OWNER ONLY (future) */}
              {selectedFeedback.status === "open" && (
                <button className="bg-[#34d399] hover:bg-[#34d399]/90 text-black py-2 px-4 rounded-lg text-sm font-medium">
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Feedback;
