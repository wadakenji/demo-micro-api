import {Table, Column, Model, DataType, AllowNull, HasOne, ForeignKey, BelongsTo} from 'sequelize-typescript'
import Login from "./login"
import Facility from "./facility"

@Table({underscored: true})
export default class Staff extends Model<Staff> {

  @ForeignKey(() => Facility)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  facilityId!: number

  @Column(DataType.STRING)
  firstName?: string

  @Column(DataType.STRING)
  lastName?: string

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  facilityAdmin!: boolean

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  systemAdmin!: boolean

  @BelongsTo(() => Facility)
  facility?: Facility

  @HasOne(() => Login)
  login?: Login
}