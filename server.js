const express = require('express');
const app = express();
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/logs';
const db = mongoose.connection;

mongoose.connect(mongoURI);

// checking for connection to mongo
db.on('connected', ()=>{
  console.log('mongo connected: ', mongoURI);
});


// ROUTES
app.get('/', (req, res)=>{
  res.render('index.ejs');
});


app.listen(3000, ()=>{
  console.log('I\'m listening...');
});
