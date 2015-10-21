var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	characterSchema = new Schema({
		characterName: String,
		vote: {type:Number, default:0}
	});

module.exports = mongoose.model('Characters', characterSchema);