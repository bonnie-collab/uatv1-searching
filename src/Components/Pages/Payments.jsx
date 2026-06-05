import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://bonnie.alwaysdata.net";

const statusColor = (status) => {
  const map = {
    Success:  { bg: "rgba(110,231,183,0.1)", border: "rgba(110,231,183,0.3)", text: "#6ee7b7" },
    Pending:  { bg: "rgba(252,211,77,0.1)",  border: "rgba(252,211,77,0.3)",  text: "#fcd34d" },
    Failed:   { bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)", text: "#f87171" },
  };
  return map[status] || map.Pending;
};

export default function Payments() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API}/api/mpesa_payment`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setTransactions(res.data.response || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err.response?.data?.message || "Failed to load transactions");
        setLoading(false);
      });
  }, []);

  const statuses = ["All", "Success", "Pending", "Failed"];
  const filtered = filter === "All" ? transactions : transactions.filter(t => t.Status === filter);

  // Summary counts
  const counts = {
    Success: transactions.filter(t => t.Status === "Success").length,
    Pending: transactions.filter(t => t.Status === "Pending").length,
    Failed:  transactions.filter(t => t.Status === "Failed").length,
  };

  const totalSuccess = transactions
    .filter(t => t.Status === "Success")
    .reduce((sum, t) => sum + parseFloat(t.Amount || 0), 0);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .tx-row:hover { background: rgba(255,255,255,0.04) !important; }
        .filter-btn:hover { opacity: 0.85; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: "800", color: "#f1f5f9", margin: 0 }}>
          Payments
        </h2>
        <p style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>M-Pesa transaction log</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "28px" }}>
        {[
          { label: "Total Collected", value: `KES ${totalSuccess.toFixed(2)}`, color: "#6ee7b7" },
          { label: "Successful",      value: counts.Success, color: "#6ee7b7" },
          { label: "Pending",         value: counts.Pending, color: "#fcd34d" },
          { label: "Failed",          value: counts.Failed,  color: "#f87171" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            padding: "20px",
            animation: `fadeUp 0.4s ease ${i * 80}ms forwards`,
            opacity: 0,
          }}>
            <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "'DM Mono', monospace", marginBottom: "8px" }}>{s.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: s.color, fontFamily: "'Syne', sans-serif" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter Pills */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {statuses.map(s => {
          const c = statusColor(s === "All" ? "Pending" : s);
          return (
            <button
              key={s}
              className="filter-btn"
              onClick={() => setFilter(s)}
              style={{
                background: filter === s ? (s === "All" ? "rgba(255,255,255,0.1)" : c.bg) : "rgba(255,255,255,0.04)",
                border: `1px solid ${filter === s ? (s === "All" ? "rgba(255,255,255,0.2)" : c.border) : "rgba(255,255,255,0.08)"}`,
                color: filter === s ? (s === "All" ? "#e2e8f0" : c.text) : "#64748b",
                borderRadius: "20px",
                padding: "6px 16px",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* Transactions Table */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>

        {/* Head */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr", padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {["Merchant Request ID", "Phone Number", "Amount (KES)", "Status"].map(h => (
            <span key={h} style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", color: "#475569", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</span>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#475569" }}>Loading transactions...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#475569" }}>No transactions found</div>
        ) : (
          filtered.map((tx, i) => {
            const c = statusColor(tx.Status);
            return (
              <div
                key={i}
                className="tx-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 2fr 1fr 1fr",
                  padding: "16px 24px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  alignItems: "center",
                  transition: "background 0.15s",
                  animation: `fadeUp 0.3s ease ${i * 50}ms forwards`,
                  opacity: 0,
                }}
              >
                <span style={{ color: "#94a3b8", fontSize: "13px", fontFamily: "'DM Mono', monospace" }}>{tx.MerchantRequestID}</span>
                <span style={{ color: "#e2e8f0", fontSize: "13px", fontFamily: "'DM Mono', monospace" }}>{tx.PhoneNumber}</span>
                <span style={{ color: "#6ee7b7", fontSize: "14px", fontWeight: "600", fontFamily: "'DM Mono', monospace" }}>{tx.Amount}</span>
                <span style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  color: c.text,
                  width: "fit-content",
                }}>
                  {tx.Status}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}