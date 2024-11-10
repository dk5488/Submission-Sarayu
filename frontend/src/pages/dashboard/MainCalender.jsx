import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Typography, CircularProgress, Alert, Modal, Paper } from "@mui/material";
import ToggleView from "./ToggleView";
import { apiConnector } from "../../services/apiConnector";
import EventForm from "./EventForm";

const MainCalendar = ({update,setUpdate}) => {
  const [view, setView] = useState("dayGridMonth");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [defaultDate, setDefaultDate] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date()); 

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiConnector(
          "GET",
          "/calender/events",
          null,
          { Authorization: `Bearer ${token}` }
        );

        console.log("Response from get Events: ", response);

        if (response?.events) {
          setEvents(response.events);
        } else {
          throw new Error("No data received from server");
        }
      } catch (error) {
        console.log("Error generated", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token, update]);

  const handleDateClick = (info) => {
    setDefaultDate(info.dateStr);
    setIsFormOpen(true);
    setCurrentDate(info.date); 
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <Box position="relative">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">Calendar</Typography>
       
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
          <CircularProgress />
        </Box>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView={view}
          events={events}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          initialDate={currentDate} 
          eventContent={(eventInfo) => (
            <Box sx={{ padding: "2px 4px" }}>
              <Typography variant="body2" noWrap>
                {eventInfo.event.extendedProps.type}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {eventInfo.event.extendedProps.time}
              </Typography>
            </Box>
          )}
          dateClick={handleDateClick}
        />
      )}

      <Modal
        open={isFormOpen}
        onClose={handleCloseForm}
        aria-labelledby="add-event-form"
        aria-describedby="form-to-add-new-event"
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
            <EventForm
              onAddEvent={(newEvent) => {
                setEvents((prevEvents) => [...prevEvents, newEvent]);
                setIsFormOpen(false);
              }}
              defaultDate={defaultDate}
              setUpdate={setUpdate}
              update={update}
            />
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
};

export default MainCalendar;
