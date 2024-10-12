const express = require('express');
const route = express.Router();
require('dotenv').config();
const axios = require('axios');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const response = await axios.get(`${JSON_SERVER_URL}/users?email=${email}`);
    if( response.data.length === 0){
        return res.status(403).json({
            message: 'Usuario o contraseña incorrecto'
        });
    }

    const {password: userPassword, ...user} = response.data[0];
    if(userPassword === password){
        return res.json(user);
    }else{
        return res.status(403).json({
            message: 'Usuario o contraseña incorrecto'
        });
    }
});

route.post('/register', async (req, res) =>{
    const user = req.body;
    if( !validateNewUser(user) ){
        return res.status(401).json({
            message: 'Formato invalido'
        });
    }

    const emailExists = await axios.get(`${JSON_SERVER_URL}/users?email=${user.email}`);
    if(emailExists.data.length){
        return res.status(401).json({
            message: 'Ya existe un usuario con ese email'
        });
    }

    const response = await axios.post(`${JSON_SERVER_URL}/users`, user);
    if( response.data.length === 0){
        return res.status(500).json({
            message: 'Ocurrio un error inesperado'
        });
    }else{
        const {password, ...user} = response.data;
        return res.json(user);
    }
});

function validateNewUser(user){
    return (
        user.name.trim().length >= 3 && 
        user.lastname.trim().length >= 3 && 
        user.email.trim().length >= 3 && 
        user.password.length >= 8
    );
}

module.exports = route;