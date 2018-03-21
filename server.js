const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Article = require('./models/articles.js');
const seed = require('./models/seed-articles.js');

const mongoURI = 'mongodb://localhost:27017/small_mighty';
const db = mongoose.connection;

mongoose.connect(mongoURI);

// MIDDLEWARE
app.use(express.static('public'));

// checking for connection to mongo
db.on('connected', ()=>{
  console.log('mongo connected: ', mongoURI);
});

// log errors
db.on('error', (err)=>{
  console.log(err.message + ' is Mongod running?');
});


// ROUTES
// render index/home page
app.get('/', (req, res)=>{
  Article.find({}, (err, allArticles)=>{
    res.render('index.ejs', {
      articles: allArticles
    });
  });
});

// render new article page
app.get('/new', (req, res)=>{
  res.render('new.ejs');
});

// json route to view db
app.get('/json', (req, res)=>{
  Article.find({}, (err, allArticles)=>{
    res.send(allArticles);
  });
});

// seed data
app.get('/seed', (req, res)=>{
  Article.create(seed, (err, createdArticles)=>{
    console.log(createdArticles);
    // redirect to index
    res.redirect('/');
  });
});

app.listen(3000, ()=>{
  console.log('I\'m listening...');
});
