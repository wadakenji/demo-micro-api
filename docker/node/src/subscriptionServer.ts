import micro from "micro"
import {SubscriptionServer} from "subscriptions-transport-ws"
import {execute, subscribe} from "graphql"
import app, {schema} from "./index"

const server = micro(app)

server.listen(3000, () => {
  console.log('server listening...')
})

new SubscriptionServer({
  schema,
  execute,
  subscribe,
}, {
  server: server,
  path: '/graphql',
})
