const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.get('/api/pickup', async (req, res) => {
  try {
    const response = await axios.get('https://vinuxd.vercel.app/api/pickup');
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying request:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});