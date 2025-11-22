import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button, Grid, Typography, AppBar } from '@mui/material';
import { Card, CardContent, Stack, Paper } from '@mui/material';

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

        const dataTime = new Date();
        const dataTimeJP = dataTime.toLocaleString('pt-br', { timeZone: 'Asia/Tokyo' });
        console.log(dataTime);
        console.log(dataTime.toLocaleDateString('pt-br'))
        console.log(dataTimeJP);

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&appid=${apiKey}`);
        console.log(response)
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
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(90deg, #181c24 60%, #232a36 100%)', p: 0 }}>
      <AppBar position="static" sx={{ background: '#11151c', mb: 4, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1, color: '#fff' }}>Previsão do Tempo</Typography>
          <motion.svg
            width="80"
            height="35"
            viewBox="0 0 236 103"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: 16 }}
          >
            <motion.path
              d="M223.626 55.9698C246.633 50.2394 228.966 24.8621 218.284 33.8669C221.845 30.8653 223.728 17.0264 206.781 9.30824C192.401 2.75926 182.678 10.8091 177.2 21.1783C155.883 -25.5302 91.8834 16.4698 126.383 52.9698H81.3834C81.8834 48.4698 79.8834 39.9698 74.3834 33.9698L87.8834 23.4698C88.3834 22.4698 87.6834 21.5698 86.8834 21.9698C86.0834 22.3698 76.3834 28.6364 72.3834 31.9698C69.8834 28.9698 63.8834 24.4698 53.8834 23.4698L53.8834 6.96973C53.5501 6.46973 52.3834 4.96975 51.3834 6.96973V23.4698C46.7167 23.3031 39.3834 24.4698 30.3834 32.4698L16.3834 20.9698C15.8834 20.6364 14.3834 20.9698 14.8834 22.9698L28.8834 34.4698C25.8834 38.4698 22.8834 42.4698 22.3834 52.9698H1.3834C0.71673 53.3031 -0.216603 54.6698 1.3834 55.4698H22.3834C22.8834 60.4698 24.8834 66.4698 28.3834 70.9698L14.8834 78.9697C14.7167 79.8031 14.7834 81.4697 16.3834 81.4697L30.3834 72.9697C33.8834 77.4698 42.3834 82.4697 51.3834 82.4697V100.97C51.8834 101.47 53.0834 102.17 53.8834 100.97V82.4697C58.8834 82.4697 68.8834 78.9697 72.8834 73.4697L87.8834 81.4697C88.5501 81.4697 89.6834 80.9697 88.8834 78.9697L74.8834 71.4697C77.8834 68.4697 80.8834 59.4698 81.3834 55.4698H99.8834"
              stroke="#F09D01"
              fill="none"
              strokeWidth="2"
              initial={{ pathLength: 0, pathOffset: 1 }}
              animate={{ pathLength: 1, pathOffset: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.svg>
        </Box>
      </AppBar>

      <Box sx={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 80px)', px: 4 }}>

        <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#fff' }}>SEU APP DE TEMPO!</Typography>

          {weather && (
            <Stack spacing={3} direction="row" alignItems="stretch">

              <Card sx={{ minWidth: 220, boxShadow: 3, borderRadius: 3, background: '#232a36', color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6" color="#b0b8c1" gutterBottom>
                    Cidade
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff' }}>
                    {weather.name}
                  </Typography>
                </CardContent>
              </Card>


              <Card sx={{ minWidth: 220, boxShadow: 3, borderRadius: 3, background: '#232a36', color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6" color="#b0b8c1" gutterBottom>
                    Temperatura
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff' }}>
                    {Math.round(weather.main.temp - 273.15)}°C
                  </Typography>
                </CardContent>
              </Card>


              <Card sx={{ minWidth: 220, boxShadow: 3, borderRadius: 3, background: '#232a36', color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6" color="#b0b8c1" gutterBottom>
                    Clima
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      style={{ width: 48, height: 48 }}
                    />
                    <Typography variant="h5" sx={{ fontWeight: 700, textTransform: 'capitalize', color: '#fff' }}>
                      {weather.weather[0].description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

            </Stack>

          )}

        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', pl: 6, pt: 4 }}>
          <Paper elevation={0} sx={{ width: 120, minHeight: 400, background: 'transparent', display: 'flex', flexDirection: 'column', gap: 2 }}>
          </Paper>
        </Box>
      </Box>
    </Box>

  )
}

export default App
