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