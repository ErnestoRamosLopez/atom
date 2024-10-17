const express = require('express');
const route = express.Router();
require('dotenv').config();
const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

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
    if(userPassword !== '' && userPassword === password){
        return res.json(user);
    }else{
        return res.status(403).json({
            message: 'Usuario o contraseña incorrecto'
        });
    }
});

route.post('/register', async (req, res) =>{
    const id_token = req.cookies.temp_access_token;
    const user = req.body;
    if( !validateNewUser(user, id_token) ){
        return res.status(401).json({
            message: 'Formato invalido'
        });
    }

    if(await isUserRegistered(user.email)){
        return res.status(401).json({
            message: 'Ya existe un usuario con ese email'
        });
    }

    try{
        if(id_token){
            await verifyToken(id_token);
        }
    }catch{
        return res.status(403).clearCookie('temp_access_token').json({
            message: 'Error acceso no autorizado'
        });
    }

    const response = await axios.post(`${JSON_SERVER_URL}/users`, user);
    if( response.data.length === 0){
        return res.status(500).json({
            message: 'Ocurrio un error inesperado'
        });
    }else{
        const {password, ...user} = response.data;
        return res.clearCookie('temp_access_token').cookie('access_token', id_token).json(user);
    }
});

route.post('/loginValidateToken', async (req, res) =>{
    const {id_token} = req.body;
    if( !id_token  ){
        return res.status(401).json({
            message: 'Formato invalido'
        });
    }
    try{
        let response = await verifyToken(id_token);
        let name = response.given_name;
        let lastname = response.family_name;
        let email = response.email;
        let userData = {
            ...(name !== undefined          ? { name } : {}),
            ...(lastname !== undefined      ? { lastname } : {}),
            ...(email !== undefined         ? { email } : {}),
        }

        let hasAccount = !!email && await isUserRegistered(email);
        
        let completedRegistration = !!name && !!lastname && !!email;
        let isSecure = process.env.NODE_ENV === 'production';
        let cookieName = hasAccount || completedRegistration ? 'access_token' : 'temp_access_token';

        if(!hasAccount && completedRegistration){
            const newUser = await registerUserWithoutPassword(userData);
            userData = {...userData, id: newUser.id};
        }
        if( hasAccount ){
            const user = await getUserByEmail(email);
            
            userData = {...userData, id: user.id};
        }
        
        return res.status(200).cookie(cookieName, id_token, {httpOnly: true, secure: isSecure}).json({
            userData,
            completedRegistration
        });
    }catch(e){
        return res.status(501).json({
            message: 'Ha ocurrido un error, intentelo mas tarde',
            error: e.message
        });
    }
});

route.post('/logout', async (req, res) =>{
    const id_token = req.cookies.access_token;
    if( !id_token  ){
        return res.status(403).json({
            message: 'Formato invalido'
        });
    }
    return res.status(200).clearCookie('access_token').clearCookie('temp_access_token').json({});
});

function validateNewUser(user, id_token){
    return (
        user.name.trim().length >= 3 && 
        user.lastname.trim().length >= 3 && 
        user.email.trim().length >= 3 && 
        ( !!id_token || user.password.length >= 8)
    );
}

async function verifyToken(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    return payload;
}

async function isUserRegistered(email) {
    const emailExists = await axios.get(`${JSON_SERVER_URL}/users?email=${email}`);
    return emailExists.data.length;
}

async function getUserByEmail(email) {
    try{
        const user = await axios.get(`${JSON_SERVER_URL}/users?email=${email}`);
        return user.data[0];
    }catch{
        return null;
    }
}

async function registerUserWithoutPassword(data) {
    const response = await axios.post(`${JSON_SERVER_URL}/users`, data);
    if( response.data.length === 0){
        throw new Error('Ocurrio un error inesperado');
    }
    return response.data;
}

module.exports = route;