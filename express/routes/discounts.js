const express = require('express');
const route = express.Router();
require('dotenv').config();
const axios = require('axios');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

route.get('/checkout-promotion', async (req, res) => {
    const { name } = req.query;
    if( !name || name === ''){
        return res.status(404).json({});
    }
    
    let url = `${JSON_SERVER_URL}/discounts?isActive=true`;
    if(name){
        url += `&name=${name}`;
    }
    let discounts = [];
    try{
        const response = await axios.get(url);
        discounts = response.data;
    }catch{
        return res.status(403).json({
            message: 'Error'
        });
    }

    if( discounts.length === 0){
        return res.status(404).json({});
    }

    return res.json({
        ...discounts[0]
    });
});

module.exports = route;