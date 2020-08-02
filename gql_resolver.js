// 2020, 8/02, pm 9:30
// GQL Resolver

const {gql} = require('apollo-server-express');


const Mutation = require('./mutation');
const Query = require('./query');

const resolvers = {
    Query: {
        ...Query
    },
    Mutation: {
        ...Mutation
    }
};

module.exports = resolvers;
