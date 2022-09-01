const { BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		throw new BadRequestError('Please provide a username and password');
	}

	const id = new Date().getDate();

	const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// console.log('get username and password =>', username, password);
	res.status(200).json({ msg: 'user created', token });
};
module.exports = login;
