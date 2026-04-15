import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Container, Typography, Card, CardContent, Button, Grid } from "@mui/material";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await axios.get("/api/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const enroll = async (id) => {
    await axios.post(`/api/courses/enroll/${id}`);
    fetchCourses();
  };

  const drop = async (id) => {
    await axios.post(`/api/courses/drop/${id}`);
    fetchCourses();
  };

  return (
    <Container>
      <Typography variant="h4">📚 Courses</Typography>

      <Grid container spacing={3}>
        {courses.map((c) => (
          <Grid item xs={12} md={4} key={c._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{c.name}</Typography>
                <Typography>Instructor: {c.instructor}</Typography>
                <Typography>Seats: {c.availableSeats}</Typography>

                <Button onClick={() => enroll(c._id)}>Enroll</Button>
                <Button color="error" onClick={() => drop(c._id)}>Drop</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}