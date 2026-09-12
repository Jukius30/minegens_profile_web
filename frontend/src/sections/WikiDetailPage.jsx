import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar.jsx";
import Footer from "../common/Footer.jsx";
import MarkdownRenderer from "../common/MarkdownRenderer.jsx";
import InlineMarkdown from "../common/InlineMarkdown.jsx";

const categoryLabels = {
  general: "Supporting Minegens",
  oneblock: "OneBlock",
  tycoon: "Tycoon",
  rpg: "Survival RPG",
  sf: "Survival SF",
  vanilla: "Vanilla",
};

export default function WikiDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wiki, setWiki] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`http://127.0.0.1:8000/api/wikis/${id}`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Artikel panduan tidak ditemukan");
        return res.json();
      })
      .then((data) => {
        setWiki(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat wiki:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div
      className="text-white min-vh-100 d-flex flex-column justify-content-between"
      style={{ backgroundColor: "#0b0f17" }}
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
              Memuat isi panduan...
            </div>
          )}

          {/* Not Found State */}
          {!loading && !wiki && (
            <div className="text-center py-5 text-white-50">
              <h4 className="fw-bold mb-3">Artikel wiki tidak ditemukan</h4>
              <Link
                to="/wiki"
                className="btn btn-primary btn-sm px-4 py-2 rounded-2"
                style={{ backgroundColor: "#2f74ff", border: "none" }}
              >
                Kembali ke Ensiklopedia Wiki
              </Link>
            </div>
          )}

          {/* Full Page Wiki View */}
          {!loading && wiki && (
            <article>
              {/* Header Meta Badge */}
              <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                <span
                  className="badge text-uppercase px-2 py-1"
                  style={{
                    backgroundColor: "rgba(47, 116, 255, 0.15)",
                    color: "#2f74ff",
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {categoryLabels[wiki.category] || wiki.category}
                </span>
                <span className="text-white-50 small">•</span>
                <span
                  className="badge rounded-pill border px-2 py-1 text-white-50"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                    fontSize: "11px",
                  }}
                >
                  {wiki.badge || "Guide"}
                </span>
              </div>

              {/* Judul Wiki Mendukung Markdown */}
              <h1 className="h2 fw-bold text-white mb-3" style={{ lineHeight: "1.3" }}>
                <InlineMarkdown content={wiki.title} />
              </h1>

              {/* Ringkasan Header */}
              <p className="text-white-50 mb-4" style={{ fontSize: "15px", lineHeight: "1.6" }}>
                {wiki.short_desc}
              </p>

              {/* Isi Konten Lengkap (Markdown) */}
              <div
                className="p-4 p-md-5 rounded-4 border shadow-sm"
                style={{
                  backgroundColor: "#131823",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <MarkdownRenderer content={wiki.full_content} />
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}