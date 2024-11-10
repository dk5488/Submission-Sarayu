import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { apiConnector } from "../../services/apiConnector";
const EventForm = ({ onAddEvent, defaultDate,setUpdate,update }) => {
  const [event, setEvent] = useState({ date: defaultDate, type: "", time: "" });
  const token = localStorage.getItem('authToken');
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAddEvent(event);
    const {date,type,time}=event;
    console.log("date,type,time",date,type,time)
    try {
        const response = await apiConnector(
          "POST",
          "/calender/events",
          {date,type,time},
          { Authorization: `Bearer ${token}` }
        );
        console.log("Response from backend: ", response);
      } catch (error) {
        console.log("Eror generated",error);
      }
    
    setUpdate(update=update+1);
    setEvent({ date: defaultDate, type: "", time: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField label="Date" name="date" type="date" fullWidth margin="normal" value={event.date} onChange={handleChange} required />
      <TextField label="Event Type" name="type" fullWidth margin="normal" value={event.type} onChange={handleChange} required />
      <TextField label="Time" name="time" type="time" fullWidth margin="normal" value={event.time} onChange={handleChange} required />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Add Event</Button>
    </Box>
  );
};

export default EventForm;
