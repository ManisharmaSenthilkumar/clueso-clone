
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import LogoutConfirmModal from "../features/insights/components/LogoutConfirmModal";
import { logout } from "../auth/auth.store";



export default function DashboardLayout({ children }) {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Home");
  const [user, setUser] = useState(null);
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
    
  
    // 🔐 PROTECT DASHBOARD (BACKEND MERGE)
    useEffect(() => {
  
      const token = sessionStorage.getItem("token");
      const storedUser = sessionStorage.getItem("user");
  
      if (!token || !storedUser) {
        window.location.href = "/";
        return;
      }
  
      setUser(JSON.parse(storedUser));
    }, []);
    useEffect(() => {
      if (location.pathname.includes("/dashboard/feedback")) {
        setActiveNav("Feedback");
      } else if (location.pathname.includes("/dashboard/insights")) {
        setActiveNav("Feedback insights");
      } else {
        setActiveNav("Home");
      }
    }, [location.pathname]);

  const handleConfirmLogout = () => {
    logout();
    navigate("/");
  };
   const renderIcon = (icon, className = "w-5 h-5") => {
    switch (icon) {
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
      case "plus":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
      case "search":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case "collapse":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        );
      case "play":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "upload":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        );
      case "slides":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
        );
      case "scissors":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
          </svg>
        );
      case "translate":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
        );
      case "star":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      case "crown":
        return (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
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
      default:
        return null;
    }
  };

  if (!user) return null;

  return (
    <>
            {/* Sidebar */}
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
      
      
              {/* Navigation */}
              <nav className="flex-1 px-3">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          setActiveNav(item.name);
      
                          if (item.name === "Feedback") {
                            navigate("/feedback");
                          } else if (item.name === "Feedback insights") {
                            navigate("/insights");
                          } else {
                            navigate("/dashboard");
                          }
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${activeNav === item.name
                          ? "bg-[#2a2438] text-white border-r-2 border-[#7c5cff]"
                          : "text-gray-400 hover:text-white hover:bg-[#2a2438]"
                          }`}
                      >
                        {renderIcon(item.icon)}
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
      
              {/* Bottom */}
              <div className="px-3 pb-2">
                <ul className="space-y-1">
                  {bottomNavItems.map((item) => (
                    <li key={item.name}>
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#2a2438]">
                        {renderIcon(item.icon)}
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
      
              {/* User Profile (BACKEND DATA MERGED) */}
              <div className="border-t border-[#2a2438] p-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#7c5cff] flex items-center justify-center text-white font-medium">
                    {user.email?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.firstName || "User"}’s Workspace
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <LogoutConfirmModal
        open={showLogout}
        onCancel={() => setShowLogout(false)}
        onConfirm={handleConfirmLogout}
      />
                </div>
              </div>
            </div>
      
      
    </>
  );
}
