var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost/tareas');

var AccountUserSchema = new mongoose.Schema({
	nombre: {type: String, uppercase: true},
	apellido_paterno: {type: String, uppercase: true},
	apellido_materno: {type: String, uppercase: true},
	contacto_num: String,
	//area: {type: String, enum: ['Desarrollo.', 'Diseño', 'Moviles']},
	area: {
		type: [{
			type: String,
			enum: ['Desarrollo', 'Diseño', 'Moviles']
		}],
		default: ['Desarrollo']
	},
	account_id:{
		type: Schema.ObjectId,
		ref: 'accounts'
	}
	//proyectos : {},
	//usuarios : {},
});

var AccountUser = mongoose.model('AccountUser', AccountUserSchema);
module.exports = AccountUser;