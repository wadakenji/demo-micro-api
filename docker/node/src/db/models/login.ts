import {Model, BuildOptions, DataTypes} from 'sequelize'
import {DefaultModel, ModelDefinition} from "../db"

export const loginModelName = 'login'

export default <ModelDefinition>{
  modelName: loginModelName,
  attributes: {
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING
  },
  options: {
    underscored: true,
  }
}

export interface LoginModel extends DefaultModel {
  readonly staffId: number
  readonly username: string
  readonly password: string
}

export type LoginModelCtor = {
  new(values?: object, options?: BuildOptions): LoginModel;
} & typeof Model