const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS Players`);
    db.run(`CREATE TABLE Players (
        player_id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL UNIQUE
    )`);
    db.run(`DROP TABLE IF EXISTS Games`);
    db.run(`CREATE TABLE Games (
        game_id INTEGER PRIMARY KEY NOT NULL
    )`);
    db.run(`DROP TABLE IF EXISTS Scores`);
    db.run(`CREATE TABLE Scores (
        score_id INTEGER PRIMARY KEY NOT NULL,
        game_id INTEGER NOT NULL,
        player_id INTEGER NOT NULL,
        hole_number INTEGER NOT NULL,
        score INTEGER NOT NULL,
        FOREIGN KEY (game_id) REFERENCES Games(game_id),
        FOREIGN KEY (player_id) REFERENCES Players(player_id)
    )`)
})