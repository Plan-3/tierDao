import mongoose, {Schema, model} from 'mongoose';

interface IoperatingAgreement {
  name: string;
  businessType: string;
  ownership: string;
  initialMembers: string[];
  articlesFiled: boolean;
  dateFiled: Date;
  stateFiled: string;
  management: string;
  fiscalYearStart: Date;
  fiscalYearEnd: Date;
  sharesA: number;
  sharesB: number;
  createShares: boolean;
  sizeOfShares: number;
  votingMech: string;
}

const operatingSchema = new Schema<IoperatingAgreement>({
  name: {type: String, required: true},
  businessType: {type: String, required: true},
  ownership: {type: String, required: true},
  initialMembers: {type: [String], required: true},
  articlesFiled: Boolean,
  dateFiled: Date,
  stateFiled: String,
  management: {type: String, required: true},
  fiscalYearStart: {type: Date, required: true},
  fiscalYearEnd: {type: Date, required: true},
  sharesA: Number,
  sharesB: Number,
  createShares: Boolean,
  sizeOfShares: Number,
  votingMech: {type: String, required: true},
});

const Operating = mongoose.models.OperatingAgreement || model<IoperatingAgreement>('OperatingAgreement', operatingSchema);
export default Operating;