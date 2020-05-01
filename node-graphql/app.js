const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const db = require('./db');
const typeDefs = require('./graphql-schema/schema');
const resolvers = require('./graphql-resolver/resolver');

const app = express();

app.use('/images', express.static(path.join(__dirname, './uploads/')));

const server = new ApolloServer({ typeDefs, resolvers, playground: true });
server.applyMiddleware({ app });

app.listen('3000', () => {
  console.log('App is listening on port 3000...');
});
