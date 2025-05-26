import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import PropTypes from "prop-types";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2d3748 0%, #1a202c 50%, #2d3748 100%)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "120px",
        paddingBottom: "80px"
      }}
    >
      {/* Animated background orbs */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(238, 90, 36, 0.2))",
          top: "-100px",
          left: "-100px",
          zIndex: 0,
          animation: "float 8s ease-in-out infinite"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 159, 243, 0.2), rgba(243, 104, 224, 0.2))",
          bottom: "-80px",
          right: "-80px",
          zIndex: 0,
          animation: "float 8s ease-in-out infinite 4s"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(224, 86, 253, 0.15), rgba(255, 107, 107, 0.15))",
          top: "50%",
          right: "10%",
          zIndex: 0,
          animation: "float 6s ease-in-out infinite 2s"
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
          zIndex: 1
        }}
      >
        {user && user.role === "Job Seeker" ? (
          <div>
            <div 
              style={{
                textAlign: 'center',
                marginBottom: '60px',
                animation: 'fadeInUp 1s ease-out'
              }}
            >
              <h1 
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: '700',
                  lineHeight: '1.2',
                  margin: '0 0 20px 0',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0e0ff 50%, #c0c0ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.02em'
                }}
              >
                My Applications
              </h1>
              <p 
                style={{
                  fontSize: '1.2rem',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: '400',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                Track all your job applications in one place
              </p>
            </div>
            {applications.length <= 0 ? (
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '30px',
                  padding: '50px',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
                  textAlign: 'center'
                }}
              >
                <h4 
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '1.5rem',
                    marginBottom: '20px'
                  }}
                >
                  No Applications Found
                </h4>
                <p 
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '1rem'
                  }}
                >
                  You haven&apos;t applied to any jobs yet.
                </p>
              </div>
            ) : (
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
                  gap: '30px'
                }}
              >
                {applications.map((element) => (
                  <JobSeekerCard
                    element={element}
                    key={element._id}
                    deleteApplication={deleteApplication}
                    openModal={openModal}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div 
              style={{
                textAlign: 'center',
                marginBottom: '60px',
                animation: 'fadeInUp 1s ease-out'
              }}
            >
              <h1 
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: '700',
                  lineHeight: '1.2',
                  margin: '0 0 20px 0',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0e0ff 50%, #c0c0ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.02em'
                }}
              >
                Applications From Students
              </h1>
              <p 
                style={{
                  fontSize: '1.2rem',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: '400',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                Review all applications submitted for your job postings
              </p>
            </div>
            {applications.length <= 0 ? (
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '30px',
                  padding: '50px',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
                  textAlign: 'center'
                }}
              >
                <h4 
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '1.5rem',
                    marginBottom: '20px'
                  }}
                >
                  No Applications Found
                </h4>
                <p 
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '1rem'
                  }}
                >
                  No students have applied to your jobs yet.
                </p>
              </div>
            ) : (
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
                  gap: '30px',
                  padding: '20px'
                }}
              >
                {applications.map((element) => (
                  <EmployerCard
                    element={element}
                    key={element._id}
                    openModal={openModal}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}

      {/* CSS Animations */}
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
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(5deg); 
          }
        }
        
        @media (max-width: 768px) {
          section > div {
            padding: 0 20px !important;
          }
          
          .job_seeker_card {
            padding: 30px !important;
          }
          
          .resume img {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MyApplications;
const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div 
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '30px',
        padding: '40px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        animation: 'fadeInUp 1s ease-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 30px 70px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.2)';
      }}
    >
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '30px'
          }}
        >
          <div 
            style={{
              flex: 1
            }}
          >
            <p 
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                marginBottom: '10px',
                lineHeight: '1.6'
              }}
            >
              <span 
                style={{
                  color: '#ff6b6b',
                  fontWeight: '600',
                  marginRight: '8px'
                }}
              >
                Name:
              </span> 
              {element.name}
            </p>
            <p 
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                marginBottom: '10px',
                lineHeight: '1.6'
              }}
            >
              <span 
                style={{
                  color: '#ff6b6b',
                  fontWeight: '600',
                  marginRight: '8px'
                }}
              >
                Email:
              </span> 
              {element.email}
            </p>
            <p 
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                marginBottom: '10px',
                lineHeight: '1.6'
              }}
            >
              <span 
                style={{
                  color: '#ff6b6b',
                  fontWeight: '600',
                  marginRight: '8px'
                }}
              >
                Phone:
              </span> 
              {element.phone}
            </p>
            <p 
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                marginBottom: '10px',
                lineHeight: '1.6'
              }}
            >
              <span 
                style={{
                  color: '#ff6b6b',
                  fontWeight: '600',
                  marginRight: '8px'
                }}
              >
                Address:
              </span> 
              {element.address}
            </p>
            <p 
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                marginBottom: '10px',
                lineHeight: '1.6'
              }}
            >
              <span 
                style={{
                  color: '#ff6b6b',
                  fontWeight: '600',
                  marginRight: '8px'
                }}
              >
                Cover Letter:
              </span> 
              {element.coverLetter}
            </p>
          </div>
          <div 
            style={{
              width: '150px',
              height: '200px',
              borderRadius: '15px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onClick={() => openModal(element.resume.url)}
          >
            <img
              src={element.resume.url}
              alt="resume"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </div>
        </div>
        <div 
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button 
            onClick={() => deleteApplication(element._id)}
            style={{
              padding: '12px 24px',
              background: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              borderRadius: '12px',
              color: '#ff6b6b',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 107, 107, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 107, 107, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
};

JobSeekerCard.propTypes = {
  element: PropTypes.object.isRequired,
  deleteApplication: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div 
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '30px',
        padding: '40px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        animation: 'fadeInUp 1s ease-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 30px 70px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.2)';
      }}
    >
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '30px'
        }}
      >
        <div 
          style={{
            flex: 1
          }}
        >
          <p 
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1rem',
              marginBottom: '10px',
              lineHeight: '1.6'
            }}
          >
            <span 
              style={{
                color: '#ff6b6b',
                fontWeight: '600',
                marginRight: '8px'
              }}
            >
              Name:
            </span> 
            {element.name}
          </p>
          <p 
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1rem',
              marginBottom: '10px',
              lineHeight: '1.6'
            }}
          >
            <span 
              style={{
                color: '#ff6b6b',
                fontWeight: '600',
                marginRight: '8px'
              }}
            >
              Email:
            </span> 
            {element.email}
          </p>
          <p 
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1rem',
              marginBottom: '10px',
              lineHeight: '1.6'
            }}
          >
            <span 
              style={{
                color: '#ff6b6b',
                fontWeight: '600',
                marginRight: '8px'
              }}
            >
              Phone:
            </span> 
            {element.phone}
          </p>
          <p 
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1rem',
              marginBottom: '10px',
              lineHeight: '1.6'
            }}
          >
            <span 
              style={{
                color: '#ff6b6b',
                fontWeight: '600',
                marginRight: '8px'
              }}
            >
              Address:
            </span> 
            {element.address}
          </p>
          <p 
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1rem',
              marginBottom: '10px',
              lineHeight: '1.6'
            }}
          >
            <span 
              style={{
                color: '#ff6b6b',
                fontWeight: '600',
                marginRight: '8px'
              }}
            >
              Cover Letter:
            </span> 
            {element.coverLetter}
          </p>
        </div>
        <div 
          style={{
            width: '150px',
            height: '200px',
            borderRadius: '15px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          onClick={() => openModal(element.resume.url)}
        >
          <img
            src={element.resume.url}
            alt="resume"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </div>
      </div>
    </div>
  );
};

EmployerCard.propTypes = {
  element: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};