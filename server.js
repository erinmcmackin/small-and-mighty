const express = require('express');
const app = express();
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/small_mighty';
const db = mongoose.connection;

mongoose.connect(mongoURI);

// MIDDLEWARE
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));

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

app.listen(3000, ()=>{
  console.log('I\'m listening...');
});
