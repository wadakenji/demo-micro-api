import {Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo} from 'sequelize-typescript'
import User from "./user"


@Table({underscored: true})
export default class UserInfo extends Model<UserInfo> {

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number

  @Column(DataType.INTEGER)
  bodyTemperature?: number

  @Column(DataType.INTEGER)
  bloodPressure?: number

  @Column(DataType.INTEGER)
  pulse?: number

  @BelongsTo(() => User)
  user?: User
}
