var express = require('express');
var Menu = require('../models/menus');
var AccountUser = require('../models/account_user');
var passport = require('passport'); //Auth Silva
var Account = require('../models/account'); //Auth Silva
var _ = require('lodash'); //Utileria adicional
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//res.render('index', { user : req.user });

    Menu.find({account_id: req.user }, function(err, menus){
        res.render('index', {menus: menus, user : req.user});
    });
  // res.render('index', { title: 'Express' });
});


router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.post('/account_user', function(req, res){
    req_save = _.assign(req.body, {account_id: req.user._id}); 
    var UserData = new AccountUser(req_save); //Tambien puede poner ¡¡req.body!!

    UserData.save(function(err, data){
         if(err){return next(err)}
            res.redirect('/tareas#/dashboard');
    })
    
})

//BORRAR VERIFICAR PORQUE PROBABLEMENTE YA NO FUNCIONA ESTO
router.post('/menus', function(req, res){

    var name = req.body.name;
    var menu = new Menu({name: name, account_id: req.user._id});
    //res.send(menu);
    //, account_id: req.user._id
    menu.save(function(err, menu){
      if(err){
        return res.send(err);
      }
      res.send(menu.name + 'fue guardado');

    });
    
    //res.send(menu);
});





/*exports.signin = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
        res.status(400).send(info);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function(err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
        }
    })(req, res, next);
};
*/
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//Metodos de Prueba
router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


module.exports = router;
