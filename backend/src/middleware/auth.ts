import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Interfaz para Request autenticado
 * Se extiende Request de Express para incluir datos del usuario
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

/**
 * Middleware de Verificación de Token JWT
 * 
 * Valida el token JWT en el header Authorization
 * Extrae los datos del usuario y los añade al request
 * 
 * @param {AuthenticatedRequest} req - Request HTTP
 * @param {Response} res - Response HTTP
 * @param {NextFunction} next - Siguiente middleware
 * 
 * @throws {401} - Token no proporcionado o inválido
 * @throws {403} - Token expirado o no válido
 */
export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
      return;
    }

    // Extraer token del formato "Bearer <token>"
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    // Verificar y decodificar token
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    const decoded = jwt.verify(token, secret) as { id: string; email: string };

    // Añadir datos del usuario al request
    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    // Pasar al siguiente middleware
    next();
  } catch (error) {
    // Manejar diferentes tipos de errores JWT
    if (error instanceof jwt.TokenExpiredError) {
      res.status(403).json({
        success: false,
        message: 'Token expirado'
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({
        success: false,
        message: 'Token no válido'
      });
      return;
    }

    res.status(403).json({
      success: false,
      message: 'Error en la autenticación'
    });
  }
};

export default { verifyToken };
