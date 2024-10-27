const express = require('express');
const route = express.Router();
require('dotenv').config();
const axios = require('axios');
const moment = require('moment');
const { fetchUserByEmailValidate } = require('../utils/user.utils');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

route.get('/myOrders', async (req, res) =>{
    const {orderId} = req.query;
    const {email} = req.token;
    let orders = [];
    let responseOrders = [];
    
    const user = await fetchUserByEmailValidate(email);
    if(user === null){
        return res.status(403).json({
            message: 'Error'
        });
    }

    try{
        const response = await axios.get(`${JSON_SERVER_URL}/orders?userId=${user.id}${orderId ? `&id=${orderId}` : ''}`);
        orders = response.data;
        responseOrders = [...orders];
    }catch{
        return res.status(404).json([]);
    }
    
    let productsIds = new Set([]);
    for(const order of orders){
        try{
            const response = await axios.get(`${JSON_SERVER_URL}/orderDetails?orderId=${order.id}`);
            productsIds = new Set([...productsIds,  ...response.data.map(it => it.productId) ]);
            responseOrders = responseOrders.map(it => it.id === order.id ? {
                ...it,
                items: response.data
            } : it);
        }catch(ex){
            return res.status(404).json([]);
        }
    }

    try{
        let query = "?";
        query += [...productsIds].reduce((acc, value, index) => `${acc}${index === 0 ? '' : '&'}id=${value}`, '');

        const { data: responseProducts } = await axios.get(`${JSON_SERVER_URL}/products${query}`);
        
        for(const order of responseOrders){
            let items = order.items;
            for(const product of responseProducts){
                items = items.map(it => it.productId === product.id ? {
                    ...product,
                    ...it
                } : it);
            }
            responseOrders = responseOrders.map(it  => it.id === order.id ? {
                ...it,
                items: items
            } : it);
        }
    }catch(ex){
        return res.status(404).json([]);
    }

    return res.json([
        ...responseOrders
    ]);
});

route.post('/', async (req, res) =>{
    const {email} = req.token;
    const { 
        shippingInformation: {
            name,
            lastname,
            street,
            streetNumber,
            postalCode,
            neighborhood,
            city,
            state,
            shipmentId,
            shipmentPrice
        }, 
        total, 
        paymentInformation: {
            cardNumber,
            ...paymentInformation
        },
        discounts
    } = req.body;
    const user = await fetchUserByEmailValidate(email);
    if(user === null){
        return res.status(403).json({
            message: 'Error'
        });
    }
    let items = [];
    try{
        const userCart = await axios.get(`${JSON_SERVER_URL}/carts/${user.id}`);
        items = userCart.data.items;
        if( !items.length){
            return res.status(403).json({
                message: 'Error'
            });
        }
    }catch{
        return res.status(403).json({
            message: 'Error'
        });
    }

    let usefulDiscount = discounts.map(it => it.id);

    const newOrder = {
        userId: user.id,
        createdAt: moment(),
        status: 'Creado',
        name,
        lastname,
        street,
        streetNumber,
        postalCode,
        neighborhood,
        city,
        state,
        shipmentId,
        shipmentCost: shipmentPrice,
        total,
        cardNumber,
        discounts: usefulDiscount
    }

    //guarda la orden
    let order = null;
    try{
        const response = await axios.post(`${JSON_SERVER_URL}/orders`, newOrder);
        order = response.data;
        if(!response.data){
            return res.status(403).json({
                message: 'Error'
            });
        }
    }catch{
        return res.status(403).json({
            message: 'Error'
        });
    }

    //guarda los detalles de la orden
    for(const item of items){
        try{
            const orderDetails = {
                orderId: order.id,
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            }
            const response = await axios.post(`${JSON_SERVER_URL}/orderDetails`, orderDetails);
            if(!response.data){
                return res.status(403).json({
                    message: 'Error'
                });
            }
        }catch{
            return res.status(403).json({
                message: 'Error'
            });
        }
    }

    //borra el carrito
    try{
        await axios.delete(`${JSON_SERVER_URL}/carts/${user.id}`);
    }catch{
        return res.status(403).json({
            message: 'Error'
        });
    }

    return res.status(201).json({
        ...order
    });
});

module.exports = route;