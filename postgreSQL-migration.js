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

const dropAll = async() => {
    await client.query(dropScores)
        .then(() => console.log('Table Dropped: Scores'))
        .catch(error => console.error(error.stack));
    await client.query(dropGames)
        .then(() => console.log('Table Dropped: Games'))
        .catch(error => console.error(error.stack));
    await client.query(dropPlayers)
        .then(() => console.log('Table Dropped: Players'))
        .catch(error => console.error(error.stack));
};

const createAll = async() => {
    await client.query(createPlayers)
        .then(() => console.log('Table Created: Players'))
        .catch(error => console.error(error.stack));
    await client.query(createGames)
        .then(() => console.log('Table Created: Games'))
        .catch(error => console.error(error.stack));
    await client.query(createScores)
        .then(() => console.log('Table Created: Scores'))
        .catch(error => console.error(error.stack));
}

const run = async () => {
    await client.connect(err => {
        if (err) {
            console.error('Connection error', err.stack);
        } else {
            console.log('Connected')
        }
    });
    await dropAll();
    await createAll();
    await client.end();
}

run();