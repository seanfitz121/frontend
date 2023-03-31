import React, { useState } from "react";
import { Link } from "react-router-dom";

function AccessDenied() {
  

  return (
        <div style={{display: "flex", flexDirection: "column", margin: "auto", width: "100%", justifyContent: "center", alignItems: "center",
                    padding: "10px"}}>
            
                <h1 className='font-face-ab'>Access Denied</h1>
                <p className='font-face-ab' style={{fontSize: "20px"}}>Access to this page has been restricted. Please try logging in.</p>
                <p className='font-face-ab' style={{fontSize: "20px"}}>If this is a mistake, please contact an administrator.</p>
                <Link to="/" style={{textDecorationColor: "#FFBF00", color: "#FFBF00"}}>Back to Home</Link>
        </div>
  );
}

export default AccessDenied;