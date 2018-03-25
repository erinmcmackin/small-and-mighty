const express = require('express');
const router = express.Router();
const User = require('../models/users/users.js');
const seed = require('../models/users/seed-users.js');
const bcrypt = require('bcrypt');

// new user page
router.get('/new', (req, res)=>{
  res.render('users/new.ejs', {
    currentUser: req.session.currentUser
  });
});

// create user
router.post('/', (req, res)=>{
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser)=>{
    console.log(createdUser);
    // after user is created, make them current user so they don't have to log in
    req.session.currentUser = createdUser;
    res.redirect('/home');
  });
});

// seed users
router.get('/seed', (req, res)=>{
  // encrypt seeded passwords
  seed.forEach((user)=>{
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });
  User.create(seed, (err, newUsers)=>{
    console.log(newUsers);
    res.redirect('/home');
  });
});

// json route to view db
router.get('/json', (req, res)=>{
  User.find({}, (err, allUsers)=>{
    res.send(allUsers);
  });
});

module.exports = router;
