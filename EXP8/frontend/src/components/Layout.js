import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>

      {/* Sidebar width fix */}
      <Box sx={{ width: 240 }}>
        <Sidebar />
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />

        <Box sx={{ padding: 3 }}>
          {children}
        </Box>
      </Box>

    </Box>
  );
}