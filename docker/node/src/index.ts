import {ApolloServer, makeExecutableSchema} from 'apollo-server'
import * as jwt from 'jsonwebtoken'

import resolvers from './resolvers'
import typeDefs from './schemas'

const CONFIG_AUTH = require('./config/authentication.json')

export const schema = makeExecutableSchema({typeDefs, resolvers})

const context = async ({req, connection}: {req: any, connection: any}) => {

  //subscription context
  if (connection) return connection.context

  //jwt情報を格納
  if (!req.headers.authorization) return {
    authenticationError: 'no token'
  }
  const token = req.headers.authorization.split(' ')[1]
  try {
    return {
      me: jwt.verify(token, CONFIG_AUTH.ACCESS_TOKEN_SECRET)
    }
  } catch (e) {
    console.log(e)
    return {
      authenticationError: e
    }
  }
}

const apolloServer = new ApolloServer({schema, context})

apolloServer.listen({port: 3000}).then(({url}) => {
  console.log(`Server listening on ${url}`)
})


