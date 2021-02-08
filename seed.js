const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

//to make this better, I should first check to make sure that these tables actually exist before INSERTing data

db.serialize(() => {
    db.run(`INSERT INTO Players (name) 
    VALUES 
    ('Cody E.'),
    ('Tanner E.'),
    ('Meg H.')`);
    db.run(`INSERT INTO Games (date)
    VALUES 
    (datetime('now')),
    (datetime('now')),
    (datetime('now'))`
    );
    db.run(`INSERT INTO Scores (game_id, player_id, hole_number, score)
        VALUES 
        (1, 1, 1, 4),
        (1, 1, 2, 4),
        (1, 1, 3, 1),
        (1, 1, 4, 3),
        (1, 1, 5, 5),
        (1, 1, 6, 6),
        (1, 1, 7, 4),
        (1, 1, 8, 4),
        (1, 1, 9, 3),
        (1, 1, 10, 5),
        (1, 1, 11, 1),
        (1, 1, 12, 2),
        (1, 1, 13, 6),
        (1, 1, 14, 4),
        (1, 1, 15, 5),
        (1, 1, 16, 1),
        (1, 1, 17, 3),
        (1, 1, 18, 1),
        (1, 3, 1, 1),
        (1, 3, 2, 3),
        (1, 3, 3, 4),
        (1, 3, 4, 1),
        (1, 3, 5, 1),
        (1, 3, 6, 5),
        (1, 3, 7, 4),
        (1, 3, 8, 5),
        (1, 3, 9, 2),
        (1, 3, 10, 6),
        (1, 3, 11, 4),
        (1, 3, 12, 3),
        (1, 3, 13, 4),
        (1, 3, 14, 5),
        (1, 3, 15, 3),
        (1, 3, 16, 4),
        (1, 3, 17, 4),
        (1, 3, 18, 4),
        (1, 2, 1, 5),
        (2, 2, 2, 4),
        (2, 2, 3, 5),
        (2, 2, 4, 3),
        (2, 2, 5, 2),
        (2, 2, 6, 4),
        (2, 2, 7, 5),
        (2, 2, 8, 1),
        (2, 2, 9, 3),
        (2, 2, 10, 4),
        (2, 2, 11, 6),
        (2, 2, 12, 6),
        (2, 2, 13, 4),
        (2, 2, 14, 4),
        (2, 2, 15, 2),
        (2, 2, 16, 1),
        (2, 2, 17, 5),
        (2, 2, 18, 3),
        (3, 1, 1, 5),
        (3, 1, 2, 4),
        (3, 1, 3, 3),
        (3, 1, 4, 2),
        (3, 1, 5, 4),
        (3, 1, 6, 1),
        (3, 1, 7, 5),
        (3, 1, 8, 2),
        (3, 1, 9, 3),
        (3, 1, 10, 4),
        (3, 1, 11, 5),
        (3, 1, 12, 4),
        (3, 1, 13, 2),
        (3, 1, 14, 1),
        (3, 1, 15, 1),
        (3, 1, 16, 1),
        (3, 1, 17, 5),
        (3, 1, 18, 5)
        `);
});