import { useState } from "react";
import backgroundImageFile from "../assets/background.webp";

export default function Hero({ serverStatus, ipAddress }) {
  const [copied, setCopied] = useState(false);
  const online = serverStatus.online && !serverStatus.loading;

  const handleCopy = () => {
    navigator.clipboard.writeText(ipAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section
      id="home"
      className="py-5 position-relative text-white overflow-hidden d-flex align-items-center"
      style={{
        backgroundImage: `url(${backgroundImageFile})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "80vh",
      }}
    >
      {/* Overlay gelap netral */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(15, 23, 42, 0.88)", zIndex: 1 }}
      />

      <div
        className="container-xl position-relative py-5"
        style={{ zIndex: 2 }}
      >
        <div className="row">
          <div className="col-lg-7">
            {/* Badge sub-heading halus tanpa aksen mencolok */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4 border border-white border-opacity-10 bg-black bg-opacity-25">
              <span
                className={`rounded-circle ${serverStatus.loading ? "bg-secondary" : online ? "bg-success" : "bg-danger"}`}
                style={{ width: "7px", height: "7px" }}
              />
              <span className="small text-white-50">
                Java &amp; Bedrock · Indonesian Community
              </span>
            </div>

            {/* Headline tegak natural */}
            <h1 className="display-4 fw-bold tracking-tight text-white mb-3">
              Your adventure <br />
              <span style={{ color: "#2f74ff" }}>starts here.</span>
            </h1>

            <p className="lead text-white-50 mb-4 max-w-52ch fs-6">
              Minegens is a growing Indonesian Minecraft community built for
              survival, events, and creativity. Jump in and play with us today.
            </p>

            {/* IP Box terpadu & rapi */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-5">
              {/* Box IP & Tombol Copy */}
              <div
                className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 border border-white border-opacity-10"
                style={{ backgroundColor: "rgba(22, 27, 38, 0.8)" }}
              >
                <div className="me-2">
                  <div
                    className="text-uppercase text-white-50"
                    style={{ fontSize: "10px", letterSpacing: "0.05em" }}
                  >
                    Server IP
                  </div>
                  <div className="fw-semibold text-white small">
                    {ipAddress}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn btn-sm px-3 py-1.5 rounded-2 fw-medium text-white border-0"
                  style={{ backgroundColor: "#2f74ff", fontSize: "13px" }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Status Online Terpisah Halus */}
              <div className="d-flex align-items-center gap-2 text-white-50 small px-2 py-1">
                <span
                  className={`rounded-circle ${serverStatus.loading ? "bg-secondary" : online ? "bg-success" : "bg-danger"}`}
                  style={{ width: "6px", height: "6px" }}
                />
                <span>
                  {serverStatus.loading
                    ? "Checking…"
                    : online
                      ? `${serverStatus.players}/${serverStatus.maxPlayers} Online`
                      : "Offline"}
                </span>
              </div>
            </div>

            {/* Metric stat minimalis (borderless) */}
            <div className="row g-4 pt-2 border-top border-white border-opacity-10 max-w-640px">
              {[
                {
                  value: serverStatus.loading
                    ? "—"
                    : online
                      ? String(serverStatus.players)
                      : "0",
                  label: "Players online",
                },
                { value: "12k+", label: "Community members" },
                { value: "99.9%", label: "Server uptime" },
                { value: "1.21", label: "Minecraft version" },
              ].map((stat, i) => (
                <div key={i} className="col-6 col-sm-3">
                  <div className="h4 fw-bold mb-0 text-white">{stat.value}</div>
                  <div
                    className="text-white-50 small mt-1"
                    style={{ fontSize: "12px" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
