var express = require('express');
var passport = require('passport'); //Auth Silva
var Account = require('../models/account'); //Auth Silva
var Tarea = require('../models/Tareas');
var Menu = require('../models/menus');
var Proyecto = require('../models/proyectos');
var _ = require('lodash'); //Utileria adicional
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //console.info(req.user);
    res.render('tareas/index', { user : req.user });
});

router.get('/usuarios', function(req, res, next) {
    Account.find(function(err, usuarios){
        if(err){return next(err)}
        
        res.json(usuarios)
    })
});



//GET - Listar tareas
router.get('/tareas', function(req, res, next){
    Tarea.find(function(err, tareas){
        if(err){return next(err)}
        res.json(tareas)
    })
})

//GET - Listar tareas
router.get('/proyectos', function(req, res, next){
    Proyecto.find(function(err, proyectos){
        if(err){return next(err)}
            console.info(proyectos);
        res.json(proyectos)
    })
})

//GET- Obtenemos todas las tareas de un Usuario
router.get('/misTareas', function(req, res, next){
    Tarea.find({account_id: req.user }, function(err, tareas){
        if(err){return next(err)}
        //console.info(tareas);
        res.json(tareas)
    });
})

//GET- Obtenemos todas las tareas EN ESPERA
router.get('/tareasEnEspera', function(req, res, next){
    Tarea.find({status: 0 }, function(err, tareas){
        if(err){return next(err)}
        
        res.json(tareas)
    });
})

//GET- Obtenemos todas las tareas En Proceso
router.get('/tareasEnProceso', function(req, res, next){
    Tarea.find({status: 1 }, function(err, tareas){
        if(err){return next(err)}
        //console.info(tareas);
        res.json(tareas)
    });
})

//GET- Obtenemos todas las tareas En Pausa
router.get('/tareasEnPausa', function(req, res, next){
    Tarea.find({status: 2 }, function(err, tareas){
        if(err){return next(err)}
        //console.info(tareas);
        res.json(tareas)
    });
})

//GET- Obtenemos todas las tareas Terminadas
router.get('/tareasTerminadas', function(req, res, next){
    Tarea.find({status: 3 }, function(err, tareas){
        if(err){return next(err)}
        //console.info(tareas);
        res.json(tareas)
    });
})

//GET- Obtenemos todas las tareas Canceladas
router.get('/tareasCanceladas', function(req, res, next){
    Tarea.find({status: 4 }, function(err, tareas){
        if(err){return next(err)}
        //console.info(tareas);
        res.json(tareas)
    });
})

//GET- Obtenemos todos menus de la base de datos
router.get('/getAllMenus', function(req, res, next){

    Menu.find({}, function(err, menus){
        if(err){return next(err)}
        //console.info(menus);
        res.json(menus)
    });
    
})

//POST - Agregar tarea
router.post('/tarea', function(req, res, next){
    //FALTA VALIDACIÒN PARA SABER SI VERDADERAMENTE ESTA EL USUARIO LOGEADO.
    req_save = _.assign(req.body, {account_id: req.user._id}); //Fusionamos 2 objetos
    var tarea = new Tarea(req_save); //Tambien puede poner ¡¡req.body!!
    tarea.save(function(err, tarea){
         if(err){return next(err)}
            res.json(tarea);
    })
})


//PUT - Actualizar tarea
router.put('/tarea/:id', function(req, res){
    Tarea.findById(req.params.id, function(err, tarea){
        
         tarea.nombre = req.body.nombre;
         tarea.descripcion = req.body.descripcion;
         tarea.fecha_termino = req.body.fecha_termino;
         tarea.fecha_entrega = req.body.fecha_entrega;
         tarea.status = req.body.status;
         tarea.prioridad = req.body.prioridad;

        tarea.users = req.body.users;
        console.info(tarea.users);
        tarea.save(function(err){
            if(err){res.send(err)}
            
            res.json(tarea);
        })
    })
})


//DELETE - Eliminar Tarea
router.delete('/tarea/:id', function(req, res){
    Tarea.findByIdAndRemove(req.params.id, function(err){
        if(err){res.send(err)}
            res.json({message: 'La tarea se ha eliminado'});
    })
})


module.exports = router;
