// ============
// COMMENTS CONTROLLER
// ============

const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../models/users/users.js');
const Post = require('../models/forum/forum.js');
const forumComment = require('../models/comments/forum-com.js');
const seedPosts = require('../models/forum/seed-forum.js')

// ROUTES

// render new post page
router.get('/new', (req, res)=>{
  if(req.session.currentUser){
    res.render('forum-comments/new.ejs', {
      currentUser: req.session.currentUser
    });
  } else {
    res.redirect('/sessions/login');
  };
});

// post new comment
router.post('/', (req, res)=>{
  forumComment.create(req.body, (err, createdComment)=>{
    Post.findOneAndUpdate({_id:req.params.id}, (err, foundPost)=>{

    })
    User.findOne({name: req.session.currentUser.name}, (err, foundUser)=>{
      foundUser.posts.push(createdComment);
      foundUser.save((err, data)=>{
        res.redirect('/forum');
      });
    });
  });
});


module.exports = router;
