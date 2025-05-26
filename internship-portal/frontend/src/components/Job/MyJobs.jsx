import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate, Link } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div 
        className="myJobs page"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 50%, #2d3748 100%)',
          padding: '120px 0 80px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated background orbs */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(238, 90, 36, 0.2))',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          zIndex: 0
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          right: '-80px',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(255, 159, 243, 0.2), rgba(243, 104, 224, 0.2))',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite 3s',
          zIndex: 0
        }}></div>

        <div 
          className="container"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 40px',
            position: 'relative',
            zIndex: 1
          }}
        >
          <h1 style={{
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            fontWeight: '700',
            textAlign: 'center',
            margin: '0 0 60px 0',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e0ff 50%, #c0c0ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
            animation: 'fadeInUp 1s ease-out'
          }}>Your Posted Internships</h1>
          
          {myJobs.length > 0 ? (
            <>
              <div 
                className="banner"
                style={{
                  display: 'flex',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
                  gap: '30px',
                  animation: 'fadeInUp 1s ease-out 0.3s both'
                }}
              >
                {myJobs.map((element, index) => (
                  <div 
                    className="card" 
                    key={element._id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '24px',
                      padding: '32px',
                      transition: 'all 0.4s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      animation: `cardSlideUp 0.6s ease-out ${0.5 + index * 0.1}s both`,
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(255, 107, 107, 0.3)';
                      e.currentTarget.style.boxShadow = '0 25px 80px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    <div className="content">
                      <div 
                        className="short_fields"
                        style={{
                          display: 'flex',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                          gap: '24px',
                          marginBottom: '32px'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{
                            color: '#ff6b6b',
                            fontWeight: '600',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Title:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id ? true : false}
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                            style={{
                              background: editingMode === element._id 
                                ? 'rgba(255, 255, 255, 0.9)' 
                                : 'rgba(255, 255, 255, 0.1)',
                              border: '2px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: '12px',
                              padding: '12px 16px',
                              color: '#ffffff',
                              fontSize: '16px',
                              fontWeight: '500',
                              transition: 'all 0.3s ease',
                              backdropFilter: 'blur(10px)',
                              cursor: editingMode === element._id ? 'text' : 'default'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#ff6b6b';
                              e.target.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{
                            color: '#ff6b6b',
                            fontWeight: '600',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Category:</span>
                          <select
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== element._id ? true : false}
                            style={{
                              background: editingMode === element._id 
                                ? 'rgba(255, 255, 255, 0.9)' 
                                : 'rgba(255, 255, 255, 0.1)',
                              border: '2px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: '12px',
                              padding: '12px 16px',
                              color: '#ffffff',
                              fontSize: '16px',
                              fontWeight: '500',
                              transition: 'all 0.3s ease',
                              backdropFilter: 'blur(10px)',
                              cursor: editingMode === element._id ? 'pointer' : 'default'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#ff6b6b';
                              e.target.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <option value="Graphics & Design" style={{ background: '#2d3748', color: '#ffffff' }}>
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development" style={{ background: '#2d3748', color: '#ffffff' }}>
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development" style={{ background: '#2d3748', color: '#ffffff' }}>
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development" style={{ background: '#2d3748', color: '#ffffff' }}>
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance" style={{ background: '#2d3748', color: '#ffffff' }}>
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence" style={{ background: '#2d3748', color: '#ffffff' }}>
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation" style={{ background: '#2d3748', color: '#ffffff' }}>
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development" style={{ background: '#2d3748', color: '#ffffff' }}>
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development" style={{ background: '#2d3748', color: '#ffffff' }}>
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator" style={{ background: '#2d3748', color: '#ffffff' }}>
                              Data Entry Operator
                            </option>
                          </select>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
                          <span style={{
                            color: '#ff6b6b',
                            fontWeight: '600',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Salary:</span>
                          {element.fixedSalary ? (
                            <input
                              type="number"
                              disabled={editingMode !== element._id ? true : false}
                              value={element.fixedSalary}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "fixedSalary",
                                  e.target.value
                                )
                              }
                              style={{
                                background: editingMode === element._id 
                                  ? 'rgba(255, 255, 255, 0.9)' 
                                  : 'rgba(255, 255, 255, 0.1)',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                padding: '12px 16px',
                                color: '#ffffff',
                                fontSize: '16px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)',
                                cursor: editingMode === element._id ? 'text' : 'default'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#ff6b6b';
                                e.target.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                e.target.style.boxShadow = 'none';
                              }}
                            />
                          ) : (
                            <div style={{ display: 'grid', gap: '12px' }}>
                              <input
                                type="number"
                                disabled={editingMode !== element._id ? true : false}
                                value={element.salaryFrom}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "salaryFrom",
                                    e.target.value
                                  )
                                }
                                placeholder="From"
                                style={{
                                  background: editingMode === element._id 
                                    ? 'rgba(255, 255, 255, 0.9)' 
                                    : 'rgba(255, 255, 255, 0.1)',
                                  border: '2px solid rgba(255, 255, 255, 0.2)',
                                  borderRadius: '12px',
                                  padding: '12px 16px',
                                  color: '#ffffff',
                                  fontSize: '16px',
                                  fontWeight: '500',
                                  transition: 'all 0.3s ease',
                                  backdropFilter: 'blur(10px)',
                                  cursor: editingMode === element._id ? 'text' : 'default',
                                  flex: 1
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = '#ff6b6b';
                                  e.target.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                  e.target.style.boxShadow = 'none';
                                }}
                              />
                              <input
                                type="number"
                                disabled={editingMode !== element._id ? true : false}
                                value={element.salaryTo}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "salaryTo",
                                    e.target.value
                                  )
                                }
                                placeholder="To"
                                style={{
                                  background: editingMode === element._id 
                                    ? 'rgba(255, 255, 255, 0.9)' 
                                    : 'rgba(255, 255, 255, 0.1)',
                                  border: '2px solid rgba(255, 255, 255, 0.2)',
                                  borderRadius: '12px',
                                  padding: '12px 16px',
                                  color: '#ffffff',
                                  fontSize: '16px',
                                  fontWeight: '500',
                                  transition: 'all 0.3s ease',
                                  backdropFilter: 'blur(10px)',
                                  cursor: editingMode === element._id ? 'text' : 'default',
                                  flex: 1
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = '#ff6b6b';
                                  e.target.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                  e.target.style.boxShadow = 'none';
                                }}
                              />
                            </div>
                          )}
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{
                            color: '#ff6b6b',
                            fontWeight: '600',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Expired:</span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== element._id ? true : false}
                            style={{
                              background: editingMode === element._id 
                                ? 'rgba(255, 255, 255, 0.9)' 
                                : 'rgba(255, 255, 255, 0.1)',
                              border: '2px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: '12px',
                              padding: '12px 16px',
                              color: '#ffffff',
                              fontSize: '16px',
                              fontWeight: '500',
                              transition: 'all 0.3s ease',
                              backdropFilter: 'blur(10px)',
                              cursor: editingMode === element._id ? 'pointer' : 'default'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#ff6b6b';
                              e.target.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <option value={true} style={{ background: '#2d3748', color: '#ffffff' }}>TRUE</option>
                            <option value={false} style={{ background: '#2d3748', color: '#ffffff' }}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      
                      <div 
                        className="long_field"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                          gap: '24px'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{
                            color: '#ff6b6b',
                            fontWeight: '600',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Description:</span>
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={editingMode !== element._id ? true : false}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                            style={{
                              background: editingMode === element._id 
                                ? 'rgba(255, 255, 255, 0.9)' 
                                : 'rgba(255, 255, 255, 0.1)',
                              border: '2px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: '12px',
                              padding: '12px 16px',
                              color: '#ffffff',
                              fontSize: '16px',
                              fontWeight: '500',
                              transition: 'all 0.3s ease',
                              backdropFilter: 'blur(10px)',
                              cursor: editingMode === element._id ? 'text' : 'default',
                              resize: 'vertical',
                              minHeight: '120px'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#ff6b6b';
                              e.target.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{
                            color: '#ff6b6b',
                            fontWeight: '600',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>City:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id ? true : false}
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                            style={{
                              background: editingMode === element._id 
                                ? 'rgba(255, 255, 255, 0.9)' 
                                : 'rgba(255, 255, 255, 0.1)',
                              border: '2px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: '12px',
                              padding: '12px 16px',
                              color: '#ffffff',
                              fontSize: '16px',
                              fontWeight: '500',
                              transition: 'all 0.3s ease',
                              backdropFilter: 'blur(10px)',
                              cursor: editingMode === element._id ? 'text' : 'default'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#ff6b6b';
                              e.target.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{
                            color: '#ff6b6b',
                            fontWeight: '600',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Location:</span>
                          <textarea
                            value={element.location}
                            rows={5}
                            disabled={editingMode !== element._id ? true : false}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                            style={{
                              background: editingMode === element._id 
                                ? 'rgba(255, 255, 255, 0.9)' 
                                : 'rgba(255, 255, 255, 0.1)',
                              border: '2px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: '12px',
                              padding: '12px 16px',
                              color: '#ffffff',
                              fontSize: '16px',
                              fontWeight: '500',
                              transition: 'all 0.3s ease',
                              backdropFilter: 'blur(10px)',
                              cursor: editingMode === element._id ? 'text' : 'default',
                              resize: 'vertical',
                              minHeight: '120px'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#ff6b6b';
                              e.target.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{
                            color: '#ff6b6b',
                            fontWeight: '600',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Country:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id ? true : false}
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                            style={{
                              background: editingMode === element._id 
                                ? 'rgba(255, 255, 255, 0.9)' 
                                : 'rgba(255, 255, 255, 0.1)',
                              border: '2px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: '12px',
                              padding: '12px 16px',
                              color: '#ffffff',
                              fontSize: '16px',
                              fontWeight: '500',
                              transition: 'all 0.3s ease',
                              backdropFilter: 'blur(10px)',
                              cursor: editingMode === element._id ? 'text' : 'default'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#ff6b6b';
                              e.target.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Out Of Content Class */}
                    <div 
                      className="button_wrapper"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '32px',
                        paddingTop: '24px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '25px',
                      }}
                    >
                      <div 
                        className="edit_btn_wrapper"
                        style={{
                      display: 'flex',
                      gap: '16px',
                      padding:'40px'
                    }}
                  >
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="check_btn"
                          style={{
                            padding: '15px 30px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #34c759, #28a745)',
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 8px 32px rgba(52, 199, 89, 0.4)',
                            textAlign:'center'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.boxShadow = '0 12px 40px rgba(52, 199, 89, 0.6)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 8px 32px rgba(52, 199, 89, 0.4)';
                          }}
                        >
                          <FaCheck style={{ fontSize: '16px' }} />
                          Save
                        </button>
                        <button
                          onClick={() => handleDisableEdit()}
                          className="cross_btn"
                          style={{
                            padding: '15px 30px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 8px 32px rgba(255, 107, 107, 0.4)',
                            textAlign: 'center',
                            justifyContent: 'center'
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
                          <RxCross2 style={{ fontSize: '16px' }} />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEnableEdit(element._id)}
                          className="edit_btn"
                          style={{
                            padding: '12px 24px',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
                            e.target.style.borderColor = 'transparent';
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.boxShadow = '0 8px 32px rgba(255, 107, 107, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          Edit
                        </button>
                        <Link
                          to={`/job/requirements/${element._id}`}
                          className="edit_btn"
                          style={{
                            padding: '12px 24px',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)',
                            textDecoration: 'none',
                            position: 'relative',
                            overflow: 'hidden',
                            textAlign: 'center',
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #ff9ff3, #f368e0)';
                            e.target.style.borderColor = 'transparent';
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.boxShadow = '0 8px 32px rgba(243, 104, 224, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          Set
                        </Link>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="delete_btn"
                    style={{
                      padding: '12px 24px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 32px rgba(255, 107, 107, 0.4)',
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
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p
          style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.25rem',
            fontWeight: '500',
            marginTop: '40px',
            animation: 'fadeInUp 1s ease-out 0.5s both',
          }}
        >
          You&apos;ve not posted any internships or maybe you deleted all of your jobs!
        </p>
      )}
    </div>
  </div>

  {/* Global Animations */}
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }

    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes cardSlideUp {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
</>
);
};

export default MyJobs;