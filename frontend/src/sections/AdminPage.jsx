import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar.jsx";
import Footer from "../common/Footer.jsx";

const DEFAULT_BANNER = "/Discord_Banner_Minegens_2.png";

const WIKI_CATEGORIES = [
  { value: "general", label: "Supporting Minegens" },
  { value: "oneblock", label: "OneBlock" },
  { value: "tycoon", label: "Tycoon" },
  { value: "rpg", label: "Survival RPG" },
  { value: "sf", label: "Survival SF" },
  { value: "vanilla", label: "Vanilla" },
];

const categoryLabels = {
  general: "Supporting Minegens",
  oneblock: "OneBlock",
  tycoon: "Tycoon",
  rpg: "Survival RPG",
  sf: "Survival SF",
  vanilla: "Vanilla",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("news"); // 'news' | 'wiki'
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");

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
  const [wikiCategory, setWikiCategory] = useState("general");
  const [wikiBadge, setWikiBadge] = useState("Guide");
  const [wikiTitle, setWikiTitle] = useState("");
  const [wikiShortDesc, setWikiShortDesc] = useState("");
  const [wikiFullContent, setWikiFullContent] = useState("");
  const [wikiSubmitting, setWikiSubmitting] = useState(false);
  const [wikiLoading, setWikiLoading] = useState(true);

  // ===================== FETCH DATA =====================
  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/news", {
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      setNews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal mengambil daftar berita:", err);
    } finally {
      setNewsLoading(false);
    }
  }, []);

  const fetchWikis = useCallback(async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/wikis", {
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      setWikis(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal mengambil daftar wiki:", err);
    } finally {
      setWikiLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchNews();
    fetchWikis();
  }, [token, navigate, fetchNews, fetchWikis]);

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
    setNewsImage(item.image === DEFAULT_BANNER ? "" : item.image || "");
    setNewsShortDesc(item.short_desc || item.shortDesc || "");
    setNewsFullContent(item.full_content || item.fullContent || "");

    if (item.published_at) {
      const d = new Date(item.published_at);
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
    const url = isEditing
      ? `http://127.0.0.1:8000/api/news/${newsEditingId}`
      : "http://127.0.0.1:8000/api/news";
    const method = isEditing ? "PUT" : "POST";
    const finalImage = newsImage.trim() ? newsImage.trim() : DEFAULT_BANNER;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newsTitle.trim(),
          image: finalImage,
          short_desc: newsShortDesc.trim(),
          full_content: newsFullContent.trim(),
          published_at: newsPublishedAt ? newsPublishedAt : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan berita");

      alert(isEditing ? "Berita berhasil diperbarui!" : "Berita berhasil diterbitkan!");
      resetNewsForm();
      fetchNews();
    } catch (err) {
      alert(err.message);
    } finally {
      setNewsSubmitting(false);
    }
  };

  const handleNewsDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus berita ini?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/news/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        if (newsEditingId === id) resetNewsForm();
        setNews((prev) => prev.filter((item) => item.id !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Gagal menghapus berita.");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus berita.");
    }
  };

  // ===================== WIKI HANDLERS =====================
  const resetWikiForm = () => {
    setWikiEditingId(null);
    setWikiCategory("general");
    setWikiBadge("Guide");
    setWikiTitle("");
    setWikiShortDesc("");
    setWikiFullContent("");
  };

  const handleEditWikiClick = (item) => {
    setWikiEditingId(item.id);
    setWikiCategory(item.category || "general");
    setWikiBadge(item.badge || "Guide");
    setWikiTitle(item.title || "");
    setWikiShortDesc(item.short_desc || "");
    setWikiFullContent(item.full_content || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWikiSubmit = async (e) => {
    e.preventDefault();
    setWikiSubmitting(true);

    const isEditing = Boolean(wikiEditingId);
    const url = isEditing
      ? `http://127.0.0.1:8000/api/wikis/${wikiEditingId}`
      : "http://127.0.0.1:8000/api/wikis";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: wikiCategory,
          badge: wikiBadge.trim() || "Guide",
          title: wikiTitle.trim(),
          short_desc: wikiShortDesc.trim(),
          full_content: wikiFullContent.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan artikel wiki");

      alert(isEditing ? "Artikel wiki berhasil diperbarui!" : "Artikel wiki berhasil ditambahkan!");
      resetWikiForm();
      fetchWikis();
    } catch (err) {
      alert(err.message);
    } finally {
      setWikiSubmitting(false);
    }
  };

  const handleWikiDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus artikel wiki ini?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/wikis/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        if (wikiEditingId === id) resetWikiForm();
        setWikis((prev) => prev.filter((item) => item.id !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Gagal menghapus wiki.");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus artikel wiki.");
    }
  };

  // ===================== LOGOUT =====================
  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout request error:", err);
    } finally {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      navigate("/login");
    }
  };

  return (
    <div
      className="text-white min-vh-100 d-flex flex-column justify-content-between"
      style={{ backgroundColor: "#0b0f17" }}
    >
      <Navbar />

      <main className="container-xl py-5 flex-grow-1" style={{ marginTop: "90px" }}>
        {/* Header Console */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pb-4 mb-4 border-bottom border-white border-opacity-10">
          <div>
            <span className="small text-uppercase fw-semibold" style={{ color: "#2f74ff", letterSpacing: "0.08em" }}>
              Staff Control Panel
            </span>
            <h1 className="h3 fw-bold text-white mb-1">MineGens Management Center</h1>
            <p className="text-white-50 small mb-0">
              Pusat pengelolaan berita dan pangkalan data ensiklopedia (Wiki).
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger btn-sm px-3 py-2 rounded-pill fw-semibold"
          >
            Logout
          </button>
        </div>

        {/* Tab Switcher (News vs Wiki) */}
        <div className="d-flex align-items-center gap-2 mb-5">
          <button
            onClick={() => setActiveTab("news")}
            className="btn btn-sm rounded-pill px-4 py-2 fw-semibold"
            style={{
              backgroundColor: activeTab === "news" ? "#2f74ff" : "rgba(255, 255, 255, 0.04)",
              color: activeTab === "news" ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
              border: "1px solid",
              borderColor: activeTab === "news" ? "#2f74ff" : "rgba(255, 255, 255, 0.08)",
              transition: "all 0.2s ease",
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
              transition: "all 0.2s ease",
            }}
          >
            📚 Manage Wiki ({wikis.length})
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: NEWS MANAGER                                            */}
        {/* ============================================================== */}
        {activeTab === "news" && (
          <div className="row g-5">
            {/* Form Berita */}
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
                      style={{ fontSize: "12px" }}
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
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="small text-white-50">URL Gambar Thumbnail</label>
                      <span className="badge bg-secondary bg-opacity-25 text-white-50 border border-white border-opacity-10" style={{ fontSize: "11px" }}>
                        Opsional
                      </span>
                    </div>
                    <input
                      type="url"
                      value={newsImage}
                      onChange={(e) => setNewsImage(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="https://... (kosongkan untuk banner Discord)"
                    />
                  </div>

                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="small text-white-50">Waktu Rilis / Tanggal</label>
                      <span className="badge bg-secondary bg-opacity-25 text-white-50 border border-white border-opacity-10" style={{ fontSize: "11px" }}>
                        Opsional
                      </span>
                    </div>
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
                      placeholder="1-2 kalimat ringkasan kartu depan..."
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
                      placeholder="Tempel teks Markdown langsung di sini..."
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

            {/* List Berita */}
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
                            src={item.image || DEFAULT_BANNER}
                            alt={item.title}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = DEFAULT_BANNER;
                            }}
                            className="rounded-2 flex-shrink-0"
                            style={{ width: "58px", height: "58px", objectFit: "cover" }}
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
            {/* Form Wiki */}
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
                      style={{ fontSize: "12px" }}
                    >
                      Batal Edit ✕
                    </button>
                  )}
                </div>

                <form onSubmit={handleWikiSubmit} className="d-flex flex-column gap-3">
                  {/* Kategori */}
                  <div>
                    <label className="small text-white-50 mb-1">Kategori / Realm</label>
                    <select
                      value={wikiCategory}
                      onChange={(e) => setWikiCategory(e.target.value)}
                      className="form-select text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                    >
                      {WIKI_CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Badge Label */}
                  <div>
                    <label className="small text-white-50 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={wikiBadge}
                      onChange={(e) => setWikiBadge(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="Contoh: Economy, Game Mode, Commands..."
                    />
                  </div>

                  {/* Judul Artikel */}
                  <div>
                    <label className="small text-white-50 mb-1">Judul Artikel</label>
                    <input
                      type="text"
                      required
                      value={wikiTitle}
                      onChange={(e) => setWikiTitle(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="Contoh: Gens Tycoon: Dawn Of Infinity Sword"
                    />
                  </div>

                  {/* Deskripsi Singkat */}
                  <div>
                    <label className="small text-white-50 mb-1">Ringkasan Singkat</label>
                    <textarea
                      rows={2}
                      required
                      value={wikiShortDesc}
                      onChange={(e) => setWikiShortDesc(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2"
                      style={{ backgroundColor: "#0b0f17" }}
                      placeholder="Ringkasan singkat untuk tampilan kartu..."
                    />
                  </div>

                  {/* Konten Lengkap */}
                  <div>
                    <label className="small text-white-50 mb-1">Konten Panduan Lengkap (Markdown)</label>
                    <textarea
                      rows={10}
                      required
                      value={wikiFullContent}
                      onChange={(e) => setWikiFullContent(e.target.value)}
                      className="form-control text-white border-white border-opacity-10 rounded-2 font-monospace"
                      style={{ backgroundColor: "#0b0f17", fontSize: "13px" }}
                      placeholder="Tempel seluruh format Markdown (tabel, heading, flow progression) di sini..."
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

            {/* List Wiki */}
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
                  Belum ada artikel wiki. Silakan tambahkan melalui form di samping.
                </div>
              )}

              {!wikiLoading && wikis.length > 0 && (
                <div className="d-flex flex-column gap-3">
                  {wikis.map((item) => {
                    const isCurrent = wikiEditingId === item.id;
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
                              {categoryLabels[item.category] || item.category}
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

      </main>

      <Footer />
    </div>
  );
}