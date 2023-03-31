import React, { useState } from 'react';
import Cookies from 'js-cookie';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(true);
  const cookiesAccepted = Cookies.get('cookieAccepted');
  
  const handleAcceptCookies = () => {
    document.cookie = 'cookieAccepted=true; max-age=31536000';
    setShowBanner(false);
  };

  return (
    showBanner && !cookiesAccepted ? (
      <div style={{ textAlign: "center", backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', position: 'fixed', padding: '10px', bottom: 0, margin: "auto", width: "100%" }}>
        <p style={{ display: 'inline', marginRight: '10px', align:"center" }}>We use cookies to improve your experience on our site. By using our site, you consent to our use of cookies.</p>
        <button onClick={handleAcceptCookies} style={{ display: 'inline', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', padding: '10px 20px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Accept</button>
      </div>
    ) : null
  );
};

export default CookieBanner;