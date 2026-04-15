import React from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/auth/login", data);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={5} style={{ padding: 30, marginTop: 100 }}>
        <Typography variant="h4" align="center">Login</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Email" fullWidth margin="normal" {...register("email")} />
          <TextField label="Password" type="password" fullWidth margin="normal" {...register("password")} />

          <Button fullWidth variant="contained" type="submit">
            Login
          </Button>
        </form>

        <Button fullWidth onClick={() => navigate("/register")}>
          New User? Register
        </Button>
      </Paper>
    </Container>
  );
}