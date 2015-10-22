var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	characterSchema = new Schema({
		characterName: String,
	});

module.exports = mongoose.model('Characters', characterSchema);