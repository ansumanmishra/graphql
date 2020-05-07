const path = require('path');
const { createWriteStream, unlink } = require('fs');

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
      if (filename) {
        await new Promise(res =>
          createReadStream()
            .pipe(
              createWriteStream(path.join(__dirname, '../uploads/', filename))
            )
            .on('close', res)
        );
      }

      const data = args.data;
      const newProduct = new Product({
        name: data.name,
        user: data.user,
        price: data.price,
        description: data.description,
        image: filename
      });
      try {
        const product = await newProduct.save();
        return product;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteProduct: async (parent, args, ctx, info) => {
      const _id = args.data.id;
      try {
        const deleted = await Product.findByIdAndRemove(_id);
        return deleted;
      } catch (err) {
        throw new Error(err);
      }
    },
    editProduct: async (parent, args, ctx, info) => {
      const file = await args.data.image;
      const { createReadStream, filename, mimetype, encoding } = file;
      // Get current image and delete
      const product = await Product.findById(args.id);
      const productImage = product.image;

      if (filename) {
        // Delete image from folder
        if (productImage) {
          const imagePath = path.join(__dirname, '../uploads/', productImage);
          try {
            unlink(imagePath);
          } catch (err) {
            console.log('Product image could not be deleted');
          }
        }

        await new Promise(res =>
          createReadStream()
            .pipe(
              createWriteStream(path.join(__dirname, '../uploads/', filename))
            )
            .on('close', res)
        );
      }
      try {
        const newProduct = {
          name: args.data.name,
          user: args.data.user,
          price: args.data.price,
          description: args.data.description,
          image: filename || productImage
        };

        const updateProduct = await Product.findByIdAndUpdate(
          args.id,
          newProduct,
          { new: true }
        );
        return updateProduct;
      } catch (err) {
        throw new Error(err);
      }
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
