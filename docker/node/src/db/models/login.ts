import {Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo} from 'sequelize-typescript'
import Staff from "./staff"


@Table({underscored: true})
export default class Login extends Model<Login> {

  @ForeignKey(() => Staff)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  staffId!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  username!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string

  @BelongsTo(() => Staff)
  staff?: Staff
}