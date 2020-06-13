const {ApolloServer, gql} = require('apollo-server-micro')

const typeDefs = gql`
    type Query {
        sayHello(name: String): String
    }
`

const resolvers = {
  Query: {
    sayHello: (parent, args, context) => {
      return `Hello ${args.name}!`
    },
  },
}

console.log(resolvers)

const apolloServer = new ApolloServer({typeDefs, resolvers})
module.exports = apolloServer.createHandler()