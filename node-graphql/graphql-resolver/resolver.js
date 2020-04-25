const User = require('../model/user.model');
const Product = require('../model/product.model');

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
      const data = args.data;
      const newProduct = new Product({
        name: data.name,
        user: data.user,
        price: data.price,
        description: data.description
      });
      const product = await newProduct.save();
      return product;
    }
  }
};

module.exports = resolvers;
