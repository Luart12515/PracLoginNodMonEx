const express = require('express');
const router= express.Router();
const passport = require('passport');

router.get('/', (req, res, next)=>{
    res.render('index');
});

router.get('/alta', (req, res, next)=>{
    res.render('signup')
}); 

router.post('/alta', passport.authenticate('contrasenaLocal',{ //Lo de CONTRASENALOCAL lo extras directamente passport/local-auth
    successRedirect: '/perfil',
    failureRedirect: '/alta',
    passReqToCallback: true //internamente se envian los datos del cliente desde el Req
})); 

/*
router.post('/alta', (req, res, next)=>{
    console.log(req.body); //guadamos los datos del cliente a traves de la variable REQ.BODY
    res.send('recivido');
    //res.render(pruebas);
});
*/
router.get('/signin', (req, res, next)=>{
    
});
router.post('/signin', (req, res, next)=>{
    
});

router.get('/perfil',(req, res, next)=>{
    res.render('start'); //vista visible cuando estas logueado 
});

module.exports =router;