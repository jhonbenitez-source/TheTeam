import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayer extends Document {
  name: string;
  documentId: string;
  dateOfBirth: Date;
  category: string; // Auto-calculated (Sub-8, Sub-10, etc.)
  age: number; // Auto-calculated
  eps: string;
  phone: string;
  address: string;
  photo?: string;
  teamId: mongoose.Types.ObjectId | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const playerSchema = new Schema<IPlayer>({
  name: { type: String, required: true },
  documentId: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  category: { type: String, required: true },
  age: { type: Number, required: true },
  eps: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  photo: { type: String },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index para búsqueda rápida de documentId único
playerSchema.index({ documentId: 1 }, { unique: true });

export default mongoose.model<IPlayer>('Player', playerSchema);
