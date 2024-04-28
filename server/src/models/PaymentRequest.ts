import mongoose, { Document, Schema } from 'mongoose';

interface IPaymentRequest {
    amountRequested: number,
    crowedFunding: mongoose.Types.ObjectId,
    status: string,
    refNumber: string,
    createdAt: Date
};

const paymentRequestSchema = new Schema<IPaymentRequest>({
    amountRequested: { type: Number, default: 0 },
    crowedFunding: { type: Schema.Types.ObjectId, ref: 'CrowdFunding' },
    status: { type: String },
    refNumber: { type: String },
    createdAt: { type: Date, default: Date.now }
});

paymentRequestSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'crowedFunding',
        select: '_id title lastName amountNeeded'
      });
    next();
});
  
export interface IPaymentRequestModel extends Document, IPaymentRequest {}
  
const PaymentRequest = mongoose.model<IPaymentRequestModel>('PaymentRequest', paymentRequestSchema as any);

export default PaymentRequest