import {AuthenticationError} from "apollo-server-errors"
import models from '../db/models'

const {staff} = models

export default {
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
}