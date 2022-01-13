import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import store from "store2";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import AppBar from "./components/AppBar"
import DatePicker from "./components/DatePicker"
import SpaceCard from "./components/SpaceCard";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY

  const [likedPage, setLikedPage] = useState(false)
  const [spaceData, setSpaceData] = useState(null)
  const [startDate, setStartDate] = useState(getDate(9))
  const [endDate, setEndDate] = useState(getDate(0))

  // calls fetchStudentData() on mount
  useEffect(() => {
    fetchSpaceData();
  }, []);

  // GET Request to store response data in studentData state
  function fetchSpaceData() {
    setSpaceData(null)
    const baseURL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
    axios
      .get(baseURL)
      .then((response) => {
        //setSpaceData([response.data])
        setSpaceData(response.data)

      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getDate(previousDays) {
    let millisecondDayOffset = previousDays * 86400000
    let today = new Date()
    const offset = today.getTimezoneOffset()
    today = new Date(today.getTime() - (offset*60*1000) - millisecondDayOffset)

    return today.toISOString().split('T')[0]
  }

  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar setLikedPage={setLikedPage} />
        {!spaceData && (
          <Box sx={{ display: 'flex' }} className="loading">
            <CircularProgress />
          </Box>
        )}
        {likedPage && Object.values(store()).map((obj, index) => (
          <div className="center-cards">
            <SpaceCard
              key={obj.date}
              date={obj.date}
              title={obj.title}
              explanation={obj.explanation}
              url={obj.url}
              hdurl={obj.hdurl}
              mediaType={obj.mediaType}
            />
          </div>
        ))}
        {!likedPage && (
          <>
            <div className="center-cards">
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                fetchSpaceData={fetchSpaceData}
              />
            </div>
            {spaceData?.map((obj, index) => (
              <div className="center-cards">
                <SpaceCard
                  key={obj.date}
                  date={obj.date}
                  title={obj.title}
                  explanation={obj.explanation}
                  url={obj.url}
                  hdurl={obj.hdurl}
                  mediaType={obj.media_type}
                />
              </div>
            ))}
          </>
        )}
        
    </ThemeProvider>
  );
}

export default App;
