const { ApolloServer } = require('apollo-server');
const { Resolvers, Schemas } = require('../server/schemas/index')

const resolver = Resolvers()

// Server
const server = new ApolloServer({ typeDefs: Schemas, resolvers: resolver.resolver });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });