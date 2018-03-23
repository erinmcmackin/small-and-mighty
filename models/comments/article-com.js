// ============
// ARTICLE COMMENT MODEL - SCHEMA
// ============

const mongoose = require('mongoose');

const articleCommentSchema = new mongoose.Schema({
  comment: {type: String, required: true},
  author: Author.schema,
  article: Article.schema
});

const ArticleComment = mongoose.model('ArticleComment', articleCommentSchema);

module.exports = ArticleComment;
