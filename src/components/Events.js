import React, {useState, useEffect} from 'react';
import { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Events(){

  {/**Filter states */}
  const [showFilters, setShowFilters] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Add states for locations and categories
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  {/**End of filter states */}
    
  const [eventList, setEventList] = useState([{}])
  const [eventName, setEventName] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  useEffect(() => {
    axios.get("http://localhost:8000/api/locations").then((res) => {
      setLocations(res.data);
    });

    axios.get("http://localhost:8000/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  

  function setEventWidth(length) {
    const eventsPerRow = getEventsPerRow(length);
    const containerWidth = document.getElementById("event-container").offsetWidth;
    const marginsAndPaddings = 20 * (eventsPerRow - 1); // 10px margin on each side
    const totalFixedWidth = 20 * eventsPerRow; // 20px fixed subtraction for each card
    return (
      (containerWidth - marginsAndPaddings - totalFixedWidth) / eventsPerRow + "px"
    );
  }
    
    
  useEffect(() => {
    axios.get("http://localhost:8000/api/events").then((res) => {
      setEventList(
        res.data.filter((event) => {
          return (
            event.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            event.category.toLowerCase().includes(categoryFilter.toLowerCase()) &&
            event.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
            (dateFilter === "" ||
              new Date(event.event_start).toDateString() ===
                new Date(dateFilter).toDateString())
          );
        })
      );
    });

    const containerWidth = document.getElementById("event-container").offsetWidth;
    setEventWidth(getEventWidth(eventList.length, containerWidth));
  }, [nameFilter, categoryFilter, locationFilter, dateFilter]);

    useEffect(() => {
      if (eventName) {
        console.log('UseEffect Event called');
        axios.get(`http://localhost:8000/api/events${eventName}`)
          .then(response => {
            console.log(response.data);
            Cookies.set('eventName', eventName);
            navigate(`/event`);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, [eventName]);

  const handleViewEvent = (eventName) => {
      setEventName(eventName);
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

  const totalPages = Math.ceil(eventList.length / eventsPerPage);

  const currentEvents = eventList.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
  }

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
    whiteSpace: 'normal', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis' 
  };

      

    return (
      <div>
        <h3 style={{ textAlign: "center", width: "100%" }}>Events</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: 'auto' }}>
      <button onClick={toggleFilters} style={{ width: '10%',
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
    whiteSpace: 'normal', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis' }}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
      {showFilters && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Event Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            style={{ marginRight: '1rem', border: 'none', borderBottom: '1px solid black', outline: 'none', fontSize: '1.2rem', padding: '0.5rem 0', width: '15rem' }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ marginRight: '1rem', border: 'none', borderBottom: '1px solid black', outline: 'none', fontSize: '1.2rem', padding: '0.5rem 0', width: '15rem' }}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            style={{ marginRight: '1rem', border: 'none', borderBottom: '1px solid black', outline: 'none', fontSize: '1.2rem', padding: '0.5rem 0', width: '15rem' }}
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{ border: 'none', borderBottom: '1px solid black', outline: 'none', fontSize: '1.2rem', padding: '0.5rem 0', width: '10rem' }}
          />
        </div>
      )}
    </div>

        <div
        id="event-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "auto",
          width: "100%",
          maxWidth: "1200px",
          justifyContent: "space-between",
        }}
      >
          {currentEvents.map((event, index) => (
          <div
            key={event.id}
            class="card"
            style={{
              marginBottom: "20px",
              flexGrow: 1,
              minWidth: "calc(33% - 20px)",
              maxWidth: "calc(33% - 20px)",
              border: "1px solid grey",
              borderRadius: "12px",
              padding: "5px",
              boxSizing: "border-box",
            }}
          >
              <div class="card-body">
                <h5 class="card-title">{event.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{event.location}</h6>
                <p class="card-text">{event.description}</p>
                <a href="#" class="card-link">
                  Date:{" "}
                  {new Date(event.event_start).toLocaleString("en-US", options)}
                </a>
                <button
                  className="register-button"
                  type="submit"
                  style={buttonStyle}
                  onClick={() => handleViewEvent(event.name)}
                >
                  View Event Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              background: page === currentPage ? "#FFBF00" : "#ccc",
              color: page === currentPage ? "black" : "#333",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      </div>
    );
  }

  function getMarginRight(index, length) {
    if ((index + 1) % getEventsPerRow(length) === 0) {
      return '0';
    } else {
      return '10px'; 
    }
  }
      
  function getEventWidth(length, containerWidth) {
    const eventsPerRow = getEventsPerRow(length);
    const marginsAndPaddings = 20 * (eventsPerRow - 1); // 10px margin on each side
    return (containerWidth - marginsAndPaddings) / eventsPerRow + 'px';
  }
      
  function getFlexBasis(length) {
    return 100 / getEventsPerRow(length) + '%';
  }
      
  function getEventsPerRow(length) {
    if (length <= 2) {
      return length;
    } else if (length <= 4) {
      return 2;
    } else if (length <= 6) {
      return 3;
    } else if (length <= 9) {
      return 3;
    } else {
      return 4;
    }
  }



export default Events;