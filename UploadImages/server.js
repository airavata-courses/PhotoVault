const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const passport = require('passport');
const cors = require('cors');

//DB connection
const db = require('./config/keys').mongoURI;

//Connect to DB
mongoose
  .connect(db)
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

const app = express();

app.get('/', (req, res) => res.send('Hello World!!!!!!!!!!!'));
app.get('/test', (req, res) => res.json({ msg: 'hello' }));
//Use routes

const port = 5000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Passport middleware
app.use(passport.initialize());

//passport COnfig
require('./config/passport')(passport);

// parse application/json
app.use(bodyParser.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use(cors());

module.exports = app;
