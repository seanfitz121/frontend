import React, {useState, useEffect} from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserImage from './UserImage';

function Profile(props){
  const { email } = useParams();
  const tempEmail = Cookies.get('email')
  console.log(tempEmail)
  const loggedEmail = Cookies.get('loggedUserEmail')

  const [user, setUser] = useState({})

  useEffect(() => {
    console.log(tempEmail)
    const targetEmail = tempEmail ? tempEmail : loggedEmail;
  
    if (email) {
      axios
        .get(`http://localhost:8000/api/User${email}`)
        .then(response => {
          setUser(response.data);
          if (tempEmail) {
            Cookies.remove('email');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [email]);



  const formattedDateOfBirth = new Date(user.dob).toLocaleDateString();

  const profileHeaderStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1rem',
    color: '#333',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };
  
  const profileImageStyles = {
    borderRadius: '50%',
    width: '200px',
    height: '200px',
    marginBottom: '1rem',
  };
  
  const profileDetailStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  };
  
  const profileDetailLabelStyles = {
    fontWeight: 'bold',
    marginRight: '1rem',
    width: '7rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.5rem',
    alignItems: "center",
    fontSize: '1rem',
    backgroundColor: '#FFBF00',
    color: 'black',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

        return (
          <div className="container" style={{padding: '2rem'}}>
            
          <div className="profile-header" style={profileHeaderStyles}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          {tempEmail || loggedEmail ? <UserImage email={user.email} size="normal"/> : null}
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{ marginLeft: '2rem' }}>
          <div style={profileDetailStyles}>
            <span style={profileDetailLabelStyles}>Phone:</span>
            <p>{user.phone}</p>
          </div>
          <div style={profileDetailStyles}>
            <span style={profileDetailLabelStyles}>Weight(kg):</span>
            <p>{user.weight}</p>
          </div>
          <div style={profileDetailStyles}>
            <span style={profileDetailLabelStyles}>Location:</span>
            <p>{user.location}</p>
          </div>
          <div style={profileDetailStyles}>
            <span style={profileDetailLabelStyles}>Date of Birth:</span>
            <p>{formattedDateOfBirth}</p>
          </div>
          <div style={profileDetailStyles}>
            <span style={profileDetailLabelStyles}>Club:</span>
            <p>{user.club}</p>
          </div>
          <div style={profileDetailStyles}>
            <span style={profileDetailLabelStyles}>Category:</span>
            <p>{user.category}</p>
          </div>
          <Link to="/edit-profile">
              <button style={buttonStyle}>Edit Profile</button>
            </Link>
        </div>
      </div>
      </div>
        </div>
        );
    }



export default Profile;