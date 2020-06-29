import {Model, BuildOptions, DataTypes} from 'sequelize'
import {DefaultModel, ModelDefinition} from "../db"

export const staffModelName = 'staff'

export default <ModelDefinition>{
  modelName: staffModelName,
  attributes: {
    facilityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    facilityAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    corporationAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    systemAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  options: {
    underscored: true,
  }
}

export interface StaffModel extends DefaultModel {
  readonly facilityId: number
  readonly firstName: string
  readonly lastName: string
  readonly facilityAdmin: boolean
  readonly corporationAdmin: boolean
  readonly systemAdmin: boolean
  // readonly login: any
}

export type StaffModelCtor = {
  new(values?: object, options?: BuildOptions): StaffModel;
} & typeof Model