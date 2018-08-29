const mongoose = require('mongoose');

const ComentSchema = mongoose.Schema({
	User_id: String,
	Publication_id: String,
	Coment: String
});

module.exports = mongoose.model('Coment', ComentSchema);