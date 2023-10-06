import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const StudentDialog = ({ setSelectedStudent, selectedStudent }) => {
  return (
    <Dialog open={Boolean(selectedStudent)} onClose={() => setSelectedStudent(null)}>
        <DialogTitle>{selectedStudent ? selectedStudent.name : ''}</DialogTitle>
        <DialogContent>
          {/* Additional information about the student can go here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedStudent(null)}>Close</Button>
        </DialogActions>
      </Dialog>
  );
};

export default StudentDialog;
