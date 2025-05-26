import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  // Function to handle file input changes with validation
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileError("");
    
    if (!file) {
      setResume(null);
      return;
    }
    
    // Check file type
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Please select a valid image file (PNG, JPEG, or WEBP)");
      setResume(null);
      return;
    }
    
    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setFileError("File size should be less than 2MB");
      setResume(null);
      return;
    }
    
    setResume(file);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !phone || !address || !coverLetter) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (!resume) {
      setFileError("Please upload your resume");
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        "Something went wrong. Please try again later.";
      toast.error(errorMessage);
      
      // Show specific message for Cloudinary errors
      if (errorMessage.includes("Cloudinary") || errorMessage.includes("api_key")) {
        toast.error("File upload service is currently unavailable. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%)',
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(238, 90, 36, 0.1))',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
          animation: 'float 6s ease-in-out infinite'
        }}
      ></div>
      <div 
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(255, 159, 243, 0.1), rgba(243, 104, 224, 0.1))',
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0,
          animation: 'float 6s ease-in-out infinite 3s'
        }}
      ></div>
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(107, 255, 107, 0.05), rgba(36, 238, 90, 0.05))',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 0,
          animation: 'float 8s ease-in-out infinite 1.5s'
        }}
      ></div>

      <div 
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 40px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Header */}
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
            Submit Your Application
          </h3>
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
            Ready to take the next step? Share your story with us and let&apos;s build something amazing together.
          </p>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleApplication}
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
          {/* Form Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              marginBottom: '35px'
            }}
          >
            {/* Full Name */}
            <div>
              <label 
                htmlFor="name"
                style={{
                  display: 'block',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '12px',
                  letterSpacing: '0.5px'
                }}
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  color: '#ffffff',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label 
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '12px',
                  letterSpacing: '0.5px'
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  color: '#ffffff',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label 
                htmlFor="phone"
                style={{
                  display: 'block',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '12px',
                  letterSpacing: '0.5px'
                }}
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="number"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  color: '#ffffff',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            {/* Address */}
            <div>
              <label 
                htmlFor="address"
                style={{
                  display: 'block',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '12px',
                  letterSpacing: '0.5px'
                }}
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="City, State, Country"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  color: '#ffffff',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>
          </div>

          {/* Cover Letter */}
          <div style={{ marginBottom: '35px' }}>
            <label 
              htmlFor="coverLetter"
              style={{
                display: 'block',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '12px',
                letterSpacing: '0.5px'
              }}
            >
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              placeholder="Tell us about yourself, your experience, and why you're interested in this position..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
              rows="6"
              style={{
                width: '100%',
                padding: '18px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '15px',
                fontSize: '1rem',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                resize: 'vertical',
                minHeight: '120px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          {/* File Upload */}
          <div style={{ marginBottom: '40px' }}>
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
              Upload Resume
              <span 
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginTop: '4px'
                }}
              >
                Supported formats: PNG, JPEG, WEBP • Max size: 2MB
              </span>
            </label>
            <div 
              style={{
                position: 'relative',
                border: '2px dashed rgba(255, 255, 255, 0.2)',
                borderRadius: '15px',
                padding: '30px 20px',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.03)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={handleFileChange}
                id="resume-upload"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer'
                }}
              />
              <div style={{ pointerEvents: 'none' }}>
                <svg 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: '#ff6b6b',
                    marginBottom: '12px'
                  }}
                >
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div 
                  style={{
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}
                >
                  {resume ? resume.name : "Choose file or drag & drop"}
                </div>
                <div 
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.9rem'
                  }}
                >
                  {resume ? 'File selected successfully' : 'Upload your resume to complete your application'}
                </div>
              </div>
            </div>
            {fileError && (
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '12px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                  border: '1px solid rgba(255, 107, 107, 0.3)',
                  borderRadius: '10px',
                  color: '#ff6b6b',
                  fontSize: '0.9rem'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {fileError}
              </div>
            )}
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
              boxShadow: loading ? 'none' : '0 8px 32px rgba(255, 107, 107, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
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
            
            <span style={{ position: 'relative', zIndex: 1 }}>
              {loading ? "Submitting Application..." : "Send Application"}
            </span>
            
            {loading && (
              <div 
                style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid #ffffff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}
              ></div>
            )}
            
            {!loading && (
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ 
                  transition: 'transform 0.3s ease',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </form>
      </div>

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
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        input::placeholder,
        textarea::placeholder {
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
          
          form > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Application;