const express = require('express');
const route = express.Router();
const axios = require('axios');
const moment = require('moment');
const { fetchUserByEmailValidate } = require('../../utils/user.utils');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

route.get('', async (req, res) => {
    const {email} = req.token;
    const user = await fetchUserByEmailValidate(email);
    if( user === null){
        return res.status(403).json({
            message: 'Error'
        });
    }
    
    try{
        const response = await axios.get(`${JSON_SERVER_URL}/wishlist/${user.id}`);
        const productsId = response.data.items;
        if( productsId.length === 0){
            return res.json(productsId);
        }
        let query = productsId.reduce((acc, value, index) => `${acc}${index === 0 ? '' : '&'}id=${value}`, '');
        const responseProducts = await axios.get(`${JSON_SERVER_URL}/products?${query}`);
        const productList = responseProducts.data;
        return res.json(productList);
    }catch(ex){
        return res.json([]);
    }
});

route.post('', async (req, res) => {
    const { productsId } = req.body;
    const {email} = req.token;
    const user = await fetchUserByEmailValidate(email);
    if( user === null){
        return res.status(403).json({
            message: 'Error'
        });
    }

    let dateCreated = moment();
    let exists = false;
    try{
        const response = await axios.get(`${JSON_SERVER_URL}/wishlist/${user.id}`);
        dateCreated = response.data.dateCreated;
        exists = true;
    }catch(ex){
        
    }
    const wishlist = {
        id: user.id,
        items: productsId,
        dateCreated,
        dateUpdated: moment()
    }
    let saveWishlist;
    if(exists){
        if( productsId && productsId.length === 0){
            saveWishlist = await axios.delete(`${JSON_SERVER_URL}/wishlist/${user.id}`);
        }else{
            saveWishlist = await axios.put(`${JSON_SERVER_URL}/wishlist/${user.id}`, wishlist);
        }
    }else{
        saveWishlist = await axios.post(`${JSON_SERVER_URL}/wishlist`, wishlist);
    }
    if(saveWishlist.data.length === 0){
        return res.json([]);
    }

    return res.json(wishlist.items);
});

module.exports = route;