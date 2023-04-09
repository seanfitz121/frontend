import React, { useState } from 'react';
import axios from 'axios';
import './AddResultForm.css';
import { toast } from "react-toastify";

function AddResultForm({ eventName }) {
  const [formData, setFormData] = useState({ user_id: '', user_name: '', position: '', time: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/events/${eventName}/add_result`, formData)
      .then((response) => {
        toast.success(`Result added successfully!`)
        setFormData({ user_id: '', user_name: '', position: '', time: '' });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to add result, please try again.")
      });
  };

  return (
    <form className="add-result-form" onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="user_id">User ID:</label>
    <input type="text" id="user_id" name="user_id" value={formData.user_id} onChange={handleChange} />
  </div>
  <div className="form-group">
    <label htmlFor="user_name">User Name:</label>
    <input type="text" id="user_name" name="user_name" value={formData.user_name} onChange={handleChange} />
  </div>
  <div className="form-group">
    <label htmlFor="position">Position:</label>
    <input type="number" id="position" name="position" value={formData.position} onChange={handleChange} />
  </div>
  <div className="form-group">
    <label htmlFor="time">Time:</label>
    <input type="text" id="time" name="time" value={formData.time} onChange={handleChange} />
  </div>
  <button type="submit">Add Result</button>
</form>

  );
}

export default AddResultForm;
