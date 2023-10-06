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
  Chip,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import studentsJSON from "../../../data/students.json"; // Assuming students.json is in a data folder at the root directory
import coursesJSON from "../../../data/courses.json"; // Assuming courses.json is in a data folder at the root directory



function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
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
  const [studentsPerPage] = useState(12);
  const [selectedSort, setSelectedSort] = useState("");

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = data.slice(indexOfFirstStudent, indexOfLastStudent);
  
  const sortData = (option) => {
    const sortedStudents = [...data].sort((a, b) => {
      if (option === "Name") {
        return a.name.localeCompare(b.name);
      }
      if (option === "Nationality") {
        return a.nationality.localeCompare(b.nationality);
      }
      if (option === "Grades") {
        const avgGradeA =
          a.list_of_courses.reduce((acc, curr) => acc + curr.grade, 0) /
          a.list_of_courses.length;
        const avgGradeB =
          b.list_of_courses.reduce((acc, curr) => acc + curr.grade, 0) /
          b.list_of_courses.length;
        return avgGradeA - avgGradeB;
      }
      if (option === "Expected year of graduation") {
        return a.expected_graduate_year - b.expected_graduate_year;
      }
      return 0;
    });
    setData(sortedStudents);
  };

  
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

        <Grid item xs={12} md={4} padding={8}>
          <Paper
            style={{
              paddingLeft: "5px",
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
              <Grid item xs={12} md={8}>
                <FormControlLabel
                  key={skill}
                  control={
                    <Checkbox
                      checked={selectedFilters.includes(skill)}
                      onChange={() => handleSkillFilterChange(skill)}
                      name={skill}
                      color="default"
                      style={{
                        "&$checked": {
                          color: "#00e676",
                        },
                        color: selectedFilters.includes(skill)
                          ? "#00e676"
                          : "grey",
                      }}
                    />
                  }
                  label={skill}
                />
              </Grid>
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
                    color="default"
                    style={{
                      "&$checked": {
                        color: "#00e676",
                      },
                      color: selectedFilters.includes(grade)
                        ? "#00e676"
                        : "grey",
                    }}
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
                    color="default"
                    style={{
                      "&$checked": {
                        color: "#00e676",
                      },
                      color: selectedFilters.includes(year)
                        ? "#00e676"
                        : "grey",
                    }}
                  />
                }
                label={year}
              />
            ))}
          </Paper>
        </Grid>
        {/* Content Section */}
        <Grid item xs={12} md={8}>
        <Grid container alignItems="center" spacing={2}>
  <Grid item xs={6}>
    <Typography color={"black"} variant="h5">
      {`${data.length} matches found`}
    </Typography>
  </Grid>
  <Grid item xs={6} style={{ textAlign: 'right' }}>
    <FormControl variant="outlined" size="small">
      <InputLabel>Sort By</InputLabel>
      <Select
        value={selectedSort}
        onChange={(e) => {
          setSelectedSort(e.target.value);
          sortData(e.target.value);
        }}
        label="Sort By"
      >
        <MenuItem value={"Name"}>Name</MenuItem>
        <MenuItem value={"Nationality"}>Nationality</MenuItem>
        <MenuItem value={"Grades"}>Grades</MenuItem>
        <MenuItem value={"Expected year of graduation"}>
          Expected year of graduation
        </MenuItem>
      </Select>
    </FormControl>
  </Grid>
</Grid>

          <Paper
            style={{
              padding: "16px",
              backgroundColor: "transparent",
              color: "#black",
              boxShadow: "none",
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
                backgroundColor: "#ff",
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  Name
                </Grid>
                <Grid item xs={3}>
                  Nationality
                </Grid>
                <Grid item xs={2}>
                  Grades
                </Grid>
                <Grid item xs={2}>
                  Expected year of graduation
                </Grid>
              </Grid>
            </Card>
            {/* Student Cards */}
            {currentStudents.map((student) => {
              const avgGrade =
                student.list_of_courses.reduce(
                  (acc, curr) => acc + curr.grade,
                  0
                ) / student.list_of_courses.length;

              return (
                <Card
                  key={student.id}
                  style={{
                    marginBottom: "6px",
                    padding: "10px",
                    color: "black",
                    borderRadius: "12px",
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar
                        alt={student.name}
                        {...stringAvatar(student.name)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6">{student.name}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" color={"grey"}>
                        {student.nationality}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Chip
                        label={`${avgGrade.toFixed(1)}/5.0`}
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="subtitle1">
                        <Chip
                          label={`${student.expected_graduate_year}`}
                          color="primary"
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              );
            })}
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
              sx={{ color: { color: "#00df9a" } }}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
