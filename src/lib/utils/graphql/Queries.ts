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
mutation createOperatingAgreement($entityName: String!, $businessType: String!, $ownership: String!, $initialMembers: [String]!, $articlesFiled: Boolean, $dateFiled: String, $stateFiled: String, $management: String!, $fiscalYearStart: String!, $fiscalYearEnd: String!, $sharesA: Int, $sharesB: Int, $shares: Boolean, $shareSize: Int, $votingMechanism: String!) {
  createOperatingAgreement(name: $entityName, businessType: $businessType, ownership: $ownership, initialMembers: $initialMembers, articlesFiled: $articlesFiled, dateFiled: $dateFiled, stateFiled: $stateFiled, management: $management, fiscalYearStart: $fiscalYearStart, fiscalYearEnd: $fiscalYearEnd, sharesA: $sharesA, sharesB: $sharesB, createShares: $createShares, sizeOfShares: $sizeOfShares, votingMech: $votingMech){
      _id
      name
  }
}`