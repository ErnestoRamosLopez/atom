const express = require('express');
const route = express.Router();
const axios = require('axios');
const moment = require('moment');
const { fetchUserByEmail } = require('../../utils/user.utils');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

route.get('', async (req, res) => {
    const { userId } = req.query;
    try{
        const response = await axios.get(`${JSON_SERVER_URL}/carts/${userId}`);
        return res.json(response.data.items);
    }catch(ex){
        return res.json([]);
    }
});

route.post('', async (req, res) => {
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
        if( items && items.length === 0){
            saveCart = await axios.delete(`${JSON_SERVER_URL}/carts/${userId}`);
        }else{
            saveCart = await axios.put(`${JSON_SERVER_URL}/carts/${userId}`, cart);
        }
    }else{
        saveCart = await axios.post(`${JSON_SERVER_URL}/carts`, cart);
    }
    if(saveCart.data.length === 0){
        return res.json([]);
    }

    return res.json(saveCart.data.items);
});

route.put('', async (req, res) => {
    const {email} = req.token;
    const user = await fetchUserByEmail(email, axios);
    if(user === null){
        return res.status(401).json({
            message: 'Error'
        });
    }
    let items = [];
    let dateCreated = '';
    //obtiene carrito de db
    try{
        const response = await axios.get(`${JSON_SERVER_URL}/carts/${user.id}`);
        items = response.data.items;
        dateCreated = response.data.dateCreated;
        if( !items.length){
            return res.status(401).json({
                message: 'Error'
            });
        }
    }catch(ex){
        return res.status(401).json({
            message: 'Error'
        });
    }
    let productsId = items.map(it => it.id);
    let products = [];
    //obtiene productos para checar precios
    try{
        const queryParams = productsId.reduce((acc, value, index) => `${acc}${(index !== 0 ? '&' : '')}id=${value}`, '');
        const response = await axios.get(`${JSON_SERVER_URL}/products?${queryParams}`);

        products = response.data;
    }catch{
        return res.status(403).json({
            message: 'Error'
        });
    }
    let hasChanged = false;
    const responseCartItems = [...items];
    for(const product of products){
        const cartItem = responseCartItems.find(it => it.id === product.id);
        if( product.price !== cartItem.price){
            hasChanged = true;
            cartItem.price = product.price;
        }
    }

    //actualiza carrito
    try{
        if( hasChanged ){
            const cart = {
                id: user.id,
                items: responseCartItems,
                dateCreated,
                dateUpdated: moment()
            }
            await axios.put(`${JSON_SERVER_URL}/carts/${user.id}`, cart);
        }
    }catch{
        return res.status(403).json({
            message: 'Error'
        });
    }
    
    return res.json({
        hasChanged,
        ...(hasChanged ? { items: responseCartItems} : {})
    });
});

module.exports = route;