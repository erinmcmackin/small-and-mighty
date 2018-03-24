// ============
// FORUM MODEL - SCHEMA
// ============

const mongoose = require('mongoose');
const forumComment = require('../comments/forum-com.js');

const forumSchema = new mongoose.Schema({
  question: {type: String, required: true},
  description: {type: String, required: true},
  comments: [forumComment.schema]
}, {timestamps: true});

const Post = mongoose.model('Post', forumSchema);

module.exports = Post;
