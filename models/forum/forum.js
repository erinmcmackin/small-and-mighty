const mongoose = require('mongoose');
const Author = require('../users/users.js');
const forumComment = require('../comments/forum-com.js');

const forumSchema = new mongoose.Schem({
  title: {type: String, required: true},
  description: {type: String, required: true},
  author: Author.schema,
  comments: [forumComment.schema]
});

const Post = mongoose.model('Post', forumSchema);

module.exports = Post;
