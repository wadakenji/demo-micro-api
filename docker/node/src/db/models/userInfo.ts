import {Model, BuildOptions, Sequelize, DataTypes} from 'sequelize'

interface UserInfoModel extends Model {
  readonly userId: number
  readonly bodyTemperature: number
  readonly bloodPressure: number
  readonly pulse: number
}

type UserInfoModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): UserInfoModel;
  associate: Function
}

module.exports = (sequelize: Sequelize) => {
  const userInfo = <UserInfoModelStatic>sequelize.define('userInfo', {
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
  userInfo.associate = function (models: any) {
    userInfo.belongsTo(models.user, {foreignKey: 'userId'})
  }
  return userInfo
}