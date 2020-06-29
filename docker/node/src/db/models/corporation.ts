import {Table, Column, Model, DataType, AllowNull, HasMany} from 'sequelize-typescript'
import Facility from "./facility"


@Table({underscored: true})
export default class Corporation extends Model<Corporation> {

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string

  @HasMany(() => Facility)
  facilities?: Facility
}