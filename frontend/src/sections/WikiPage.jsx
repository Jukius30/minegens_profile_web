import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../common/Navbar.jsx";
import Footer from "../common/Footer.jsx";

const wikiCategories = [
  { id: "all", label: "All Topics" },
  { id: "general", label: "Supporting AlwiNation" },
  { id: "oneblock", label: "OneBlock" },
  { id: "tycoon", label: "Tycoon" },
  { id: "rpg", label: "Survival RPG" },
  { id: "sf", label: "Survival SF" },
  { id: "vanilla", label: "Vanilla" },
];

const categoryLabels = {
  general: "Supporting AlwiNation",
  oneblock: "OneBlock",
  tycoon: "Tycoon",
  rpg: "Survival RPG",
  sf: "Survival SF",
  vanilla: "Vanilla",
};

export default function WikiPage() {
  const [wikiData, setWikiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch("http://127.0.0.1:8000/api/wikis", {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setWikiData(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data wiki:", err);
        setLoading(false);
      });
  }, []);

  const filteredWiki = useMemo(() => {
    return wikiData.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const catLabel = categoryLabels[item.category] || item.category;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.short_desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        catLabel.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [wikiData, selectedCategory, searchQuery]);

  return (
    <div
      className="text-white min-vh-100 d-flex flex-column justify-content-between"
      style={{ backgroundColor: "#0b0f17" }}
    >
      <Navbar />

      <main className="container-xl py-5 flex-grow-1" style={{ marginTop: "90px" }}>
        <div className="mx-auto" style={{ maxWidth: "1140px" }}>
          
          {/* Tombol Kembali ke Home */}
          <Link
            to="/"
            className="text-white-50 border border-white border-opacity-10 rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 small mb-4 text-decoration-none shadow-sm"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(6px)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(47, 116, 255, 0.15)";
              e.currentTarget.style.borderColor = "rgba(47, 116, 255, 0.4)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.transform = "translateX(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <span style={{ fontSize: "14px", lineHeight: 1 }}>←</span>
            <span className="fw-medium">Kembali ke Home</span>
          </Link>

          {/* Header & Search */}
          <div className="text-center mb-5">
            <span
              className="small text-uppercase fw-semibold"
              style={{ color: "#2f74ff", letterSpacing: "0.08em" }}
            >
              Knowledge Base
            </span>
            <h1 className="h1 fw-bold text-white mt-1 mb-2">MineGens Wiki</h1>
            <p
              className="text-white-50 small mx-auto mb-4"
              style={{ maxWidth: "580px", lineHeight: "1.6" }}
            >
              Panduan lengkap sistem gameplay, mekanisme realm, dan panduan donasi AlwiNation.
            </p>

            <div className="mx-auto" style={{ maxWidth: "540px" }}>
              <div
                className="d-flex align-items-center rounded-pill px-3 py-2 border shadow-sm"
                style={{
                  backgroundColor: "#131823",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <span className="text-white-50 me-2" style={{ fontSize: "16px" }}>🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari topik (Rank, Auction, OneBlock, SF)..."
                  className="form-control bg-transparent border-0 text-white shadow-none small p-0"
                  style={{ fontSize: "14px" }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="btn btn-sm text-white-50 border-0 p-0"
                    style={{ fontSize: "13px" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Categories */}
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mb-5">
            {wikiCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="btn btn-sm rounded-pill px-3 py-2 border fw-medium"
                  style={{
                    fontSize: "13px",
                    backgroundColor: isActive ? "#2f74ff" : "rgba(255, 255, 255, 0.03)",
                    borderColor: isActive ? "#2f74ff" : "rgba(255, 255, 255, 0.08)",
                    color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center py-5 text-white-50 small">
              Memuat data ensiklopedia wiki...
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredWiki.length === 0 && (
            <div
              className="p-5 text-center rounded-4 border text-white-50 small"
              style={{ backgroundColor: "#131823", borderColor: "rgba(255, 255, 255, 0.06)" }}
            >
              Tidak ada artikel wiki yang ditemukan.
            </div>
          )}

          {/* Wiki Cards Grid */}
          {!loading && filteredWiki.length > 0 && (
            <div className="row g-4">
              {filteredWiki.map((item) => (
                <div key={item.id} className="col-12 col-md-6 col-lg-4">
                  <div
                    className="h-100 rounded-4 p-4 d-flex flex-column border"
                    style={{
                      backgroundColor: "#131823",
                      borderColor: "rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    {/* Header Badges */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span
                        className="small fw-semibold text-uppercase"
                        style={{ color: "#2f74ff", fontSize: "11px", letterSpacing: "0.06em" }}
                      >
                        {categoryLabels[item.category] || item.category}
                      </span>
                      <span
                        className="badge rounded-pill border px-2 py-1 text-white-50"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.02)",
                          borderColor: "rgba(255, 255, 255, 0.08)",
                          fontSize: "11px",
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Judul (Clamp 2 Baris) */}
                    <h3
                      className="h6 fw-bold text-white mb-2"
                      style={{
                        fontSize: "17px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Deskripsi Singkat (Clamp 3 Baris) */}
                    <p
                      className="small mb-4 flex-grow-1"
                      style={{
                        color: "rgba(255, 255, 255, 0.55)",
                        lineHeight: "1.6",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.short_desc}
                    </p>

                    {/* Tombol Read More / Buka Panduan Menuju Halaman /wiki/:id */}
                    <div className="pt-3 border-top border-white border-opacity-10">
                      <Link
                        to={`/wiki/${item.id}`}
                        className="d-inline-flex align-items-center justify-content-between w-100 text-decoration-none fw-semibold small"
                        style={{ color: "#2f74ff" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#6095ff")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#2f74ff")}
                      >
                        <span>Buka Panduan</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}