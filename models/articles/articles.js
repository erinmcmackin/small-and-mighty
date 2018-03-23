// ============
// ARTICLE MODEL - SCHEMA
// ============

const mongoose = require('mongoose');
const User = require('../users/users.js');

const articleSchema = new mongoose.Schema({
title: {type: String, required: true},
body: {type: String, required: true},
img: {type: String, required: true}
}, {timestamps: true});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
