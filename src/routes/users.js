const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');



router.get('/signin', (req, res) => {

    res.render('signin', {title: "Iniciar sesión"});

});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}));


// Register.

router.get('/signup', (req, res) => {

    res.render('signup', {title: "Registrarse", error: ''});


});

router.post('/signup', async (req, res) =>{

    const {name, username, password, passwordConfirm } = req.body;

    if(passwordConfirm != password){
    
        res.render('signup', {title: "Registrarse", error: '¡Las contraseñas no coinciden!'});

    }
    else{

        const userName = await User.findOne({username: username});

        if(userName){

            res.render('signup', {title: "Registrarse", error: '¡El nombre de usuario está en uso!'});
        
        }
        else{

            const newUser = new User({name, username, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
    
            res.render('signup', {title: "Registrarse", error: '¡Registro realizado!'});

        }

    }
    
});

// Logout.

router.get('/logout', isAuthenticated, (req, res) =>{

    req.logout(function(err){

        if(err){
            return next(err);
        }

        res.redirect('/signin');
    
    });

});



module.exports = router;