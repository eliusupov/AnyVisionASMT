const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	userName: {
		type: String,
		required: true,
		lowercase: true,
		minlength: 2,
		maxlength: 16,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 12,
		trim: true,
	},
});

module.exports = mongoose.model('User', UserSchema);
