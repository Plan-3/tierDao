import { gql } from "apollo-server"

export const typeDefs = gql`
type proposal {
  _id: ID
  name: String!
  quorum: Int!
  tier: Int,
  options: [String]
}

type operatingAgreement {
  _id: ID
  name: String!
  businessType: String!
  ownership: String!
  initialMembers: [String]!
  articlesFiled: Boolean
  dateFiled: String
  stateFiled: String
  management: String!
  fiscalYearStart: String!
  fiscalYearEnd: String!
  sharesA: Int
  sharesB: Int
  createShares: Boolean
  sizeOfShares: Int
  votingMech: String! 
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
  deleteProposal(
    _id: ID!
  ):proposal
  createOperatingAgreement(
    name: String!
    businessType: String!
    ownership: String!
    initialMembers: [String]!
    articlesFiled: Boolean
    dateFiled: String
    stateFiled: String
    management: String!
    fiscalYearStart:[Int]!
    fiscalYearEnd: [Int]!
    sharesA: Int
    sharesB: Int
    createShares: Boolean
    sizeOfShares: Int
    votingMech: String!
  ):operatingAgreement
}
`
