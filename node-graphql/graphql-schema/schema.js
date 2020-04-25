const { gql } = require('apollo-server-express');

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
    price: Float!
    description: String!
  }

  type Address {
    city: String
    country: String
  }

  input AddressInput {
    city: String
    country: String
  }

  input UserInput {
    name: String!
    age: Int
    address: AddressInput
  }

  input ProductInput {
    name: String!
    user: ID!
    price: Float!
    description: String!
  }
`;

module.exports = typeDefs;
