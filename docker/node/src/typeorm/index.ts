import {createConnection} from "typeorm"
import "reflect-metadata"
import {User, UserInfo} from './entities'


createConnection({
  type: "mariadb",
  host: "mariadb",
  port: 3306,
  username: "docker",
  password: "docker",
  database: "test",
  entities: [
    User,
    UserInfo
  ],
  dropSchema: true,
  synchronize: true,
}).then(async connection => {

  let user = new User()
  user.firstName = "Kenji"
  user.lastName = "Wada"
  user.age = 25

  let userRepository = connection.getRepository(User)

  let createdUser = await connection.manager.save(user)
  console.log(createdUser)

  let allUsers = await userRepository.find()
  console.log(allUsers)

  let userInfo = new UserInfo()
  userInfo.bodyTemperature = 36
  userInfo.bloodPressure = 90
  userInfo.pulse = 60
  userInfo.user = createdUser

  let userInfoRepository = connection.getRepository(UserInfo)

  let createdUserInfo = await connection.manager.save(userInfo)
  console.log(createdUserInfo)

  let allUserInfo = await userInfoRepository.find()
  console.log(allUserInfo)

  await connection.close()
}).catch(e => {
  console.log(e)
})