import { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import styled from "styled-components";

const AuthPage = styled.section`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 50%, #2d3748 100%);

  /* Animated floating orbs */
  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    z-index: 0;
    animation: float 6s ease-in-out infinite;
  }
  
  &::before {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.3), rgba(238, 90, 36, 0.3));
    top: -100px;
    left: -100px;
    animation-delay: 0s;
  }
  
  &::after {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, rgba(255, 159, 243, 0.3), rgba(243, 104, 224, 0.3));
    bottom: -80px;
    right: -80px;
    animation-delay: 3s;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 48px 40px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 450px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Header = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  text-align: center;
  margin-bottom: 40px;
  align-items: center;

  h3 {
    font-size: 1.75rem;
    font-weight: 700;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24, #ff9ff3, #f368e0);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    letter-spacing: -0.5px;
  }
`;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 10px;
  border-radius: 20px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24, #ff9ff3, #f368e0);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.4);
  animation: glow 2s ease-in-out infinite alternate;

  span {
    color: white;
    font-size: 28px;
    font-weight: 900;
    letter-spacing: 2px;
  }

  @keyframes glow {
    0% { box-shadow: 0 8px 32px rgba(255, 107, 107, 0.4); }
    100% { box-shadow: 0 8px 40px rgba(255, 107, 107, 0.8); }
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const InputTag = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 4px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  div {
    display: flex;
    align-items: center;
    border-radius: 16px;
    background: rgba(247, 250, 252, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.3);
    padding: 0;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:focus-within {
      border-color: #ff6b6b;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.1);
      transform: translateY(-2px);
    }

    &:hover {
      border-color: rgba(255, 107, 107, 0.5);
      transform: translateY(-1px);
    }
    
    svg {
      width: 50px;
      height: 50px;
      font-size: 18px;
      background: linear-gradient(135deg, #ff6b6b, #ee5a24);
      color: #fff;
      border-radius: 12px;
      margin: 8px;
      padding: 14px;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }
    
    input,
    select {
      background: transparent;
      padding: 16px 20px;
      border: none;
      width: 100%;
      font-size: 16px;
      color: #2d3748;
      font-weight: 500;
      
      &::placeholder {
        color: rgba(45, 55, 72, 0.6);
        font-weight: 400;
      }
      
      &:focus {
        outline: none;
      }
    }

    select {
      cursor: pointer;
      
      option {
        background: white;
        color: #2d3748;
        font-weight: 500;
      }
    }
  }
`;

const StyledButton = styled.button`
  padding: 18px 24px;
  text-align: center;
  border: none;
  margin-top: 16px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  font-size: 16px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.4);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(255, 107, 107, 0.6);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const StyledLink = styled(Link)`
  padding: 16px 24px;
  text-align: center;
  border: 2px solid transparent;
  margin-top: 16px;
  font-weight: 600;
  color: #2d3748;
  font-size: 16px;
  text-decoration: none;
  border-radius: 16px;
  background: rgba(247, 250, 252, 0.6);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
`;

const BrandText = styled.div`
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24, #ff9ff3, #f368e0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
  margin-top: 8px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <AuthPage>
      <Container>
        <Header>
          <Logo>
            <span>CC</span>
          </Logo>
          <BrandText>Career Connect</BrandText>
          <h3>Welcome Back!</h3>
        </Header>
        <StyledForm>
          <InputTag>
            <label>Login As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Job Seeker">Student</option>
                <option value="Employer">Company</option>
              </select>
              <FaRegUser />
            </div>
          </InputTag>
          <InputTag>
            <label>Email Address</label>
            <div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdOutlineMailOutline />
            </div>
          </InputTag>
          <InputTag>
            <label>Password</label>
            <div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLock2Fill />
            </div>
          </InputTag>
          <StyledButton type="submit" onClick={handleLogin}>
            Sign In
          </StyledButton>
          <StyledLink to={"/register"}>
            Don&apos;t have an account? Register Now
          </StyledLink>
        </StyledForm>
      </Container>
    </AuthPage>
  );
};

export default Login;