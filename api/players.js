const playersRouter = require('express').Router();
const sqlite3 = require('sqlite3');
const playersRouter = require('./api');
const scoresRouter = require('./scores');
const db = new sqlite3.Database('./database.sqlite');

playersRouter.param('player_id', (req, res, next, playerId) => {
    const sql = `SELECT * FROM Players WHERE player_id = $player_id`;
    const values = { $player_id: playerId };
    db.get(sql, values, (error, player) => {
        if(error){
            next(error)
        } else if (player) {
            req.player = player;
            next();
        } else {
            res.status(404).send('No player found with this ID');
        }
    })
});

playersRouter.get('/', (req, res, next) => {
    db.all(`SELECT name FROM Players`, (error, players) => {
        if(error){
            next(error)
        } else {
            res.status(200).json({ players: players});
        }
    })
});

playersRouter.get('/:player_id', (req, res, next) => {
    res.status(200).json({ player: req.player });
});

playersRouter.post('/', (req, res, next) => {
    const name = req.body.player.name;
    if (!name) {
        res.status(400).send('A new player must have a name.');
    } else {
        const sql = `INSERT INTO Players (name) VALUES ($name)`;
        const values = { $name: name };
        db.run(sql, values, function(error) {
            if(error){
                next(error)
            } else {
                db.get(`SELECT * FROM Players WHERE id = ${this.lastID}`, (error, player) =>{
                    if(error){
                        next(error)
                    } else {
                        res.status(200).json({ player: player });
                    }
                })
            }
        })
    }
});

playersRouter.use('/:player_id/scores', scoresRouter);

module.exports = playersRouter;