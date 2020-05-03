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
    createRating(data: RatingInput): Rating!
    deleteProduct(data: ProductDeleteInput!): Product
    editProduct(data: ProductInput!, id: ID!): Product
  }

  type Rating {
    rating: Int
    product: ID
    user: ID
  }

  input RatingInput {
    rating: Int!
    product: ID!
    user: ID!
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
    image: String
    ratings: [Rating]
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
    image: Upload
  }

  input ProductDeleteInput {
    id: ID!
  }
`;

module.exports = typeDefs;
