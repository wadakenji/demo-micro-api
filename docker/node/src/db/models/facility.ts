import {Model, BuildOptions, DataTypes} from 'sequelize'
import {ModelDefinition} from "../db"

export const facilityModelName = 'facility'

export default <ModelDefinition>{
  modelName: facilityModelName,
  attributes: {
    corporationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  options: {
    underscored: true,
  }
}

export interface FacilityModel extends Model {
  readonly corporationId: number
  readonly name: string
}

export type FacilityModelCtor = {
  new(values?: object, options?: BuildOptions): FacilityModel;
} & typeof Model