import {Model, BuildOptions, Sequelize, DataTypes} from 'sequelize'

interface UserModel extends Model {
  readonly facilityId: number
  readonly firstName: string
  readonly lastName: string
}

type UserModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): UserModel;
  associate: Function
}
module.exports = (sequelize: Sequelize) => {
  const user = <UserModelStatic>sequelize.define('user', {
    facilityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    underscored: true,
  })
  user.associate = function (models: any) {
    user.hasOne(models.userInfo)
    user.belongsTo(models.facility, {foreignKey: 'facilityId'})
  }
  return user
}