// ============
// USER MODEL - SCHEMA
// ============

const mongoose = require('mongoose');
const Article = require('../articles/articles.js');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  // articles: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Article'
  // }],
  admin: {type: Boolean, default: false},
  articles: [mongoose.Schema.Types.Mixed]
});


const User = mongoose.model('User', userSchema);
module.exports = User;
