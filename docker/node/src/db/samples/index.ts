import userSample from './user'
import staffSample from './staff'
import facilitySample from './facility'
import corporationSample from "./corporation"

export default {
  //FK constraintエラーが起きない順に書く
  Corporation: corporationSample,
  Facility: facilitySample,
  User: userSample,
  Staff: staffSample,
}