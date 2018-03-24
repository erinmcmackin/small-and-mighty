// ============
// USER MODEL - SCHEMA
// ============

const mongoose = require('mongoose');
const Article = require('../articles/articles.js');
const forumComment = require('../comments/forum-com.js');
const Post = require('../forum/forum.js');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  admin: {type: Boolean, default: false},
  articles: [Article.schema],
  posts: [Post.schema],
  forumComments: [forumComment.schema]
});


const User = mongoose.model('User', userSchema);
module.exports = User;
