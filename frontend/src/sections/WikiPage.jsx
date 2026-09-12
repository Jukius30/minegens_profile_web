import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../common/Navbar.jsx";
import Footer from "../common/Footer.jsx";

// Master konfigurasi kategori MineGens
const CATEGORY_CONFIG = {
  general: {
    label: "Supporting MineGens",
    icon: "⭐",
    description: "Pelajari berbagai cara mendukung MineGens serta keuntungan dan rank perk eksklusif.",
  },
  sf: {
    label: "OneBlock Slimefun",
    icon: "💿",
    description: "Mulai petualangan dari satu blok dan bangun pulau canggih berbasis mesin Slimefun dan otomatisasi.",
  },
  oneblock: {
    label: "Oneblock Classic",
    icon: "🍀",
    description: "Pengalaman OneBlock klasik dengan fase bertingkat, tantangan pulau, dan custom generator.",
  },
  tycoon: {
    label: "Tycoon",
    icon: "💰",
    description: "Pasang generator otomatis, upgrade tier drop, jual beli resource, dan bangun kerajaan bisnismu.",
  },
  prison: {
    label: "Prison",
    icon: "🔑",
    description: "Mining ore, rank up dari rank awal hingga prestige tertinggi, dan kuasai ekonomi prison.",
  },
  started: {
    label: "Getting Started",
    icon: "🚀",
    description: "Panduan dasar untuk pemain baru, aturan server, dan command penting untuk memulai permainan.",
  },
  realms: {
    label: "Realms",
    icon: "🌐",
    description: "Jelajahi seluruh game mode yang tersedia di MineGens beserta jadwal event dan mekaniknya.",
  },
  economy: {
    label: "Economy & Shops",
    icon: "🛍️",
    description: "Pasar pemain, Auction House, sistem trade, dan strategi mencari koin in-game.",
  },
  commands: {
    label: "Commands",
    icon: "📜",
    description: "Daftar lengkap perintah dasar, izin khusus, dan shortcut penting bagi pemain.",
  },
};

const FALLBACK_ARTICLES = [
  {
    id: 1,
    category: "general",
    title: "Ranks Overview",
    short_desc: "Pelajari hierarki tingkatan rank, benefit, serta multiplier reward donatur di MineGens.",
  },
  {
    id: 2,
    category: "general",
    title: "Credits",
    short_desc: "Penjelasan seputar saldo server credits, cara top-up, dan katalog credit shop.",
  },
  {
    id: 3,
    category: "general",
    title: "Auction House",
    short_desc: "Jual dan beli item antar pemain secara aman tanpa perlu membuat toko fisik.",
  },
  {
    id: 4,
    category: "sf",
    title: "Player Warps",
    short_desc: "Cara membuat warp publik sendiri dan mengunjungi warp komunitas lain.",
  },
  {
    id: 5,
    category: "sf",
    title: "Server Warps",
    short_desc: "Navigasi cepat ke area publik penting seperti spawn, crate, dan dungeon.",
  },
  {
    id: 6,
    category: "sf",
    title: "Tokens",
    short_desc: "Mekanisme pengumpulan token quest dan penukarannya dengan item langka.",
  },
  {
    id: 7,
    category: "sf",
    title: "Quick Shop",
    short_desc: "Panduan membuat chest shop pribadi untuk berdagang secara mandiri.",
  },
  {
    id: 8,
    category: "sf",
    title: "Auction House",
    short_desc: "Aturan lelang, batas durasi listing, dan biaya pajak transaksi di pasar global.",
  },
  {
    id: 9,
    category: "sf",
    title: "Quests",
    short_desc: "Selesaikan quest harian dan mingguan untuk meraih bonus exp serta lootbag.",
  },
];

