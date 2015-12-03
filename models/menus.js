var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost/tareas');

var menuSchema = new Schema({
	nombre : String,
	status: Boolean,
	ruta: String,
	script: String,
	icon: String,
	// account_id:{
	// 	type: Schema.ObjectId,
	// 	ref: 'accounts'
	// }
});

var Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;