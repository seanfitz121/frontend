import React, {useState, useEffect} from 'react';
import { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS} from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import Plot from "react-plotly.js";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Tab, Tabs } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip} from 'recharts';
import { LineChart, Line as RechartsLine, CartesianGrid, Legend } from 'recharts';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccessDenied from './AccessDenied';
import SupportTickets from './SupportTickets';
import Modal from 'react-modal';
import FastestTimesChart from './FastestTimesChart';

function AdminPanel(props){
  const [search, setSearch] = useState('');
  const [email, setUserEmail] = useState(null);
  const [userData, setUserData] = useState([{}]);
  const [eventName, setEventName] = useState(null);
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeTab2, setActiveTab2] = useState("tab2");
  const [checkedUserEmails, setCheckedUserEmails] = useState([]);
  const [checkedEventNames, setCheckedEventNames] = useState([]);
  const [checkedEventAppNames, setCheckedEventAppNames] = useState([]);
  const [userToView, setUserToView] = useState("");
  const [eventToView, setEventToView] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const navigate = useNavigate();

  const emailAdmin = Cookies.get('loggedUserEmail');
  const [isAdmin, setIsAdmin] = useState('')

    const handleTabSelect = (tab) => {
      setActiveTab(tab);
    };
    const handleTabSelect2 = (tab) => {
      setActiveTab2(tab);
    };

    const viewUserHandler = (email) => {
      setUserEmail(email);
    };

    const handleCheckboxChange = (email) => {
      if (checkedUserEmails.includes(email)) {
        setCheckedUserEmails(checkedUserEmails.filter((e) => e !== email));
      } else {
        setCheckedUserEmails([...checkedUserEmails, email]);
      }
    };

    const handleCheckboxChangeEvent = (name) => {
      if (checkedEventNames.includes(name)) {
        setCheckedEventNames(checkedEventNames.filter((e) => e !== name));
      } else {
        setCheckedEventNames([...checkedEventNames, name]);
      }
    };

    const handleCheckboxChangeApprove = (name) => {
      if (checkedEventAppNames.includes(name)) {
        setCheckedEventAppNames(checkedEventAppNames.filter((e) => e !== name));
        console.log(checkedEventAppNames)
      } else {
        setCheckedEventAppNames([...checkedEventAppNames, name]);
        console.log(checkedEventAppNames)
      }
    };

    const handleViewUserClick = () => {
      if (checkedUserEmails.length === 1) {
        setUserToView(checkedUserEmails[0]);
      } else {
        // Handle error: either no checkboxes or more than one checkbox is checked
      }
    };

    const handleDeleteUserClick = async (email) => {
      if (emailAdmin === email){
        toast.error("You cannot delete the currently logged in user: " + email)
      } else {
        try {
          const response = await axios.delete(`http://localhost:8000/api/User/${email}`);
          console.log(response.data);
          toast.success("Successfully deleted user with email: " + email)
        } catch (error) {
          console.error(error);
          toast.error("Could not delete user with email: " + email)
        }
      }
      
    };

    const handleViewEventClick = () => {
      if (checkedEventNames.length === 1) {
        setEventToView(checkedEventNames[0]);
      } else {
        // Handle error: either no checkboxes or more than one checkbox is checked
      }
    };

    const handleViewEventAppClick = () => {
      if (checkedEventAppNames.length === 1) {
        setEventToView(checkedEventAppNames[0]);
      } else {
        // Handle error: either no checkboxes or more than one checkbox is checked
      }
    };

    const handleApproveEventClick = async () => {
      try {
        const response = await axios.post("http://localhost:8000/approve_events", checkedEventAppNames);
        console.log(response.data);
        toast.success("Event approved successfully!");
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while approving the event, please try again.")
      }
    }

    const viewChartsHandler = () => {

    }

    const viewPanelHandler = () => {

    }

    const viewEventHandler = (eventName) => {
      setEventName(eventName);
    }

    const handleDeleteUserClickInit = (email) => {
      console.log('handleDeleteUserClickInit called with email: ', email)
      setSelectedUserEmail(email);
      setIsModalOpen(true);
    };

    const handleModalConfirm = (email) => {
      handleDeleteUserClick(email);
      setIsModalOpen(false);
    };

    const handleModalClose = () => {
      console.log('handleModalClose called');
      setIsModalOpen(false);
    };

    {/**Profile ID Management*/}
    useEffect(() => {
      if (userToView) {
        axios
          .get(`http://localhost:8000/api/User${userToView}`)
          .then((response) => {
            console.log(response.data);
            Cookies.set("email", userToView);
            navigate(`/profile/${userToView}`);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      {/**Event Navigation here */}
      if(eventToView){
        console.log('UseEffect Event called')
        axios.get(`http://localhost:8000/api/events/by-name/${eventToView}`)
        .then(response => {
          console.log(response.data)
          Cookies.set('eventName', eventToView);
          navigate(`/event`);
        })
        .catch(error => {
          console.log(error);
        })
      }

      axios.get(`http://localhost:8000/api/User${emailAdmin}`)
      .then(response => {
        console.log(response.data)
        setIsAdmin(response.data.type)
      }).catch(error => {
        console.log(error);
      })

    }, [userToView, eventToView, emailAdmin]);
    
    console.log(search)
        return (
          <>
          {isAdmin == "admin" ? (
            <div style={{margin: 'auto', alignItems: 'center', textAlign: 'center', display: 'inline-block', width: '100%'}}>
            <Tabs defaultActiveKey="panel" style={{margin: 'auto', alignItems: 'center', textAlign: 'center', display: 'flex', width: '100%', justifyContent: 'center'}}>
              <Tab eventKey="panel" title="Admin Panel">
                {/**ADMIN PANEL */}
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="row" style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div className="col-sm-6" style={{ width: '48%',
                                          height: '40vh',
                                          backgroundColor: '#F5F5F5',
                                          margin: '1%',
                                          padding: '1%',
                                          borderRadius: '15px',
                                          overflow: 'auto',  }}>
        
        <section className="my-5">
    <h2 className='font-face-ab'>List of Events</h2>
    <button
          className="btn btn-primary"
          style={{borderRadius: "50px", fontWeight: "bold", backgroundColor: "#007bff", border: "none", marginLeft: "80%", height: "5vh", padding: "5px"}}
          onClick={() => handleViewEventClick()}>
            View Selected Event
          </button>
    <div className="table-responsive" style={{height: "35vh"}}>
    
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Is Complete?</th>
            <th>Results Uploaded?</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {props.eventList.map(event => (
            <tr key={event.name}>
              <td>{event.name}</td>
              <td>{event.isComplete.toString()}</td>
              <td>{event.resultsUploaded.toString()}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChangeEvent(event.name)}
                  checked={checkedEventNames.includes(event.name)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
        </div>
        <div className="col-sm-6" style={{ width: '48%',
                                          height: '40vh',
                                          backgroundColor: '#F5F5F5',
                                          margin: '1%',
                                          padding: '1%',
                                          borderRadius: '15px',
                                          overflow: 'auto', }}>
        <section style={{ margin: "20px 0" }}>
      <h3 className='font-face-ab' style={{ marginBottom: "10px" }}>Search for Users</h3>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px"}}>
        <input
          type="text"
          placeholder="Enter name"
          style={{ padding: "10px", fontSize: "14px", width: "50%", border: "none", borderBottom: "1px solid #ccc" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}>
          Search
        </button>
      </div>
      <div style={{height: "35vh", overflow: "auto"}}>
          <DropdownButton
            title="Actions"
            variant="primary"
            style={{ borderRadius: "25px", fontWeight: "bold", border: "none", marginLeft: "80%", height: "5vh", padding: "5px" }}
          >
            <Dropdown.Item onClick={() => handleViewUserClick()}>View Selected User</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDeleteUserClickInit(checkedUserEmails[0])}>Delete Selected User</Dropdown.Item>
          </DropdownButton>

          <Modal
  isOpen={isModalOpen}
  onRequestClose={handleModalClose}
  contentLabel="Confirm User Deletion"
  style={{
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '350px',
      height: '350px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      backgroundColor: '#f7f7f7',
      color: '#333',
      fontSize: '18px',
      fontWeight: '600',
      lineHeight: '1.4'
    }
  }}
>
  <h2 style={{ marginBottom: '10px' }}>Confirm User Deletion</h2>
  <p style={{ marginBottom: '20px' }}>Are you sure you want to delete the user with email: {selectedUserEmail}?</p>
  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
    <button style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', fontWeight: '600', cursor: 'pointer' }} onClick={() => handleModalConfirm(selectedUserEmail)}>Yes</button>
    <button style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#ccc', color: '#333', fontWeight: '600', cursor: 'pointer' }} onClick={handleModalClose}>No</button>
  </div>
</Modal>

        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{  }}>User Name</th>
              <th style={{  }}>User Email</th>
              <th style={{  }}>User Phone</th>
              <th style={{  }}>Select</th>
            </tr>
          </thead>
          <tbody>
          {props.userList
    .filter((item) => {
      return search.toLowerCase() === ""
        ? item
        : item.name.toLowerCase().includes(search);
    })
    .map((result) => (
      <tr key={result.name}>
        <td>{result.name}</td>
        <td>{result.email}</td>
        <td>{result.phone}</td>
        <td>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(result.email)}
            checked={checkedUserEmails.includes(result.email)}
          />
        </td>
      </tr>
    ))}
          </tbody>
        </table>
      </div>
    </section>
        </div>
      </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <div className="row" style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
      <div className="col-sm-6" style={{ width: '48%',
                                          height: '40vh',
                                          backgroundColor: '#F5F5F5',
                                          margin: '1%',
                                          padding: '1%',
                                          borderRadius: '15px',
                                          overflow: 'auto',  }}>
        <SupportTickets />
      </div>
      <div className="col-sm-6" style={{  width: '48%',
                                          height: '40vh',
                                          backgroundColor: '#F5F5F5',
                                          margin: '1%',
                                          padding: '1%',
                                          borderRadius: '15px',
                                          overflow: 'auto',  }}>
        <section style={{ margin: "20px 0" }}>
          <h2 className='font-face-ab'>Approve Events</h2>
          <DropdownButton
            title="Actions"
            variant="primary"
            style={{ borderRadius: "25px", fontWeight: "bold", border: "none", marginLeft: "80%", height: "5vh", padding: "5px" }}
          >
            <Dropdown.Item onClick={() => handleViewEventAppClick()}>View Selected Event</Dropdown.Item>
            <Dropdown.Item onClick={() => handleApproveEventClick(checkedEventAppNames)}>Approve Selected Event</Dropdown.Item>
          </DropdownButton>

          <div
          style={{
            maxHeight: 'calc(100% - 60px)',
            overflowY: 'auto',
            paddingRight: '5px',
            borderRadius: '15px',
          }}
        >
          <div
            style={{
              overflowY: 'auto',
              maxHeight: 'calc(100% - 60px)',
              borderRadius: '15px',
            }}
          >
          <table className="table table-striped" style={{overflow: "auto"}}>
            
            <thead>
              <tr>
                <th >
                  Event Name
                </th>
                <th >
                  Approved?
                </th>
                <th >
                  Select
                </th>
              </tr>
            </thead>
            <tbody>
              {props.approvalList.map(approvalItem => (
                <>
                  <tr key={approvalItem.name}>
                    <td>
                      {approvalItem.name}
                    </td>
                    <td>
                      {approvalItem.approved !== undefined ? approvalItem.approved.toString() : ""}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChangeApprove(approvalItem.name)}
                        checked={checkedEventAppNames.includes(approvalItem.name)}
                      />
                    </td>
                  </tr>
                </>
              ))}
            </tbody>

          </table>
          </div>
          </div>
                
        </section>
        </div>
        </div>
        </div>
                
              </Tab>
              <Tab eventKey="charts" title="View Charts">
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="row" style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <div className="col-sm-6" style={{ width: '48%',
                                          height: '80vh',
                                          backgroundColor: '#F5F5F5',
                                          margin: '1%',
                                          padding: '1%',
                                          borderRadius: '15px',
                                          overflow: 'auto',  }}>
          <Tab.Container id="chart1-tabs" activeKey={activeTab} onSelect={handleTabSelect}>
              <Nav variant="pills" activeKey={activeTab}>
                    <Nav.Item>
                      <Nav.Link eventKey="tab1">Event Location Occurrence</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab2">Event Category Distribution</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab3">User Category Breakdown</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab4">User Type Breakdown</Nav.Link>
                    </Nav.Item>
              </Nav>
            <Tab.Content>
              {activeTab === "tab1" ? (
                <Tab.Pane eventKey="tab1">
                <section style={{ margin: "20px 0" }}>
                  <h2>Event Location Occurrence</h2>
                  <div style={{ height: "60vh", overflow: "scroll", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <EventGraph />
                  </div>
                </section>
              </Tab.Pane>
              ) : null}
              
              {activeTab === "tab2" ? (
            <Tab.Pane eventKey="tab2">
              <section style={{ margin: "20px 0" }}>
                <h2>Event Category Distribution</h2>
                <div style={{ height: "60vh", overflow: "scroll", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CategoryChart />
                </div>
              </section>
            </Tab.Pane>
          ) : null}
  
            {activeTab === "tab3" ? (
            <Tab.Pane eventKey="tab3">
              <section style={{ margin: "20px 0" }}>
                <h2>User Category Breakdown</h2>
                <div style={{ height: "60vh", overflow: "scroll", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <UserCatPieChart />
                </div>
              </section>
            </Tab.Pane>
          ) : null}
  
            {activeTab === "tab4" ? (
            <Tab.Pane eventKey="tab4">
              <section style={{ margin: "20px 0" }}>
                <h2>User Type Breakdown</h2>
                <div style={{ height: "60vh", overflow: "scroll", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <UserTypePieChart />
                </div>
              </section>
            </Tab.Pane>
          ) : null}
            </Tab.Content>
            
          </Tab.Container>
        </div>
        <div className="col-sm-6" style={{ width: '48%',
                                          height: '80vh',
                                          backgroundColor: '#F5F5F5',
                                          margin: '1%',
                                          padding: '1%',
                                          borderRadius: '15px',
                                          overflow: 'auto',  }}>
        <Tab.Container id="chart1-tabs" activeKey={activeTab2} onSelect={handleTabSelect2}>
              <Nav variant="pills" activeKey={activeTab2}>
                    <Nav.Item>
                      <Nav.Link eventKey="tab1">Best Times Past Month</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab2">Race Times</Nav.Link>
                    </Nav.Item>
              </Nav>
            <Tab.Content>
              {activeTab2 === "tab1" ? (
                <Tab.Pane eventKey="tab1">
                <section style={{ margin: "20px 0" }}>
                  <h2>Best Times Past Month</h2>
                  <div style={{ height: "75vh", overflow: "scroll" }}>
                    
                  </div>
                </section>
              </Tab.Pane>
              ) : null}
              
              {activeTab2 === "tab2" ? (
            <Tab.Pane eventKey="tab2">
              <section style={{ margin: "20px 0" }}>
                <h2>Race Times</h2>
                <div style={{ height: "60vh", overflow: "scroll", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <RaceTimeGraph />
                </div>
              </section>
            </Tab.Pane>
          ) : null}
            </Tab.Content>
            
          </Tab.Container>
        </div>
      </div>
    </div>
  </Tab>
            </Tabs>
            </div>
          ) : (
            <AccessDenied />
          )}
          
            

  </>       
        );
};

export function EventGraph(){
  const [counts, setCounts] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8000/count');
      const data = response.data;

      // Create a new dataset with the counts for all locations
      const labels = Object.keys(data);
      const dataPoints = Object.values(data);
      const backgroundColors = Array.from({ length: labels.length }, () =>
        getRandomColor()
      );
      const newDataset = {
        labels: labels,
        datasets: [
          {
            label: 'Event Occurrence',
            data: dataPoints,
            backgroundColor: backgroundColors,
            borderWidth: 1
          }
        ]
      };

      // Update the state variable with the new dataset
      setCounts(newDataset);
    }

    fetchData();
  }, []);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const options = {
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <div style={{ height: '400px', width: "100%" }}>
      <h5>Event Occurrence Specific to Location</h5>
      <div style={{ height: '100%' }}>
        {counts.datasets && <Bar data={counts} options={options} />}
      </div>
    </div>
  );
}



export function EventGraph1(){
  const [times, setTimes] = useState([]);
  const [usernames, setUsernames] = useState([])

  useEffect(() => {
    async function fetchData(){
      const response = await axios.get("http://localhost:8000/times");
      const data = response.data
      setTimes(data.times);
      console.log(times)
    }
    fetchData();
  }, []);

  const sortedTimes = [...times].sort();

  useEffect(() => {
    const usernames = sortedTimes.map((time) => {
      const result = times.find((result) => result.time === time);
      if (result && result.user_name){
        return result.user_name;
      } else {
        return "Unknown User";
      }
    });
    setUsernames(usernames);
  }, [times]);

  const data =[
    {
      x: usernames,
      y: sortedTimes,
      type: "scatter",
      mode: "lines+markers",
    },
  ];

  const layout = {
    title: "Fastest Times",
    xaxis: {
      title: "User",
    },
    yaxis: {
      title: "Time",
      automargin: true,
    },
  };

  return (
    <Plot data={data} layout={layout} style={{width: "100%", height: "500px"}} />
  );
}

export function CategoryChart(){
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/events')
    .then(response => setEventData(response.data))
    .catch(error => console.log(error));
  }, []);

  const countCategory = eventData.reduce((counts, event) => {
    counts[event.category] = (counts[event.category] || 0) + 1;
    return counts;
  }, {});

  const data = Object.keys(countCategory).map(category => ({
    label: category,
    value: countCategory[category]
  }));

  return(
    <Pie
      data={{
        labels: data.map(d => d.label),
        datasets: [{
          data: data.map(d => d.value),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
      }}
      style={{width: "550px", height: "550px"}}
      />
  )
}

export function RaceTimeGraph(){
  const tempEventName = "Annual Regatta Limerick"
  const [eventData2, setEventData2] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/events/by-name/${tempEventName}`)
    .then(response => setEventData2(response.data))
    .catch(error => console.log(error));
  }, []);

  let data = [];
  if (eventData2.results) {
    data = eventData2.results.map((result) => ({
      name: result.user_name,
      time: result.time.split(':').reduce((acc, time) => acc * 60 + parseInt(time), 0),
  }));

  

  return(
    <ScatterChart width={400} height={400}>
      <XAxis dataKey="name" type="category" />
      <YAxis dataKey="time" type="number" domain={['auto', 'auto']} />
      <Tooltip cursor={{ strokeDasharray: '3 3'}} />
      <Scatter name="Race Times" data={data} fill="#8884d8" />
    </ScatterChart>
  )
}
}

export function MonthTimesGraph() {

  const [events, setEvents] = React.useState([]);

  useEffect(() => {
    // Fetch events by category and within past month
    const category = "offshore";
    const pastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
    axios.get('http://localhost:8000/api/events')
      .then(response => {
        const data = response.data;
        const filteredData = data.filter(event => event.category === category && new Date(event.event_end) > pastMonth);
        setEvents(filteredData);
        console.log(filteredData);
      })
      .catch(error => console.log(error));
  }, []);

  // Extract results for each event and format data for chart
  const chartData = events.map(event => {
    const eventResults = event.results.map(result => ({ name: result.user_name, time: parseTime(result.time) }));
    eventResults.sort((a, b) => a.time - b.time); // Sort results by time
    const bestTime = eventResults[0].time;
    return { name: event.name, time: bestTime }; // Use milliseconds as time value
  });

  // Parse a time string in the format HH:MM:SS.milliseconds into milliseconds
  function parseTime(timeString) {
    const parts = timeString.split(':');
    const hours = parseInt(parts[0], 10) * 3600000;
    const minutes = parseInt(parts[1], 10) * 60000;
    const seconds = parseInt(parts[2], 10) * 1000;
    const milliseconds = parseInt(parts[3], 10);
    return hours + minutes + seconds + milliseconds;
  }

  return (
    <LineChart width={800} height={400} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <RechartsLine type="monotone" dataKey="time" stroke="#8884d8" />
    </LineChart>
  );

}

const RaceTimesChart = () => {
  const [raceTimes, setRaceTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const parseMilliseconds = (time) => {
    const parts = time.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    const milliseconds = parseInt(parts[3], 10);
    return (
      hours * 60 * 60 * 1000 +
      minutes * 60 * 1000 +
      seconds * 1000 +
      milliseconds
    );
  };

  useEffect(() => {
    const fetchRaceTimes = async () => {
      const response = await axios.get('http://localhost:8000/api/events', {
        params: {
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Get events from past month
        },
      });
      const data = response.data;
      const allRaceTimes = data.flatMap((event) =>
        event.results.map((result) => result.time)
      );
      const sortedRaceTimes = allRaceTimes.sort((a, b) => {
        const aMilliseconds = parseMilliseconds(a);
        const bMilliseconds = parseMilliseconds(b);
        return aMilliseconds - bMilliseconds;
      });
      setRaceTimes(sortedRaceTimes);
      setIsLoading(false);
    };

    fetchRaceTimes();
  }, []);

  const chartData = {
    labels: raceTimes,
    datasets: [
      {
        label: 'Race Times',
        data: raceTimes.map((time) => parseMilliseconds(time)),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (value, index, values) {
              const date = new Date(value);
              const hours = date.getUTCHours().toString().padStart(2, '0');
              const minutes = date.getUTCMinutes().toString().padStart(2, '0');
              const seconds = date.getUTCSeconds().toString().padStart(2, '0');
              const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
              return `${hours}:${minutes}:${seconds}.${milliseconds}`;
            },
          },
        },
      ],
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Race Times Chart</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};


const PieChart = ({ data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return <Pie data={chartData} />;
};

const UserCatPieChart = () => {
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/User");
      const users = response.data;

      const counts = users.reduce((acc, user) => {
        const category = user.category || 'Unknown';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      setCategoryCounts(counts);
    };

    fetchData();
  }, []);

  return <PieChart data={categoryCounts} />;
};

const UserTypePieChart = () => {
  const [typeCounts, setTypeCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/User");
      const users = response.data;

      const counts = users.reduce((acc, user) => {
        const type = user.type || 'Unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      setTypeCounts(counts);
    };

    fetchData();
  }, []);

  return <PieChart data={typeCounts} />;
};


export default AdminPanel;
