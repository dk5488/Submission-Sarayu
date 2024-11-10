import React from "react";
import { ButtonGroup, Button } from "@mui/material";

const ToggleView = ({ view, setView }) => {
  return (
    <ButtonGroup variant="contained">
      <Button onClick={() => setView("dayGridMonth")} disabled={view === "dayGridMonth"}>
        Monthly
      </Button>
      <Button onClick={() => setView("timeGridWeek")} disabled={view === "timeGridWeek"}>
        Weekly
      </Button>
    </ButtonGroup>
  );
};

export default ToggleView;
