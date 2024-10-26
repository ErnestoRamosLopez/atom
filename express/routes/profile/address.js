const express = require('express');
const route = express.Router();
const axios = require('axios');
const moment = require('moment');
const { fetchUserByEmailValidate } = require('../../utils/user.utils');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

route.get('', async (req, res) => {
    const {email} = req.token;
    
    const user = await fetchUserByEmailValidate(email);
    if(user === null){
        return res.status(403).json({
            message: 'Error'
        });
    }

    let addresses = [];
    try{
        let response = await axios.get(`${JSON_SERVER_URL}/address?userId=${user.id}`);
        addresses = response.data;
    }catch{
        return res.status(404).json({
            message: 'Error'
        });
    }
    return res.json(addresses);
});

route.post('', async (req, res) => {
    const {email} = req.token;
    
    const user = await fetchUserByEmailValidate(email);
    if(user === null){
        return res.status(403).json({
            message: 'Error'
        });
    }

    const address = req.body;
    const newAddress = {
        userId: user.id,
        ...address,
        createdAt: moment(),
        modifiedAt: moment()
    }

    let savedAddress = null;
    try{
        const response = await axios.post(`${JSON_SERVER_URL}/address`, newAddress);
        savedAddress = response.data;
    }catch{
        return res.status(403).json({
            message: 'Error'
        });
    }

    return res.json({
        ...savedAddress
    });
});

route.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {email} = req.token;
    const address = req.body;
    
    const user = await fetchUserByEmailValidate(email);
    if(user === null){
        return res.status(403).json({
            message: 'Error'
        });
    }

    let savedAddress = null;
    try{
        let response = await axios.get(`${JSON_SERVER_URL}/address?id=${id}&userId=${user.id}`);
        if( response.data.length !== 1){
            throw Error('The address must exist');
        }
        savedAddress = response.data[0];
    }catch{
        return res.status(403).json({
            message: 'Error'
        });
    }

    const allowedFields = {
        label: address.label,
        name: address.name,
        lastname: address.lastname,
        street: address.street,
        streetNumber: address.streetNumber,
        postalCode: address.postalCode,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
    }

    const editedAddress = {
        ...savedAddress,
        ...allowedFields
    }
    
    let newAddress = null;
    try{
        let response = await axios.put(`${JSON_SERVER_URL}/address/${editedAddress.id}`, editedAddress);
        newAddress = response.data;
    }catch{
        return res.status(403).json({
            message: 'Error'
        });
    }

    return res.json({
        ...newAddress
    });
});

route.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const {email} = req.token;
    
    const user = await fetchUserByEmailValidate(email);
    if(user === null){
        return res.status(403).json({
            message: 'Error'
        });
    }

    let savedAddress = null;
    try{
        let response = await axios.get(`${JSON_SERVER_URL}/address?id=${id}&userId=${user.id}`);
        if( response.data.length !== 1){
            throw Error('The address must exist');
        }
        savedAddress = response.data[0];
    }catch{
        return res.status(403).json({
            message: 'Error'
        });
    }
    
    try{
        let response = await axios.delete(`${JSON_SERVER_URL}/address/${savedAddress.id}`);
    }catch{
        return res.status(403).json({
            message: 'Error'
        });
    }

    return res.json({});
});

module.exports = route;