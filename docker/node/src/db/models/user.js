'use strict'
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    facilityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    underscored: true,
  })
  user.associate = function (models) {
    user.hasOne(models.userInfo)
    user.belongsTo(models.facility, {foreignKey: 'facilityId'})
  }
  return user
}