import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../common/Navbar.jsx";
import Footer from "../common/Footer.jsx";

const DEFAULT_BANNER = "/Discord_Banner_Minegens_2.png";

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch("http://127.0.0.1:8000/api/news", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setNewsItems(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil arsip berita:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="text-white min-vh-100 bg-minegens-dark d-flex flex-column justify-content-between">
      <Navbar />

      <main className="container-xl py-5 flex-grow-1 fade-in-simple" style={{ marginTop: "90px" }}>
        <div className="mx-auto" style={{ maxWidth: "1100px" }}>
          
          {/* Tombol Kembali Modern ke Home */}
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

          {/* Header Halaman */}
          <div className="mb-5">
            <span className="small text-uppercase fw-semibold" style={{ color: "#2f74ff", letterSpacing: "0.08em" }}>
              News Archive
            </span>
            <h1 className="h2 fw-bold text-white mt-1 mb-2">
              All Server News &amp; Updates
            </h1>
            <p className="text-white-50 small mb-0" style={{ maxWidth: "560px", lineHeight: "1.6" }}>
              Daftar lengkap seluruh pengumuman, pembaruan sistem, dan catatan patch server Minegens.
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-5 text-white-50 small">
              Memuat arsip berita...
            </div>
          )}

          {/* Empty State */}
          {!isLoading && newsItems.length === 0 && (
            <div
              className="p-5 text-center rounded-3 border border-minegens text-white-50 small"
              style={{ backgroundColor: "#1e2c56" }}
            >
              Belum ada berita yang tersedia saat ini.
            </div>
          )}

          {/* Grid Berita */}
          {!isLoading && newsItems.length > 0 && (
            <div className="row g-4">
              {newsItems.map((item) => {
                const displayDate = item.published_at || item.created_at;
                const imgSrc = item.image || DEFAULT_BANNER;

                return (
                  <div key={item.id} className="col-12 col-md-6 col-lg-4">
                    <div
                      className="h-100 rounded-3 border border-minegens overflow-hidden d-flex flex-column text-start"
                      style={{ backgroundColor: "#1e2c56" }}
                    >
                      {/* Thumbnail Image */}
                      <div style={{ height: "185px" }}>
                        <img
                          src={imgSrc}
                          alt={item.title}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = DEFAULT_BANNER;
                          }}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      {/* Content Box */}
                      <div className="p-4 d-flex flex-column flex-grow-1">
                        <div className="small text-white-50 mb-2" style={{ fontSize: "13px" }}>
                          {displayDate
                            ? new Date(displayDate).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </div>

                        {/* Judul (Maksimal 2 baris) */}
                        <h3
                          className="h6 fw-semibold text-white mb-2"
                          style={{
                            lineHeight: "1.4",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.title}
                        </h3>

                        {/* Deskripsi (Maksimal 3 baris) */}
                        <p
                          className="text-white-50 small mb-4"
                          style={{
                            lineHeight: "1.6",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.short_desc || item.shortDesc}
                        </p>

                        {/* Tombol Read More */}
                        <div className="mt-auto pt-3 border-top border-white border-opacity-10">
                          <Link
                            to={`/news/${item.id}`}
                            className="d-inline-flex align-items-center gap-1 text-decoration-none fw-semibold small"
                            style={{ color: "#2f74ff" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#6095ff")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#2f74ff")}
                          >
                            <span>Read More</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}