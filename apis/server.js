const express = require('express');
const axios = require('axios');
require('./db')();
const cors = require('cors');

const SharedPickupLinesModel = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());


app.get('/api/pickup', async (req, res) => {
  try {
    const response = await axios.get('https://vinuxd.vercel.app/api/pickup');
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying request:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/api/shared', async (req, res) => {
  try {
    const { sharedBy, sentTo, note, pickup } = req.body;
    const sharedPickupLine = await SharedPickupLinesModel.create({ sharedBy, sentTo, note, pickup });
    res.status(200).json(sharedPickupLine);
  } catch (error) {
    console.error('Error sharing pickup line:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/shared/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sharedPickupLine = await SharedPickupLinesModel.findById(id);
    res.json(sharedPickupLine);
  } catch (error) {
    console.error('Error fetching shared pickup line:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});