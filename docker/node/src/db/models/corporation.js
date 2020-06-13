'use strict'
module.exports = (sequelize, DataTypes) => {
  const corporation = sequelize.define('corporation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
  })
  corporation.associate = function (models) {
    corporation.hasMany(models.facility)
  }
  return corporation
}