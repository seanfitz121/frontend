import React, {useState, useEffect} from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import UserImage from './UserImage';

function EditProfile(props){
  
    const tempEmail = Cookies.get('email');
    console.log(tempEmail);
    const loggedEmail = Cookies.get('loggedUserEmail');

  const [editSuccessful, setEditSuccessful] = useState(false)
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [club, setClub] = useState('');
  const [category, setCategory] = useState('');
  const [dob, setDob] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (tempEmail) {
      axios
        .get(`http://localhost:8000/api/User${tempEmail}`)
        .then((response) => {
          setUser(response.data);
          setEmail(response.data.email);
          setName(response.data.name);
          setPhone(response.data.phone);
          setWeight(response.data.weight);
          setLocation(response.data.location);
          setClub(response.data.club);
          setCategory(response.data.category);
          setDob(new Date(response.data.dob).toLocaleDateString());
          Cookies.remove('email');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`http://localhost:8000/api/User${loggedEmail}`)
        .then((response) => {
          setUser(response.data);
          setEmail(response.data.email);
          setName(response.data.name);
          setPhone(response.data.phone);
          setWeight(response.data.weight);
          setLocation(response.data.location);
          setClub(response.data.club);
          setCategory(response.data.category);
          setDob(new Date(response.data.dob).toLocaleDateString());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [tempEmail, loggedEmail]);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleUploadClick = async () => {
    console.log(email)
    const formData = new FormData();
    formData.append('email', email)
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/User/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e, { name, value }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'club':
        setClub(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'dob':
        setDob(new Date(value).toLocaleDateString());
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("HandleSubmit CALLED!")
    const dobDate = new Date(dob);
    
    console.log({
      name,
      phone,
      dob: dobDate,
      weight,
      club,
      category,
      location,
    });
    if (tempEmail) {
      axios
        .put(`http://localhost:8000/api/User${tempEmail}`, {
          email,
          name,
          phone,
          weight,
          location,
          dob: dobDate,
          club,
          category,
        })
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
          toast.success("Profile updated successfully!");
          navigate(`/profile/${tempEmail}`);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to update profile, please try again.");
          navigate(`/profile/${tempEmail}`);
        });

        
    } else {
        axios
        .put(`http://localhost:8000/api/User${loggedEmail}`, {
          email,
          name,
          phone,
          weight,
          location,
          dob: dobDate,
          club,
          category,
        })
        .then((response) => {
            console.log(response.data);
            setUser(response.data);
            toast.success("Profile updated successfully!");
            navigate(`/profile/${loggedEmail}`);
        })
        .catch((error) => {
            console.log(error);
            toast.success("Profile updated successfully!");
            navigate(`/profile/${loggedEmail}`);
        });
    }

    

    };

  

  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  }
  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  }
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }
  const handleDobChange = (event) => {
    setDob(event.target.value);
  }
  const handleClubChange = (event) => {
    setClub(event.target.value);
  }
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  }


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
  };

        return (
          <div className="container" style={{margin: "auto", alignContent: "center", alignItems: "center",
                    width: "100%", padding: "15px"}}>
            
          <div className="profile-header" style={profileHeaderStyles}>
            
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: "15px"}}>
            <div style={{display: "flex", flexDirection: "column", borderRadius: "15px", backgroundColor: "#F5F5F5", padding: "15px"}}>
              <div style={{margin: "auto"}}>
                <UserImage email={email} size="normal"/>
              </div>
              
              <input type="file" onChange={handleFileInputChange} style={{padding: "10px", width: "100%"}}/>
              <button onClick={handleUploadClick} style={buttonStyle}>Upload Image</button>
            </div>
            
        
        <div style={{display: "flex", flexDirection: "column"}}>
              
            </div>
        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: "#F5F5F5", borderRadius: "15px", padding: "15px"}}>
        <div style={{ marginLeft: '2rem' }}>
            <form onSubmit={handleSubmit}>
            <h3 className="font-face-ab" style={{justifyContent: "center", margin: "auto", width: "100%", padding: "10px"}}>Edit {name}'s Profile</h3>
          <div style={profileDetailStyles}>
            <span style={profileDetailLabelStyles}>Email:</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </div>
          <div style={profileDetailStyles}>
          <label style={profileDetailLabelStyles}>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={profileDetailStyles}>
          <label style={profileDetailLabelStyles}>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div style={profileDetailStyles}>
          <label style={profileDetailLabelStyles}>Weight(kg):</label>
          <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div style={profileDetailStyles}>
          <label style={profileDetailLabelStyles}>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div style={profileDetailStyles}>
          <label style={profileDetailLabelStyles}>Club:</label>
          <input type="text" value={club} onChange={(e) => setClub(e.target.value)} />
        </div>
        <div style={profileDetailStyles}>
          <label style={profileDetailLabelStyles}>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div style={profileDetailStyles}>
          <label style={profileDetailLabelStyles}>Date of Birth:</label>
          <input type="date" value={dob} onChange={(e) => handleDobChange(e)} />
        </div>
          
            <button style={buttonStyle} type="submit">Update Profile Details</button>
          
          </form>
          
        </div>
      </div>
      </div>
        </div>
        );
    }



export default EditProfile;