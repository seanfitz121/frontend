import React, {useState, useEffect} from 'react';
import { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
  } from 'mdb-react-ui-kit';
import MyChart from './Chart';
import { useNavigate } from 'react-router-dom';
import './homeStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import CookieBanner from './CookieBanner';

function Home() {
  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate('/register');
  };
  const navigateLogin = () => {
    navigate('/login');
  };

  return (
    <header>
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: "url('/row3.JPG')",
          height: 400,
          backgroundSize: 'cover',
        }}
      >
        <div className="mask d-flex justify-content-center align-items-center h-100">
          <div className="text-white text-shadow intro-card">
            <h1 className="mb-3" style={{ fontSize: "50px", color: "#FFBF00" }}>
              <span className="font-face-ab" style={{fontSize: "50px"}}>Z12 Performance</span>
            </h1>
            <h4 className="mb-4" style={{ fontSize: "40px", color: "#FFBF00" }}>
              <span className="font-face-ab" style={{fontSize: "40px"}}>High Performance Rowing</span>
            </h4>
            <button className="btn btn-accent mr-2" onClick={() => navigateLogin()} style={{marginRight: "5px", padding: "5px", backgroundColor: "rgba(255, 236, 0, 0.35)"}}>
              <span className="font-face-ab" style={{fontSize: "25px", color: "#FFBF00"}}>I'm a member</span>
            </button>
            <button className="btn btn-accent ml-2" onClick={() => navigateRegister()} style={{marginLeft: "5px", padding: "5px", backgroundColor: "rgba(255, 236, 0, 0.35)"}}>
              <span className="font-face-ab" style={{fontSize: "25px", color: "#FFBF00" }}>I'm new here</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <p className="section-title">
          <span className="font-face-ab" style={{fontSize: "25px"}}>Our goal here is to build a great event and a community for those who
          take part. As a member of the community, you'll have the option of
          joining existing events or hosting your own and have a voice on how we
          can improve the event. We hope that with your energy as a member, we
          can find a whole range of ways of improving rowing.</span>
        </p>
        <p className="section-title" style={{ color: '#FFBF00' }}>
        <span className="font-face-ab" style={{fontSize: "25px"}}>Welcome to our community.</span>
        </p>

        <MDBRow>
          <MDBCol sm="6" className="mb-3 mb-md-0">
            <MDBCard className="card">
              <MDBCardBody text="dark">
                <MDBCardTitle>View Events</MDBCardTitle>
                <MDBCardText>
                  Visit the event viewer to participate in various events,
                  register interest!
                </MDBCardText>
                <MDBBtn tag="a" href="/events" color="primary">
                  Go to Events
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm="6" className="mb-3 mb-md-0">
            <MDBCard className="card">
              <MDBCardBody text="dark">
                <MDBCardTitle>Contact Us</MDBCardTitle>
                <MDBCardText>
                  Contact us with any queries or issues, and we'll be sure to
                  get back to you!
                </MDBCardText>
                <MDBBtn tag="a" href="/contact" color="primary">
                  Contact
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/* Social Icons */}
<div className="d-flex justify-content-center my-4">
  <MDBBtn
    className="m-1 social-btn"
    style={{ backgroundColor: '#ac2bac' }}
    href="https://www.instagram.com/z12performance/?hl=en"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FontAwesomeIcon icon={faInstagram} />
  </MDBBtn>
  <MDBBtn
    className="m-1 social-btn"
    style={{ backgroundColor: '#3b5998' }}
    href="https://www.facebook.com/Ztwelveperformance/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FontAwesomeIcon icon={faFacebookF} />
  </MDBBtn>
  <MDBBtn
    className="m-1 social-btn"
    style={{ backgroundColor: '#0082ca' }}
    href="https://www.linkedin.com/company/z12performance-ltd/about/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FontAwesomeIcon icon={faLinkedinIn} />
  </MDBBtn>
</div>
      </div>
      
    </header>
    
  );
      }



export default Home;