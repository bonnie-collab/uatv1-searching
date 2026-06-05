import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⬡", path: "/admin" },
  { id: "users",     label: "Users",     icon: "◈", path: "/admin/users" },
  { id: "products",  label: "Products",  icon: "◉", path: "/admin/products" },
  { id: "payments",  label: "Payments",  icon: "◎", path: "/admin/payments" },
];

export default function Sidebar({ isOpen, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Safely extract the username saved during sign-in
  const username = localStorage.getItem("username") || "Admin";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono&display=swap');
        .nav-item:hover { background: rgba(255,255,255,0.06) !important; }
        .logout-btn:hover { background: rgba(248,113,113,0.12) !important; color: #f87171 !important; }
      `}</style>

      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "260px",
        background: "#080c14",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        transform: isOpen ? "translateX(0)" : "translateX(-260px)",
        transition: "transform 0.3s ease",
        zIndex: 100,
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* Brand */}
        <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #6ee7b7, #059669)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", fontWeight: "800", color: "#064e3b",
              fontFamily: "'Syne', sans-serif",
            }}>S</div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: "800", fontSize: "16px", color: "#f1f5f9", lineHeight: 1 }}>SokoGarden</div>
              <div style={{ fontSize: "10px", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path ||
              (item.path !== "/admin" && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.id}
                className="nav-item"
                onClick={() => navigate(item.path)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background: isActive ? "rgba(110,231,183,0.1)" : "transparent",
                  color: isActive ? "#6ee7b7" : "#64748b",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: isActive ? "600" : "400",
                  fontFamily: "'DM Sans', sans-serif",
                  width: "100%",
                  textAlign: "left",
                  transition: "all 0.15s",
                  borderLeft: isActive ? "2px solid #6ee7b7" : "2px solid transparent",
                }}
              >
                <span style={{ fontSize: "18px", lineHeight: 1 }}>{item.icon}</span>
                {item.label}
                {isActive && (
                  <span style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "#6ee7b7" }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {/* User Info */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", marginBottom: "6px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "linear-gradient(135deg, #6ee7b7, #3b82f6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px", fontWeight: "700", color: "#fff",
              flexShrink: 0,
            }}>
              {username[0].toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#e2e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {username}
              </div>
              <div style={{ fontSize: "11px", color: "#475569", fontFamily: "'DM Mono', monospace" }}>admin</div>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              background: "transparent",
              color: "#64748b",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif",
              width: "100%",
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <span>⏻</span> Sign Out
          </button>
        </div>
      </div>
    </>
  );
}