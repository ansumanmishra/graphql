//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  age: Number,
  address: { city: String, country: String }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
