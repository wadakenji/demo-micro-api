import {AuthenticationError} from "apollo-server-errors"
import * as models from '../models/database'

export default {
  sayHello: (_parent: any, args: {name: string}) => {
    return `Hello ${args.name}!`
  },
  getStaffs: async () => {
    return models.fetchStaffs()
  },
  getMe: async (_parent: any, _args: any, context: any) => {
    if (!context.me) throw new AuthenticationError(context.authenticationError)
    return context.me
  },
  getUsers: async (_parent: any, _args: any, context: any) => {
    if (!context.me) throw new AuthenticationError(context.authenticationError)
    const {facilityId, corporationAdmin, systemAdmin} = context.me

    if (systemAdmin) return models.fetchUsers()

    if (corporationAdmin) {
      const facility = await models.findFacility(facilityId)
      if (!facility) throw new Error('invalid facility id')
      return models.fetchUsersByCorporationId(facility.corporationId)
    }

    return models.fetchUsersByFacilityId(facilityId)
  }
}