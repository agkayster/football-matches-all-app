const mongoose = require('mongoose');

const { Schema } = mongoose;

const matchSchema = new Schema({
	homeTeam: {
		type: String,
		required: [true, 'must provide a value'],
		trim: true,
		maxLength: [20, 'home team name must not be more than 20 characters'],
	},
	awayTeam: {
		type: String,
		required: [true, 'must provide a value'],
		trim: true,
		maxLength: [20, 'away team name must not be more than 20 characters'],
	},
	time: {
		type: String,
		required: [true, 'must provide a value'],
		trim: true,
	},
	venue: {
		type: String,
		required: [true, 'must provide a value'],
		trim: true,
		maxLength: [20, 'venue name must not be more than 20 characters'],
	},
	date: {
		type: String,
		required: [true, 'must provide a value'],
		trim: true,
		maxLength: [20, 'date must not be more than 20 characters'],
	},
	year: {
		type: String,
		required: [true, 'must provide a value'],
		trim: true,
		maxLength: [4, 'year must not be more than 4 characters'],
	},
	played: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('Matches', matchSchema);
