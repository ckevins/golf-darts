const express = require('express');
const sqliteApiRouter = express.Router();
const playersRouter = require('./players');

sqliteApiRouter.use('/players', playersRouter);

module.exports = sqliteApiRouter;