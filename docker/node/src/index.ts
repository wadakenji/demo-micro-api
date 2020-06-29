import {
  ApolloServer, makeExecutableSchema,
  // gql
} from 'apollo-server'
import {AuthenticationError} from 'apollo-server-errors'
import {Request} from 'express'
import {ExecutionParams} from "subscriptions-transport-ws"
import * as jwt from 'jsonwebtoken'

import resolvers from './resolvers'
import typeDefs from './schemas'
import db from "./db"

const CONFIG_AUTH = require('./config/authentication.json')

export const schema = makeExecutableSchema({typeDefs, resolvers})

const verifyToken = (authorizationHeader: string | undefined) => {
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
    // console.log(connectionParams)
    const authContext = verifyToken(connectionParams.authorization)
    //認証エラーとなっていればエラーレスポンスを返す
    if (authContext.authenticationError) throw new AuthenticationError(authContext.authenticationError)
    //認証パスすれば下のcontextとネームしたコールバックを経由して（引数connectionに格納される）jwtの情報をリゾルバーにわたす
    return authContext
  }
}

const context = async ({req, connection}: {req: Request, connection: ExecutionParams}) => {
  // console.log(gql(req.body.query))
  // console.log(gql(req.body.query).definitions.map(e => e.kind))
  // console.log(gql(req.body.query).definitions.map(e => {
  //   if (e.kind === 'OperationDefinition' || e.kind === 'FragmentDefinition')
  //     return e.selectionSet.selections.map(se => {
  //       if (se.kind === 'Field')
  //         return se.name
  //       else return ''
  //     })
  //   else
  //     return ''
  // }))

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

apolloServer.listen({port: 3000}).then(async ({url}) => {
  await db.sync()
  console.log(`Server listening on ${url}`)
})


