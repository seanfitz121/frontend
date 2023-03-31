import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ViewTicket() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/tickets/${ticketId}`);
        console.log('Fetched ticket:', response.data);
        setTicket(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ticket:', error);
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleSubmitReply = async () => {
    try {
      await axios.post(`http://localhost:8000/tickets/${ticketId}/reply`, { reply });
      setTicket({ ...ticket, replies: [...(ticket.replies || []), reply] });
      setReply('');
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ticket) {
    return <div>Sorry, the ticket could not be found.</div>;
  }

  return (
    <section
      style={{
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '80%',
        margin: '0 auto',
      }}
    >
      <h2 style={{ marginBottom: '10px', textAlign: 'center', padding: "5px" }}><strong>Subject: </strong>{ticket.subject}</h2>
      <p style={{ marginBottom: '5px', textAlign: 'center' }}>
        <strong>User:</strong> {ticket.userName} - {ticket.userEmail}
      </p>
      <p style={{ textAlign: 'center' }}>
        <strong>Message:</strong> {ticket.body}
      </p>
      <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>Replies:</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {ticket.replies &&
          ticket.replies.map((reply, index) => (
            <div
              key={index}
              style={{
                marginBottom: '10px',
                backgroundColor: '#F5F5F5',
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
                maxWidth: '40%',
              }}
            >
              {reply}
            </div>
          ))}
      </div>
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h3 style={{ marginBottom: '10px' }}>Submit a reply:</h3>
        <textarea
          value={reply}
          onChange={handleReplyChange}
          rows={5}
          style={{
            width: '100%',
            maxWidth: '40%',
            borderRadius: '5px',
            borderColor: '#ccc',
            padding: '10px',
            marginBottom: '10px',
          }}
        ></textarea>
        <button
          onClick={handleSubmitReply}
          style={{
            borderRadius: '25px',
            color: 'black',
            fontWeight: 'bold',
            backgroundColor: '#FFBF00',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Submit Reply
        </button>
      </div>
    </section>
  );
}

export default ViewTicket;