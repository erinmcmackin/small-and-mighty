const express = require('express');
const router = express.Router();
const User = require('../models/users/users.js');
const seed = require('../models/users/seed-users.js');
const bcrypt = require('bcrypt');

// new user page
router.get('/new', (req, res)=>{
  res.render('users/new.ejs');
});

// create user
router.post('/', (req, res)=>{
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser)=>{
    console.log(createdUser);
    res.redirect('/home');
  });
});

// seed users
router.get('/seed', (req, res)=>{
  User.create(seed, (err, newUsers)=>{
    console.log(newUsers);
    res.redirect('/home');
  });
});

module.exports = router;
