const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) =>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(400).json({
                message: "Token not found"
            })
        }
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = verifyToken.userId;
        next()
    }
    catch(err){
        console.status(500).json({
            message: `isAuth error ${err}`
        })
    }
}

module.exports = isAuth