//const users = require('../data/users');
const products = require('../data/products');
const User = require('../model/user.model');

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
    products: () => products,
    productsByUser: (_, { userId }) =>
      products.filter(product => product.user === userId)
  },
  Product: {
    async user(parent, args, ctx, info) {
      const user = await User.findById(parent.user);
      return user;
    }
  },
  Mutation: {
    createUser: (_, { data }) => {
      users.push({
        id: '3',
        name: data.name,
        age: data.age
      });
      return data;
    },
    createProduct: (parent, args, ctx, info) => {
      const data = args.data;
      products.push({
        id: Math.random(),
        name: data.name,
        user: data.user
      });
      return data;
    }
  }
};

module.exports = resolvers;
