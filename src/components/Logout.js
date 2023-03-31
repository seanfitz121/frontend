import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Logout(){
    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setRedirect(true);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, []);

    if (redirect){
        navigate('/');
    }
    sessionStorage.removeItem('session_id')
    Cookies.remove('sessionId')
    Cookies.remove('loggedUserEmail')

    

    const logoutStyle = {
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

      const linkHoverStyle = {
        backgroundColor: '#f8f8f8',
      };

      const [isLinkHovered, setIsLinkHovered] = useState(false);

      const handleLinkMouseEnter = () => {
        setIsLinkHovered(true);
      };
      
      const handleLinkMouseLeave = () => {
        setIsLinkHovered(false);
      };

      linkStyle.backgroundColor = isLinkHovered ? linkHoverStyle.backgroundColor : linkStyle.backgroundColor;

        return (
            <div style={logoutStyle}>
                <p>You have been logged out, redirecting to the home page.</p>
                <a href="/login" style={linkStyle} onMouseEnter={handleLinkMouseEnter} onMouseLeave={handleLinkMouseLeave}>If not redirected, click here!</a>
            </div>
        );

    }



export default Logout;