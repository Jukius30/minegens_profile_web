import { useState } from 'react';
import Navbar from '../common/Navbar.jsx';
import Footer from '../common/Footer.jsx';

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="text-white min-vh-100 bg-minegens-dark d-flex flex-column justify-content-between">
      <Navbar />
      
      <main className="container-xl py-5 flex-grow-1 fade-in-simple" style={{ marginTop: '90px' }}>
        <div className="p-4 p-sm-5 rounded-4 border border-minegens bg-minegens-surface mx-auto shadow-sm" style={{ maxWidth: '850px' }}>
          
          <div className="text-center mb-5">
            <span className="text-uppercase tracking-widest fw-bold px-3 py-1.5 rounded-pill border border-minegens bg-white-5 text-sm" style={{ color: '#2f74ff' }}>
              Security &amp; Codex
            </span>
            <h1 className="fw-black tracking-tight mt-3 mb-2 text-white text-uppercase" style={{ fontStyle: 'italic', fontSize: '34px' }}>
              Server Rules Hub
            </h1>
          </div>

          <div className="d-flex flex-column gap-2.5">
            {[
              { id: 1, title: "01. General Community Rules", rules: ["Etika: Hormati sesama (No SARA, No Politik, No Toxic/Flaming). (Mute 10m - Perma)", "Privasi: Dilarang keras menyebarkan data pribadi (Doxxing) orang lain. (Perma Ban + IP)", "Identitas: Nickname, team, island, mob tidak boleh mengandung unsur kasar. (Batas 1x24 jam)", "UU ITE: Larangan keras sebar hoax, pencemaran nama baik, data breach. (Perma IP Ban)"] },
              { id: 2, title: "02. Minecraft Realms Regulations", rules: ["Fair Play: Dilarang keras Cheating/Hacking & Bug Abuse. Wajib client vanilla/resmi. (Perma)", "Multi-Acc: Maksimal 3 akun per IP. Dilarang keras Ban Evading via alt account. (Ban Perma Seluruh Akun)", "Interaksi: Dilarang Stealing (Mencuri), Griefing (Merusak), PvP/Trapping tanpa persetujuan. (Warn - Durasi Ban +3d)", "Redstone: Sirkuit wajib efisien. Dilarang membuat clock konstan perusak core. (Hapus + Jail)", "Ekonomi: Dilarang keras judi in-game dan transaksi menggunakan uang nyata IRL (RMT). (Perma Ban)"] },
              { id: 3, title: "03. Discord Core Infrastructure Rules", rules: ["Ketertiban Chat: No Spam, no caps lock berlebih, kirim teks sesuai alur channel kustom.", "Tautan Bahaya: Larangan keras menyebarkan link phishing, scam, atau media pornografi (NSFW). (Perma)", "Staff Portal: Hormati keputusan moderator. Dilarang menyamar/meniru identitas staff. (Ban Permanen)", "Sistem Bantuan: Pengaduan wajib disalurkan secara rapi menggunakan Menu Tiket Portal."] }
            ].map((section) => (
              <div key={section.id} className="border border-minegens rounded-3 overflow-hidden" style={{ backgroundColor: '#1e2c56' }}>
                <button className="w-100 text-start fw-bold text-white px-4 py-3 bg-transparent border-0 d-flex justify-content-between align-items-center text-sm" onClick={() => setActiveTab(activeTab === section.id ? null : section.id)} style={{ outline: 'none' }}>
                  <span>{section.title}</span>
                  <span style={{ color: '#2f74ff', fontSize: '11px' }}>{activeTab === section.id ? '▲' : '▼'}</span>
                </button>
                {activeTab === section.id && (
                  <div className="border-top border-minegens bg-white-5 p-4 fade-in-simple">
                    <ul className="text-white-50 ps-3 small d-flex flex-column gap-2.5 mb-0" style={{ fontSize: '13px' }}>
                      {section.rules.map((rule, idx) => <li key={idx}>{rule}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}