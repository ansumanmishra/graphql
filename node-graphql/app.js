const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const users = require('./data/users');
const products = require('./data/products');

const app = express();

// GraphQL Schema
const typeDefs = gql`
  type Query {
    users(name: String): [User]
    user(id: String!): User
    products: [Product]
    productsByUser(userId: ID!): [Product]
  }

  type Mutation {
    createUser(data: UserInput!): User!
    createProduct(data: ProductInput!): Product!
  }

  type User {
    id: ID!
    name: String!
    age: Int
    address: Address
  }

  type Product {
    id: ID!
    name: String!
    user: User!
  }

  type Address {
    city: String
    country: String
  }

  input UserInput {
    name: String!
    age: Int
  }

  input ProductInput {
    name: String!
    user: ID!
  }
`;

// resolvers
const resolvers = {
  Query: {
    users: (parent, { name }) => {
      if (name) {
        name = name.toLowerCase();
        return users.filter(user => user.name.toLowerCase().indexOf(name) > -1);
      }
      return users;
    },
    user: (_, { id }) => users.find(user => user.id === id),
    products: () => products,
    productsByUser: (_, { userId }) =>
      products.filter(product => product.user === userId)
  },
  Product: {
    user(parent, args, ctx, info) {
      return users.find(user => user.id === parent.user);
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

const server = new ApolloServer({ typeDefs, resolvers, playground: true });
server.applyMiddleware({ app });

app.listen('3000', () => {
  console.log('App is listening on port 3000...');
});
