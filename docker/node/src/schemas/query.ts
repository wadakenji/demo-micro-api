import {gql} from "apollo-server"

export default gql`
    type Query {
        sayHello(name: String): String
        getStaffs: [Staff]
        getMe: Me
        getUsers: [User]
    }
`