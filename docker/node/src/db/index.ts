import {Sequelize} from "sequelize"
import {ModelDefinition, DatabaseConfig} from "./db"

//モデル定義ファイルインポート
import userModelDefinition, {UserModelCtor} from './models/user'
import userInfoModelDefinition, {UserInfoModelCtor} from './models/userInfo'
import staffModelDefinition, {StaffModelCtor} from "./models/staff"
import loginModelDefinition, {LoginModelCtor} from "./models/login"
import facilityModelDefinition, {FacilityModelCtor} from "./models/facility"
import corporationModelDefinition, {CorporationModelCtor} from "./models/corporation"

//環境に応じてdb設定決定
const env = process.env.NODE_ENV || 'development'
const config = <DatabaseConfig>require(__dirname + '/../config/database.json')[env]

//db設定からsequelizeクラスインスタンス作成
let db: Sequelize
if (config.useEnvVariable) {
  db = new Sequelize(config.useEnvVariable, config)
} else {
  db = new Sequelize(config)
}

/**
 * モデル定義をもとにsequelizeにテーブルを定義する
 * 返り値は各モデルクラス
 *
 * @param modelDefinition
 * @return Function
 */
const defineModel = (modelDefinition: ModelDefinition) => {
  db.define(modelDefinition.modelName, modelDefinition.attributes, modelDefinition.options)
  return db.model(modelDefinition.modelName)
}

//各テーブルを定義
export const userModel = <UserModelCtor>defineModel(userModelDefinition)
export const userInfoModel = <UserInfoModelCtor>defineModel(userInfoModelDefinition)
export const staffModel = <StaffModelCtor>defineModel(staffModelDefinition)
export const loginModel = <LoginModelCtor>defineModel(loginModelDefinition)
export const facilityModel = <FacilityModelCtor>defineModel(facilityModelDefinition)
export const corporationModel = <CorporationModelCtor>defineModel(corporationModelDefinition)

//関連付け
//user has one userInfo
userModel.hasOne(userInfoModel)
userInfoModel.belongsTo(userModel)
//staff has one login
staffModel.hasOne(loginModel)
loginModel.belongsTo(staffModel)
//facility has many user
facilityModel.hasMany(userModel)
userModel.belongsTo(facilityModel)
//facility has many staff
facilityModel.hasMany(staffModel)
staffModel.belongsTo(facilityModel)
//corporation has many facility
corporationModel.hasMany(facilityModel)
facilityModel.belongsTo(corporationModel)

export default db