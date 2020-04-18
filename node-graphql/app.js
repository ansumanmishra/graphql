const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const users = [
    {id: "1", name: 'Ansuman', age: 25},
    {id: "2", name: 'Mishra', age: 26}
];

// GraphQL Schema
const typeDefs = gql`
    type Query {
        users: [User]
        user(id: String!): User
    }

    type Mutation {
        createUser(data: UserInput!): User!
    }

    type User {
        id: ID!,
        name: String!
        age: Int
    }

    input UserInput {
        name: String!
        age: Int
    }
`;

// resolvers
const resolvers = {
    Query: {
        users: () => users,
        user: (_, {id}) => users.find( user => user.id === id)
    },
    Mutation: {
        createUser: (_, {data}) => {
            users.push({
                id: "3",
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