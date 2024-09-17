
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