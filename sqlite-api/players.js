const playersRouter = require('express').Router();
const sqlite3 = require('sqlite3');
const scoresRouter = require('./scores');
const db = new sqlite3.Database('./database.sqlite');


//CALLED TO SET STATE FOR SELECTION BOXES
playersRouter.get('/', (req, res, next) => {
    db.all(`SELECT  Players.player_id, name, GROUP_CONCAT(score, '') AS games
        FROM Players 
        LEFT JOIN Scores 
        ON Players.player_id = Scores.player_id
        GROUP BY name
        ORDER BY game_id, hole_number`, 
        (error, players) => {
            if(error) {
                next(error)
            } else {
                players.forEach(player => {
                    if(player.games === null) {
                        player.games = [];
                    } else {
                        const textScoreArr = Array.from(player.games);
                        const allScoresArr = [];
                        textScoreArr.forEach(text => {
                            const num = Number(text);
                            allScoresArr.push(num);
                        });
                        let games = [];
                        const splitArray = (array) => {
                            while(array.length >= 18) {
                                let arrayElement = array.splice(0, 18);
                                games.push(arrayElement);
                            }
                            return games;
                        };
                        splitArray(allScoresArr);
                        player.games = games;
                    }
                })
                res.status(200).json({ players: players })
            }
    })
});

//CALLED ON PLAYER CREATION
playersRouter.post('/', (req, res, next) => {
    const name = req.body.name;
    if (!name) {
        res.status(400).send('A new player must have a name.');
    } else {
        const sql = `INSERT INTO Players (name) VALUES ($name)`;
        const values = { $name: name };
        db.run(sql, values, function(error) {
            if(error){
                next(error)
            } else {
                db.get(`SELECT * FROM Players WHERE player_id = ${this.lastID}`, (error, player) =>{
                    if(error){
                        res.send(error);
                        next(error)
                    } else {
                        res.status(200).json({ player: player });
                    }
                })
            }
        })
    }
});

playersRouter.use('/scores', scoresRouter);

module.exports = playersRouter;