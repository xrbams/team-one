import React from 'react';
import { Container, Grid, Paper } from '@mui/material';

function App() {
  return (
    <Container>
      <Grid container spacing={3}>
        {/* Filter Section */}
        <Grid item xs={12} md={4}>
          <Paper>
            Filter Section
          </Paper>
        </Grid>
        {/* Content Section */}
        <Grid item xs={12} md={8}>
          <Paper>
            Content Section
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
