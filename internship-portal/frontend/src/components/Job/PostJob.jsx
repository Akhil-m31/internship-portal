import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div 
        className="job_post page"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 20px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 50%, #2d3748 100%)',
        }}
      >
        {/* Animated floating orbs */}
        <div style={{
          content: '',
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.3), rgba(238, 90, 36, 0.3))',
          borderRadius: '50%',
          top: '-100px',
          left: '-100px',
          zIndex: 0,
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        
        <div style={{
          content: '',
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(255, 159, 243, 0.3), rgba(243, 104, 224, 0.3))',
          borderRadius: '50%',
          bottom: '-80px',
          right: '-80px',
          zIndex: 0,
          animation: 'float 6s ease-in-out infinite 3s'
        }}></div>

        <div 
          className="container"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            padding: '48px 40px',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            maxWidth: '900px',
            width: '100%',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.3s ease',
            minWidth: '600px',
            margin: '40px 0px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24, #ff9ff3, #f368e0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 40px 0',
            letterSpacing: '-0.5px',
            textAlign: 'center'
          }}>POST NEW INTERNSHIP</h3>
          
          <form 
            onSubmit={handleJobPost}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div 
              className="wrapper"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '16px',
                background: 'rgba(247, 250, 252, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Internship Title"
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
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = '#ff6b6b';
                    e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.target.parentElement.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.parentElement.style.background = 'rgba(247, 250, 252, 0.8)';
                    e.target.parentElement.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '16px',
                background: 'rgba(247, 250, 252, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = '#ff6b6b';
                    e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.target.parentElement.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.parentElement.style.background = 'rgba(247, 250, 252, 0.8)';
                    e.target.parentElement.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="Graphics & Design">Graphics & Design</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Frontend Web Development">Frontend Web Development</option>
                  <option value="Business Development Executive">Business Development Executive</option>
                  <option value="Account & Finance">Account & Finance</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Video Animation">Video Animation</option>
                  <option value="MEAN Stack Development">MEAN STACK Development</option>
                  <option value="MERN Stack Development">MERN STACK Development</option>
                  <option value="Data Entry Operator">Data Entry Operator</option>
                </select>
              </div>
            </div>
            
            <div 
              className="wrapper"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '16px',
                background: 'rgba(247, 250, 252, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
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
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = '#ff6b6b';
                    e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.target.parentElement.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.parentElement.style.background = 'rgba(247, 250, 252, 0.8)';
                    e.target.parentElement.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '16px',
                background: 'rgba(247, 250, 252, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
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
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = '#ff6b6b';
                    e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.target.parentElement.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.parentElement.style.background = 'rgba(247, 250, 252, 0.8)';
                    e.target.parentElement.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '16px',
              background: 'rgba(247, 250, 252, 0.8)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
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
                onFocus={(e) => {
                  e.target.parentElement.style.borderColor = '#ff6b6b';
                  e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.parentElement.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.target.parentElement.style.background = 'rgba(247, 250, 252, 0.8)';
                  e.target.parentElement.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div 
              className="salary_wrapper"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '24px',
                margin: '8px 0'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '16px',
                background: 'rgba(247, 250, 252, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <select
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value)}
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
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = '#ff6b6b';
                    e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.target.parentElement.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.parentElement.style.background = 'rgba(247, 250, 252, 0.8)';
                    e.target.parentElement.style.boxShadow = 'none';
                  }}
                >
                  <option value="default">Select Salary Type</option>
                  <option value="Fixed Salary">Fixed Salary</option>
                  <option value="Ranged Salary">Ranged Salary</option>
                </select>
              </div>
              
              <div>
                {salaryType === "default" ? (
                  <p style={{
                    color: 'rgba(255, 107, 107, 0.8)',
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: '8px 0',
                    textAlign: 'center',
                    background: 'rgba(255, 107, 107, 0.1)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 107, 107, 0.3)'
                  }}>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '16px',
                    background: 'rgba(247, 250, 252, 0.8)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <input
                      type="number"
                      placeholder="Enter Fixed Salary"
                      value={fixedSalary}
                      onChange={(e) => setFixedSalary(e.target.value)}
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
                      onFocus={(e) => {
                        e.target.parentElement.style.borderColor = '#ff6b6b';
                        e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.9)';
                        e.target.parentElement.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        e.target.parentElement.style.background = 'rgba(247, 250, 252, 0.8)';
                        e.target.parentElement.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div 
                    className="ranged_salary"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: '16px',
                      background: 'rgba(247, 250, 252, 0.8)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <input
                        type="number"
                        placeholder="Salary From"
                        value={salaryFrom}
                        onChange={(e) => setSalaryFrom(e.target.value)}
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
                        onFocus={(e) => {
                          e.target.parentElement.style.borderColor = '#ff6b6b';
                          e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.9)';
                          e.target.parentElement.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                          e.target.parentElement.style.background = 'rgba(247, 250, 252, 0.8)';
                          e.target.parentElement.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: '16px',
                      background: 'rgba(247, 250, 252, 0.8)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <input
                        type="number"
                        placeholder="Salary To"
                        value={salaryTo}
                        onChange={(e) => setSalaryTo(e.target.value)}
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
                        onFocus={(e) => {
                          e.target.parentElement.style.borderColor = '#ff6b6b';
                          e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.9)';
                          e.target.parentElement.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                          e.target.parentElement.style.background = 'rgba(247, 250, 252, 0.8)';
                          e.target.parentElement.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '16px',
              background: 'rgba(247, 250, 252, 0.8)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <textarea
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Internship Description"
                style={{
                  background: 'transparent',
                  padding: '16px 20px',
                  border: 'none',
                  width: '100%',
                  fontSize: '16px',
                  color: '#2d3748',
                  fontWeight: '500',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '120px',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.parentElement.style.borderColor = '#ff6b6b';
                  e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.parentElement.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.target.parentElement.style.background = 'rgba(247, 250, 252, 0.8)';
                  e.target.parentElement.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <button 
              type="submit"
              style={{
                padding: '18px 24px',
                textAlign: 'center',
                border: 'none',
                marginTop: '24px',
                fontWeight: '700',
                color: '#fff',
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                fontSize: '16px',
                borderRadius: '16px',
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
              onMouseDown={(e) => {
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'translateY(-3px)';
              }}
            >
              Create Internship
            </button>
          </form>
        </div>
        
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @media (max-width: 768px) {
            .wrapper {
              grid-template-columns: 1fr !important;
            }
            .ranged_salary {
              grid-template-columns: 1fr !important;
            }
          }
          
          input::placeholder,
          textarea::placeholder,
          select option:first-child {
            color: rgba(45, 55, 72, 0.6) !important;
            font-weight: 400;
          }
          
          select option {
            background: white;
            color: #2d3748;
            font-weight: 500;
          }
        `}</style>
      </div>
    </>
  );
};

export default PostJob;