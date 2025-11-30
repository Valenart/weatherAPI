import { useState, useEffect, use } from 'react';
import React from 'react';
import axios from 'axios';
import { Button, Grid, Typography, AppBar } from '@mui/material';
import { Card, CardContent, Stack, Paper } from '@mui/material';

import { Box } from '@mui/system';
import './App.css';

function App() {

  const [weather, setWeather] = useState();
  const [time, setTime] = useState("");
  const [locations, setLocations] = useState("");

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
        console.log(dataTime.toLocaleDateString('pt-br'));
        console.log(dataTime.getHours());
        console.log(dataTime.getMinutes());
        //console.log(dataTimeJP);
        const hours = dataTime.getHours().toString();
        const minutes = dataTime.getMinutes().toString();
        console.log(typeof hours);
        console.log(typeof minutes);
        //var formattedTime = hours + ":" + minutes;
        //setTime(formattedTime);


        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&appid=${apiKey}`);


        console.log("TESTE:", locations);

        //console.log(response)
        setWeather(response.data);
        const data = response.data;
        //console.log(data);

      } catch (error) {
        console.log(error)
      }

    };
    searchResponse();
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', minHeight: '100vh', width: '100vw', background: 'linear-gradient(90deg, #181c24 60%, #232a36 100%)', p: 0, m: 0, overflowX: 'hidden' }}>
      <AppBar position="static" sx={{ background: '#11151c', mb: 4, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1, color: '#fff' }}>WeatherClimate</Typography>
          <Typography variant="subtitle1" sx={{ flexGrow: 1, letterSpacing: 1, color: '#fff' }}>Tempo atualizado na sua cidade e no mundo!</Typography>
        </Box>
        <Typography>
          {time}
        </Typography>
      </AppBar>

      <Box sx={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 80px)', px: 4 }}>

        <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#fff' }}>Bem vindo</Typography>

          {weather && (
            <Stack spacing={3} direction="row" alignItems="stretch">

              <Card sx={{ minWidth: 220, boxShadow: 3, borderRadius: 3, background: '#232a36', color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6" color="#b0b8c1" gutterBottom>
                    Cidade
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#fff' }}>
                    {weather.name}
                  </Typography>
                </CardContent>
              </Card>


              <Card sx={{ minWidth: 220, boxShadow: 3, borderRadius: 3, background: '#232a36', color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6" color="#b0b8c1" gutterBottom>
                    Temperatura
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#fff' }}>
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
                    <Typography variant="h5" sx={{ textTransform: 'capitalize', color: '#fff' }}>
                      {weather.weather[0].description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

            </Stack>

          )}

          <Typography>Outros lugares do mundo: </Typography>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start' }}>

            {weather && (
              <Stack spacing={3} direction="row" alignItems="stretch">
                <Card sx={{ minWidth: 220, boxShadow: 3, borderRadius: 3, background: '#232a36', color: '#fff' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2, justifyContent: 'center', gap: 2 }}>
                      <Typography variant="h6" color="#b0b8c1">
                        Cidade:
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                        {weather.name}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2, justifyContent: 'center', gap: 2 }}>
                      <Typography variant="h6" color="#b0b8c1">
                        Temperatura:
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                        {Math.round(weather.main.temp - 273.15)}°C
                      </Typography>
                    </Box>


                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1, justifyContent: 'center' }}>
                      <Typography variant="h6" color="#b0b8c1" >
                        Clima:
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img
                          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                          alt={weather.weather[0].description}
                          style={{ width: 48, height: 48 }}
                        />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500, textTransform: 'capitalize', color: '#fff' }}>
                          {weather.weather[0].description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Stack>
            )}

          </Box>
        </Box>


      </Box>
    </Box>

  )
}

export default App
