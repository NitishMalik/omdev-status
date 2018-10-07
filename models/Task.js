const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	aliasField = require('mongoose-aliasfield');

const TaskSchema = new Schema({
	uid: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		alias: 'userId'
	},
	n: {
		type: String,
		required: true,
		alias: 'name'
	},
	p: {
		type: String,
		required: true,
		alias: 'project'
	},
	app: {
		type: String,
		required: true,
		alias: 'application'
	},
	d: {
		type: String,
		alias: 'details'
	},
	f: {
		type: Date,
		required: true,
		alias: 'fromDate'
	},
	t: {
		type: Date,
		alias: 'toDate'
	},
	dp: {
		type: String,
		alias: 'dependencies'
	},
	lud: {
		type: Date,
		default: Date.now,
		alias: 'lastUpdatedTimeStamp'
	}
});

TaskSchema.plugin(aliasField);
module.exports = Task = mongoose.model('tasks', TaskSchema);
