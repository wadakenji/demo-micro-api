import {Model, BuildOptions, DataTypes} from 'sequelize'
import {ModelDefinition} from "../db"

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

export interface StaffModel extends Model {
  readonly facilityId: number
  readonly firstName: string
  readonly lastName: string
  readonly facilityAdmin: boolean
  readonly corporationAdmin: boolean
}

export type StaffModelCtor = {
  new(values?: object, options?: BuildOptions): StaffModel;
} & typeof Model