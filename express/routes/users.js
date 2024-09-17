const express = require('express');
const route = express.Router();
require('dotenv').config();
const axios = require('axios');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

route.get('/', async (req, res) => {
    const response = await axios.get(`${JSON_SERVER_URL}/users`);
    res.json(response.data);
});

route.get('/:id', async (req, res) =>{
    const {id} = req.params;
    const response = await axios.get(`${JSON_SERVER_URL}/users/${id}`);
    if( response.data.length === 0){
        res.status(404).json({});
    }else{
        res.json(response.data[0]);
    }
});

module.exports = route;