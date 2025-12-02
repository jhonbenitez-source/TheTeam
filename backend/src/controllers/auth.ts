import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

/**
 * Controlador de Autenticación
 * Maneja registro, login y validación de usuarios
 */

/**
 * Interfaz para request autenticado
 * Se añade el user al request después de validar el token
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

/**
 * Registrar nuevo usuario
 * @route POST /api/auth/register
 * @param {Request} req - Request con email, password, fullName
 * @param {Response} res - Response con token y datos del usuario
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, fullName, phone } = req.body;

    // Validar campos requeridos
    if (!email || !password || !fullName) {
      res.status(400).json({
        success: false,
        message: 'Por favor proporcione email, contraseña y nombre completo'
      });
      return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
      return;
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'El email ya está registrado'
      });
      return;
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      fullName: fullName.trim(),
      phone: phone?.trim(),
      membership: {
        plan: 'Gratuito',
        startDate: new Date(),
        isActive: true,
        playerLimit: 300,
        tournamentLimit: 5,
        sponsorLimit: 0
      }
    });

    // Guardar usuario en base de datos
    await newUser.save();

    // Generar JWT token
    const token = generateToken(newUser._id.toString(), newUser.email);

    // Retornar respuesta exitosa
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        membership: newUser.membership
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login de usuario
 * @route POST /api/auth/login
 * @param {Request} req - Request con email y password
 * @param {Response} res - Response con token y datos del usuario
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Por favor proporcione email y contraseña'
      });
      return;
    }

    // Buscar usuario por email (incluir contraseña con select)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    // Validar que el usuario existe
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Email o contraseña incorrectos'
      });
      return;
    }

    // Validar que el usuario está activo
    if (!user.isActive) {
      res.status(403).json({
        success: false,
        message: 'Tu cuenta ha sido desactivada'
      });
      return;
    }

    // Comparar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Email o contraseña incorrectos'
      });
      return;
    }

    // Generar JWT token
    const token = generateToken(user._id.toString(), user.email);

    // Retornar respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        membership: user.membership
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener perfil del usuario autenticado
 * @route GET /api/auth/me
 * @param {AuthenticatedRequest} req - Request autenticado con user data
 * @param {Response} res - Response con datos del usuario
 */
export const getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'No autorizado'
      });
      return;
    }

    // Buscar usuario por ID
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        membership: user.membership,
        isActive: user.isActive
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Generar JWT Token
 * Función auxiliar para crear tokens JWT
 * 
 * @param {string} userId - ID del usuario
 * @param {string} email - Email del usuario
 * @returns {string} - JWT token
 */
const generateToken = (userId: string, email: string): string => {
  const secret = (process.env.JWT_SECRET || 'your-secret-key-change-this-in-production') as jwt.Secret;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  const signOptions: any = { expiresIn };

  return jwt.sign(
    { id: userId, email },
    secret as any,
    signOptions
  );
};

export default {
  register,
  login,
  getProfile
};
