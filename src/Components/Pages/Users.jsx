import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://bonnie.alwaysdata.net";

const badge = (role) => ({
  display: "inline-block",
  padding: "3px 10px",
  borderRadius: "20px",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  background: role === "admin" ? "rgba(110,231,183,0.15)" : "rgba(147,197,253,0.1)",
  color: role === "admin" ? "#6ee7b7" : "#93c5fd",
  border: `1px solid ${role === "admin" ? "rgba(110,231,183,0.3)" : "rgba(147,197,253,0.2)"}`,
});

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchUsers = () => {
    axios
      .get(`${API}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err.response?.data?.message || "Failed to load users");
        setLoading(false);
      });
  };

  useEffect(() => { fetchUsers(); }, []);

  const updateRole = (userId, newRole) => {
    const form = new FormData();
    form.append("role", newRole);

    axios
      .put(`${API}/api/admin/users/${userId}/role`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setMsg(res.data.message);
        fetchUsers();
        setTimeout(() => setMsg(""), 3000);
      })
      .catch(err => {
        setMsg(err.response?.data?.message || "Role update failed");
        setTimeout(() => setMsg(""), 3000);
      });
  };

  const deleteUser = (userId) => {
    if (!window.confirm("Delete this user?")) return;

    axios
      .delete(`${API}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setMsg(res.data.message);
        fetchUsers();
        setTimeout(() => setMsg(""), 3000);
      })
      .catch(err => {
        setMsg(err.response?.data?.message || "Delete failed");
        setTimeout(() => setMsg(""), 3000);
      });
  };

  const filtered = users.filter(u =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .user-row:hover { background: rgba(255,255,255,0.04) !important; }
        .action-btn:hover { opacity: 0.8; transform: scale(0.97); }
        .search-input:focus { outline: none; border-color: rgba(110,231,183,0.5) !important; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: "800", color: "#f1f5f9", margin: 0 }}>
            Users
          </h2>
          <p style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>{users.length} registered accounts</p>
        </div>

        <input
          className="search-input"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "10px 16px",
            color: "#e2e8f0",
            fontSize: "14px",
            width: "260px",
            transition: "border-color 0.2s",
          }}
        />
      </div>

      {/* Toast */}
      {msg && (
        <div style={{ background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.3)", color: "#6ee7b7", borderRadius: "10px", padding: "12px 18px", marginBottom: "20px", fontSize: "14px" }}>
          ✓ {msg}
        </div>
      )}

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>

        {/* Table head */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr", padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {["Username", "Email", "Role", "Actions"].map(h => (
            <span key={h} style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#475569" }}>Loading users...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#475569" }}>No users found</div>
        ) : (
          filtered.map((user, i) => (
            <div
              key={user.id}
              className="user-row"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1fr 1fr",
                padding: "16px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                alignItems: "center",
                transition: "background 0.15s",
                animation: `fadeUp 0.3s ease ${i * 40}ms forwards`,
                opacity: 0,
              }}
            >
              <span style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: "500" }}>{user.username}</span>
              <span style={{ color: "#94a3b8", fontSize: "13px", fontFamily: "'DM Mono', monospace" }}>{user.email}</span>
              <span style={badge(user.role)}>{user.role}</span>
              <div style={{ display: "flex", gap: "8px" }}>

                {/* Toggle Role */}
                <button
                  className="action-btn"
                  onClick={() => updateRole(user.id, user.role === "admin" ? "user" : "admin")}
                  style={{
                    background: "rgba(147,197,253,0.1)",
                    border: "1px solid rgba(147,197,253,0.2)",
                    color: "#93c5fd",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {user.role === "admin" ? "→ User" : "→ Admin"}
                </button>

                {/* Delete */}
                <button
                  className="action-btn"
                  onClick={() => deleteUser(user.id)}
                  style={{
                    background: "rgba(248,113,113,0.1)",
                    border: "1px solid rgba(248,113,113,0.2)",
                    color: "#f87171",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    fontSize: "12px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  ✕
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}