//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  user: String,
  price: Number,
  description: {
    type: String,
    minlength: 5
  },
  image: String
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
