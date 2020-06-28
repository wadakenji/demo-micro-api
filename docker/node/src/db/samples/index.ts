import {userModelName} from '../models/user'
import userSample from './user'
import {staffModelName} from "../models/staff"
import staffSample from './staff'
import {facilityModelName} from "../models/facility"
import facilitySample from './facility'
import {corporationModelName} from "../models/corporation"
import corporationSample from "./corporation"

export default {
  [userModelName]: userSample,
  [staffModelName]: staffSample,
  [facilityModelName]: facilitySample,
  [corporationModelName]: corporationSample
}