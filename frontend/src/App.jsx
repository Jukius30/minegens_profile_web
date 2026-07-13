import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './common/Navbar.jsx';
import Footer from './common/Footer.jsx';
import Hero from './sections/Hero.jsx';
import News from './sections/News.jsx';
import About from './sections/About.jsx';
import Work from './sections/Work.jsx';
import ContactForm from './sections/ConctactForm.jsx';
import './index.css';

// Memperbarui alamat server utama sesuai domain API terbaru
const SERVER_ADDRESS = 'minegens.id';

export default function App() {
  const [workItems, setWorkItems] = useState([]);
  const [serverStatus, setServerStatus] = useState({ 
    loading: true, 
    online: false, 
    players: 0, 
    maxPlayers: 0,
    version: "1.21" // Menyediakan default value untuk versi game
  });

  // Fungsi penembak API status server mcsrvstat yang bisa dipanggil berulang kali
  const checkStatus = async () => {
    try {
      const res = await fetch(`https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`);
      const data = await res.json();
      
      if (data && data.online) {
        setServerStatus({ 
          loading: false, 
          online: true, 
          players: data.players?.online ?? 0, 
          maxPlayers: data.players?.max ?? 0,
          version: data.version ?? "1.21"
        });
      } else {
        setServerStatus({ 
          loading: false, 
          online: false, 
          players: 0, 
          maxPlayers: 0,
          version: "—" 
        });
      }
    } catch (error) {
      console.error("Gagal sinkronisasi data dengan node API:", error);
      setServerStatus(prev => ({ ...prev, loading: false }));
    }
  };

  // LOOP AUTO-UPDATE TANPA REFRESH HALAMAN
  useEffect(() => {
    // Jalankan pengecekan pertama kali saat halaman dimuat
    checkStatus();

    // Jalankan background polling otomatis setiap 30 detik sekali secara senyap
    const intervalId = setInterval(() => {
      checkStatus();
    }, 30000); // 30000ms = 30 detik

    // Bersihkan interval pemanggilan saat komponen unmount agar performa browser tetap enteng
    return () => clearInterval(intervalId);
  }, []);

  // FETCH DATA WORK ITEMS (TETAP DIBAWA DARI KODE LAMA)
  useEffect(() => {
    axios.get('http://localhost:5000/api/work-items')
      .then(res => setWorkItems(res.data))
      .catch(() => {
        setWorkItems([
          { title: 'Minegens RPG Core', description: 'We build and manage Minecraft server experiences integrated with elemental RPG systems.' }
        ]);
      });
  }, []);

  return (
    <div className="text-white min-vh-100 bg-minegens-dark">
      
      {/* 1. Navbar Modular */}
      <Navbar />

      <main style={{ paddingTop: '72px' }}>
        
        {/* Banner Donasi Biru Neon */}
        <div className="bg-minegens-accent text-white py-3 text-center fw-bold tracking-wide shadow-sm">
          <div className="container">
            Ayo donasi dan dukung Minegens
          </div>
        </div>

        {/* 2. Main Page Sections (Mendukung data real-time baru) */}
        <Hero serverStatus={serverStatus} ipAddress={SERVER_ADDRESS} />
        <News />
        <About />
        <Work workItems={workItems} />
        <ContactForm />
      </main>

      {/* 3. Footer Modular */}
      <Footer />
      
    </div>
  );
}