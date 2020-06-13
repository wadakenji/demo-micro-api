'use strict'
module.exports = (sequelize, DataTypes) => {
  const login = sequelize.define('login', {
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING
  }, {
    underscored: true,
  })
  login.associate = function (models) {
    login.belongsTo(models.staff, {foreignKey: 'staffId'})
  }
  return login
}