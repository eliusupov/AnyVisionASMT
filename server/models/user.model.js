const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	userName: {
		type: String,
		required: true,
		max: 24,
	},
	password: {
		type: String,
		required: true,
		max: 12,
	},
});

module.exports = mongoose.model('User', UserSchema);
