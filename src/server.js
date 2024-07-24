// src/server.js

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

const API_URL = process.env.API_URL;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Endpoint to fetch jobs
app.get('/jobs', async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Add a simple root route to avoid "Cannot GET /" message
app.get('/', (req, res) => {
  res.send('Neish People Backend is running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
