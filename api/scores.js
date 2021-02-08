const scoresRouter = require('express').Router({mergeParams: true});
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

//select all scores
scoresRouter.get('/', (req, res, next) => {
    const sql = `SELECT * FROM Scores WHERE player_id = $player_id`;
    const values = { $player_id: req.params.player_id };
    db.all(sql, values, (error, scores) => {
        if(error){
            next(error);
        } else {
            res.status(200).json({ scores: scores });
        }
    })
});

//select scores by game
scoresRouter.get('/games')

module.exports = scoresRouter;