const Match = require('../models/Match');
const asyncWrapper = require('../middleware/async');
const { BadRequestError } = require('../errors');
// const jwt = require('jsonwebtoken');

const getAllMatches = asyncWrapper(async (req, res) => {
	// console.log('get req headers =>', req.headers);
	// console.log('get req user =>', req.user);

	const {
		played,
		awayTeam,
		homeTeam,
		time,
		venue,
		date,
		year,
		sort,
		fields,
	} = req.query;
	const queryObject = {};

	// Here we are implementing SEARCH functions //
	if (played) {
		queryObject.played = played === 'true' ? true : false;
	}
	if (awayTeam) {
		queryObject.awayTeam = { $regex: awayTeam, $options: 'i' };
	}
	if (homeTeam) {
		queryObject.homeTeam = { $regex: homeTeam, $options: 'i' };
	}
	if (time) {
		queryObject.time = time;
	}
	if (venue) {
		queryObject.venue = { $regex: venue, $options: 'i' };
	}
	if (date) {
		queryObject.date = date;
	}
	if (year) {
		queryObject.year = year;
	}

	let result = Match.find(queryObject);

	if (sort) {
		const sortList = sort.split(',').join(' ');
		console.log(sortList);
		result = result.sort(sortList);
	} else {
		result = result.sort(date);
	}

	if (fields) {
		const fieldList = fields.split(',').join(' ');
		result = result.select(fieldList);
	}

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	const matches = await result;
	res.status(200).json({
		msg: `Welcome, ${req.user.username}`,
		matches,
		nbHits: matches.length,
	});

	/* Works without auth-middleware */
	// res.status(200).json({
	// 	msg: `Welcome, Ejike`,
	// 	matches,
	// 	nbHits: matches.length,
	// });
});

// const getAllMatches = asyncWrapper(async (req, res) => {
// 	const matches = await Match.find({});
// 	res.status(200).json({ matches });
// });

const createMatch = asyncWrapper(async (req, res) => {
	const match = await Match.create(req.body);
	res.status(201).json({ match });
});

const getSingleMatch = asyncWrapper(async (req, res, next) => {
	const { id: matchID } = req.params;
	// const singleMatch = await Match.findOne({ _id: matchID });
	const match = await Match.findById(matchID);
	if (!match) {
		return next(BadRequestError(`Match with id ${matchID} not found`));

		/* Use next method above instead of res.status(404) below */
		// res.status(404).json({ msg: `Match with id ${matchID} not found` });
	}
	res.status(200).json({ match });
});

const updateSingleMatch = asyncWrapper(async (req, res, next) => {
	const { id: matchID } = req.params;
	const match = await Match.findByIdAndUpdate(matchID, req.body, {
		new: true,
		runValidators: true,
	});
	// const match = await Match.findOneAndUpdate({ _id: matchID }, req.body, {
	// 	new: true,
	// 	runValidators: true,
	// });
	if (!match) {
		return next(BadRequestError(`Match with id ${matchID} not found`));

		// res.status(404).json({ msg: `Match with id ${matchID} not found` });
	}
	res.status(200).json({ match });
});

const deleteMatch = asyncWrapper(async (req, res, next) => {
	const { id: matchID } = req.params;
	const match = await Match.findByIdAndDelete(matchID);
	// const match = await Match.findOneAndDelete({ _id: matchID });
	if (!match) {
		return next(BadRequestError(`No match with id ${matchID} found`));
		// return next(BadRequestError(`No match with id ${matchID} found`, 404));

		// res.status(404).json({ msg: `No match with id ${matchID} found` });
	}
	res.status(200).json({
		msg: `match with id ${matchID} deleted successfully`,
	});
});

module.exports = {
	getAllMatches,
	createMatch,
	getSingleMatch,
	updateSingleMatch,
	deleteMatch,
};
