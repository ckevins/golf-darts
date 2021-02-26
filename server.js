const express = require('express');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const cors = require('cors');
const morgan = require('morgan');
const postgresApiRouter = require('./postgres-api/postgres-api');
const sqliteApiRouter = require('./sqlite-api/sqlite-api');

const app = express();

const PORT = process.env.PORT || 4000;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


app.use(bodyParser.json());
app.use(errorhandler());
app.use(cors());
app.use(morgan('dev'));

app.use('/postgresApi', postgresApiRouter);
app.use('/sqliteApi', sqliteApiRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}.`);
});

module.exports = app;