/*
http://localhost:3001/cities/search?q=query - города, начинающиеся с query
http://localhost:3001/cities/:id - поиск города по id
*/

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // <- здесь db.json
const middlewares = jsonServer.defaults();
const axios = require("axios");

const cities = router.db.get('cities'); // ключ "cities" в db.json

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Поиск до 5 городов по началу строки
server.get('/cities/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  if (!query) {
      return res.json([]);
  }

  const results = cities
    .filter(c => c.name.toLowerCase().startsWith(query))
    .take(5)
    .value();

  res.json(results);
});


// Получение города по ID
server.get('/cities/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const city = cities.find({ id }).value();
  if (city) {
      res.json(city);
  } else {
      res.status(404).json({ error: 'City not found' });
  }
});


// Прокси для OpenWeather
server.get('/weather', async (req, res) => {
  const { lat, lon, units } = req.query;

  if (!lat || !lon || !units) {
    return res.status(400).json({ error: 'Missing lat, lon, or units' });
  }

  try {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat,
        lon,
        units,
        appid: '502ed7b71e362589b25ec875ff353bb2',
        lang: 'ru',
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error("Ошибка при запросе к OpenWeather:", err);
    res.status(500).json({ error: 'Ошибка при получении погоды' });
  }
});

server.get('/forecast', async (req, res) => {
  const { lat, lon, units } = req.query;

  if (!lat || !lon || !units) {
    return res.status(400).json({ error: 'Missing lat, lon, or units' });
  }

  try {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        lat,
        lon,
        units,
        appid: '502ed7b71e362589b25ec875ff353bb2',
        lang: 'ru',
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error("Ошибка при запросе к OpenWeather:", err);
    res.status(500).json({ error: 'Ошибка при получении погоды' });
  }
});

// Все остальные маршруты по умолчанию
server.use(router);

server.listen(3001, () => {
  console.log('Mock API running at http://localhost:3001');
});