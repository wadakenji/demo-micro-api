import {userModel, userInfoModel, staffModel, loginModel, facilityModel} from '../../db'
import {StaffModel} from "../../db/models/staff"
import {LoginModel} from "../../db/models/login"
import {FacilityModel} from "../../db/models/facility"
import {UserModel} from "../../db/models/user"
import {UserInfoModel} from "../../db/models/userInfo"

export const findStaffByLoginUsername = async (username: string) => {
  return <Promise<StaffModel & {login: LoginModel}>>staffModel.findOne({
    include: [{
      model: loginModel,
      where: {username}
    }]
  })
}

export const fetchStaffs = async () => {
  return staffModel.findAll<StaffModel>()
}

export const fetchUsers = async () => {
  return userModel.findAll<UserModel>()
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
  return facilityModel.findOne<FacilityModel>({
    where: {id: facilityId}
  })
}

export const updateUserInfo = async (userId: number, updateItems: {[key: string]: any}) => {
  return userInfoModel.update<UserInfoModel>(updateItems, {
    where: {userId}
  })
}