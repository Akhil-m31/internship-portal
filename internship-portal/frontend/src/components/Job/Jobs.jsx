import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { FaBriefcase, FaMapMarkerAlt, FaBuilding, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
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
            All Available
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
            Discover amazing internship opportunities that match your skills and career goals
          </p>
        </div>

        {/* Jobs Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: "30px",
            animation: "fadeInUp 1s ease-out 0.3s both"
          }}
        >
          {jobs.jobs &&
            jobs.jobs.map((element, index) => {
              return (
                <div
                  key={element._id}
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
                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: "linear-gradient(135deg, #ff6b6b, #ee5a6f, #e056fd)",
                      borderRadius: "24px 24px 0 0"
                    }}
                  />

                  {/* Job Title */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      marginBottom: "24px"
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, #ff6b6b, #ee5a6f)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "20px",
                        flexShrink: 0
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
                        {element.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
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
                            fontSize: "0.9rem",
                            fontWeight: "500"
                          }}
                        >
                          {element.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      marginBottom: "28px"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                      }}
                    >
                      <FaMapMarkerAlt
                        style={{
                          color: "#ff6b6b",
                          fontSize: "16px"
                        }}
                      />
                      <span
                        style={{
                          color: "rgba(255, 255, 255, 0.8)",
                          fontSize: "1rem",
                          fontWeight: "500"
                        }}
                      >
                        {element.country}
                      </span>
                    </div>
                    
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                      }}
                    >
                      <FaCalendarAlt
                        style={{
                          color: "#ff6b6b",
                          fontSize: "16px"
                        }}
                      />
                      <span
                        style={{
                          color: "rgba(255, 255, 255, 0.8)",
                          fontSize: "1rem",
                          fontWeight: "500"
                        }}
                      >
                        Posted Recently
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/job/${element._id}`}
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
                      overflow: "hidden",
                      textAlign: "center"
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

        {/* Empty State */}
        {(!jobs.jobs || jobs.jobs.length === 0) && (
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
                margin: "0 auto 24px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                color: "rgba(255, 255, 255, 0.3)"
              }}
            >
              <FaBriefcase />
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "rgba(255, 255, 255, 0.8)",
                margin: "0 0 16px 0"
              }}
            >
              No Internships Available
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "1rem",
                margin: "0"
              }}
            >
              Check back soon for new opportunities!
            </p>
          </div>
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
        @media (max-width: 768px) {
          .jobs-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Jobs;