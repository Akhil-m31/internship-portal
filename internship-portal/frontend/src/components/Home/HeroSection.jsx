import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Students",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Companies",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div 
        className="heroSection"
        style={{
          padding: '120px 0 80px',
          position: 'relative',
          zIndex: 1,
          background: 'transparent'
        }}
      >
        <div 
          className="container"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            minHeight: '600px'
          }}
        >
          <div 
            className="title"
            style={{
              color: '#ffffff',
              animation: 'fadeInUp 1s ease-out'
            }}
          >
            <h1 style={{
              fontSize: 'clamp(3rem, 5vw, 5.5rem)',
              fontWeight: '700',
              lineHeight: '1.1',
              margin: '0 0 20px 0',
              background: 'linear-gradient(135deg, #ffffff 0%, #e0e0ff 50%, #c0c0ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              overflow: 'hidden'
            }}>Find a job that suits</h1>
            <h1 style={{
              fontSize: 'clamp(3rem, 5vw, 5.5rem)',
              fontWeight: '700',
              lineHeight: '1.1',
              margin: '0 0 40px 0',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #e056fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              overflow: 'hidden'
            }}>your interests and skills</h1>
            <p style={{
              fontSize: '1.25rem',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '400',
              maxWidth: '500px',
              margin: '0'
            }}>
              Discover job opportunities that match your skills and passions.
              Connect with employers seeking talent like yours for rewarding
              careers.
            </p>
          </div>
          <div 
            className="image"
            style={{
              position: 'relative',
              animation: 'fadeInRight 1s ease-out 0.3s both'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              right: '-20px',
              bottom: '-20px',
              background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(238, 90, 111, 0.2), rgba(224, 86, 253, 0.2))',
              borderRadius: '30px',
              filter: 'blur(20px)',
              zIndex: -1
            }}></div>
            <img 
              src="/heroS.jpg" 
              alt="hero" 
              style={{
                width: '100%',
                height: 'auto',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
              }}
            />
          </div>
        </div>
        <div 
          className="details"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginTop: '100px',
            padding: '0 40px',
            flexWrap: 'wrap',
            animation: 'fadeInUp 1s ease-out 0.6s both'
          }}
        >
          {details.map((element, index) => {
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
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px',
                  minWidth: '200px',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `cardSlideUp 0.6s ease-out ${0.8 + index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 107, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div 
                  className="icon"
                  style={{
                    fontSize: '2.5rem',
                    color: '#ff6b6b',
                    background: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {element.icon}
                </div>
                <div 
                  className="content"
                  style={{
                    textAlign: 'center'
                  }}
                >
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    margin: '0 0 8px 0',
                    letterSpacing: '-0.01em'
                  }}>{element.title}</p>
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: '0',
                    fontWeight: '500'
                  }}>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes cardSlideUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (max-width: 768px) {
            .container {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
              text-align: center;
            }
            .details {
              gap: 20px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default HeroSection;
