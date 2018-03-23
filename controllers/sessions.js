const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users/users.js');

// render login page - new session
router.get('/login', (req, res)=>{
  res.render('sessions/new.ejs');
});

// log user in
router.post('/', (req, res)=>{
  User.findOne({ // look up users's name
    name: req.body.name
  }, (err, foundUser)=>{
    if(!foundUser){
      res.send('user not found');
      res.redirect('/sessions/login');
      // return;
    } else if(bcrypt.compareSync(req.body.password, foundUser.password)){
      req.session.currentUser = foundUser;
      res.redirect('/home');
    } else { // change to module alert if time
      res.send('wrong password, try again');
    };
    console.log(req.session.currentUser);
  });
});

// log out - end sessions
router.delete('/', (req, res)=>{
  req.session.destroy(()=>{
    res.redirect('/home');
  });
});

module.exports = router;
