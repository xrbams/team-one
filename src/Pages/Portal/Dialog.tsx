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

const StudentDialog = ({ setSelectedStudent, selectedStudent, courses }) => {
  const [gpa, setGpa] = useState(0);
  const [credits, setCredits] = useState(0);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    let grade = 0;
    console.log("hi");
    console.log("hi", selectedStudent);
    if (selectedStudent) {
      console.log(selectedStudent);
      selectedStudent.list_of_courses.forEach((course) => {
        grade += course.grade;
      });
      let gr = parseFloat(
        (grade / selectedStudent.list_of_courses.length).toFixed(1)
      );
      setGpa(gr);
    }

    if (selectedStudent) {
      setAllCourses(courses);
    }
  }, [selectedStudent, courses]);

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
                <Box
                  border={2}
                  p={2}
                  borderColor="grey.300"
                  style={{
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", marginBottom: "24px" }}
                  >
                    Professional skills / experience
                  </Typography>

                  <Grid container spacing={0} alignItems="center" mt={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle2">
                        Credits completed:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: "bold", color: "#1AA7EC" }}
                      >
                        {credits}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle2">Grade:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: "bold", color: "#1AA7EC" }}
                      >
                        {gpa}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      textAlign: "left",
                      marginTop: "16px",
                      marginBottom: "0px",
                    }}
                  >
                    Courses completed:
                  </Typography>

                  {/* Courses table */}
                  <Grid container spacing={0} alignItems="center" mt={0}>
                    <Grid item xs={12} sm={1}>
                      <Typography
                        variant="subtitle2"
                        style={{ color: "#a0a0a0", textAlign: "center" }}
                      >
                        credits
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <Typography
                        variant="subtitle2"
                        style={{ color: "#a0a0a0", textAlign: "center" }}
                      >
                        course
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <Typography
                        variant="subtitle2"
                        style={{ color: "#a0a0a0", textAlign: "center" }}
                      >
                        grade
                      </Typography>
                    </Grid>

                    {selectedStudent.list_of_courses.map((course) => (
                      <React.Fragment key={course.id}>
                        <Grid item xs={12} sm={1}>
                          <Typography
                            variant="subtitle2"
                            style={{ color: "#000", textAlign: "center" }}
                          >
                            5
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={10}
                          style={{
                            borderLeft: "2px solid #000",
                            paddingLeft: "16px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            style={{ color: "#000", textAlign: "left" }}
                          >
                            {allCourses &&
                              allCourses.find((item) => item.id === course.id)
                                ?.name}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={1}
                          style={{
                            borderLeft: "2px solid #000",
                            paddingLeft: "16px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            style={{ color: "#000", textAlign: "center" }}
                          >
                            {course.grade}
                          </Typography>
                        </Grid>
                      </React.Fragment>
                    ))}
                  </Grid>

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
