import mongoose, { Schema, Document } from 'mongoose';

export interface ICoach extends Document {
  name: string;
  phone: string;
  category: string;
}

export interface ITeam extends Document {
  name: string;
  sport: 'Fútbol' | 'Voleibol' | 'Patinaje';
  userId?: mongoose.Types.ObjectId | null;
  logo?: string;
  address: string;
  coaches: ICoach[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const coachSchema = new Schema<ICoach>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true }
});

const teamSchema = new Schema<ITeam>({
  // Owner of the team (user workspace)
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  name: { type: String, required: true, unique: true },
  sport: { type: String, enum: ['Fútbol', 'Voleibol', 'Patinaje'], required: true },
  logo: { type: String },
  address: { type: String, required: true },
  coaches: [coachSchema],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index to quickly filter by user
teamSchema.index({ userId: 1 });

export default mongoose.model<ITeam>('Team', teamSchema);
