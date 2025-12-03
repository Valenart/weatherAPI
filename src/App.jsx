import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, AppBar, Button, Grid } from '@mui/material';
import Text from './components/components.jsx';
import { Box } from '@mui/system';
import './App.css';

function App() {

  const [weather, setWeather] = useState();

  // ESTADO QUE ARMAZENA A HORA DO PC 
  const [time, setTime] = useState("");

  //BAGULHO BOBO PARA MUDAR CONFORME A HORA DO DIA
  const [intro, setIntro] = useState("");

  //ARRAYZIN DE LEI DO CLIMA DAS CAPITAIS
  const [climaCapitais, setClimaCapitais] = useState([]);

  const [theme, setTheme] = useState(true);
  const [colorCard, setColorCard] = useState('#977027ff');

  const capitals = [
    { name: "Nova York", country: "Estados Unidos", lat: 40.7128, lon: -74.0060 },
    { name: "Londres", country: "Reino Unido", lat: 51.5074, lon: -0.1278 },
    { name: "Tokyo", country: "Japão", lat: 35.6895, lon: 139.6917 },
    { name: "Sydney", country: "Austrália", lat: -33.8688, lon: 151.2093 },
    { name: "Paris", country: "França", lat: 48.8566, lon: 2.3522 },
    { name: "Dubai", country: "Emirados Árabes", lat: 25.2048, lon: 55.2708 },
  ];


  useEffect(() => {
    const fetchClimaCapitais = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const requests = capitals.map(async (capital) => {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${capital.lat}&lon=${capital.lon}&lang=pt_br&appid=${apiKey}`);

        const timezoneOffset = res.data.timezone;

        const localDate = new Date(Date.now() + timezoneOffset * 1000 - (new Date().getTimezoneOffset() * 60000));
        return {
          ...capital,
          weather: res.data,
          localTime: localDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        };
      });

      const results = await Promise.all(requests);
      setClimaCapitais(results);
    };
    fetchClimaCapitais();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {

    const searchResponse = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;

        const getLocation = await axios.get('http://ip-api.com/json/');
        const lat = getLocation.data.lat;
        const lon = getLocation.data.lon;

        const dataTime = new Date();
        // console.log(dataTime);
        // console.log(dataTime.toLocaleDateString('pt-br'));
        // console.log(dataTime.getHours());
        // console.log(dataTime.getMinutes());

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&appid=${apiKey}`);
        console.log(response.data);

        const hours = dataTime.getHours();

        setIntro(() => {
          const settedTime = hours >= 6 && hours < 12 ? "Bom dia" : hours >= 12 && hours < 18 ? "Boa tarde" : "Boa noite";
          return settedTime;
        })

        dataTime.getHours() >= 16 ? setColorCard(false) : setColorCard(true);

        setWeather(response.data);

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



  function handleTheme() {
    setTheme(!theme);
    setColorCard(theme == true ? '#687381ff' : '#977027ff')
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', minHeight: '100vh', width: '100vw', background: 'linear-gradient(90deg, #181c24 60%, #232a36 100%)', p: 0, m: 0, overflowX: 'hidden' }}>
      <Grid sx={{ display: 'flex', width: { xs: '85vw', md: "100vw" }, flexDirection: 'column', alignItems: 'center' }}>
        <AppBar position="static" sx={{ display: 'flex', flexDirection: "row", background: '#11151c', mb: 4, boxShadow: 3 }}>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 2, paddingInline: 4 }}>
            <Text variant="h5" colorText="#fff" fontWeight={700} sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>WeatherClimate</Text>
            <Text variant="subtitle1" colorText="#fff" sx={{ flexGrow: 1, letterSpacing: 1 }}>Tempo atualizado na sua cidade e no mundo!</Text>
          </Box>

          <Button onClick={handleTheme} sx={{ backgroundColor: '#6b2d2dff' }}>
            <Text variant='subtitle1'>teste</Text>
          </Button>

        </AppBar>

        <Box>
          {weather && (
            <Box>
              <Text variant='h3' fontWeight={500}>{intro}, {weather.name}</Text>
              <Text variant='h1' fontWeight={700} fontSize='30px'>{time}</Text>
            </Box>
          )}
        </Box>

        <Text fontWeight={500}>Clima em outras cidades do Mundo</Text>

        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center', gap: 4, py: 4 }}>

          {climaCapitais.map((city) => (
            <Card key={city.name} sx={{ minWidth: 260, maxWidth: 300, boxShadow: 5, background: colorCard, color: '#fff', m: 1 }}>
              <CardContent>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>

                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                    <Text variant="h6" colorText="#fff" fontWeight="700">{city.name}</Text>
                    <Text variant="subtitle2" colorText="#e0e0e0">{city.country}</Text>

                  </Box>

                  <Box>

                    <Text variant="subtitle2" colorText="#e0e0e0" sx={{ textAlign: 'right' }}>Hora Local</Text>
                    <Text variant="subtitle1" colorText="#fff" fontWeight="700" sx={{ textAlign: 'right' }}>{city.localTime}</Text>

                  </Box>

                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>

                  <img
                    src={`https://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`}
                    alt={city.weather.weather[0].description}
                    style={{ width: 48, height: 48 }}
                  />
                  <Text variant="h4" colorText="#fff" fontWeight="700">{Math.round(city.weather.main.temp - 273.15)}°C</Text>

                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', mt: 1 }}>

                  <Text variant="subtitle2" colorText="#e0e0e0">Sensação Térmica: {Math.round(city.weather.main.feels_like - 273.15)}°</Text>
                  <Text variant="subtitle2" colorText="#e0e0e0">Humidade: {city.weather.main.humidity}%</Text>

                </Box>

              </CardContent>
            </Card>
          ))}

        </Box>
      </Grid>
    </Box >
  );
}

export default App
