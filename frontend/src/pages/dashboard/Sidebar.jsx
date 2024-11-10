import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import EventList from "./EventList";
import { motion } from "framer-motion";

const Sidebar = ({update,setUpdate}) => {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      style={{ width: "300px", backgroundColor: "#fff", padding: "16px" }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        My Calendar
      </Typography>
      <Divider sx={{ my: 2 }} />
      <EventList update={update} setUpdate={setUpdate} />
    </motion.div>
  );
};

export default Sidebar;
