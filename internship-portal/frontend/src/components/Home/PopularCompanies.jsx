import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Millennium City Centre, Gurugram",
      openPositions: 10,
      icon: <FaMicrosoft />,
      color: '#0078d4'
    },
    {
      id: 2,
      title: "Tesla",
      location: "Millennium City Centre, Gurugram",
      openPositions: 5,
      icon: <SiTesla />,
      color: '#cc0000'
    },
    {
      id: 3,
      title: "Apple",
      location: "Millennium City Centre, Gurugram",
      openPositions: 20,
      icon: <FaApple />,
      color: '#000000'
    },
  ];
  
  return (
    <div 
      className="companies"
      style={{
        padding: '120px 0 160px',
        position: 'relative',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%)'
      }}
    >
      <div 
        className="container"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px'
        }}
      >
        <h3 style={{
          fontSize: 'clamp(2.5rem, 4vw, 4rem)',
          fontWeight: '700',
          textAlign: 'center',
          margin: '0 0 20px 0',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e0ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em'
        }}>TOP COMPANIES</h3>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <div style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #ff6b6b, #ee5a6f)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>
        <div 
          className="banner"
          style={{
            display: 'flex',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '40px',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          {companies.map((element, index) => {
            return (
              <div 
                className="card" 
                key={element.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  padding: '50px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `slideInUp 0.6s ease-out ${index * 0.2}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = `${element.color}50`;
                  e.currentTarget.style.boxShadow = `0 25px 50px rgba(0, 0, 0, 0.15), 0 0 40px ${element.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${element.color}, ${element.color}80)`,
                  borderRadius: '24px 24px 0 0'
                }}></div>
                <div 
                  className="content"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '25px'
                  }}
                >
                  <div 
                    className="icon"
                    style={{
                      fontSize: '3.5rem',
                      color: element.color,
                      background: `linear-gradient(135deg, ${element.color}15, ${element.color}05)`,
                      padding: '25px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '90px',
                      minHeight: '90px'
                    }}
                  >
                    {element.icon}
                  </div>
                  <div 
                    className="text"
                    style={{
                      flex: 1
                    }}
                  >
                    <p style={{
                      fontSize: '1.75rem',
                      fontWeight: '700',
                      color: '#ffffff',
                      margin: '0 0 10px 0',
                      letterSpacing: '-0.01em'
                    }}>{element.title}</p>
                    <p style={{
                      fontSize: '1.1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: '0',
                      fontWeight: '400',
                      lineHeight: '1.5'
                    }}>{element.location}</p>
                  </div>
                </div>
                <button 
                  style={{
                    background: `linear-gradient(135deg, ${element.color}, ${element.color}dd)`,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '18px 30px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    boxShadow: `0 8px 20px ${element.color}30`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = `0 12px 30px ${element.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = `0 8px 20px ${element.color}30`;
                  }}
                >
                  Open Positions {element.openPositions}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 768px) {
          .banner {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .content {
            flex-direction: column !important;
            text-align: center !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PopularCompanies;