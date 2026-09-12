import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar.jsx";
import Footer from "../common/Footer.jsx";
import MarkdownRenderer from "../common/MarkdownRenderer.jsx";
import InlineMarkdown from "../common/InlineMarkdown.jsx";

const DEFAULT_BANNER = "/Discord_Banner_Minegens_2.png";

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`http://127.0.0.1:8000/api/news/${id}`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Berita tidak ditemukan");
        return res.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil detail berita:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div
      className="text-white min-vh-100 d-flex flex-column justify-content-between"
      style={{ backgroundColor: "#0f172a" }}
    >
      <Navbar />

      <main className="container-xl py-5 flex-grow-1" style={{ marginTop: "90px" }}>
        <div className="mx-auto" style={{ maxWidth: "860px" }}>
          {/* Tombol Navigasi Kembali */}
          <button
            onClick={() => navigate(-1)}
            className="btn text-white-50 border border-white border-opacity-10 rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 small mb-4 shadow-sm"
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
            <span className="fw-medium">Kembali</span>
          </button>

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center py-5 text-white-50 small">
              Memuat isi berita...
            </div>
          )}

          {/* Not Found State */}
          {!loading && !article && (
            <div className="text-center py-5 text-white-50">
              <h4 className="fw-bold mb-3">Berita tidak ditemukan</h4>
              <Link
                to="/news"
                className="btn btn-primary btn-sm px-4 py-2 rounded-2"
                style={{ backgroundColor: "#2f74ff", border: "none" }}
              >
                Kembali ke Arsip Berita
              </Link>
            </div>
          )}

          {/* Article Full View */}
          {!loading && article && (
            <article>
              {/* Header Meta */}
              <div className="d-flex align-items-center gap-2 mb-2">
                <span
                  className="small text-uppercase fw-semibold"
                  style={{ color: "#2f74ff", letterSpacing: "0.08em" }}
                >
                  Announcement
                </span>
                <span className="text-white-50 small">•</span>
                <span className="text-white-50 small">
                  {article.published_at || article.created_at
                    ? new Date(article.published_at || article.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "—"}
                </span>
              </div>

              {/* Judul Berita Mendukung Markdown */}
              <h1 className="h2 fw-bold text-white mb-4" style={{ lineHeight: "1.3" }}>
                <InlineMarkdown content={article.title} />
              </h1>

              {/* Banner Image */}
              <div
                className="rounded-3 overflow-hidden border border-white border-opacity-10 mb-4 shadow"
                style={{ maxHeight: "420px", backgroundColor: "#161b26" }}
              >
                <img
                  src={article.image || DEFAULT_BANNER}
                  alt={article.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_BANNER;
                  }}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Konten Lengkap (Markdown) */}
              <div
                className="p-4 p-md-5 rounded-3 border border-white border-opacity-10 shadow-sm"
                style={{ backgroundColor: "#161b26" }}
              >
                <MarkdownRenderer content={article.full_content || article.fullContent} />
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}