import express, { Router } from 'express';
import { register, login, getProfile, AuthenticatedRequest } from '../controllers/auth';
import { verifyToken } from '../middleware/auth';

const router: Router = express.Router();

/**
 * Rutas de Autenticación
 * 
 * POST   /api/auth/register - Registrar nuevo usuario
 * POST   /api/auth/login    - Login de usuario
 * GET    /api/auth/me       - Obtener perfil del usuario autenticado
 */

/**
 * @route POST /api/auth/register
 * @description Registrar nuevo usuario
 * @body {email, password, fullName, phone}
 * @returns {token, user}
 */
router.post('/register', register);

/**
 * @route POST /api/auth/login
 * @description Login de usuario existente
 * @body {email, password}
 * @returns {token, user}
 */
router.post('/login', login);

/**
 * @route GET /api/auth/me
 * @description Obtener perfil del usuario autenticado
 * @requires token JWT en header Authorization
 * @returns {user}
 */
router.get('/me', verifyToken, getProfile);

export default router;
