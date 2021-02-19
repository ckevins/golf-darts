const scoresRouter = require('express').Router({mergeParams: true});
const { Client } = require('pg');

const client = new Client({
    user: 'nylnkldjikgysf',
    host: 'ec2-54-144-45-5.compute-1.amazonaws.com',
    database: 'da8bts90caraq7',
    password: '2516359f318ab2fefead8c609c8653d6eabd2eb01ad7da552fa2b1e22254da7e',
    port: 5432,
    ssl: true
});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

//CALLED BY SUBMIT BUTTON
scoresRouter.post('/', (req, res, next) => {
    console.log(req.body);
    const postGame = 'INSERT INTO Games (date) VALUES (NOW())';
    client.query(postGame)
        .then(result => {
            console.log(result);
        })
        .catch(error => console.error(error.stack));
})





// db.run(`INSERT INTO Games (date) VALUES (datetime('now'))`, function(error){
//     if(error) {
//         next(error)
//     } else {
//         const game_id = this.lastID;
//         req.body.forEach((player) => {
//             const sql = `SELECT player_id FROM Players WHERE name = $name`;
//             const values = { $name: player.name};
//             db.get(sql, values, (error, result) => {
//                 if(error) {
//                     next(error)
//                 } else {
//                     const player_id = result.player_id;
//                     player.scores.forEach((score, index) => {
//                         const sql = `INSERT INTO Scores 
//                         (game_id, player_id, hole_number, score)
//                         VALUES ($game_id, $player_id, $hole_number, $score)`;
//                         const values = {
//                             $game_id: game_id,
//                             $player_id: player_id,
//                             $hole_number: (index+1),
//                             $score: score
//                         };
//                         db.run(sql, values, function(error) {
//                             if(error) {
//                                 next(error)
//                             }
//                         })
//                     });
//                     res.status(200).send();
//                 }   
//             })
//         })
//     }
// })  


module.exports = scoresRouter;