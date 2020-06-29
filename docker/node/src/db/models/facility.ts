import {Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript'
import Staff from "./staff"
import Corporation from "./corporation"
import User from "./user"


@Table({underscored: true})
export default class Facility extends Model<Facility> {

  @ForeignKey(() => Corporation)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  corporationId!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string

  @BelongsTo(() => Corporation)
  corporation?: Corporation

  @HasMany(() => Staff)
  staffs?: Staff[]

  @HasMany(() => User)
  users?: User[]
}