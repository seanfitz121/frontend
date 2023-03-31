import React, { useState } from 'react';
import { registerUser } from '../registerLoginAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('')
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!isChecked) {
      alert('Please check both checkboxes before registering.');
      return;
    }
    try {
      await registerUser(name, email, phone, password);
      setIsRegistered(true);
      const response = await axios.post(`http://localhost:8000/api/register/${email}`, {
        name: name,  
        email: email,
        phone: phone,
        password: password
      });
      console.log(response);
      window.location.href = '/verify';
    } catch (error) {
      console.log(error.response)
      if(error.response && error.response.data && error.response.data.detail === 'Email or phone already associated with another user'){
        setError('Email or phone already associated with another user');
      } else {
        setError('Email or phone already associated with another user');
      }
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const registerStyle = {
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
      <h3 style={{textAlign: 'center', padding: '20px'}}>Register for Z12</h3>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <form onSubmit={handleRegister} style={registerStyle}>
        <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} style={inputStyle} required/>
        <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} style={inputStyle} required/>
        
        <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} style={inputStyle} required/>
        <input type="text" placeholder="Phone Number (08XYYYZZZZ)" name="phone" value={phone} onChange={(event) => setPhone(event.target.value)} style={inputStyle} required/>
        <input type="checkbox" name="consent" onChange={handleCheckboxChange} required/>
        <label htmlFor="consent">I consent to the processing of my personal data.</label>

        <input type="checkbox" name="privacy-policy" onChange={handleCheckboxChange} required/>
        <label htmlFor="privacy-policy">I have read and agreed to the privacy policy.</label>

        <button type="submit" style={buttonStyle} onMouseEnter={handleButtonMouseEnter} onMouseLeave={handleButtonMouseLeave}>Register</button>
        <a href="/login" style={linkStyle} onMouseEnter={handleLinkMouseEnter} onMouseLeave={handleLinkMouseLeave}>Already have an account? Log in here</a>
        {error && (
      <div style={{...registerStyle, backgroundColor: '#FFCCCB', width: '100%', margin: 'auto', padding: '20px'}}>
        <p style={{textAlign: 'center', fontWeight: 'bold'}}>{error}</p>                  
      </div>
      )}
      {isRegistered && (
        <div className="popup" style={{...registerStyle, backgroundColor: '#90EE90', width: '100%', margin: 'auto', padding: '20px'}}>
          <p style={{textAlign: 'center', fontWeight: 'bold'}}>Please check your email to verify your account</p>
        </div>
      )}
      </form>
      
      
      </div>
    </div>
  );
}

export default Register;