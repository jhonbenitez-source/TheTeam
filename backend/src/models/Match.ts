import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
  tournamentId: mongoose.Types.ObjectId;
  category: string;
  homeTeamId: mongoose.Types.ObjectId;
  awayTeamId: mongoose.Types.ObjectId;
  homeScore: number;
  awayScore: number;
  status: 'Programado' | 'En Progreso' | 'Finalizado' | 'Cancelado';
  scheduledDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const matchSchema = new Schema<IMatch>({
  tournamentId: { type: Schema.Types.ObjectId, ref: 'Tournament', required: true },
  category: { type: String, required: true },
  homeTeamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  status: { type: String, enum: ['Programado', 'En Progreso', 'Finalizado', 'Cancelado'], default: 'Programado' },
  scheduledDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IMatch>('Match', matchSchema);
