const express = require('express');
const postgresApiRouter = express.Router();
const playersRouter = require('./players');

postgresApiRouter.use('/players', playersRouter);

module.exports = postgresApiRouter;