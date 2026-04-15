import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Container, Typography, Table, TableHead,
  TableRow, TableCell, TableBody, Button, TextField
} from "@mui/material";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [course, setCourse] = useState({
    name: "",
    instructor: "",
    availableSeats: ""
  });

  const fetchUsers = async () => {
    const res = await axios.get("/api/auth/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`/api/auth/users/${id}`);
    fetchUsers();
  };

  const addCourse = async () => {
    await axios.post("/api/courses", course);
    alert("Course added");
  };

  return (
    <Container>
      <Typography variant="h4">👑 Admin Panel</Typography>

      {/* ADD COURSE */}
      <Typography variant="h6">Add Course</Typography>
      <TextField label="Course Name" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
      <TextField label="Instructor" onChange={(e) => setCourse({ ...course, instructor: e.target.value })} />
      <TextField label="Seats" onChange={(e) => setCourse({ ...course, availableSeats: e.target.value })} />
      <Button onClick={addCourse}>Add</Button>

      {/* USERS TABLE */}
      <Typography variant="h6" style={{ marginTop: 30 }}>Users</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((u) => (
            <TableRow key={u._id}>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => deleteUser(u._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Container>
  );
}