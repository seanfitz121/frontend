import React, { useState } from "react";
import axios from "axios";

function VerifyEmail() {
  
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const verifyStyle = {
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
        
            
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh'}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                
                <form style={verifyStyle} onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData();
                  formData.append('code', code);

                  axios.post(`http://localhost:8000/verify?email=${encodeURIComponent(email)}`, formData)
                  .then(response => {
                    console.log(response);
                    window.location.href = "/success";
                  })
                  .catch(error => {
                    console.log(error);
                  });
                }}>
                  <h3 style={{textAlign: 'center', padding: '20px'}}>Verify your Email</h3>
                <input name="code" placeholder="Verification Code" id="code" value={code} onChange={(e) => setCode(e.target.value)} style={inputStyle} required/>
                <input name="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required/>
                <button type="submit" value="Verify" style={buttonStyle} onMouseEnter={handleButtonMouseEnter} onMouseLeave={handleButtonMouseLeave}>Verify</button>
                </form>
                <div style={{...verifyStyle, backgroundColor: 'white', width: '50%', marginLeft: '2rem'}}>
                  <p style={{textAlign: 'center'}}>Please enter the code that was sent to the email specified during registration, as well as the email.</p>
                                    
                </div>
              </div>
            </div>
  );
}

export default VerifyEmail;