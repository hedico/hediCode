'use strict'

const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const errorController = require('./controllers/error/error_controller');
//Importando rutas
const userRoutes = require('./routes/user/user_routes');
const categoryRoutes = require('./routes/category/category_routes');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 50000 }));

//Seguridad
//Cabeceras
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());

//Logger
app.use(morgan('common'));

//Uso de rutas
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);

//Manejo de errores
app.use(errorController.errorLogger);
app.use(errorController.errorHandler);

module.exports = app;