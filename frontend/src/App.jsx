// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";

import Navbar from "./components/Navbar";
import MainCalendarPage from "./pages/dashboard/MainCalendarPage";
import {ProtectedRoute} from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <MainCalendarPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        
      </Routes>
    </Router>
  );
}

export default App;