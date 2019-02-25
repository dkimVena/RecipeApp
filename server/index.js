const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');
const keys = require('./config/keys');

const port = process.env.PORT || 8000;
const publicPath = path.join(__dirname, '..', 'dist');
require('dotenv').config();

const app = express();

const MONGO_URI = keys.mongooseURI;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(publicPath));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'alskjdflkasjdflkasjdflkjsdss@sdf',
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
