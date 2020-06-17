import {ApolloServer, makeExecutableSchema} from 'apollo-server-micro'
import * as jwt from 'jsonwebtoken'
import {send} from 'micro'
import {get, post, router} from 'microrouter'

import resolvers from './resolvers'
import typeDefs from './schemas'

const CONFIG_AUTH = require('./config/authentication.json')

export const schema = makeExecutableSchema({typeDefs, resolvers})

//contextにjwt認証結果を格納
const context = async ({req}: {req: any}) => {
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

const graphqlPath = '/graphql'
const apolloServer = new ApolloServer({schema, context})
const graphqlHandler = apolloServer.createHandler({path: graphqlPath})

const app = router(
  get('/', () => 'hello, Micro'),
  get('/about', () => 'about page'),
  post(graphqlPath, graphqlHandler),
  get(graphqlPath, graphqlHandler),
  (_, res) => send(res, 404, 'Not Found'),
)

export default app