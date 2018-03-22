const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  articles: [{type: String}],
  admin: {type: Boolean, default: false}
});


const User = mongoose.model('User', userSchema);
module.exports = User;
