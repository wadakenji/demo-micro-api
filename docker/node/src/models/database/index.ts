// import {userModel, userInfoModel, staffModel, loginModel, facilityModel} from '../../db'
import staffModel from "../../db/models/staff"
import loginModel from "../../db/models/login"
import facilityModel from "../../db/models/facility"
import userModel from "../../db/models/user"
import userInfoModel from "../../db/models/userInfo"

export const findStaffByLoginUsername = async (username: string) => {
  return staffModel.findOne({
    include: [{
      model: loginModel,
      where: {username}
    }]
  })
}

export const fetchStaffs = async () => {
  return staffModel.findAll()
}

export const fetchUsers = async () => {
  return userModel.findAll()
}

export const fetchUsersByFacilityId = async (facilityId: number) => {
  return userModel.findAll({
    include: [{
      model: facilityModel,
      where: {id: facilityId}
    }]
  })
}

export const fetchUsersByCorporationId = async (corporationId: number) => {
  return userModel.findAll({
    include: [{
      model: facilityModel,
      where: {corporationId},
    }]
  })
}

export const findFacility = async (facilityId: number) => {
  return facilityModel.findOne({
    where: {id: facilityId}
  })
}

export const updateUserInfo = async (userId: number, updateItems: {[key: string]: any}) => {
  return userInfoModel.update(updateItems, {
    where: {userId}
  })
}