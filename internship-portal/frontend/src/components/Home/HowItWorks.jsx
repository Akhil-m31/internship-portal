import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div 
        className="howitworks"
        style={{
          padding: '120px 0',
          position: 'relative',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 100%)'
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
            margin: '0 0 80px 0',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e0ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em'
          }}>How Career Connect Works !</h3>
          <div 
            className="banner"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '40px',
              alignItems: 'stretch'
            }}
          >
            {[
              {
                icon: <FaUserPlus />,
                title: "Create Account",
                description: "Sign up to discover internship opportunities tailored to your profile. Quick registration gives you access to exclusive listings and direct employer connections.",
                color: '#ff6b6b'
              },
              {
                icon: <MdFindInPage />,
                title: "Find a Job/Post a Job",
                description: "Search internships or post opportunities. Connect talent with employers instantly.",
                color: '#4ecdc4'
              },
              {
                icon: <IoMdSend />,
                title: "Apply For Job/Recruit Suitable Candidates",
                description: "Submit applications with one click or find qualified candidates. Streamline your hiring and job search process.",
                color: '#45b7d1'
              }
            ].map((item, index) => (
              <div 
                className="card"
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  padding: '50px 40px',
                  textAlign: 'center',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `slideInUp 0.6s ease-out ${index * 0.2}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = `${item.color}40`;
                  e.currentTarget.style.boxShadow = `0 30px 60px rgba(0, 0, 0, 0.2), 0 0 40px ${item.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
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
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                  borderRadius: '24px 24px 0 0'
                }}></div>
                <div style={{
                  fontSize: '4rem',
                  color: item.color,
                  marginBottom: '30px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </div>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  margin: '0 0 20px 0',
                  letterSpacing: '-0.01em'
                }}>{item.title}</p>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: '0',
                  fontWeight: '400'
                }}>{item.description}</p>
              </div>
            ))}
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
          }
        `}</style>
      </div>
    </>
  );
};

export default HowItWorks;
