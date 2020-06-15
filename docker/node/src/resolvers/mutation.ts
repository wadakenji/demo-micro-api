import {AuthenticationError} from "apollo-server-errors"
import * as jwt from "jsonwebtoken"

const CONFIG_AUTH = require('../config/authentication.json')

import models from '../db/models'
const {staff, login} = models

export default {
  login: async (_parent: any, args: {username: string, password: string}) => {
    const staffRow = await staff.findOne({
      include: [{
        model: login,
        where: {username: args.username}
      }]
    })

    if (!staffRow) throw new AuthenticationError('invalid username')

    const {id, login: {password}} = staffRow

    if (password !== args.password) throw new AuthenticationError('invalid password')

    const accessToken = jwt.sign(
      {
        id: id,
      }, CONFIG_AUTH.ACCESS_TOKEN_SECRET
    )

    return {accessToken}
  }
}