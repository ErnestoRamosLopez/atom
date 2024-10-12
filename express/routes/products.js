const express = require('express');
const route = express.Router();
require('dotenv').config();
const axios = require('axios');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

route.get('/', async (req, res) => {
    const {_page, _perPage, price_gte, price_lte, name_like} = req.query;

    let url = `${JSON_SERVER_URL}/products?_page=${_page}&_perPage=${_perPage}`;
    if(price_gte){
        url += `&price_gte=${price_gte}`;
    }
    if(price_lte){
        url += `&price_lte=${price_lte}`;
    }
    if(name_like){
        url += `&name_like=${name_like}`;
    }
    const response = await axios.get(url);

    const totalCount = response.headers["x-total-count"];
    res.header('x-total-count', totalCount).json(response.data);
});

module.exports = route;