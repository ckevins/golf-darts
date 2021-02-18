const playersRouter = require('express').Router();
const sqlite3 = require('sqlite3');
const scoresRouter = require('./scores');
const db = new sqlite3.Database('./database.sqlite');

const { Client } = require('pg');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const client = new Client({
    user: 'nylnkldjikgysf',
    host: 'ec2-54-144-45-5.compute-1.amazonaws.com',
    database: 'da8bts90caraq7',
    password: '2516359f318ab2fefead8c609c8653d6eabd2eb01ad7da552fa2b1e22254da7e',
    port: 5432,
    ssl: true
});
client.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected')
    }
});

//CALLED TO SET STATE FOR SELECTION BOXES
playersRouter.get('/', (req, res, next) => {
    client.query(`SELECT Players.name, ARRAY_AGG(Scores.score) AS games
        FROM Players 
        LEFT JOIN Scores 
        ON Players.player_id = Scores.player_id
        GROUP BY Players.name
        ORDER BY Scores.game_id, Scores.hole_number`, 
        (error, players) => {
            if(error) {
                next(error);
                client.end();
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
                res.status(200).json({ players: players });
                client.end();
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