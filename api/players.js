const playersRouter = require('express').Router();
const sqlite3 = require('sqlite3');
const playersRouter = require('./api');
const scoresRouter = require('./scores');
const db = new sqlite3.Database('./database.sqlite');

playersRouter.use('/:player_id/scores', scoresRouter);

module.exports = playersRouter;