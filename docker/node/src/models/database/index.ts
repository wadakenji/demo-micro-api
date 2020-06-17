import models from '../../db/models'

export const findStaffByLoginUsername = async (username: string) => {
  return models.staff.findOne({
    include: [{
      model: models.login,
      where: {username}
    }]
  })
}

export const fetchStaffs = async () => {
  return models.staff.findAll()
}

export const fetchUsers = async () => {
  return models.user.findAll()
}

export const fetchUsersByFacilityId = async (facilityId: number) => {
  return models.user.findAll({
    include: [{
      model: models.facility,
      where: {id: facilityId}
    }]
  })
}

export const fetchUsersByCorporationId = async (corporationId: number) => {
  return models.user.findAll({
    include: [{
      model: models.facility,
      where: {corporationId},
    }]
  })
}

export const findFacility = async (facilityId: number) => {
  return models.facility.findOne({
    where: {id: facilityId}
  })
}

export const updateUserInfo = async (userId: number, updateItems: {[key: string]: any}) => {
  return models.userInfo.update(updateItems, {
    where: {userId}
  })
}