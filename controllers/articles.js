// ============
// ARTICLE CONTROLLER
// ============

const express = require('express');
const router = express.Router();
const Article = require('../models/articles/articles.js');
const seed = require('../models/articles/seed-articles.js');
const session = require('express-session');
const User = require('../models/users/users.js');


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
  res.render('articles/new.ejs', {
    currentUser: req.session.currentUser
  });
});

// json route to view db
router.get('/json', (req, res)=>{
  Article.find({}, (err, allArticles)=>{
    res.send(allArticles);
  });
});

// seed data
router.get('/seed', (req, res)=>{
  User.findOne({name: 'Erin'}, (err, foundUser)=>{
    seed.forEach((article)=>{
      Article.create(article, (err, createdArticle)=>{
        foundUser.articles.push(createdArticle);
        foundUser.save();
      });
    });
    // foundUser.save((err, data)=>{
      res.redirect('/home');
    // });
  });
});

// show route
router.get('/:id', (req, res)=>{
  Article.findById(req.params.id, (err, foundArticle)=>{
    // console.log(req.params.id.toString());
    User.findOne({'articles._id':req.params.id}, (err, foundUser)=>{
      console.log(foundUser);
      res.render('articles/show.ejs', {
        article: foundArticle,
        currentUser: req.session.currentUser,
        author: foundUser
      });
    });
  });
});

// show edit page
router.get('/:id/edit', (req, res)=>{
  Article.findById(req.params.id, (err, foundArticle)=>{
    res.render('articles/edit.ejs', {
      article: foundArticle,
      currentUser: req.session.currentUser
    });
  });
});

// make edits to article
router.put('/:id', (req, res)=>{
  Article.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, foundArticle)=>{
    res.render('articles/show.ejs', {
      article: foundArticle,
      currentUser: req.session.currentUser
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
