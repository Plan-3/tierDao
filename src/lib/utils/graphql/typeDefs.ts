import { gql } from "apollo-server"

export const typeDefs = gql`
type proposal {
  _id: ID
  name: String!
  quorum: Int!
  tier: Int,
  options: [String]
}

type Query{
  proposals: [proposal]
}
type Mutation{
  addProposal(
    name: String!
    quorum: Int!
    tier: Int,
    options: [String]
  ):proposal
}
`
