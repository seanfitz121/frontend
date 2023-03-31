import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
{/**Higher Order Component (HOC) to wrap components in authentication-type verification.
    Users must be logged in to view the page wrapped in this component, if they are not 
    logged in, they are redirected to /login. */}
const withRequireAuth = (WrappedComponent) => {
  const RequireAuthComponent = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const loggedUserEmail = document.cookie.includes('loggedUserEmail');
      const sessionID = document.cookie.includes('sessionId');

      if (!loggedUserEmail || !sessionID) {
        navigate('/login');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return RequireAuthComponent;
};

export default withRequireAuth;