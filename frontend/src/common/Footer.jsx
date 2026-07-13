import { Link } from 'react-router-dom';
import logoGens from '../assets/MineGens_Style_2.png'; // <-- Impor logo di sini

export default function Footer() {
  return (
    <footer className="py-5 text-white bg-minegens-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="container-xl">
        
        <div className="row g-4 pb-5">
          <div className="col-lg-5 col-md-12">
            
            {/* BRAND / LOGO FOTO DI FOOTER */}
            <div className="mb-3">
              <img 
                src={logoGens} 
                alt="MineGens Logo" 
                style={{ height: '50px', width: 'auto', objectFit: 'contain' }} // Dibuat sedikit lebih besar untuk footer
              />
            </div>
            
            <p className="text-white-50 small mb-4 max-w-52ch" style={{ lineHeight: '1.6' }}>
              A community server hub for updates, <br />
              events, and announcements.
            </p>
            
            <div className="d-flex gap-2">
              {['discord', 'youtube', 'tiktok'].map((platform) => (
                <a 
                  key={platform} href={`https://${platform}.minegens.id`} target="_blank" rel="noreferrer" 
                  className="d-grid place-items-center rounded-3 text-white-50 text-decoration-none"
                  style={{ width: '40px', height: '40px', transition: 'all 0.2s', backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#32B5F5'; e.currentTarget.style.backgroundColor = 'rgba(50, 181, 245, 0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)'; }}
                >
                  <span className="small text-uppercase fw-bold" style={{ fontSize: '11px' }}>{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="col-lg-1 d-none d-lg-block"></div>

          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="text-uppercase tracking-widest text-white-50 mb-3 fw-bold" style={{ fontSize: '12px', letterSpacing: '2px' }}>Explore</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-sm">
              <li><a href="/#home" className="text-white-50 text-decoration-none hover-white small">Home</a></li>
              <li><a href="/#news" className="text-white-50 text-decoration-none hover-white small">News</a></li>
              <li><a href="/#about" className="text-white-50 text-decoration-none hover-white small">About</a></li>
              <li><a href="/#work" className="text-white-50 text-decoration-none hover-white small">Work</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="text-uppercase tracking-widest text-white-50 mb-3 fw-bold" style={{ fontSize: '12px', letterSpacing: '2px' }}>Community</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-sm">
              <li><a href="https://discord.minegens.id" className="text-white-50 text-decoration-none hover-white small">Discord</a></li>
              <li><a href="https://store.minegens.id" className="text-white-50 text-decoration-none hover-white small">Store</a></li>
              <li><Link to="/rules" className="text-white-50 text-decoration-none hover-white small">Rules</Link></li>
              <li><Link to="/terms" className="text-white-50 text-decoration-none hover-white small">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="row pt-4 text-white-50 small align-items-center" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div className="col-sm-6 text-center text-sm-start mb-2 mb-sm-0">© 2026 Minegens. All rights reserved.</div>
          <div className="col-sm-6 text-center text-sm-end text-white-50 tracking-wide" style={{ fontSize: '13px' }}>play.minegens.id</div>
        </div>

      </div>
    </footer>
  );
}