import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Container,
  TextareaAutosize,
  Grid,
  Box,
} from "@mui/material";
import "./App.css";
import LineChart from "./LineChart";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

//register required components for chartjs 2
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const App = () => {
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [database, setDatabase] = useState("");
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");
  const [data, setData] = useState();

  //chart data
  const createChart = (response) => {
    const chartLabels = response.data.results.map((res) => {
      let date = new Date(res.Date);
      return date.toLocaleDateString("en-US");
    });

    const firstValues = response.data.results.map((item) => item.First);

    const secondValues = response.data.results.map((item) => item.Second);

    const chartDataset = {
      labels: chartLabels,
      datasets: [
        {
          label: "First",
          data: firstValues,
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Second",
          data: secondValues,
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    };
    setData(chartDataset);
  };

  //api call for querying
  const executeQuery = () => {
    axios
      .post("https://6583d624.dorsy.net/server.php", {
        host,
        username,
        database,
        password,
        query,
      })
      .then((response) => {
        //creating data sets for chart
        createChart(response);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Container className="container">
      {/* MySQL Data Section */}

      <Box border={1} borderColor="#000" p={3} position="relative">
        {/* Title */}
        <Typography
          zIndex={2}
          position="absolute"
          top={-13}
          paddingX={1}
          bgcolor="white"
        >
          MySQL Data
        </Typography>

        {/* Grid for SQL Data */}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="MySQL Host"
              variant="outlined"
              fullWidth
              value={host}
              onChange={(e) => setHost(e.target.value)}
              required
            />
            <TextField
              label="MySQL Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ marginTop: "20px" }}
            />
          </Grid>

          <Grid item xs={6} spacing={3}>
            <TextField
              label="MySQL Database"
              variant="outlined"
              fullWidth
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              required
            />
            <TextField
              label="MySQL Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ marginTop: "20px" }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* MySQL Query Section */}
      <Box
        border={1}
        borderColor="#000"
        p={3}
        marginTop="30px"
        position="relative"
      >
        {/* Title */}
        <Typography
          zIndex={2}
          position="absolute"
          top={-13}
          paddingX={1}
          bgcolor="white"
        >
          MySQL Query
        </Typography>

        <TextareaAutosize
          minRows={4}
          maxRows={10}
          placeholder="SQL Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "0px",
            marginBottom: "0px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          required
        />

        <Box textAlign="left">
          <Button
            variant="outlined"
            color="primary"
            onClick={executeQuery}
            style={{ marginTop: "15px" }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {/* display chart */}
      {data && <LineChart data={data} />}
    </Container>
  );
};

export default App;
