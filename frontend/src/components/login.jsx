// src/components/LoginForm.jsx
import React, { useState } from "react";
import { auth } from "../services/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { apiConnector } from "../services/apiConnector.js";
import { Link, useNavigate  } from "react-router-dom";
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


// src/components/LoginForm.jsx
// 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      const response = await apiConnector("POST", "/auth/login", { token });

      if (response) {
        localStorage.setItem("authToken", token);
        
        setEmail("");
        setPassword("");
        setError(null);
        
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 100);
      } else {
        throw new Error("Backend login failed");
      }
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
        background: "linear-gradient(to right, #ff7e5f, #feb47b)",
      }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card sx={{ maxWidth: 500, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Login
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleLogin} noValidate>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
              >
                Create an account
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default LoginForm;
