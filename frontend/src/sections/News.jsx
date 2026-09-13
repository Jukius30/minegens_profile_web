import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import InlineMarkdown from "../common/InlineMarkdown.jsx";

const DEFAULT_BANNER = "/Discord_Banner_Minegens_2.png";

export default function NewsSection() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNews() {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("news")
          .select("*");

        if (error) {
          console.error("Gagal mengambil berita:", error.message);
          return;
        }

        if (data) {
          // Urutkan dari tanggal rilis paling baru ke terlama
          const sorted = [...data].sort((a, b) => {
            const dateA = new Date(a.published_at || a.created_at || 0).getTime();
            const dateB = new Date(b.published_at || b.created_at || 0).getTime();
            return dateB - dateA;
          });

          // Ambil 3 artikel teratas untuk homepage
          setNewsList(sorted.slice(0, 3));
        }
      } catch (err) {
        console.error("Error tidak terduga:", err);
      } finally {
        setLoading(false);
      }
    }

    getNews();
  }, []);

  if (loading) {
    return (
      <section className="py-5" id="news">
        <div className="container text-center py-5 text-white-50 small">
          Memuat berita & pembaruan Minegens...
        </div>
      </section>
    );
  }

  return (
    <section className="py-5" id="news">
      <div className="container py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
          <div>
            <span
              className="small text-uppercase fw-semibold"
              style={{ color: "#2f74ff", letterSpacing: "0.08em" }}
            >
              Latest Updates
            </span>
            <h2 className="h2 fw-bold text-white mt-1 mb-0">
              News &amp; Announcements
            </h2>
          </div>

          <Link
            to="/news"
            className="text-white-50 border border-white border-opacity-10 rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 small text-decoration-none shadow-sm"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(6px)",
              transition: "all 0.2s ease",
              width: "fit-content",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(47, 116, 255, 0.15)";
              e.currentTarget.style.borderColor = "rgba(47, 116, 255, 0.4)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.transform = "translateX(3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <span className="fw-medium">See All News</span>
            <span style={{ fontSize: "14px", lineHeight: 1 }}>→</span>
          </Link>
        </div>

        {newsList.length === 0 ? (
          <div
            className="p-5 text-center rounded-3 border border-minegens text-white-50 small"
            style={{ backgroundColor: "#1e2c56" }}
          >
            Belum ada berita yang tersedia saat ini.
          </div>
        ) : (
          <div className="row g-4">
            {newsList.map((item) => {
              const displayDate = item.published_at || item.created_at;
              const imgSrc = item.image || item.image_url || DEFAULT_BANNER;

              return (
                <div key={item.id} className="col-12 col-md-6 col-lg-4">
                  <div
                    className="h-100 rounded-3 border border-minegens overflow-hidden d-flex flex-column text-start"
                    style={{ backgroundColor: "#1e2c56" }}
                  >
                    <div style={{ height: "185px" }}>
                      <Link to={`/news/${item.id}`} className="d-block w-100 h-100">
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
                      </Link>
                    </div>

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
                        <Link
                          to={`/news/${item.id}`}
                          className="text-white text-decoration-none"
                        >
                          <InlineMarkdown content={item.title} />
                        </Link>
                      </h3>

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
                        {item.short_desc || item.shortDesc || item.content || item.description}
                      </p>

                      <div className="mt-auto pt-3 border-top border-white border-opacity-10">
                        <Link
                          to={`/news/${item.id}`}
                          className="d-inline-flex align-items-center gap-1 text-decoration-none fw-semibold small"
                          style={{ color: "#2f74ff", transition: "color 0.2s ease" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#6095ff")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#2f74ff")}
                        >
                          <span>See More</span>
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
    </section>
  );
}