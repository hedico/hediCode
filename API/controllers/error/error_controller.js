'use strict'
const colors = require('colors');

module.exports = {
    errorLogger: function(err, req, res, next){
        console.log(`\n${err.message.red}\n`);
        next(err);
    },
    errorHandler: function(err, req, res, next){
        if(err.name == "NoEntriesError"){
            return res.status(200).send({message: err.message, ack: false});
        }else if(err.name = "NoData"){
            return res.status(200).send({message: err.message, ack: false});
        }else{
            return res.status(500).send({message: err.message, ack: false});
        }
    }
}