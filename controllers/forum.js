// ============
// FORUM CONTROLLER
// ============

const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../models/users/users.js');
const Post = require('../models/forum/forum.js');
const forumComment = require('../models/comments/forum-com.js');
const seedPosts = require('../models/forum/seed-forum.js')

// ROUTES

router.get('/', (req, res)=>{
  Post.find({}, (err, allPosts)=>{
    res.render('forum/index.ejs', {
      currentUser: req.session.currentUser,
      posts: allPosts
    });
  });
});

// seed data
router.get('/seed', (req, res)=>{
  User.findOne({name: 'Romy'}, (err, foundUser)=>{
    // added forEach to get around the schema (without this, it creates an array in the articles array, which violates the schema)
    seedPosts.forEach((post)=>{
      Post.create(post, (err, createdPost)=>{
        foundUser.posts.push(createdPost);
        foundUser.save();
      });
    });
    // foundUser.save((err, data)=>{
      res.redirect('/home');
    // });
  });
});

// render new post page
router.get('/new', (req, res)=>{
  if(req.session.currentUser){
    res.render('forum/new.ejs', {
      currentUser: req.session.currentUser
    });
  } else {
    res.redirect('/sessions/login');
  };
});

// post new post
router.post('/', (req, res)=>{
  Post.create(req.body, (err, createdPost)=>{
    User.findOne({name: req.session.currentUser.name}, (err, foundUser)=>{
      foundUser.posts.push(createdPost);
      foundUser.save((err, data)=>{
        res.redirect('/forum');
      });
    });
  });
});

// show route
router.get('/:id', (req, res)=>{
  Post.findById(req.params.id, (err, foundPost)=>{
    // console.log(req.params.id.toString());
    User.findOne({'posts._id':req.params.id}, (err, foundUser)=>{
      // if else statement to create a valid author statement in the ejs file
      if(foundUser){
        // console.log(foundUser);
        res.render('forum/show.ejs', {
          post: foundPost,
          currentUser: req.session.currentUser,
          author: foundUser,
          comments: foundPost.comments,
          postId: req.params.id
        });
      } else {
        // console.log('author not found');
        res.render('forum/show.ejs', {
          post: foundPost,
          currentUser: req.session.currentUser,
          author: false,
          comments: foundPost.comments,
          postId: req.params.id
        });
      };
    });
  });
});

// render new comment page
router.get('/:id/new-comment', (req, res)=>{
  if(req.session.currentUser){
    res.render('forum-comments/new.ejs', {
      currentUser: req.session.currentUser,
      postId: req.params.id
    });
  } else {
    res.redirect('/sessions/login');
  };
});

// post new comment
router.post('/:id', (req, res)=>{
  forumComment.create(req.body, (err, createdComment)=>{
    console.log(createdComment);
    Post.findOne({_id:req.body.postId}, (err, foundPost)=>{
      console.log(foundPost);
      foundPost.comments.push(createdComment);
      foundPost.save((err, data)=>{
        User.findOne({name: req.session.currentUser.name}, (err, foundUser)=>{
          console.log(foundUser);
          foundUser.posts.push(createdComment);
          foundUser.save((err, data)=>{
            res.render('forum/show.ejs', {
              post: foundPost,
              currentUser: req.session.currentUser,
              author: false,
              comments: foundPost.comments,
              postId: req.params.id
            });
          });
        });
      });
    });
  });
});

module.exports = router;
