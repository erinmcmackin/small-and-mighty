const express = require('express');
const router = express.Router();
const Article = require('../models/articles/articles.js');
const seed = require('../models/articles/seed-articles.js');


// ROUTES

// render index/home page
router.get('/', (req, res)=>{
  Article.find({}, (err, allArticles)=>{
    res.render('index.ejs', {
      articles: allArticles,
      currentUser: req.session.currentUser
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
  res.render('articles/new.ejs');
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
    res.redirect('/home');
  });
});

// show route
router.get('/:id', (req, res)=>{
  Article.findById(req.params.id, (err, foundArticle)=>{
    res.render('articles/show.ejs', {
      article: foundArticle
    });
  });
});

// show edit page
router.get('/:id/edit', (req, res)=>{
  Article.findById(req.params.id, (err, foundArticle)=>{
    res.render('articles/edit.ejs', {
      article: foundArticle
    });
  });
});

// make edits to article
router.put('/:id', (req, res)=>{
  Article.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, foundArticle)=>{
    res.render('articles/show.ejs', {
      article: foundArticle
    });
  });
});

// delete article
router.delete('/:id', (req, res)=>{
  Article.findByIdAndRemove(req.params.id, (err, data)=>{
    res.redirect('/home');
  });
});



module.exports = router;
