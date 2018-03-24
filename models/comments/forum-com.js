// ============
// FORUM COMMENT MODEL - SCHEMA
// ============

const mongoose = require('mongoose');

const forumCommentSchema = new mongoose.Schema({
  comment: {type: String, required: true},
  postId: {type: String}
}, {timestamps: true});

const forumComment = mongoose.model('forumComment', forumCommentSchema);

module.exports = forumComment;
