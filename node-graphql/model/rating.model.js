//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

const RatingSchema = new Schema({
  rating: Number,
  user: String,
  product: String
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;
