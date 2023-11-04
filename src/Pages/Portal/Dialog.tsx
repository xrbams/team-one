import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip,
  Box,
  Slider,
} from "@mui/material";

const StudentDialog = ({ setSelectedStudent, selectedStudent }) => {
  const [gpa, setGpa] = useState(0);

  useEffect(() => {
    let grade = 0;
    console.log("hi");
    console.log("hi", selectedStudent);
    if (selectedStudent) {
      console.log(selectedStudent);
      selectedStudent.list_of_courses.forEach((course) => {
        grade += course.grade;
      });
      let gr = grade / selectedStudent.list_of_courses.length;
      setGpa(gr);
    }
  }, [selectedStudent]);

  return (
    <Dialog
      open={Boolean(selectedStudent)}
      onClose={() => setSelectedStudent(null)}
      maxWidth="lg"
      PaperProps={{
        style: {
          maxHeight: "75%", // You can use any unit or percentage you prefer
          width: "80%",
          overflowY: "auto", // Adds scrollbar when content overflows
        },
      }}
    >
      <DialogTitle>{selectedStudent ? selectedStudent.name : ""}</DialogTitle>
      <DialogContent>
        {/* Additional information about the student can go here */}
        {selectedStudent && (
          <Paper elevation={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                {/* Left Column */}
                <Box p={3}>
                  <Avatar
                    src={selectedStudent.avatar}
                    sx={{ width: 120, height: 120 }}
                  />
                  <p> </p>
                  <Box
                    border={2}
                    p={2}
                    mt={2}
                    borderColor="grey.300"
                    style={{
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2">
                          Student name:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: "bold" }}
                        >
                          {selectedStudent.name}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2">Country:</Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: "bold" }}
                        >
                          {selectedStudent.nationality}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2">Email:</Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: "bold", color: "#1AA7EC" }}
                        >
                          {selectedStudent.email}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2">
                          Phone Number:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: "bold" }}
                        >
                          {selectedStudent.phone_number}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box
                    border={2}
                    p={2}
                    mt={2}
                    borderColor="grey.300"
                    style={{
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      style={{ fontWeight: "bold" }}
                    >
                      About me:
                    </Typography>
                    <Typography variant="subtitle2" style={{}}>
                      {selectedStudent.bio}
                    </Typography>
                  </Box>

                  <Box
                    border={2}
                    p={2}
                    mt={2}
                    borderColor="grey.300"
                    style={{
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      style={{ fontWeight: "bold" }}
                    >
                      Languages:
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: "lightgreen", // Replace with the color you want
                        borderRadius: "12px", // Adjust for desired roundness
                        p: 1, // Adjust padding to fit your needs
                        display: "inline-flex", // To keep the Box content-aligned
                        alignItems: "center",
                        justifyContent: "center",
                        height: 24, // Fix the height to match your design
                      }}
                    >
                      <Typography variant="body1" sx={{ fontSize: "12px" }}>
                        English
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={7}>
                {/* Right Column */}
                <Box p={2}>
                  <Typography variant="h6">
                    Professional skills / experience
                  </Typography>
                  <List>
                    {/* This would be a loop through course data */}
                    {selectedStudent.list_of_courses.map((course) => (
                      <ListItem key={course.name}>
                        <ListItemText
                          primary={course.name}
                          secondary={`Credits: 5 | Grade: ${course.grade}`}
                        />
                        <Slider
                          value={course.grade}
                          step={1}
                          marks
                          min={1}
                          max={5}
                          valueLabelDisplay="auto"
                          disabled
                        />
                      </ListItem>
                    ))}
                  </List>
                  {/* Skills */}
                  {selectedStudent.skills.map((skill) => (
                    <Chip key={skill} label={skill} />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSelectedStudent(null)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDialog;
