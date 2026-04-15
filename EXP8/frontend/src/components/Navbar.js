import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🎓 Student System
        </Typography>

        <Button
          color="inherit"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          LOGOUT
        </Button>

      </Toolbar>
    </AppBar>
  );
}