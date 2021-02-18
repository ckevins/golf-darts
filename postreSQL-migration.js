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

const dropPlayers = `DROP TABLE IF EXISTS Players`;
const createPlayers = `CREATE TABLE Players (
    player_id serial PRIMARY KEY,
    name TEXT NOT NULL UNIQUE )`;
const dropGames = `DROP TABLE IF EXISTS Games`;
const createGames = `CREATE TABLE Games (
    game_id serial PRIMARY KEY,
    date TIMESTAMP)`;
const dropScores = `DROP TABLE IF EXISTS Scores`;
const createScores = `CREATE TABLE Scores (
    score_id serial PRIMARY KEY,
    game_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    hole_number INTEGER NOT NULL,
    score INTEGER NOT NULL,
    FOREIGN KEY (game_id) REFERENCES Games(game_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id))`;

client.query(dropPlayers)
    .then(result => console.log(result))
    .catch(error => console.error(error.stack))
    .then(() => {
        client.query(createPlayers)
            .then(result => console.log(result))
            .catch(error => console.error(error.stack))
    });
client.query(dropGames)
    .then(result => console.log(result))
    .catch(error => console.error(error.stack))
    .then(() => {
        client.query(createGames)
            .then(result => console.log(result))
            .catch(error => console.error(error.stack))
    });
client.query(dropScores)
    .then(result => console.log(result))
    .catch(error => console.error(error.stack))
    .then(() => {
        client.query(createScores)
            .then(result => console.log(result))
            .catch(error => console.error(error.stack))
            .then(()=> client.end());
    });