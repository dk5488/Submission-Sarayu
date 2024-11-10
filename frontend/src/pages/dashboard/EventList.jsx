import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Modal,
  Paper,
} from "@mui/material";
import { Trash2, Edit } from "lucide-react";
import { apiConnector } from "../../services/apiConnector"; 
import EventFormUpdate from "./EventFormUpdate"; 

const EventList = ({ update, setUpdate }) => {
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null); 

  const token = localStorage.getItem("authToken");

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiConnector(
          "GET",
          "/calender/events", // Adjust the endpoint if needed
          null,
          { Authorization: `Bearer ${token}` }
        );

        // Ensure that 'events' is always an array, even if the response is empty
        if (Array.isArray(response?.events)) {
          setEvents(response.events);
        } else {
          throw new Error("No events found");
        }
      } catch (error) {
        console.log("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token, update]); 
  // Handle delete event
  const deleteEvent = async (eventId) => {
    console.log("Event id passed for deletion: ", eventId);
    try {
      
      const response = await apiConnector(
        "POST",
        "/calender/events1", 
        { eventId }, 
        { Authorization: `Bearer ${token}` }
      );
  
      
      if (response?.status === 200) {
        console.log("Event deleted successfully");
      } else {
        console.log("Failed to delete event", response);
      }
    } catch (error) {
      console.log("Error deleting event:", error);
    }
    setUpdate(update + 1);
  };

  
  const handleEdit = (event) => {
    setCurrentEvent(event); 
    setIsFormOpen(true); 
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentEvent(null);
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        My Events
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <CircularProgress />
        </Box>
      ) : events.length > 0 ? (
        events.map((event) => (
          <>
           
            <Box
              key={event._id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                mb: 1,
                p: 1,
                bgcolor: "#f5f5f5",
                borderRadius: 1,
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {event.date}
                </Typography>
                <Typography variant="body2">
                  {event.type} - {event.time}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleEdit(event)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => deleteEvent(event._id)}
                  color="error"
                >
                  <Trash2 />
                </IconButton>
              </Box>
            </Box>
          </>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No events available
        </Typography>
      )}

      {/* Modal for editing event */}
      <Modal
        open={isFormOpen}
        onClose={handleCloseForm}
        aria-labelledby="edit-event-form"
        aria-describedby="form-to-edit-event"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
          position="fixed"
          top={0}
          left={0}
        >
          <Paper
            elevation={3}
            sx={{
              width: "80%",
              maxWidth: "500px",
              padding: "20px",
              bgcolor: "white",
            }}
          >
            <EventFormUpdate
              currentEvent={currentEvent}
              token={token}
              onCloseForm={handleCloseForm}
              update={update}
              setUpdate={setUpdate}
            />
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
};

export default EventList;
