import {AuthenticationError} from "apollo-server-errors"
import * as jwt from "jsonwebtoken"

import {findStaffByLoginUsername} from '../models/database'

const CONFIG_AUTH = require('../config/authentication.json')

export default {
  login: async (_parent: any, args: {username: string, password: string}) => {
    const staffRow = await findStaffByLoginUsername(args.username)

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
  }
}