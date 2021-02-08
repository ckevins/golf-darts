const express = require('express');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const cors = require('cors');
const morgan = require('morgan');
const apiRouter = require('./api/api');

const app = express();

const PORT = 4000;

app.use(bodyParser.json());
app.use(errorhandler());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}.`);
});

module.exports = app;