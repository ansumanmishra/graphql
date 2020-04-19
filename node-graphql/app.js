const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const users = [
  {
    id: '1',
    name: 'Ansuman',
    age: 25,
    address: { city: 'bhubaneswar', country: 'india' }
  },
  {
    id: '2',
    name: 'Mishra',
    age: 26,
    address: { city: 'bern', country: 'switzerland' }
  }
];

const products = [
  {
    id: '1',
    name: 'multivitamin',
    user: '2'
  },
  {
    id: '2',
    name: 'protein bars',
    user: '2'
  }
];

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
    productsByUser: (_, { userId }) => {
      console.log(userId);
      return products.filter(product => product.user === userId);
    }
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
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen('3000', () => {
  console.log('App is listening on port 3000...');
});
