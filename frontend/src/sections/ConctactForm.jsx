import { useState } from 'react';
import axios from 'axios';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending to Guild Portal...');
    try {
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      setStatus(res.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) { setStatus('Failed to pass the portal node.'); }
  };

  return (
    <section id="contact" className="py-5 bg-minegens-dark border-top border-minegens">
      <div className="container-xl py-4 reveal-on-scroll">
        <div className="row g-4 g-md-5">
          
          <div className="col-100 col-md-6 d-flex flex-column justify-content-center">
            <span className="text-uppercase tracking-widest fw-bold text-sm" style={{ color: '#2f74ff' }}>Get In Touch</span>
            <h2 className="display-6 fw-bold text-white mt-1">Need help or want to join?</h2>
            <p className="text-white-50 mt-3 small" style={{ lineHeight: '1.6' }}>Connect to our portal systems and drop a line to the staff core team.</p>
          </div>

          <div className="col-100 col-md-6">
            <form onSubmit={handleSubmit} className="p-4 rounded-4 border border-minegens bg-minegens-surface shadow-sm">
              {status && <div className="alert border-0 text-center mb-3 py-2 rounded-3 text-white bg-minegens-accent small">{status}</div>}
              
              <div className="mb-3">
                <input type="text" placeholder="In-Game Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-control text-white border-minegens p-3 rounded-3 shadow-none text-sm" style={{ backgroundColor: '#1e2c56' }} required />
              </div>
              <div className="mb-3">
                <input type="text" placeholder="Discord Username / Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-control text-white border-minegens p-3 rounded-3 shadow-none text-sm" style={{ backgroundColor: '#1e2c56' }} required />
              </div>
              <div className="mb-3">
                <textarea placeholder="Your Message..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="form-control text-white border-minegens p-3 rounded-3 shadow-none text-sm" style={{ backgroundColor: '#1e2c56', height: '110px', resize: 'none' }} required />
              </div>

              <button type="submit" className="btn w-100 fw-bold p-2.5 rounded-3 border-0 bg-minegens-accent text-white text-sm hover-white">
                Send Portal Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}