'use strict'

const jwt = require('jsonwebtoken');

module.exports = {
    createToken: async function(user){
        try{
            let payload = {
                name: user.name,
                username: user.username,
                password: user.password,
                email: user.email,
                iat: Date.now()
            }
            let token = await jwt.sign(payload, process.env.SECRET);
            return token;
        }catch(e){
            throw e;
        }
    },
    decodeToken: async function(req, res, next){
        try{    
            if(!req.headers.authorization){
                let error = new Error("No existe cabecera de autorización");
                throw error;
            }
            let token = req.headers.authorization;
            
            let decoded = jwt.verify(token.split(" ")[1], process.env.SECRET);
            req.user = decoded;
            next();
        }catch(e){
            next(e);
        }
    }
}