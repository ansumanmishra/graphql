const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const db = require('./db');
const typeDefs = require('./graphql-schema/schema');
const resolvers = require('./graphql-resolver/resolver');
const User = require('./model/user.model');

// create user
const newuser = new User({
  name: 'Ansuman',
  age: 25,
  address: { city: 'delhi', country: 'india' }
});
// newuser.save().then(res => {
//   console.log(res);
// });

const users = require('./data/users');
const products = require('./data/products');

const app = express();

const server = new ApolloServer({ typeDefs, resolvers, playground: true });
server.applyMiddleware({ app });

app.listen('3000', () => {
  console.log('App is listening on port 3000...');
});
