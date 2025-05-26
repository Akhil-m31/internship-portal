import { useContext, useEffect, useState } from "react";
import { FaUserGraduate, FaGraduationCap, FaUniversity } from "react-icons/fa";
import { MdGrade } from "react-icons/md";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const [cgpa, setCGPA] = useState("");
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [institution, setInstitution] = useState("");
  const [yearOfCompletion, setYearOfCompletion] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileExists, setProfileExists] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Fetch existing profile if it exists
  useEffect(() => {
    if (!isAuthorized || user.role !== "Job Seeker") {
      navigateTo("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/student-profile/me",
          { withCredentials: true }
        );

        if (data.success) {
          const { profile } = data;
          setCGPA(profile.cgpa);
          setSkills(profile.skills);
          setDegree(profile.educationQualification.degree);
          setField(profile.educationQualification.field);
          setInstitution(profile.educationQualification.institution);
          setYearOfCompletion(profile.educationQualification.yearOfCompletion);
          setProfileExists(true);
        }
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          toast.error(error.response.data.message || "Error fetching profile");
        }
      }
    };

    fetchProfile();
  }, [isAuthorized, user, navigateTo]);

  const addSkill = () => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
        cgpa,
        skills: skills.map(s => s.trim().toLowerCase()),
        degree: degree.trim().toLowerCase(),
        field: field.trim().toLowerCase(),
        institution,
        yearOfCompletion
    };

    setLoading(true);

    try {
      const url = profileExists
        ? "http://localhost:4000/api/v1/student-profile/update"
        : "http://localhost:4000/api/v1/student-profile/create";

      const { data } = await axios.post(url, profileData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.success) {
        toast.success(profileExists ? "Profile updated!" : "Profile created!");
        setProfileExists(true);
        navigateTo("/matched-jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
            <div 
                style={{
                    textAlign: 'center',
                    marginBottom: '60px',
                    animation: 'fadeInUp 1s ease-out'
                }}
            >
                <h3 
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
                    {profileExists ? "Update Student Profile" : "Create Student Profile"}
                </h3>
                <p 
                    style={{
                        fontSize: '1.2rem',
                        lineHeight: '1.6',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '400',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}
                >
                    Complete your profile to get matched with the right internships
                </p>
            </div>

            <form 
                onSubmit={handleSubmit}
                style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '30px',
                    padding: '50px',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
                    animation: 'fadeInUp 1s ease-out 0.3s both'
                }}
            >
                {/* CGPA Input */}
                <div 
                    style={{
                        marginBottom: '35px'
                    }}
                >
                    <label 
                        style={{
                            display: 'block',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '12px',
                            letterSpacing: '0.5px'
                        }}
                    >
                        CGPA (0-10)
                    </label>
                    <div 
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="10"
                            placeholder="Enter your CGPA"
                            value={cgpa}
                            onChange={(e) => setCGPA(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '18px 20px 18px 55px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '15px',
                                fontSize: '1rem',
                                color: '#ffffff',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                            }}
                        />
                        <MdGrade 
                            style={{
                                position: 'absolute',
                                left: '20px',
                                fontSize: '1.2rem',
                                color: '#ff6b6b'
                            }}
                        />
                    </div>
                </div>

                {/* Skills Input */}
                <div 
                    style={{
                        marginBottom: '35px'
                    }}
                >
                    <label 
                        style={{
                            display: 'block',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '12px',
                            letterSpacing: '0.5px'
                        }}
                    >
                        Skills
                    </label>
                    <div>
                        <div 
                            style={{
                                display: 'flex',
                                gap: '12px',
                                marginBottom: '20px'
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Add a skill"
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                style={{
                                    flex: '1',
                                    padding: '18px 20px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: '15px',
                                    fontSize: '1rem',
                                    color: '#ffffff',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    backdropFilter: 'blur(10px)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                    e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                }}
                            />
                            <button 
                                type="button" 
                                onClick={addSkill}
                                style={{
                                    padding: '18px 30px',
                                    background: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
                                    border: 'none',
                                    borderRadius: '15px',
                                    color: '#ffffff',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.3)';
                                }}
                            >
                                Add
                            </button>
                        </div>
                        <div 
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '12px'
                            }}
                        >
                            {skills.map((s, index) => (
                                <div 
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '10px 16px',
                                        background: 'rgba(255, 107, 107, 0.1)',
                                        border: '1px solid rgba(255, 107, 107, 0.3)',
                                        borderRadius: '25px',
                                        color: '#ffffff',
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    <span>{s}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => removeSkill(index)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#ff6b6b',
                                            fontSize: '1.2rem',
                                            cursor: 'pointer',
                                            padding: '0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = 'rgba(255, 107, 107, 0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = 'none';
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Degree Select */}
                <div 
                    style={{
                        marginBottom: '35px'
                    }}
                >
                    <label 
                        style={{
                            display: 'block',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '12px',
                            letterSpacing: '0.5px'
                        }}
                    >
                        Degree
                    </label>
                    <div 
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <select 
                            value={degree} 
                            onChange={(e) => setDegree(e.target.value)} 
                            required
                            style={{
                                width: '100%',
                                padding: '18px 20px 18px 55px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '15px',
                                fontSize: '1rem',
                                color: '#ffffff',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)',
                                appearance: 'none'
                            }}
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                            }}
                        >
                            <option value="" style={{background: '#1a1a2e', color: '#ffffff'}}>Select Degree</option>
                            <option value="High School" style={{background: '#1a1a2e', color: '#ffffff'}}>High School</option>
                            <option value="Bachelor&apos;s" style={{background: '#1a1a2e', color: '#ffffff'}}>Bachelor&apos;s</option>
                            <option value="Master&apos;s" style={{background: '#1a1a2e', color: '#ffffff'}}>Master&apos;s</option>
                            <option value="PhD" style={{background: '#1a1a2e', color: '#ffffff'}}>PhD</option>
                            <option value="Diploma" style={{background: '#1a1a2e', color: '#ffffff'}}>Diploma</option>
                            <option value="Certificate" style={{background: '#1a1a2e', color: '#ffffff'}}>Certificate</option>
                            <option value="Other" style={{background: '#1a1a2e', color: '#ffffff'}}>Other</option>
                        </select>
                        <FaGraduationCap 
                            style={{
                                position: 'absolute',
                                left: '20px',
                                fontSize: '1.2rem',
                                color: '#ff6b6b'
                            }}
                        />
                    </div>
                </div>

                {/* Field of Study */}
                <div 
                    style={{
                        marginBottom: '35px'
                    }}
                >
                    <label 
                        style={{
                            display: 'block',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '12px',
                            letterSpacing: '0.5px'
                        }}
                    >
                        Field of Study
                    </label>
                    <div 
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Enter your field of study"
                            value={field}
                            onChange={(e) => setField(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '18px 20px 18px 55px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '15px',
                                fontSize: '1rem',
                                color: '#ffffff',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                            }}
                        />
                        <FaUserGraduate 
                            style={{
                                position: 'absolute',
                                left: '20px',
                                fontSize: '1.2rem',
                                color: '#ff6b6b'
                            }}
                        />
                    </div>
                </div>

                {/* Institution */}
                <div 
                    style={{
                        marginBottom: '35px'
                    }}
                >
                    <label 
                        style={{
                            display: 'block',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '12px',
                            letterSpacing: '0.5px'
                        }}
                    >
                        Institution
                    </label>
                    <div 
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Enter your institution name"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '18px 20px 18px 55px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '15px',
                                fontSize: '1rem',
                                color: '#ffffff',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                            }}
                        />
                        <FaUniversity 
                            style={{
                                position: 'absolute',
                                left: '20px',
                                fontSize: '1.2rem',
                                color: '#ff6b6b'
                            }}
                        />
                    </div>
                </div>

                {/* Year of Completion */}
                <div 
                    style={{
                        marginBottom: '40px'
                    }}
                >
                    <label 
                        style={{
                            display: 'block',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '12px',
                            letterSpacing: '0.5px'
                        }}
                    >
                        Year of Completion
                    </label>
                    <div 
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <input
                            type="number"
                            placeholder="Enter year of completion"
                            value={yearOfCompletion}
                            onChange={(e) => setYearOfCompletion(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '18px 20px 18px 55px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '15px',
                                fontSize: '1rem',
                                color: '#ffffff',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                            }}
                        />
                        <FaGraduationCap 
                            style={{
                                position: 'absolute',
                                left: '20px',
                                fontSize: '1.2rem',
                                color: '#ff6b6b'
                            }}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '18px 24px',
                        textAlign: 'center',
                        border: 'none',
                        marginTop: '16px',
                        fontWeight: '700',
                        color: loading ? 'rgba(255, 255, 255, 0.5)' : '#fff',
                        background: loading ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
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
                    onMouseEnter={(e) => {
                        if (!loading) {
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.boxShadow = '0 12px 40px rgba(255, 107, 107, 0.6)';
                            // Trigger shimmer effect
                            const shimmer = e.target.querySelector('.shimmer');
                            if (shimmer) {
                                shimmer.style.left = '100%';
                            }
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!loading) {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 8px 32px rgba(255, 107, 107, 0.4)';
                            // Reset shimmer effect
                            const shimmer = e.target.querySelector('.shimmer');
                            if (shimmer) {
                                shimmer.style.left = '-100%';
                            }
                        }
                    }}
                    onMouseDown={(e) => {
                        if (!loading) {
                            e.target.style.transform = 'translateY(-1px)';
                        }
                    }}
                >
                    {/* Shimmer effect */}
                    <span 
                        className="shimmer"
                        style={{
                            content: '',
                            position: 'absolute',
                            top: '0',
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                            transition: 'left 0.5s',
                            pointerEvents: 'none'
                        }}
                    ></span>
                    {loading ? "Processing..." : profileExists ? "Update Profile" : "Create Profile"}
                </button>
            </form>
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
            
            input::placeholder,
            select option {
                color: rgba(255, 255, 255, 0.5);
            }
            
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            
            input[type=number] {
                -moz-appearance: textfield;
            }
            
            @media (max-width: 768px) {
                section > div {
                    padding: 0 20px !important;
                }
                
                form {
                    padding: 30px !important;
                }
                
                .skillInputContainer {
                    flex-direction: column;
                    gap: 12px;
                }
            }
        `}</style>
    </div>
);
};

export default StudentProfile;