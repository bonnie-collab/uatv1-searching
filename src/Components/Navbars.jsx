import { useLocation } from "react-router-dom";

const pageTitles = {
  "/admin":          "Dashboard",
  "/admin/users":    "Users",
  "/admin/products": "Products",
  "/admin/payments": "Payments",
};

export default function Navbar({ toggleSidebar, sidebarOpen }) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Admin";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono&display=swap');
        .toggle-btn:hover { background: rgba(255,255,255,0.08) !important; }
      `}</style>

      <header style={{
        height: "64px",
        background: "#080c14",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 50,
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* Left — Toggle + Page Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            className="toggle-btn"
            onClick={toggleSidebar}
            style={{
              width: "36px", height: "36px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent",
              color: "#94a3b8",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px",
              transition: "background 0.15s",
            }}
          >
            {sidebarOpen ? "←" : "→"}
          </button>

          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "18px",
            fontWeight: "800",
            color: "#f1f5f9",
            margin: 0,
          }}>
            {title}
          </h1>
        </div>

        {/* Right — Status Indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6ee7b7", boxShadow: "0 0 6px #6ee7b7" }} />
          <span style={{ fontSize: "12px", color: "#475569", fontFamily: "'DM Mono', monospace" }}>
            API Connected
          </span>
        </div>
      </header>
    </>
  );
}
