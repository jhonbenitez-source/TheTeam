import express from 'express';
import { verifyToken } from '../middleware/auth';
import {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  transferPlayer,
  deactivatePlayer,
  reactivatePlayer
} from '../controllers/players';

const router = express.Router();

router.post('/', verifyToken, createPlayer);
router.get('/', verifyToken, getPlayers);
router.get('/:id', verifyToken, getPlayerById);
router.put('/:id', verifyToken, updatePlayer);
router.patch('/:id/transfer', verifyToken, transferPlayer);
router.patch('/:id/deactivate', verifyToken, deactivatePlayer);
router.patch('/:id/reactivate', verifyToken, reactivatePlayer);

export default router;
