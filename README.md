

# WeatherClimate 🌦️

Oi! Esse é o WeatherClimate, meu projeto de clima feito com React + Vite. Aqui você consegue ver o tempo da sua cidade (automaticamente pelo IP) e também de várias capitais do mundo, tudo com um visual mais minimalista, responsivo e com tema escuro/claro pra combinar com o seu gosto.

## O que tem de legal?

- Mostra o clima, temperatura e umidade da sua cidade
- Traz o clima de várias capitais, cada uma com a hora local certinha
- O relógio e as horas das cidades se atualizam sozinhos
- Dá pra trocar o tema (escuro/claro) só clicando no botão
- Funciona bem tanto no PC quanto no celular
- Os ícones mudam conforme o clima, direto da OpenWeatherMap

## Tecnologias que usei

# WeatherClimate 🌦️

WeatherClimate é um projeto pessoal feito com React + Vite para mostrar o clima atual da sua cidade (detectado automaticamente pelo IP) e de várias capitais do mundo. O app tem visual moderno, responsivo e permite alternar entre tema escuro e claro.

## Principais funcionalidades

- Exibe clima, temperatura e umidade da sua localização
- Mostra o clima de capitais mundiais, cada uma com a hora local
- Relógio e horários das cidades atualizam automaticamente
- Botão para alternar entre tema escuro e claro
- Layout adaptado para desktop e mobile
- Ícones dinâmicos de clima via OpenWeatherMap

## Tecnologias utilizadas

- React + Vite
- Material UI
- Axios
- OpenWeatherMap API

## Como executar o projeto

1. Instale as dependências:
	```bash
	npm install
	```
2. Crie um arquivo `.env` na raiz com sua chave da OpenWeatherMap:
	```env
	VITE_API_KEY=sua_api_key_aqui
	```
3. Inicie o servidor de desenvolvimento:
	```bash
	npm run dev
	```

## Estrutura

- `src/App.jsx`: Componente principal e lógica do app
- `src/components/components.jsx`: Componente customizado de texto
- `public/`: Ícones e arquivos estáticos

---

Projeto desenvolvido por Valenart. Se tiver dúvidas ou sugestões, fique à vontade para entrar em contato!
