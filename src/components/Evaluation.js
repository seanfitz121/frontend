import React, { useState } from 'react';
import './AboutFYP.css';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

function Evaluation() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };

  const handleButtonClick = () => {
    navigate(`/about-fyp`);
  }

  const items = [
    {
      src: "/errors_ozap.png",
      altText: "OZAP Tool Alerts",
      caption: "Informational/minor alerts displayed",
    },
    {
      src: "/login_func.png",
      altText: "Password encryption/decryption",
      caption: "Added security measures, encrypting data storage",
    },
    {
      src: "/sample_error.png",
      altText: "Sample Alert from OZAP",
      caption: "Sample alert relating to information leak",
    },
  ];

  const items2 = [
    {
      src: "/perf1.png",
      altText: "Performance Report 1",
      caption: "From Home page to Visualising event results",
    },
    {
      src: "/perf2.png",
      altText: "Performance Report 2",
      caption: "From Home page to Admin Panel Functionality",
    },
    {
      src: "/perf3.png",
      altText: "Performance Report 3",
      caption: "From Home page to Store Checkout success",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src}>
        <img src={item.src} alt={item.altText} className="d-block w-100" />
        <CarouselCaption captionText={item.caption} captionHeader={item.altText} className="caption-opacity caption-small caption-box" />
      </CarouselItem>
    );
  });

  const slides2 = items2.map((item) => {
    return (
      <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src}>
        <img src={item.src} alt={item.altText} className="d-block w-100" />
        <CarouselCaption captionText={item.caption} captionHeader={item.altText} className="caption-opacity caption-small caption-box" />
      </CarouselItem>
    );
  });

  return (
    <div className="about-container">
      <h1 className="about-header">Web-App Evaluation</h1>
      <h2 className="about-author">Security, Usability, Performance</h2>
      
      <div className="image-container">
        <img src="/react.png" alt="Sample image 1" className="sample-image" />
        <img src="/fastapi.svg" alt="Sample image 2" className="sample-image" />
        <img src="/git.png" alt="Sample image 3" className="sample-image" />
        <img src="/mongodb.svg" alt="Sample image 4" className="sample-image" />
        <img src="/pytest.png" alt="Sample image 5" className="sample-image" />
      </div>
      
      
      <div className="about-section">
        <h3>Security</h3>
        <p>A tool called OWASP Zap was used to evaluate security, published by the OWASP Foundation.</p>
        <ul className="key-points-list">
          <li>Returned no critical errors</li>
          <li>Minor errors relating to code comments</li>
          <li>Minor informational alerts relating to the use of a local build instead of a production build. These alerts will vanish when the web-app is hosted on the internet as a live webapp</li>
          <li>Web-app deemed secure by OWASP Zap tool, thanks to use of password encryption, query parameterization and other security libraries</li>
        </ul>
      </div>

      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} className="control-opacity" />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} className="control-opacity"/>
      </Carousel>

      <div className="about-section">
        <h3 style={{padding: "10px"}}>Usability</h3>
        <p>Applied for ethics approval and expecting response shortly with approval.</p>
        <ul className="key-points-list">
          <li>Questionnaire ready involving performing basic tasks on the web-app</li>
          <li>Rating the usability and overall design of the webapp when performing these tasks</li>
          <li>Based on feedback throughout development from supervisor, web-app appears to be well on track in terms of usability and design</li>
          <li>Also some light usage of Lighthouse (seen below) to assess general layout and usability/accessibility of the webapp</li>
        </ul>
      </div>

      <div className="about-section">
        <h3 style={{padding: "10px"}}>Performance</h3>
        <p>Performance was evaluated using browser developer tools, such as Lighthouse. Lighthouse analyses various areas such as accessibility, performance, search engine optimisation and more.</p>
        <ul className="key-points-list">
          <li>Performance reports were shown to be above 80% almost always</li>
          <li>Reports relate to time taken to perform a task on the webapp</li>
          <li>Accessibility etc were also reported to be high 80-90% score</li>
        </ul>
      </div>

      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides2}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} className="control-opacity" />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} className="control-opacity"/>
      </Carousel>
      
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
    Back to About FYP Page
  </button>
</div>
);
}

export default Evaluation;