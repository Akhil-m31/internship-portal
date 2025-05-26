import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaBuilding, 
  FaCalendarAlt, 
  FaDollarSign,
  FaGlobe,
  FaCity,
  FaFileAlt 
} from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch(() => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 50%, #2d3748 100%)',
        padding: '120px 40px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating background orbs */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(238, 90, 111, 0.2))',
        top: '-100px',
        left: '-100px',
        zIndex: 0,
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(255, 159, 243, 0.2), rgba(243, 104, 224, 0.2))',
        bottom: '-80px',
        right: '-80px',
        zIndex: 0,
        animation: 'float 6s ease-in-out infinite',
        animationDelay: '3s'
      }}></div>

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          animation: 'fadeInUp 1s ease-out'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            fontWeight: '700',
            margin: '0 0 20px 0',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e0ff 50%, #c0c0ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em'
          }}>Job Details</h1>
          <div style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a6f, #e056fd)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Main Content Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '50px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: 'fadeInUp 1s ease-out 0.3s both',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Job Title */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            padding: '0 0 30px 0',
            borderBottom: '2px solid rgba(255, 107, 107, 0.1)'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              margin: '0 0 15px 0',
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a6f, #e056fd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.01em'
            }}>{job.title}</h2>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
            }}>
              <FaBriefcase />
              {job.category}
            </div>
          </div>

          {/* Job Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '40px',
            padding: '15px',
          }}>
            {/* Location Card */}
            <div style={{
              background: 'rgba(255, 107, 107, 0.05)',
              borderRadius: '16px',
              padding: '25px',
              border: '1px solid rgba(255, 107, 107, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#2d3748',
                margin: '0 0 20px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaMapMarkerAlt style={{ color: '#ff6b6b' }} />
                Location Details
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaGlobe style={{ color: '#ff6b6b', fontSize: '16px' }} />
                  <span style={{ color: '#4a5568', fontWeight: '500' }}>Country:</span>
                  <span style={{ fontWeight: '600', color: '#2d3748' }}>{job.country}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaCity style={{ color: '#ff6b6b', fontSize: '16px' }} />
                  <span style={{ color: '#4a5568', fontWeight: '500' }}>City:</span>
                  <span style={{ fontWeight: '600', color: '#2d3748' }}>{job.city}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaBuilding style={{ color: '#ff6b6b', fontSize: '16px' }} />
                  <span style={{ color: '#4a5568', fontWeight: '500' }}>Location:</span>
                  <span style={{ fontWeight: '600', color: '#2d3748' }}>{job.location}</span>
                </div>
              </div>
            </div>

            {/* Salary & Date Card */}
            <div style={{
              background: 'rgba(238, 90, 111, 0.05)',
              borderRadius: '16px',
              padding: '25px',
              border: '1px solid rgba(238, 90, 111, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(238, 90, 111, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#2d3748',
                margin: '0 0 20px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaDollarSign style={{ color: '#ee5a6f' }} />
                Salary & Timing
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaDollarSign style={{ color: '#ee5a6f', fontSize: '16px' }} />
                  <span style={{ color: '#4a5568', fontWeight: '500' }}>Salary:</span>
                  <span style={{ fontWeight: '600', color: '#2d3748' }}>
                    {job.fixedSalary ? (
                      job.fixedSalary
                    ) : (
                      `${job.salaryFrom} - ${job.salaryTo}`
                    )}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaCalendarAlt style={{ color: '#ee5a6f', fontSize: '16px' }} />
                  <span style={{ color: '#4a5568', fontWeight: '500' }}>Posted:</span>
                  <span style={{ fontWeight: '600', color: '#2d3748' }}>{job.jobPostedOn}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div style={{
            background: 'rgba(224, 86, 253, 0.05)',
            borderRadius: '16px',
            padding: '30px',
            border: '1px solid rgba(224, 86, 253, 0.1)',
            marginBottom: '40px'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#2d3748',
              margin: '0 0 20px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <FaFileAlt style={{ color: '#e056fd' }} />
              Job Description
            </h3>
            <p style={{
              color: '#4a5568',
              lineHeight: '1.8',
              fontSize: '1.05rem',
              margin: '0',
              fontWeight: '400'
            }}>{job.description}</p>
          </div>

          {/* Apply Button */}
          {user && user.role === "Employer" ? (
            <div style={{
              textAlign: 'center',
              padding: '20px',
              background: 'rgba(255, 107, 107, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 107, 107, 0.2)'
            }}>
              <p style={{
                color: '#ff6b6b',
                fontWeight: '600',
                margin: '0',
                fontSize: '1.1rem'
              }}>You are viewing this job as an employer</p>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Link 
                to={`/application/${job._id}`}
                style={{
                  display: 'inline-block',
                  padding: '18px 40px',
                  textAlign: 'center',
                  border: 'none',
                  fontWeight: '700',
                  color: '#fff',
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                  fontSize: '16px',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  boxShadow: '0 8px 32px rgba(255, 107, 107, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 40px rgba(255, 107, 107, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 32px rgba(255, 107, 107, 0.4)';
                }}
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
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
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @media (max-width: 768px) {
          section > div {
            padding: 30px !important;
          }
          section > div > div:last-child {
            padding: 30px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default JobDetails;