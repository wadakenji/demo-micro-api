import {AuthenticationError} from "apollo-server-errors"
import * as jwt from "jsonwebtoken"

import * as models from '../models/database'
import {pubsub} from "./subscription"

const CONFIG_AUTH = require('../config/authentication.json')

export default {
  login: async (_parent: any, args: {username: string, password: string}) => {
    const staffRow = await models.findStaffByLoginUsername(args.username)

    if (!staffRow) throw new AuthenticationError('invalid username')

    const {id, facilityId, facilityAdmin, corporationAdmin, systemAdmin, login: {password}} = staffRow

    if (password !== args.password) throw new AuthenticationError('invalid password')

    const accessToken = jwt.sign(
      {
        id,
        facilityId,
        facilityAdmin,
        corporationAdmin,
        systemAdmin
      }, CONFIG_AUTH.ACCESS_TOKEN_SECRET
    )

    return {accessToken}
  },

  updateUserInfo: async (_parent: any, args: {userId: number, updateItems: {[key: string]: any}}) => {
    await pubsub.publish('userInfoUpdated', {id: args.userId, ...args.updateItems})
    return models.updateUserInfo(args.userId, args.updateItems)
  }
}