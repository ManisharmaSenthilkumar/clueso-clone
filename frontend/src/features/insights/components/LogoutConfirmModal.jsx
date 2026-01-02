import React from "react";

export default function LogoutConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#0f172a",
          color: "#fff",
          padding: 24,
          borderRadius: 12,
          width: 360,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h3 style={{ fontSize: 18, marginBottom: 12 }}>
          Confirm Logout
        </h3>

        <p style={{ fontSize: 14, color: "#cbd5f5", marginBottom: 24 }}>
          Are you sure you want to logout?
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <button
            onClick={onCancel}
            style={{
              padding: "8px 16px",
              background: "#1e293b",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            style={{
              padding: "8px 16px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
