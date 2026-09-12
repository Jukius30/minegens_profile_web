import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logoGens from "../assets/MineGens_Style_2.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle
  const [dropdownOpen, setDropdownOpen] = useState(false); // "More" menu toggle
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");
  const dropdownRef = useRef(null);

  // Scroll Spy logic to track sections
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const sections = ["home", "news", "about", "work", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNavLinkClass = (hash) => {
    // Aktifkan jika berada di scroll section halaman home, ATAU jika hash 'news' dan rute adalah '/news'
    const isNewsActive = hash === "news" && location.pathname === "/news";
    const isSectionActive = location.pathname === "/" && activeSection === hash;

    const isActive = isNewsActive || isSectionActive;

    return `nav-link px-3 py-1 fw-medium ${isActive ? "text-white custom-nav-pill" : "text-white-50 hover-white"}`;
  };

  const isMorePageActive = [
    "/rules",
    "/terms",
    "/wiki",
    "/staff",
    "/status",
  ].includes(location.pathname);

  return (
    <nav className="navbar navbar-expand-xl navbar-dark fixed-top px-4 py-2 custom-navbar shadow-sm">
      <div className="container-fluid px-lg-5">
        {/* LOGO */}
        <a
          className="navbar-brand d-flex align-items-center me-4"
          href="/#home"
        >
          <img
            src={logoGens}
            alt="MineGens Logo"
            style={{ height: "36px", width: "auto", objectFit: "contain" }}
          />
        </a>

        {/* MOBILE HAMBURGER */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENUS */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show mt-3 mt-xl-0" : ""}`}
        >
          {/* CENTER NAVIGATION LINKS */}
          <div className="navbar-nav mx-auto align-items-center gap-2 gap-xl-3">
            <a
              className={getNavLinkClass("home")}
              href="/#home"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              className={getNavLinkClass("news")}
              href="/#news"
              onClick={() => setIsOpen(false)}
            >
              News
            </a>
            <a
              className={getNavLinkClass("about")}
              href="/#about"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              className={getNavLinkClass("work")}
              href="/#work"
              onClick={() => setIsOpen(false)}
            >
              Work
            </a>
            <a
              className={getNavLinkClass("contact")}
              href="/#contact"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>

            {/* "MORE" DROPDOWN CONTAINER */}
            <div className="position-relative" ref={dropdownRef}>
              <button
                className={`nav-link px-3 py-1 fw-medium btn border-0 bg-transparent text-start d-flex align-items-center gap-1 ${isMorePageActive || dropdownOpen ? "text-white custom-nav-pill-dropdown" : "text-white-50 hover-white"}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ outline: "none", boxShadow: "none" }}
              >
                <span>More</span>
                <span
                  style={{
                    fontSize: "11px",
                    transition: "transform 0.2s",
                    display: "inline-block",
                  }}
                >
                  {dropdownOpen ? "▲" : "▼"}
                </span>
              </button>

              {/* DROPDOWN MENU PANEL */}
              {dropdownOpen && (
                <div className="position-absolute custom-dropdown-menu py-2 mt-2 rounded-3 fade-in-simple">
                  <Link
                    className="dropdown-item px-4 py-2 text-white-50 hover-white small"
                    to="/wiki"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Wiki
                  </Link>
                  <Link
                    className="dropdown-item px-4 py-2 text-white-50 hover-white small"
                    to="/staff"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Staff
                  </Link>
                  <Link
                    className="dropdown-item px-4 py-2 text-white-50 hover-white small"
                    to="/rules"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Rules
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-xl-0 border-start-xl ps-xl-3 border-secondary-subtle">
            <a
              href="https://store.minegens.id"
              target="_blank"
              rel="noreferrer"
              className="btn custom-btn-store px-4 py-1.5 border-0 rounded-3 text-sm fw-bold"
            >
              Store
            </a>
            <a
              href="https://discord.minegens.id"
              target="_blank"
              rel="noreferrer"
              className="btn custom-btn-discord px-4 py-1.5 border-0 rounded-3 text-sm fw-bold"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}