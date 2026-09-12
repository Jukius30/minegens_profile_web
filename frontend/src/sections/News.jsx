import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InlineMarkdown from "../common/InlineMarkdown.jsx";

const DEFAULT_BANNER = "/Discord_Banner_Minegens_2.png";

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/news", {
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setNewsItems(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil berita:", err);
        setIsLoading(false);
      });
  }, []);

  const latestNews = newsItems.slice(0, 3);

  return (
    <section
      id="news"
      className="py-5 border-top border-white border-opacity-10 text-white"
      style={{ backgroundColor: "#0f172a" }}
    >
      <div className="container-xl py-4">
        {/* Header Seksi */}
        <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-5">
          <div>
            <span
              className="small text-uppercase fw-semibold"
              style={{ color: "#2f74ff", letterSpacing: "0.08em" }}
            >
              Latest Updates
            </span>
            <h2 className="h2 fw-bold text-white mt-1 mb-2">
              Server News &amp; Announcements
            </h2>
            <p className="text-white-50 small mb-0" style={{ maxWidth: "520px", lineHeight: "1.6" }}>
              Announcements, development notes, and community highlights — all in one place.
            </p>
          </div>

          <Link
            to="/news"
            className="text-white-50 text-decoration-none d-inline-flex align-items-center gap-1 small"
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")}
          >
            <span>See All News</span>
            <span>→</span>
          </Link>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center py-5 text-white-50 small">
            Loading announcements...
          </div>
        )}

        {/* Empty State */}
        {!isLoading && latestNews.length === 0 && (
          <div className="text-center py-5 text-white-50 small">
            Belum ada berita yang diterbitkan.
          </div>
        )}

        {/* Grid 3 Berita */}
        {!isLoading && latestNews.length > 0 && (
          <div className="row g-4">
            {latestNews.map((item) => {
              const displayDate = item.published_at || item.created_at;
              const imgSrc = item.image || DEFAULT_BANNER;

              return (
                <div key={item.id} className="col-12 col-md-6 col-lg-4">
                  <div
                    className="h-100 rounded-3 border border-white border-opacity-10 overflow-hidden d-flex flex-column text-start"
                    style={{ backgroundColor: "#161b26" }}
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

                      {/* Judul Mendukung Markdown */}
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
                        <InlineMarkdown content={item.title} />
                      </h3>

                      {/* Deskripsi */}
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
    </section>
  );
}