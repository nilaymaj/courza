import mng from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IITK_EMAIL_REGEX } from '../utils/constants';

// Document interface
export interface IVerificationTicket extends mng.Document {
  _id: mng.Types.ObjectId;
  iitkEmail: string;
  uniqueToken: string;

  // MongoDB-generated timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Statics interface
interface IStatics extends mng.Model<IVerificationTicket> {}

// Database schema
const verificationTicketSchema = new mng.Schema<IVerificationTicket>(
  {
    iitkEmail: {
      type: mng.Schema.Types.String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
      match: IITK_EMAIL_REGEX,
    },
    uniqueToken: {
      type: mng.Schema.Types.String,
      unique: true,
      required: true,
      default: uuid,
    },
  },
  { timestamps: true }
);

const VerificationTicket = mng.model<IVerificationTicket, IStatics>(
  'VerificationTicket',
  verificationTicketSchema
);
export default VerificationTicket;
