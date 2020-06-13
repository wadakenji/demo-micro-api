'use strict'
module.exports = (sequelize, DataTypes) => {
  const userInfo = sequelize.define('userInfo', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bodyTemperature: DataTypes.FLOAT,
    bloodPressure: DataTypes.INTEGER,
    pulse: DataTypes.INTEGER
  }, {
    underscored: true,
  })
  userInfo.associate = function (models) {
    userInfo.belongsTo(models.user, {foreignKey: 'userId'})
  }
  return userInfo
}