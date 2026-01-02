import { Link } from "react-router-dom";
import { logout } from "../auth/auth.store";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        background: "#0f172a",
        color: "#fff",
        padding: 20
      }}
    >
      <h2 style={{ marginBottom: 30 }}>Clueso</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/feedback" style={linkStyle}>Feedback</Link>
        <Link to="/insights" style={linkStyle}>AI Insights</Link>
        <Link to="/media" style={linkStyle}>Media</Link>
      </nav>

      <button
        onClick={logout}
        style={{
          marginTop: 40,
          background: "#ef4444",
          color: "#fff",
          border: "none",
          padding: 8,
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </aside>
  );
}

const linkStyle = {
  color: "#cbd5f5",
  textDecoration: "none",
  fontSize: 16
};
