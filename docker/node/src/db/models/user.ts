import {Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo, HasOne} from 'sequelize-typescript'
import Facility from "./facility"
import UserInfo from "./userInfo"

@Table({underscored: true})
export default class User extends Model<User> {

  @ForeignKey(() => Facility)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  facilityId!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName!: string

  @BelongsTo(() => Facility)
  facility?: Facility

  @HasOne(() => UserInfo)
  userInfo?: UserInfo
}
