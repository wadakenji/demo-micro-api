import {PubSub} from "apollo-server"

export const pubsub = new PubSub()

export default {
  userInfoUpdated: {
    resolve: (payload: any) => {
      return payload
    },
    subscribe: () => pubsub.asyncIterator(['userInfoUpdated'])
  }
}