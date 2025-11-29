import express from 'express';
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

router.post('/', createPlayer);
router.get('/', getPlayers);
router.get('/:id', getPlayerById);
router.put('/:id', updatePlayer);
router.patch('/:id/transfer', transferPlayer);
router.patch('/:id/deactivate', deactivatePlayer);
router.patch('/:id/reactivate', reactivatePlayer);

export default router;
