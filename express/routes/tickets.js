const express = require('express');
const route = express.Router();
require('dotenv').config();
const axios = require('axios');
const moment = require('moment');
const { createAssessment } = require('../utils/recaptcha.utils');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;


route.post('/contact', async (req, res) => {
    const { recaptchaToken, userId, ...data} = req.body;
    let userAgent = req.headers['user-agent'];
    
    if( !recaptchaToken || userId){
        return res.status(403).json();
    }
    
    try{
        let score = await createAssessment({
            token: recaptchaToken,
            recaptchaAction: 'contact',
            userAgent
        });
        if( score === null || score < 0.5){
            throw new Error('Bot detectado');
        }
    }catch(ex){
        console.log(ex);
        
        return res.status(403).json();
    }

    let contactTicket = {
        createdAt: moment(),
        createdBy: '~Anon user~',
        type: 'Contact',
        status: 'created',
        takenBy: null,
        dateTaken: '',
        solvedBy: null,
        dateSolved: '',
        ...data,
    }
    let responseData = null;
    try{
        const response = await axios.post(`${JSON_SERVER_URL}/tickets`, contactTicket);
        responseData = response.data;
    }catch{
        return res.status(403).json();
    }
    return res.json({
        ...responseData
    });
});

module.exports = route;