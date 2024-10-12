
const express = require('express');
const route = express.Router();
require('dotenv').config();
const axios = require('axios');
const moment = require('moment');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

route.get('/totalSpent', async (req, res) => {
    const { userId } = req.query;
    const response = await axios.get(`${JSON_SERVER_URL}/orders?userId=${userId}`);
    if( response.data.length === 0){
        return res.json();
    }

    const orders = response.data;
    const now = moment()
    const currentMonth = now.month();
    const lastMonth = now.month() - 1;
    

    const currentMonthOrders = orders.filter(it => moment(it.date).month() === currentMonth);
    const lastMonthOrders = orders.filter(it => moment(it.date).month() === lastMonth);

    let totalSpentCurrentMonth = [0,0,0,0];
    let totalSpentLastMonth = [0,0,0,0];

    for(const order of currentMonthOrders){
        const numberOfWeek = getWeekOfMonth(order.date);
        totalSpentCurrentMonth[numberOfWeek-1] += order.total;
    }

    for(const order of lastMonthOrders){
        const numberOfWeek = getWeekOfMonth(order.date);
        totalSpentLastMonth[numberOfWeek-1] += order.total;
    }
    
    totalSpentCurrentMonth = totalSpentCurrentMonth.map((val) => Math.round(val * 100)/100);
    totalSpentLastMonth = totalSpentLastMonth.map((val) => Math.round(val * 100)/100);

    return res.json({
        'mesAnterior': totalSpentLastMonth,
        'mesActual': totalSpentCurrentMonth
    });
});

route.get('/carts', async (req, res) => {
    const { userId } = req.query;
    try{
        const response = await axios.get(`${JSON_SERVER_URL}/carts/${userId}`);
        return res.json(response.data.items);
    }catch(ex){
        return res.json([]);
    }
});

route.post('/carts', async (req, res) => {
    const { userId, items } = req.body;
    let dateCreated = moment();
    let exists = false;
    try{
        const response = await axios.get(`${JSON_SERVER_URL}/carts/${userId}`);
        dateCreated = response.data.dateCreated;
        exists = true;
    }catch(ex){
        
    }
    const cart = {
        id: userId,
        items,
        dateCreated,
        dateUpdated: moment()
    }
    let saveCart;
    if(exists){
        saveCart = await axios.put(`${JSON_SERVER_URL}/carts/${userId}`, cart);
    }else{
        saveCart = await axios.post(`${JSON_SERVER_URL}/carts`, cart);
    }
    if(saveCart.data.length === 0){
        return res.json([]);
    }

    return res.json(saveCart.data.items);
});

function getWeekOfMonth(date) {
    // Get the start of the month for the given date
    const startOfMonth = moment(date).startOf('month');
    
    // Calculate the difference in days between the given date and the start of the month
    const dayOfMonth = moment(date).date();
    
    // Find the week number by dividing the difference by 7 and rounding up
    let weekOfMonth = Math.ceil(dayOfMonth / 7);

    if(weekOfMonth > 4){
        weekOfMonth = 4;
    }
  
    return weekOfMonth;
}

module.exports = route;