import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { TextField } from "@mui/material";
import AdapterDayJs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function SpaceCard(props) {
  const { startDate, endDate, setStartDate, setEndDate, fetchSpaceData } = props

  // formats date to yyyy-mm-dd
  function formatDate(dateToFormat) {
    const offset = dateToFormat.getTimezoneOffset()
    dateToFormat = new Date(dateToFormat.getTime() - (offset*60*1000))
    return dateToFormat.toISOString().split('T')[0]
  } 

  return (
    <Card sx={{ width: 560, opacity: 0.75  }}>
      <CardHeader
        titleTypographyProps={{variant:'h7' }}
        title="Currently Viewing Nasa's Atronomy Picures of The Day"
        style={{ textAlign: "center" }}
      />
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayJs}>
                <DatePicker
                  label="FROM"
                  inputFormat="YYYY-MM-DD"
                  value={endDate}
                  onChange={(value) => setEndDate(formatDate(value.$d))}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  label="TO"
                  inputFormat="YYYY-MM-DD"
                  value={startDate}
                  onChange={(value) => setStartDate(formatDate(value.$d))}
                  renderInput={(params) => <TextField {...params} />
                  }
                />
              </LocalizationProvider>
              <IconButton
                style={{ padding: 0 }}
                onClick={() => fetchSpaceData()}
              >
                <ArrowForwardIcon />
              </IconButton>
            </div>
          </CardContent>
        </Card>
  );
}