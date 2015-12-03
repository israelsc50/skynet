var express = require('express');
var Tarea = require('../models/Tareas');
var Proyecto = require('../models/proyectos');
var AccountUser = require('../models/account_user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send("Bienvenido a la Sección API´S");
});

router.get('/users', function(req, res, next) {
	AccountUser.find(function(err, accountusers){
        if(err){return next(err)}
        res.json(accountusers)
    })
	//res.json("Hola Users");
});

router.get('/tareas', function(req, res, next) {
	Tarea.find(function(err, tareas){
        if(err){return next(err)}
        res.json(tareas)
    })
});

router.get('/proyectos', function(req, res, next) {
	Proyecto.find(function(err, proyectos){
        if(err){return next(err)}
        res.json(proyectos)
    })
});



module.exports = router;
