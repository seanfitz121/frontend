import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

function PaymentComplete() {
  
  const [product, setProduct] = useState({})

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

  const [hasVisitedPage, setHasVisitedPage] = useState(false);

  const handlePageVisited = async () => {
    if (!hasVisitedPage) {
      setHasVisitedPage(true);
      toast.success("Payment successful! Please check your email.");
    }
  };

  useEffect(() => {
    handlePageVisited();
  }, []);


  buttonStyle.backgroundColor = isButtonHovered ? buttonHoverStyle.backgroundColor : buttonStyle.backgroundColor;
  
  linkStyle.backgroundColor = isLinkHovered ? linkHoverStyle.backgroundColor : linkStyle.backgroundColor;

  return (
        
            
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh'}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>            
                <h3 className='font-face-ab'>Payment Succeeded</h3>
                <div>
                    <p className='font-face-ab'>Your product will be sent to you by email shortly. Ensure to check spam folders.</p>
                </div>
                <div>
                    <Link to="/">
                        <button style={buttonStyle} onMouseEnter={handleButtonMouseEnter} onMouseLeave={handleButtonMouseLeave}>Go Home</button>
                    </Link>
                    
                </div>
              </div>
            </div>
  );
}

export default PaymentComplete;