const express = require('express');
const app = express();
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/logs';
const db = mongoose.connection;

mongoose.connect(mongoURI);

db.on('connected', ()=>{
  console.log('mongo connected: ', mongoURI);
})

app.listen(3000, ()=>{
  console.log('I\'m listening...');
});
