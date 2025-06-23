require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

app.use(cors());

app.get('/api/top-headlines', async (req, res) => {
  try {
    const { country = 'us', category, q } = req.query;
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${NEWSAPI_KEY}&country=${country}`;
    if (category) url += `&category=${category}`;
    if (q) url += `&q=${encodeURIComponent(q)}`;
    const apiRes = await fetch(url);
    const data = await apiRes.json();

    if (apiRes.status !== 200) {
      return res.status(apiRes.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

app.get('/api/sources', async (req, res) => {
  try {
    let url = `https://newsapi.org/v2/sources?apiKey=${NEWSAPI_KEY}`;
    const { language = 'en', country = 'us', category } = req.query;
    if (language) url += `&language=${language}`;
    if (country) url += `&country=${country}`;
    if (category) url += `&category=${category}`;
    const apiRes = await fetch(url);
    const data = await apiRes.json();

    if (apiRes.status !== 200) {
      return res.status(apiRes.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend proxy running on http://localhost:${PORT}`));