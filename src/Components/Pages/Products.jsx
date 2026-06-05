import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://bonnie.alwaysdata.net";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API}/api/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err.response?.data?.message || "Failed to load products");
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.product_category).filter(Boolean))];

  const filtered = products.filter(p => {
    const matchSearch = p.product_name?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || p.product_category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .prod-card:hover { border-color: rgba(110,231,183,0.25) !important; transform: translateY(-2px); }
        .cat-btn:hover { background: rgba(255,255,255,0.08) !important; }
        .search-input:focus { outline: none; border-color: rgba(110,231,183,0.5) !important; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: "800", color: "#f1f5f9", margin: 0 }}>
            Products
          </h2>
          <p style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>{products.length} items in catalogue</p>
        </div>
        <input
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "10px 16px",
            color: "#e2e8f0",
            fontSize: "14px",
            width: "220px",
            transition: "border-color 0.2s",
          }}
        />
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button
            key={cat}
            className="cat-btn"
            onClick={() => setFilterCat(cat)}
            style={{
              background: filterCat === cat ? "rgba(110,231,183,0.15)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${filterCat === cat ? "rgba(110,231,183,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: filterCat === cat ? "#6ee7b7" : "#94a3b8",
              borderRadius: "20px",
              padding: "6px 16px",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#475569" }}>Loading products...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#475569" }}>No products found</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="prod-card"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                overflow: "hidden",
                transition: "all 0.2s",
                animation: `fadeUp 0.35s ease ${i * 30}ms forwards`,
                opacity: 0,
              }}
            >
              {/* Product Image */}
              <div style={{ width: "100%", height: "150px", background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
                {p.product_photo ? (
                  <img
                    src={`${API}/static/images/${p.product_photo}`}
                    alt={p.product_name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
                    🛒
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div style={{ padding: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: "600", lineHeight: 1.3 }}>
                    {p.product_name}
                  </span>
                  <span style={{ color: "#6ee7b7", fontSize: "14px", fontWeight: "700", fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>
                    KES {p.product_cost}
                  </span>
                </div>
                <p style={{ color: "#64748b", fontSize: "12px", margin: "0 0 10px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {p.product_description}
                </p>
                <span style={{
                  background: "rgba(147,197,253,0.1)",
                  border: "1px solid rgba(147,197,253,0.2)",
                  color: "#93c5fd",
                  borderRadius: "20px",
                  padding: "3px 10px",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontFamily: "'DM Mono', monospace",
                }}>
                  {p.product_category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}