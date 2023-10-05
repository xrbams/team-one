import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Autocomplete,
  Stack,
  TextField,
  Typography,
  Avatar,
  Pagination,
  Box,
  Slider,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import studentsJSON from "../../../data/students.json"; // Assuming students.json is in a data folder at the root directory
import coursesJSON from "../../../data/courses.json"; // Assuming courses.json is in a data folder at the root directory

const uniqueSkills = new Set();
studentsJSON.forEach((student) => {
  student.skills.forEach((skill) => {
    uniqueSkills.add(skill);
  });
});
const uniqueSkillsArray = Array.from(uniqueSkills);

const uniqueGrades = new Set();
const uniqueGradYears = new Set();

studentsJSON.forEach((student) => {
  uniqueGradYears.add(student.expected_graduate_year);

  const avgGrade =
    student.list_of_courses.reduce((acc, curr) => acc + curr.grade, 0) /
    student.list_of_courses.length;
  uniqueGrades.add(Math.round(avgGrade));
});

const uniqueGradesArray = Array.from(uniqueGrades);
const uniqueGradYearsArray = Array.from(uniqueGradYears);
const FilterLabels = ({ label }) => {
  return (
    <Box
      sx={{
        fontSize: 16, // Change to smaller font size
        paddingTop: 1,
        paddingBottom: 2, // Adjust padding
      }}
    >
      <Typography color={"black"} variant="h6">
        {label}
      </Typography>{" "}
    </Box>
  );
};

const grade = [1, 2, 3, 4, 5];
function App() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [students, setStudents] = useState([]);
  const [data, setData] = useState([]); // Initialize with empty array
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = data.slice(indexOfFirstStudent, indexOfLastStudent);
  useEffect(() => {
    // Fetch local JSON data for students and courses
    setStudents(studentsJSON);
    setCourses(coursesJSON);
    setData(studentsJSON); // Populate initial data with fetched students
  }, []);

  const handleFilterChange = (event, values) => {
    const newFilters = values.map((value) => value.id);
    setSelectedFilters(newFilters);
    filterData(newFilters);
  };

  const handleSkillFilterChange = (skill) => {
    let newFilters;

    if (selectedFilters.includes(skill)) {
      newFilters = selectedFilters.filter((item) => item !== skill);
    } else {
      newFilters = [...selectedFilters, skill];
    }

    setSelectedFilters(newFilters);
    filterData(newFilters); // Assuming filterData can handle skill filtering
  };
  const filterData = (filters) => {
    if (filters.length === 0) {
      setData(students);
      return;
    }

    const filteredStudents = students.filter((student) => {
      const avgGrade =
        student.list_of_courses.reduce((acc, curr) => acc + curr.grade, 0) /
        student.list_of_courses.length;

      return filters.every((filter) => {
        return (
          student.list_of_courses.some((course) => course.id === filter) ||
          student.skills.includes(filter) ||
          Math.round(avgGrade) === filter ||
          student.expected_graduate_year === filter
        );
      });
    });

    setData(filteredStudents);
  };
  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
    filterData([...selectedFilters, event.target.value]);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  console.log(data.length);
  return (
    <Container>
      <Grid container spacing={3}>
        {/* Filter Section */}
        <Grid item xs={12} md={4} spacing={2}>
          <Paper
            style={{
              backgroundColor: "#fff",
              color: "black",
              borderRadius: "12px", // Rounded corners
            }}
          >
            {" "}
            <FilterLabels label={"Search by courses"} />
            <Stack spacing={3} sx={{ width: "100%" }}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={courses}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                onChange={handleFilterChange}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Courses" />
                )}
                classes={{
                  tag: "custom-tag", // This is the class you can target
                }}
              />
            </Stack>
          </Paper>
          <Paper style={{ backgroundColor: "#fff", color: "black" }}>
            <FilterLabels label={"Skills"} />
            {uniqueSkillsArray.map((skill) => (
              <FormControlLabel
                key={skill}
                control={
                  <Checkbox
                    checked={selectedFilters.includes(skill)}
                    onChange={() => handleSkillFilterChange(skill)}
                    name={skill}
                  />
                }
                label={skill}
              />
            ))}
          </Paper>
          <Paper style={{ backgroundColor: "#fff", color: "black" }}>
            <FilterLabels label={"Average Grade"} />

            {grade.map((grade) => (
              <FormControlLabel
                key={grade}
                control={
                  <Checkbox
                    checked={selectedFilters.includes(grade)}
                    onChange={() => handleSkillFilterChange(grade)}
                    name={grade}
                  />
                }
                label={grade}
              />
            ))}
          </Paper>
          <Paper style={{ backgroundColor: "#fff", color: "black" }}>
            <FilterLabels label={"Graduation Year"} />
            {uniqueGradYearsArray.map((year) => (
              <FormControlLabel
                key={year}
                control={
                  <Checkbox
                    checked={selectedFilters.includes(year)}
                    onChange={() => handleSkillFilterChange(year)}
                    name={year}
                  />
                }
                label={year}
              />
            ))}
          </Paper>
        </Grid>
        {/* Content Section */}
        <Grid item xs={12} md={8}>
          <Typography
            color={"black"}
            variant="h5"
          >{`${data.length} matches`}</Typography>
          <Paper
            style={{
              padding: "16px",
              backgroundColor: "transparent",
              color: "#black",
              boxShadow: "none"
              // borderRadius: "12px", // Rounded corners
            }}
          >
            {/* Header */}

            <Card
              style={{
                marginBottom: "15px",
                padding: "10px",
                color: "black",
                borderRadius: "12px", // Rounded corners
                backgroundColor: "#f6f6f9",
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={2}>
                  Avatar
                </Grid>
                <Grid item xs={5}>
                  Name
                </Grid>
                <Grid item xs={5}>
                  Nationality
                </Grid>
              </Grid>
            </Card>
            {/* Student Cards */}
            {currentStudents.map((student) => (
              <Card
                key={student.id}
                style={{
                  marginBottom: "6px",
                  padding: "10px",
                  color: "black",
                  borderRadius: "12px", // Rounded corners
                }}
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={2}>
                    <Avatar>{student.name[0]}</Avatar>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h6">{student.name}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="subtitle1">
                      {student.nationality}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Paper>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Pagination
              count={Math.ceil(data.length / studentsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
