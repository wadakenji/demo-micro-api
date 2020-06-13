const {ApolloServer, gql} = require('apollo-server-micro')
const {staff} = require('./db/models')

const typeDefs = gql`
    type Staff {
        id: ID!
        facilityId: Int
        firstName: String
        lastName: String
        facilityAdmin: Boolean
        corporationAdmin: Boolean
        createdAt: String
        updatedAt: String
    }
    type Query {
        sayHello(name: String): String
        getStaffs: [Staff]
    }
`

const resolvers = {
  Query: {
    sayHello: (_parent: any, args: {name: string}) => {
      return `Hello ${args.name}!`
    },
    getStaffs: async () => {
      return staff.findAll()
    }
  },
}

const apolloServer = new ApolloServer({typeDefs, resolvers})
module.exports = apolloServer.createHandler()