var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost/tareas');

var proyectoSchema = new Schema({
	nombre : String,
	descripcion: String,
	created: { type: Date, default: Date.now },
	// account_id:{
	// 	type: Schema.ObjectId,
	// 	ref: 'accounts'
	// }
});

var Proyecto = mongoose.model('Proyecto', proyectoSchema);
module.exports = Proyecto;