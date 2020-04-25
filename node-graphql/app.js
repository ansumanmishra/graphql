const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const db = require('./db');
const typeDefs = require('./graphql-schema/schema');
const resolvers = require('./graphql-resolver/resolver');

const app = express();

const server = new ApolloServer({ typeDefs, resolvers, playground: true });
server.applyMiddleware({ app });

app.listen('3000', () => {
  console.log('App is listening on port 3000...');
});
