const path = require('path');
const { createWriteStream } = require('fs');

const User = require('../model/user.model');
const Product = require('../model/product.model');
const Rating = require('../model/rating.model');

const resolvers = {
  Query: {
    users: async (parent, { name }) => {
      if (name) {
        try {
          let users = await User.find({ name });
          return users;
        } catch (err) {
          console.error(err);
        }
      }
      try {
        let users = await User.find({});
        return users;
      } catch (err) {
        console.error(err);
      }
    },
    user: async (_, { id }) => {
      const user = await User.findById(id);
      return user;
    },
    products: async () => {
      const products = await Product.find({});
      return products;
    },
    productsByUser: async (_, { userId }) => {
      const products = await Product.find({ user: userId });
      return products;
    }
  },
  Product: {
    async user(parent, args, ctx, info) {
      const user = await User.findById(parent.user);
      return user;
    },
    async ratings(parent, args, ctx, info) {
      const ratings = await Rating.find({ product: parent.id });
      return ratings;
    }
  },
  Mutation: {
    createUser: async (_, { data }) => {
      const newuser = new User({
        name: data.name,
        age: data.age,
        address: data.address
      });
      const user = await newuser.save();
      return user;
    },
    createProduct: async (parent, args, ctx, info) => {
      const file = await args.data.image;
      const { createReadStream, filename, mimetype, encoding } = file;
      await new Promise(res =>
        createReadStream()
          .pipe(
            createWriteStream(path.join(__dirname, '../uploads/', filename))
          )
          .on('close', res)
      );

      const data = args.data;
      const newProduct = new Product({
        name: data.name,
        user: data.user,
        price: data.price,
        description: data.description,
        image: filename
      });
      const product = await newProduct.save();
      return product;
    },
    createRating: async (parent, args, ctx, info) => {
      const data = args.data;
      const newRating = new Rating({
        rating: data.rating,
        product: data.product,
        user: data.user
      });

      const rating = await newRating.save();
      return rating;
    }
  }
};

module.exports = resolvers;
