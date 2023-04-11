import React, { useState } from 'react';
import './AboutFYP.css';
import { useNavigate } from 'react-router-dom';

function AboutFYP() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };

  const handleButtonClick = () => {
    navigate(`/evaluation`);
  }

  return (
    <div className="about-container">
      <h1 className="about-header">About this Final Year Project</h1>
      <h2 className="about-author">Sean Fitzgibbon - 19273444</h2>
      
      <div className="image-container">
        <img src="/react.png" alt="Sample image 1" className="sample-image" />
        <img src="/fastapi.svg" alt="Sample image 2" className="sample-image" />
        <img src="/git.png" alt="Sample image 3" className="sample-image" />
        <img src="/mongodb.svg" alt="Sample image 4" className="sample-image" />
        <img src="/pytest.png" alt="Sample image 5" className="sample-image" />
      </div>
      
      <div className="about-section">
        <h3>Title</h3>
        <p>Event Management Web-App for High-Performance Athletes</p>
      </div>
      <div className="about-section">
        <h3>Key Points</h3>
        <ul className="key-points-list">
          <li>Different pages for different functionalities</li>
          <li>Allows users to easily find functionality, perform desired tasks (i.e. registering for event, viewing results)</li>
          <li>Coherent layout, logical design</li>
          <li>Use of various APIs/libraries, including Stripe, Google Maps, Twilio SendGrid, and more</li>
        </ul>
      </div>
      <div className="about-section">
        <h3>State-of-the-Art</h3>
        <p>Lots of research into state-of-the-art topics, such as what coding languages or frameworks to use, and what security standards are applicable for web-apps. Some of the key findings from that stage of the project were as follows:</p>
        <ul className="key-points-list">
          <li>Security principles outlined by OWASP, a trusted foundation devoted to web-app security</li>
          <li>MVC; Model-View-Controller, a software architectural pattern allowing for development of a maintainable, scalable system with separation of concerns</li>
          <li>Framework comparisons; comparing popular languages and frameworks to decide which suits the project best. Comparing speed, ease of use, documentation with evidence from various studies/papers</li>
        </ul>
      </div>
      <div className="about-section">
        <h3>Real-World Stakeholders</h3>
        <p>The project involved collaboration with a startup, Z12 Performance, led by James Mangan. Z12 gave insight and feedback throughout the process, making the design and development of the project more meaningful, as I had consistent insight into what stakeholder requirements were at all times. If features implemented, feedback could be attained from James through meetings to gauge progress.</p>
      </div>
      <div className="about-section">
        <h3>Modern Technologies</h3>
        <p>Used various emerging technologies, including popular frameworks and more recent frameworks, which have not been covered in the undergraduate syllabus</p>
        <ul className="key-points-list">
          <li>React.js
            <ul className="key-points-list">
                <li>Used for the front-end of the web-app</li>
                <li>One of most widely used frameworks according to StackOverflow Developer Survey 2022, it only emerged in 2013</li>
                <li>Allows for component-based development; the page you see right now is a single component, there are roughly 30 components used in this web-app.</li>
                <li>Makes communicating with the back-end and data storage simple</li>
            </ul>
          </li>
          <li>FastAPI
            <ul className="key-points-list">
                <li>Used for the back-end of the web-app</li>
                <li>Also a new technology, emerging in 2018</li>
                <li>Proven to be faster than other popular frameworks like Django, or Flask</li>
                <li>Makes dealing with endpoints/routes simple, CRUD operations are simple to write and understand</li>
            </ul>
          </li>
          <li>MongoDB
            <ul className="key-points-list">
                <li>Used for the data storage and access throughout the web-app</li>
                <li>Released in 2009, MongoDB is a NoSQL database, making it a new technology for undergraduates</li>
                <li>Faster data access, as you can customise queries and omit data that isn't needed</li>
                <li>Features a flexible data model/schema, data stored in documents and can have any structure</li>
            </ul>
          </li>
          
        </ul>
        <p>Also made use of APIs such as Stripe for payments, Google Maps for location servicing, and Twilio SendGrid for email authentication and notifications.</p>
        <p>Reasoning for choices evident in report, but generally due to speed, documentation and rapid-application-development.</p>
      </div>
      <div className="about-section">
        <h3>Functional Requirements</h3>
        <p>The goal of the web-app was to incorporate functional requirements (user use-cases) into various areas. These functional requirements included:</p>
        <ul className="key-points-list">
          <li>Users registering/logging in</li>
          <li>Users viewing events, and more specific event details, like event information or results of completed events</li>
          <li>Administrators performing user/site operations (viewing user profiles, approving events, uploading results etc)</li>
          <li>Photographers uploading photographs from events to a digital store</li>
          <li>Users making payments for event fees, or photographs from the store</li>
          <li>Coaches visualising event result data, such as average times, fastest times etc</li>
          <li>Users updating profiles to reflect personal information</li>
        </ul>
      </div>
      <div className="about-section">
        <h3>Design Process</h3>
        <p>Crucial stage in development was design process, involving communication with startup to decide on requirements seen above. James Mangan shared flow charts to understand expected functionality of the webapp. Various wireframes and prototype page designs were also developed to model the look of the webapp before development.</p>
        <ul className="key-points-list">
          <li><a href="/">Home page</a>: User lands here when loading the web-app</li>
          <li><a href="/events">Events</a>: See all events received from the database. Uses pagination, a method of splitting results into numerous pages for a simplified and clean view. Also see event information/results for any events</li>
          <li><a href="/adminPanel">Admin Panel</a>: Administrator can use functionality such as approving events, quick-access, removing users, support tickets and so on</li>
          <li><a href="/store">Store</a>: Users can use the store to purchase photographs relating to events, as uploaded by photographers using the <a href="/product-upload">Photographer submission</a></li>
        </ul>
    </div>
  <div className="about-section">
    <h3>Evaluation/Findings</h3>
    <p>Click below to see detailed information on the evaluation of this web-app with regard to security, performance, and usability.</p>
  </div>
  <button
    className="about-btn"
    onMouseEnter={handleButtonMouseEnter}
    onMouseLeave={handleButtonMouseLeave}
    onClick={handleButtonClick}
    style={{
      backgroundColor: isButtonHovered ? '#454545' : '#FFBF00',
      color: isButtonHovered ? '#ffc107' : 'black',
    }}
  >
    View Evaluation
  </button>
</div>
);
}

export default AboutFYP;