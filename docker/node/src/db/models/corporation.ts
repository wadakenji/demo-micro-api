import {Model, BuildOptions, Sequelize, DataTypes} from 'sequelize'

interface CorporationModel extends Model {
  readonly name: string
}

type CorporationModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): CorporationModel;
  associate: Function
}

module.exports = (sequelize: Sequelize) => {
  const corporation = <CorporationModelStatic>sequelize.define('corporation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
  })
  corporation.associate = function (models: any) {
    corporation.hasMany(models.facility)
  }
  return corporation
}