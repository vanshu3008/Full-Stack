import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Sidebar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box"
        }
      }}
    >
      <List>

        <ListItem button onClick={() => navigate("/dashboard")}>
          <ListItemText primary="🏠 Dashboard" />
        </ListItem>

        <ListItem button onClick={() => navigate("/courses")}>
          <ListItemText primary="📚 Courses" />
        </ListItem>

        {/* SHOW ONLY FOR ADMIN */}
        {user?.role === "admin" && (
          <ListItem button onClick={() => navigate("/admin")}>
            <ListItemText primary="👑 Admin" />
          </ListItem>
        )}

      </List>
    </Drawer>
  );
}