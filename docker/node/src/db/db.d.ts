import {Model, Options, ModelAttributes, ModelOptions} from "sequelize"

export interface ModelDefinition {
  modelName: string,
  attributes: ModelAttributes,
  options: ModelOptions
}

export interface DatabaseConfig extends Options {
  useEnvVariable?: string
}

export interface DefaultModel extends Model {
  id: number,
  createdAt: Date,
  updatedAt: Date
}