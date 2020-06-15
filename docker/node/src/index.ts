import {ApolloServer, gql, AuthenticationError} from 'apollo-server-micro'
import models from './db/models'
import * as jwt from 'jsonwebtoken'

const {staff, login} = models

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
    type Tokens {
        accessToken: String
    }
    type Me {
        id: Int
    }
    type Query {
        sayHello(name: String): String
        getStaffs: [Staff]
        getMe: Me
    }
    type Mutation {
        login(username: String!
            password: String!): Tokens
    }
`

const resolvers = {
  Query: {
    sayHello: (_parent: any, args: {name: string}) => {
      return `Hello ${args.name}!`
    },
    getStaffs: async () => {
      return staff.findAll()
    },
    getMe: async (_parent: any, _args: any, context: any) => {
      if (!context.me) throw new AuthenticationError(context.authenticationError)
      return context.me
    }
  },
  Mutation: {
    login: async (_parent: any, args: {username: string, password: string}) => {
      const staffRow = await staff.findOne({
        include: [{
          model: login,
          where: {username: args.username}
        }]
      })

      if (!staffRow) throw new AuthenticationError('invalid username')

      const {id, login: {password}} = staffRow

      if (password !== args.password) throw new AuthenticationError('invalid password')

      const accessToken = jwt.sign(
        {
          id: id,
        }, 'dummysecret'
      )

      return {accessToken}
    }
  }
}

const context = async ({req}: {req: any}) => {
  if (!req.headers['authorization']) return {
    authenticationError: 'no token'
  }
  const token = req.headers['authorization'].split(' ')[1]
  try {
    return {
      me: jwt.verify(token, 'dummysecret')
    }
  } catch (e) {
    console.log(e)
    return {
      authenticationError: e
    }
  }
}

const apolloServer = new ApolloServer({typeDefs, resolvers, context})
module.exports = apolloServer.createHandler()