import Navbar from '../common/Navbar.jsx';
import Footer from '../common/Footer.jsx';

export default function StaffPage() {
  // Staff Core Team Data Structure grouped by department/rank
  const staffGroups = [
    {
      rankTitle: "Owner",
      rankColor: "#ff521d", // Orange highlight for owners
      members: [
        {
          name: "AlwiSusilo",
          role: "Server Founder & Owner",
          avatar: "https://minotar.net/helm/AlwiSusilo/100.png", // Pulls live Minecraft skin helm avatar
          description: "Oversees core game architecture, network infrastructure management, and project direction."
        },
        {
          name: "Josvan",
          role: "Co Owner & Staff Manager",
          avatar: "https://minotar.net/helm/Josvan/100.png", // Placeholder using friend list database seed
          description: "Maintains MineGens, website infrastructure integration, payment pipelines, and smart contracts."
        }
      ]
    },
    {
      rankTitle: "Developer Team",
      rankColor: "#32B5F5", // Cyber Cyan for Developers
      members: [
        {
          name: "Senn0_",
          role: "Head Developer",
          avatar: "https://minotar.net/helm/Senn0_/100.png",
          description: "Balances custom RPG plugins, economy engines, items configs, and special dungeon drop rates."
        },
        {
          name: "graymontt",
          role: "Plugin Developer",
          avatar: "https://minotar.net/helm/graymontt/100.png",
          description: "Configures server jar optimization, hardware allocation nodes, and anti-cheat modules."
        },
        {
          name: "ItzDeDet",
          role: "Plugin Developer",
          avatar: "https://minotar.net/helm/DetraisMC/100.png",
          description: "Develops and maintains custom plugins, ensuring smooth gameplay and server stability."
        },
        {
          name: "access505",
          role: "Plugin Developer",
          avatar: "https://minotar.net/helm/access505/100.png",
          description: "Develops and maintains custom plugins, ensuring smooth gameplay and server stability."
        },
        {
          name: "Ray28_",
          role: "Plugin Developer",
          avatar: "https://minotar.net/helm/Ray28_/100.png",
          description: "Develops and maintains custom plugins, ensuring smooth gameplay and server stability."
        }
      ]
    },
    {
      rankTitle: "Administration",
      rankColor: "#FF6B6B", // Coral for Administration
      members: [
        {
          name: "UtoYuto",
          role: "Head Admin",
          avatar: "https://minotar.net/helm/UtoYuto/100.png",
          description: "Oversees the overall direction and strategy of the MineGens project."
        },
        {
          name: "ItsDapp",
          role: "Admin",
          avatar: "https://minotar.net/helm/ItsDapp/100.png",
          description: "Spesializes to make the player angry."
        },
        {
          name: "Waltz",
          role: "Admin",
          avatar: "https://minotar.net/helm/Waltz/100.png",
          description: "Oversees the overall direction and strategy of the MineGens project."
        }
      ]
    }
  ];

  return (
    <div className="text-white min-vh-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#040D1A' }}>
      {/* 1. Header Navigation */}
      <Navbar />
      
      {/* 2. Main Page Layout */}
      <main className="container-xl py-5 flex-grow-1 fade-in-simple" style={{ marginTop: '100px' }}>
        
        {/* Title Framework */}
        <div className="text-center mb-5">
          <span className="text-uppercase tracking-widest fw-bold px-3 py-1.5 rounded-pill bg-white-5" style={{ color: '#32B5F5', fontSize: '13px' }}>
            MineGens Operations
          </span>
          <h1 className="fw-black tracking-tight mt-3 mb-2 text-uppercase text-white" style={{ fontStyle: 'italic', fontSize: '38px' }}>
            Meet The Staff
          </h1>
          <p className="mx-auto max-w-52ch" style={{ color: '#A2B6CD', fontSize: '17px' }}>
            The passionate team behind the core development, infrastructure management, and security of the MineGens ecosystem.
          </p>
        </div>

        {/* Dynamic Groups Generation */}
        <div className="d-flex flex-column gap-5 mb-5">
          {staffGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              
              {/* Group Rank Header */}
              <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-2" style={{ borderColor: 'rgba(226, 237, 247, 0.1)' }}>
                <span className="rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: group.rankColor }} />
                <h3 className="h5 fw-bold mb-0 text-uppercase tracking-wider" style={{ color: group.rankColor }}>
                  {group.rankTitle}
                </h3>
              </div>

              {/* Grid Cards Layout (Responsive: 1 Column Mobile, 2 Columns PC) */}
              <div className="row g-4">
                {group.members.map((member, i) => (
                  <div key={i} className="col-100 col-md-6">
                    <div className="p-4 rounded-4 hover-premium h-100 d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-4">
                      
                      {/* Live Minecraft Head Avatar Framework */}
                      <div className="flex-shrink-0 p-1.5 rounded-3 bg-white-5 border border-secondary-subtle" style={{ width: '84px', height: '84px' }}>
                        <img 
                          src={member.avatar} 
                          alt={`${member.name} Skin`} 
                          className="w-100 h-100 object-contain rounded-1"
                          onError={(e) => { e.currentTarget.src = "https://minotar.net/helm/char/100.png"; }} // Steve placeholder fallback
                        />
                      </div>

                      {/* Content Stack */}
                      <div className="text-center text-sm-start">
                        <div className="d-flex flex-wrap justify-content-center justify-content-sm-start align-items-center gap-2 mb-1">
                          <h4 className="h5 fw-black mb-0 text-white" style={{ fontStyle: 'italic' }}>
                            {member.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded text-uppercase fw-bold" style={{ fontSize: '11px', backgroundColor: 'rgba(226, 237, 247, 0.08)', color: '#8CE1FF' }}>
                            {member.role}
                          </span>
                        </div>
                        
                        <p className="mb-0 mt-2 small" style={{ color: '#A2B6CD', lineHeight: '1.6', fontSize: '15px' }}>
                          {member.description}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </main>

      {/* 3. Footer Infrastructure */}
      <Footer />
    </div>
  );
}