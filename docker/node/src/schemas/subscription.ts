import {gql} from "apollo-server-micro"

export default gql`
    type Subscription {
        userInfoUpdated: UserInfoUpdate
    }
`