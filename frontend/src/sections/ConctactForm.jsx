import { useState } from 'react';

export default function Contact() {
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);

  const javaIP = 'minegens.id';
  const bedrockIP = 'minegens.id';
  const bedrockPort = '19132';

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'java') {
      setCopiedJava(true);
      setTimeout(() => setCopiedJava(false), 1600);
    } else {
      setCopiedBedrock(true);
      setTimeout(() => setCopiedBedrock(false), 1600);
    }
  };

  const contactList = [
    { label: 'Java IP', value: javaIP, icon: '💻' },
    { label: 'Bedrock IP', value: `${bedrockIP} : ${bedrockPort}`, icon: '📱' },
    { label: 'Discord', value: 'discord.minegens.id', href: 'https://discord.gg', icon: '💬' },
    { label: 'Store', value: 'store.minegens.id', href: '#', icon: '🛒' },
    { label: 'Support', value: 'Contact staff in-game', icon: '👤' },
  ];

  return (
    <section 
      id="contact" 
      className="py-5 border-top border-white border-opacity-10 text-white" 
      style={{ backgroundColor: '#0f172a' }}
    >
      <div className="container-xl py-4">
        
        {/* Header Seksi */}
        <div className="mb-5">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span style={{ width: '18px', height: '2px', backgroundColor: '#2f74ff', display: 'inline-block' }}></span>
            <span className="small text-uppercase fw-semibold tracking-wider" style={{ color: '#2f74ff', fontSize: '12px' }}>
              Contact
            </span>
          </div>
          <h2 className="display-6 fw-bold text-white mb-2">
            Need help or want to join?
          </h2>
          <p className="text-white-50 small mb-0" style={{ maxWidth: '440px', lineHeight: '1.6' }}>
            Use the server IP to hop in, or reach the team through our community channels.
          </p>
        </div>

        <div className="row g-4 align-items-start">
          
          {/* Kolom Kiri: Kartu "Ready to Play?" */}
          <div className="col-12 col-lg-5">
            <div 
              className="p-4 p-md-5 rounded-4 border border-white border-opacity-10"
              style={{ backgroundColor: '#161b26' }}
            >
              <h3 className="h4 fw-bold text-white mb-2">Ready to play?</h3>
              <p className="text-white-50 small mb-4">
                Copy the IP, launch Minecraft, and join the world.
              </p>

              <div className="d-flex flex-column gap-3 mb-4">
                {/* Java Box */}
                <div 
                  className="d-flex align-items-center justify-content-between p-2 ps-3 rounded-3 border border-white border-opacity-10"
                  style={{ backgroundColor: '#0f172a' }}
                >
                  <div>
                    <div className="text-uppercase text-white-50" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>Java Edition</div>
                    <div className="fw-semibold text-white small">{javaIP}</div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => copyToClipboard(javaIP, 'java')}
                    className="btn btn-sm px-3 py-1.5 rounded-2 fw-medium text-white border-0"
                    style={{ backgroundColor: '#2f74ff', fontSize: '12px' }}
                  >
                    {copiedJava ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Bedrock Box */}
                <div 
                  className="d-flex align-items-center justify-content-between p-2 ps-3 rounded-3 border border-white border-opacity-10"
                  style={{ backgroundColor: '#0f172a' }}
                >
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <div>
                      <div className="text-uppercase text-white-50" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>Bedrock Edition</div>
                      <div className="fw-semibold text-white small">{bedrockIP}</div>
                    </div>
                    <span className="badge border border-white border-opacity-10 text-white-50 fw-normal" style={{ fontSize: '11px', backgroundColor: '#161b26' }}>
                      Port {bedrockPort}
                    </span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => copyToClipboard(`${bedrockIP}:${bedrockPort}`, 'bedrock')}
                    className="btn btn-sm px-3 py-1.5 rounded-2 fw-medium text-white border-0"
                    style={{ backgroundColor: '#2f74ff', fontSize: '12px' }}
                  >
                    {copiedBedrock ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <a 
                href="https://discord.gg" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-outline-light border-white border-opacity-25 px-4 py-2 rounded-3 text-sm fw-medium text-white-50 hover-white"
                style={{ fontSize: '13px' }}
              >
                Join Discord
              </a>
            </div>
          </div>

          {/* Kolom Kanan: List Channel / Link */}
          <div className="col-12 col-lg-7">
            <div 
              className="rounded-4 border border-white border-opacity-10 overflow-hidden"
              style={{ backgroundColor: '#161b26' }}
            >
              {contactList.map((item, index) => (
                <div 
                  key={index}
                  className={`d-flex align-items-center justify-content-between p-3 px-4 ${index !== contactList.length - 1 ? 'border-bottom border-white border-opacity-10' : ''}`}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="d-flex align-items-center justify-content-center rounded-3 border border-white border-opacity-10 text-white-50"
                      style={{ width: '38px', height: '38px', backgroundColor: '#0f172a', fontSize: '15px' }}
                    >
                      {item.icon}
                    </div>
                    <span className="text-white-50 small fw-medium">{item.label}</span>
                  </div>

                  <div>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-white fw-semibold small text-decoration-none hover-underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white fw-semibold small">{item.value}</span>
                    )}
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