const express = require('express');
const router = express.Router();
const User = require('../models/users/users.js');
const seed = require('../models/users/seed-users.js');
const bcrypt = require('bcrypt');

// new user page
router.get('/new', (req, res)=>{
  res.render('users/new.ejs');
});


module.exports = router;