export default function WikiPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch("http://127.0.0.1:8000/api/wikis", {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
        } else {
          setArticles(FALLBACK_ARTICLES);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Menggunakan data lokal untuk tampilan wiki:", err);
        setArticles(FALLBACK_ARTICLES);
        setLoading(false);
      });
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {};
    Object.keys(CATEGORY_CONFIG).forEach((key) => {
      counts[key] = articles.filter((a) => a.category === key).length;
    });
    return counts;
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((item) => {
      const matchesFilter =
        activeFilter === "all" || item.category === activeFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.short_desc && item.short_desc.toLowerCase().includes(q)) ||
        (CATEGORY_CONFIG[item.category] &&
          CATEGORY_CONFIG[item.category].label.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [articles, activeFilter, searchQuery]);

  const groupedCategories = useMemo(() => {
    const groups = {};
    Object.keys(CATEGORY_CONFIG).forEach((catKey) => {
      const items = filteredArticles.filter((a) => a.category === catKey);
      if (items.length > 0) {
        groups[catKey] = items;
      }
    });
    return groups;
  }, [filteredArticles]);

  const totalCategoriesWithContent = Object.keys(groupedCategories).length;

  return (
    <div
      className="text-white min-vh-100 d-flex flex-column justify-content-between"
      style={{ backgroundColor: "#0c0d0e", fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />

      <main className="container-xl py-5 flex-grow-1" style={{ marginTop: "80px" }}>
        <div className="mx-auto" style={{ maxWidth: "1160px" }}>

          {/* Hero Card Banner */}
          <div
            className="p-4 p-md-5 rounded-4 mb-5 border"
            style={{
              backgroundColor: "#141518",
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 20px 40px -15px rgba(0,0,0,0.5)",
            }}
          >
            {/* Top Tag & Badge */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <span
                style={{
                  color: "#ea580c",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                }}
              >
                — SERVER WIKI
              </span>
              <span
                className="badge rounded-pill px-2 py-1 text-white-50"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                {Object.keys(CATEGORY_CONFIG).length} categories · {articles.length} articles
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="fw-bolder text-white mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "-0.02em" }}
            >
              MineGens Wiki
            </h1>

            {/* Subtitles */}
            <p className="text-white-50 mb-1" style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Your complete guide to MineGens — every realm, command, and feature explained.
            </p>
            <p className="text-white-50 mb-4" style={{ fontSize: "14px" }}>
              Search or browse by category to find exactly what you need.
            </p>

            {/* Search Input Bar */}
            <div className="position-relative mb-4">
              <span
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white-50"
                style={{ pointerEvents: "none" }}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the wiki..."
                className="form-control text-white border-0 ps-5 py-3 rounded-3"
                style={{
                  backgroundColor: "#0d0e11",
                  fontSize: "14.5px",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-3 text-white-50 border-0"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="d-flex flex-wrap align-items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="btn btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-2 border"
                style={{
                  backgroundColor: activeFilter === "all" ? "rgba(234, 88, 12, 0.15)" : "#0d0e11",
                  borderColor: activeFilter === "all" ? "#ea580c" : "rgba(255, 255, 255, 0.06)",
                  color: activeFilter === "all" ? "#ffffff" : "rgba(255, 255, 255, 0.75)",
                  fontSize: "12.5px",
                  transition: "all 0.15s ease",
                }}
              >
                <span>All Topics</span>
                <span className="text-white-50" style={{ fontSize: "11px" }}>
                  {articles.length}
                </span>
              </button>

              {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
                const count = categoryCounts[key] || 0;
                const isSelected = activeFilter === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveFilter(isSelected ? "all" : key)}
                    className="btn btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-2 border"
                    style={{
                      backgroundColor: isSelected ? "rgba(234, 88, 12, 0.18)" : "#0d0e11",
                      borderColor: isSelected ? "#ea580c" : "rgba(255, 255, 255, 0.06)",
                      color: isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
                      fontSize: "12.5px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span style={{ fontSize: "13px" }}>{config.icon}</span>
                    <span>{config.label}</span>
                    <span className="text-white-50" style={{ fontSize: "11px" }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* List Kategori & Cards */}
          {loading && (
            <div className="text-center py-5 text-white-50 small">
              Memuat artikel wiki...
            </div>
          )}

          {!loading && totalCategoriesWithContent === 0 && (
            <div
              className="p-5 text-center rounded-4 border text-white-50 small"
              style={{ backgroundColor: "#141518", borderColor: "rgba(255, 255, 255, 0.06)" }}
            >
              Tidak ada artikel yang cocok dengan pencarian "{searchQuery}".
            </div>
          )}

          {!loading &&
            Object.entries(groupedCategories).map(([catKey, items]) => {
              const config = CATEGORY_CONFIG[catKey] || {
                label: catKey,
                icon: "📁",
                description: "",
              };

              return (
                <section key={catKey} className="mb-5">
                  {/* Category Header */}
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "38px",
                        height: "38px",
                        backgroundColor: "rgba(234, 88, 12, 0.12)",
                        border: "1px solid rgba(234, 88, 12, 0.25)",
                        fontSize: "18px",
                      }}
                    >
                      {config.icon}
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <h2
                        className="h5 fw-bold text-white mb-0"
                        style={{ fontSize: "18px", letterSpacing: "-0.01em" }}
                      >
                        {config.label}
                      </h2>
                      <span
                        className="badge rounded-pill text-white-50"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.06)",
                          fontSize: "11px",
                          fontWeight: 500,
                          padding: "3px 7px",
                        }}
                      >
                        {items.length}
                      </span>
                    </div>
                  </div>

                  {config.description && (
                    <p
                      className="text-white-50 small mb-4 ms-1"
                      style={{ maxWidth: "800px", lineHeight: "1.6" }}
                    >
                      {config.description}
                    </p>
                  )}

                  {/* 3-Column Card Grid */}
                  <div className="row g-3">
                    {items.map((art) => (
                      <div key={art.id} className="col-12 col-md-6 col-lg-4">
                        <div
                          className="h-100 p-4 rounded-4 border d-flex flex-column"
                          style={{
                            backgroundColor: "#15161a",
                            borderColor: "rgba(255, 255, 255, 0.06)",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "rgba(234, 88, 12, 0.35)";
                            e.currentTarget.style.backgroundColor = "#18191e";
                            e.currentTarget.style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                            e.currentTarget.style.backgroundColor = "#15161a";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <h3
                            className="fw-bold text-white mb-2"
                            style={{ fontSize: "16px", lineHeight: "1.4" }}
                          >
                            {art.title}
                          </h3>

                          <p
                            className="text-white-50 small mb-4 flex-grow-1"
                            style={{
                              lineHeight: "1.6",
                              fontSize: "13px",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {art.short_desc}
                          </p>

                          <div className="mt-auto">
                            <Link
                              to={`/wiki/${art.id}`}
                              className="text-decoration-none d-inline-flex align-items-center gap-1.5 fw-semibold"
                              style={{ color: "#ea580c", fontSize: "13px" }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "#f97316")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "#ea580c")}
                            >
                              <span>Read article</span>
                              <span>→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
        </div>
      </main>

      <Footer />
    </div>
  );
}