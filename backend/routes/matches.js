const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const authMiddleware = require('../middleware/auth');

const {
	getAllMatches,
	createMatch,
	getSingleMatch,
	updateSingleMatch,
	deleteMatch,
} = require('../controllers/matches');

router
	.route('/allmatches')
	.get(authMiddleware, getAllMatches)
	.post(createMatch);

// Need to change this to /allmatches/:id //
router
	.route('/:id')
	.get(getSingleMatch)
	.patch(updateSingleMatch)
	.delete(deleteMatch);

router.route('/').post(login);

module.exports = router;
