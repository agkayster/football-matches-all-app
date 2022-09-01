const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
	console.log('get error =>', err);
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}
	// err.name is always "ValidationError" //
	if (err.name === 'ValidationError') {
		// err.errors is always an object //
		for (let key in err.errors) {
			/* we are saying let err.errors be an object with a specified "key" that has a "message" attached to it */
			err.errors[key] = err.errors[key].message;
		}
		/* we return a status of "unprocessible entity" and an errors object with the "key" and "message" stated above  */
		return res.status(422).json({ errors: err.errors });
	}
	return res.status(err.status).json({ msg: err.message });
};

// const errorHandler = (err, req, res, next) => {
// 	if (err instanceof CustomAPIError) {
// 		return res.status(err.statusCode).json({ msg: err.message });
// 	}
// 	return res.status(500).json({ msg: 'something went wrong' });
// };

module.exports = errorHandler;
