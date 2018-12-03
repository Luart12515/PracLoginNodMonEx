const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//serializacion de datos  ||recibe un usuario y un colbac **   
// se guarda el idea que sirve como identificador para las paginas
//cada vez que el usuario cambia de pagina es  
passport.serializeUser((user, done)=>{ //guarda el usuario para las diversas paginas que quiera entrar
    done(null, user.id);
});

//resive el ID para comprobar el usuario
passport.deserializeUser(async (id, done) => { //ASYNC es requerido cada ves que usamos el await
    // AWAIT es para datos asincrono 
    const user = await User.findById(id); //consulta a la base de datos
    done(null, user);
});


passport.use('contrasenaLocal', new localStrategy({ //objeto de congifuracion || DATOS desde el cliente   
        usernameField: 'email', //atravez de que datos se va a autentificar el usuario usando el FORMULARIO 
        passwordField: 'password',
        passReqToCallback:true //habilita la seccion inferior, permitiendo guardar los datos 
    }, async (req, email, password, done) =>{ //Funcion || que es lo que vamos hacer con esos datos 
        //REQ: nos perdite recibir mas datos y guardarlos 
        //DONE: permite devolverle al cliente, algunos datos
        

        {/* SISTEMA DE VALIDACION DE CORREO A TRAVEZ DEL CORREO   */}
        const userRegistrado= User.findOne({email: email}); 
        if(userRegistrado){
            //1Val= no a ocurrido un error || 2°= no te vamos a devolver un usuario || 3° vamos a enviar un mensaje a travez del modulo flash   
            //3°= nombre de la variable (MENSAJE) || Mensaje a mostrar.
            return done (null, false, req.flash('errorCuentaTomada',' El correo electronico ya fue elegido por alguien mas trate con otro '));
        } else{
            {/* CREACION DE NUEVOS USUARIOS */}       
            const newUser = new User();  //designacion de los valores 
            newUser.email = email;
            newUser.password = newUser.passwordsecreto(password);
            await newUser.save(); //metod asincrono || AWAIT guarda los valores 
            done(null, newUser); // **
        }

         
    }
));