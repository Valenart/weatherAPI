import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system';
import './App.css';

function App() {

  const [weather, setWeather] = useState();

  useEffect(() => {
    const searchResponse = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;

        const getLocation = await axios.get('http://ip-api.com/json/');
        const lat = getLocation.data.lat;
        const lon = getLocation.data.lon;

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&appid=${apiKey}`);
        setWeather(response.data);
        const data = response.data;
        console.log(data);


      } catch (error) {
        console.log(error)
      }

    };
    searchResponse();
  }, [])

  return (
    <Grid>
      <Box>
        <Typography> SEU APP DE TEMPO!</Typography>
        {weather && (
          <Box key={weather.id}>
            <Typography> Cidade: {weather.name} </Typography>
            <Typography> Temperatura: {Math.round(weather.main.temp - 273.15)}°C </Typography>
            <Typography> Clima: {weather[0].description}</Typography>
          </Box>
        )}
      </Box>
    </Grid>

  )
}

export default App
