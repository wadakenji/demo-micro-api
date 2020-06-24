import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm"
import {User} from "./user"

@Entity()
export class UserInfo {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  bodyTemperature!: number

  @Column()
  bloodPressure!: number

  @Column()
  pulse!: number

  @OneToOne(() => User)
  @JoinColumn()
  user!: User
}