const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const search = require('./routes/api/fileOps');
const uploadImg = require('./routes/api/uploadImg');
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
app.use(cors({ origin: '*' }));
app.use(cors());

// const whitelist = ['http://149.165.156.42:3000', 'http://localhost:3000'];
// const corsOptions = {
//   origin: function(origin, callback) {
//     console.log(origin);
//     console.log('origin if');
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       console.log('origin else');
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   enablePreflight: true
// };

// app.use(cors(corsOptions));
//app.options('*', cors(corsOptions));

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
// app.use(cors());

//app.options('*', cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use('/api/users', users);
app.use('/api/fileOps', search);
app.use('/api/uploadImg', uploadImg);

// Then use it before your routes are set up:

module.exports = app;
