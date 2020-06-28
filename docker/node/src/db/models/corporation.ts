import {Model, BuildOptions, DataTypes} from 'sequelize'
import {ModelDefinition} from "../db"

export const corporationModelName = 'corporation'

export default <ModelDefinition>{
  modelName: corporationModelName,
  attributes: {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  options: {
    underscored: true,
  }
}

export interface CorporationModel extends Model {
  readonly name: string
}

export type CorporationModelCtor = {
  new(values?: object, options?: BuildOptions): CorporationModel;
} & typeof Model