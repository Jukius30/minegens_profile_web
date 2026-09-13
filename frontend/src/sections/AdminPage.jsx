import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar.jsx";
import Footer from "../common/Footer.jsx";
import { supabase } from "../supabaseClient";

const DEFAULT_BANNER = "/Discord_Banner_Minegens_2.png";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("news"); // 'news' | 'wiki' | 'categories'
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  // ===================== CATEGORIES STATE =====================
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catIcon, setCatIcon] = useState("📁");
  const [catDesc, setCatDesc] = useState("");
  const [catSubmitting, setCatSubmitting] = useState(false);

  // ===================== NEWS STATE =====================
  const [news, setNews] = useState([]);
  const [newsEditingId, setNewsEditingId] = useState(null);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [newsShortDesc, setNewsShortDesc] = useState("");
  const [newsFullContent, setNewsFullContent] = useState("");
  const [newsPublishedAt, setNewsPublishedAt] = useState("");
  const [newsSubmitting, setNewsSubmitting] = useState(false);
  const [newsLoading, setNewsLoading] = useState(true);

  // ===================== WIKI STATE =====================
  const [wikis, setWikis] = useState([]);
  const [wikiEditingId, setWikiEditingId] = useState(null);
  const [wikiCategory, setWikiCategory] = useState("");
  const [wikiBadge, setWikiBadge] = useState("Guide");
  const [wikiTitle, setWikiTitle] = useState("");
  const [wikiShortDesc, setWikiShortDesc] = useState("");
  const [wikiFullContent, setWikiFullContent] = useState("");
  const [wikiSubmitting, setWikiSubmitting] = useState(false);
  const [wikiLoading, setWikiLoading] = useState(true);

  // ===================== FETCH DATA VIA SUPABASE =====================
  const fetchCategories = useCallback(async () => {
    try {
      setCatLoading(true);
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;

      if (Array.isArray(data)) {
        setCategories(data);
        if (data.length > 0 && !wikiCategory) {
          setWikiCategory(data[0].slug);
        }
      }
    } catch (err) {
      console.error("Gagal mengambil data kategori:", err.message);
    } finally {
      setCatLoading(false);
    }
  }, [wikiCategory]);

  const fetchNews = useCallback(async () => {
    try {
      setNewsLoading(true);
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal mengambil daftar berita:", err.message);
    } finally {
      setNewsLoading(false);
    }
  }, []);

  const fetchWikis = useCallback(async () => {
    try {
      setWikiLoading(true);
      const { data, error } = await supabase
        .from("wikis")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWikis(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal mengambil daftar wiki:", err.message);
    } finally {
      setWikiLoading(false);
    }
  }, []);

  // ===================== AUTH SESSION CHECK =====================
  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setAuthLoading(false);
      fetchCategories();
      fetchNews();
      fetchWikis();
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, fetchCategories, fetchNews, fetchWikis]);

  // ===================== CATEGORY HANDLERS =====================
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setCatSubmitting(true);

    const generatedSlug =
      catSlug.trim() ||
      catName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    try {
      const { error } = await supabase.from("categories").insert([
        {
          name: catName.trim(),
          slug: generatedSlug,
          icon: catIcon.trim() || "📁",
          description: catDesc.trim(),
        },
      ]);

      if (error) throw error;

      alert("Kategori berhasil ditambahkan!");
      setCatName("");
      setCatSlug("");
      setCatIcon("📁");
      setCatDesc("");
      fetchCategories();
    } catch (err) {
      alert("Gagal menambahkan kategori: " + err.message);
    } finally {
      setCatSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (!window.confirm(`Yakin ingin menghapus kategori "${name}"?`)) return;

    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;

      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Gagal menghapus kategori: " + err.message);
    }
  };

  // ===================== NEWS HANDLERS =====================
  const resetNewsForm = () => {
    setNewsEditingId(null);
    setNewsTitle("");
    setNewsImage("");
    setNewsShortDesc("");
    setNewsFullContent("");
    setNewsPublishedAt("");
  };

  const handleEditNewsClick = (item) => {
    setNewsEditingId(item.id);
    setNewsTitle(item.title || "");
    setNewsImage(
      item.image_url === DEFAULT_BANNER || item.image === DEFAULT_BANNER
        ? ""
        : item.image_url || item.image || ""
    );
    setNewsShortDesc(item.short_desc || item.shortDesc || "");
    setNewsFullContent(item.full_content || item.fullContent || "");

    const dateVal = item.published_at || item.created_at;
    if (dateVal) {
      const d = new Date(dateVal);
      const formatted = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setNewsPublishedAt(formatted);
    } else {
      setNewsPublishedAt("");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    setNewsSubmitting(true);

    const isEditing = Boolean(newsEditingId);
    const finalImage = newsImage.trim() ? newsImage.trim() : DEFAULT_BANNER;

    const payload = {
      title: newsTitle.trim(),
      image: finalImage,
      short_desc: newsShortDesc.trim(),
      full_content: newsFullContent.trim(),
      published_at: newsPublishedAt ? new Date(newsPublishedAt).toISOString() : null,
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from("news")
          .update(payload)
          .eq("id", newsEditingId);

        if (error) throw error;
        alert("Berita berhasil diperbarui!");
      } else {
        const { error } = await supabase.from("news").insert([payload]);
        if (error) throw error;
        alert("Berita berhasil diterbitkan!");
      }

      resetNewsForm();
      fetchNews();
    } catch (err) {
      alert("Gagal menyimpan berita: " + err.message);
    } finally {
      setNewsSubmitting(false);
    }
  };

  const handleNewsDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus berita ini?")) return;

    try {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw error;

      if (newsEditingId === id) resetNewsForm();
      setNews((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Gagal menghapus berita: " + err.message);
    }
  };

  // ===================== WIKI HANDLERS =====================
  const resetWikiForm = () => {
    setWikiEditingId(null);
    setWikiCategory(categories.length > 0 ? categories[0].slug : "");
    setWikiBadge("Guide");
    setWikiTitle("");
    setWikiShortDesc("");
    setWikiFullContent("");
  };

  const handleEditWikiClick = (item) => {
    setWikiEditingId(item.id);
    setWikiCategory(item.category || (categories[0] ? categories[0].slug : ""));
    setWikiBadge(item.badge || "Guide");
    setWikiTitle(item.title || "");
    setWikiShortDesc(item.short_desc || "");
    setWikiFullContent(item.full_content || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWikiSubmit = async (e) => {
    e.preventDefault();
    if (!wikiCategory) {
      alert("Silakan pilih kategori terlebih dahulu!");
      return;
    }

    setWikiSubmitting(true);
    const isEditing = Boolean(wikiEditingId);

    const payload = {
      category: wikiCategory,
      badge: wikiBadge.trim() || "Guide",
      title: wikiTitle.trim(),
      short_desc: wikiShortDesc.trim(),
      full_content: wikiFullContent.trim(),
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from("wikis")
          .update(payload)
          .eq("id", wikiEditingId);

        if (error) throw error;
        alert("Artikel wiki berhasil diperbarui!");
      } else {
        const { error } = await supabase.from("wikis").insert([payload]);
        if (error) throw error;
        alert("Artikel wiki berhasil ditambahkan!");
      }

      resetWikiForm();
      fetchWikis();
    } catch (err) {
      alert("Gagal menyimpan artikel wiki: " + err.message);
    } finally {
      setWikiSubmitting(false);
    }
  };

  const handleWikiDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus artikel wiki ini?")) return;

    try {
      const { error } = await supabase.from("wikis").delete().eq("id", id);
      if (error) throw error;

      if (wikiEditingId === id) resetWikiForm();
      setWikis((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Gagal menghapus wiki: " + err.message);
    }
  };

  // ===================== LOGOUT =====================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (authLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center min-vh-100 text-white-50"
        style={{ backgroundColor: "#0b0f17" }}
      >
        Memverifikasi akses kontrol panel...
      </div>
    );
  }

  return (
    <div
      className="text-white min-vh-100 d-flex flex-column justify-content-between"
      style={{ backgroundColor: "#0b0f17" }}
    >
      <Navbar />

      <main className="container-xl py-5 flex-grow-1" style={{ marginTop: "90px" }}>
        {/* Header Dashboard */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pb-4 mb-4 border-bottom border-white border-opacity-10">
          <div>
            <span
              className="small text-uppercase fw-semibold"
              style={{ color: "#2f74ff", letterSpacing: "0.08em" }}
            >
              Control Panel
            </span>
            <h1 className="h3 fw-bold text-white mb-1">MineGens Management Center</h1>
            <p className="text-white-50 small mb-0">
              Kelola berita server, kategori panduan, dan artikel wiki ensiklopedia.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger btn-sm px-3 py-2 rounded-pill fw-semibold"
          >
            Logout
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="d-flex flex-wrap align-items-center gap-2 mb-5">
          <button
            onClick={() => setActiveTab("news")}
            className="btn btn-sm rounded-pill px-4 py-2 fw-semibold"
            style={{
              backgroundColor: activeTab === "news" ? "#2f74ff" : "rgba(255, 255, 255, 0.04)",
              color: activeTab === "news" ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
              border: "1px solid",
              borderColor: activeTab === "news" ? "#2f74ff" : "rgba(255, 255, 255, 0.08)",
            }}
          >
            📰 Manage News ({news.length})
          </button>

          <button
            onClick={() => setActiveTab("wiki")}
            className="btn btn-sm rounded-pill px-4 py-2 fw-semibold"
            style={{
              backgroundColor: activeTab === "wiki" ? "#2f74ff" : "rgba(255, 255, 255, 0.04)",
              color: activeTab === "wiki" ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
              border: "1px solid",
              borderColor: activeTab === "wiki" ? "#2f74ff" : "rgba(255, 255, 255, 0.08)",
            }}
          >
            📚 Manage Wiki Articles ({wikis.length})
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className="btn btn-sm rounded-pill px-4 py-2 fw-semibold"
            style={{
              backgroundColor: activeTab === "categories" ? "#ea580c" : "rgba(255, 255, 255, 0.04)",
              color: activeTab === "categories" ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
              border: "1px solid",
              borderColor: activeTab === "categories" ? "#ea580c" : "rgba(255, 255, 255, 0.08)",
            }}
          >
            🏷️ Manage Categories ({categories.length})
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: NEWS MANAGER                                            */}
        {/* ============================================================== */}
        {activeTab === "news" && (
          <div className="row g-5">
            <div className="col-12 col-lg-5">
              <div
                className="p-4 rounded-4 border shadow-sm"
                style={{ backgroundColor: "#131823", borderColor: "rgba(255, 255, 255, 0.08)" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h6 fw-bold text-white mb-0">
                    {newsEditingId ? "Edit Berita" : "Buat Berita Baru"}
                  </h2>
                  {newsEditingId && (
                    <button
                      type="button"
                      onClick={resetNewsForm}
                      className="btn btn-sm btn-link text-white-50 text-decoration-none p-0"
                    >
                      Batal Edit ✕
                    </button>
                  )}
                </div>

                <form onSubmit={handleNewsSubmit} className="d-flex flex-column gap-3">
                  <div>
                    <label className="small text-white-50 mb-1">Judul Berita</label>
                    <input
                      type="text"
                      required
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="Contoh: Season 4 Update..."
                    />
                  </div>

                  <div>
                    <label className="small text-white-50 mb-1">URL Gambar Thumbnail</label>
                    <input
                      type="url"
                      value={newsImage}
                      onChange={(e) => setNewsImage(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="https://... (kosongkan untuk banner default)"
                    />
                  </div>

                  <div>
                    <label className="small text-white-50 mb-1">Waktu Rilis / Tanggal</label>
                    <input
                      type="datetime-local"
                      value={newsPublishedAt}
                      onChange={(e) => setNewsPublishedAt(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17", colorScheme: "dark" }}
                    />
                  </div>

                  <div>
                    <label className="small text-white-50 mb-1">Deskripsi Singkat</label>
                    <textarea
                      rows={2}
                      required
                      value={newsShortDesc}
                      onChange={(e) => setNewsShortDesc(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="Ringkasan kartu depan..."
                    />
                  </div>

                  <div>
                    <label className="small text-white-50 mb-1">Isi Berita Lengkap (Markdown)</label>
                    <textarea
                      rows={8}
                      required
                      value={newsFullContent}
                      onChange={(e) => setNewsFullContent(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2 font-monospace"
                      style={{ backgroundColor: "#0b0f17", fontSize: "13px" }}
                      placeholder="Tempel teks Markdown lengkap di sini..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={newsSubmitting}
                    className="btn btn-primary mt-2 py-2 fw-semibold rounded-2"
                    style={{ backgroundColor: newsEditingId ? "#10b981" : "#2f74ff", border: "none" }}
                  >
                    {newsSubmitting ? "Menyimpan..." : newsEditingId ? "Perbarui Berita" : "Terbitkan Berita"}
                  </button>
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <h2 className="h6 fw-bold text-white mb-3">Daftar Berita Aktif ({news.length})</h2>

              {newsLoading && (
                <div className="text-center py-5 text-white-50 small">Memuat daftar berita...</div>
              )}

              {!newsLoading && news.length === 0 && (
                <div
                  className="p-5 text-center rounded-4 border text-white-50 small"
                  style={{ backgroundColor: "#131823", borderColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  Belum ada berita yang diterbitkan.
                </div>
              )}

              {!newsLoading && news.length > 0 && (
                <div className="d-flex flex-column gap-3">
                  {news.map((item) => {
                    const displayDate = item.published_at || item.created_at;
                    const isCurrent = newsEditingId === item.id;
                    const imgSrc = item.image_url || item.image || DEFAULT_BANNER;

                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-3 border d-flex align-items-center justify-content-between gap-3"
                        style={{
                          backgroundColor: "#131823",
                          borderColor: isCurrent ? "#2f74ff" : "rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <div className="d-flex align-items-center gap-3 overflow-hidden">
                          <img
                            src={imgSrc}
                            alt={item.title}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = DEFAULT_BANNER;
                            }}
                            className="rounded-2 flex-shrink-0"
                            style={{ width: "54px", height: "54px", objectFit: "cover" }}
                          />
                          <div className="text-truncate">
                            <div className="fw-semibold text-white text-truncate mb-1">{item.title}</div>
                            <div className="text-white-50" style={{ fontSize: "11px" }}>
                              📅 {displayDate ? new Date(displayDate).toLocaleDateString("id-ID") : "—"}
                            </div>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2 flex-shrink-0">
                          <button onClick={() => handleEditNewsClick(item)} className="btn btn-sm btn-outline-primary border-0 px-2">
                            Edit
                          </button>
                          <button onClick={() => handleNewsDelete(item.id)} className="btn btn-sm btn-outline-danger border-0 px-2">
                            Hapus
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: WIKI MANAGER                                            */}
        {/* ============================================================== */}
        {activeTab === "wiki" && (
          <div className="row g-5">
            <div className="col-12 col-lg-5">
              <div
                className="p-4 rounded-4 border shadow-sm"
                style={{ backgroundColor: "#131823", borderColor: "rgba(255, 255, 255, 0.08)" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h6 fw-bold text-white mb-0">
                    {wikiEditingId ? "Edit Artikel Wiki" : "Tambah Artikel Wiki"}
                  </h2>
                  {wikiEditingId && (
                    <button
                      type="button"
                      onClick={resetWikiForm}
                      className="btn btn-sm btn-link text-white-50 text-decoration-none p-0"
                    >
                      Batal Edit ✕
                    </button>
                  )}
                </div>

                <form onSubmit={handleWikiSubmit} className="d-flex flex-column gap-3">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="small text-white-50">Kategori / Realm</label>
                      <button
                        type="button"
                        onClick={() => setActiveTab("categories")}
                        className="btn btn-link p-0 text-decoration-none"
                        style={{ fontSize: "11px", color: "#ea580c" }}
                      >
                        + Tambah Kategori
                      </button>
                    </div>
                    <select
                      value={wikiCategory}
                      onChange={(e) => setWikiCategory(e.target.value)}
                      className="form-select text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.icon} {cat.name} ({cat.slug})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="small text-white-50 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={wikiBadge}
                      onChange={(e) => setWikiBadge(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="Contoh: Economy, Commands, Guide..."
                    />
                  </div>

                  <div>
                    <label className="small text-white-50 mb-1">Judul Artikel</label>
                    <input
                      type="text"
                      required
                      value={wikiTitle}
                      onChange={(e) => setWikiTitle(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="Contoh: Auction House (AH) Guide"
                    />
                  </div>

                  <div>
                    <label className="small text-white-50 mb-1">Ringkasan Singkat</label>
                    <textarea
                      rows={2}
                      required
                      value={wikiShortDesc}
                      onChange={(e) => setWikiShortDesc(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="1-2 kalimat untuk deskripsi card..."
                    />
                  </div>

                  <div>
                    <label className="small text-white-50 mb-1">Konten Panduan Lengkap (Markdown)</label>
                    <textarea
                      rows={10}
                      required
                      value={wikiFullContent}
                      onChange={(e) => setWikiFullContent(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2 font-monospace"
                      style={{ backgroundColor: "#0b0f17", fontSize: "13px" }}
                      placeholder="Tempel seluruh konten format Markdown di sini..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={wikiSubmitting}
                    className="btn btn-primary mt-2 py-2 fw-semibold rounded-2"
                    style={{ backgroundColor: wikiEditingId ? "#10b981" : "#2f74ff", border: "none" }}
                  >
                    {wikiSubmitting ? "Menyimpan..." : wikiEditingId ? "Perbarui Wiki" : "Tambah Artikel Wiki"}
                  </button>
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <h2 className="h6 fw-bold text-white mb-3">Daftar Panduan Wiki ({wikis.length})</h2>

              {wikiLoading && (
                <div className="text-center py-5 text-white-50 small">Memuat daftar wiki...</div>
              )}

              {!wikiLoading && wikis.length === 0 && (
                <div
                  className="p-5 text-center rounded-4 border text-white-50 small"
                  style={{ backgroundColor: "#131823", borderColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  Belum ada artikel wiki.
                </div>
              )}

              {!wikiLoading && wikis.length > 0 && (
                <div className="d-flex flex-column gap-3">
                  {wikis.map((item) => {
                    const isCurrent = wikiEditingId === item.id;
                    const catObj = categories.find((c) => c.slug === item.category);

                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-3 border d-flex align-items-center justify-content-between gap-3 shadow-sm"
                        style={{
                          backgroundColor: "#131823",
                          borderColor: isCurrent ? "#2f74ff" : "rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <div className="overflow-hidden">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <span
                              className="badge text-uppercase"
                              style={{
                                backgroundColor: "rgba(47, 116, 255, 0.15)",
                                color: "#2f74ff",
                                fontSize: "10px",
                              }}
                            >
                              {catObj ? `${catObj.icon} ${catObj.name}` : item.category}
                            </span>
                            <span className="text-white-50 small" style={{ fontSize: "11px" }}>
                              • {item.badge || "Guide"}
                            </span>
                          </div>
                          <div className="fw-semibold text-white text-truncate mb-1">{item.title}</div>
                          <div className="text-white-50 small text-truncate" style={{ fontSize: "12px" }}>
                            {item.short_desc}
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2 flex-shrink-0">
                          <button onClick={() => handleEditWikiClick(item)} className="btn btn-sm btn-outline-primary border-0 px-2">
                            Edit
                          </button>
                          <button onClick={() => handleWikiDelete(item.id)} className="btn btn-sm btn-outline-danger border-0 px-2">
                            Hapus
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CATEGORIES MANAGER                                      */}
        {/* ============================================================== */}
        {activeTab === "categories" && (
          <div className="row g-5">
            <div className="col-12 col-lg-5">
              <div
                className="p-4 rounded-4 border shadow-sm"
                style={{ backgroundColor: "#131823", borderColor: "rgba(255, 255, 255, 0.08)" }}
              >
                <h2 className="h6 fw-bold text-white mb-3">Tambah Kategori Baru</h2>

                <form onSubmit={handleCreateCategory} className="d-flex flex-column gap-3">
                  <div>
                    <label className="small text-white-50 mb-1">Nama Kategori</label>
                    <input
                      type="text"
                      required
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="Contoh: Survival RPG, Prison, Clans..."
                    />
                  </div>

                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="small text-white-50">Slug Identifier</label>
                      <span className="badge bg-secondary bg-opacity-25 text-white-50" style={{ fontSize: "10px" }}>
                        Opsional (Auto)
                      </span>
                    </div>
                    <input
                      type="text"
                      value={catSlug}
                      onChange={(e) => setCatSlug(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="rpg, prison, clans (huruf kecil & strip)"
                    />
                  </div>

                  <div>
                    <label className="small text-white-50 mb-1">Icon / Simbol (Emoji)</label>
                    <input
                      type="text"
                      value={catIcon}
                      onChange={(e) => setCatIcon(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="⭐, 🗡️, 💰, 🔑, 🚀, 📜"
                    />
                  </div>

                  <div>
                    <label className="small text-white-50 mb-1">Deskripsi Kategori</label>
                    <textarea
                      rows={3}
                      value={catDesc}
                      onChange={(e) => setCatDesc(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="Deskripsi singkat yang tampil di bawah judul kategori pada halaman wiki..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={catSubmitting}
                    className="btn mt-2 py-2 fw-semibold rounded-2 text-white"
                    style={{ backgroundColor: "#ea580c", border: "none" }}
                  >
                    {catSubmitting ? "Menyimpan..." : "Simpan Kategori"}
                  </button>
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <h2 className="h6 fw-bold text-white mb-3">Daftar Kategori Tersimpan ({categories.length})</h2>

              {catLoading && (
                <div className="text-center py-5 text-white-50 small">Memuat kategori...</div>
              )}

              {!catLoading && categories.length === 0 && (
                <div
                  className="p-5 text-center rounded-4 border text-white-50 small"
                  style={{ backgroundColor: "#131823", borderColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  Belum ada kategori tersimpan di database.
                </div>
              )}

              {!catLoading && categories.length > 0 && (
                <div className="d-flex flex-column gap-3">
                  {categories.map((cat) => {
                    const articleCount = wikis.filter((w) => w.category === cat.slug).length;

                    return (
                      <div
                        key={cat.id}
                        className="p-3 rounded-3 border d-flex align-items-center justify-content-between gap-3"
                        style={{
                          backgroundColor: "#131823",
                          borderColor: "rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <div className="d-flex align-items-center gap-3 overflow-hidden">
                          <div
                            className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                              width: "42px",
                              height: "42px",
                              backgroundColor: "rgba(234, 88, 12, 0.12)",
                              border: "1px solid rgba(234, 88, 12, 0.25)",
                              fontSize: "20px",
                            }}
                          >
                            {cat.icon}
                          </div>
                          <div className="text-truncate">
                            <div className="d-flex align-items-center gap-2">
                              <span className="fw-semibold text-white">{cat.name}</span>
                              <code className="text-white-50 small" style={{ fontSize: "11px" }}>
                                {cat.slug}
                              </code>
                            </div>
                            <div className="text-white-50 small text-truncate" style={{ fontSize: "12px" }}>
                              {cat.description || "Tidak ada deskripsi"}
                            </div>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-3 flex-shrink-0">
                          <span
                            className="badge rounded-pill text-white-50"
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.06)", fontSize: "11px" }}
                          >
                            {articleCount} artikel
                          </span>

                          <button
                            onClick={() => handleDeleteCategory(cat.id, cat.name)}
                            className="btn btn-sm btn-outline-danger border-0 px-2"
                            title="Hapus Kategori"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}