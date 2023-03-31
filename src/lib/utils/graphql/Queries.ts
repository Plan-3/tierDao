import {gql} from '@apollo/client'

export const QUERY_PROPOSAL = gql`
{
  proposals{
    _id
    name
    quorum
    tier
    options
  }
}
`
export const MUTATION_ADDPROPOSAL = gql`
mutation addProposal($name: String!, $quorum: Int!, $tier: Int, $options: [String]) {
  addProposal(name: $name, quorum: $quorum, tier: $tier, options: $options){
      _id
      name
  }
}`
export const MUTATION_DELETEPROPOSAL = gql`
mutation deleteProposal($id: ID!) {
  deleteProposal(_id: $id){
      _id
      name
  }
}`
export const MUTATION_CREATEOPERATINGAGREEMENT = gql`
mutation createOperatingAgreement($name: String!, $businessType: String!, $ownership: String!, $initialMembers: [String]!, $articlesFiled: Boolean, $dateFiled: Date, $stateFiled: String, $management: String!, $fiscalYearStart: Date!, $fiscalYearEnd: Date!, $sharesA: Int, $sharesB: Int, $createShares: Boolean, $sizeOfShares: Int, $votingMech: String!) {
  createOperatingAgreement(name: $name, businessType: $businessType, ownership: $ownership, initialMembers: $initialMembers, articlesFiled: $articlesFiled, dateFiled: $dateFiled, stateFiled: $stateFiled, management: $management, fiscalYearStart: $fiscalYearStart, fiscalYearEnd: $fiscalYearEnd, sharesA: $sharesA, sharesB: $sharesB, createShares: $createShares, sizeOfShares: $sizeOfShares, votingMech: $votingMech){
      _id
      name
  }
}`