const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
	uid: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	teamId: {
		type: Schema.Types.ObjectId,
		ref: 'teams',
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	jobRole: {
		type: String,
		required: true,
	},
	skills: {
		type: [String],
		required: true,
	},
	social: {
		youtube: {
			type: String,
		},
		linkedin: {
			type: String,
		}
	},
	lud: {
		type: Date,
		default: Date.now,
	}
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
