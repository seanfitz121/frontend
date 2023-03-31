import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
        <div style={{display: "flex", flexDirection: "column", margin: "auto", width: "100%", justifyContent: "center", alignItems: "center",
                    padding: "10px"}}>
            
                <h1 className='font-face-ab'>Successfully Verified Email</h1>
                <p className='font-face-ab' style={{fontSize: "20px"}}>You have verified your email. You will now be prompted to log in.</p>
                <p className='font-face-ab' style={{fontSize: "20px"}}>If not, please <Link to="/login" style={{textDecorationColor: "#FFBF00", color: "#FFBF00"}}>click here.</Link> </p>
        </div>
  );
}

export default Success;