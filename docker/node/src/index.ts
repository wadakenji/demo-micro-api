import {ApolloServer} from 'apollo-server-micro'
import * as jwt from 'jsonwebtoken'

import resolvers from './resolvers'
import typeDefs from './schemas'

const CONFIG_AUTH = require('./config/authentication.json')

const context = async ({req}: {req: any}) => {
  if (!req.headers['authorization']) return {
    authenticationError: 'no token'
  }
  const token = req.headers['authorization'].split(' ')[1]
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

const apolloServer = new ApolloServer({typeDefs, resolvers, context})
module.exports = apolloServer.createHandler()