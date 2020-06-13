'use strict'
module.exports = (sequelize, DataTypes) => {
  const facility = sequelize.define('facility', {
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
  facility.associate = function (models) {
    facility.belongsTo(models.corporation, {foreignKey: 'corporationId'})
    facility.hasMany(models.staff)
    facility.hasMany(models.user)
  }
  return facility
}