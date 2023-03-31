import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withRequireAuth from './withRequireAuth';

function ContactForm() {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    subject: '',
    body: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/tickets/', {
        ...formData,
        timeSent: new Date(),
        resolved: false,
      });
      alert('Support ticket submitted successfully.');
      toast.success("Support ticket has been submitted, and will be reviewed shortly!")
      setFormData({
        userName: '',
        userEmail: '',
        subject: '',
        body: '',
      });
    } catch (error) {
      console.error('Error submitting support ticket:', error);
    }
  };

  const formStyles = {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fff',
    borderRadius: '5px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const inputStyles = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
  };

  const buttonStyles = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '5px',
    border: 'none',
    background: '#FFBF00',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
        <h3>Contact Form</h3>
        <p>We aim to reply to all tickets within 3 business days.</p>
    <input
      style={inputStyles}
      type="text"
      name="userName"
      value={formData.userName}
      onChange={handleChange}
      placeholder="Your name"
      required
    />
    <input
      style={inputStyles}
      type="email"
      name="userEmail"
      value={formData.userEmail}
      onChange={handleChange}
      placeholder="Your email"
      required
    />
    <input
      style={inputStyles}
      type="text"
      name="subject"
      value={formData.subject}
      onChange={handleChange}
      placeholder="Subject"
      required
    />
    <textarea
      style={{ ...inputStyles, resize: 'none' }}
      name="body"
      value={formData.body}
      onChange={handleChange}
      placeholder="Your message"
      rows="5"
      required
    ></textarea>
    <button type="submit" style={buttonStyles}>
      Submit
    </button>
  </form>
  );
}

export default withRequireAuth(ContactForm);