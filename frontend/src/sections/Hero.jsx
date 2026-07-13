import { useState } from 'react';
import backgroundImageFile from '../assets/background.webp';

export default function Hero({ serverStatus, ipAddress }) {
  const [copied, setCopied] = useState(false);
  const online = serverStatus.online && !serverStatus.loading;

  return (
    <section id="home" className="py-5 position-relative text-white overflow-hidden d-flex align-items-center"
      style={{ backgroundImage: `url(${backgroundImageFile})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '80vh' }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(30, 44, 86, 0.82)', zIndex: 1 }} />

      <div className="container-xl position-relative py-5 reveal-on-scroll" style={{ zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-8">
            
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-4 border border-minegens bg-white-5">
              <span className={`rounded-circle ${serverStatus.loading ? 'bg-secondary' : online ? 'bg-success' : 'bg-danger'}`} style={{ width: '8px', height: '8px' }} />
              <span className="small text-white-50">Java &amp; Bedrock · Indonesian Community</span>
            </div>

            <h1 className="display-4 display-md-3 fw-bold tracking-tight text-white mb-3 text-uppercase" style={{ fontStyle: 'italic' }}>
              Your adventure <br />
              <span style={{ color: '#2f74ff' }}>starts here.</span>
            </h1>
            
            <p className="lead text-white-50 mb-5 max-w-52ch fs-6 fs-md-5">
              Minegens is a growing Indonesian Minecraft community built for survival, events, and creativity. Jump in and play with us today.
            </p>

            <div className="d-flex flex-wrap gap-3 align-items-center mb-5">
              <div className="d-flex align-items-center gap-3 rounded-4 border border-minegens bg-white-5 py-2 ps-3 pe-2 backdrop-blur">
                <div>
                  <div className="text-uppercase tracking-wider text-white-50" style={{ fontSize: '10px', fontWeight: '600' }}>Server IP</div>
                  <div className="fw-bold text-white small-mobile-text">{ipAddress}</div>
                </div>
                <button type="button" onClick={() => { navigator.clipboard.writeText(ipAddress); setCopied(true); setTimeout(() => setCopied(false), 1600); }} className="btn bg-minegens-accent text-white fw-bold border-0 px-4 py-2 rounded-3 text-sm">
                  {copied ? 'Copied!' : 'Copy IP'}
                </button>
              </div>

              <div className="d-inline-flex align-items-center gap-2 rounded-3 border px-4 py-3 fw-semibold border-minegens bg-white-5 text-sm">
                <span>{serverStatus.loading ? 'Checking…' : online ? 'Online' : 'Offline'}</span>
                {online && <span className="text-white-50 fw-normal">({serverStatus.players}/{serverStatus.maxPlayers})</span>}
              </div>
            </div>

            <div className="row g-3 max-w-640px">
              {[
                { value: serverStatus.loading ? '—' : online ? String(serverStatus.players) : '0', label: 'Players online' },
                { value: '12k+', label: 'Members' },
                { value: '99.9%', label: 'Uptime' },
                { value: '1.21', label: 'Version' }
              ].map((stat, i) => (
                <div key={i} className="col-6 col-sm-3">
                  <div className="rounded-4 border border-minegens p-3 text-center bg-minegens-surface">
                    <div className="h4 fw-extrabold mb-1 text-white">{stat.value}</div>
                    <div className="small text-white-50" style={{ fontSize: '12px' }}>{stat.label}</div>
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