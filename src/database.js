const mongoose = require('mongoose');
const {mongodb} =require('./keys');

mongoose.connect( mongodb.URI, {useNewUrlParser: true}) /*Direccion y Configuracion pero esto lo estamo llamando desde KEYS.JS */
    .then(db=> console.log('Database is connected')) //indicar que la base de datos esta conectada 
    .catch(err => console.error(err));