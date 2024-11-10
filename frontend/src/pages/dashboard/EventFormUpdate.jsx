import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { apiConnector } from "../../services/apiConnector";

const EventFormUpdate = ({ currentEvent, token, onCloseForm,update, setUpdate }) => {
  
  const [formData, setFormData] = useState({
    date: currentEvent?.date || "",
    type: currentEvent?.type || "",
    time: currentEvent?.time || "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Send the update request with eventId in the body
      const {date,type,time}=formData;
      console.log("date,type,time",date,type,time);
      console.log("currentEvent._id",currentEvent._id)
      const response = await apiConnector(
        "PUT",
        `/calender/events`,
        { date,type,time, eventId: currentEvent._id }, 
        { Authorization: `Bearer ${token}` }
      );

      
        setUpdate((prev) => prev + 1); 
        onCloseForm(); 
      
    } catch (err) {
      console.error("Error updating event:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Box component="form" onSubmit={handleUpdate} sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h6">Update Event</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" type="submit">
          Update
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCloseForm}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EventFormUpdate;
