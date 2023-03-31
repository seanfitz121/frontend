import React, { useState } from "react";
import { loginUser } from '../registerLoginAPI';
import axios from "axios";
import Cookies from "js-cookie";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(email, password)
      const { session_id } = response.data;
      sessionStorage.setItem('session_id', session_id)
      const sessionId = sessionStorage.getItem('session_id');
      document.cookie = `sessionId=${sessionId}; max-age=2592000`;
      document.cookie = `loggedUserEmail=${email}; max-age=2592000`;
      window.location.href = '/events';
    } catch (error) {
      console.log(error)
    }
    
  };

  const loginStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f8f8f8',
    borderRadius: '0.5rem',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  }

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    margin: '1rem 0',
    fontSize: '1rem',
    border: 'none',
    borderBottom: '2px solid #ccc',
    borderRadius: '0.5rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.5rem',
    margin: '1rem 0',
    fontSize: '1rem',
    backgroundColor: '#FFBF00',
    color: 'black',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const linkStyle = {
    width: '100%',
    padding: '0.5rem',
    margin: '1rem 0',
    fontSize: '1rem',
    backgroundColor: '#fff',
    color: 'black',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'background-color 0.2s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#3e8e41',
  };
  
  const linkHoverStyle = {
    backgroundColor: '#f8f8f8',
  };

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
  };
  
  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };
  
  const handleLinkMouseEnter = () => {
    setIsLinkHovered(true);
  };
  
  const handleLinkMouseLeave = () => {
    setIsLinkHovered(false);
  };

  buttonStyle.backgroundColor = isButtonHovered ? buttonHoverStyle.backgroundColor : buttonStyle.backgroundColor;
  
  linkStyle.backgroundColor = isLinkHovered ? linkHoverStyle.backgroundColor : linkStyle.backgroundColor;

  return (
    <div>
      <h3 style={{textAlign: 'center', padding: '20px'}}>Login to Z12</h3>
    <form onSubmit={handleLogin} style={loginStyle}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle} onMouseEnter={handleButtonMouseEnter} onMouseLeave={handleButtonMouseLeave}>Login</button>
      <a href="/register" style={linkStyle} onMouseEnter={handleLinkMouseEnter} onMouseLeave={handleLinkMouseLeave}>Not yet a user? Register here!</a>
    </form>
    </div>
  );
}
export default LoginForm;