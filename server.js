require('dotenv').config();
require('express-async-errors');
const express = require('express');
const matchesRouter = require('./routes/matches');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/errorHandler');
const port = require('./config/environment');
const cors = require('cors');

const app = express();
app.use(cors());

// middleware //
app.use(express.json());

// Routes //
app.use('/api/v1/matches', matchesRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(
			port,
			console.log(`Server is up and running on port ${port}`)
		);
	} catch (error) {
		console.log(error);
	}
};
start();
