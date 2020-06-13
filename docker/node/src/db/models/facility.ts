import {Model, BuildOptions, Sequelize, DataTypes} from 'sequelize'

interface FacilityModel extends Model {
  readonly corporationId: number
  readonly name: string
}

type FacilityModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): FacilityModel;
  associate: Function
}

module.exports = (sequelize: Sequelize) => {
  const facility = <FacilityModelStatic>sequelize.define('facility', {
    corporationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
  })
  facility.associate = function (models: any) {
    facility.belongsTo(models.corporation, {foreignKey: 'corporationId'})
    facility.hasMany(models.staff)
    facility.hasMany(models.user)
  }
  return facility
}