const express = require('express');
const route = express.Router();
require('dotenv').config();
const axios = require('axios');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

route.get('/', async (req, res) => {
    const {_page, _perPage} = req.query;

    const response = await axios.get(`${JSON_SERVER_URL}/products?_page=${_page}&_perPage=${_perPage}`);

    const totalCount = response.headers["x-total-count"];
    res.header('x-total-count', totalCount).json(response.data);
});

module.exports = route;