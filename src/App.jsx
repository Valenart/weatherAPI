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
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', minHeight: '100vh', width: '100vw', background: 'linear-gradient(90deg, #181c24 60%, #232a36 100%)', p: 0, m: 0, overflowX: 'hidden' }}>
      <AppBar position="static" sx={{ background: '#11151c', mb: 4, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1, color: '#fff' }}>WeatherClimate</Typography>
          <Typography variant="subtitle1" sx={{ flexGrow: 1, letterSpacing: 1, color: '#fff' }}>Tempo atualizado na sua cidade e no mundo!</Typography>
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

        {/* <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', pl: 6, pt: 4 }}>
          <Paper elevation={0} sx={{ width: 120, minHeight: 400, background: 'transparent', display: 'flex', flexDirection: 'column', gap: 2 }}>
          </Paper>
        </Box> */}
      </Box>
    </Box>

  )
}

export default App
