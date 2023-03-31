import Proposal from "../mongo/models/Dao"
import Operating from "../mongo/models/Operating"
import { dbConnect } from "../mongo/Database"


const resolvers = {
  Query: {
    proposals: async () => {
      await dbConnect()
      console.log('you are in qProposal resolver')
      const proposal = await Proposal.find()
      console.log(proposal)
      console.log('exit')
      return proposal
    }
  },
  Mutation: {
    addProposal: async(_:any, args:any)=> {
      await dbConnect()
      const addProposal = await Proposal.create(args)
      return addProposal
    },
    deleteProposal: async(_:any, {_id}:any)=> {
      await dbConnect()
      const deleteProposal = await Proposal.findByIdAndDelete({_id: _id})
      return deleteProposal
    },
    createOperatingAgreement: async(_:any, args:any)=> {
      await dbConnect()
      const createOperatingAgreement = await Operating.create(args)
      return createOperatingAgreement
    }
  }
}

export default resolvers;