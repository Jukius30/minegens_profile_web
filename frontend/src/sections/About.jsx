export default function About() {
  return (
    <section id="about" className="py-5 bg-minegens-dark border-top border-minegens">
      <div className="container-xl py-4 reveal-on-scroll">
        <div className="row align-items-center g-4 g-md-5">
          <div className="col-100 col-md-6">
            <span className="text-uppercase tracking-widest fw-bold text-sm" style={{ color: '#2f74ff' }}>About Us</span>
            <h2 className="display-6 fw-bold text-white mt-1">Indonesian Minegens Community.</h2>
            <p className="text-white-50 mt-3 small" style={{ lineHeight: '1.7' }}>
              Minegens adalah ekosistem multiplayer sandbox terpadu yang menggabungkan kebebasan eksplorasi survival penuh kreativitas dengan infrastruktur jaringan server yang aman dan lancar.
            </p>
          </div>
          <div className="col-100 col-md-6 text-center">
            <div className="p-4 p-md-5 rounded-4 border border-minegens bg-minegens-surface shadow-sm">
              <h3 className="fw-black display-4 text-white">12k+</h3>
              <p className="text-white-50 mb-0 tracking-wide small">Active Travelers &amp; Crafters</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}