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

scoresRouter.post('/', (req, res, next) => {
    console.log(req.body);
    db.run(`INSERT INTO Games (date) VALUES (datetime('now'))`, function(error){
        if(error) {
            next(error)
        } else {
            const game_id = this.lastID;
            req.body.forEach((player) => {
                const sql = `SELECT player_id FROM Players WHERE name = $name`;
                const values = { $name: player.name};
                db.get(sql, values, (error, result) => {
                    if(error) {
                        next(error)
                    } else {
                        const player_id = result.player_id;
                        player.scores.forEach((score, index) => {
                            const sql = `INSERT INTO Scores 
                            (game_id, player_id, hole_number, score)
                            VALUES ($game_id, $player_id, $hole_number, $score)`;
                            const values = {
                                $game_id: game_id,
                                $player_id: player_id,
                                $hole_number: (index+1),
                                $score: score
                            };
                            db.run(sql, values, function(error) {
                                if(error) {
                                    next(error)
                                } else {
                                    return 
                                }
                            })
                        });
                        res.status(200).send();
                    }   
                })
            })
        }
    })
    
})

module.exports = scoresRouter;