import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
      color: '#ff6b6b'
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
      color: '#4ecdc4'
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
      color: '#45b7d1'
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
      color: '#96ceb4'
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
      color: '#feca57'
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
      color: '#ff9ff3'
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
      color: '#54a0ff'
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
      color: '#5f27cd'
    },
  ];
  
  return (
    <div 
      className="categories"
      style={{
        padding: '120px 0',
        position: 'relative'
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
      }}>POPULAR CATEGORIES</h3>
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
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          justifyContent: 'center',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}
      >
        {categories.map((element, index) => {
          return (
            <div 
              className="card" 
              key={element.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '40px 30px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = `${element.color}50`;
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.1), 0 0 30px ${element.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div 
                className="icon"
                style={{
                  fontSize: '3rem',
                  color: element.color,
                  background: `linear-gradient(135deg, ${element.color}20, ${element.color}10)`,
                  padding: '20px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '80px',
                  minHeight: '80px'
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
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  margin: '0 0 8px 0',
                  lineHeight: '1.3'
                }}>{element.title}</p>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  margin: '0',
                  fontWeight: '400'
                }}>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @media (max-width: 768px) {
          .banner {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PopularCategories;
