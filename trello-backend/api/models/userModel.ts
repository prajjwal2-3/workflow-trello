import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
  cards: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
});

export default mongoose.model<User>('User', UserSchema);
