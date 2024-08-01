import mongoose, { Document, Schema, Model } from 'mongoose';

interface IToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const tokenSchema: Schema<IToken> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 43200, // 12 hours
  },
});

const Token: Model<IToken> = mongoose.model('Token', tokenSchema);

export default Token;
export { IToken };
