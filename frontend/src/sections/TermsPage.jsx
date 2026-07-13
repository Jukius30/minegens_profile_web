import Navbar from '../common/Navbar.jsx';
import Footer from '../common/Footer.jsx';

export default function TermsPage() {
  const termItems = [
    { step: "01", title: "Persetujuan Regulasi Portal", desc: "Dengan mengakses portal, mendaftar akun, dan memainkan seluruh ekosistem MineGens, Anda secara sadar menyatakan tunduk serta menyetujui seluruh regulasi komunitas." },
    { step: "02", title: "Kebijakan Donasi Sukarela", desc: "Segala bentuk transaksi donasi/pembelian virtual di web-store bersifat sukarela dan non-refundable (tidak dapat dikembalikan). Seluruh dana dialokasikan untuk operasional server." },
    { step: "03", title: "Balancing & Penyesuaian Virtual Item", desc: "Rank, item, perks, atau benefit virtual dapat mengalami penyesuaian (balancing) atau reset sewaktu-waktu oleh manajemen demi keadilan iklim gameplay." },
    { step: "04", title: "Tindakan Tegas & Penangguhan Akun", desc: "Akun atau alamat IP yang terbukti melanggar peraturan berat akan ditangguhkan secara permanen dari portal tanpa ada kompensasi bentuk apa pun." }
  ];

  return (
    <div className="text-white min-vh-100 bg-minegens-dark d-flex flex-column justify-content-between">
      <Navbar />
      
      <main className="container-xl py-5 flex-grow-1 fade-in-simple" style={{ marginTop: '90px' }}>
        <div className="p-4 p-sm-5 rounded-4 border border-minegens bg-minegens-surface mx-auto shadow-sm" style={{ maxWidth: '950px' }}>
          
          <div className="text-center mb-5">
            <span className="text-uppercase tracking-widest fw-bold px-3 py-1.5 rounded-pill border border-minegens bg-white-5 text-sm" style={{ color: '#2f74ff' }}>
              Legal Framework
            </span>
            <h1 className="fw-black tracking-tight mt-3 mb-2 text-white text-uppercase" style={{ fontStyle: 'italic', fontSize: '34px' }}>
              Terms of Service
            </h1>
          </div>

          <div className="row g-4">
            {termItems.map((item, i) => (
              <div key={i} className="col-100 col-md-6">
                <div className="p-4 rounded-4 border border-minegens h-100 hover-premium position-relative overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}>
                  <div className="d-flex align-items-start gap-3">
                    <div className="d-grid place-items-center rounded-circle fw-bold text-white flex-shrink-0" style={{ width: '28px', height: '28px', backgroundColor: '#2f74ff', fontSize: '12px' }}>
                      ✓
                    </div>
                    <div>
                      <h5 className="fw-bold text-white mb-2 text-sm">{item.title}</h5>
                      <p className="text-white-50 small mb-0" style={{ lineHeight: '1.6', fontSize: '13px' }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}