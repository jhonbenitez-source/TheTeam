import mongoose, { Schema, Document } from 'mongoose';

export interface ITournament extends Document {
  name: string;
  sport: 'Fútbol' | 'Voleibol' | 'Patinaje';
  userId?: mongoose.Types.ObjectId | null;
  type: 'Liga' | 'Copa' | 'Relámpago' | 'Otro';
  categories: string[]; // e.g., ['Sub-8', 'Sub-10', 'Sub-12']
  participatingTeams: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tournamentSchema = new Schema<ITournament>({
  // Owner of the tournament (user workspace)
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  name: { type: String, required: true },
  sport: { type: String, enum: ['Fútbol', 'Voleibol', 'Patinaje'], required: true },
  type: { type: String, enum: ['Liga', 'Copa', 'Relámpago', 'Otro'], required: true },
  categories: [{ type: String }],
  participatingTeams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index to quickly filter by user
tournamentSchema.index({ userId: 1 });

export default mongoose.model<ITournament>('Tournament', tournamentSchema);
