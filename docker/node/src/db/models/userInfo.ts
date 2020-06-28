import {Model, BuildOptions, DataTypes} from 'sequelize'
import {ModelDefinition} from "../db"

export const userInfoModelName = 'userInfo'

export default <ModelDefinition>{
  modelName: userInfoModelName,
  attributes: {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bodyTemperature: DataTypes.FLOAT,
    bloodPressure: DataTypes.INTEGER,
    pulse: DataTypes.INTEGER
  },
  options: {
    underscored: true,
  }
}

export interface UserInfoModel extends Model {
  readonly userId: number
  readonly bodyTemperature: number
  readonly bloodPressure: number
  readonly pulse: number
}

export type UserInfoModelCtor = {
  new(values?: object, options?: BuildOptions): UserInfoModel;
} & typeof Model
