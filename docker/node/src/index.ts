import {ApolloServer, makeExecutableSchema, gql} from 'apollo-server'
import {AuthenticationError} from 'apollo-server-errors'
import * as jwt from 'jsonwebtoken'

import resolvers from './resolvers'
import typeDefs from './schemas'

const CONFIG_AUTH = require('./config/authentication.json')

export const schema = makeExecutableSchema({typeDefs, resolvers})

const verifyToken = (authorizationHeader: string) => {
  if (!authorizationHeader) return {
    authenticationError: 'no token'
  }
  const token = authorizationHeader.split(' ')[1]
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

const subscriptions = {
  //サブスクリプションを始める（openingハンドシェイク）ときに発火する
  //connectionParamsにはリクエストヘッダーの一部が格納されている（多分）
  onConnect: (connectionParams: any) => {
    const authContext = verifyToken(connectionParams.authorization)
    //認証エラーとなっていればエラーレスポンスを返す
    if (authContext.authenticationError) throw new AuthenticationError(authContext.authenticationError)
    //認証パスすれば下のcontextとネームしたコールバックを経由して（引数connectionに格納される）jwtの情報をリゾルバーにわたす
    return authContext
  }
}

const context = async ({req, connection}: {req: any, connection: any}) => {
  //サブスクリプションのときはconnectionがtruthyな値になる
  if (connection) return connection.context

  //jwt情報を格納
  return verifyToken((req.headers.authorization))
}

const apolloServer = new ApolloServer({
  schema,
  context,
  subscriptions
})

apolloServer.listen({port: 3000}).then(({url}) => {
  console.log(`Server listening on ${url}`)
})


