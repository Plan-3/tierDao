import mongoose, {Schema, model} from 'mongoose'

interface IProposal {
  name: string;
  quorum: number;
  tier: number;
  date: Date;
  options: string[];
}
const ProposalSchema = new Schema<IProposal>({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 50
  },
  quorum: {
    type: Number,
    min: 5,
    max: 100,
  },
  tier: Number,
  date: {
    type: Date,
    default: Date.now()
  },
  options: [String]

})


const Proposal = mongoose.models.Proposal || model<IProposal>("Proposal", ProposalSchema)


export default Proposal