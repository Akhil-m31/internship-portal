import { useContext, useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { MdGrade } from "react-icons/md";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const JobRequirements = () => {
  const [minimumCGPA, setMinimumCGPA] = useState("");
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [minDegree, setMinDegree] = useState("");
  const [preferredFields, setPreferredFields] = useState([]);
  const [field, setField] = useState("");
  const [loading, setLoading] = useState(false);
  const [requirementsExist, setRequirementsExist] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { jobId } = useParams();

  // Fetch job details and existing requirements if they exist
  useEffect(() => {
    if (!isAuthorized || user.role !== "Employer") {
      navigateTo("/");
      return;
    }

    const fetchJobDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/job/${jobId}`,
          { withCredentials: true }
        );

        if (data.success) {
          setJobDetails(data.job);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching job details");
        navigateTo("/my/jobs");
      }
    };

    const fetchRequirements = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/job-requirements/${jobId}`,
          { withCredentials: true }
        );

        if (data.success) {
          const { requirements } = data;
          setMinimumCGPA(requirements.minimumCGPA);
          setRequiredSkills(requirements.requiredSkills);
          setMinDegree(requirements.educationRequirement.minDegree);
          setPreferredFields(requirements.educationRequirement.preferredFields);
          setRequirementsExist(true);
        }
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          toast.error(error.response.data.message || "Error fetching requirements");
        }
      }
    };

    fetchJobDetails();
    fetchRequirements();
  }, [isAuthorized, user, navigateTo, jobId]);

  const addSkill = () => {
    if (skill && !requiredSkills.includes(skill)) {
      setRequiredSkills([...requiredSkills, skill]);
      setSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...requiredSkills];
    updatedSkills.splice(index, 1);
    setRequiredSkills(updatedSkills);
  };

  const addField = () => {
    if (field && !preferredFields.includes(field)) {
      setPreferredFields([...preferredFields, field]);
      setField("");
    }
  };

  const removeField = (index) => {
    const updatedFields = [...preferredFields];
    updatedFields.splice(index, 1);
    setPreferredFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requirementsData = {
        minimumCGPA: parseFloat(minimumCGPA),
        requiredSkills,
        educationRequirement: {
          minDegree,
          preferredFields,
        },
      };

      const url = requirementsExist
        ? `http://localhost:4000/api/v1/job-requirements/${jobId}/update`
        : `http://localhost:4000/api/v1/job-requirements/${jobId}/create`;

      const { data } = await axios.post(url, requirementsData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.success) {
        toast.success(requirementsExist ? "Requirements updated!" : "Requirements created!");
        setRequirementsExist(true);
        navigateTo("/my/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!jobDetails) {
    return (
      <section style={{
        display: 'flex',
        minWidth: '100vw',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 50%, #2d3748 100%)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '48px 40px',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          maxWidth: '450px',
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            flexDirection: 'column',
            textAlign: 'center',
            marginBottom: '40px',
            alignItems: 'center'
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a24, #ff9ff3, #f368e0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0',
              letterSpacing: '-0.5px'
            }}>Loading job details...</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      display: 'flex',
      minWidth: '100vw',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 50%, #2d3748 100%)',
      padding: '40px 20px'
    }}>
      {/* Animated floating orbs */}
      <div style={{
        content: '',
        position: 'absolute',
        borderRadius: '50%',
        zIndex: 0,
        width: '400px',
        height: '400px',
        background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.3), rgba(238, 90, 36, 0.3))',
        top: '-100px',
        left: '-100px',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      
      <div style={{
        content: '',
        position: 'absolute',
        borderRadius: '50%',
        zIndex: 0,
        width: '300px',
        height: '300px',
        background: 'linear-gradient(135deg, rgba(255, 159, 243, 0.3), rgba(243, 104, 224, 0.3))',
        bottom: '-80px',
        right: '-80px',
        animation: 'float 6s ease-in-out infinite 3s'
      }}></div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '48px 40px',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        maxWidth: '600px',
        width: '100%',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        zIndex: 1,
        transition: 'transform 0.3s ease'
      }}>
        <div style={{
          display: 'flex',
          gap: '20px',
          flexDirection: 'column',
          textAlign: 'center',
          marginBottom: '40px',
          alignItems: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 10px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24, #ff9ff3, #f368e0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(255, 107, 107, 0.4)',
            animation: 'glow 2s ease-in-out infinite alternate'
          }}>
            <span style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: '900',
              letterSpacing: '2px'
            }}>JR</span>
          </div>
          
          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24, #ff9ff3, #f368e0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0',
            letterSpacing: '-0.5px'
          }}>{requirementsExist ? "Update Job Requirements" : "Set Job Requirements"}</h3>
          
          <p style={{
            fontSize: '1rem',
            color: '#2d3748',
            margin: '0',
            fontWeight: '500'
          }}>For job: {jobDetails.title}</p>
        </div>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          width: '100%'
        }}>
          {/* Minimum CGPA */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label style={{
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '4px',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Minimum CGPA (0-10)</label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '16px',
              background: 'rgba(247, 250, 252, 0.8)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: '0',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                placeholder="Enter minimum CGPA required"
                value={minimumCGPA}
                onChange={(e) => setMinimumCGPA(e.target.value)}
                required
                style={{
                  background: 'transparent',
                  padding: '16px 20px',
                  border: 'none',
                  width: '100%',
                  fontSize: '16px',
                  color: '#2d3748',
                  fontWeight: '500',
                  outline: 'none'
                }}
              />
              <MdGrade style={{
                width: '50px',
                height: '50px',
                fontSize: '18px',
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                color: '#fff',
                borderRadius: '12px',
                margin: '8px',
                padding: '14px',
                transition: 'all 0.3s ease',
                flexShrink: 0
              }} />
            </div>
          </div>

          {/* Required Skills */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label style={{
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '4px',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Required Skills</label>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  placeholder="Add a required skill"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  style={{
                    background: 'rgba(247, 250, 252, 0.8)',
                    padding: '16px 20px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '16px',
                    width: '100%',
                    fontSize: '16px',
                    color: '#2d3748',
                    fontWeight: '500',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
                <button 
                  type="button" 
                  onClick={addSkill}
                  style={{
                    padding: '16px 24px',
                    border: 'none',
                    fontWeight: '600',
                    color: '#fff',
                    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                    fontSize: '14px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 8px 32px rgba(255, 107, 107, 0.4)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Add
                </button>
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {requiredSkills.map((s, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 107, 107, 0.1)',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 107, 107, 0.3)'
                  }}>
                    <span style={{
                      color: '#2d3748',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>{s}</span>
                    <button 
                      type="button" 
                      onClick={() => removeSkill(index)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ff6b6b',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        padding: '0',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Minimum Degree */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label style={{
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '4px',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Minimum Degree Required</label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '16px',
              background: 'rgba(247, 250, 252, 0.8)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: '0',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <select 
                value={minDegree} 
                onChange={(e) => setMinDegree(e.target.value)} 
                required
                style={{
                  background: 'transparent',
                  padding: '16px 20px',
                  border: 'none',
                  width: '100%',
                  fontSize: '16px',
                  color: '#2d3748',
                  fontWeight: '500',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">Select Minimum Degree</option>
                <option value="High School">High School</option>
                <option value="Bachelor&apos;s">Bachelor&apos;s</option>
                <option value="Master&apos;s">Master&apos;s</option>
                <option value="PhD">PhD</option>
                <option value="Diploma">Diploma</option>
                <option value="Certificate">Certificate</option>
                <option value="Other">Other</option>
              </select>
              <FaGraduationCap style={{
                width: '50px',
                height: '50px',
                fontSize: '18px',
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                color: '#fff',
                borderRadius: '12px',
                margin: '8px',
                padding: '14px',
                transition: 'all 0.3s ease',
                flexShrink: 0
              }} />
            </div>
          </div>

          {/* Preferred Fields */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label style={{
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '4px',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Preferred Fields of Study</label>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  placeholder="Add a preferred field"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  style={{
                    background: 'rgba(247, 250, 252, 0.8)',
                    padding: '16px 20px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '16px',
                    width: '100%',
                    fontSize: '16px',
                    color: '#2d3748',
                    fontWeight: '500',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
                <button 
                  type="button" 
                  onClick={addField}
                  style={{
                    padding: '16px 24px',
                    border: 'none',
                    fontWeight: '600',
                    color: '#fff',
                    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                    fontSize: '14px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 8px 32px rgba(255, 107, 107, 0.4)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Add
                </button>
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {preferredFields.map((f, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 107, 107, 0.1)',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 107, 107, 0.3)'
                  }}>
                    <span style={{
                      color: '#2d3748',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>{f}</span>
                    <button 
                      type="button" 
                      onClick={() => removeField(index)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ff6b6b',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        padding: '0',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '18px 24px',
              textAlign: 'center',
              border: 'none',
              marginTop: '16px',
              fontWeight: '700',
              color: '#fff',
              background: loading ? 'rgba(255, 107, 107, 0.5)' : 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
              fontSize: '16px',
              borderRadius: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: loading ? 'none' : '0 8px 32px rgba(255, 107, 107, 0.4)'
            }}
          >
            {loading ? "Processing..." : requirementsExist ? "Update Requirements" : "Set Requirements"}
          </button>
        </form>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes glow {
          0% { box-shadow: 0 8px 32px rgba(255, 107, 107, 0.4); }
          100% { box-shadow: 0 8px 40px rgba(255, 107, 107, 0.8); }
        }
      `}</style>
    </section>
  );
};

export default JobRequirements;