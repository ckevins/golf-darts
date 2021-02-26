const scoresRouter = require('express').Router({mergeParams: true});
const client = require('./client.js');



//CALLED BY SUBMIT BUTTON
scoresRouter.post('/', (req, res, next) => {
    console.log(req.body);
    const postGame = 'INSERT INTO Games (date) VALUES (NOW()) RETURNING game_id';
    client.query(postGame)
        .then(result => {
            const game_id = result.rows[0].game_id;
            const playerInserts = req.body.map(player => {
                const getPlayerId = {
                    name:'get-player_id',
                    text:`SELECT player_id FROM Players WHERE name = $1`,
                    values: [player.name],
                    rowMode: 'integer'
                };
                return client.query(getPlayerId)
                    .then(result => {
                        const player_id = result.rows[0].player_id;
                        const inserts = player.scores.map((score, index) => {
                            const postScores = {
                                name: 'post-scores',
                                text: `INSERT INTO Scores (game_id, player_id, hole_number, score) VALUES ($1, $2, $3, $4)`,
                                values: [game_id, player_id, index+1, score]
                            };
                            return client.query(postScores)
                                .catch(error => console.error(error.stack));
                        });
                        return Promise.all(inserts)
                    })
                    .catch(error => console.error(error.stack)); 
            })
            return Promise.all(playerInserts)
        })
        .then(()=>{
            console.log('Scores submitted');
            res.status(201).send();
        })
        .catch(error => console.error(error.stack));
})



module.exports = scoresRouter;