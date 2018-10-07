const mongoose = require('mongoose'),
	aliasField = require('mongoose-aliasfield'),
	Schema = mongoose.Schema;

const TeamSchema = new Schema({
	n: {
		type: String,
		alias: 'name',
		required: true
	}
});

TeamSchema.plugin(aliasField);
module.exports = Team = mongoose.model('teams', TeamSchema);
