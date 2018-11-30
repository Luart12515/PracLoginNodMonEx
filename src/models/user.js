//Creacion de un esquema ORM = una forma de abstracion de datos. basicamente no sabemos que datos vamos a recibir pero aun asi los procesamos 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs'); //encriptacion de caracteres °°
const {Schema} = mongoose;

const userSchema = new Schema({ //DEFINICION de tipos de datos 
    email: String,
    password: String    //°°°
});

//metodos sifrados 
userSchema.methods.passwordsecreto =(password) =>{ //cuando recibe la contraseña se envia al modulo °°
    // el hashSync ( recibe la contraseña y indicamos la cantidad de veces que la queremos encriptar con eso se hace mas robusta 
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//compara el sifrado de las contraseñas 
userSchema.methods.validacionpassword = function(password){
    //compara de manera asincrona 
    //compara la conraseña que coloco el usuario y el que tenemos en la DB °°°
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('usuarios',userSchema); //el metodo MODEL es el encagado de usar el esquema 
// 1° Guarda los datos en una coleccionde de DB
// uso del esquema  