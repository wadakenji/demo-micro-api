import {Model, BuildOptions, DataTypes} from 'sequelize'
import {ModelDefinition} from "../db"

export const userModelName = 'user'

export default <ModelDefinition>{
  modelName: userModelName,
  attributes: {
    facilityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  },
  options: {
    underscored: true,
  }
}

export interface UserModel extends Model {
  readonly facilityId: number
  readonly firstName: string
  readonly lastName: string
}

export type UserModelCtor = {
  new(values?: object, options?: BuildOptions): UserModel;
} & typeof Model