# WeatherClimate 🌦️

WeatherClimate é um projeto pessoal feito com React + Vite para mostrar o clima atual da sua cidade (detectado automaticamente pelo seu IP) e de várias capitais do mundo. O app tem visual moderno, responsivo e permite alternar entre tema escuro e claro.

## Principais funcionalidades

- Exibe clima, temperatura e umidade da sua localização (No meu caso atual, sendo a de Campinas)
- Mostra o clima de capitais mundiais, cada uma com a hora local(Com base na latitude e longitude de cada uma delas e passadas na URL)
- Relógio e horários das cidades atualizam automaticamente
- Botão para alternar entre tema escuro e claro
- Layout adaptado para desktop e mobile
- Ícones dinâmicos de clima vindos da OpenWeatherMap

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

Projeto desenvolvido por mim, Valenart. Se tiver dúvidas ou sugestões, fique à vontade para entrar em contato!
