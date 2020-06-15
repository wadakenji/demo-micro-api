import {gql} from "apollo-server-micro"

export default gql`
    type Staff {
        id: ID!
        facilityId: Int
        firstName: String
        lastName: String
        facilityAdmin: Boolean
        corporationAdmin: Boolean
        createdAt: String
        updatedAt: String
    }
    type Tokens {
        accessToken: String
    }
    type Me {
        id: Int
    }
`