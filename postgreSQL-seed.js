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


const insertPlayers = `INSERT INTO Players (name) 
    VALUES 
    ('Bob'),
    ('Linda'),
    ('Teddy'),
    ('Tina'),
    ('Louise'),
    ('Gene'),
    ('Mort'),
    ('Fischoeder'),
    ('Jimmy Pesto'),
    ('Regular Sized Rudy')`;

const insertGames = `INSERT INTO Games (date)
    VALUES 
    (NOW()),
    (NOW()),
    (NOW()),
    (NOW()),
    (NOW()),
    (NOW()),
    (NOW()),
    (NOW()),
    (NOW()),
    (NOW())`;

const insertScores = `INSERT INTO Scores (game_id, player_id, hole_number, score)
    VALUES
    (1, 1, 1, FLOOR(RANDOM()*6+1)), (1, 1, 2, FLOOR(RANDOM()*6+1)),
    (1, 1, 3, FLOOR(RANDOM()*6+1)), (1, 1, 4, FLOOR(RANDOM()*6+1)),
    (1, 1, 5, FLOOR(RANDOM()*6+1)), (1, 1, 6, FLOOR(RANDOM()*6+1)),
    (1, 1, 7, FLOOR(RANDOM()*6+1)), (1, 1, 8, FLOOR(RANDOM()*6+1)),
    (1, 1, 9, FLOOR(RANDOM()*6+1)), (1, 1, 10, FLOOR(RANDOM()*6+1)),
    (1, 1, 11, FLOOR(RANDOM()*6+1)), (1, 1, 12, FLOOR(RANDOM()*6+1)),
    (1, 1, 13, FLOOR(RANDOM()*6+1)), (1, 1, 14, FLOOR(RANDOM()*6+1)),
    (1, 1, 15, FLOOR(RANDOM()*6+1)), (1, 1, 16, FLOOR(RANDOM()*6+1)),
    (1, 1, 17, FLOOR(RANDOM()*6+1)), (1, 1, 18, FLOOR(RANDOM()*6+1)),
    (1, 2, 1, FLOOR(RANDOM()*6+1)), (1, 2, 2, FLOOR(RANDOM()*6+1)),
    (1, 2, 3, FLOOR(RANDOM()*6+1)), (1, 2, 4, FLOOR(RANDOM()*6+1)),
    (1, 2, 5, FLOOR(RANDOM()*6+1)), (1, 2, 6, FLOOR(RANDOM()*6+1)),
    (1, 2, 7, FLOOR(RANDOM()*6+1)), (1, 2, 8, FLOOR(RANDOM()*6+1)),
    (1, 2, 9, FLOOR(RANDOM()*6+1)), (1, 2, 10, FLOOR(RANDOM()*6+1)),
    (1, 2, 11, FLOOR(RANDOM()*6+1)), (1, 2, 12, FLOOR(RANDOM()*6+1)),
    (1, 2, 13, FLOOR(RANDOM()*6+1)), (1, 2, 14, FLOOR(RANDOM()*6+1)),
    (1, 2, 15, FLOOR(RANDOM()*6+1)), (1, 2, 16, FLOOR(RANDOM()*6+1)),
    (1, 2, 17, FLOOR(RANDOM()*6+1)), (1, 2, 18, FLOOR(RANDOM()*6+1)),
    (1, 3, 1, FLOOR(RANDOM()*6+1)), (1, 3, 2, FLOOR(RANDOM()*6+1)),
    (1, 3, 3, FLOOR(RANDOM()*6+1)), (1, 3, 4, FLOOR(RANDOM()*6+1)),
    (1, 3, 5, FLOOR(RANDOM()*6+1)), (1, 3, 6, FLOOR(RANDOM()*6+1)),
    (1, 3, 7, FLOOR(RANDOM()*6+1)), (1, 3, 8, FLOOR(RANDOM()*6+1)),
    (1, 3, 9, FLOOR(RANDOM()*6+1)), (1, 3, 10, FLOOR(RANDOM()*6+1)),
    (1, 3, 11, FLOOR(RANDOM()*6+1)), (1, 3, 12, FLOOR(RANDOM()*6+1)),
    (1, 3, 13, FLOOR(RANDOM()*6+1)), (1, 3, 14, FLOOR(RANDOM()*6+1)),
    (1, 3, 15, FLOOR(RANDOM()*6+1)), (1, 3, 16, FLOOR(RANDOM()*6+1)),
    (1, 3, 17, FLOOR(RANDOM()*6+1)), (1, 3, 18, FLOOR(RANDOM()*6+1)),
    (1, 4, 1, FLOOR(RANDOM()*6+1)), (1, 4, 2, FLOOR(RANDOM()*6+1)),
    (1, 4, 3, FLOOR(RANDOM()*6+1)), (1, 4, 4, FLOOR(RANDOM()*6+1)),
    (1, 4, 5, FLOOR(RANDOM()*6+1)), (1, 4, 6, FLOOR(RANDOM()*6+1)),
    (1, 4, 7, FLOOR(RANDOM()*6+1)), (1, 4, 8, FLOOR(RANDOM()*6+1)),
    (1, 4, 9, FLOOR(RANDOM()*6+1)), (1, 4, 10, FLOOR(RANDOM()*6+1)),
    (1, 4, 11, FLOOR(RANDOM()*6+1)), (1, 4, 12, FLOOR(RANDOM()*6+1)),
    (1, 4, 13, FLOOR(RANDOM()*6+1)), (1, 4, 14, FLOOR(RANDOM()*6+1)),
    (1, 4, 15, FLOOR(RANDOM()*6+1)), (1, 4, 16, FLOOR(RANDOM()*6+1)),
    (1, 4, 17, FLOOR(RANDOM()*6+1)), (1, 4, 18, FLOOR(RANDOM()*6+1)),
    (2, 1, 1, FLOOR(RANDOM()*6+1)), (2, 1, 2, FLOOR(RANDOM()*6+1)),
    (2, 1, 3, FLOOR(RANDOM()*6+1)), (2, 1, 4, FLOOR(RANDOM()*6+1)),
    (2, 1, 5, FLOOR(RANDOM()*6+1)), (2, 1, 6, FLOOR(RANDOM()*6+1)),
    (2, 1, 7, FLOOR(RANDOM()*6+1)), (2, 1, 8, FLOOR(RANDOM()*6+1)),
    (2, 1, 9, FLOOR(RANDOM()*6+1)), (2, 1, 10, FLOOR(RANDOM()*6+1)),
    (2, 1, 11, FLOOR(RANDOM()*6+1)), (2, 1, 12, FLOOR(RANDOM()*6+1)),
    (2, 1, 13, FLOOR(RANDOM()*6+1)), (2, 1, 14, FLOOR(RANDOM()*6+1)),
    (2, 1, 15, FLOOR(RANDOM()*6+1)), (2, 1, 16, FLOOR(RANDOM()*6+1)),
    (2, 1, 17, FLOOR(RANDOM()*6+1)), (2, 1, 18, FLOOR(RANDOM()*6+1)),
    (2, 2, 1, FLOOR(RANDOM()*6+1)), (2, 2, 2, FLOOR(RANDOM()*6+1)),
    (2, 2, 3, FLOOR(RANDOM()*6+1)), (2, 2, 4, FLOOR(RANDOM()*6+1)),
    (2, 2, 5, FLOOR(RANDOM()*6+1)), (2, 2, 6, FLOOR(RANDOM()*6+1)),
    (2, 2, 7, FLOOR(RANDOM()*6+1)), (2, 2, 8, FLOOR(RANDOM()*6+1)),
    (2, 2, 9, FLOOR(RANDOM()*6+1)), (2, 2, 10, FLOOR(RANDOM()*6+1)),
    (2, 2, 11, FLOOR(RANDOM()*6+1)), (2, 2, 12, FLOOR(RANDOM()*6+1)),
    (2, 2, 13, FLOOR(RANDOM()*6+1)), (2, 2, 14, FLOOR(RANDOM()*6+1)),
    (2, 2, 15, FLOOR(RANDOM()*6+1)), (2, 2, 16, FLOOR(RANDOM()*6+1)),
    (2, 2, 17, FLOOR(RANDOM()*6+1)), (2, 2, 18, FLOOR(RANDOM()*6+1)),
    (2, 3, 1, FLOOR(RANDOM()*6+1)), (2, 3, 2, FLOOR(RANDOM()*6+1)),
    (2, 3, 3, FLOOR(RANDOM()*6+1)), (2, 3, 4, FLOOR(RANDOM()*6+1)),
    (2, 3, 5, FLOOR(RANDOM()*6+1)), (2, 3, 6, FLOOR(RANDOM()*6+1)),
    (2, 3, 7, FLOOR(RANDOM()*6+1)), (2, 3, 8, FLOOR(RANDOM()*6+1)),
    (2, 3, 9, FLOOR(RANDOM()*6+1)), (2, 3, 10, FLOOR(RANDOM()*6+1)),
    (2, 3, 11, FLOOR(RANDOM()*6+1)), (2, 3, 12, FLOOR(RANDOM()*6+1)),
    (2, 3, 13, FLOOR(RANDOM()*6+1)), (2, 3, 14, FLOOR(RANDOM()*6+1)),
    (2, 3, 15, FLOOR(RANDOM()*6+1)), (2, 3, 16, FLOOR(RANDOM()*6+1)),
    (2, 3, 17, FLOOR(RANDOM()*6+1)), (2, 3, 18, FLOOR(RANDOM()*6+1)),
    (2, 4, 1, FLOOR(RANDOM()*6+1)), (2, 4, 2, FLOOR(RANDOM()*6+1)),
    (2, 4, 3, FLOOR(RANDOM()*6+1)), (2, 4, 4, FLOOR(RANDOM()*6+1)),
    (2, 4, 5, FLOOR(RANDOM()*6+1)), (2, 4, 6, FLOOR(RANDOM()*6+1)),
    (2, 4, 7, FLOOR(RANDOM()*6+1)), (2, 4, 8, FLOOR(RANDOM()*6+1)),
    (2, 4, 9, FLOOR(RANDOM()*6+1)), (2, 4, 10, FLOOR(RANDOM()*6+1)),
    (2, 4, 11, FLOOR(RANDOM()*6+1)), (2, 4, 12, FLOOR(RANDOM()*6+1)),
    (2, 4, 13, FLOOR(RANDOM()*6+1)), (2, 4, 14, FLOOR(RANDOM()*6+1)),
    (2, 4, 15, FLOOR(RANDOM()*6+1)), (2, 4, 16, FLOOR(RANDOM()*6+1)),
    (2, 4, 17, FLOOR(RANDOM()*6+1)), (2, 4, 18, FLOOR(RANDOM()*6+1)),
    (3, 1, 1, FLOOR(RANDOM()*6+1)), (3, 1, 2, FLOOR(RANDOM()*6+1)),
    (3, 1, 3, FLOOR(RANDOM()*6+1)), (3, 1, 4, FLOOR(RANDOM()*6+1)),
    (3, 1, 5, FLOOR(RANDOM()*6+1)), (3, 1, 6, FLOOR(RANDOM()*6+1)),
    (3, 1, 7, FLOOR(RANDOM()*6+1)), (3, 1, 8, FLOOR(RANDOM()*6+1)),
    (3, 1, 9, FLOOR(RANDOM()*6+1)), (3, 1, 10, FLOOR(RANDOM()*6+1)),
    (3, 1, 11, FLOOR(RANDOM()*6+1)), (3, 1, 12, FLOOR(RANDOM()*6+1)),
    (3, 1, 13, FLOOR(RANDOM()*6+1)), (3, 1, 14, FLOOR(RANDOM()*6+1)),
    (3, 1, 15, FLOOR(RANDOM()*6+1)), (3, 1, 16, FLOOR(RANDOM()*6+1)),
    (3, 1, 17, FLOOR(RANDOM()*6+1)), (3, 1, 18, FLOOR(RANDOM()*6+1)),
    (3, 2, 1, FLOOR(RANDOM()*6+1)), (3, 2, 2, FLOOR(RANDOM()*6+1)),
    (3, 2, 3, FLOOR(RANDOM()*6+1)), (3, 2, 4, FLOOR(RANDOM()*6+1)),
    (3, 2, 5, FLOOR(RANDOM()*6+1)), (3, 2, 6, FLOOR(RANDOM()*6+1)),
    (3, 2, 7, FLOOR(RANDOM()*6+1)), (3, 2, 8, FLOOR(RANDOM()*6+1)),
    (3, 2, 9, FLOOR(RANDOM()*6+1)), (3, 2, 10, FLOOR(RANDOM()*6+1)),
    (3, 2, 11, FLOOR(RANDOM()*6+1)), (3, 2, 12, FLOOR(RANDOM()*6+1)),
    (3, 2, 13, FLOOR(RANDOM()*6+1)), (3, 2, 14, FLOOR(RANDOM()*6+1)),
    (3, 2, 15, FLOOR(RANDOM()*6+1)), (3, 2, 16, FLOOR(RANDOM()*6+1)),
    (3, 2, 17, FLOOR(RANDOM()*6+1)), (3, 2, 18, FLOOR(RANDOM()*6+1)),
    (3, 3, 1, FLOOR(RANDOM()*6+1)), (3, 3, 2, FLOOR(RANDOM()*6+1)),
    (3, 3, 3, FLOOR(RANDOM()*6+1)), (3, 3, 4, FLOOR(RANDOM()*6+1)),
    (3, 3, 5, FLOOR(RANDOM()*6+1)), (3, 3, 6, FLOOR(RANDOM()*6+1)),
    (3, 3, 7, FLOOR(RANDOM()*6+1)), (3, 3, 8, FLOOR(RANDOM()*6+1)),
    (3, 3, 9, FLOOR(RANDOM()*6+1)), (3, 3, 10, FLOOR(RANDOM()*6+1)),
    (3, 3, 11, FLOOR(RANDOM()*6+1)), (3, 3, 12, FLOOR(RANDOM()*6+1)),
    (3, 3, 13, FLOOR(RANDOM()*6+1)), (3, 3, 14, FLOOR(RANDOM()*6+1)),
    (3, 3, 15, FLOOR(RANDOM()*6+1)), (3, 3, 16, FLOOR(RANDOM()*6+1)),
    (3, 3, 17, FLOOR(RANDOM()*6+1)), (3, 3, 18, FLOOR(RANDOM()*6+1)),
    (3, 4, 1, FLOOR(RANDOM()*6+1)), (3, 4, 2, FLOOR(RANDOM()*6+1)),
    (3, 4, 3, FLOOR(RANDOM()*6+1)), (3, 4, 4, FLOOR(RANDOM()*6+1)),
    (3, 4, 5, FLOOR(RANDOM()*6+1)), (3, 4, 6, FLOOR(RANDOM()*6+1)),
    (3, 4, 7, FLOOR(RANDOM()*6+1)), (3, 4, 8, FLOOR(RANDOM()*6+1)),
    (3, 4, 9, FLOOR(RANDOM()*6+1)), (3, 4, 10, FLOOR(RANDOM()*6+1)),
    (3, 4, 11, FLOOR(RANDOM()*6+1)), (3, 4, 12, FLOOR(RANDOM()*6+1)),
    (3, 4, 13, FLOOR(RANDOM()*6+1)), (3, 4, 14, FLOOR(RANDOM()*6+1)),
    (3, 4, 15, FLOOR(RANDOM()*6+1)), (3, 4, 16, FLOOR(RANDOM()*6+1)),
    (3, 4, 17, FLOOR(RANDOM()*6+1)), (3, 4, 18, FLOOR(RANDOM()*6+1)),
    (3, 5, 1, FLOOR(RANDOM()*6+1)), (3, 5, 2, FLOOR(RANDOM()*6+1)),
    (3, 5, 3, FLOOR(RANDOM()*6+1)), (3, 5, 4, FLOOR(RANDOM()*6+1)),
    (3, 5, 5, FLOOR(RANDOM()*6+1)), (3, 5, 6, FLOOR(RANDOM()*6+1)),
    (3, 5, 7, FLOOR(RANDOM()*6+1)), (3, 5, 8, FLOOR(RANDOM()*6+1)),
    (3, 5, 9, FLOOR(RANDOM()*6+1)), (3, 5, 10, FLOOR(RANDOM()*6+1)),
    (3, 5, 11, FLOOR(RANDOM()*6+1)), (3, 5, 12, FLOOR(RANDOM()*6+1)),
    (3, 5, 13, FLOOR(RANDOM()*6+1)), (3, 5, 14, FLOOR(RANDOM()*6+1)),
    (3, 5, 15, FLOOR(RANDOM()*6+1)), (3, 5, 16, FLOOR(RANDOM()*6+1)),
    (3, 5, 17, FLOOR(RANDOM()*6+1)), (3, 5, 18, FLOOR(RANDOM()*6+1)),
    (3, 6, 1, FLOOR(RANDOM()*6+1)), (3, 6, 2, FLOOR(RANDOM()*6+1)),
    (3, 6, 3, FLOOR(RANDOM()*6+1)), (3, 6, 4, FLOOR(RANDOM()*6+1)),
    (3, 6, 5, FLOOR(RANDOM()*6+1)), (3, 6, 6, FLOOR(RANDOM()*6+1)),
    (3, 6, 7, FLOOR(RANDOM()*6+1)), (3, 6, 8, FLOOR(RANDOM()*6+1)),
    (3, 6, 9, FLOOR(RANDOM()*6+1)), (3, 6, 10, FLOOR(RANDOM()*6+1)),
    (3, 6, 11, FLOOR(RANDOM()*6+1)), (3, 6, 12, FLOOR(RANDOM()*6+1)),
    (3, 6, 13, FLOOR(RANDOM()*6+1)), (3, 6, 14, FLOOR(RANDOM()*6+1)),
    (3, 6, 15, FLOOR(RANDOM()*6+1)), (3, 6, 16, FLOOR(RANDOM()*6+1)),
    (3, 6, 17, FLOOR(RANDOM()*6+1)), (3, 6, 18, FLOOR(RANDOM()*6+1)),
    (3, 7, 1, FLOOR(RANDOM()*6+1)), (3, 7, 2, FLOOR(RANDOM()*6+1)),
    (3, 7, 3, FLOOR(RANDOM()*6+1)), (3, 7, 4, FLOOR(RANDOM()*6+1)),
    (3, 7, 5, FLOOR(RANDOM()*6+1)), (3, 7, 6, FLOOR(RANDOM()*6+1)),
    (3, 7, 7, FLOOR(RANDOM()*6+1)), (3, 7, 8, FLOOR(RANDOM()*6+1)),
    (3, 7, 9, FLOOR(RANDOM()*6+1)), (3, 7, 10, FLOOR(RANDOM()*6+1)),
    (3, 7, 11, FLOOR(RANDOM()*6+1)), (3, 7, 12, FLOOR(RANDOM()*6+1)),
    (3, 7, 13, FLOOR(RANDOM()*6+1)), (3, 7, 14, FLOOR(RANDOM()*6+1)),
    (3, 7, 15, FLOOR(RANDOM()*6+1)), (3, 7, 16, FLOOR(RANDOM()*6+1)),
    (3, 7, 17, FLOOR(RANDOM()*6+1)), (3, 7, 18, FLOOR(RANDOM()*6+1)),
    (3, 8, 1, FLOOR(RANDOM()*6+1)), (3, 8, 2, FLOOR(RANDOM()*6+1)),
    (3, 8, 3, FLOOR(RANDOM()*6+1)), (3, 8, 4, FLOOR(RANDOM()*6+1)),
    (3, 8, 5, FLOOR(RANDOM()*6+1)), (3, 8, 6, FLOOR(RANDOM()*6+1)),
    (3, 8, 7, FLOOR(RANDOM()*6+1)), (3, 8, 8, FLOOR(RANDOM()*6+1)),
    (3, 8, 9, FLOOR(RANDOM()*6+1)), (3, 8, 10, FLOOR(RANDOM()*6+1)),
    (3, 8, 11, FLOOR(RANDOM()*6+1)), (3, 8, 12, FLOOR(RANDOM()*6+1)),
    (3, 8, 13, FLOOR(RANDOM()*6+1)), (3, 8, 14, FLOOR(RANDOM()*6+1)),
    (3, 8, 15, FLOOR(RANDOM()*6+1)), (3, 8, 16, FLOOR(RANDOM()*6+1)),
    (3, 8, 17, FLOOR(RANDOM()*6+1)), (3, 8, 18, FLOOR(RANDOM()*6+1)),
    (4, 5, 1, FLOOR(RANDOM()*6+1)), (4, 5, 2, FLOOR(RANDOM()*6+1)),
    (4, 5, 3, FLOOR(RANDOM()*6+1)), (4, 5, 4, FLOOR(RANDOM()*6+1)),
    (4, 5, 5, FLOOR(RANDOM()*6+1)), (4, 5, 6, FLOOR(RANDOM()*6+1)),
    (4, 5, 7, FLOOR(RANDOM()*6+1)), (4, 5, 8, FLOOR(RANDOM()*6+1)),
    (4, 5, 9, FLOOR(RANDOM()*6+1)), (4, 5, 10, FLOOR(RANDOM()*6+1)),
    (4, 5, 11, FLOOR(RANDOM()*6+1)), (4, 5, 12, FLOOR(RANDOM()*6+1)),
    (4, 5, 13, FLOOR(RANDOM()*6+1)), (4, 5, 14, FLOOR(RANDOM()*6+1)),
    (4, 5, 15, FLOOR(RANDOM()*6+1)), (4, 5, 16, FLOOR(RANDOM()*6+1)),
    (4, 5, 17, FLOOR(RANDOM()*6+1)), (4, 5, 18, FLOOR(RANDOM()*6+1)),
    (4, 6, 1, FLOOR(RANDOM()*6+1)), (4, 6, 2, FLOOR(RANDOM()*6+1)),
    (4, 6, 3, FLOOR(RANDOM()*6+1)), (4, 6, 4, FLOOR(RANDOM()*6+1)),
    (4, 6, 5, FLOOR(RANDOM()*6+1)), (4, 6, 6, FLOOR(RANDOM()*6+1)),
    (4, 6, 7, FLOOR(RANDOM()*6+1)), (4, 6, 8, FLOOR(RANDOM()*6+1)),
    (4, 6, 9, FLOOR(RANDOM()*6+1)), (4, 6, 10, FLOOR(RANDOM()*6+1)),
    (4, 6, 11, FLOOR(RANDOM()*6+1)), (4, 6, 12, FLOOR(RANDOM()*6+1)),
    (4, 6, 13, FLOOR(RANDOM()*6+1)), (4, 6, 14, FLOOR(RANDOM()*6+1)),
    (4, 6, 15, FLOOR(RANDOM()*6+1)), (4, 6, 16, FLOOR(RANDOM()*6+1)),
    (4, 6, 17, FLOOR(RANDOM()*6+1)), (4, 6, 18, FLOOR(RANDOM()*6+1)),
    (4, 7, 1, FLOOR(RANDOM()*6+1)), (4, 7, 2, FLOOR(RANDOM()*6+1)),
    (4, 7, 3, FLOOR(RANDOM()*6+1)), (4, 7, 4, FLOOR(RANDOM()*6+1)),
    (4, 7, 5, FLOOR(RANDOM()*6+1)), (4, 7, 6, FLOOR(RANDOM()*6+1)),
    (4, 7, 7, FLOOR(RANDOM()*6+1)), (4, 7, 8, FLOOR(RANDOM()*6+1)),
    (4, 7, 9, FLOOR(RANDOM()*6+1)), (4, 7, 10, FLOOR(RANDOM()*6+1)),
    (4, 7, 11, FLOOR(RANDOM()*6+1)), (4, 7, 12, FLOOR(RANDOM()*6+1)),
    (4, 7, 13, FLOOR(RANDOM()*6+1)), (4, 7, 14, FLOOR(RANDOM()*6+1)),
    (4, 7, 15, FLOOR(RANDOM()*6+1)), (4, 7, 16, FLOOR(RANDOM()*6+1)),
    (4, 7, 17, FLOOR(RANDOM()*6+1)), (4, 7, 18, FLOOR(RANDOM()*6+1)),
    (4, 8, 1, FLOOR(RANDOM()*6+1)), (4, 8, 2, FLOOR(RANDOM()*6+1)),
    (4, 8, 3, FLOOR(RANDOM()*6+1)), (4, 8, 4, FLOOR(RANDOM()*6+1)),
    (4, 8, 5, FLOOR(RANDOM()*6+1)), (4, 8, 6, FLOOR(RANDOM()*6+1)),
    (4, 8, 7, FLOOR(RANDOM()*6+1)), (4, 8, 8, FLOOR(RANDOM()*6+1)),
    (4, 8, 9, FLOOR(RANDOM()*6+1)), (4, 8, 10, FLOOR(RANDOM()*6+1)),
    (4, 8, 11, FLOOR(RANDOM()*6+1)), (4, 8, 12, FLOOR(RANDOM()*6+1)),
    (4, 8, 13, FLOOR(RANDOM()*6+1)), (4, 8, 14, FLOOR(RANDOM()*6+1)),
    (4, 8, 15, FLOOR(RANDOM()*6+1)), (4, 8, 16, FLOOR(RANDOM()*6+1)),
    (4, 8, 17, FLOOR(RANDOM()*6+1)), (4, 8, 18, FLOOR(RANDOM()*6+1)),
    (5, 5, 1, FLOOR(RANDOM()*6+1)), (5, 5, 2, FLOOR(RANDOM()*6+1)),
    (5, 5, 3, FLOOR(RANDOM()*6+1)), (5, 5, 4, FLOOR(RANDOM()*6+1)),
    (5, 5, 5, FLOOR(RANDOM()*6+1)), (5, 5, 6, FLOOR(RANDOM()*6+1)),
    (5, 5, 7, FLOOR(RANDOM()*6+1)), (5, 5, 8, FLOOR(RANDOM()*6+1)),
    (5, 5, 9, FLOOR(RANDOM()*6+1)), (5, 5, 10, FLOOR(RANDOM()*6+1)),
    (5, 5, 11, FLOOR(RANDOM()*6+1)), (5, 5, 12, FLOOR(RANDOM()*6+1)),
    (5, 5, 13, FLOOR(RANDOM()*6+1)), (5, 5, 14, FLOOR(RANDOM()*6+1)),
    (5, 5, 15, FLOOR(RANDOM()*6+1)), (5, 5, 16, FLOOR(RANDOM()*6+1)),
    (5, 5, 17, FLOOR(RANDOM()*6+1)), (5, 5, 18, FLOOR(RANDOM()*6+1)),
    (5, 6, 1, FLOOR(RANDOM()*6+1)), (5, 6, 2, FLOOR(RANDOM()*6+1)),
    (5, 6, 3, FLOOR(RANDOM()*6+1)), (5, 6, 4, FLOOR(RANDOM()*6+1)),
    (5, 6, 5, FLOOR(RANDOM()*6+1)), (5, 6, 6, FLOOR(RANDOM()*6+1)),
    (5, 6, 7, FLOOR(RANDOM()*6+1)), (5, 6, 8, FLOOR(RANDOM()*6+1)),
    (5, 6, 9, FLOOR(RANDOM()*6+1)), (5, 6, 10, FLOOR(RANDOM()*6+1)),
    (5, 6, 11, FLOOR(RANDOM()*6+1)), (5, 6, 12, FLOOR(RANDOM()*6+1)),
    (5, 6, 13, FLOOR(RANDOM()*6+1)), (5, 6, 14, FLOOR(RANDOM()*6+1)),
    (5, 6, 15, FLOOR(RANDOM()*6+1)), (5, 6, 16, FLOOR(RANDOM()*6+1)),
    (5, 6, 17, FLOOR(RANDOM()*6+1)), (5, 6, 18, FLOOR(RANDOM()*6+1)),
    (5, 7, 1, FLOOR(RANDOM()*6+1)), (5, 7, 2, FLOOR(RANDOM()*6+1)),
    (5, 7, 3, FLOOR(RANDOM()*6+1)), (5, 7, 4, FLOOR(RANDOM()*6+1)),
    (5, 7, 5, FLOOR(RANDOM()*6+1)), (5, 7, 6, FLOOR(RANDOM()*6+1)),
    (5, 7, 7, FLOOR(RANDOM()*6+1)), (5, 7, 8, FLOOR(RANDOM()*6+1)),
    (5, 7, 9, FLOOR(RANDOM()*6+1)), (5, 7, 10, FLOOR(RANDOM()*6+1)),
    (5, 7, 11, FLOOR(RANDOM()*6+1)), (5, 7, 12, FLOOR(RANDOM()*6+1)),
    (5, 7, 13, FLOOR(RANDOM()*6+1)), (5, 7, 14, FLOOR(RANDOM()*6+1)),
    (5, 7, 15, FLOOR(RANDOM()*6+1)), (5, 7, 16, FLOOR(RANDOM()*6+1)),
    (5, 7, 17, FLOOR(RANDOM()*6+1)), (5, 7, 18, FLOOR(RANDOM()*6+1)),
    (5, 8, 1, FLOOR(RANDOM()*6+1)), (5, 8, 2, FLOOR(RANDOM()*6+1)),
    (5, 8, 3, FLOOR(RANDOM()*6+1)), (5, 8, 4, FLOOR(RANDOM()*6+1)),
    (5, 8, 5, FLOOR(RANDOM()*6+1)), (5, 8, 6, FLOOR(RANDOM()*6+1)),
    (5, 8, 7, FLOOR(RANDOM()*6+1)), (5, 8, 8, FLOOR(RANDOM()*6+1)),
    (5, 8, 9, FLOOR(RANDOM()*6+1)), (5, 8, 10, FLOOR(RANDOM()*6+1)),
    (5, 8, 11, FLOOR(RANDOM()*6+1)), (5, 8, 12, FLOOR(RANDOM()*6+1)),
    (5, 8, 13, FLOOR(RANDOM()*6+1)), (5, 8, 14, FLOOR(RANDOM()*6+1)),
    (5, 8, 15, FLOOR(RANDOM()*6+1)), (5, 8, 16, FLOOR(RANDOM()*6+1)),
    (5, 8, 17, FLOOR(RANDOM()*6+1)), (5, 8, 18, FLOOR(RANDOM()*6+1)),
    (6, 1, 1, FLOOR(RANDOM()*6+1)), (6, 1, 2, FLOOR(RANDOM()*6+1)),
    (6, 1, 3, FLOOR(RANDOM()*6+1)), (6, 1, 4, FLOOR(RANDOM()*6+1)),
    (6, 1, 5, FLOOR(RANDOM()*6+1)), (6, 1, 6, FLOOR(RANDOM()*6+1)),
    (6, 1, 7, FLOOR(RANDOM()*6+1)), (6, 1, 8, FLOOR(RANDOM()*6+1)),
    (6, 1, 9, FLOOR(RANDOM()*6+1)), (6, 1, 10, FLOOR(RANDOM()*6+1)),
    (6, 1, 11, FLOOR(RANDOM()*6+1)), (6, 1, 12, FLOOR(RANDOM()*6+1)),
    (6, 1, 13, FLOOR(RANDOM()*6+1)), (6, 1, 14, FLOOR(RANDOM()*6+1)),
    (6, 1, 15, FLOOR(RANDOM()*6+1)), (6, 1, 16, FLOOR(RANDOM()*6+1)),
    (6, 1, 17, FLOOR(RANDOM()*6+1)), (6, 1, 18, FLOOR(RANDOM()*6+1)),
    (6, 9, 1, FLOOR(RANDOM()*6+1)), (6, 9, 2, FLOOR(RANDOM()*6+1)),
    (6, 9, 3, FLOOR(RANDOM()*6+1)), (6, 9, 4, FLOOR(RANDOM()*6+1)),
    (6, 9, 5, FLOOR(RANDOM()*6+1)), (6, 9, 6, FLOOR(RANDOM()*6+1)),
    (6, 9, 7, FLOOR(RANDOM()*6+1)), (6, 9, 8, FLOOR(RANDOM()*6+1)),
    (6, 9, 9, FLOOR(RANDOM()*6+1)), (6, 9, 10, FLOOR(RANDOM()*6+1)),
    (6, 9, 11, FLOOR(RANDOM()*6+1)), (6, 9, 12, FLOOR(RANDOM()*6+1)),
    (6, 9, 13, FLOOR(RANDOM()*6+1)), (6, 9, 14, FLOOR(RANDOM()*6+1)),
    (6, 9, 15, FLOOR(RANDOM()*6+1)), (6, 9, 16, FLOOR(RANDOM()*6+1)),
    (6, 9, 17, FLOOR(RANDOM()*6+1)), (6, 9, 18, FLOOR(RANDOM()*6+1)),
    (6, 10, 1, FLOOR(RANDOM()*6+1)), (6, 10, 2, FLOOR(RANDOM()*6+1)),
    (6, 10, 3, FLOOR(RANDOM()*6+1)), (6, 10, 4, FLOOR(RANDOM()*6+1)),
    (6, 10, 5, FLOOR(RANDOM()*6+1)), (6, 10, 6, FLOOR(RANDOM()*6+1)),
    (6, 10, 7, FLOOR(RANDOM()*6+1)), (6, 10, 8, FLOOR(RANDOM()*6+1)),
    (6, 10, 9, FLOOR(RANDOM()*6+1)), (6, 10, 10, FLOOR(RANDOM()*6+1)),
    (6, 10, 11, FLOOR(RANDOM()*6+1)), (6, 10, 12, FLOOR(RANDOM()*6+1)),
    (6, 10, 13, FLOOR(RANDOM()*6+1)), (6, 10, 14, FLOOR(RANDOM()*6+1)),
    (6, 10, 15, FLOOR(RANDOM()*6+1)), (6, 10, 16, FLOOR(RANDOM()*6+1)),
    (6, 10, 17, FLOOR(RANDOM()*6+1)), (6, 10, 18, FLOOR(RANDOM()*6+1)),
    (6, 2, 1, FLOOR(RANDOM()*6+1)), (6, 2, 2, FLOOR(RANDOM()*6+1)),
    (6, 2, 3, FLOOR(RANDOM()*6+1)), (6, 2, 4, FLOOR(RANDOM()*6+1)),
    (6, 2, 5, FLOOR(RANDOM()*6+1)), (6, 2, 6, FLOOR(RANDOM()*6+1)),
    (6, 2, 7, FLOOR(RANDOM()*6+1)), (6, 2, 8, FLOOR(RANDOM()*6+1)),
    (6, 2, 9, FLOOR(RANDOM()*6+1)), (6, 2, 10, FLOOR(RANDOM()*6+1)),
    (6, 2, 11, FLOOR(RANDOM()*6+1)), (6, 2, 12, FLOOR(RANDOM()*6+1)),
    (6, 2, 13, FLOOR(RANDOM()*6+1)), (6, 2, 14, FLOOR(RANDOM()*6+1)),
    (6, 2, 15, FLOOR(RANDOM()*6+1)), (6, 2, 16, FLOOR(RANDOM()*6+1)),
    (6, 2, 17, FLOOR(RANDOM()*6+1)), (6, 2, 18, FLOOR(RANDOM()*6+1)),
    (7, 9, 1, FLOOR(RANDOM()*6+1)), (7, 9, 2, FLOOR(RANDOM()*6+1)),
    (7, 9, 3, FLOOR(RANDOM()*6+1)), (7, 9, 4, FLOOR(RANDOM()*6+1)),
    (7, 9, 5, FLOOR(RANDOM()*6+1)), (7, 9, 6, FLOOR(RANDOM()*6+1)),
    (7, 9, 7, FLOOR(RANDOM()*6+1)), (7, 9, 8, FLOOR(RANDOM()*6+1)),
    (7, 9, 9, FLOOR(RANDOM()*6+1)), (7, 9, 10, FLOOR(RANDOM()*6+1)),
    (7, 9, 11, FLOOR(RANDOM()*6+1)), (7, 9, 12, FLOOR(RANDOM()*6+1)),
    (7, 9, 13, FLOOR(RANDOM()*6+1)), (7, 9, 14, FLOOR(RANDOM()*6+1)),
    (7, 9, 15, FLOOR(RANDOM()*6+1)), (7, 9, 16, FLOOR(RANDOM()*6+1)),
    (7, 9, 17, FLOOR(RANDOM()*6+1)), (7, 9, 18, FLOOR(RANDOM()*6+1)),
    (7, 10, 1, FLOOR(RANDOM()*6+1)), (7, 10, 2, FLOOR(RANDOM()*6+1)),
    (7, 10, 3, FLOOR(RANDOM()*6+1)), (7, 10, 4, FLOOR(RANDOM()*6+1)),
    (7, 10, 5, FLOOR(RANDOM()*6+1)), (7, 10, 6, FLOOR(RANDOM()*6+1)),
    (7, 10, 7, FLOOR(RANDOM()*6+1)), (7, 10, 8, FLOOR(RANDOM()*6+1)),
    (7, 10, 9, FLOOR(RANDOM()*6+1)), (7, 10, 10, FLOOR(RANDOM()*6+1)),
    (7, 10, 11, FLOOR(RANDOM()*6+1)), (7, 10, 12, FLOOR(RANDOM()*6+1)),
    (7, 10, 13, FLOOR(RANDOM()*6+1)), (7, 10, 14, FLOOR(RANDOM()*6+1)),
    (7, 10, 15, FLOOR(RANDOM()*6+1)), (7, 10, 16, FLOOR(RANDOM()*6+1)),
    (7, 10, 17, FLOOR(RANDOM()*6+1)), (7, 10, 18, FLOOR(RANDOM()*6+1))
    `;

client.query(insertPlayers)
    .then(() => console.log('Players Table Populated'))
    .catch(error => console.error(error.stack));

client.query(insertGames)
    .then(() => console.log('Games Table Populated'))
    .catch(error => console.error(error.stack));

client.query(insertScores)
    .then(() => console.log('Scores Table Populated'))
    .catch(error => console.error(error.stack))
    .then(()=> client.end())