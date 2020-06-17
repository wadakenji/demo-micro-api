import {gql} from "apollo-server-micro"

export default gql`
    type Mutation {
        login(username: String!
            password: String!): Tokens
        updateUserInfo(userId: ID!
            updateItems: UserInfoInput): [Int]
    }
`