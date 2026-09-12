import { useState, useEffect } from 'react';
import Navbar from '../common/Navbar.jsx';
import Footer from '../common/Footer.jsx';

export default function TermsPage() {
  const [activeId, setActiveId] = useState('umum');

  const sections = [
    {
      id: 'umum',
      num: '01',
      title: 'Peraturan Umum',
      jurisdiction: 'Berlaku untuk seluruh anggota komunitas MineGens (Server Minecraft & Discord).',
      subsections: [
        {
          title: '1.1. Etika dan Perilaku',
          items: [
            { name: 'Hormati Sesama', desc: 'Wajib menghormati sesama tanpa memandang perbedaan usia, ras, agama, gender, atau kemampuan. Tindakan merendahkan atau melecehkan dilarang keras.' },
            { name: 'Bahasa Sopan', desc: 'Gunakan komunikasi yang pantas dan tidak menyinggung di game maupun Discord.' },
            { name: 'Larangan Perilaku Toxic', desc: 'Dilarang flaming, trolling, provokasi konflik, termasuk plesetan kata-kata toxic.', sanction: 'Mute 10m s/d Ban Permanen' }
          ]
        },
        {
          title: '1.2. Konten Terlarang & Pembahasan Sensitif',
          items: [
            { name: 'Konten Ilegal / Pornografi', desc: 'Penyebaran konten tidak pantas, pornografi, kekerasan, atau materi diskriminatif.', sanction: 'Ban 7h / 30h / Permanen' },
            { name: 'Pembahasan Sensitif (SARA & Politik)', desc: 'Menghindari perdebatan topik politik, keyakinan, dan SARA yang memicu konflik.', sanction: 'Mute 10m s/d Ban Permanen' }
          ]
        },
        {
          title: '1.3. Keamanan, Privasi & Identitas',
          items: [
            { name: 'Perlindungan Data Pribadi (No Doxxing)', desc: 'Dilarang menyebarkan identitas pribadi (nama lengkap, alamat, no hp, foto) tanpa izin.', sanction: 'Ban 30h / 90h / Ban IP Permanen' },
            { name: 'Keamanan Akun', desc: 'Pemain bertanggung jawab penuh atas akun masing-masing. Kelalaian berbagi akses bukan tanggung jawab server.' },
            { name: 'Identitas & Nickname', desc: 'Nama in-game, island, clan, dan mob tidak boleh mengandung unsur SARA/kasar.', sanction: 'Tenggat ganti 1x24 jam atau Ban Permanen' },
            { name: 'Kepatuhan Hukum (UU ITE)', desc: 'Pencemaran nama baik, penyebaran berita bohong, dan pelanggaran hukum digital.', sanction: 'Ban IP Permanen' }
          ]
        }
      ]
    },
    {
      id: 'minecraft',
      num: '02',
      title: 'Peraturan Server Minecraft',
      jurisdiction: 'Berlaku khusus untuk aktivitas teknis & interaksi di realm/dunia Minecraft.',
      subsections: [
        {
          title: '2.1. Integritas Gameplay (Fair Play)',
          items: [
            { name: 'Cheating, Hacking & Unfair Client', desc: 'Modifikasi client illegal, hack, x-ray, dan manipulasi data dilarang keras.', sanction: 'Jail / Ban 3h s/d Permanen' },
            { name: 'Pemanfaatan Bug (Bug Abuse)', desc: 'Wajib melaporkan exploit ke staff. Pemanfaatan glitch untuk keuntungan pribadi dilarang.', sanction: 'Ban 7h / Ban Permanen' },
            { name: 'Multi-Accounting', desc: 'Maksimal 3 akun per IP/individu untuk mencegah spam dan abuse.', sanction: 'Alt ban / Main akun 7h s/d Permanen' },
            { name: 'Penghindaran Sanksi (Ban Evade)', desc: 'Masuk kembali dengan akun cadangan atau spoof IP saat sedang disanksi.', sanction: 'Ban Seluruh Akun Permanen' }
          ]
        },
        {
          title: '2.2. Interaksi Lingkungan & Pemain',
          items: [
            { name: 'Pencurian (Stealing)', desc: 'Mengambil barang atau isi chest pemain lain tanpa izin. Item curian akan disita.', sanction: 'Warn / Ban 3h (+3h berulang)' },
            { name: 'Pengrusakan (Griefing)', desc: 'Merusak bangunan pemain lain, membunuh mob peliharaan, atau merusak area survival liar secara sengaja.', sanction: 'Warn / Ban 3h (+3h berulang)' },
            { name: 'PvP & Jebakan Liar (Trapping)', desc: 'PvP dan mekanisme perangkap mematikan hanya sah jika disetujui bersama secara sadar.', sanction: 'Jail 3 jam / Ban 3h' },
            { name: 'Inappropriate Builds', desc: 'Membangun struktur berunsur pornografi, simbol politik radikal, atau pelecehan keyakinan.', sanction: 'Bangunan dihapus + Ban 3h' }
          ]
        },
        {
          title: '2.3. Ekonomi & Aktivitas Terlarang',
          items: [
            { name: 'Real Money Trading (RMT)', desc: 'Transaksi uang asli (IRL) untuk item, balance server, atau pertukaran antar realm.', sanction: 'Ban Permanen' },
            { name: 'Penipuan (Scamming)', desc: 'Menipu kesepakatan dagang in-game. Kejujuran barter wajib dijaga.', sanction: 'Ban 7h + Aset dikembalikan' },
            { name: 'Perjudian In-Game', desc: 'Sistem taruhan chance/gambling virtual dilarang demi keadilan ekosistem.', sanction: 'Ban 3h / Ban Permanen' },
            { name: 'Efisiensi Mesin Redstone', desc: 'Dilarang membuat clock loop terus-menerus atau rangkaian lagging yang membebani TPS core server.', sanction: 'Mekanisme dihapus / Ban 3h' }
          ]
        }
      ]
    },
    {
      id: 'discord',
      num: '03',
      title: 'Peraturan Komunitas Discord',
      jurisdiction: 'Mengatur ketertiban ruang diskusi, komunikasi suara, dan operasional bot.',
      subsections: [
        {
          title: '3.1. Ketertiban Jalur Chat',
          items: [
            { name: 'Spam, Flooding & Mention', desc: 'Dilarang spam pesan cepat, spam emoji, men-tag staff berlebihan, atau memicu rantai spam chat.', sanction: 'Mute 1h s/d Ban Permanen' },
            { name: 'Caps Lock Berlebih', desc: 'Teks kapital berkelanjutan yang dinilai agresif atau mengganggu alur baca umum.', sanction: 'Peringatan / Mute 3 jam' },
            { name: 'Tautan Berbahaya & Phishing', desc: 'Penyebaran tautan tipuan, nitro palsu, malware, atau form pencurian akun.', sanction: 'Ban Permanen Seketika' }
          ]
        },
        {
          title: '3.2. Tata Kelola Channel & Interaksi Staff',
          items: [
            { name: 'Sesuai Topik Channel', desc: 'Kirim media, audio, dan teks pada saluran kategori yang telah disediakan.' },
            { name: 'Etika Voice Channel', desc: 'Hindari voice-changer bising, soundboard mengganggu, atau memotong pembicaraan terus-menerus.', sanction: 'Kick VC / Mute' },
            { name: 'Penyalahgunaan Identitas Staff', desc: 'Meniru nickname, avatar, role, atau manipulasi warna chat layaknya admin resmi.', sanction: 'Ban Permanen' },
            { name: 'Pusat Bantuan Resmi (Tiket)', desc: 'Laporan bug, komplain, dan bantuan diproses hanya melalui sistem tiket. Admin berhak mengabaikan DM pribadi.' }
          ]
        }
      ]
    },
    {
      id: 'penindakan',
      num: '04',
      title: 'Prosedur Sanksi & Hak Banding',
      jurisdiction: 'Standar operasional tim moderasi dalam menjatuhkan tindakan disipliner.',
      subsections: [
        {
          title: '4.1. Hirarki & Penyelidikan Sanksi',
          items: [
            { name: 'Tingkatan Penindakan', desc: 'Peringatan tertulis → Mute obrolan → Penahanan karakter (Jail) → Kick → Ban Sementara → Ban Permanen IP.' },
            { name: 'Dasar Bukti Kuat', desc: 'Sanksi diberikan berlandaskan bukti otentik seperti audit log sistem, tangkapan layar valid, atau rekam jejak server.' },
            { name: 'Hak Banding (Appeal)', desc: 'Pemain berhak mengajukan banding sanksi melalui tiket Discord maksimal dalam 7 hari setelah penindakan.' },
            { name: 'Masa Kedaluwarsa Laporan', desc: 'Insiden yang telah berlalu lebih dari 2 bulan tanpa laporan tidak akan diproses untuk sanksi retroaktif, kecuali kasus destruktif berat.' }
          ]
        }
      ]
    },
    {
      id: 'ketentuan',
      num: '05',
      title: 'Ketentuan Legal & Batasan Tanggung Jawab',
      jurisdiction: 'Aspek perlindungan operasional komunitas dan batasan liabilitas platform.',
      subsections: [
        {
          title: '5.1. Hak Kepemilikan & Perubahan',
          items: [
            { name: 'Perubahan Regulasi', desc: 'Peraturan dapat diperbarui secara berkala menyesuaikan stabilitas gameplay dan hukum yang berlaku.' },
            { name: 'Kepemilikan Aset Virtual', desc: 'Seluruh struktur, rancangan kustom, dan plugin adalah hak milik ekosistem MineGens.' },
            { name: 'Batasan Tanggung Jawab', desc: 'MineGens tidak bertanggung jawab atas kerugian materiil/immateriil akibat kelalaian akun pemain, bug luar kendali, atau transaksi pihak ketiga non-resmi.' }
          ]
        }
      ]
    }
  ];

  // ScrollSpy menggunakan IntersectionObserver
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0.1
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // offset fixed navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="text-white min-vh-100 d-flex flex-column" style={{ backgroundColor: '#0f172a' }}>
      <Navbar />

      <main className="container-xl flex-grow-1" style={{ paddingTop: '110px', paddingBottom: '90px' }}>
        <div className="row g-5">
          
          {/* Sticky Sidebar Navigation (Mengikuti Scroll) */}
          <aside className="col-lg-3 d-none d-lg-block">
            <div className="sticky-top" style={{ top: '100px', zIndex: 10 }}>
              <div className="small text-uppercase fw-semibold mb-3 tracking-wider" style={{ color: '#2f74ff', fontSize: '11px' }}>
                Daftar Isi
              </div>
              <nav className="d-flex flex-column gap-1 border-start border-white border-opacity-10">
                {sections.map((sec) => {
                  const isActive = activeId === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                      className={`text-decoration-none py-1.5 ps-3 small position-relative ${
                        isActive ? 'text-white fw-semibold' : 'text-white-50 hover-white'
                      }`}
                      style={{
                        fontSize: '13px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {/* Indikator Garis Aktif */}
                      {isActive && (
                        <span
                          className="position-absolute top-0 start-0 h-100"
                          style={{
                            width: '2px',
                            backgroundColor: '#2f74ff',
                            marginLeft: '-1px'
                          }}
                        />
                      )}
                      <span className="me-2 opacity-50 font-monospace">{sec.num}</span>
                      {sec.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Konten Dokumen */}
          <section className="col-12 col-lg-9">
            
            {/* Header Dokumen */}
            <div className="pb-5 mb-5 border-bottom border-white border-opacity-10">
              <span className="small text-uppercase fw-semibold" style={{ color: '#2f74ff', letterSpacing: '0.08em' }}>
                Legal &amp; Codex
              </span>
              <h1 className="display-6 fw-bold text-white mt-1 mb-3">
                MineGens Server Regulations
              </h1>
              <p className="text-white-50 small mb-0" style={{ lineHeight: '1.8', maxWidth: '680px' }}>
                Dengan terhubung dan bermain di server Minecraft maupun bergabung ke Discord MineGens, Anda secara otomatis menyetujui seluruh ketentuan di bawah ini. Harap dibaca dengan saksama.
              </p>
            </div>

            {/* Pasal Regulasi */}
            <div className="d-flex flex-column gap-5">
              {sections.map((sec) => (
                <article key={sec.id} id={sec.id} className="pt-2">
                  
                  {/* Judul Bab */}
                  <div className="d-flex align-items-baseline gap-3 pb-3 border-bottom border-white border-opacity-10">
                    <span className="font-monospace text-white-50 small fw-bold">{sec.num}</span>
                    <div>
                      <h2 className="h4 fw-bold text-white mb-1">{sec.title}</h2>
                      <p className="text-white-50 small mb-0 font-monospace" style={{ fontSize: '12px' }}>
                        {sec.jurisdiction}
                      </p>
                    </div>
                  </div>

                  {/* Sub bab & Item */}
                  <div className="mt-4 d-flex flex-column gap-4">
                    {sec.subsections.map((sub, idx) => (
                      <div key={idx}>
                        <h3 className="h6 fw-semibold text-white mb-3">
                          {sub.title}
                        </h3>

                        <div className="d-flex flex-column gap-3 ps-sm-3">
                          {sub.items.map((item, iIdx) => (
                            <div key={iIdx} className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-2 pb-3 border-bottom border-white border-opacity-5">
                              <div style={{ maxWidth: '600px' }}>
                                <div className="text-white small fw-medium mb-1">
                                  {item.name}
                                </div>
                                <p className="text-white-50 small mb-0" style={{ lineHeight: '1.6', fontSize: '13px' }}>
                                  {item.desc}
                                </p>
                              </div>

                              {item.sanction && (
                                <div className="text-nowrap mt-1 mt-sm-0">
                                  <span 
                                    className="small px-2 py-1 rounded border border-white border-opacity-10 text-white-50"
                                    style={{ fontSize: '11px', backgroundColor: '#161b26' }}
                                  >
                                    {item.sanction}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </article>
              ))}
            </div>

            {/* Penutup */}
            <div className="pt-5 mt-5 border-top border-white border-opacity-10">
              <h3 className="h6 fw-bold text-white mb-2">Penutupan &amp; Hubungan Staff</h3>
              <p className="text-white-50 small mb-0" style={{ lineHeight: '1.7' }}>
                Terima kasih telah menjadi bagian dari komunitas MineGens. Kepatuhan terhadap regulasi ini menjamin lingkungan sandbox yang sehat dan adil. Untuk kendala, klarifikasi, atau laporan pelanggaran, gunakan saluran bantuan di tiket Discord kami.
              </p>
            </div>

          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}