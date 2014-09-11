var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	body: {
		type: String,
		required: true
	},
	modified_at: {
		type: Date,
		default: Date.now
	}
})

var postSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	modified_at: {
		type: Date,
		default: Date.now
	},
	initiatedBy: {
		type: String,
		required: true
	},
	downloadedBy: {
		type: String,
		default: "Pending",
		required: true
	},
	completedStat: {
		type: String,
		default: "open"
	},
	comments: [ commentSchema ]
});

module.exports = mongoose.model('Post', postSchema);