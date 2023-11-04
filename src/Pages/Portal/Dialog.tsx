import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
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
    >
      <DialogTitle>{selectedStudent ? selectedStudent.name : ""}</DialogTitle>
      <DialogContent>
        {/* Additional information about the student can go here */}
        <Grid container>
          <Grid item xs={6} m={6}>
            <p> Student name: {selectedStudent ? selectedStudent.name : ""}</p>
            <p>Country: {selectedStudent ? selectedStudent.nationality : ""}</p>
            <p>Email: {selectedStudent ? selectedStudent.email : ""}</p>
            <p>About me: {selectedStudent ? selectedStudent.bio : ""}</p>
            <p>Languages: {selectedStudent ? selectedStudent.languages : ""}</p>
          </Grid>

          <Grid item xs={6} m={6}>
            <p>Credits completed: 134</p>
            <p>GPA: {selectedStudent ? gpa : ""}</p>
            <p>Courses completed: </p>
            <p>
              Expected graduation year:{" "}
              {selectedStudent ? selectedStudent.expected_graduate_year : ""}
            </p>
            <p>
              Gained skills: {selectedStudent ? selectedStudent.skills : ""}
            </p>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSelectedStudent(null)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDialog;
