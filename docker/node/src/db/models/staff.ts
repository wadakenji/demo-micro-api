import {Model, BuildOptions, Sequelize, DataTypes} from 'sequelize'

interface StaffModel extends Model {
  readonly facilityId: number
  readonly firstName: string
  readonly lastName: string
  readonly facilityAdmin: boolean
  readonly corporationAdmin: boolean
}

type StaffModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): StaffModel;
  associate: Function
}

module.exports = (sequelize: Sequelize) => {
  const staff = <StaffModelStatic>sequelize.define('staff', {
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
  staff.associate = (models: any) => {
    staff.belongsTo(models.facility, {foreignKey: 'facilityId'})
    staff.hasOne(models.login)
  }
  return staff
}