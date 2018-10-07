const mongoose = require('mongoose'),
	//_ = require('lodash'),	
	Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	lud: {
		type: Date,
		alias: 'lastUpdateDate',
		default: Date.now
	}
});

//Sample method creation for future reference
// UserSchema.methods.customMethod = function() {
// 	var user = this;
// 	//TODO : Custom methods can be created on schema
// };

// UserSchema.methods.toJSON = function() {
// 	var user = this;
// 	var userObject = user.toObject();

// 	return _.pick(userObject, [ 'name', 'email' ]);
// };

//TODO: Use A static method
// UserSchema.statics.findByToken = function(token) {};

// UserSchema.pre('save', function(next) {
// 	//TODO: password encryption can happend here before saving
// 	next();
// });

module.exports = User = mongoose.model('users', UserSchema);
