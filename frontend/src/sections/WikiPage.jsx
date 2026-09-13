import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../common/Navbar.jsx";
import Footer from "../common/Footer.jsx";
import InlineMarkdown from "../common/InlineMarkdown.jsx";
import { supabase } from "../supabaseClient";

export default function WikiPage() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        setLoading(true);

        // Mengambil kategori dan artikel panduan secara paralel dari Supabase
        const [catResult, wikiResult] = await Promise.all([
          supabase.from("categories").select("*").order("name", { ascending: true }),
          supabase.from("wikis").select("*").order("created_at", { ascending: false }),
        ]);

        if (catResult.error) {
          console.error("Gagal memuat kategori dari Supabase:", catResult.error.message);
        } else if (catResult.data) {
          setCategories(catResult.data);
        }

        if (wikiResult.error) {
          console.error("Gagal memuat wikis dari Supabase:", wikiResult.error.message);
        } else if (wikiResult.data) {
          setArticles(wikiResult.data);
        }
      } catch (err) {
        console.error("Gagal memuat data wiki/kategori:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hitung jumlah artikel per kategori secara dinamis
  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach((cat) => {
      counts[cat.slug] = articles.filter((a) => a.category === cat.slug).length;
    });
    return counts;
  }, [categories, articles]);

  // Filter pencarian dan tombol filter aktif
  const filteredArticles = useMemo(() => {
    return articles.filter((item) => {
      const matchesFilter =
        activeFilter === "all" || item.category === activeFilter;

      const q = searchQuery.toLowerCase().trim();
      const catObj = categories.find((c) => c.slug === item.category);
      const catName = catObj ? catObj.name.toLowerCase() : "";

      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.short_desc && item.short_desc.toLowerCase().includes(q)) ||
        catName.includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [articles, activeFilter, searchQuery, categories]);

  // Kelompokkan artikel yang cocok berdasarkan kategori
  const groupedCategories = useMemo(() => {
    const groups = {};
    categories.forEach((cat) => {
      const items = filteredArticles.filter((a) => a.category === cat.slug);
      if (items.length > 0) {
        groups[cat.slug] = {
          config: cat,
          items: items,
        };
      }
    });
    return groups;
  }, [categories, filteredArticles]);

  const totalGroupsWithContent = Object.keys(groupedCategories).length;

  return (
    <div
      className="text-white min-vh-100 d-flex flex-column justify-content-between"
      style={{ backgroundColor: "#0c0d0e", fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />

      <main className="container-xl py-5 flex-grow-1" style={{ marginTop: "80px" }}>
        <div className="mx-auto" style={{ maxWidth: "1160px" }}>

          {/* ===================== HERO CARD ===================== */}
          <div
            className="p-4 p-md-5 rounded-4 mb-5 border"
            style={{
              backgroundColor: "#141518",
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 20px 40px -15px rgba(0,0,0,0.5)",
            }}
          >
            {/* Tag Garis Oranye & Counter Badge */}
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
                {categories.length} categories · {articles.length} articles
              </span>
            </div>

            {/* Judul Utama */}
            <h1
              className="fw-bolder text-white mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "-0.02em" }}
            >
              MineGens Wiki
            </h1>

            {/* Subtitle */}
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

              {categories.map((cat) => {
                const count = categoryCounts[cat.slug] || 0;
                const isSelected = activeFilter === cat.slug;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveFilter(isSelected ? "all" : cat.slug)}
                    className="btn btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-2 border"
                    style={{
                      backgroundColor: isSelected ? "rgba(234, 88, 12, 0.18)" : "#0d0e11",
                      borderColor: isSelected ? "#ea580c" : "rgba(255, 255, 255, 0.06)",
                      color: isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
                      fontSize: "12.5px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span style={{ fontSize: "13px" }}>{cat.icon || "📁"}</span>
                    <span>{cat.name}</span>
                    <span className="text-white-50" style={{ fontSize: "11px" }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===================== SECTION & CARD WIKI ===================== */}
          {loading && (
            <div className="text-center py-5 text-white-50 small">
              Memuat artikel wiki...
            </div>
          )}

          {!loading && totalGroupsWithContent === 0 && (
            <div
              className="p-5 text-center rounded-4 border text-white-50 small"
              style={{ backgroundColor: "#141518", borderColor: "rgba(255, 255, 255, 0.06)" }}
            >
              {searchQuery
                ? `Tidak ada artikel yang cocok dengan pencarian "${searchQuery}".`
                : "Belum ada artikel panduan dalam kategori ini."}
            </div>
          )}

          {!loading &&
            Object.entries(groupedCategories).map(([slug, group]) => {
              const { config, items } = group;

              return (
                <section key={slug} className="mb-5">
                  {/* Category Section Header */}
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
                      {config.icon || "📁"}
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <h2
                        className="h5 fw-bold text-white mb-0"
                        style={{ fontSize: "18px", letterSpacing: "-0.01em" }}
                      >
                        {config.name}
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

                  {/* Category Description */}
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
                            <InlineMarkdown content={art.title} />
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