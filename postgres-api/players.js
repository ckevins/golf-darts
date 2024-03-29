const playersRouter = require('express').Router();
const scoresRouter = require('./scores');
const client = require('./client.js');



client.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected')
    }
});

//CALLED TO SET STATE FOR SELECTION BOXES
playersRouter.get('/', (req, res, next) => {
    client.query(`SELECT A.name, ARRAY_AGG(A.score) as games
        FROM
        (SELECT Players.name, Scores.score
        FROM players
        LEFT JOIN scores
        ON players.player_id = scores.player_id
        ORDER BY Scores.game_id, Scores.hole_number) AS A
        GROUP BY A.name`, 
        (error, players) => {
            console.log('Players Retrieved');
            if(error) {
                next(error);
                client.end();
            } else {
                players.rows.forEach(player => {
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
                res.status(200).json({ players: players.rows });
            }
    })
});

//CALLED ON PLAYER CREATION
playersRouter.post('/', (req, res, next) => {
    const name = req.body.name;
    if (!name) {
        res.status(400).send('A new player must have a name.');
    } else {
        const insertQuery = {
            name: 'insert-player',
            text: 'INSERT INTO Players (name) VALUES ($1) RETURNING name',
            values: [name]
        };
        client.query(insertQuery)
            .then(response => {
                console.log(`Team Created: ${response.rows[0].name}`);
                res.status(200).send(response);
            })
            .catch(e => {
                console.error(e.stack);
                res.status(400).send();
            })
    }
});

playersRouter.use('/scores', scoresRouter);

module.exports = {playersRouter, client};