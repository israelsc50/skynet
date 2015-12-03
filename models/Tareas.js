var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TareasSchema = new mongoose.Schema({

	nombre: String,
	descripcion: String,
	prioridad: Number, //No borrar todavia
	account_id:{
		type: Schema.ObjectId,
		ref: 'accounts'
	},
	tipo: { type: Number, default: 0 }, //PLANIFICADA, MEJORA, CORRECCIÓN 
	created: { type: Date, default: Date.now },
	fecha_termino: { type: Date, default: Date.now },
	fecha_entrega : { type: Date, default: Date.now },
	status: { type: Number, default: 0 }, //En Espera, En Proceso, En Pausa, Terminada, Cancelada


});

var Tareas = mongoose.model('Tareas', TareasSchema);
module.exports = Tareas;