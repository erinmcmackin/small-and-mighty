const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/small_mighty';
const db = mongoose.connection;

mongoose.connect(mongoURI);

const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

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
app.use('/home', articlesController);

app.listen(port, ()=>{
  console.log('I\'m listening on port ' + port);
});
