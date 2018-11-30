const express= require ('express');
const enegine= require('ejs-mate'); //motor de plantillas 
const path =require('path'); //union de directorios 
const morgan =require('morgan');
const passport =require('passport');
const session= require('express-session'); // npm session 

//inicializacion
const app =express();
require('./database');
require('./passport/local-auth'); //es necesario para usar el ID en las dviersas rutas 


//motor de plantillas 
app.set('views', path.join(__dirname, 'views' )); // DIRNAME: Me indica en donde esta ubicado el archivo
app.engine('ejs', enegine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev')); //nos muestra las peticiones al programa 
app.use(express.urlencoded({extended:false})); //Recibe datos del cliente// formularios  no datos pesados con el false
app.use(session({ //inicialisacion de seccion 
    secret: 'codigosecreto', //texto secreto 
    resave: false, //inicamos que no se requiere una sesion previa
    saveUninitialized: false
}));

app.use(passport.initialize()); //inicialisacion de passport
app.use(passport.session());

//rutas
app.use('/', require('./routes/index')); //expres usa esa ruta para hacer uso de ella 


app.listen(app.get ('port'), () =>{
    console.log('Server on port ', app.get('port'));
});