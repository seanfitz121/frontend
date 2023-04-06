import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Events from "./components/Events";
import Home from "./components/Home";
import AdminPanel from './components/AdminPanel';
import Register from './components/Register';
import Login from './components/Login';
import LoginForm from './components/Login';
import VerifyEmail from './components/Verify';
import Profile from './components/Profile';
import Logout from './components/Logout';
import Event from './components/Event';
import Store from './components/Store';
import TestMap from './components/TestMap';
import Success from './components/Success';
import EditProfile from './components/EditProfile';
import ViewTicket from './components/ViewTicket';
import CookieBanner from './components/CookieBanner';
import AboutFYP from './components/AboutFYP';
import Evaluation from './components/Evaluation';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './components/CheckoutForm';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentComplete from './components/PaymentComplete';
import ProductUpload from './components/ProductUpload';
import UserImage from './components/UserImage';
import Cookies from "js-cookie";
import ContactForm from './components/ContactForm';

const stripePromise = loadStripe("pk_test_51MgUmdAg9Km0gzmpAMvSEzj6g5jaRKOMMcattDOWJT6z2c7tvZ7md19FUPuLYo4HBjCHzYfA51bRLFERxxGKWnH900GzRljqGT")



function App(){

  const [dashList, setDashList] = useState([{}])
  const [name, setName] = useState('')
  const [race_time, setRaceTime] = useState('')
  const [eventList, setEventList] = useState([{}])
  const [results, setResults] = useState([{}])
  const [approvalList, setApprovalList] = useState([{}])
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const [isVerified, setIsVerified] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:8000/api/dash')
    .then(res => {
      setDashList(res.data)
    })
    axios.get('http://localhost:8000/api/events')
        .then(res => {
          setEventList(res.data)
    })
    axios.get('http://localhost:8000/api/User')
      .then(res => {
        setResults(res.data)
        console.log(res.data)
    })
    axios.get(`http://localhost:8000/api/events?approved=false`)
    .then(res => {
      console.log(res.data)
      setApprovalList(res.data)
      console.log(approvalList)
    })
    const sessionID = Cookies.get('sessionId');
    if (sessionID) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    axios.get(`http://localhost:8000/api/User${Cookies.get('loggedUserEmail')}`)
    .then(response => {
      setUserType(response.data.type)
      setIsVerified(response.data.active)
      console.log(response.data.type)
    }).catch(error => {
      console.log(error);
    })
    
  }, []);

  const loggedUserMail = Cookies.get('loggedUserEmail')

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const addDashHandler = () => {
    axios.post('http://localhost:8000/api/dash/', { 'name': name, 'race_time': race_time})
    .then(res => console.log(res))
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
    background: '#f2f2f2',
    padding: '0 20px',
    backgroundColor: '#FFBF00',
    fontWeight: 'bold'
  };

  const leftStyles = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  };

  const rightStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 'auto'
  };

  const linkStyles = {
    color: '#333',
    margin: '0 10px',
    textDecoration: 'none'
  };

  const activeLinkStyles = {
    color: 'red',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'underline'
    }
  };

  const VerifyBanner = ({ isVerified }) => {
    const bannerStyle = {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '2px 10px',
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 9999,
    };
  
    const messageStyle = {
      fontSize: '18px',
      color: '#333',
      marginRight: '20px',
    };
  
    const buttonStyle = {
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease-in-out',
    };
  
    const buttonHoverStyle = {
      backgroundColor: '#0069d9',
    };

    if (isVerified) {
      return null;
    }
  
    return (
      <div className="verify-email-banner" style={bannerStyle}>
        <p className="verify-email-message" style={messageStyle}>Please verify your email address to continue using our service.</p>
      <button className="verify-email-button" style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}>Resend Verification Email</button>
    </div>
    );
  }


  return (
    <>
      <Router>
        <ToastContainer />
      <div className="App list-group-item justify-content-center align-items-center mx-auto" 
        style={{"width":"1920px", "backgroundColor":"white"}}>

          <MDBNavbar expand="lg" light bgColor="warning">
      <MDBContainer fluid>
        <MDBNavbarNav>
          <MDBNavbarItem>
            <a class="navbar-brand" href="#" style={{float: "left"}}>
              <img src="https://www.dirtydozenchallenge.com/z12/img/z12_logo.png"
              class="me-2"
              height="30"
              width="15"
              alt="Z12 Logo"
              loading="lazy"/>
              <small><span style={{fontWeight: 'bold'}}>Z12 Performance</span></small>
            </a>
          </MDBNavbarItem>
          
          <div style={leftStyles}>
          <MDBNavbarItem>
            <MDBNavbarLink>
              <Link to="/" style={linkStyles} activeStyle={activeLinkStyles}><span style={{fontWeight: 'bold'}}>Home</span></Link>
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink>
            <Link to="/events" style={linkStyles} activeStyle={activeLinkStyles}><span style={{fontWeight: 'bold'}}>Events</span></Link>
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink>
            <Link to="/adminPanel" style={linkStyles} activeStyle={activeLinkStyles}><span style={{fontWeight: 'bold'}}>Admin Panel</span></Link>
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink>
            <Link to="/store" style={linkStyles} activeStyle={activeLinkStyles}><span style={{fontWeight: 'bold'}}>Store</span></Link>
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink>
            <Link to="/contact" style={linkStyles} activeStyle={activeLinkStyles}><span style={{fontWeight: 'bold'}}>Contact</span></Link>
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink>
            <Link to="/product-upload" style={linkStyles} activeStyle={activeLinkStyles}><span style={{fontWeight: 'bold'}}>Photographer</span></Link>
            </MDBNavbarLink>
          </MDBNavbarItem>
          </div>

          <div style={rightStyles}>
                  {loggedIn ? (
                    <>
                    <MDBNavbarItem>
                      <MDBNavbarLink>
                        <Link to="/about-fyp" style={linkStyles}><span style={{fontWeight: 'bold'}}>About this FYP</span></Link>
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                    <MDBDropdown>
                      <MDBDropdownToggle
                        tag="a"
                        className="nav-link d-flex align-items-center"
                        href="#"
                      >
                        <UserImage email={loggedUserMail} size="small"/>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem>
                        <MDBDropdownItem link href={`/profile/${loggedUserMail}`}><span style={{fontWeight: 'bold'}}>Profile</span></MDBDropdownItem>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <MDBDropdownItem link href="/logout"><span style={{fontWeight: 'bold'}}>Log out</span></MDBDropdownItem>
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                  </>
                  ) : (
                    <>
                      <MDBNavbarItem>
                        <MDBNavbarLink>
                          <Link to="/about-fyp" style={linkStyles}><span style={{fontWeight: 'bold'}}>About this FYP</span></Link>
                        </MDBNavbarLink>
                      </MDBNavbarItem>
                      <MDBNavbarItem>
                        <MDBNavbarLink>
                          <Link to="/register" style={linkStyles}><span style={{fontWeight: 'bold'}}>Register</span></Link>
                        </MDBNavbarLink>
                      </MDBNavbarItem>
                      <MDBNavbarItem>
                        <MDBNavbarLink>
                          <Link to="/login" style={linkStyles}><span style={{fontWeight: 'bold'}}>Login</span></Link>
                        </MDBNavbarLink>
                      </MDBNavbarItem>
                      </>
                  )}
          </div>

        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>         

                     {/*{clientSecret && (
                      <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                      </Elements>
                     )}*/}
                    

      </div>
      <VerifyBanner isVerified={isVerified} />
      

      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/adminPanel" element={<AdminPanel eventList={eventList} userList={results} approvalList={approvalList}/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/verify" element={<VerifyEmail/>}/>
        <Route path="/profile/:email" element={<Profile/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/event" element={<Event/>}/>
        <Route path="/store" element={<Store/>}/>
        <Route path="/map" element={<TestMap/>}/>
        <Route path="/payment-complete" element={<PaymentComplete/>}/>
        <Route path="/product-upload" element={<ProductUpload/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/edit-profile" element={<EditProfile/>}/>
        <Route path="/contact" element={<ContactForm/>}/>
        <Route path="/view-ticket/:ticketId" element={<ViewTicket/>} />
        <Route path="/about-fyp" element={<AboutFYP/>} />
        <Route path="/evaluation" element={<Evaluation/>} />
      </Routes>
      </Router>
      <CookieBanner />
      </>
  );
}

export default App;
