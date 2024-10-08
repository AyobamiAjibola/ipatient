import mongoose, { Document, Schema } from 'mongoose';

interface IPatientStories {
    title: string,
    status: string,
    content: string,
    user: mongoose.Types.ObjectId;
    image: string;
}

const patientSchema = new Schema<IPatientStories>({
   title: { type: String },
   status: { type: String, default: 'pending' },
   content: { type: String },
   image: { type: String },
   user: { type: Schema.Types.ObjectId, ref: 'User' }
},{ timestamps: true });

patientSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'user',
        select: 'firstName lastName image email'
      });
    next();
});

export interface IPatientStoriesModel extends Document, IPatientStories {}

const PatientStories = mongoose.model<IPatientStoriesModel>('PatientStories', patientSchema as any);

export default PatientStories;