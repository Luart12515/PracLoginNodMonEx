const express= require ('express');
const enegine= require('ejs-mate'); //motor de plantillas 
const path =require('path'); //union de directorios 
const morgan =require('morgan');
const passport =require('passport');
const session= require('express-session'); // npm session 
const flash = require('connect-flash'); //mensajes a travez de las multiples vistas en NODEJS

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
app.use(flash()); //mensaje de una pagina a otra 
app.use(passport.initialize()); //inicialisacion de passport
app.use(passport.session());

app.use((req, res, next)=>{
    //creamos un avariable global para hacer uso de ella en cada momento que la requerimos 
    app.locals.errorCuentaTomada = req.flash('errorCuentaTomada'); // llamamos al mensaje que se encuentra en passport/local-auth 
    next();// para que pueda continuar con los demas programas 
});


//rutas
app.use('/', require('./routes/index')); //expres usa esa ruta para hacer uso de ella 


app.listen(app.get ('port'), () =>{
    console.log('Server on port ', app.get('port'));
});