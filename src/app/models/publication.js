const mongoose = require('mongoose');

const PublicationSchema = mongoose.Schema({
	user_id: String,
	date_of_publication: Date,
	Ispublic: Boolean,
	IsTrendy: Boolean,
	publication_text: String,
	publication_image: String
});

module.exports = mongoose.model('Publication', PublicationSchema);