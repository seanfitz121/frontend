import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnresolvedTickets = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tickets/unresolved/');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching unresolved tickets:', error);
      }
    };

    fetchUnresolvedTickets();
  }, []);

  const handleCheckboxChange = (e, ticketId) => {
    setSelectedTicket(e.target.checked ? ticketId : null);
  };

  const handleViewTicketClick = () => {
    if (selectedTicket) {
      navigate(`/view-ticket/${selectedTicket}`);
    }
  };

  return (
    <section style={{ margin: '20px 0' }}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
    <h2 className="font-face-ab" style={{}}>Support Tickets</h2>
    </div>
    <div style={{display: "flex", flexDirection: "column"}}>
    <button
      onClick={handleViewTicketClick}
      style={{
        borderRadius: '50px',
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#007bff',
        border: 'none',
        alignSelf: 'flex-end'
      }}
    >
      View Ticket
    </button>
    
    <div
      style={{
        maxHeight: 'calc(100% - 60px)', 
        overflowY: 'scroll', 
        paddingRight: '5px', 
      }}
    >
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Select</th>
            <th>User</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedTicket === ticket._id}
                  onChange={(e) => handleCheckboxChange(e, ticket._id)}
                />
              </td>
              <td>{ticket.userName}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  </section>
  );
}

export default SupportTickets;