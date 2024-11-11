import {React,useEffect,useState} from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import MainCalendar from "./MainCalender";

const MainCalendarPage = () => {
    const [update,setUpdate]=useState(1);
    
  return (
   
    
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}>
      <Sidebar update={update} setUpdate={setUpdate}/>
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5" }}>
        <MainCalendar update={update} setUpdate={setUpdate}/>
      </Box>
    </Box>
  );
};

export default MainCalendarPage;
