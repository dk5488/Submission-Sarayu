// src/components/SignupForm.jsx
import React, { useState } from "react";
import { auth } from "../services/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { apiConnector } from "../services/apiConnector.js";
import { Link,useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        throw new Error("Passwords do not match");
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      await apiConnector("POST", "/auth/register", { token, name });
      
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(null);
      navigate('/login')
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ maxWidth: 500, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Create Account
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSignup} noValidate>
              <TextField
                label="Name"
                type="text"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Create Account
              </Button>
              <Button
                component={Link}
                to="/login"
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
              >
                Already have an account? Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default SignupForm;
