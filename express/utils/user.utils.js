const axios = require('axios');

const JSON_SERVER_URL = process.env.REACT_APP_DB_BASE_URL;

async function fetchUserByEmailValidate(email){
    try{
        const user = await fetchUserByEmail(email);
        if(!user){
            return null;
        }
        return user;
    }catch(ex){
        return null;
    }
}

async function fetchUserByEmail(email){
    try{
        const user = await axios.get(`${JSON_SERVER_URL}/users?email=${email}`);
        return user.data[0];
    }catch(ex){
        return null;
    }
}

async function isUserRegistered(email) {
    const user = await fetchUserByEmail(email);

    return !!user;
}

module.exports = {
    fetchUserByEmail,
    isUserRegistered,
    fetchUserByEmailValidate
}