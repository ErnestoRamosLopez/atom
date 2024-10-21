const express = require('express');
const route = express.Router();
require('dotenv').config();
const axios = require('axios');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

route.get('/', async (req, res) => {
    const response = await axios.get(`${JSON_SERVER_URL}/shippingCarriers`);
    res.json(response.data);
});

module.exports = route;