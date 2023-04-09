import React, {useState, useEffect} from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Map from './Map';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';
import EventResult from './EventResult';
import "./EventResults.css";
import AddResultForm from './AddResultForm';
import { loadStripe } from '@stripe/stripe-js';

function Event(props){
  const stripePromise = loadStripe("pk_test_51MgUmdAg9Km0gzmpAMvSEzj6g5jaRKOMMcattDOWJT6z2c7tvZ7md19FUPuLYo4HBjCHzYfA51bRLFERxxGKWnH900GzRljqGT");
  const { isLoaded } = useLoadScript({googleMapsApiKey: "AIzaSyCyClGli0gh0OB5AnwKUpisdiz3PQLUzdg",})
  const apiKey = 'AIzaSyCyClGli0gh0OB5AnwKUpisdiz3PQLUzdg';
  const tempEventName = Cookies.get('eventName')
  console.log(tempEventName)
  {/**Place alternative event const here */}
  const [clientSecret, setClientSecret] = useState('');


  const [event, setEvent] = useState({})
  const [view, setView] = useState('details');
  const [showAddResultForm, setShowAddResultForm] = useState(false);

  const handleTabClick = (newView) => {
    setView(newView);
  };

  const event_name = "name"
  const isAdmin = true

  useEffect(() => {
    if(tempEventName){
      axios.get(`http://localhost:8000/api/events${tempEventName}`)
      .then(response => {
        setEvent(response.data);
        Cookies.remove('eventName');
        
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      
    }
    
  }, [tempEventName]);


  const handleToggleAddResultForm = () => {
    setShowAddResultForm(!showAddResultForm);
  };

  const profileHeaderStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1rem',
    color: '#333',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.5rem',
    margin: '1rem 0',
    fontSize: '1rem',
    backgroundColor: '#FFBF00',
    color: 'black',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
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

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }

  const buttonHoverStyle = {
    backgroundColor: '#454545',
    color: '#ffc107',
  };

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleButtonMouseEnter = async () => {
    setIsButtonHovered(true);
    if (!stripePromise) {
      stripePromise = loadStripe('pk_test_51MgUmdAg9Km0gzmpAMvSEzj6g5jaRKOMMcattDOWJT6z2c7tvZ7md19FUPuLYo4HBjCHzYfA51bRLFERxxGKWnH900GzRljqGT');
    }
    const response = await axios.post('http://localhost:8000/create-payment-intent2', {
      items: [{ price: event.fee.amount * 100, quantity: 1 }],
    });
    setClientSecret(response.data.clientSecret);
  };

  const handleButtonClick = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          name: 'Cardholder Name',
        },
      },
    });
    if (error) {
      console.error(error);
    } else {
      console.log('Payment succeeded');
    }
  };
  
  
  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
    stripePromise = null;
  };
  

  buttonStyle.backgroundColor = isButtonHovered ? buttonHoverStyle.backgroundColor : buttonStyle.backgroundColor;
  buttonStyle.color = isButtonHovered ? buttonHoverStyle.color : buttonStyle.color;

  const formattedStartTime = new Date(event.event_start).toLocaleString('en-US', options);
  const formattedEndTime = new Date(event.event_end).toLocaleString('en-US', options);

  

        return (

          <div className="container" style={{ padding: '2rem' }}>
      <div className="profile-header" style={profileHeaderStyles}>
        <h1>{event.name}</h1>
        <p>{event.host_id}</p>
      </div>
      <div style={{display: "flex", justifyContent: 'center', marginBottom: "1rem"}}>
        <button
          className={`ribbon-tab ${view === 'details' ? 'active' : ''}`}
          onClick={() => handleTabClick('details')} style={{padding: "0.5rem 1rem", cursor: "pointer",
          border: "none", backgroundColor: "#454545", color: "white", fontWeight: "bold", transition: "background-color 0.2s ease"}}
        >
          Event Details
        </button>
        <button
          className={`ribbon-tab ${view === 'results' ? 'active' : ''}`}
          onClick={() => handleTabClick('results')}
        >
          View Results
        </button>
      </div>
      {view === 'details' ? (
        <div className="container" style={{padding: '2rem'}}>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
  <div style={{display: 'flex', justifyContent: 'center'}}>
    <div style={{ marginLeft: '2rem' }}>
      <div style={profileDetailStyles}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={profileDetailLabelStyles}>Event Type:</span>
          <p style={{marginLeft: '1rem'}}>{event.type}</p>
        </div>
      </div>
      <div style={profileDetailStyles}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={profileDetailLabelStyles}>Event Level:</span>
          <p style={{marginLeft: '1rem'}}>{event.level}</p>
        </div>
      </div>
      <div style={profileDetailStyles}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={profileDetailLabelStyles}>Event Category:</span>
          <p style={{marginLeft: '1rem'}}>{event.category}</p>
        </div>
      </div>
      <div style={profileDetailStyles}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={profileDetailLabelStyles}>Rower Limit:</span>
          <p style={{marginLeft: '1rem'}}>{event.rower_limit}</p>
        </div>
      </div>
      <div style={profileDetailStyles}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={profileDetailLabelStyles}>Event Location:</span>
          <p style={{marginLeft: '1rem'}}>{event.location}</p>
        </div>
      </div>
      <div style={profileDetailStyles}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={profileDetailLabelStyles}>Event Fee:</span>
          <p style={{marginLeft: '1rem'}}>{event.fee && `€${event.fee.amount.toString()}`}</p>
        </div>
      </div>
      <div style={profileDetailStyles}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={profileDetailLabelStyles}>Event Start Date/Time:</span>
          <p style={{marginLeft: '1rem'}}>{formattedStartTime}</p>
        </div>
      </div>
      <div style={profileDetailStyles}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={profileDetailLabelStyles}>Event End Date/Time:</span>
          <p style={{marginLeft: '1rem'}}>{formattedEndTime}</p>
        </div>
      </div>
      <div style={profileDetailStyles}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={profileDetailLabelStyles}>Event Description:</span>
          <p style={{marginLeft: '1rem', padding: '20px'}}>{event.description}</p>
        </div>
      </div>
      <div>
        <button type="submit" style={buttonStyle} onClick={handleButtonClick} onMouseEnter={handleButtonMouseEnter} onMouseLeave={handleButtonMouseLeave}>Register for Event: {event.fee && `€${event.fee.amount.toString()}`}
</button>
      </div>
    </div>
    
      <div style={{ padding: '40px', margin: 'auto' }}>
        {!isLoaded ? 
        <div>Loading.....</div> : <Map eventLoc={event.location}/>}
      </div>
    </div>
    </div>
      </div>
      ) : (
        <div>
        <h1 style={{textAlign: "center"}}>Event Results</h1>
        {isAdmin && (
          <button onClick={handleToggleAddResultForm} style={buttonStyle}>
            {showAddResultForm ? 'Hide Add Results' : 'Add Results'}
          </button>
        )}
        {showAddResultForm && isAdmin && <AddResultForm eventName={event.name} />}
        <EventResult eventName={event.name} isAdmin={isAdmin} />
      </div>
      )}
    </div>

          
        );
    }


    export function GMap(){
      console.log("Gmap called")
      return(
        <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerStyle={{width: "300px", height: "300px"}}></GoogleMap>
      )
    }


export default Event;