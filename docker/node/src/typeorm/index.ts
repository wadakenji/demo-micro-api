import {Entity, PrimaryGeneratedColumn, Column, createConnection} from "typeorm";
import "reflect-metadata"

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

}

createConnection({
  type: "mariadb",
  host: "mariadb",
  port: 3306,
  username: "docker",
  password: "docker",
  database: "test",
  entities: [
    User
  ],
  synchronize: true,
}).then(connection => {
  let user = new User()
  user.firstName = "Kenji"
  user.lastName = "Wada"
  user.age = 25

  return connection.manager
    .save(user)
    .then(user => {
      console.log("Photo has been saved. Photo id is", user.id);
    });
}).catch(e => {
  console.log(e)
})