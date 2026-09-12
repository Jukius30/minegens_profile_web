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

const SERVER_ADDRESS = 'minegens.id';

export default function App() {
  const [workItems, setWorkItems] = useState([]);
  const [serverStatus, setServerStatus] = useState({ 
    loading: true, 
    online: false, 
    players: 0, 
    maxPlayers: 0, 
    version: "1.21" 
  });

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

  useEffect(() => {
    checkStatus();
    const intervalId = setInterval(() => {
      checkStatus();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/work-items')
      .then(res => setWorkItems(res.data))
      .catch(() => {
        setWorkItems([
          { title: 'Surivival RPG Core', description: 'We build and manage Minecraft server experiences integrated with elemental RPG systems.' },
          { title: 'Minegens Plugins Core', description: 'We develop custom plugins to enhance gameplay, add new features, and optimize server performance.' },
        ]);
      });
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll('.reveal-on-scroll');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [workItems]);

  return (
    <div className="text-white min-vh-100 bg-minegens-dark">
      <Navbar />

      <main style={{ paddingTop: '72px' }}>
        <div className="bg-minegens-accent text-white py-3 text-center fw-bold tracking-wide shadow-sm">
          <div className="container">
            Ayo donasi dan dukung Minegens
          </div>
        </div>

        <Hero serverStatus={serverStatus} ipAddress={SERVER_ADDRESS} />
        <News />
        <About />
        <Work workItems={workItems} />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}