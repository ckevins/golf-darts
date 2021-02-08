const express = require('express');
const apiRouter = express.Router();
const playersRouter = require('./players');

apiRouter.use('/players', playersRouter);

module.exports = apiRouter;