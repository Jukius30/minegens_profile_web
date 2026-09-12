export default function About() {
  return (
    <section id="about" className="py-5 border-top border-white border-opacity-10 text-white" style={{ backgroundColor: '#0f172a' }}>
      <div className="container-xl py-4">
        <div className="row align-items-center g-4 g-lg-5">
          
          <div className="col-12 col-md-7">
            <span className="small text-uppercase fw-semibold" style={{ color: '#2f74ff', letterSpacing: '0.08em' }}>
              About Us
            </span>
            <h2 className="h2 fw-bold text-white mt-1">
              Indonesian Minegens Community
            </h2>
            <p className="text-white-50 mt-3 small mb-0" style={{ lineHeight: '1.7', maxWidth: '540px' }}>
              Minegens adalah ekosistem multiplayer sandbox terpadu yang menggabungkan kebebasan eksplorasi survival penuh kreativitas dengan infrastruktur jaringan server yang aman dan lancar.
            </p>
          </div>

          <div className="col-12 col-md-5">
            <div 
              className="p-4 rounded-3 border border-white border-opacity-10 text-center text-md-start"
              style={{ backgroundColor: '#161b26' }}
            >
              <div className="h1 fw-bold text-white mb-1">12k+</div>
              <p className="text-white-50 small mb-0">Active Travelers &amp; Crafters</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}