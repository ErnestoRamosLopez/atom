

const express = require('express');
const route = express.Router();
require('dotenv').config();
const axios = require('axios');
const moment = require('moment');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

route.get('/earnings', async (req, res) => {
    const { month, year } = req.query;
    const response = await axios.get(`${JSON_SERVER_URL}/orders`);
    if( response.data.length === 0){
        return res.json();
    }

    const yearSearch = year !== undefined ? Number(year) : moment().year();
    const monthSearch = month === undefined || month === '' ? undefined : Number(month)-1;
    

    const filteredOrders = response.data
        .filter(it => moment(it.date).year() === yearSearch)
        .filter(it => monthSearch === undefined || moment(it.date).month() === monthSearch );

    
    let monthlyEarnings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    
    for(const order of filteredOrders){
        const monthNumber = moment(order.date).month();
        monthlyEarnings[monthNumber] += order.total;
    }

    monthlyEarnings = monthlyEarnings.map((val) => Math.round(val * 100)/100);

    return res.json(monthlyEarnings);
});

module.exports = route;