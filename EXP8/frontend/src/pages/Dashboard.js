import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        🎓 Dashboard
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6">👥 Students</Typography>
            <Typography variant="h4">120</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6">📚 Courses</Typography>
            <Typography variant="h4">15</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6">🎯 Enrollments</Typography>
            <Typography variant="h4">320</Typography>
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
}