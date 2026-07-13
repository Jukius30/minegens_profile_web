import { useState } from 'react';

export default function News() {
  // State untuk menyimpan data berita yang sedang aktif dibuka di modal (null artinya tertutup)
  const [activeNews, setActiveNews] = useState(null);

  const newsItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=80",
      date: "06 Juli 2026",
      title: "Pembaruan Portal Utama: Migrasi Node 1.21.1",
      shortDesc: "Infrastruktur core jaringan ekosistem kini telah sepenuhnya dimigrasikan untuk meningkatkan stabilitas TPS.",
      fullContent: "Proses migrasi core node infrastruktur MineGens versi 1.21.1 telah selesai dilakukan pada malam ini. Langkah ini diambil demi mengatasi fluktuasi latency dan menjaga stabilitas Tick Per Second (TPS) tetap konstan di angka 20.0 meskipun jumlah pemain melonjak di jam sibuk. Pembaruan ini juga membuka gerbang kompatibilitas untuk fitur lintas platform Java & Bedrock yang lebih mulus, sinkronisasi inventory instan, dan optimalisasi rendering chunk pada server Realms utama kami."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
      date: "01 Juli 2026",
      title: "Turnamen Akbar Survival Antar Guild",
      shortDesc: "Persiapkan tim dan strategi terbaik Anda. Pendaftaran kompetisi musiman resmi dibuka minggu ini.",
      fullContent: "Komunitas MineGens dengan bangga mempersembahkan turnamen musiman survival resmi untuk bulan Juli 2026! Setiap perwakilan Guild diwajibkan mendaftarkan maksimal 5 anggota inti melalui sistem tiket di Discord portal sebelum akhir pekan ini. Kompetisi akan menguji ketahanan tim dalam manajemen resource base building, kecepatan menaklukkan dungeon kustom, serta koordinasi taktis. Pemenang utama berhak mendapatkan hadiah eksklusif berupa custom rank di dalam server, medali kosmetik unik, serta alokasi koin virtual."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
      date: "24 Juni 2026",
      title: "Rilisan Fitur Baru Website Store",
      shortDesc: "Sistem otomatisasi gerbang pembayaran virtual kini mendukung metode transfer instan baru yang jauh lebih aman.",
      fullContent: "Guna meningkatkan kenyamanan bertransaksi dalam ekosistem web-store kustom kami (Jukiverse Web), divisi developer telah mengintegrasikan modul otomasi payment gateway Midtrans yang diperbarui. Sistem pembayaran sekarang mendukung proses instant settlement untuk kode QRIS dinamis dan transfer bank utama. Pembelian rank, virtual pack, atau donasi server kini akan langsung terverifikasi secara real-time dan mengeksekusi perintah Pterodactyl daemon dalam hitungan detik untuk mengirimkan item langsung ke akun Anda di game."
    }
  ];

  return (
    <section id="news" className="py-5 bg-minegens-dark border-top border-minegens">
      <div className="container-xl py-4 fade-in-simple">
        
        {/* Header Seksi News */}
        <div className="mb-5">
          <span className="text-uppercase tracking-widest fw-bold text-sm" style={{ color: '#2f74ff' }}>
            Latest Updates
          </span>
          <h2 className="display-6 fw-bold text-white mt-1">
            Server News &amp; Announcements.
          </h2>
        </div>
        
        {/* GRID KARTU BERITA (Klik kartu untuk membuka detail) */}
        <div className="row g-4">
          {newsItems.map((item) => (
            <div key={item.id} className="col-100 col-md-6 col-lg-4">
              <article 
                onClick={() => setActiveNews(item)}
                className="h-100 rounded-4 border border-minegens bg-minegens-surface overflow-hidden hover-premium d-flex flex-column"
                style={{ cursor: 'pointer' }}
              >
                {/* Gambar Atas */}
                <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                  <img src={item.image} alt={item.title} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                </div>

                {/* Konten Ringkas */}
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <div className="small mb-2 fw-semibold" style={{ color: '#2f74ff', fontSize: '14px' }}>
                    📅 {item.date}
                  </div>
                  <h3 className="h5 fw-bold text-white mb-3" style={{ lineHeight: '1.4' }}>
                    {item.title}
                  </h3>
                  <p className="text-white-50 small mb-0 mt-auto" style={{ lineHeight: '1.7' }}>
                    {item.shortDesc}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>

      </div>

      {/* POPUP MODAL INTERAKTIF DETAIL BERITA */}
      {activeNews && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3 fade-in-simple" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1050 }}
          onClick={() => setActiveNews(null)} // Klik di luar modal untuk menutup
        >
          <div 
            className="rounded-4 border border-minegens bg-minegens-surface text-white overflow-hidden shadow-lg"
            style={{ maxWidth: '700px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat kontennya diklik
          >
            {/* Gambar Besar di Dalam Modal */}
            <div style={{ height: '280px', position: 'relative' }}>
              <img src={activeNews.image} alt={activeNews.title} className="w-100 h-100" style={{ objectFit: 'cover' }} />
              <button 
                className="position-absolute btn rounded-circle d-grid place-items-center border-0 text-white bg-dark"
                style={{ top: '15px', right: '15px', width: '36px', height: '36px', opacity: 0.8 }}
                onClick={() => setActiveNews(null)}
              >
                ✕
              </button>
            </div>

            {/* Isi Konten Mendalam */}
            <div className="p-4 p-sm-5">
              <div className="small mb-2 fw-semibold" style={{ color: '#2f74ff', fontSize: '14px' }}>
                📅 {activeNews.date}
              </div>
              <h3 className="h4 fw-bold mb-4" style={{ lineHeight: '1.4' }}>
                {activeNews.title}
              </h3>
              <p className="text-white-50 small mb-0" style={{ lineHeight: '1.8', textAlign: 'justify' }}>
                {activeNews.fullContent}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}