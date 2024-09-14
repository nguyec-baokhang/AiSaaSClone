const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler((req,res,next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err,decoded) => {
            if(err){
                console.log(err);
                res.status(400).json({message: 'User is not authorized'});
            }
            req.user = decoded.user;
            console.log(decoded);
            next();
        });
    }
    if(!token){
        return res.status(401).json({message: 'User is not authorized or the token is missing'});
    }
})

module.exports = validateToken;