import { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav 
      className={isAuthorized ? "navbarShow" : "navbarHide"}
      style={{
        background: 'linear-gradient(135deg, rgba(45, 48, 62, 0.95) 0%, rgba(30, 32, 44, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '1000',
        height: '80px',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        overflow: 'hidden'
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            transition: 'transform 0.3s ease',
            overflow: 'hidden',
            padding: '24px',
          }}
          >
            <div style={{
              width: '45px',
              height: '45px',
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a24, #ff9ff3, #f368e0)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
              animation: 'glow 2s ease-in-out infinite alternate'
            }}>
              <span style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: '900',
                letterSpacing: '1px'
              }}>CC</span>
            </div>
            <span style={{
              fontSize: '24px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a24, #ff9ff3, #f368e0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              Career Connect
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <ul style={{
          display: window.innerWidth > 768 ? 'flex' : 'none',
          alignItems: 'center',
          gap: '40px',
          listStyle: 'none',
          margin: '0',
          padding: '0'
        }}>
          <li>
            <Link 
              to="/"
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                position: 'relative',
                padding: '8px 0'
              }}
              onMouseEnter={e => {
                e.target.style.color = '#ff6b6b';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Home
            </Link>
          </li>
          
          {user && user.role === "Job Seeker" && (
            <li>
              <Link 
                to="/matched-jobs"
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  padding: '8px 0'
                }}
                onMouseEnter={e => {
                  e.target.style.color = '#ff6b6b';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Matched Internships
              </Link>
            </li>
          )}
          
          <li>
            <Link 
              to="/job/getall"
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                position: 'relative',
                padding: '8px 0'
              }}
              onMouseEnter={e => {
                e.target.style.color = '#ff6b6b';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              All Internships
            </Link>
          </li>
          
          <li>
            <Link 
              to="/applications/me"
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                position: 'relative',
                padding: '8px 0'
              }}
              onMouseEnter={e => {
                e.target.style.color = '#ff6b6b';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {user && user.role === "Employer" ? "Applications" : "My Applications"}
            </Link>
          </li>
          
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link 
                  to="/job/post"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    padding: '8px 0'
                  }}
                  onMouseEnter={e => {
                    e.target.style.color = '#ff6b6b';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Post Internship
                </Link>
              </li>
              <li>
                <Link 
                  to="/job/me"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    padding: '8px 0'
                  }}
                  onMouseEnter={e => {
                    e.target.style.color = '#ff6b6b';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  My Internships
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link 
                to="/student/profile"
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  padding: '8px 0'
                }}
                onMouseEnter={e => {
                  e.target.style.color = '#ff6b6b';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Profile
              </Link>
            </li>
          )}

          <li style={{padding: '20px', overflow: 'hidden'}}>
            <button 
              onClick={handleLogout}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={e => {
                  e.target.style.color = '#ff6b6b';
                }}
                onMouseLeave={e => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(0)';
                }}
            >
              Logout
            </button>
          </li>
        </ul>
        
        {/* Mobile Menu Button */}
        <button 
          className="hamburger"
          onClick={() => setShow(!show)}
          style={{
            display: window.innerWidth <= 768 ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '24px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(255, 107, 107, 0.2)';
            e.target.style.transform = 'scale(1.1)';
            e.target.style.color = '#ff6b6b';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'scale(1)';
            e.target.style.color = 'rgba(255, 255, 255, 0.9)';
          }}
        >
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      {show && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'linear-gradient(135deg, rgba(30, 32, 44, 0.98) 0%, rgba(45, 48, 62, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: '999',
          padding: '32px 24px',
          animation: 'slideDown 0.3s ease'
        }}>
          <ul style={{
            listStyle: 'none',
            margin: '0',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <li>
              <Link 
                to="/"
                onClick={() => setShow(false)}
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  display: 'block',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={e => {
                  e.target.style.background = 'rgba(255, 107, 107, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 107, 107, 0.3)';
                  e.target.style.transform = 'translateX(8px)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                Home
              </Link>
            </li>
            
            {user && user.role === "Job Seeker" && (
              <li>
                <Link 
                  to="/matched-jobs"
                  onClick={() => setShow(false)}
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '18px',
                    fontWeight: '600',
                    display: 'block',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = 'rgba(255, 107, 107, 0.1)';
                    e.target.style.borderColor = 'rgba(255, 107, 107, 0.3)';
                    e.target.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  Matched Internships
                </Link>
              </li>
            )}
            
            <li>
              <Link 
                to="/job/getall"
                onClick={() => setShow(false)}
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  display: 'block',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={e => {
                  e.target.style.background = 'rgba(255, 107, 107, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 107, 107, 0.3)';
                  e.target.style.transform = 'translateX(8px)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                All Internships
              </Link>
            </li>
            
            <li>
              <Link 
                to="/applications/me"
                onClick={() => setShow(false)}
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  display: 'block',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={e => {
                  e.target.style.background = 'rgba(255, 107, 107, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 107, 107, 0.3)';
                  e.target.style.transform = 'translateX(8px)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                {user && user.role === "Employer" ? "Applications" : "My Applications"}
              </Link>
            </li>
            
            {user && user.role === "Employer" ? (
              <>
                <li>
                  <Link 
                    to="/job/post"
                    onClick={() => setShow(false)}
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      textDecoration: 'none',
                      fontSize: '18px',
                      fontWeight: '600',
                      display: 'block',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseEnter={e => {
                      e.target.style.background = 'rgba(255, 107, 107, 0.1)';
                      e.target.style.borderColor = 'rgba(255, 107, 107, 0.3)';
                      e.target.style.transform = 'translateX(8px)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    Post Internship
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/job/me"
                    onClick={() => setShow(false)}
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      textDecoration: 'none',
                      fontSize: '18px',
                      fontWeight: '600',
                      display: 'block',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseEnter={e => {
                      e.target.style.background = 'rgba(255, 107, 107, 0.1)';
                      e.target.style.borderColor = 'rgba(255, 107, 107, 0.3)';
                      e.target.style.transform = 'translateX(8px)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    My Internships
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  to="/student/profile"
                  onClick={() => setShow(false)}
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '18px',
                    fontWeight: '600',
                    display: 'block',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = 'rgba(255, 107, 107, 0.1)';
                    e.target.style.borderColor = 'rgba(255, 107, 107, 0.3)';
                    e.target.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  Profile
                </Link>
              </li>
            )}

            <li>
              <button 
                onClick={() => {
                  handleLogout();
                  setShow(false);
                }}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  marginTop: '24px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)'
                }}
                onMouseEnter={e => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.6)';
                }}
                onMouseLeave={e => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      <style>{`
        @keyframes glow {
          0% { box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4); }
          100% { box-shadow: 0 4px 25px rgba(255, 107, 107, 0.8); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .hamburger {
            display: flex !important;
          }
          ul:not(.mobile-menu) {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .hamburger {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;