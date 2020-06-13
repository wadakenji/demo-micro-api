'use strict'
module.exports = (sequelize, DataTypes) => {
  const staff = sequelize.define('staff', {
    facilityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    facilityAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    corporationAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    underscored: true,
  })
  staff.associate = function (models) {
    staff.belongsTo(models.facility, {foreignKey: 'facilityId'})
    staff.hasOne(models.login)
  }
  return staff
}