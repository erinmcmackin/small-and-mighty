const express = require('express');
const router = express.Router();
const Article = require('../models/articles.js');
const seed = require('../models/seed-articles.js');


// ROUTES

// render index/home page
router.get('/', (req, res)=>{
  Article.find({}, (err, allArticles)=>{
    res.render('index.ejs', {
      articles: allArticles
    });
  });
});

// post new article content
router.post('/', (req, res)=>{
  Article.create(req.body, (err, createdArticle)=>{
    console.log(createdArticle);
    res.redirect('/home');
  });
});

// render new article page
router.get('/new', (req, res)=>{
  res.render('new.ejs');
});

// json route to view db
router.get('/json', (req, res)=>{
  Article.find({}, (err, allArticles)=>{
    res.send(allArticles);
  });
});

// seed data
router.get('/seed', (req, res)=>{
  Article.create(seed, (err, createdArticles)=>{
    console.log(createdArticles);
    // redirect to index
    res.redirect('/');
  });
});


module.exports = router;
