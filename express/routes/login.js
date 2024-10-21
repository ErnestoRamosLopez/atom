const express = require('express');
const route = express.Router();
require('dotenv').config();
const jose = require('jose');
const { createSecretKey } = require('crypto');
const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();
const { fetchUserByEmail, isUserRegistered, fetchUserByEmailValidate } = require('../utils/user.utils');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

const isSecure = process.env.NODE_ENV === 'production';
const sameSite = process.env.NODE_ENV === 'production' ? 'none' : 'lax';

route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const savedUser = await fetchUserByEmailValidate(email);
    if( savedUser === null){
        return res.status(403).json({
            message: 'Usuario o contraseña incorrecto'
        });
    }

    const {password: userPassword, ...user} = savedUser;
    if(userPassword !== '' && userPassword === password){
        let params = { host: req.hostname, email};
        let jwt = await generateJWT(params);
        
        return res.cookie('access_token', jwt, {httpOnly: true, secure: isSecure, sameSite}).cookie('login_type', 'local', {httpOnly: true, secure: isSecure, sameSite}).json(user);
    }else{
        return res.status(403).json({
            message: 'Usuario o contraseña incorrecto'
        });
    }
});

route.post('/register', async (req, res) =>{
    const id_token = req.cookies.temp_access_token;
    const login_type = req.cookies.login_type;
    
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
        return res.status(403).clearCookie('login_type').clearCookie('temp_access_token').json({
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

        const params = { host: req.hostname, email: user.email};
        const jwtValidated = id_token ?? await generateJWT(params);
        const loginTypeValidated = login_type ?? 'local';
        return res.clearCookie('temp_access_token')
        .cookie('access_token', jwtValidated, {httpOnly: true, secure: isSecure, sameSite})
        .cookie('login_type', loginTypeValidated, {httpOnly: true, secure: isSecure, sameSite}).json(user);
    }
});

route.post('/loginValidateToken', async (req, res) =>{
    const {id_token, login_type} = req.body;
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
        let cookieName = hasAccount || completedRegistration ? 'access_token' : 'temp_access_token';

        if(!hasAccount && completedRegistration){
            const newUser = await registerUserWithoutPassword(userData);
            userData = {...userData, id: newUser.id};
        }
        if( hasAccount ){
            const user = await fetchUserByEmail(email, axios);
            
            userData = {...userData, id: user.id};
        }
        
        return res.status(200).cookie(cookieName, id_token, {httpOnly: true, secure: isSecure, sameSite})
        .cookie('login_type', login_type, {httpOnly: true, secure: isSecure, sameSite}).json({
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
    const temp_access_token = req.cookies.temp_access_token;
    if( !id_token  && !temp_access_token){
        return res.status(403).json({
            message: 'Formato invalido'
        });
    }
    return res.status(200).clearCookie('access_token').clearCookie('temp_access_token').clearCookie('login_type').json({});
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

async function registerUserWithoutPassword(data) {
    const response = await axios.post(`${JSON_SERVER_URL}/users`, data);
    if( response.data.length === 0){
        throw new Error('Ocurrio un error inesperado');
    }
    return response.data;
}

async function generateJWT(params) {
    const secretKey = createSecretKey(process.env.JWT_SECRET, 'utf-8');
    const token = await new jose.SignJWT({
        email: params.email
       }) // details to  encode in the token
       .setProtectedHeader({
        alg: 'HS256'
       }) // algorithm
       .setIssuedAt()
       .setIssuer(params.host)
       .setAudience(params.host)
       .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
       .sign(secretKey);
    return token;
}

module.exports = route;