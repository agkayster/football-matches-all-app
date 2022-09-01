const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
	// console.log('get headers authorization =>', req.headers.authorization);
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new UnauthenticatedError('No token provided');
	}

	const token = authHeader.split(' ')[1];
	// console.log('get token =>', token);
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// console.log('get decoded token =>', decoded);
		const { id, username } = decoded;
		req.user = { id, username };
		next();
	} catch (error) {
		throw new UnauthenticatedError('Not authorized to access this route');
	}
};
module.exports = authenticationMiddleware;
