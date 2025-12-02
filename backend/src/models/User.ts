import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interfaz IUser
 * Define la estructura del documento de Usuario en MongoDB
 * 
 * @interface IUser
 * @extends Document
 */
export interface IUser extends Document {
  // Información personal
  email: string;
  password: string; // Hash de la contraseña
  fullName: string;
  phone?: string;
  
  // Plan/Membresía
  membership: {
    plan: 'Pequeño' | 'Intermedio' | 'Grande' | 'Profesional' | 'Gratuito';
    startDate: Date;
    endDate?: Date;
    isActive: boolean;
    playerLimit: number;
    tournamentLimit: number;
    sponsorLimit: number;
  };
  
  // Control de estado
  isActive: boolean;
  isVerified: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Schema de Usuario
 * Define la estructura y validaciones del documento en MongoDB
 */
const userSchema = new Schema<IUser>(
  {
    // Información personal
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor proporcione un email válido']
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
      select: false // No retornar por defecto en queries
    },
    fullName: {
      type: String,
      required: [true, 'El nombre completo es requerido'],
      trim: true,
      minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    phone: {
      type: String,
      trim: true
    },
    
    // Plan/Membresía
    membership: {
      plan: {
        type: String,
        enum: ['Pequeño', 'Intermedio', 'Grande', 'Profesional', 'Gratuito'],
        default: 'Gratuito'
      },
      startDate: {
        type: Date,
        default: Date.now
      },
      endDate: Date,
      isActive: {
        type: Boolean,
        default: true
      },
      // Límites según el plan
      playerLimit: {
        type: Number,
        default: 300 // Gratuito: 300 jugadores
      },
      tournamentLimit: {
        type: Number,
        default: 5
      },
      sponsorLimit: {
        type: Number,
        default: 0
      }
    },
    
    // Control de estado
    isActive: {
      type: Boolean,
      default: true
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

/**
 * Índices para optimizar búsquedas
 */
// Índice único para email
userSchema.index({ email: 1 }, { unique: true });

// Índice para búsqueda de usuarios activos
userSchema.index({ isActive: 1 });

// Índice para búsqueda de usuarios verificados
userSchema.index({ isVerified: 1 });

export default mongoose.model<IUser>('User', userSchema);
