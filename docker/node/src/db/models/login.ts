import {Model, BuildOptions, Sequelize, DataTypes} from 'sequelize'

interface LoginModel extends Model {
  readonly staffId: number
  readonly username: string
  readonly password: string
}

type LoginModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): LoginModel;
  associate: Function
}

module.exports = (sequelize: Sequelize) => {
  const login = <LoginModelStatic>sequelize.define('login', {
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
  login.associate = function (models: any) {
    login.belongsTo(models.staff, {foreignKey: 'staffId'})
  }
  return login
}