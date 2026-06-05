import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://bonnie.alwaysdata.net";

const StatCard = ({ label, value, icon, color, delay }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px",
      padding: "28px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      animationDelay: `${delay}ms`,
      animation: "fadeUp 0.5s ease forwards",
      opacity: 0,
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <span style={{ fontSize: "13px", color: "#94a3b8", letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
        {label}
      </span>
      <span style={{ fontSize: "22px" }}>{icon}</span>
    </div>
    <div style={{ fontSize: "36px", fontWeight: "700", color: "#f1f5f9", fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>
      {value ?? "—"}
    </div>
    <div style={{ height: "3px", borderRadius: "2px", background: color, width: "40px" }} />
  </div>
);

const BarChart = ({ data, label }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.users || d.count || d.value || 0));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "120px", padding: "8px 0" }}>
      {data.map((d, i) => {
        const val = d.users || d.count || d.value || 0;
        const height = max > 0 ? (val / max) * 100 : 0;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "11px", color: "#64748b" }}>{val}</span>
            <div
              style={{
                width: "100%",
                height: `${height}%`,
                minHeight: "4px",
                background: "linear-gradient(180deg, #6ee7b7, #059669)",
                borderRadius: "4px 4px 0 0",
                transition: "height 0.6s ease",
              }}
            />
            <span style={{ fontSize: "11px", color: "#475569", whiteSpace: "nowrap" }}>
              {d.month || d.category || d.name || `#${i + 1}`}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/api/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setAnalytics(res.data);
        setLoading(false);
      })
      .catch(err => {
        const msg = err.response?.data?.message || "Failed to load analytics";
        setError(msg);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
      <div style={{ width: "40px", height: "40px", border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "#6ee7b7", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    </div>
  );

  if (error) return <div style={{ color: "#f87171", padding: "20px", textAlign: "center" }}>{error}</div>;

  const kpis = analytics?.kpis || {};

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: "800", color: "#f1f5f9", margin: 0 }}>
          Dashboard Overview
        </h2>
        <p style={{ color: "#64748b", marginTop: "6px", fontSize: "14px" }}>Live metrics from SokoGarden database</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <StatCard label="Total Revenue" value={`KES ${kpis.revenue}`} icon="💰" color="#6ee7b7" delay={0} />
        <StatCard label="Total Users"   value={kpis.users}            icon="👥" color="#93c5fd" delay={100} />
        <StatCard label="Total Sales"   value={kpis.sales}            icon="🛒" color="#fcd34d" delay={200} />
        <StatCard label="Conversion"    value={`${kpis.conversion}%`} icon="📈" color="#f9a8d4" delay={300} />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>

        {/* User Growth */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: "700", color: "#e2e8f0", margin: "0 0 16px" }}>
            User Growth
          </h3>
          <BarChart data={analytics?.userGrowth} />
        </div>

        {/* Products by Category */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: "700", color: "#e2e8f0", margin: "0 0 16px" }}>
            Products by Category
          </h3>
          <BarChart data={analytics?.productsByCategory} />
        </div>

      </div>

      {/* User Roles */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: "700", color: "#e2e8f0", margin: "0 0 16px" }}>
          User Roles Distribution
        </h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {(analytics?.userRoles || []).map((r, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "12px 20px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "22px", fontWeight: "700", color: "#f1f5f9", fontFamily: "'Syne', sans-serif" }}>{r.value}</span>
              <span style={{ fontSize: "12px", color: "#64748b", textTransform: "capitalize" }}>{r.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}