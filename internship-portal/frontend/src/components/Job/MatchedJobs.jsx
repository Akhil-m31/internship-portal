import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaBuilding, 
  FaUserGraduate, 
  FaCogs, 
  FaTrophy,
  FaSpinner,
  FaUser,
  FaArrowRight,
  FaChartLine
} from "react-icons/fa";

const MatchedJobs = () => {
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(true);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || user.role !== "Job Seeker") {
      navigateTo("/");
      return;
    }

    const fetchMatchedJobs = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/match/jobs",
          { withCredentials: true }
        );

        if (data.success) {
          setMatchedJobs(data.matchedJobs);
        }
      } catch (error) {
        if (error.response && error.response.status === 400 && 
            error.response.data.message.includes("profile")) {
          setProfileExists(false);
          toast.error("Please complete your student profile first");
        } else {
          toast.error(error.response?.data?.message || "Error fetching matched jobs");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMatchedJobs();
  }, [isAuthorized, user, navigateTo]);

  // Profile Not Exists Component
  if (!profileExists) {
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
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(238, 90, 36, 0.2))",
            top: "20%",
            left: "-5%",
            zIndex: 0,
            animation: "float 8s ease-in-out infinite"
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(255, 159, 243, 0.2), rgba(243, 104, 224, 0.2))",
            bottom: "20%",
            right: "-5%",
            zIndex: 0,
            animation: "float 8s ease-in-out infinite 4s"
          }}
        />

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 40px",
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh"
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "32px",
              padding: "60px 50px",
              textAlign: "center",
              width: "100%",
              maxWidth: "600px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                margin: "0 auto 32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff6b6b, #ee5a6f)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                color: "white",
                boxShadow: "0 20px 40px rgba(255, 107, 107, 0.4)"
              }}
            >
              <FaUser />
            </div>
            
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #e056fd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: "0 0 20px 0"
              }}
            >
              Complete Your Profile
            </h1>
            
            <p
              style={{
                fontSize: "1.25rem",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: "1.6",
                margin: "0 0 40px 0"
              }}
            >
              You need to complete your student profile to see matched internships and unlock personalized recommendations.
            </p>
            
            <Link
              to="/student/profile"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "18px 32px",
                background: "linear-gradient(135deg, #ff6b6b, #ee5a6f)",
                color: "white",
                textDecoration: "none",
                borderRadius: "16px",
                fontWeight: "600",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 32px rgba(255, 107, 107, 0.4)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(255, 107, 107, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(255, 107, 107, 0.4)";
              }}
            >
              <span>Create Profile</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}</style>
      </div>
    );
  }

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
          top: "40%",
          right: "15%",
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
        {/* Header Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "80px",
            animation: "fadeInUp 1s ease-out"
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              fontWeight: "700",
              lineHeight: "1.2",
              margin: "0 0 20px 0",
              background: "linear-gradient(135deg, #ffffff 0%, #e0e0ff 50%, #c0c0ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em"
            }}
          >
            Matched
          </h1>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              fontWeight: "700",
              lineHeight: "1.2",
              margin: "0 0 30px 0",
              background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #e056fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em"
            }}
          >
            Internships
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6"
            }}
          >
            Personalized internships based on your skills, education, and preferences
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "100px 0",
              animation: "fadeInUp 1s ease-out 0.3s both"
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff6b6b, #ee5a6f)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                animation: "spin 1s linear infinite"
              }}
            >
              <FaSpinner style={{ color: "white", fontSize: "32px" }} />
            </div>
            <h3
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "1.5rem",
                fontWeight: "600",
                margin: "0"
              }}
            >
              Finding your perfect matches...
            </h3>
          </div>
        ) : (
          <>
            {/* No Jobs State */}
            {matchedJobs.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 0",
                  animation: "fadeInUp 1s ease-out 0.5s both"
                }}
              >
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    margin: "0 auto 32px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "48px",
                    color: "rgba(255, 255, 255, 0.3)"
                  }}
                >
                  <FaChartLine />
                </div>
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "600",
                    color: "rgba(255, 255, 255, 0.9)",
                    margin: "0 0 16px 0"
                  }}
                >
                  No Matched Internships Found
                </h2>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "1.1rem",
                    maxWidth: "500px",
                    margin: "0 auto"
                  }}
                >
                  We couldn&apos;t find any internships that match your profile. Try updating your skills or preferences.
                </p>
              </div>
            ) : (
              /* Jobs Grid */
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
                  gap: "30px",
                  animation: "fadeInUp 1s ease-out 0.3s both"
                }}
              >
                {matchedJobs.map((item, index) => {
                  const overallScore = Math.round(item.matchScore.overallScore);
                  const cgpaScore = Math.round(item.matchScore.cgpaScore);
                  const skillsScore = Math.round(item.matchScore.skillsScore);
                  const educationScore = Math.round(item.matchScore.educationScore);
                  
                  return (
                    <div
                      key={item.job._id}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "24px",
                        padding: "32px",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.4s ease",
                        cursor: "pointer",
                        animation: `cardSlideUp 0.6s ease-out ${0.1 * index}s both`,
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                        e.currentTarget.style.borderColor = "rgba(255, 107, 107, 0.3)";
                        e.currentTarget.style.boxShadow = "0 20px 60px rgba(255, 107, 107, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
                      }}
                    >
                      {/* Match Score Badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: "20px",
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          background: `conic-gradient(#ff6b6b 0deg ${overallScore * 3.6}deg, rgba(255, 255, 255, 0.1) ${overallScore * 3.6}deg 360deg)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.9rem",
                          fontWeight: "700",
                          color: "white",
                          flexDirection: "column",
                          gap: "2px"
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            background: "rgba(45, 55, 72, 0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column"
                          }}
                        >
                          <span style={{ fontSize: "1rem", fontWeight: "800" }}>{overallScore}%</span>
                          <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>Match</span>
                        </div>
                      </div>

                      {/* Job Header */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "16px",
                          marginBottom: "24px",
                          paddingRight: "100px"
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "20px",
                            background: "linear-gradient(135deg, #ff6b6b, #ee5a6f)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "24px",
                            flexShrink: 0,
                            boxShadow: "0 8px 20px rgba(255, 107, 107, 0.3)"
                          }}
                        >
                          <FaBriefcase />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: "700",
                              color: "#ffffff",
                              margin: "0 0 8px 0",
                              lineHeight: "1.3"
                            }}
                          >
                            {item.job.title}
                          </h3>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              marginBottom: "8px"
                            }}
                          >
                            <FaBuilding
                              style={{
                                color: "rgba(255, 255, 255, 0.6)",
                                fontSize: "14px"
                              }}
                            />
                            <span
                              style={{
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "1rem",
                                fontWeight: "500"
                              }}
                            >
                              {item.job.category}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px"
                            }}
                          >
                            <FaMapMarkerAlt
                              style={{
                                color: "#ff6b6b",
                                fontSize: "14px"
                              }}
                            />
                            <span
                              style={{
                                color: "rgba(255, 255, 255, 0.8)",
                                fontSize: "0.95rem",
                                fontWeight: "500"
                              }}
                            >
                              {item.job.country}, {item.job.city}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Match Details */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "16px",
                          marginBottom: "28px"
                        }}
                      >
                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            borderRadius: "12px",
                            padding: "16px 12px",
                            textAlign: "center",
                            border: "1px solid rgba(255, 255, 255, 0.05)"
                          }}
                        >
                          <FaTrophy
                            style={{
                              color: "#ff6b6b",
                              fontSize: "20px",
                              marginBottom: "8px"
                            }}
                          />
                          <div
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "700",
                              color: "white",
                              marginBottom: "4px"
                            }}
                          >
                            {cgpaScore}%
                          </div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "rgba(255, 255, 255, 0.6)"
                            }}
                          >
                            CGPA
                          </div>
                        </div>
                        
                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            borderRadius: "12px",
                            padding: "16px 12px",
                            textAlign: "center",
                            border: "1px solid rgba(255, 255, 255, 0.05)"
                          }}
                        >
                          <FaCogs
                            style={{
                              color: "#ff6b6b",
                              fontSize: "20px",
                              marginBottom: "8px"
                            }}
                          />
                          <div
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "700",
                              color: "white",
                              marginBottom: "4px"
                            }}
                          >
                            {skillsScore}%
                          </div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "rgba(255, 255, 255, 0.6)"
                            }}
                          >
                            Skills
                          </div>
                        </div>
                        
                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            borderRadius: "12px",
                            padding: "16px 12px",
                            textAlign: "center",
                            border: "1px solid rgba(255, 255, 255, 0.05)"
                          }}
                        >
                          <FaUserGraduate
                            style={{
                              color: "#ff6b6b",
                              fontSize: "20px",
                              marginBottom: "8px"
                            }}
                          />
                          <div
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "700",
                              color: "white",
                              marginBottom: "4px"
                            }}
                          >
                            {educationScore}%
                          </div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "rgba(255, 255, 255, 0.6)"
                            }}
                          >
                            Education
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link
                        to={`/job/${item.job._id}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "12px",
                          padding: "16px 24px",
                          background: "linear-gradient(135deg, #ff6b6b, #ee5a6f)",
                          color: "white",
                          textDecoration: "none",
                          borderRadius: "16px",
                          fontWeight: "600",
                          fontSize: "1rem",
                          transition: "all 0.3s ease",
                          position: "relative",
                          overflow: "hidden"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 8px 32px rgba(255, 107, 107, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <span>View Details</span>
                        <FaArrowRight style={{ fontSize: "14px" }} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .matched-jobs-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MatchedJobs;