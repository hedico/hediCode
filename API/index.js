'use strict'

const app = require('./app');
const mongoose = require('mongoose');
const gConfig = require('./config/global_config');
const apiUrl = gConfig.APIURL;
const port = gConfig.PORT;
const mongoUrl = gConfig.MONGOURL;

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`\nConexión con la base de datos establecida con éxito en ${mongoUrl}`);
    app.listen(port, () => {
        console.log(`Conexión con el servidor establecida con éxito en ${apiUrl}${port}`);
    });
});