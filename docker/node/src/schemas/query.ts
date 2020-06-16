import {gql} from "apollo-server-micro"

export default gql`  
    type Query {
        sayHello(name: String): String
        getStaffs: [Staff]
        getMe: Me
        getUsers: [User]
    }
`