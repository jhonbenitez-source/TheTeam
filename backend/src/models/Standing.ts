import mongoose, { Schema, Document } from 'mongoose';

export interface IStanding extends Document {
  tournamentId: mongoose.Types.ObjectId;
  category: string;
  teamId: mongoose.Types.ObjectId;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const standingSchema = new Schema<IStanding>({
  tournamentId: { type: Schema.Types.ObjectId, ref: 'Tournament', required: true },
  category: { type: String, required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  played: { type: Number, default: 0 },
  won: { type: Number, default: 0 },
  drawn: { type: Number, default: 0 },
  lost: { type: Number, default: 0 },
  pointsFor: { type: Number, default: 0 },
  pointsAgainst: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Índice compuesto para evitar duplicados
standingSchema.index({ tournamentId: 1, category: 1, teamId: 1 }, { unique: true });

export default mongoose.model<IStanding>('Standing', standingSchema);
