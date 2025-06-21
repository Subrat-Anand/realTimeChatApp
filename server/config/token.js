const jwt = require('jsonwebtoken');

const getToken = async (userId)=>{
    try{
        const token = await jwt.sign({userId}, process.env.SECRET_KEY);
        return token
    }catch(err){
        console.error(err)
    }
}

module.exports = getToken;