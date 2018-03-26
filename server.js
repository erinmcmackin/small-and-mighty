const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcrypt');
const User = require('./models/users/users.js');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/small_mighty';
const db = mongoose.connection;

mongoose.connect(mongoURI);

const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'unicornsarereal',
  resave: false,
  saveUninitialized: false
}));

// checking for connection to mongo
db.on('connected', ()=>{
  console.log('mongo connected: ', mongoURI);
});

// log errors
db.on('error', (err)=>{
  console.log(err.message + ' is Mongod running?');
});

// CONTROLLERS
const articlesController = require('./controllers/articles.js');
app.use('/', articlesController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const forumController = require('./controllers/forum.js');
app.use('/forum', forumController);

// const forumCommentController = require('./controllers/forum-comments.js');
// app.use('/forum/comments', forumCommentController);

app.listen(port, ()=>{
  console.log('I\'m listening on port ' + port);
});
