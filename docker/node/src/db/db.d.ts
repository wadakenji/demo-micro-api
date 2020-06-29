import {Model, ModelAttributes, ModelOptions} from "sequelize"
import {SequelizeOptions} from "sequelize-typescript"

export interface ModelDefinition {
  modelName: string,
  attributes: ModelAttributes,
  options: ModelOptions
}

export interface DatabaseConfig extends SequelizeOptions {
  useEnvVariable?: string
}

export interface DefaultModel extends Model {
  id: number,
  createdAt: Date,
  updatedAt: Date
}