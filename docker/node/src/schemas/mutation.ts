import {gql} from "apollo-server"

export default gql`
    type Mutation {
        login(username: String!
            password: String!): Tokens
        updateUserInfo(userId: ID!
            updateItems: UserInfoInput): [Int]
    }
`