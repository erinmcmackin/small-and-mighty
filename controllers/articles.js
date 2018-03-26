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

// render index page
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
    User.findOne({name:req.body.author}, (err, foundUser)=>{
      if(foundUser){
        // if author is a user, add to their articles array
        foundUser.articles.push(createdArticle);
        foundUser.save((err, data)=>{
          res.redirect('/');
        });
      } else {
        res.redirect('/');
      };
    });
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
    // added forEach to get around the schema (without this, it creates an array in the articles array, which violates the schema)
    seed.forEach((article)=>{
      Article.create(article, (err, createdArticle)=>{
        foundUser.articles.push(createdArticle);
        foundUser.save();
      });
    });
    // foundUser.save((err, data)=>{
      res.redirect('/');
    // });
  });
});

// show route
router.get('/:id', (req, res)=>{
  Article.findById(req.params.id, (err, foundArticle)=>{
    // console.log(req.params.id.toString());
    User.findOne({'articles._id':req.params.id}, (err, foundUser)=>{
      // if else statement to create a valid author statement in the ejs file
      if(foundUser){
        console.log(foundUser);
        res.render('articles/show.ejs', {
          article: foundArticle,
          currentUser: req.session.currentUser,
          author: foundUser
        });
      } else {
        console.log('author not found');
        res.render('articles/show.ejs', {
          article: foundArticle,
          currentUser: req.session.currentUser,
          author: false
        });
      };
    });
  });
});

// show edit page
router.get('/:id/edit', (req, res)=>{
  Article.findById(req.params.id, (err, foundArticle)=>{
    User.findOne({'articles._id': req.params.id}, (err, foundAuthor)=>{
      // if else statement to create a valid author statement in the ejs file
      if(foundAuthor){
        console.log(foundAuthor);
          res.render('articles/edit.ejs', {
          article: foundArticle,
          currentUser: req.session.currentUser,
          author: foundAuthor
        });
      } else {
        console.log('author not found');
        res.render('articles/edit.ejs', {
          article: foundArticle,
          currentUser: req.session.currentUser,
          author: foundArticle.author
        });
      };
    });
  });
});

// make edits to article
router.put('/:id', (req, res)=>{
  Article.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, foundArticle)=>{
    User.findOne({'articles._id': req.params.id}, (err, foundUser)=>{
      // don't allow userse to edit articles that don't have an author that is a current user
      if(!foundUser){
        // if a user wasn't found with the article, check for all users
        User.findOne({name: req.body.author}, (err, foundUserName)=>{
          if(foundUserName){
            foundUserName.articles.push(foundArticle);
            foundUserName.save((err, data)=>{
              res.redirect('/' + req.params.id);
            });
          } else {
            console.log('Please choose a current user'); // update this to an alert if time
            res.redirect('/' + req.params.id);
          };
        });
      } else if(foundUser.name !== req.body.author){
        // if the author changes, edit the user profiles
        foundUser.articles.id(req.params.id).remove();
        foundUser.save((err, savedFoundUser)=>{
          User.findOne({name: req.body.author}, (err, newAuthor)=>{
            newAuthor.articles.push(foundArticle);
            newAuthor.save((err, savedNewAuthor)=>{
              res.redirect('/' + req.params.id);
            });
          });
        });
      } else if (foundUser.name === req.body.author){
        // if the user doesn't change, update the current author's profile with the edited article
        foundUser.articles.id(req.params.id).remove();
        foundUser.articles.push(foundArticle);
        foundUser.save((err, data)=>{
          res.redirect('/' + req.params.id);
        });
      };
    });
  });
});

// delete article
router.delete('/:id', (req, res)=>{
  Article.findByIdAndRemove(req.params.id, (err, data)=>{
    User.findOne({'articles._id':req.params.id}, (err, foundUser)=>{
      if(foundUser){
        foundUser.articles.id(req.params.id).remove();
        foundUser.save((err, data)=>{
          res.redirect('/');
        });
      } else {
        res.redirect('/');
      };
    });
  });
});



module.exports = router;
