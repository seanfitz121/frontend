import React, { useState } from "react";

function LoginSuccess() {
  

  return (
        <div>
            <body>
                <h1>Successfully Logged In</h1>
                <p>You will now be re-directed to the home page.</p>
                <p>If you are not redirected, please <a href="/events">click here.</a></p>
            </body>
        </div>
  );
}

export default LoginSuccess;