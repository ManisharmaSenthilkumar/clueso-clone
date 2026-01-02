import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import recordScreenImg from "../assets/images/i2.png";
import uploadVideoImg from "../assets/images/i1.png";
import uploadSlidesImg from "../assets/images/i3.png";
import deco from "../assets/images/deco.png";
import { logout } from "../auth/auth.store";



const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState("Home");
  const [user, setUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
const handleLogoutConfirm = () => {
    logout();
    navigate("/", { replace: true });
  };
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

  // 🚪 LOGOUT (BACKEND MERGE)
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
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

  if (!user) return null; // prevent UI flash before redirect

  return (
    <div className="flex min-h-screen bg-[#1a1625] text-white font-sans">
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
            <button
              onClick={()=>setShowLogoutConfirm(true)}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-[#0c0c1d] overflow-y-auto">
        {/* Header with Decorations */}
        <div className="relative px-8 pt-6 pb-4">
          {/* Left Plant Decoration */}
          {/* Header Text */}
          <div
            className="
    w-full
    h-[9rem]
    rounded-xl
    flex flex-col
    items-center
    justify-center
    text-center
    select-none
    backdrop-blur-[20px]
    bg-[#13151b40]
    bg-cover
    bg-center
  "
            style={{
              backgroundImage: `url(${deco})`,
            }}
          >
            <h1 className="text-2xl font-semibold text-white mb-1">
              Make something awesome
            </h1>
            <p className="text-gray-400 text-sm">
              Create stunning product videos and docs
            </p>
          </div>
        </div>
        {/* Content */}
        <div className="px-8 pb-8">
          {/* Create a new video */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {renderIcon("play", "w-5 h-5 text-gray-400")}
              <h2 className="text-base font-medium text-white">Create a new video</h2>
            </div>
            <div className="flex gap-3">


              {/* Record Screen Card */}
              <button
                className="
    select-none
    w-[20rem]
    relative overflow-hidden
    rounded-[10px]
    border border-transparent
    backdrop-blur-[10px]
    bg-[#20203e]
    px-[2px]
    py-6 pr-20 pb-10
    flex flex-col items-start justify-center
    cursor-pointer
    transition-all duration-300
    hover:border-[#7c5cff]/50
    hover:bg-[#26264f]
    hover:scale-[1.01]
    active:scale-[0.99]
  "
              >
                {/* TEXT CONTENT */}
                <div className="z-10 text-left max-w-[70%] ml-2 ">
                  <h3 className="text-white font-semibold text-sm">
                    Record screen
                  </h3>
                  <p className="text-gray-300 text-xs mt-1 leading-relaxed">
                    Turn a screen-recording into a studio-style video.
                  </p>
                </div>

                {/* IMAGE – bottom right */}
                <img
                  src={recordScreenImg}
                  alt="New video"
                  className="
      absolute
      bottom-0
      right-0
      w-20
      opacity-60
      pointer-events-none
      select-none
    "
                />
              </button>




              {/* Upload Video Card */}
              <button
                className="
    select-none
    w-[20rem]
    relative overflow-hidden
    rounded-[10px]
    border border-transparent
    backdrop-blur-[10px]
    bg-[#20203e]
    px-[2px]
    py-6 pr-20 pb-10
    flex flex-col items-start justify-center
    cursor-pointer
    transition-all duration-300
    hover:border-[#7c5cff]/50
    hover:bg-[#26264f]
    hover:scale-[1.01]
    active:scale-[0.99]
  "
              >
                {/* TEXT CONTENT */}
                <div className="z-10 text-left max-w-[70%] ml-2 ">
                  <h3 className="text-white font-semibold text-sm">
                    Upload a video
                  </h3>
                  <p className="text-gray-300 text-xs mt-1 leading-relaxed">
                    Upload a screen recording. Get a studio-style video.
                  </p>
                </div>

                {/* IMAGE – bottom right */}
                <img
                  src={uploadVideoImg}
                  alt="New video"
                  className="
      absolute
      bottom-0
      right-0
      w-20
      opacity-60
      pointer-events-none
      select-none
    "
                />
              </button>

              {/* Upload Slide Deck Card */}
              <button
                className="
    select-none
    w-[20rem]
    relative overflow-hidden
    rounded-[10px]
    border border-transparent
    backdrop-blur-[10px]
    bg-[#20203e]
    px-[2px]
    py-6 pr-20 pb-10
    flex flex-col items-start justify-center
    cursor-pointer
    transition-all duration-300
    hover:border-[#7c5cff]/50
    hover:bg-[#26264f]
    hover:scale-[1.01]
    active:scale-[0.99]
  "
              >
                {/* TEXT CONTENT */}
                <div className="z-10 text-left max-w-[70%] ml-2 ">
                  <h3 className="text-white font-semibold text-sm">
                    Upload a slide deck
                  </h3>
                  <p className="text-gray-300 text-xs mt-1 leading-relaxed">
                    Turn any PDF or PPT into a narrated video.
                  </p>
                </div>

                {/* IMAGE – bottom right */}
                <img
                  src={uploadSlidesImg}
                  alt="New video"
                  className="
      absolute
      bottom-0
      right-0
      w-20
      opacity-60
      pointer-events-none
      select-none
    "
                />
              </button>
            </div>
          </div>

          {/* AI Tools */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {renderIcon("sparkles", "w-5 h-5 text-gray-400")}
              <h2 className="text-base font-medium text-white">AI tools</h2>
              <span className="bg-[#22c55e] text-white text-xs font-bold px-2 py-0.5 rounded">NEW</span>
            </div>
            <div className="flex gap-3">
              {/* Cuts */}
              <div className="bg-[#2a2438] max-w-[15rem] py- 2 min-h-[22px] border border-[#3a3448] rounded-xl px-2 cursor-pointer hover:border-[#4a4458] transition-colors flex items-center gap-3">
                <div className="w-10 h-10 bg-[#7c5cff] rounded-lg flex items-center justify-center">
                  {renderIcon("scissors", "w-5 h-5 text-white")}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-sm">Cuts</h3>
                  <p className="text-gray-400 text-xs">Break down a long video into bite-sized clips and docs</p>
                </div>
                <button className="text-gray-400 hover:text-white">
                  {renderIcon("star", "w-3 h-3")}
                </button>
              </div>

              {/* Auto-update */}
              <div className="bg-[#2a2438] max-w-[15rem] border border-[#3a3448] rounded-xl px-2 cursor-pointer hover:border-[#4a4458] transition-colors flex items-center gap-3">
                <div className="w-10 h-10 bg-[#06b6d4] rounded-lg flex items-center justify-center">
                  {renderIcon("sparkles", "w-5 h-5 text-white")}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-sm">Auto-update</h3>
                  <p className="text-gray-400 text-xs">Update content when your product changes</p>
                </div>
                <button className="text-gray-400 hover:text-white">
                  {renderIcon("star", "w-3 h-3")}
                </button>
              </div>

              {/* Translator */}
              <div className="bg-[#2a2438] max-w-[15rem] border border-[#3a3448] rounded-xl px-2 cursor-pointer hover:border-[#4a4458] transition-colors flex items-center gap-3">
                <div className="w-10 h-10 bg-[#7c5cff] rounded-lg flex items-center justify-center">
                  {renderIcon("translate", "w-5 h-5 text-white")}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-sm">Translator</h3>
                  <p className="text-gray-400 text-xs">Dub a video into 37+ languages</p>
                </div>
                <button className="text-gray-400 hover:text-white">
                  {renderIcon("star", "w-3 h-3")}
                </button>
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="mb-8">
            <h2 className="text-base font-medium text-white mb-4">Recent projects</h2>
            <div className="bg-[#2a2438] border border-[#3a3448] rounded-xl p-16 flex flex-col items-center justify-center">
              {/* Empty State Illustration */}
              <div className="relative w-32 h-32 mb-6">
                {/* Concentric circles */}
                <div className="absolute inset-0 rounded-full border border-[#3a3448]"></div>
                <div className="absolute inset-4 rounded-full border border-[#3a3448]"></div>
                <div className="absolute inset-8 rounded-full border border-[#3a3448]"></div>
                <div className="absolute inset-12 rounded-full bg-[#3a3448] flex items-center justify-center">
                  <div className="w-6 h-4 bg-[#7c5cff] rounded-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5"></div>
                  </div>
                </div>
                {/* Floating video icons */}
                <div className="absolute -top-2 right-4 w-6 h-5 bg-[#4a4458] rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#7c5cff] rounded-sm"></div>
                </div>
                <div className="absolute top-4 -right-4 w-6 h-5 bg-[#4a4458] rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#06b6d4] rounded-sm"></div>
                </div>
                <div className="absolute bottom-4 -right-2 w-6 h-5 bg-[#4a4458] rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#f97066] rounded-sm"></div>
                </div>
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-5 bg-[#4a4458] rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#7c5cff] rounded-sm"></div>
                </div>
              </div>
              <h3 className="text-white font-medium text-lg mb-2">No projects found</h3>
              <p className="text-gray-400 text-sm text-center">
                Choose an option above to<br />create your <span className="text-[#7c5cff] cursor-pointer">first project</span>.
              </p>
            </div>
          </div>

          {/* Getting Started */}
          <div>
            <h2 className="text-base font-medium text-white mb-4">Getting started</h2>
          </div>
        </div>
      </main>
        {/* LOGOUT CONFIRM MODAL */}
{showLogoutConfirm && (
  <div   className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
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
      {/* Chat Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#7c5cff] hover:bg-[#6b4ce0] rounded-full flex items-center justify-center shadow-lg transition-colors">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
};

export default Dashboard;
