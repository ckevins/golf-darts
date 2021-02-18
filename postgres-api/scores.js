const scoresRouter = require('express').Router({mergeParams: true});
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

//CALLED BY SUBMIT BUTTON
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