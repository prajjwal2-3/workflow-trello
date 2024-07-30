import mongoose, { Schema, Document } from 'mongoose';

interface Card extends Document {
  title: string;
  priority: 'Urgent' | 'Medium' | 'Low';
  column: 'todo' | 'inprogress' | 'underreview' | 'finished';
  description:string;
  updatedat:Date;
  deadline:Date;
  timeAdded: Date;
  user: mongoose.Types.ObjectId;
}

const CardSchema: Schema = new Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ['Urgent', 'Medium', 'Low'] },
  column: { type: String, enum: ['todo', 'inprogress', 'underreview', 'finished'], required: true },
  description:{type:String},
  updatedat:{type:Date,default:Date.now},
  deadline:{type:Date},
  timeAdded: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<Card>('Card', CardSchema);
