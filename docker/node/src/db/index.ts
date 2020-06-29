import {Sequelize} from "sequelize-typescript"
import {DatabaseConfig} from "./db"
import User from "./models/user"
import Staff from "./models/staff"
import Corporation from "./models/corporation"
import Facility from "./models/facility"
import UserInfo from "./models/userInfo"
import Login from "./models/login"

//環境に応じてdb設定決定
const env = process.env.NODE_ENV || 'development'
let config = <DatabaseConfig>require(__dirname + '/../config/database.json')[env]

//sequelizeに追加するモデルを示す設定を追加
config.models = [__dirname + '/models']

//db設定からsequelizeクラスインスタンス作成
let db: Sequelize
if (config.useEnvVariable) {
  db = new Sequelize(config.useEnvVariable, config)
} else {
  db = new Sequelize(config)
}

export default db

export const corporationModel = db.model(Corporation)
export const facilityModel = db.model(Facility)
export const userModel = db.model(User)
export const staffModel = db.model(Staff)
export const userInfoModel = db.model(UserInfo)
export const loginModel = db.model(Login)

